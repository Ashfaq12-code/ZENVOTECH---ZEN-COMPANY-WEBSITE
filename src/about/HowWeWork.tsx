import { SITE } from '@/config/site';

const steps = [
  { title: 'Talk', description: 'Tell us what you need. We ask questions until we understand the problem you want solved.' },
  { title: 'Plan', description: 'We agree on scope, budget and timeline with you before any work starts.' },
  { title: 'Build', description: 'We design and build in stages and keep you updated at every step.' },
  { title: 'Launch', description: 'We test everything, put it live and walk you through how it works.' },
  { title: 'Support', description: 'After launch we keep it running with maintenance, updates and support.' },
];

export function HowWeWork() {
  return (
    <section className="who-why-section" aria-labelledby="about-process-heading">
      <div className="max-w-6xl mx-auto">
        <div className="who-why-heading">
          <p className="text-[#1668e8] font-mono text-xs tracking-widest uppercase mb-3">Our process</p>
          <h2 id="about-process-heading" className="text-[clamp(1.5rem,7vw,1.875rem)] md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#0d1b2e]">How </span>
            <span className="text-[#1668e8]">{SITE.name}</span>
            <span className="text-[#0d1b2e]"> works</span>
          </h2>
        </div>
        <ol className="who-why-features sm:!grid-cols-2 lg:!grid-cols-5">
          {steps.map((step, i) => (
            <li className="who-why-feature" key={step.title}>
              <span className="who-why-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
