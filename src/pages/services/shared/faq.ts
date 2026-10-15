import type { FaqEntry } from '@/lib/structuredData';
import type { ServiceFaq } from './types';

// Schema answers are built from the same strings the accordion shows, so they always match.
export function toFaqEntries(faqs: readonly ServiceFaq[]): FaqEntry[] {
  return faqs.map((faq) => ({
    question: faq.question,
    answer: [faq.answer, ...(faq.points ?? [])].join(' '),
  }));
}
