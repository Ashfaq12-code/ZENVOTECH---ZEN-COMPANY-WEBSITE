import { ArrowUpRight, Plus } from 'lucide-react';

import { SITE } from '@/config/site';
import type { ClientReview } from '../admin/supabase';
import type { GoogleReviewPayload } from '../googleReviews';
import { ReviewMarquee } from '@/components/reviews/ReviewMarquee';
import { toClientReviewCards, toGoogleReviewCards, toStaticReviewCards } from './reviewMapper';

type ReviewsSectionProps = {
  clientReviews: readonly ClientReview[];
  contentError: string;
  googleReviews: GoogleReviewPayload | null;
  googleReviewsError: string;
  onAddReview: () => void;
};

export function ReviewsSection({ clientReviews, contentError, googleReviews, googleReviewsError, onAddReview }: ReviewsSectionProps) {
  const googleCards = toGoogleReviewCards(googleReviews);
  const cards = googleCards.length > 0 ? googleCards : [...toStaticReviewCards(), ...toClientReviewCards(clientReviews)];

  return (
    <section className="reviews-section">
      <div className="section-pad reviews-header">
        <div><p className="eyebrow">Kind words</p><h2>{SITE.name} client <span>reviews.</span></h2></div>
        <div className="google-rating">
          <div className="google-g" aria-hidden="true">G</div>
          <GoogleRatingSummary googleReviews={googleReviews} googleReviewsError={googleReviewsError} />
          <button className="public-review-button" type="button" onClick={onAddReview}><Plus size={14} /> Add a review</button>
        </div>
      </div>
      {contentError && <p className="published-content-error section-pad" role="status">Live reviews could not be refreshed: {contentError}</p>}
      {googleReviewsError && <p className="published-content-error section-pad" role="status">Live Google reviews could not be refreshed: {googleReviewsError}. Showing other client testimonials instead.</p>}
      <ReviewMarquee cards={cards} />
    </section>
  );
}

type GoogleRatingSummaryProps = Pick<ReviewsSectionProps, 'googleReviews' | 'googleReviewsError'>;

function GoogleRatingSummary({ googleReviews, googleReviewsError }: GoogleRatingSummaryProps) {
  const rating = googleReviews?.rating;
  return (
    <div>
      {rating !== null && rating !== undefined ? (
        <strong>{rating.toFixed(1)} <span aria-hidden="true">{'★'.repeat(Math.round(rating))}</span></strong>
      ) : (
        <strong>Google rating</strong>
      )}
      <p>
        {googleReviews
          ? `Based on ${(googleReviews.userRatingCount ?? 0).toLocaleString()} Google reviews`
          : googleReviewsError ? 'Google rating temporarily unavailable' : 'Loading live Google rating…'}
      </p>
      <a className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-white underline" href={googleReviews?.googleMapsUri || SITE.googleProfileUrl} target="_blank" rel="noopener noreferrer">
        Read on Google <ArrowUpRight size={12} aria-hidden="true" />
      </a>
    </div>
  );
}
