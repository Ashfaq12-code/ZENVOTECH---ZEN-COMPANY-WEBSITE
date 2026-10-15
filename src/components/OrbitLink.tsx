import { ArrowUpRight } from 'lucide-react';

import { SITE } from '@/config/site';

type OrbitLinkProps = {
  /** Keeps SVG filter/path ids unique per page. */
  idPrefix: string;
  className?: string;
};

const sinePath = 'M 90 150 C 132.5 100 175 75 217.5 75 C 260 75 302.5 150 345 150 C 387.5 150 430 225 472.5 225 C 515 225 557.5 150 600 150 C 642.5 150 685 75 727.5 75 C 770 75 812.5 150 855 150 C 897.5 150 940 225 982.5 225 C 1025 225 1067.5 150 1110 150';

// "See our work" link riding a glowing sine wave, shown after each FAQ.
export function OrbitLink({ idPrefix, className = '' }: OrbitLinkProps) {
  const glowId = `${idPrefix}-orbit-glow`;
  const textPathId = `${idPrefix}-orbit-text-path`;
  return (
    <section className={`faq-orbit ${className}`.trim()} aria-label="See our work">
      <svg className="faq-orbit-path" viewBox="0 0 1200 300" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <filter id={glowId} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path d={sinePath} fill="none" stroke="#1668e8" strokeWidth="3" filter={`url(#${glowId})`} className="faq-orbit-line" />
      </svg>
      <a className="faq-orbit-marker" href="/#works" aria-label="See our work">
        <span className="faq-orbit-halo" aria-hidden="true" />
        <span className="faq-orbit-ring" aria-hidden="true" />
        <svg className="faq-orbit-text" viewBox="0 0 180 180" aria-hidden="true">
          <defs>
            <path id={textPathId} d="M 90,90 m -69,0 a 69,69 0 1,1 138,0 a 69,69 0 1,1 -138,0" />
          </defs>
          <text>
            <textPath href={`#${textPathId}`}>{`${SITE.name} • `}</textPath>
          </text>
        </svg>
        <span className="faq-orbit-inner" aria-hidden="true">
          <ArrowUpRight size={27} strokeWidth={1.8} />
        </span>
      </a>
    </section>
  );
}
