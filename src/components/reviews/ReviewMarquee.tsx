import { ReviewCard, type ReviewCardData } from './ReviewCard';

// Two rows scrolling in opposite directions; cards alternate between them.
export function ReviewMarquee({ cards }: { cards: readonly ReviewCardData[] }) {
  const rows = [cards.filter((_, index) => index % 2 === 0), cards.filter((_, index) => index % 2 === 1)];
  return (
    <div className="reviews-rows" aria-label="Client reviews">
      {rows.map((row, rowIndex) => <ReviewRow row={row} reverse={rowIndex % 2 === 1} key={`review-row-${rowIndex}`} />)}
    </div>
  );
}

// The marquee loops by rendering each row twice; the copy is hidden from assistive tech.
function ReviewRow({ row, reverse }: { row: readonly ReviewCardData[]; reverse: boolean }) {
  return (
    <div className="reviews-row-window">
      <div className={`reviews-row-track${reverse ? ' reviews-row-track--reverse' : ''}`}>
        {[0, 1].map((copy) => (
          <div className="reviews-row-group" key={`review-group-${copy}`} aria-hidden={copy === 1 ? true : undefined} ref={copy === 1 ? markInert : undefined}>
            {row.map((review) => <ReviewCard review={review} key={`${review.id}-${copy}`} />)}
          </div>
        ))}
      </div>
    </div>
  );
}

// React 18 has no typed `inert` prop; it keeps links in the hidden copy out of the tab order.
function markInert(element: HTMLDivElement | null) {
  element?.setAttribute('inert', '');
}
