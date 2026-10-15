import { lazy, Suspense, useCallback, useState } from 'react';

import { OrbitLink } from '@/components/OrbitLink';
import { ScrollTopButton } from '@/components/ScrollTopButton';
import { SiteHeader } from '@/components/SiteHeader';
import HomeFooter from '../HomeFooter';
import { useGoogleReviews } from './useGoogleReviews';
import type { PublishedContent } from './usePublishedContent';
import { useHeroVisible } from './useHeroVisible';
import { useInitialHashScroll } from './useInitialHashScroll';
import { ApproachSection } from './ApproachSection';
import { ContactSection } from './ContactSection';
import { FaqSection } from './FaqSection';
import { HeroSection } from './HeroSection';
import { HomeTeamSection } from './HomeTeamSection';
import { ReviewsSection } from './ReviewsSection';
import { ServicesSection } from './ServicesSection';
import { TechSection } from './TechSection';
import { TrustSection } from './TrustSection';
import { WhatsAppWidget } from './WhatsAppWidget';
import { WorksSection } from './WorksSection';
import '../admin/PublicContent.css';

const ClientReviewForm = lazy(() => import('../admin/ClientReviewForm'));

export function HomePage({ content }: { content: PublishedContent }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);
  const closeWhatsAppChat = useCallback(() => setShowWhatsAppChat(false), []);
  const toggleWhatsAppChat = () => setShowWhatsAppChat((isOpen) => !isOpen);
  const heroVisible = useHeroVisible(closeWhatsAppChat);
  const googleReviews = useGoogleReviews(true);
  useInitialHashScroll();

  return (
    <div className="site-shell">
      <SiteHeader active="home" />
      <main id="main" tabIndex={-1}>
        <HeroSection />
        <TrustSection />
        <ApproachSection />
        <HomeTeamSection />
        <TechSection />
        <ServicesSection />
        <WorksSection latestProjects={content.projects} contentError={content.error} />
        <ReviewsSection clientReviews={content.reviews} contentError={content.error} googleReviews={googleReviews.data} googleReviewsError={googleReviews.error} onAddReview={() => setShowReviewForm(true)} />
        <FaqSection />
        <OrbitLink idPrefix="home" />
        <ContactSection />
      </main>
      <HomeFooter onWhatsAppClick={toggleWhatsAppChat} />
      <WhatsAppWidget open={showWhatsAppChat} heroVisible={heroVisible} onToggle={toggleWhatsAppChat} onClose={closeWhatsAppChat} />
      <ScrollTopButton hideOverFooter />
      {showReviewForm && (
        <Suspense fallback={<p className="sr-only" role="status">Loading review form…</p>}>
          <ClientReviewForm onClose={() => setShowReviewForm(false)} />
        </Suspense>
      )}
    </div>
  );
}
