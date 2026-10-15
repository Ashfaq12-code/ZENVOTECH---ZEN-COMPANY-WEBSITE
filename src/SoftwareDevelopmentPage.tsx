import { OrbitLink } from '@/components/OrbitLink';
import { ScrollTopButton } from '@/components/ScrollTopButton';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE } from '@/config/site';
import HomeFooter from './HomeFooter';
import { CtaSection } from './pages/services/shared/CtaSection';
import { FaqSection } from './pages/services/shared/FaqSection';
import { ServiceFeatures } from './pages/services/shared/ServiceFeatures';
import { TechLogoSection } from './pages/services/shared/TechLogoSection';
import { useServicePageSetup } from './pages/services/shared/useServicePageSetup';
import { softwareFaqs, softwareFeatures, softwareTechStack } from './pages/services/software/softwareContent';
import { SoftwareHero } from './pages/services/software/SoftwareHero';
import { SoftwarePortfolio } from './pages/services/software/SoftwarePortfolio';

const logoStyle = { height: 'auto', filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' };

export default function SoftwareDevelopmentPage() {
  useServicePageSetup('software');

  return (
    <div className="webdev-page min-h-screen bg-white text-[#0d1b2e] font-[Manrope,sans-serif] overflow-x-hidden selection:bg-[#1668e8] selection:text-white">
      <SiteHeader active="software" />

      <main id="main" tabIndex={-1} className="pt-28 pb-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <SoftwareHero />
          <ServiceFeatures id="software-features-heading" heading={<>What we <span>build.</span></>} features={softwareFeatures} />
          <SoftwarePortfolio />
          <TechLogoSection
            logos={softwareTechStack}
            headingClassName="webdev-mobile-section-heading"
            gridClassName="software-tech-grid"
            logoClassName="tech-logo"
            logoStyle={logoStyle}
          />
          <FaqSection
            path="/services/software-development"
            idPrefix="software"
            headingClassName="webdev-mobile-section-heading"
            faqs={softwareFaqs}
            heading={<>Custom Software Development FAQs:<br /><span className="text-[#1668e8]">What Clients In Sri Lanka Ask Us.</span></>}
          />
          <OrbitLink idPrefix="softdev" className="my-24 rounded-3xl" />
          <CtaSection
            current="software"
            tagline="Let's Build Together"
            heading="Launch Your Business"
            accent={`Smarter With ${SITE.name}`}
            headingClassName="software-mobile-cta-heading"
            accentClassName="software-mobile-cta-heading text-[#1668e8]"
            ctaLabel="Start Your Project"
            lede="Tell us how your team works today and get software built around it."
          />
        </div>
      </main>

      <HomeFooter showMap={false} />
      <ScrollTopButton showAfter={400} />
    </div>
  );
}
