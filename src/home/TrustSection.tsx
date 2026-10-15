import { clientLogos } from './media';

export function TrustSection() {
  return (
    <section className="trust-section">
      {/* PI! NEED DATA: client count and countries served, e.g. 'N businesses, N countries' */}
      <div className="section-pad trust-intro"><h2><span className="trust-title">Businesses we have worked with.</span><span className="trust-subtitle">In Sri Lanka and abroad.</span></h2></div>
      <div className="marquee-window">
        <div className="marquee-track">
          {[0, 1].map((copy) => clientLogos.map((logo) => (
            <span key={`${logo.src}-${copy}`} className="brand-logo-item" aria-hidden={copy === 1 ? true : undefined}>
              <img src={logo.src} width={logo.width} height={logo.height} loading="lazy" decoding="async" alt="" />
              <b aria-hidden="true">✦</b>
            </span>
          )))}
        </div>
      </div>
    </section>
  );
}
