import { ArrowUpRight, Play } from 'lucide-react';

import { SITE } from '@/config/site';
import { heroImage } from './media';

// React 18 does not know `fetchPriority`; the lowercase attribute passes through untouched.
const lcpImageHints = { fetchpriority: 'high' };

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero-glow" />
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-dot" /> Digital technologies · Est. 2026</p>
        <h1>Software development <span className="hero-text-nowrap">company in</span><br /><em>Sri Lanka.</em></h1>
        <p className="hero-intro">We build websites, mobile apps, business software and automation for companies in Sri Lanka and abroad, from our team in Kandy.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="#contact">Call our team <ArrowUpRight size={17} /></a>
          <a className="text-link" href="#works"><span className="play-icon"><Play size={12} fill="currentColor" /></span> See our work</a>
        </div>
      </div>
      <div className="hero-art">
        <div className="hero-image-frame">
          <img
            src={heroImage.src}
            width={heroImage.width}
            height={heroImage.height}
            {...lcpImageHints}
            decoding="async"
            alt={`${SITE.name} product and digital strategy concept`}
          />
        </div>
      </div>
    </section>
  );
}
