import { lazy, Suspense, useState } from 'react';
import { Plus } from 'lucide-react';
import type { ReviewCardData } from '@/components/reviews/ReviewCard';
import { ReviewMarquee } from '@/components/reviews/ReviewMarquee';
import { SITE } from '@/config/site';
import type { ClientReview } from '../admin/supabase';
import { featuredReviews } from './testimonialsData';

// Loaded on demand so the admin styles and supabase-js stay out of the entry bundle.
const ClientReviewForm = lazy(() => import('../admin/ClientReviewForm'));

type TestimonialsProps = {
  clientReviews: ClientReview[];
  contentError: string;
};

export function Testimonials({ clientReviews, contentError }: TestimonialsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const reviewCards = toReviewCards(clientReviews);

  return (
    <section className="reviews-section who-reviews-section">
      <div className="section-pad reviews-header">
        <div>
          <p className="eyebrow">Kind words</p>
          <h2>{SITE.name} client <span>reviews.</span></h2>
        </div>
        <GoogleRatingBadge onAddReview={() => setShowReviewForm(true)} />
      </div>

      {contentError && <p className="published-content-error section-pad" role="status">Live reviews could not be refreshed: {contentError}</p>}
      <ReviewMarquee cards={reviewCards} />
      {showReviewForm && (
        <Suspense fallback={<p className="sr-only" role="status">Loading review form…</p>}>
          <ClientReviewForm onClose={() => setShowReviewForm(false)} />
        </Suspense>
      )}
    </section>
  );
}

function GoogleRatingBadge({ onAddReview }: { onAddReview: () => void }) {
  return (
    <div className="google-rating">
      <div className="google-g" aria-hidden="true">G</div>
      <div>
        {/* PI! NEED DATA: confirm 5.0 matches the current Google Business Profile rating */}
        <strong>5.0 <span aria-hidden="true">★★★★★</span></strong>
        <p>
          <a href={SITE.googleProfileUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            Based on Google reviews
          </a>
        </p>
      </div>
      <button className="public-review-button" type="button" onClick={onAddReview}><Plus size={14} /> Add a review</button>
    </div>
  );
}

function toReviewCards(clientReviews: ClientReview[]): ReviewCardData[] {
  return [
    ...featuredReviews.map((review, index) => {
      const fakeDaysAgo = [7, 14, 21, 30, 45, 60, 90, 120, 150, 180][index % 10];
      return {
        id: `featured-${index}`,
        quote: review.text,
        name: review.author,
        detail: review.company,
        rating: review.rating,
        avatar: review.avatar,
        createdAt: new Date(Date.now() - fakeDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
      };
    }),
    ...clientReviews.map((review) => ({
      id: review.id,
      quote: review.body,
      name: review.name,
      detail: review.country,
      rating: review.rating,
      avatar: undefined,
      createdAt: review.created_at,
    })),
  ];
}
