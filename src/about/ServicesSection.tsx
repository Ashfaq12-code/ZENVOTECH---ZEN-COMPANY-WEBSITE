import { ArrowUpRight, Code2, Globe, Smartphone, Workflow, type LucideIcon } from 'lucide-react';
import { serviceLinks, type ActivePage } from '@/config/navigation';
import { SITE } from '@/config/site';

type ServiceCopy = { title: string; description: string; icon: LucideIcon };

const serviceCopy: Partial<Record<ActivePage, ServiceCopy>> = {
  web: { title: 'Website development', description: 'Business websites, online stores and web apps that work on every screen.', icon: Globe },
  app: { title: 'Mobile app development', description: 'Mobile apps for your customers or your team.', icon: Smartphone },
  software: { title: 'Custom software development', description: 'Systems built around the way your business already runs.', icon: Code2 },
  automation: { title: 'Business automation', description: 'Take repetitive manual work off your team.', icon: Workflow },
};

export function ServicesSection() {
  return (
    <section className="who-why-section" aria-labelledby="about-services-heading">
      <div className="max-w-6xl mx-auto">
        <div className="who-why-heading">
          <p className="text-[#1668e8] font-mono text-xs tracking-widest uppercase mb-3">What we build</p>
          <h2 id="about-services-heading" className="text-[clamp(1.5rem,7vw,1.875rem)] md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#0d1b2e]">Services from </span>
            <span className="text-[#1668e8]">{SITE.name}</span>
          </h2>
        </div>
        <ul className="who-why-features sm:!grid-cols-2 lg:!grid-cols-4">
          {serviceLinks.map(({ page, href }) => {
            const copy = serviceCopy[page];
            if (!copy) return null;
            const Icon = copy.icon;
            return (
              <li className="who-why-feature" key={href}>
                <Icon className="who-why-icon text-[#1668e8]" aria-hidden="true" />
                <h3>
                  <a href={href} className="inline-flex items-center gap-1 hover:text-[#1668e8]">
                    {copy.title} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </h3>
                <p>{copy.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
