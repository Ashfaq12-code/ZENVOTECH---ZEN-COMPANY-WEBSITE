import { useState, type ReactNode } from 'react';
import { buildFaqPage, useJsonLd } from '@/lib/structuredData';
import { toFaqEntries } from './faq';
import type { ServiceFaq } from './types';

type FaqSectionProps = {
  path: string;
  idPrefix: string;
  heading: ReactNode;
  headingClassName?: string;
  faqs: readonly ServiceFaq[];
};

export function FaqSection({ path, idPrefix, heading, headingClassName = '', faqs }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  useJsonLd('faq', buildFaqPage(path, toFaqEntries(faqs)));

  return (
    <section className="w-full max-w-4xl mx-auto mt-28 mb-32 px-4" aria-labelledby={`${idPrefix}-faq-heading`}>
      <p className="text-center text-[#1668e8] font-mono text-xs tracking-widest uppercase font-semibold mb-3">
        Frequently Asked Questions
      </p>
      <h2 id={`${idPrefix}-faq-heading`} className={`text-center text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-14 leading-snug ${headingClassName}`}>
        {heading}
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FaqItem
            key={faq.question}
            faq={faq}
            id={`${idPrefix}-faq-${index}`}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex((prev) => (prev === index ? null : index))}
          />
        ))}
      </div>
    </section>
  );
}

type FaqItemProps = {
  faq: ServiceFaq;
  id: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqItem({ faq, id, isOpen, onToggle }: FaqItemProps) {
  const iconClass = `text-xl font-bold ${isOpen ? 'text-[#1668e8]' : 'text-gray-400'}`;
  return (
    <div
      className={`rounded-xl p-6 transition-all duration-300 motion-reduce:transition-none border ${
        isOpen
          ? 'border-[#1668e8] bg-[#eef4ff] shadow-[0_8px_24px_rgba(22,104,232,0.12)]'
          : 'border-[#e2ecfa] bg-[#f8fbff] hover:border-[#1668e8]/50 hover:bg-white'
      }`}
    >
      <OpenBar isOpen={isOpen} />
      <h3 className="text-[#0d1b2e] font-bold text-base md:text-lg">
        <button
          type="button"
          id={`${id}-button`}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        >
          <span className="flex items-center gap-3">
            <span className={iconClass} aria-hidden="true">{isOpen ? '×' : '+'}</span>
            {faq.question}
          </span>
          <span className={`${iconClass} flex-shrink-0`} aria-hidden="true">{isOpen ? '–' : '+'}</span>
        </button>
      </h3>
      <FaqAnswer faq={faq} id={id} isOpen={isOpen} />
    </div>
  );
}

function OpenBar({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className="h-1 rounded-full mb-3 transition-transform duration-500 motion-reduce:transition-none"
      style={{
        transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        background: 'linear-gradient(to right, #99bbf7, #1668e8, #99bbf7)',
      }}
    />
  );
}

function FaqAnswer({ faq, id, isOpen }: Omit<FaqItemProps, 'onToggle'>) {
  return (
    <div
      id={`${id}-panel`}
      role="region"
      aria-labelledby={`${id}-button`}
      aria-hidden={!isOpen}
      className="overflow-hidden transition-all duration-400 motion-reduce:transition-none"
      style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
    >
      <div className="text-[#4c6c9f] text-sm md:text-base mt-4 leading-relaxed border-t border-[#dce8ff] pt-4">
        {faq.answer}
        {faq.points && (
          <ul className="mt-6">
            {faq.points.map((point) => (
              <li key={point} className="block font-medium text-[#1668e8]">
                <span aria-hidden="true">• </span>{point}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
