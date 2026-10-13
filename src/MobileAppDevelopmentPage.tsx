import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, ShieldCheck, X } from 'lucide-react';
import HomeFooter from './HomeFooter';
import { setPageSeo } from './seo';
import mobileAppUxImage from './mobile-app-ux-white.gif';
import { mobileAppProjects, type MobileAppProject } from './mobileAppProjects';
import { supabase, AdminProject, formatRelativeTime } from './admin/supabase';

/* ─────────────────────────────────────────────
   PORTFOLIO PROJECTS (with requested gif assets)
───────────────────────────────────────────── */
const countryFlagCodes: Record<string, string> = {
  'United States': 'us',
  'United Kingdom': 'gb',
  'Sri Lanka': 'lk',
  Canada: 'ca',
  Australia: 'au',
  India: 'in',
  'United Arab Emirates': 'ae',
  Germany: 'de',
  France: 'fr',
  Japan: 'jp',
  Singapore: 'sg',
};

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqList: FaqItem[] = [
  {
    q: 'How Long Does It Take To Build A Mobile App?',
    a: (
      <>
        Our timeline depends on app complexity, custom architecture, and feature scope.
        <br /><br />
        <span className="block font-medium text-[#1668e8]">• Simple MVP & utility apps — minimum of 2 weeks.</span>
        <span className="block font-medium text-[#1668e8]">• E-commerce & booking apps — minimum of 4 weeks.</span>
        <span className="block font-medium text-[#1668e8]">• Custom enterprise apps & real-time platforms — minimum of 6 weeks (varies by requirements).</span>
      </>
    ),
  },
  {
    q: 'Do You Build Apps For Both iOS & Android?',
    a: 'Yes, we specialize in high-performance cross-platform apps using Flutter and React Native, as well as native solutions tailored to platform-specific guidelines.',
  },
  {
    q: 'Do You Offer App Maintenance After Launch?',
    a: 'Absolutely. We provide dedicated monthly maintenance, OS version compatibility updates, performance tuning, bug fixes, and continuous feature expansion packages.',
  },
  {
    q: 'Can You Integrate Payment & E-Business Features?',
    a: 'Yes! We seamlessly integrate secure payment gateways (Stripe, Apple Pay, Google Pay), real-time push notifications, custom analytics, cart flows, and backend APIs.',
  },
  {
    q: 'Will My App Be Optimized For Performance?',
    a: 'Performance is our highest priority. Every app is rigorously optimized for lightning-fast startup speeds, 60fps buttery animations, minimal memory footprint, and low battery consumption.',
  },
  {
    q: 'Do You Work With Startups On A Budget?',
    a: 'Yes! We offer flexible, cost-effective startup packages designed to launch robust minimum viable products (MVPs) quickly without sacrificing design or structural quality.',
  },
];

/* ─────────────────────────────────────────────
   NAVIGATION BAR COMPONENT
───────────────────────────────────────────── */
function PageNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavScrolled(currentScrollY > 80);
      setNavVisible(currentScrollY <= 80 || currentScrollY < previousScrollY);
      previousScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <nav className={`nav-wrap${navScrolled ? ' is-scrolled' : ''}${navVisible ? ' is-visible' : ' is-hidden'}`}>
      <a href="/" className={`brand-mark${menuOpen ? ' nav-brand-hidden' : ''}`} aria-label="zenvotech home" onClick={closeMenu}>
        <img className="brand-logo" src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png" alt="zenvotech logo" />
        <span className="brand-name">ZENVO<span>TECH</span></span>
      </a>
      <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-nav-header">
          <a href="/" className="brand-mark mobile-drawer-brand" onClick={closeMenu}>
            <img className="brand-logo" src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png" alt="zenvotech logo" />
            <span className="brand-name">ZENVO<span>TECH</span></span>
          </a>
          <button type="button" className="mobile-drawer-close" aria-label="Close navigation" onClick={closeMenu}>
            <X size={20} />
          </button>
        </div>

        <a href="/" onClick={closeMenu}>Home</a>
        <a href="/who-we-are" onClick={closeMenu}>About</a>

        <div className={`nav-item-dropdown${mobileServicesOpen ? ' is-mobile-open' : ''}`}>
          <div className="nav-dropdown-trigger-row">
            <a href="/#services" className="nav-dropdown-trigger text-[#1668e8] font-bold" onClick={closeMenu}>Services</a>
            <button
              type="button"
              className="nav-chevron-btn"
              aria-label="Toggle Services submenu"
              aria-expanded={mobileServicesOpen}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                setMobileServicesOpen(!mobileServicesOpen);
              }}
            >
              <ChevronDown size={13} className="nav-chevron" />
            </button>
          </div>
          <div className="nav-dropdown-menu nav-dropdown-services">
            <a href="/services/website-development" className="nav-dropdown-link" onClick={closeMenu}>Web development</a>
            <a href="/services/app-development" className="nav-dropdown-link font-semibold text-[#1668e8]" onClick={closeMenu}>App development</a>
            <a href="/services/software-development" className="nav-dropdown-link" onClick={closeMenu}>Software development</a>
            <a href="/services/automation" className="nav-dropdown-link" onClick={closeMenu}>Automation</a>
          </div>
        </div>

        <a href="/#works" onClick={closeMenu}>Works</a>
        <a href="/#contact" onClick={closeMenu}>Contact</a>
        <a href="/#contact" className="nav-cta" onClick={closeMenu}>Book now <ArrowUpRight size={15} /></a>
        <a href="/admin" className="admin-link" onClick={closeMenu}><ShieldCheck size={14} /> Admin</a>
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   MAIN MOBILE APP DEVELOPMENT COMPONENT
───────────────────────────────────────────── */
export default function MobileAppDevelopmentPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [liveAppProjects, setLiveAppProjects] = useState<AdminProject[]>([]);
  const [visibleProjectCount, setVisibleProjectCount] = useState(6);

  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true;

    const fetchAppProjects = async () => {
      const { data, error } = await client
        .from('projects')
        .select('*')
        .eq('project_type', 'app')
        .order('created_at', { ascending: false });
      if (!error && active && data) {
        setLiveAppProjects(data);
      }
    };

    void fetchAppProjects();

    const channel = client
      .channel('mobile-app-page-projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        void fetchAppProjects();
      })
      .subscribe();

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    const portfolioFrame = window.location.hash === '#portfolio'
      ? window.requestAnimationFrame(() => {
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        })
      : null;
    if (portfolioFrame === null) window.scrollTo(0, 0);
    setPageSeo('apps');

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      setPageSeo('home');
      window.removeEventListener('scroll', handleScroll);
      if (portfolioFrame !== null) window.cancelAnimationFrame(portfolioFrame);
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-white text-[#0d1b2e] font-[Manrope,sans-serif] overflow-x-hidden selection:bg-[#1668e8] selection:text-white">
      <PageNav />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* HERO SECTION */}
          <section className="text-center mb-24 max-w-5xl mx-auto">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <a href="/">HOME</a>
              <span aria-hidden="true">/</span>
              <a href="/#works">WORKS</a>
            </nav>

            <h1 className="webdev-mobile-hero-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] tracking-tight min-h-[3.5rem] md:min-h-[4.5rem] mb-6 flex flex-col lg:flex-row items-center justify-center lg:gap-x-3 lg:whitespace-nowrap">
              <span className="bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent">
                Modern Mobile App
              </span>
              <span className="bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent">
                Development 
              </span>
            </h1>

            {/* Main Hero Banner Video */}
            <div className="relative w-full max-w-[68rem] mx-auto rounded-2xl overflow-hidden border border-[#dce8ff] mb-10 group">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1b2e]/30 via-transparent to-transparent z-10 pointer-events-none" />
              <video
                src="https://files.catbox.moe/t6dqdo.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                aria-label="Modern Mobile App Development"
                className="webdev-mobile-hero-image pointer-events-none w-full object-cover h-[320px] md:h-[420px]"
              />
            </div>

            <p className="webdev-mobile-hero-copy text-lg md:text-xl text-[#4c6c9f] max-w-4xl mx-auto leading-relaxed">
              At <strong className="text-[#1668e8] font-bold">zenvotech</strong>, we specialize in high-impact mobile app development that drives your e-business and digital growth. Our team crafts high-performance, scalable apps with smooth UX/UI design, robust backend integrations, and cross-platform architecture. Whether for startups or enterprises, we engineer apps for iOS and Android that elevate customer loyalty, enhance engagement, and convert mobile traffic into long-term value.
            </p>
          </section>

          {/* FEATURES SECTION — Large Visual Icons */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-28">
            <div className="flex flex-col items-center p-8 rounded-2xl bg-white transition-all duration-300">
              <div className="w-56 h-56 mb-6 flex items-center justify-center bg-white">
                <img
                  src={mobileAppUxImage}
                  alt="UX/UI app design illustration"
                  className="w-full h-full scale-125 object-contain"
                  style={{ filter: 'grayscale(1) sepia(1) hue-rotate(185deg) saturate(3) contrast(1.05)' }}
                />
              </div>
              <h3 className="whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8] mb-3">UX/UI Focused Apps</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                Intuitive interfaces that delight mobile users, streamline micro-interactions, and drive higher retention rates.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-2xl bg-white transition-all duration-300">
              <div className="w-56 h-56 mb-6 flex items-center justify-center bg-white">
                <img
                  src="https://bootestech.com/wp-content/uploads/2024/10/Web-design-2.gif"
                  alt="Cross-platform development illustration"
                  className="w-full h-full object-contain mix-blend-multiply"
                  style={{ filter: 'grayscale(1) sepia(1) hue-rotate(185deg) saturate(3) contrast(1.05)' }}
                />
              </div>
              <h3 className="whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8] mb-3">Cross-Platform Development</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                Apps work natively and flawlessly on both iOS and Android, maximizing market reach and slashing maintenance overhead.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 rounded-2xl bg-white transition-all duration-300">
              <div className="w-56 h-56 mb-6 flex items-center justify-center bg-white">
                <img
                  src="https://www.pjsofttech.com/static/media/ecommerce.a75019ea601c2ef17c92.gif"
                  alt="E-business optimized app illustration"
                  className="w-full h-full object-contain mix-blend-multiply"
                  style={{ filter: 'grayscale(1) sepia(1) hue-rotate(185deg) saturate(3) contrast(1.05)' }}
                />
              </div>
              <h3 className="whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8] mb-3">E-Business Optimized Apps</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                Engineered for conversion — apps integrate frictionless checkouts, secure payments, push notifications, and analytics.
              </p>
            </div>
          </section>

          {/* PORTFOLIO SECTION HEADER */}
          <section id="portfolio" className="text-center mb-16 scroll-mt-24">
            <span className="text-[#1668e8] font-mono text-xs tracking-widest uppercase font-bold block mb-2">
              MOBILE EXPERIENCES & APPS
            </span>
            <h2 className="text-6xl md:text-8xl font-black text-[#dce8ff] tracking-tighter mb-2 select-none">
              PORTFOLIO
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold tracking-tight -mt-8 md:-mt-12">
              <span className="bg-gradient-to-r from-[#0d4db5] via-[#1668e8] to-[#3985ff] bg-clip-text text-transparent">
                What We Have Done
              </span>
            </p>
            <p className="text-[#4c6c9f] max-w-xl mx-auto mt-4 text-base">
              Explore our featured mobile Apps  smooth interactive workflows.
            </p>
          </section>

          {/* PORTFOLIO WORKSTATION GRID — USING EXACT zenvotech PROJECT IPHONE MOCKUP */}
          {(() => {
            const allApps = [
              ...mobileAppProjects,
              ...liveAppProjects.map((p) => ({
                id: `live-${p.id}`,
                name: p.name,
                screenshot: p.image_url,
                flag: countryFlagCodes[p.country]
                  ? `https://flagcdn.com/w40/${countryFlagCodes[p.country]}.png`
                  : '',
                country: p.country,
                url: p.live_url,
                createdAt: p.created_at,
              })),
            ];
            const visibleApps = allApps.slice(0, visibleProjectCount);

            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {visibleApps.map((project, index) => {
                    const isRecent = project.createdAt && Date.now() - new Date(project.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
                    return (
                      <div
                        key={project.id}
                        className="webdev-project-reveal group relative w-full max-w-[380px] mx-auto bg-white rounded-3xl p-6 transition-all duration-500 flex flex-col items-center"
                        style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                      >
                        {/* zenvotech PROJECT EXACT IPHONE MOCKUP FRAME */}
                        <div className={`iphone-mockup iphone-mockup--portfolio${project.videoSrc ? ' iphone-mockup--video' : ''}`}>
                          <div className="iphone-screen">
                            <div className="dynamic-island" />

                            <div className="screen-content">
                              {project.videoSrc ? (
                                <video
                                  src={project.videoSrc}
                                  aria-label={`${project.name} preview`}
                                  autoPlay
                                  muted
                                  loop
                                  playsInline
                                  controls={false}
                                  disablePictureInPicture
                                  disableRemotePlayback
                                  preload="metadata"
                                  className="project-preview-video"
                                />
                              ) : (
                                <img
                                  src={project.screenshot}
                                  alt={project.name}
                                  loading="lazy"
                                />
                              )}
                            </div>

                            <div className="home-indicator" />
                          </div>
                        </div>

                        {/* Project Title & Country Flag */}
                        <div className="mt-6 text-center">
                          {project.createdAt && (
                            <div className="project-screen-meta" style={{ justifyContent: 'center', marginBottom: '8px' }}>
                              {isRecent && <span className="project-screen-recent">Recent</span>}
                              <span className="project-screen-time">Added {formatRelativeTime(project.createdAt)}</span>
                            </div>
                          )}
                          <h4 className="text-xl font-bold text-[#0d1b2e] flex items-center justify-center gap-2 group-hover:text-[#1668e8] transition-colors">
                            {project.flag && (
                              <img
                                src={project.flag}
                                alt={project.country}
                                className="w-6 h-4 object-cover rounded-sm shadow-sm"
                              />
                            )}
                            {project.url ? (
                              <a href={project.url} target="_blank" rel="noreferrer">
                                {project.name}
                              </a>
                            ) : (
                              <span>{project.name}</span>
                            )}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {visibleProjectCount < allApps.length && (
                  <div className="flex justify-center mt-12">
                    <button
                      type="button"
                      className="show-more-projects"
                      onClick={() => setVisibleProjectCount((prev) => prev + 6)}
                    >
                      See More
                    </button>
                  </div>
                )}
              </>
            );
          })()}

          {/* TECHNOLOGIES & PLATFORMS SECTION (Theme: Clean White & Royal Blue) */}
          <section className="mobile-tech-stack w-full mt-36 mb-28">
            <div className="section-heading tech-heading mobile-tech-heading">
              <p className="eyebrow">Our toolkit</p>
              <h2>Modern technologies<br /><span>we use.</span></h2>
              <p className="section-lede">
                The right tools for the right job. Always thoughtfully chosen, never just for show.
              </p>
            </div>

            <div className="tech-grid mobile-tech-grid">
              {/* React Native / React */}
              <div className="tech-card">
                <img src="https://i.ibb.co/ZzXnCqBh/Gemini-Generated-Image-m7u7qum7u7qum7u7-removebg-preview-1.png" alt="React Native" className="mobile-tech-logo h-14 object-contain" />
              </div>

              <div className="tech-card">
                <img src="https://i.ibb.co/C3L7N3Wt/Gemini-Generated-Image-nydfzanydfzanydf-removebg-preview-1.png" alt="Vue.js" className="mobile-tech-logo h-12 object-contain" />
              </div>

              <div className="tech-card tech-card--logo-only">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Node.png" alt="Node.js" className="mobile-tech-logo h-14 object-contain" />
              </div>

              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/CSS.png" alt="CSS3" className="mobile-tech-logo h-12 object-contain" />
              </div>

              <div className="tech-card">
                <img src="https://i.ibb.co/XZWS2vR4/Gemini-Generated-Image-lyq7k2lyq7k2lyq7-removebg-preview-1.png" alt="Spring" className="mobile-tech-logo h-14 object-contain" />
              </div>

              <div className="tech-card">
                <img src="https://i.ibb.co/4Z0CCNQ1/Gemini-Generated-Image-4okd9v4okd9v4okd-removebg-preview-1.png" alt="Laravel" className="mobile-tech-logo h-12 object-contain" />
              </div>

              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Firebase.png" alt="Firebase" className="mobile-tech-logo h-12 object-contain" />
              </div>

              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Flutter.png" alt="Flutter" className="mobile-tech-logo h-12 object-contain" />
              </div>

            

              <div className="tech-card tech-card--logo-only">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Web-Flow.png" alt="Webflow" className="mobile-tech-logo h-12 object-contain" />
              </div>

             
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="w-full max-w-4xl mx-auto mt-28 mb-32 px-4">
            <p className="text-center text-[#1668e8] font-mono text-xs tracking-widest uppercase font-semibold mb-3">
              Frequently Asked Questions
            </p>

            <h2 className="text-center text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-14 leading-snug">
              Your Questions Answered:<br />
              <span className="text-[#1668e8]">Common Mobile App Queries.</span>
            </h2>

            <div className="space-y-4">
              {faqList.map((faq, index) => {
                const isOpen = openFAQ === index;
                return (
                  <div
                    key={index}
                    className={`rounded-xl p-6 transition-all duration-300 cursor-pointer border ${
                      isOpen
                        ? 'border-[#1668e8] bg-[#eef4ff] shadow-[0_8px_24px_rgba(22,104,232,0.12)]'
                        : 'border-[#e2ecfa] bg-[#f8fbff] hover:border-[#1668e8]/50 hover:bg-white'
                    }`}
                    onClick={() => toggleFAQ(index)}
                  >
                    {/* Animated Blue Top Gradient Indicator */}
                    <div
                      className="h-1 rounded-full mb-3 transition-transform duration-500"
                      style={{
                        transform: isOpen ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        background: 'linear-gradient(to right, #99bbf7, #1668e8, #99bbf7)',
                      }}
                    />

                    {/* Question Header */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`text-xl font-bold ${isOpen ? 'text-[#1668e8]' : 'text-gray-400'}`}>
                          {isOpen ? '×' : '+'}
                        </span>
                        <h3 className="text-[#0d1b2e] font-bold text-base md:text-lg">
                          {faq.q}
                        </h3>
                      </div>
                      <span className={`text-xl font-bold flex-shrink-0 ${isOpen ? 'text-[#1668e8]' : 'text-gray-400'}`}>
                        {isOpen ? '–' : '+'}
                      </span>
                    </div>

                    {/* Expandable Answer */}
                    <div
                      className="overflow-hidden transition-all duration-400"
                      style={{
                        maxHeight: isOpen ? '400px' : '0',
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="text-[#4c6c9f] text-sm md:text-base mt-4 leading-relaxed border-t border-[#dce8ff] pt-4">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ORBIT SINE PATH ANIMATION SECTION */}
          <section className="faq-orbit my-24 rounded-3xl" aria-label="Visit zenvotech featured project">
            <svg
              className="faq-orbit-path"
              viewBox="0 0 1200 300"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <filter id="appdev-orbit-glow" x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                d="M 90 150 C 132.5 100 175 75 217.5 75 C 260 75 302.5 150 345 150 C 387.5 150 430 225 472.5 225 C 515 225 557.5 150 600 150 C 642.5 150 685 75 727.5 75 C 770 75 812.5 150 855 150 C 897.5 150 940 225 982.5 225 C 1025 225 1067.5 150 1110 150"
                fill="none"
                stroke="#1668e8"
                strokeWidth="3"
                filter="url(#appdev-orbit-glow)"
                className="faq-orbit-line"
              />
            </svg>

            <a
              className="faq-orbit-marker"
              href="https://zenvora.lk"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open zenvotech in a new tab"
            >
              <span className="faq-orbit-halo" aria-hidden="true" />
              <span className="faq-orbit-ring" aria-hidden="true" />
              <svg className="faq-orbit-text" viewBox="0 0 180 180" aria-hidden="true">
                <defs>
                  <path id="appdev-orbit-text-path" d="M 90,90 m -69,0 a 69,69 0 1,1 138,0 a 69,69 0 1,1 -138,0" />
                </defs>
                <text>
                  <textPath href="#appdev-orbit-text-path">zenvotech • </textPath>
                </text>
              </svg>
              <span className="faq-orbit-inner" aria-hidden="true">
                <ArrowUpRight size={27} strokeWidth={1.8} />
              </span>
            </a>
          </section>

          {/* CALL TO ACTION SECTION */}
          <section className="appdev-cta relative w-full rounded-3xl mt-20 mb-4 py-20 px-6 sm:px-12 bg-white text-[#0d1b2e] overflow-hidden flex flex-col justify-center items-center text-center">
            {/* Background Decorative Rings */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1668e8]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7cb5ff]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Tagline */}
            <p className="text-[#0d4db5] text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b border-[#1668e8] pb-1">
              Ready To Build Your App
            </p>

            {/* Headings */}
            <h2 className="appdev-cta-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 leading-tight">
              Launch Your Business
            </h2>
            <h3 className="appdev-cta-heading appdev-cta-heading--accent text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-10 leading-tight">
              Smarter With zenvotech
            </h3>

            <div className="flex w-full flex-row items-center justify-center gap-2 sm:w-auto sm:gap-4">
              <a
                href="/#contact"
                className="relative inline-flex min-w-0 flex-1 items-center justify-center gap-1 px-2.5 py-3 sm:flex-none sm:gap-3 sm:px-12 sm:py-5 font-bold text-xs sm:text-base text-white whitespace-nowrap rounded-xl bg-[#1668e8] hover:bg-[#0d4db5] border border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 shrink-0 sm:h-5 sm:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span>Start Your Project</span>
                <ArrowUpRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-[18px] sm:w-[18px]" />
                <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white opacity-20 transform -skew-x-12 rotate-12 animate-shine pointer-events-none" />
              </a>
              <a
                href="/who-we-are"
                className="inline-flex w-[7.75rem] shrink-0 items-center justify-center px-2 py-3 sm:w-auto sm:gap-2 sm:px-8 sm:py-4 rounded-xl border border-[#1668e8] text-[#1668e8] font-bold text-xs sm:text-sm hover:bg-[#eef4ff] hover:scale-105 active:scale-95 transition-all duration-300"
              >
                About zenvotech
              </a>
            </div>
          </section>

        </div>
      </main>

      <HomeFooter showMap={false} />

      {/* Back to top button */}
      {showScrollTop && (
        <button
          type="button"
          className="scroll-top-button"
          aria-label="Scroll to top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUpRight size={18} />
        </button>
      )}

      {/* Shimmer Keyframes */}
      <style>{`
        @keyframes appdevShine {
          0% { left: -75%; }
          50% { left: 120%; }
          100% { left: -75%; }
        }

        .animate-shine {
          animation: appdevShine 3s infinite linear;
        }

      `}</style>
    </div>
  );
}
