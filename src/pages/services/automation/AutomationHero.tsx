import { SITE } from '@/config/site';
import { ServiceBreadcrumb } from '../shared/ServiceBreadcrumb';
import { ServiceHeroVideo } from '../shared/ServiceHeroVideo';

const gradientText = 'bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent';

export function AutomationHero() {
  return (
    <section className="text-center mb-24 max-w-7xl mx-auto">
      <ServiceBreadcrumb current="Automation" />

      <div className="inline-flex translate-y-1 md:translate-y-2 lg:translate-y-3 items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef4ff] border border-[#cde0ff] text-[#1668e8] text-xs font-mono font-semibold uppercase tracking-wider mb-6">
        <span className="w-2 h-2 rounded-full bg-[#1668e8] animate-pulse motion-reduce:animate-none" />
        {SITE.name}
      </div>

      <h1 className="webdev-mobile-hero-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] tracking-tight min-h-[3.5rem] md:min-h-[4.5rem] mb-6 flex flex-col lg:flex-row items-center justify-center lg:gap-x-3 lg:whitespace-nowrap">
        <span className={gradientText}>Business Process Automation</span>
        <span className={gradientText}>in Sri Lanka</span>
      </h1>

      <ServiceHeroVideo sources={[{ src: '/media/automation/automation-hero.mp4', type: 'video/mp4' }]} poster="/media/automation/automation-hero-poster.webp" />

      <p className="webdev-mobile-hero-copy text-lg md:text-xl text-[#4c6c9f] max-w-4xl mx-auto leading-relaxed">
        Business process automation means software does the repetitive work your team now does by hand, such as data
        entry, reports, follow-up messages and stock updates. <strong className="text-[#1668e8] font-bold">{SITE.name}</strong> builds
        these automations for businesses in Sri Lanka, using{' '}
        <span className="font-semibold text-[#0d1b2e]">Python, Node.js, n8n, Make, Puppet, REST APIs and cloud functions</span>,
        so your team can spend its time on work that needs a person.
      </p>
    </section>
  );
}
