import { ArrowUpRight } from 'lucide-react';

import { services } from './servicesData';

export function ServicesSection() {
  return (
    <section className="section-pad services-section" id="services">
      <div className="section-heading services-heading">
        <div><p className="eyebrow">What we do</p><h2>Development services <span>in Sri Lanka.</span></h2></div>
        {/* PI! NEED DATA: LKR starting price per service for this lede */}
        <p className="section-lede">Websites, mobile apps, custom software and automation for businesses in Sri Lanka and abroad. Pick a service to see how we work.</p>
      </div>
      <div className="service-list">
        {services.map(({ number, title, text, icon: Icon, href }) => (
          <a href={href} className="service-row-link" key={title}>
            <article className="service-row">
              <span className="service-number">{number}</span>
              <Icon size={27} strokeWidth={1.5} aria-hidden="true" />
              <div className="service-content"><h3>{title}</h3><p>{text}</p></div>
              <ArrowUpRight className="service-arrow" size={23} aria-hidden="true" />
            </article>
          </a>
        ))}
      </div>
    </section>
  );
}
