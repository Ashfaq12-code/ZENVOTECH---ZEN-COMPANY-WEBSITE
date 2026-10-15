import type { CSSProperties } from 'react';
import type { TechLogo } from './types';

type TechLogoSectionProps = {
  logos: readonly TechLogo[];
  sectionClassName?: string;
  spacingClassName?: string;
  headingWrapperClassName?: string;
  headingClassName?: string;
  gridClassName?: string;
  logoClassName?: string;
  logoStyle?: CSSProperties;
};

export function TechLogoSection(props: TechLogoSectionProps) {
  const { logos, sectionClassName = '', spacingClassName = 'mt-36 mb-28', headingWrapperClassName = '', headingClassName, gridClassName = '', logoClassName = '', logoStyle } = props;
  return (
    <section className={`${sectionClassName} w-full ${spacingClassName}`}>
      <div className={`section-heading tech-heading ${headingWrapperClassName}`}>
        <p className="eyebrow">Our toolkit</p>
        <h2 className={headingClassName}>Modern technologies<br /><span>we use.</span></h2>
        <p className="section-lede">The right tools for the right job. Always thoughtfully chosen, never just for show.</p>
      </div>
      <div className={`tech-grid ${gridClassName}`}>
        {logos.map((logo) => (
          <div key={logo.alt} className={`tech-card${logo.logoOnly ? ' tech-card--logo-only' : ''}`}>
            <img
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              loading="lazy"
              decoding="async"
              className={`${logoClassName}${logo.heightClass ? ` ${logo.heightClass} w-auto object-contain` : ''}`}
              style={logoStyle}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
