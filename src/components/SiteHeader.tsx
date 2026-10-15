import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { serviceLinks, type ActivePage } from '@/config/navigation';
import { SITE } from '@/config/site';
import { SkipLink } from './SkipLink';

type SiteHeaderProps = {
  active: ActivePage;
};

const logoSrc = 'https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png';
const activeServiceClass = ' font-semibold text-[#1668e8]';

export function SiteHeader({ active }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { scrolled, visible } = useNavScroll();
  useLockBodyScroll(menuOpen);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  return (
    <header>
      <SkipLink />
      <nav className={`nav-wrap${scrolled ? ' is-scrolled' : ''}${visible ? ' is-visible' : ' is-hidden'}`}>
        <BrandLink className={`brand-mark${menuOpen ? ' nav-brand-hidden' : ''}`} label={`${SITE.name} home`} onClick={closeMenu} />
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          <div className="mobile-nav-header">
            <BrandLink className="brand-mark mobile-drawer-brand" onClick={closeMenu} />
            <button type="button" className="mobile-drawer-close" aria-label="Close navigation" onClick={closeMenu}>
              <X size={20} />
            </button>
          </div>
          <a href={active === 'home' ? '#top' : '/'} onClick={closeMenu}>Home</a>
          <a href="/who-we-are" onClick={closeMenu}>About</a>
          <ServicesDropdown active={active} open={servicesOpen} onToggle={() => setServicesOpen(!servicesOpen)} onNavigate={closeMenu} />
          <a href="/#works" onClick={closeMenu}>Works</a>
          <a href="/#contact" onClick={closeMenu}>Contact</a>
          <a href="/#contact" className="nav-cta" onClick={closeMenu}>Book now <ArrowUpRight size={15} /></a>
        </div>
      </nav>
    </header>
  );
}

type BrandLinkProps = { className: string; label?: string; onClick: () => void };

function BrandLink({ className, label, onClick }: BrandLinkProps) {
  return (
    <a href="/" className={className} aria-label={label} onClick={onClick}>
      <img className="brand-logo" src={logoSrc} alt={`${SITE.name} logo`} />
      <span className="brand-name">ZENVO<span>TECH</span></span>
    </a>
  );
}

type ServicesDropdownProps = {
  active: ActivePage;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
};

function ServicesDropdown({ active, open, onToggle, onNavigate }: ServicesDropdownProps) {
  // The automation page has always shown the Services trigger highlighted; kept to avoid a visual change.
  const triggerClass = active === 'automation' ? ' text-[#1668e8] font-bold' : '';
  return (
    <div className={`nav-item-dropdown${open ? ' is-mobile-open' : ''}`}>
      <div className="nav-dropdown-trigger-row">
        <a href="/#services" className={`nav-dropdown-trigger${triggerClass}`} onClick={onNavigate}>Services</a>
        <button
          type="button"
          className="nav-chevron-btn"
          aria-label="Toggle Services submenu"
          aria-expanded={open}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onToggle();
          }}
        >
          <ChevronDown size={13} className="nav-chevron" />
        </button>
      </div>
      <div className="nav-dropdown-menu nav-dropdown-services">
        {serviceLinks.map(({ page, label, href }) => (
          <a key={href} href={href} className={`nav-dropdown-link${page === active ? activeServiceClass : ''}`} onClick={onNavigate}>
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}

function useNavScroll() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 80);
      setVisible(currentScrollY <= 80 || currentScrollY < previousScrollY);
      previousScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrolled, visible };
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}
