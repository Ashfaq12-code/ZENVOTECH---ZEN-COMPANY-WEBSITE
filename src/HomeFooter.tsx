import { serviceLinks } from '@/config/navigation';
import { formatAddress, SITE } from '@/config/site';
import { Facebook, Instagram, Linkedin } from 'lucide-react';
import { useEffect, useState } from 'react';

type HomeFooterProps = {
  showMap?: boolean;
  onWhatsAppClick?: () => void;
};

export default function HomeFooter({ showMap = true, onWhatsAppClick }: HomeFooterProps) {
  const [typedText, setTypedText] = useState('');
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const word = SITE.name;
    let characterIndex = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNextCharacter = () => {
      if (!deleting) {
        characterIndex += 1;
        setTypedText(word.slice(0, characterIndex));
        if (characterIndex === word.length) {
          deleting = true;
          timeoutId = setTimeout(typeNextCharacter, 1400);
          return;
        }
      } else {
        characterIndex -= 1;
        setTypedText(word.slice(0, characterIndex));
        if (characterIndex === 0) {
          deleting = false;
          timeoutId = setTimeout(typeNextCharacter, 500);
          return;
        }
      }

      timeoutId = setTimeout(typeNextCharacter, deleting ? 100 : 160);
    };

    timeoutId = setTimeout(typeNextCharacter, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.site-shell .hero');
    if (!hero) {
      setHeroVisible(false);
      return;
    }

    const updateHeroVisibility = () => {
      const bounds = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isMobileViewport = window.matchMedia('(max-width: 800px)').matches;
      const visibleHeight = Math.min(bounds.bottom, viewportHeight) - Math.max(bounds.top, 0);
      const isVisible = isMobileViewport
        ? visibleHeight > 0
        : visibleHeight >= bounds.height * 0.35;

      setHeroVisible(isVisible);
    };

    updateHeroVisibility();
    window.addEventListener('scroll', updateHeroVisibility, { passive: true });
    window.addEventListener('resize', updateHeroVisibility);
    return () => {
      window.removeEventListener('scroll', updateHeroVisibility);
      window.removeEventListener('resize', updateHeroVisibility);
    };
  }, []);

  return (
    <>
      {showMap && (
        <section className="footer-map-section" aria-labelledby="footer-map-title">
          <div className="footer-map-heading">
            <p className="eyebrow">Find us</p>
            <h2 id="footer-map-title">{SITE.name}</h2>
          </div>
          <div className="footer-map-frame">
            <iframe
              className="footer-map-embed"
              title={`Google Maps listing for ${SITE.name} in Sri lanka`}
              src="https://www.google.com/maps?output=embed&q=Zenvora+Technologies+%28Pvt%29+Ltd%2C+Kandy+20000&z=18"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      )}
      <footer className="home-footer">
      <div className="home-footer-typed" aria-hidden="true">
        {typedText}
      </div>
      <div className="home-footer-inner">
        <div className="home-footer-brand">
          <a href="/" className="brand-mark home-footer-logo" aria-label={`${SITE.name} home`}>
            <img className="brand-logo" src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png" alt={`${SITE.name} logo`} />
            <span className="brand-name">ZENVO<span>TECH</span></span>
          </a>
          <p>Software agency in Sri lanka</p>
        </div>
        <div className="home-footer-grid">
          <div className="home-footer-column">
            <h2>About {SITE.name}</h2>
            <p>
              We build websites, applications, and software that help businesses work smarter and grow with confidence.
            </p>
          </div>
          <nav className="home-footer-column" aria-label="Explore services">
            <h2>Our Services</h2>
            {serviceLinks.map(({ label, href }) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <nav className="home-footer-column" aria-label="Quick links">
            <h2>Quick Links</h2>
            <a href="/">Home</a>
            <a href="/who-we-are">About</a>
            <a href="/#works">Works</a>
            <a href="/#contact">Contact</a>
          </nav>
          <div className="home-footer-column">
            <h2>Get in Touch</h2>
            <p>Have a project in mind? Let’s talk about how we can help.</p>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`tel:${SITE.phone.e164}`}>{SITE.phone.display}</a>
            <a href="/#contact">Send us a message</a>
            <address className="home-footer-address">{formatAddress()}</address>
          </div>
        </div>
      </div>
      <div className="home-footer-bottom">
        <span>© {new Date().getFullYear()} <strong>{SITE.name}</strong></span>
        <small className="block text-xs opacity-70">
          Powered by <a className="footer-credit-link" href="https://techalh.com" target="_blank" rel="noopener noreferrer">Tech ALH</a>
        </small>
      </div>
      <div className={`floating-social-menu${heroVisible ? ' is-hero-visible' : ''}`}>
        <div className="floating-social-items">
          <a
            className="floating-social-link"
            href={SITE.socials.instagram}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${SITE.name} on Instagram`}
            tabIndex={0}
            title="Instagram"
          >
            <Instagram aria-hidden="true" size={17} />
          </a>
          <a
            className="floating-social-link"
            href={SITE.socials.tiktok}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${SITE.name} on TikTok`}
            tabIndex={0}
            title="TikTok"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.6 7.2a6.8 6.8 0 0 1-4.2-1.5v8.1a6.2 6.2 0 1 1-5.4-6.1v3.2a3 3 0 1 0 2.2 2.9V2.5h3.2c.2 2.1 1.8 3.8 4.2 4.1v.6Z" fill="currentColor" />
            </svg>
          </a>
          {/* PI! NEED DATA: LinkedIn company page URL */}
          <a
            className="floating-social-link"
            href={SITE.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${SITE.name} on LinkedIn`}
            tabIndex={0}
            title="LinkedIn"
          >
            <Linkedin aria-hidden="true" size={17} />
          </a>
          <a
            className="floating-social-link"
            href={SITE.socials.facebook}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${SITE.name} on Facebook`}
            tabIndex={0}
            title="Facebook"
          >
            <Facebook aria-hidden="true" size={17} />
          </a>
          {onWhatsAppClick ? (
            <button
              type="button"
              className="floating-social-link floating-social-whatsapp"
              onClick={onWhatsAppClick}
              aria-label={`Chat with ${SITE.name} on WhatsApp`}
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </button>
          ) : (
            <a
              className="floating-social-link floating-social-whatsapp"
              href={SITE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chat with ${SITE.name} on WhatsApp`}
              title="WhatsApp"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
          )}
        </div>
      </div>
      </footer>
    </>
  );
}
