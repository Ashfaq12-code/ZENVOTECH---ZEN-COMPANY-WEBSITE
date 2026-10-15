import type { ClientReview } from '../admin/supabase';
import type { GoogleReviewPayload } from '../googleReviews';
import type { ReviewCardData } from '@/components/reviews/ReviewCard';
import { testimonialAvatars, testimonials } from './testimonials';

const staticReviewDaysAgo = [7, 14, 21, 30, 45, 60, 90, 120, 150, 180];
const dayMs = 24 * 60 * 60 * 1000;

export function toStaticReviewCards(): ReviewCardData[] {
  return testimonials.map(([quote, name, detail], index) => ({
    id: `featured-${index}`,
    quote,
    name,
    detail,
    rating: 5,
    avatar: testimonialAvatars[name],
    createdAt: new Date(Date.now() - staticReviewDaysAgo[index % 10] * dayMs).toISOString(),
  }));
}

export function toClientReviewCards(reviews: readonly ClientReview[]): ReviewCardData[] {
  return reviews.map((review) => ({
    id: review.id,
    quote: review.body,
    name: review.name,
    detail: review.country,
    rating: review.rating,
    createdAt: review.created_at,
  }));
}

export function toGoogleReviewCards(payload: GoogleReviewPayload | null): ReviewCardData[] {
  return (payload?.reviews ?? []).map((review) => ({
    id: review.id,
    quote: review.text,
    name: review.author.displayName,
    detail: review.relativePublishTimeDescription,
    rating: review.rating,
    avatar: review.author.photoUri ?? undefined,
    createdAt: review.publishTime ?? undefined,
    attributionUrl: review.author.uri ?? undefined,
    source: 'google',
  }));
}
