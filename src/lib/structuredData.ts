import { useEffect } from 'react';

import { SITE } from '@/config/site';

type JsonLd = Record<string, unknown>;

export type FaqEntry = {
  question: string;
  answer: string;
};

// Effects never run in the static prerender, so on the server each call is recorded here and
// entry-server writes it into <head> with the same element id the client hook reuses.
const serverJsonLd = new Map<string, string>();

export function takeServerJsonLd(): { id: string; json: string }[] {
  const entries = [...serverJsonLd].map(([id, json]) => ({ id: `jsonld-${id}`, json }));
  serverJsonLd.clear();
  return entries;
}

// One <script type="application/ld+json"> per id, removed on unmount so routes never leak schema.
export function useJsonLd(id: string, data: JsonLd | null) {
  const serialized = data ? JSON.stringify(data) : null;
  if (typeof document === 'undefined' && serialized) serverJsonLd.set(id, serialized);

  useEffect(() => {
    if (!serialized) return undefined;
    const elementId = `jsonld-${id}`;
    let script = document.getElementById(elementId);
    if (!script) {
      script = document.createElement('script');
      script.id = elementId;
      script.setAttribute('type', 'application/ld+json');
      document.head.append(script);
    }
    script.textContent = serialized;
    return () => script?.remove();
  }, [id, serialized]);
}

// Answers must match the visible FAQ text word for word, or Google ignores the markup.
export function buildFaqPage(path: string, faqs: readonly FaqEntry[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${new URL(path, SITE.url).toString()}#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}
