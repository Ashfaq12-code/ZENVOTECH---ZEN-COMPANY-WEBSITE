import { OrbitLink } from '@/components/OrbitLink';
import { ScrollTopButton } from '@/components/ScrollTopButton';
import { SiteHeader } from '@/components/SiteHeader';
import { SITE } from '@/config/site';
import HomeFooter from './HomeFooter';
import { automationFaqs, automationFeatures, automationTechStack } from './pages/services/automation/automationContent';
import { AutomationHero } from './pages/services/automation/AutomationHero';
import { AutomationPortfolio } from './pages/services/automation/AutomationPortfolio';
import { CtaSection } from './pages/services/shared/CtaSection';
import { FaqSection } from './pages/services/shared/FaqSection';
import { ServiceFeatures } from './pages/services/shared/ServiceFeatures';
import { TechLogoSection } from './pages/services/shared/TechLogoSection';
import { useServicePageSetup } from './pages/services/shared/useServicePageSetup';

const logoStyle = { height: 'auto', filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' };

export default function AutomationPage() {
  useServicePageSetup('automation');

  return (
    <div className="webdev-page min-h-screen bg-white text-[#0d1b2e] font-[Manrope,sans-serif] overflow-x-hidden selection:bg-[#1668e8] selection:text-white">
      <SiteHeader active="automation" />

      <main id="main" tabIndex={-1} className="pt-28 pb-4">
        <div className="container mx-auto px-4 max-w-7xl">
          <AutomationHero />
          <ServiceFeatures id="automation-features-heading" heading={<>What we <span>automate.</span></>} features={automationFeatures} />
          <AutomationPortfolio />
          <TechLogoSection
            logos={automationTechStack}
            spacingClassName="mt-20 mb-28"
            headingClassName="webdev-mobile-section-heading"
            gridClassName="automation-tech-grid"
            logoClassName="tech-logo"
            logoStyle={logoStyle}
          />
          <FaqSection
            path="/services/automation"
            idPrefix="automation"
            headingClassName="webdev-mobile-section-heading"
            faqs={automationFaqs}
            heading={<>Business Automation FAQs:<br /><span className="text-[#1668e8]">What Clients In Sri Lanka Ask Us.</span></>}
          />
          <OrbitLink idPrefix="automation" className="my-24 rounded-3xl" />
          <CtaSection
            current="automation"
            tagline="Automate Your Business"
            accent={`Smarter With ${SITE.name}`}
            accentClassName="webdev-mobile-cta-heading"
            ctaLabel="Start Your Project"
            lede="Hand the repetitive work to software and give your team those hours back."
            ledePosition="below"
          />
        </div>
      </main>

      <HomeFooter showMap={false} />
      <ScrollTopButton showAfter={400} />
    </div>
  );
}
