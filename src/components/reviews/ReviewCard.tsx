import { formatRelativeTime } from '@/admin/supabase';

export type ReviewCardData = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  rating: number;
  avatar?: string;
  createdAt?: string;
  attributionUrl?: string;
  source?: 'google';
};

export function ReviewCard({ review }: { review: ReviewCardData }) {
  return (
    <article className="review-card">
      <div className="review-card-header">
        {review.avatar ? (
          <img src={review.avatar} alt={review.name} className="review-card-avatar" width={40} height={40} loading="lazy" decoding="async" />
        ) : (
          <span className="review-card-avatar-fallback" aria-hidden="true">{initialsOf(review.name)}</span>
        )}
        <div className="review-card-meta">
          <div className="review-card-name-row">
            {review.attributionUrl ? (
              <a className="review-card-name review-card-attribution" href={review.attributionUrl} target="_blank" rel="noreferrer">
                {review.name}
              </a>
            ) : (
              <strong className="review-card-name">{review.name}</strong>
            )}
            {review.detail && <span className="review-card-location">{review.detail}</span>}
          </div>
          <div className="review-card-stars" aria-label={`${review.rating} out of 5 stars`}>
            {'★'.repeat(review.rating)}
            <span className="review-card-stars-empty">{'★'.repeat(Math.max(0, 5 - review.rating))}</span>
          </div>
        </div>
      </div>
      {review.quote && <p className="review-card-quote">“{review.quote.replace(/^“|”$/g, '')}”</p>}
      {review.createdAt && <span className="review-card-time">{formatRelativeTime(review.createdAt)}</span>}
      {review.source === 'google' && <span className="review-card-google-attribution">Google review</span>}
    </article>
  );
}

function initialsOf(name: string): string {
  return name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase();
}
