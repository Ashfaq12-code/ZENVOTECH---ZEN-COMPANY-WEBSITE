import { OrbitLink } from '@/components/OrbitLink';
import { ScrollTopButton } from '@/components/ScrollTopButton';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE } from '@/config/site';
import HomeFooter from './HomeFooter';
import { CtaSection } from './pages/services/shared/CtaSection';
import { FaqSection } from './pages/services/shared/FaqSection';
import { TechLogoSection } from './pages/services/shared/TechLogoSection';
import { useServicePageSetup } from './pages/services/shared/useServicePageSetup';
import { WebFeatures } from './pages/services/web/WebFeatures';
import { WebHero } from './pages/services/web/WebHero';
import { WebPageStyles } from './pages/services/web/WebPageStyles';
import { WebPortfolio } from './pages/services/web/WebPortfolio';
import { webFaqs } from './pages/services/web/webFaqs';
import { webLogos } from './pages/services/web/webLogos';

const logoFilter = { filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' };

export default function WebsiteDevelopmentPage() {
  useServicePageSetup('websites');
  return (
    <div className="webdev-page min-h-screen bg-white text-[#0d1b2e] font-[Manrope,sans-serif] overflow-x-hidden selection:bg-[#1668e8] selection:text-white">
      <SiteHeader active="web" />
      <main id="main" tabIndex={-1} className="pt-28 pb-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <WebHero />
          <WebFeatures />
          <WebPortfolio />
          <TechLogoSection logos={webLogos} headingClassName="webdev-mobile-section-heading" gridClassName="webdev-toolkit-grid" logoStyle={logoFilter} />
          <FaqSection
            path="/services/website-development"
            idPrefix="webdev"
            headingClassName="webdev-mobile-section-heading"
            heading={<>Website development FAQs:<br /><span className="text-[#1668e8]">Common questions from our web clients.</span></>}
            faqs={webFaqs}
          />
          <OrbitLink idPrefix="webdev" className="my-24 rounded-3xl" />
          <CtaSection
            current="web"
            tagline="Let's Build Together"
            heading="Launch Your Business"
            accent={`Smarter With ${SITE.name}`}
            headingClassName="webdev-mobile-cta-heading"
            accentClassName="webdev-mobile-cta-heading text-[#1668e8]"
          />
        </div>
      </main>
      <HomeFooter showMap={false} />
      <ScrollTopButton showAfter={400} />
      <WebPageStyles />
    </div>
  );
}
