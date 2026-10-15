import { SITE } from '@/config/site';
import { CompanyMetrics } from './CompanyMetrics';

const features = [
  {
    img: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-1.svg',
    title: 'Proven Technical Expertise',
    description:
      'Deep craft across modern frameworks and platforms, delivering reliable solutions that scale with you. Years of hands-on experience across multiple industries back every line of code we ship.',
  },
  {
    img: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-2.svg',
    title: 'Client-Centric Approach',
    description:
      'Your success is our priority. We work closely with you throughout every stage, ensuring full transparency, open communication, and solutions tailored specifically to your goals.',
  },
  {
    img: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-3.svg',
    title: 'Scalable & Future-Ready Technology',
    description:
      'We build robust, secure, and scalable software using the latest technologies. Our solutions are designed to grow with your business and adapt to evolving market needs.',
  },
];

export function WhyChoose({ dashboardProjectCount }: { dashboardProjectCount: number }) {
  return (
    <section className="who-why-section">
      <div className="max-w-6xl mx-auto">
        <div className="who-why-heading">
          <p className="text-[#1668e8] font-mono text-xs tracking-widest uppercase mb-3">
            Why {SITE.name}
          </p>
          <h2 className="text-[clamp(1.5rem,7vw,1.875rem)] md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#0d1b2e]">Why businesses in Sri Lanka<br className="hidden sm:block" /> choose </span>
            <span className="text-[#1668e8]">{SITE.name}</span>
          </h2>
        </div>

        <CompanyMetrics dashboardProjectCount={dashboardProjectCount} />

        <div className="who-why-features">
          {features.map((f, i) => (
            <article className="who-why-feature" key={f.title}>
              <span className="who-why-number" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <img
                src={f.img}
                alt=""
                aria-hidden="true"
                className="who-why-icon"
                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }}
              />
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
