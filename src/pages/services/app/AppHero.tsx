import { SITE } from '@/config/site';
import { ServiceBreadcrumb } from '../shared/ServiceBreadcrumb';
import { ServiceHeroVideo } from '../shared/ServiceHeroVideo';

const gradientText = 'bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent';

export function AppHero() {
  return (
    <section className="text-center mb-24 max-w-5xl mx-auto">
      <ServiceBreadcrumb current="App development" />
      <h1 className="webdev-mobile-hero-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] tracking-tight min-h-[3.5rem] md:min-h-[4.5rem] mb-6 flex flex-col items-center justify-center">
        <span className={gradientText}>Mobile App Development</span>
        <span className={gradientText}>in Sri Lanka</span>
      </h1>
      <ServiceHeroVideo sources={[{ src: '/media/app/hero.mp4', type: 'video/mp4' }]} poster="/media/app/hero-poster.webp" shade />
      <p className="webdev-mobile-hero-copy text-lg md:text-xl text-[#4c6c9f] max-w-4xl mx-auto leading-relaxed">
        <strong className="text-[#1668e8] font-bold">{SITE.name}</strong> is a mobile app development company in {SITE.address.countryName}.
        We design and build iOS and Android apps for startups and established businesses, in Sri Lanka and abroad.
        You get clear UX/UI design, backend integrations and cross-platform code, so one app reaches customers on both platforms.
      </p>
    </section>
  );
}
