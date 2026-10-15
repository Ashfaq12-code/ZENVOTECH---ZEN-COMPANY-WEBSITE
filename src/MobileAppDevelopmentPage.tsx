import { OrbitLink } from '@/components/OrbitLink';
import { ScrollTopButton } from '@/components/ScrollTopButton';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE } from '@/config/site';
import HomeFooter from './HomeFooter';
import { AppFeatures } from './pages/services/app/AppFeatures';
import { AppHero } from './pages/services/app/AppHero';
import { AppPortfolio } from './pages/services/app/AppPortfolio';
import { appFaqs } from './pages/services/app/appFaqs';
import { appLogos } from './pages/services/app/appLogos';
import { CtaSection } from './pages/services/shared/CtaSection';
import { FaqSection } from './pages/services/shared/FaqSection';
import { TechLogoSection } from './pages/services/shared/TechLogoSection';
import { useServicePageSetup } from './pages/services/shared/useServicePageSetup';

export default function MobileAppDevelopmentPage() {
  useServicePageSetup('apps');
  return (
    <div className="min-h-screen bg-white text-[#0d1b2e] font-[Manrope,sans-serif] overflow-x-hidden selection:bg-[#1668e8] selection:text-white">
      <SiteHeader active="app" />
      <main id="main" tabIndex={-1} className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <AppHero />
          <AppFeatures />
          <AppPortfolio />
          <TechLogoSection
            logos={appLogos}
            sectionClassName="mobile-tech-stack"
            headingWrapperClassName="mobile-tech-heading"
            gridClassName="mobile-tech-grid"
            logoClassName="mobile-tech-logo"
          />
          <FaqSection
            path="/services/app-development"
            idPrefix="appdev"
            heading={<>Mobile app development FAQs:<br /><span className="text-[#1668e8]">Common questions from our app clients.</span></>}
            faqs={appFaqs}
          />
          <OrbitLink idPrefix="appdev" className="my-24 rounded-3xl" />
          <CtaSection
            current="app"
            tagline="Ready To Build Your App"
            heading="Launch Your Business"
            accent={`Smarter With ${SITE.name}`}
            sectionClassName="appdev-cta"
            headingClassName="appdev-cta-heading"
            accentClassName="appdev-cta-heading appdev-cta-heading--accent"
          />
        </div>
      </main>
      <HomeFooter showMap={false} />
      <ScrollTopButton showAfter={400} />
    </div>
  );
}
