import { useState } from 'react';
import { SITE } from '@/config/site';
import { buildFaqPage, useJsonLd, type FaqEntry } from '@/lib/structuredData';
import { aboutFaqs } from './faqData';

export function AboutFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  useJsonLd('faq', buildFaqPage('/who-we-are', aboutFaqs));

  return (
    <section className="relative py-24 px-4 bg-white overflow-hidden" aria-labelledby="about-faq-heading">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(22,104,232,0.07), transparent 70%)' }}
      />
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-[#1668e8] font-mono text-xs tracking-widest uppercase mb-3">
          Frequently Asked Questions
        </p>
        <h2 id="about-faq-heading" className="text-center text-3xl md:text-4xl font-extrabold text-[#0d1b2e] mb-14 leading-snug">
          About {SITE.name}: FAQs
        </h2>
        <div className="space-y-3">
          {aboutFaqs.map((faq, i) => (
            <FaqItem key={faq.question} faq={faq} index={i} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </div>
      </div>
    </section>
  );
}

type FaqItemProps = { faq: FaqEntry; index: number; isOpen: boolean; onToggle: () => void };

function FaqItem({ faq, index, isOpen, onToggle }: FaqItemProps) {
  const buttonId = `about-faq-q-${index}`;
  const panelId = `about-faq-a-${index}`;
  const signClass = isOpen ? 'text-[#1668e8]' : 'text-gray-400';

  return (
    <div
      className={`rounded-xl p-5 border transition-all duration-300 ${
        isOpen ? 'border-[#1668e8] bg-[#eef4ff] shadow-[0_0_0_3px_rgba(22,104,232,0.12)]' : 'border-gray-200 bg-gray-50 hover:border-[#1668e8]/40'
      }`}
    >
      <div
        className="h-0.5 rounded-full mb-3 transition-all duration-500"
        style={{ background: 'linear-gradient(to right,#a8c8f8,#1668e8,#a8c8f8)', transform: `scaleX(${isOpen ? 1 : 0})`, transformOrigin: 'left' }}
      />
      <h3 className="text-[#0d1b2e] font-semibold text-sm md:text-base">
        <button id={buttonId} type="button" aria-expanded={isOpen} aria-controls={panelId} onClick={onToggle} className="flex w-full items-center justify-between gap-3 text-left">
          <span className="flex items-center gap-3">
            <span className={`text-xl font-bold leading-none ${signClass}`} aria-hidden="true">{isOpen ? '×' : '+'}</span>
            {faq.question}
          </span>
          <span className={`text-xl flex-shrink-0 ${signClass}`} aria-hidden="true">{isOpen ? '–' : '+'}</span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
      >
        <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  );
}
