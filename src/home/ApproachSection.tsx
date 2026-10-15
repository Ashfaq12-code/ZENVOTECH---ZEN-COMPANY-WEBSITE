import { useEffect, useRef } from 'react';

import { SITE } from '@/config/site';

// PI! NEED DATA: confirm license or replace dynessco.com approach icons
const approachItems = [
  { number: '01', icon: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-1.svg', width: 85, motion: 'bounce', title: 'Proven technical expertise', text: 'Deep craft across modern frameworks and platforms, delivering reliable solutions that scale with you.' },
  { number: '02', icon: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-2.svg', width: 138, motion: 'rotate', title: 'Client-centric approach', text: 'We listen, adapt, and collaborate closely so every decision is aligned with your business goals.' },
  { number: '03', icon: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-3.svg', width: 105, motion: 'shake', title: 'End-to-end support', text: 'From first sketch to post-launch, we stay in your corner with guidance and continuous improvement.' },
] as const;

export function ApproachSection() {
  const grid = useRef<HTMLDivElement>(null);

  // On mobile the icon animation starts once each card scrolls into view.
  useEffect(() => {
    const articles = grid.current?.querySelectorAll<HTMLElement>('article');
    if (!articles?.length) return undefined;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
    }, { threshold: 0.2 });
    articles.forEach((article) => observer.observe(article));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-pad approach" id="about">
      <div className="section-heading">
        <p className="eyebrow">The {SITE.name} difference</p>
        <h2>Software development <span>from Kandy.</span></h2>
        {/* PI! NEED DATA: concrete facts for this lede (projects delivered, years, team size) */}
        <p className="section-lede">We plan, design, build and support websites, mobile apps, custom software and automation for growing businesses.</p>
      </div>
      <div className="approach-grid" ref={grid}>
        {approachItems.map((item) => (
          <article key={item.number}>
            <span className="number">{item.number}</span>
            <img className={`approach-icon approach-icon-${item.motion}`} src={item.icon} width={item.width} height={120} loading="lazy" decoding="async" alt="" aria-hidden="true" />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
