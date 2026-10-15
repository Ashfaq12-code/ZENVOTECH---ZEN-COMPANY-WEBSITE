declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

const PLACE_ID = 'ChIJKRL3TZZp4zoRsudeowa3gIY';
const CACHE_TTL_MS = 60 * 60 * 1000;
const PUBLIC_CACHE = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

type ErrorCode = 'method_not_allowed' | 'invalid_request' | 'not_configured' | 'upstream_unreachable' | 'upstream_failed' | 'upstream_invalid';

type PlaceReview = {
  name?: string;
  rating?: number;
  text?: { text?: string };
  publishTime?: string;
  relativePublishTimeDescription?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

type Place = {
  displayName?: { text?: string };
  googleMapsUri?: string;
  rating?: number;
  userRatingCount?: number;
  reviews?: PlaceReview[];
};

type ReviewsPayload = ReturnType<typeof toPayload>;

// Per-isolate memory cache: cuts Places latency and quota without a table.
let cached: { payload: ReviewsPayload; expiresAt: number } | null = null;

function json(body: unknown, status: number, cacheControl: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': cacheControl },
  });
}

function fail(code: ErrorCode, message: string, status: number) {
  return json({ error: { code, message } }, status, 'no-store');
}

// The function takes no input. Reject anything that is not an empty query/body
// so callers cannot vary the cache key or smuggle parameters.
async function validateInput(request: Request): Promise<string | null> {
  if (new URL(request.url).search.length > 1) return 'This endpoint takes no query parameters.';
  if (request.method !== 'POST') return null;
  const raw = (await request.text()).trim();
  if (!raw) return null;
  try {
    const body: unknown = JSON.parse(raw);
    if (body && typeof body === 'object' && !Array.isArray(body) && Object.keys(body).length === 0) return null;
  } catch {
    return 'Request body must be empty or {}.';
  }
  return 'Request body must be empty or {}.';
}

function toIsoDate(value: string | undefined): string | null {
  if (!value) return null;
  const time = Date.parse(value);
  return Number.isNaN(time) ? null : new Date(time).toISOString();
}

function toPayload(place: Place, placeName: string) {
  return {
    placeName,
    googleMapsUri: place.googleMapsUri ?? `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`,
    rating: place.rating ?? null,
    userRatingCount: place.userRatingCount ?? null,
    bestRating: 5,
    worstRating: 1,
    reviews: (place.reviews ?? []).map((review, index) => ({
      id: review.name ?? `${review.authorAttribution?.displayName ?? 'google-review'}-${review.publishTime ?? index}`,
      rating: review.rating ?? 0,
      bestRating: 5,
      worstRating: 1,
      text: review.text?.text ?? '',
      publishTime: review.publishTime ?? null,
      datePublished: toIsoDate(review.publishTime),
      relativePublishTimeDescription: review.relativePublishTimeDescription ?? '',
      author: {
        displayName: review.authorAttribution?.displayName ?? 'Google user',
        uri: review.authorAttribution?.uri ?? null,
        photoUri: review.authorAttribution?.photoUri ?? null,
      },
    })),
  };
}

async function fetchPlace(apiKey: string): Promise<ReviewsPayload | Response> {
  let googleResponse: Response;
  try {
    googleResponse = await fetch(`https://places.googleapis.com/v1/places/${PLACE_ID}`, {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,googleMapsUri,rating,userRatingCount,reviews',
      },
    });
  } catch {
    return fail('upstream_unreachable', 'Could not connect to Google Places.', 502);
  }
  if (!googleResponse.ok) {
    return fail('upstream_failed', `Google Places request failed (${googleResponse.status}).`, 502);
  }
  let place: Place;
  try {
    place = await googleResponse.json();
  } catch {
    return fail('upstream_invalid', 'Google Places returned invalid JSON.', 502);
  }
  const placeName = place.displayName?.text;
  if (!placeName) {
    return fail('upstream_invalid', 'Google Places response did not include the requested business.', 502);
  }
  return toPayload(place, placeName);
}

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'GET' && request.method !== 'POST') {
    return fail('method_not_allowed', 'Use GET (cacheable) or POST.', 405);
  }

  const inputError = await validateInput(request);
  if (inputError) return fail('invalid_request', inputError, 400);

  // POST responses are never cached by browsers or CDNs; GET is the cacheable path.
  const cacheControl = request.method === 'GET' ? PUBLIC_CACHE : 'no-store';
  if (cached && cached.expiresAt > Date.now()) return json(cached.payload, 200, cacheControl);

  const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
  if (!apiKey) return fail('not_configured', 'Google Places API key is not configured.', 500);

  const result = await fetchPlace(apiKey);
  if (result instanceof Response) {
    // Serve the last good copy rather than an error when Google is down.
    return cached ? json(cached.payload, 200, cacheControl) : result;
  }
  cached = { payload: result, expiresAt: Date.now() + CACHE_TTL_MS };
  return json(result, 200, cacheControl);
});
