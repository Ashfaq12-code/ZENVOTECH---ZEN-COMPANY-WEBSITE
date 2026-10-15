import type { CSSProperties, ReactNode } from 'react';
import type { ProjectDetails } from './types';

type ProjectCardProps = {
  title: string;
  href?: string;
  flag?: { src: string; alt: string };
  details?: ProjectDetails;
  children: ReactNode;
  className: string;
  style?: CSSProperties;
  captionClassName: string;
  titleClassName: string;
  linkClassName?: string;
  beforeTitle?: ReactNode;
  afterTitle?: ReactNode;
  /** Rendered under the facts, e.g. a case-study link. */
  footer?: ReactNode;
};

// Device frame goes in children; caption is the same h3 + optional facts on every service page.
export function ProjectCard(props: ProjectCardProps) {
  const { title, href, flag, details, children, className, style, captionClassName, titleClassName, linkClassName, beforeTitle, afterTitle, footer } = props;
  const flagImage = flag && (
    <img src={flag.src} alt={flag.alt} width={24} height={16} loading="lazy" decoding="async" className="w-6 h-4 object-cover rounded-sm shadow-sm" />
  );
  return (
    <div className={className} style={style}>
      {children}
      <div className={captionClassName}>
        {beforeTitle}
        <h3 className={titleClassName}>
          {href ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
              {flagImage}
              {title}
            </a>
          ) : (
            <>
              {flagImage}
              <span>{title}</span>
            </>
          )}
        </h3>
        {afterTitle}
        {details && <ProjectFacts details={details} />}
        {footer}
      </div>
    </div>
  );
}

function ProjectFacts({ details }: { details: ProjectDetails }) {
  const facts = [details.year?.toString(), details.industry, details.platforms?.join(' / ')].filter(Boolean);
  if (facts.length === 0 && !details.outcome) return null;
  return (
    <>
      {facts.length > 0 && <p className="mt-1 text-xs text-[#4c6c9f]">{facts.join(' · ')}</p>}
      {details.outcome && <p className="mt-1 text-sm text-[#4c6c9f]">{details.outcome}</p>}
    </>
  );
}
