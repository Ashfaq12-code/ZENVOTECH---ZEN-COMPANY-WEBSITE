declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405);

  const apiKey = Deno.env.get('GOOGLE_PLACES_API_KEY');
  if (!apiKey) return response({ error: 'Google Places API key is not configured.' }, 500);

  let googleResponse: Response;
  try {
    googleResponse = await fetch('https://places.googleapis.com/v1/places/ChIJKRL3TZZp4zoRsudeowa3gIY', {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask': 'id,displayName,googleMapsUri,rating,userRatingCount,reviews',
      },
    });
  } catch {
    return response({ error: 'Could not connect to Google Places.' }, 502);
  }

  if (!googleResponse.ok) {
    return response({ error: `Google Places request failed (${googleResponse.status}).` }, 502);
  }

  let place: {
    displayName?: { text?: string };
    googleMapsUri?: string;
    rating?: number;
    userRatingCount?: number;
    reviews?: Array<{
      name?: string;
      rating?: number;
      text?: { text?: string };
      publishTime?: string;
      relativePublishTimeDescription?: string;
      authorAttribution?: {
        displayName?: string;
        uri?: string;
        photoUri?: string;
      };
    }>;
  };
  try {
    place = await googleResponse.json();
  } catch {
    return response({ error: 'Google Places returned invalid JSON.' }, 502);
  }

  if (!place.displayName?.text) {
    return response({ error: 'Google Places response did not include the requested business.' }, 502);
  }

  return response({
    placeName: place.displayName.text,
    googleMapsUri: place.googleMapsUri ?? 'https://www.google.com/maps/place/?q=place_id:ChIJKRL3TZZp4zoRsudeowa3gIY',
    rating: place.rating ?? null,
    userRatingCount: place.userRatingCount ?? null,
    reviews: (place.reviews ?? []).map((review, index) => ({
      id: review.name ?? `${review.authorAttribution?.displayName ?? 'google-review'}-${review.publishTime ?? index}`,
      rating: review.rating ?? 0,
      text: review.text?.text ?? '',
      publishTime: review.publishTime ?? null,
      relativePublishTimeDescription: review.relativePublishTimeDescription ?? '',
      author: {
        displayName: review.authorAttribution?.displayName ?? 'Google user',
        uri: review.authorAttribution?.uri ?? null,
        photoUri: review.authorAttribution?.photoUri ?? null,
      },
    })),
  });
});