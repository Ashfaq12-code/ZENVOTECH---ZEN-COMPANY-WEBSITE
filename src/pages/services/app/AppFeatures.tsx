import type { CSSProperties } from 'react';
import { InViewVideo } from '@/components/InViewVideo';

const tint: CSSProperties = { filter: 'grayscale(1) sepia(1) hue-rotate(185deg) saturate(3) contrast(1.05)' };
const cardClass = 'flex flex-col items-center p-8 rounded-2xl bg-white transition-all duration-300';
const titleClass = 'whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8] mb-3';
const textClass = 'text-[#4c6c9f] text-sm leading-relaxed max-w-xs';

// PI! NEED DATA: confirm license or replace bootestech.com and pjsofttech.com GIFs
const remoteFeatures = [
  {
    gif: 'https://bootestech.com/wp-content/uploads/2024/10/Web-design-2.gif',
    width: 700,
    height: 500,
    alt: 'Illustration of one app running on several devices',
    title: 'Cross-Platform Development',
    text: 'One codebase runs on both iOS and Android, so you reach more customers and maintain one app instead of two.',
  },
  {
    gif: 'https://www.pjsofttech.com/static/media/ecommerce.a75019ea601c2ef17c92.gif',
    width: 550,
    height: 420,
    alt: 'Illustration of an online shopping app',
    title: 'E-Business Optimized Apps',
    text: 'Engineered for conversion — apps integrate frictionless checkouts, secure payments, push notifications, and analytics.',
  },
];

export function AppFeatures() {
  return (
    <section className="mb-28" aria-labelledby="app-features-heading">
      <h2 id="app-features-heading" className="webdev-mobile-section-heading !mb-6 text-center" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
        How we build your <span>app.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className={cardClass}>
          <div className="relative w-56 h-56 mb-6 flex items-center justify-center bg-white">
            <InViewVideo
              sources={[{ src: '/media/app/ux-design.mp4', type: 'video/mp4' }, { src: '/media/app/ux-design.webm', type: 'video/webm' }]}
              poster="/media/app/ux-design-poster.webp"
              width={480}
              height={360}
              className="w-full h-full scale-125 object-contain"
              style={tint}
            />
          </div>
          <h3 className={titleClass}>UX/UI Focused Apps</h3>
          <p className={textClass}>Intuitive interfaces that delight mobile users, streamline micro-interactions, and drive higher retention rates.</p>
        </div>
        {remoteFeatures.map((feature) => (
          <div key={feature.title} className={cardClass}>
            <div className="w-56 h-56 mb-6 flex items-center justify-center bg-white">
              <img src={feature.gif} alt={feature.alt} width={feature.width} height={feature.height} loading="lazy" decoding="async" className="w-full h-full object-contain mix-blend-multiply" style={tint} />
            </div>
            <h3 className={titleClass}>{feature.title}</h3>
            <p className={textClass}>{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
