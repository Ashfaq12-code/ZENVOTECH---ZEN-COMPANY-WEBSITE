import { ArrowDown } from 'lucide-react';
import { SITE } from '@/config/site';
import { HeroVideo } from './HeroVideo';

export function AboutHero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-white overflow-hidden px-4 pt-12 pb-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(22,104,232,0.10), transparent 70%)' }}
      />

      <p className="text-[#1668e8] font-mono text-xs tracking-widest uppercase mb-4">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1668e8] mr-2 mb-0.5" />
        Who we are
      </p>

      <h1 className="text-[clamp(1.5rem,7vw,2rem)] md:text-5xl lg:text-6xl font-bold text-[#0d1b2e] leading-tight mb-6 max-w-4xl">
        About {SITE.name} —{' '}
        <span className="text-[#1668e8]">
          Software development company<br className="hidden sm:block" /> in Kandy, Sri Lanka
        </span>
      </h1>

      <HeroVideo />

      {/* PI! NEED DATA: founding year, team size and client count for this intro */}
      <p className="mt-8 text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
        {SITE.name} is a software development company based in {SITE.address.locality}, {SITE.address.countryName}. We build
        websites, mobile apps, custom software and business automation for startups and small and medium-sized businesses.
      </p>

      <div className="flex flex-col items-center mt-12 gap-2">
        <div className="w-10 h-10 rounded-full bg-[#1668e8] flex items-center justify-center shadow-lg shadow-[#1668e8]/40 animate-bounce">
          <ArrowDown className="w-5 h-5 text-white" />
        </div>
        <div className="w-px h-10 bg-gradient-to-b from-[#1668e8] to-transparent" />
      </div>
    </section>
  );
}
