import { Fragment } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { serviceLinks, type ActivePage } from '@/config/navigation';

type CtaSectionProps = {
  current: ActivePage;
  tagline: string;
  /** First heading line; omit for a one-line heading made of `accent` only. */
  heading?: string;
  accent: string;
  sectionClassName?: string;
  headingClassName?: string;
  accentClassName: string;
  ctaLabel?: string;
  lede?: string;
  ledePosition?: 'above' | 'below';
};

const headingBase = 'block text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight';
const ledeBase = 'relative text-[#4c6c9f] text-base md:text-lg max-w-xl mx-auto leading-relaxed';

export function CtaSection(props: CtaSectionProps) {
  const { current, tagline, heading, accent, sectionClassName = '', headingClassName = '', accentClassName, ctaLabel = 'Get a quote', lede, ledePosition = 'above' } = props;
  return (
    <section className={`${sectionClassName} relative w-full rounded-3xl mt-20 mb-4 py-20 px-6 sm:px-12 bg-white text-[#0d1b2e] overflow-hidden flex flex-col justify-center items-center text-center`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1668e8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7cb5ff]/10 rounded-full blur-3xl pointer-events-none" />
      <p className="text-[#0d4db5] text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b border-[#1668e8] pb-1">
        {tagline}
      </p>
      <h2>
        {heading && <span className={`${headingClassName} ${headingBase} mb-3`}>{heading}</span>}
        <span className={`${accentClassName} ${headingBase} mb-10`}>{accent}</span>
      </h2>
      {lede && ledePosition === 'above' && <p className={`${ledeBase} mb-10`}>{lede}</p>}
      <CtaButtons label={ctaLabel} />
      {lede && ledePosition === 'below' && <p className={`${ledeBase} mt-10`}>{lede}</p>}
      <RelatedServices current={current} />
    </section>
  );
}

function CtaButtons({ label }: { label: string }) {
  return (
    <div className="flex w-full flex-row items-center justify-center gap-2 sm:w-auto sm:gap-4">
      <a
        href="/#contact"
        className="relative inline-flex min-w-0 flex-1 items-center justify-center gap-1 px-2.5 py-3 sm:flex-none sm:gap-3 sm:px-12 sm:py-5 font-bold text-xs sm:text-base text-white whitespace-nowrap rounded-xl bg-[#1668e8] hover:bg-[#0d4db5] border border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>{label}</span>
        <ArrowUpRight size={14} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-[18px] sm:w-[18px]" />
        <span className="cta-button-shimmer" aria-hidden="true" />
      </a>
      <a
        href="/who-we-are"
        className="inline-flex w-[7.75rem] shrink-0 items-center justify-center px-2 py-3 sm:w-auto sm:gap-2 sm:px-8 sm:py-4 rounded-xl border border-[#1668e8] text-[#1668e8] font-bold text-xs sm:text-sm hover:bg-[#eef4ff] hover:scale-105 active:scale-95 transition-all duration-300"
      >
        Meet the team
      </a>
    </div>
  );
}

function RelatedServices({ current }: { current: ActivePage }) {
  const others = serviceLinks.filter((link) => link.page !== current);
  return (
    <p className="relative mt-8 text-sm text-[#4c6c9f]">
      We also do{' '}
      {others.map((link, index) => (
        <Fragment key={link.href}>
          {index > 0 && (index === others.length - 1 ? ' and ' : ', ')}
          <a href={link.href} className="font-semibold text-[#1668e8] hover:underline">{link.label.toLowerCase()}</a>
        </Fragment>
      ))}
      .
    </p>
  );
}
