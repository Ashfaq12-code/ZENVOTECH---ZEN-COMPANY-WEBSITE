import type { ReactNode } from 'react';

export type ServiceFeature = {
  title: string;
  body: string;
  gif: { src: string; width: number; height: number };
};

type ServiceFeaturesProps = {
  id: string;
  heading: ReactNode;
  features: readonly ServiceFeature[];
};

export function ServiceFeatures({ id, heading, features }: ServiceFeaturesProps) {
  return (
    <section className="mb-28" aria-labelledby={id}>
      <h2 id={id} className="webdev-mobile-section-heading text-center !mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
        {heading}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-center">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center p-8 bg-white">
            <div className="w-52 h-52 mb-6 flex items-center justify-center">
              <img
                src={feature.gif.src}
                alt=""
                width={feature.gif.width}
                height={feature.gif.height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
                style={{ filter: 'hue-rotate(70deg)' }}
              />
            </div>
            <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">{feature.title}</h3>
            <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
