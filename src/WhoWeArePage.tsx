import { useEffect } from 'react';
import { OrbitLink } from '@/components/OrbitLink';
import { ScrollTopButton } from '@/components/ScrollTopButton';
import { SiteHeader } from '@/components/SiteHeader';
import { AboutFaq } from './about/AboutFaq';
import { AboutHero } from './about/AboutHero';
import { HowWeWork } from './about/HowWeWork';
import { ServicesSection } from './about/ServicesSection';
import { TechnologySection } from './about/TechnologySection';
import { Testimonials } from './about/Testimonials';
import { WhyChoose } from './about/WhyChoose';
import type { ClientReview } from './admin/supabase';
import HomeFooter from './HomeFooter';
import { setPageSeo } from './seo';
import TeamSection from './TeamSection';

type WhoWeArePageProps = {
  clientReviews: ClientReview[];
  contentError: string;
  dashboardProjectCount: number;
};

export default function WhoWeArePage({ clientReviews, contentError, dashboardProjectCount }: WhoWeArePageProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo('about');
    return () => setPageSeo('home');
  }, []);

  return (
    <div className="bg-white min-h-screen font-[Manrope,sans-serif]">
      <SiteHeader active="about" />
      <main id="main" tabIndex={-1} className="pt-20">
        <AboutHero />
        <ServicesSection />
        <WhyChoose dashboardProjectCount={dashboardProjectCount} />
        <TeamSection />
        <TechnologySection />
        <HowWeWork />
        <AboutFaq />
        <OrbitLink idPrefix="who-we-are" />
        <Testimonials clientReviews={clientReviews} contentError={contentError} />
      </main>
      <HomeFooter />
      <ScrollTopButton />
    </div>
  );
}
