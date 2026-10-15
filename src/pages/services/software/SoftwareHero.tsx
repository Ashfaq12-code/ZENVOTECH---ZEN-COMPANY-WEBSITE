import { SITE } from '@/config/site';

import { ServiceBreadcrumb } from '../shared/ServiceBreadcrumb';
import { ServiceHeroVideo } from '../shared/ServiceHeroVideo';

const gradientText = 'bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent';

export function SoftwareHero() {
  return (
    <section className="text-center mb-24 max-w-7xl mx-auto">
      <ServiceBreadcrumb current="Software development" />

      <h1 className="webdev-mobile-hero-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] tracking-tight min-h-[3.5rem] md:min-h-[4.5rem] mb-6 flex flex-col lg:flex-row items-center justify-center lg:gap-x-3 lg:whitespace-nowrap">
        <span className={gradientText}>Custom Software Development</span>
        <span className={gradientText}>in Sri Lanka</span>
      </h1>

      <ServiceHeroVideo sources={[{ src: '/media/software/software-hero.mp4', type: 'video/mp4' }]} poster="/media/software/software-hero-poster.webp" />

      <p className="webdev-mobile-hero-copy text-lg md:text-xl text-[#4c6c9f] max-w-4xl mx-auto leading-relaxed">
        Custom software development means building software around the way your business already works, instead of
        bending your team to fit an off-the-shelf tool. <strong className="text-[#1668e8] font-bold">{SITE.name}</strong> builds
        CRMs, ERPs, inventory systems and internal tools for businesses in Sri Lanka and abroad, using{' '}
        <span className="font-semibold text-[#0d1b2e]">Python, Node.js, React, PostgreSQL, Docker and cloud services</span>.
      </p>
    </section>
  );
}
