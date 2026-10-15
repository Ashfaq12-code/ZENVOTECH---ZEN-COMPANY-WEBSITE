// PI! NEED DATA: confirm license or replace dynessco.com feature GIFs
const features = [
  {
    gif: 'https://dynessco.com/wp-content/uploads/2025/06/Web-Design-Layout-1.gif',
    size: 1200,
    alt: 'Illustration of a web page layout being designed',
    title: 'Fully Modern Design & Development',
    text: 'We design clean, easy-to-use pages that match your brand, so visitors see who you are and what to do next.',
  },
  {
    gif: 'https://dynessco.com/wp-content/uploads/2025/06/Choose-Your-Colors.gif',
    size: 500,
    alt: 'Illustration of a site adapting to different screen sizes',
    title: 'Responsive Multi-Device Development',
    text: 'Your site works on every screen size, from wide desktop monitors to phones and tablets.',
  },
  {
    gif: 'https://dynessco.com/wp-content/uploads/2025/06/Employee-getting-Customer-requirements.gif',
    size: 500,
    alt: 'Illustration of a team gathering customer requirements',
    title: 'Conversion-Optimized Architecture',
    text: 'Each page is planned around a clear next step, such as calling, booking or buying, to turn visitors into leads.',
  },
];

export function WebFeatures() {
  return (
    <section className="mb-28" aria-labelledby="web-features-heading">
      <h2 id="web-features-heading" className="webdev-mobile-section-heading !mb-6 text-center" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
        How we build your <span>website.</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-center">
        {features.map((feature) => (
          <div key={feature.title} className="flex flex-col items-center p-8 bg-white">
            <div className="w-52 h-52 mb-6 flex items-center justify-center">
              <img
                src={feature.gif}
                alt={feature.alt}
                width={feature.size}
                height={feature.size}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
                style={{ filter: 'hue-rotate(70deg)' }}
              />
            </div>
            <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">{feature.title}</h3>
            <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
