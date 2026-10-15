import { MessageSquareText, Trash2 } from 'lucide-react';
import { websiteTestimonials } from './adminData';
import type { DisplayReview } from './adminData';
import { EmptyState } from './AdminWidgets';
import type { ClientReview } from './supabase';
import { formatRelativeTime } from './supabase';

type ReviewRow = DisplayReview & { rawReview?: ClientReview };

export function ReviewsTab({ reviews, onDelete }: { reviews: ClientReview[]; onDelete: (review: ClientReview) => void }) {
  const allDisplayReviews: ReviewRow[] = [
    ...reviews.map((review) => ({ ...review, rawReview: review })),
    ...websiteTestimonials.map((testimonial, index) => ({ ...testimonial, id: `static-${index}` })),
  ];

  return (
    <section className="admin-section">
      <div className="admin-section-intro">
        <div>
          <p className="admin-kicker">CLIENT VOICES</p>
          <h2>Client reviews <span className="admin-count-badge">{allDisplayReviews.length}</span></h2>
        </div>
        <span className="admin-live-label"><span className="admin-live-dot" /> Live updates on</span>
      </div>
      {allDisplayReviews.length ? (
        <div className="admin-reviews-section reviews-rows">
          {[0, 1].map((rowIndex) => {
            const rowReviews = allDisplayReviews.filter((_, index) => index % 2 === rowIndex);
            if (!rowReviews.length) return null;
            return (
              <div className="reviews-row-window" key={rowIndex}>
                <div className={`reviews-row-track${rowIndex === 1 ? ' reviews-row-track--reverse' : ''}`}>
                  {[0, 1].map((copy) => (
                    <div className="reviews-row-group" key={copy}>
                      {rowReviews.map((review) => <ReviewCard key={`${copy}-${review.id}`} review={review} onDelete={onDelete} />)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState icon={<MessageSquareText size={30} />} title="No client reviews yet" message="Reviews submitted on the public site will appear here in real time." />
      )}
    </section>
  );
}

function ReviewCard({ review, onDelete }: { review: ReviewRow; onDelete: (review: ClientReview) => void }) {
  const { rawReview } = review;
  return (
    <div className="admin-slim-review-card">
      {review.avatar ? (
        <img src={review.avatar} alt={review.name} className="admin-slim-avatar" loading="lazy" decoding="async" />
      ) : (
        <div className="admin-slim-avatar-fallback">
          {review.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
        </div>
      )}
      <div className="admin-slim-content">
        <div className="admin-slim-topline">
          <span className="admin-slim-name">{review.name}</span>
          <span className="admin-slim-location">{review.country}</span>
          <div className="admin-slim-stars" aria-label={`${review.rating} stars`}>
            {'★'.repeat(review.rating)}
          </div>
        </div>
        <p className="admin-slim-quote">“{review.body}”</p>
        <div className="admin-slim-footer">
          <span className="admin-slim-time">{formatRelativeTime(review.created_at)}</span>
          {rawReview && (
            <button className="admin-icon-button admin-danger-icon" aria-label={`Delete review by ${review.name}`} onClick={() => onDelete(rawReview)}>
              <Trash2 size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
