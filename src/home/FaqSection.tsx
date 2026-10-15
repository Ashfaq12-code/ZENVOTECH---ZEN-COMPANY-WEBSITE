import { useState } from 'react';

import { buildFaqPage, useJsonLd } from '@/lib/structuredData';
import { faqItems } from './faqData';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  useJsonLd('faq', buildFaqPage('/', faqItems));

  return (
    <section className="faq-section section-pad" aria-labelledby="faq-title">
      <div className="faq-heading">
        <p className="eyebrow">Frequently asked questions</p>
        <h2 id="faq-title">Your questions, <span>answered.</span></h2>
      </div>
      <div className="faq-list">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
              <h3 className="m-0">
                <button
                  className="faq-question"
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle-icon" aria-hidden="true"><i /><i /></span>
                </button>
              </h3>
              <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-labelledby={`faq-question-${index}`} aria-hidden={!isOpen}>
                <div className="faq-answer-inner"><p>{item.answer}</p></div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
