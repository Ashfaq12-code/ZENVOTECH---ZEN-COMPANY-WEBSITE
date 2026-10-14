import { useEffect, useState } from 'react';
import { Instagram, Linkedin } from 'lucide-react';

type HomeFooterProps = {
  showMap?: boolean;
};

export default function HomeFooter({ showMap = true }: HomeFooterProps) {
  const [typedText, setTypedText] = useState('');
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const word = 'zenvotech';
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
            <h2 id="footer-map-title">Zenvora Technologies (Pvt) Ltd</h2>
          </div>
          <div className="footer-map-frame">
            <iframe
              className="footer-map-embed"
              title="Google Maps listing for Zenvora Technologies (Pvt) Ltd in Kandy, Sri Lanka"
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
          <a href="#top" className="brand-mark home-footer-logo" aria-label="zenvotech home">
            <img className="brand-logo" src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png" alt="zenvotech logo" />
            <span className="brand-name">ZENVO<span>TECH</span></span>
          </a>
          <p>Digital experiences for ambitious teams.</p>
        </div>
        <div className="home-footer-grid">
          <div className="home-footer-column">
            <h2>About zenvotech</h2>
            <p>
              We build websites, applications, and software that help businesses work smarter and grow with confidence.
            </p>
          </div>
          <nav className="home-footer-column" aria-label="Explore services">
            <h2>Our Services</h2>
            <a href="/services/website-development">Web development</a>
            <a href="/services/app-development">App development</a>
            <a href="/#services">Software development</a>
            <a href="/#services">Automation</a>
          </nav>
          <nav className="home-footer-column" aria-label="Quick links">
            <h2>Quick Links</h2>
            <a href="#top">Home</a>
            <a href="#about">About</a>
            <a href="#works">Works</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="home-footer-column">
            <h2>Get in Touch</h2>
            <p>Have a project in mind? Let’s talk about how we can help.</p>
            <a href="mailto:zenvotech24@gmail.com">zenvotech24@gmail.com</a>
            <a href="#contact">Send us a message</a>
            <address className="home-footer-address">No. 02, Kandy, Sri Lanka</address>
          </div>
        </div>
      </div>
      <div className="home-footer-bottom">
        <span>© {new Date().getFullYear()} <strong>Zenvo Technologies (Pvt) Ltd</strong> — Powered by <a className="footer-credit-link" href="https://techalh.com" target="_blank" rel="noopener noreferrer">Techalh</a>.</span>
      </div>
      <div className={`floating-social-menu${heroVisible ? ' is-hero-visible' : ''}`}>
        <div className="floating-social-items">
          <a
            className="floating-social-link"
            href="https://www.instagram.com/zenvo_technologies?srtk=ZjU1M3U5N3IzdHZr"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit zenvotech on Instagram"
            tabIndex={0}
            title="Instagram"
          >
            <Instagram aria-hidden="true" size={17} />
          </a>
          <span className="floating-social-link floating-social-pending" role="img" aria-label="TikTok profile link coming soon" title="TikTok">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19.6 7.2a6.8 6.8 0 0 1-4.2-1.5v8.1a6.2 6.2 0 1 1-5.4-6.1v3.2a3 3 0 1 0 2.2 2.9V2.5h3.2c.2 2.1 1.8 3.8 4.2 4.1v.6Z" fill="currentColor" />
            </svg>
          </span>
          <span className="floating-social-link floating-social-pending" role="img" aria-label="LinkedIn profile link coming soon" title="LinkedIn">
            <Linkedin aria-hidden="true" size={17} />
          </span>
        </div>
      </div>
      </footer>
    </>
  );
}
