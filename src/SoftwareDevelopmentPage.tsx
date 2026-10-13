import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, CalendarDays, ChevronDown, Menu, ShieldCheck, X } from 'lucide-react';
import HomeFooter from './HomeFooter';
import { setPageSeo } from './seo';
import { AdminProject, supabase } from './admin/supabase';
import alixerPerfumeErpVideo from './alixer-perfume-erp.mp4';
import premioCrmVideo from './premio-crm-preview.mp4';
import permioInventoryVideo from './permio-inventory-preview.mp4';

/* ─────────────────────────────────────────────
   STATIC SOFTWARE PORTFOLIO PROJECTS
───────────────────────────────────────────── */
interface StaticSoftwareProject {
  id: string;
  name: string;
  country: string;
  flag: string;
  video?: string;
  screenshot?: string;
  category: string;
  url?: string;
}

const staticSoftwareProjects: StaticSoftwareProject[] = [
  {
    id: 'sw-alixer-erp',
    name: 'Alixer Perfume ERP',
    country: 'United Arab Emirates',
    flag: 'https://flagcdn.com/w40/ae.png',
    video: alixerPerfumeErpVideo,
    category: 'ERP System',
    url: '#contact',
  },
  {
    id: 'sw-football-crm',
    name: 'Football Jercy CRM',
    country: 'Sri Lanka',
    flag: 'https://flagcdn.com/w40/lk.png',
    video: premioCrmVideo,
    category: 'CRM Platform',
    url: '#contact',
  },
  {
    id: 'sw-jercy-inventory',
    name: 'Jercy INVENTORY',
    country: 'Sri Lanka',
    flag: 'https://flagcdn.com/w40/lk.png',
    video: permioInventoryVideo,
    category: 'Inventory Management',
    url: '#contact',
  },
];

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqList: FaqItem[] = [
  {
    q: 'How Long Does It Take To Build Custom Software?',
    a: (
      <>
        Our development timeline depends on your project requirements and complexity.
        <br /><br />
        <span className="block font-medium text-[#1668e8]">• Simple automation tools & internal dashboards — minimum of 2 weeks.</span>
        <span className="block font-medium text-[#1668e8]">• CRM, ERP & inventory systems — minimum of 4 weeks.</span>
        <span className="block font-medium text-[#1668e8]">• Enterprise-grade platforms & SaaS applications — minimum of 8 weeks (varies by requirements).</span>
      </>
    ),
  },
  {
    q: 'What Are The Minimum Eligibility Criteria For zenvotech To Undertake A Project?',
    a: 'You must provide project details, budget, and your timeline. Every successful project starts with clear requirements and transparent milestones.',
  },
  {
    q: 'Do You Build Both Web-Based and Desktop Software?',
    a: 'Yes. We develop web-based SaaS platforms, desktop applications, and hybrid systems tailored to your operational workflows and infrastructure needs.',
  },
  {
    q: "Do You Offer Ongoing Support After The Software Is Launched?",
    a: 'Absolutely. We provide monthly maintenance, security patches, performance monitoring, feature additions, and dedicated long-term technical support packages.',
  },
  {
    q: 'Can You Integrate My Software With Third-Party APIs & Services?',
    a: 'Yes! We specialize in seamless third-party integrations — payment gateways, CRMs, ERPs, cloud services, analytics platforms, and custom API pipelines.',
  },
  {
    q: 'How Much Does Custom Software Development Cost?',
    a: 'Pricing depends on bespoke architecture, feature scope, complexity, and the technology stack. We provide transparent packages and custom estimates for all budgets.',
  },
  {
    q: 'Do You Undertake Projects With A Limited Budget?',
    a: 'Yes! We work with startups and growing small businesses, offering high-impact, budget-friendly software solutions engineered for long-term scalability.',
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
            <a href="/services/app-development" className="nav-dropdown-link" onClick={closeMenu}>App development</a>
            <a href="/services/software-development" className="nav-dropdown-link font-semibold text-[#1668e8]" onClick={closeMenu}>Software development</a>
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
   DESKTOP MOCKUP CARD COMPONENT
───────────────────────────────────────────── */
function DesktopProjectCard({
  project,
  index,
}: {
  project: StaticSoftwareProject | AdminProject;
  index: number;
}) {
  const name = 'name' in project ? project.name : (project as AdminProject).name;
  const flag = 'flag' in project ? (project as StaticSoftwareProject).flag : '';
  const video = 'video' in project ? (project as StaticSoftwareProject).video : undefined;
  const screenshot = 'screenshot' in project ? (project as StaticSoftwareProject).screenshot : (project as AdminProject).image_url;
  const url = 'url' in project ? (project as StaticSoftwareProject).url : (project as AdminProject).live_url;
  // Only use the explicit category label — no fallback "Software" text
  const category = 'category' in project ? (project as StaticSoftwareProject).category : '';

  return (
    <div
      className="webdev-project-card group relative w-full max-w-[500px] mx-auto rounded-2xl p-3 transition-all duration-500 webdev-project-reveal"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
    >
      {/* Desktop monitor mockup */}
      <div className="desktop-mockup-wrap">
        <div className="desktop-screen-area">
          {video ? (
            <video
              src={video}
              aria-label={`${name} preview`}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              preload="metadata"
              className="desktop-project-video"
            />
          ) : screenshot ? (
            <img src={screenshot} alt={name} className="w-full h-full object-cover" />
          ) : null}
        </div>
        <img
          src="https://i.ibb.co/0j5HqYt4/Transparent-i-Mac-Style-Monitor-Mockup-1-removebg-preview-1.png"
          alt="Desktop Monitor Mockup"
          className="desktop-frame-overlay"
        />
      </div>

      <div className="mt-4 pb-2 text-center">
        {/* Flag LEFT + name row, centered in middle, no href link, stays black */}
        <div className="flex items-center justify-center gap-2">
          {flag && (
            <img
              src={flag}
              alt=""
              className="w-6 h-4 object-cover rounded-sm shadow-sm flex-shrink-0"
            />
          )}
          <h4 className="text-lg font-bold text-[#0d1b2e] leading-tight select-none">
            {name}
          </h4>
        </div>
        {/* Restored blue category text below */}
        {category && (
          <span className="text-xs text-[#1668e8] font-semibold mt-1 inline-block">
            {category} ✦
          </span>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TECH STACK — same extended set as WhoWeArePage
───────────────────────────────────────────── */
const techStack = [
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/React.png', alt: 'React' },
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/Node.png', alt: 'Node.js' },
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/Laravel.png', alt: 'Laravel' },
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/Firebase.png', alt: 'Firebase' },
  { image: 'https://i.ibb.co/zVdG77N7/Gemini-Generated-Image-ijuc4mijuc4mijuc-removebg-preview.png', alt: 'Next.js' },
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/Mongo.png', alt: 'MongoDB' },
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/Spring.png', alt: 'Spring' },
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/CSS.png', alt: 'CSS3' },
  { image: 'https://i.ibb.co/NdcBxqrp/Gemini-Generated-Image-svky9zsvky9zsvky-removebg-preview-1.png', alt: 'Python' },
  { image: 'https://i.ibb.co/PvHPgw17/Gemini-Generated-Image-jfmzbljfmzbljfmz-removebg-preview-1.png', alt: 'Docker' },
  { image: 'https://i.ibb.co/LDyLtmyW/Gemini-Generated-Image-f1n8xzf1n8xzf1n8-removebg-preview.png', alt: 'PostgreSQL' },
  { image: 'https://i.ibb.co/ds251dLs/Gemini-Generated-Image-ryri36ryri36ryri-removebg-preview-1.png', alt: 'AWS' },
  { image: 'https://i.ibb.co/GQFcXZGh/Gemini-Generated-Image-yatot2yatot2yato-2-removebg-preview-1.png', alt: 'TypeScript' },
  { image: 'https://i.ibb.co/rGkFHBg2/Gemini-Generated-Image-deyqxldeyqxldeyq-removebg-preview-1-1.png', alt: 'GraphQL' },
  { image: 'https://i.ibb.co/C3L7N3Wt/Gemini-Generated-Image-nydfzanydfzanydf-removebg-preview-1.png', alt: 'Redis' },
];

/* ─────────────────────────────────────────────
   MAIN SOFTWARE DEVELOPMENT PAGE COMPONENT
───────────────────────────────────────────── */
export default function SoftwareDevelopmentPage() {
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>([]);
  const [visibleProjectCount, setVisibleProjectCount] = useState(6);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const portfolioFrame = window.location.hash === '#portfolio'
      ? window.requestAnimationFrame(() => {
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        })
      : null;
    if (portfolioFrame === null) window.scrollTo(0, 0);
    setPageSeo('software');

    const loadProjects = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('project_type', 'desktop')
          .order('created_at', { ascending: false });
        if (!error && data) {
          setAdminProjects(data);
        }
      } catch {
        // Fallback silently if not available
      }
    };

    void loadProjects();

    const channel = supabase?.channel('softwaredev-page-projects')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        void loadProjects();
      })
      .subscribe();

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      setPageSeo('home');
      window.removeEventListener('scroll', handleScroll);
      if (portfolioFrame !== null) window.cancelAnimationFrame(portfolioFrame);
      if (channel) void supabase?.removeChannel(channel);
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  const totalProjects = adminProjects.length + staticSoftwareProjects.length;

  return (
    <div className="webdev-page min-h-screen bg-white text-[#0d1b2e] font-[Manrope,sans-serif] overflow-x-hidden selection:bg-[#1668e8] selection:text-white">
      <PageNav />

      <main className="pt-28 pb-4">
        <div className="container mx-auto px-4 max-w-7xl">

          {/* HERO SECTION */}
          <section className="text-center mb-24 max-w-7xl mx-auto">
            <nav className="service-breadcrumb" aria-label="Breadcrumb">
              <a href="/">HOME</a>
              <span aria-hidden="true">/</span>
              <a href="/#works">WORKS</a>
            </nav>

            <h1 className="webdev-mobile-hero-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] tracking-tight min-h-[3.5rem] md:min-h-[4.5rem] mb-6 flex flex-col lg:flex-row items-center justify-center lg:gap-x-3 lg:whitespace-nowrap">
              <span className="bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent">
                Modern Software Development
              </span>
              <span className="bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent">
                
              </span>
            </h1>

            <div className="relative w-full max-w-[68rem] mx-auto rounded-2xl overflow-hidden border border-[#dce8ff] mb-10 group">
              <video
                src="https://files.catbox.moe/0afaux.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                aria-label="Modern Software Development"
                className="webdev-mobile-hero-image pointer-events-none w-full object-cover h-[320px] md:h-[420px]"
              />
            </div>

            <p className="webdev-mobile-hero-copy text-lg md:text-xl text-[#4c6c9f] max-w-4xl mx-auto leading-relaxed">
              At <strong className="text-[#1668e8] font-bold">zenvotech</strong>, we deliver comprehensive software development services — from custom business tools and enterprise systems to SaaS platforms and workflow automation. We combine deep engineering expertise with modern architecture using{' '}
              <span className="font-semibold text-[#0d1b2e]">Python, Node.js, React, PostgreSQL, Docker, and Cloud services</span>
              {' '}to build reliable, scalable software that drives real operational efficiency.
            </p>
          </section>

          {/* FEATURES SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-center mb-28">
            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Employee-getting-Customer-requirements.gif"
                  alt="Custom Software Architecture"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">Custom Software Architecture</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                We engineer bespoke software solutions tailored precisely to your business processes — built to scale, secure, and perform from day one.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Web-Design-Layout-1.gif"
                  alt="Enterprise-Grade Systems"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">Enterprise-Grade Systems</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                From CRMs and ERPs to inventory and analytics platforms — we build robust business systems that unify your operations and power productivity.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Choose-Your-Colors.gif"
                  alt="Seamless Integrations & APIs"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">Seamless Integrations & APIs</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                We seamlessly connect your software with third-party services, payment gateways, cloud platforms, and custom APIs to create a unified digital ecosystem.
              </p>
            </div>
          </section>

          {/* PORTFOLIO SECTION HEADER */}
          <section id="portfolio" className="w-full mb-16 flex flex-col items-center text-center scroll-mt-24">
            <div className="w-full">
              <p className="eyebrow"></p>
              <h2 className="webdev-mobile-section-heading !mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>What we have <span>done.</span></h2>
            </div>
            <p className="section-lede mx-auto text-center">
              Explore our software portfolio — from powerful ERP systems to intelligent CRM platforms.
            </p>
          </section>

          {/* PORTFOLIO GRID — Desktop Mockup Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* LIVE DYNAMIC ADMIN PROJECTS */}
            {adminProjects.slice(0, visibleProjectCount).map((ap, index) => (
              <DesktopProjectCard key={ap.id} project={ap} index={index} />
            ))}

            {/* STATIC CURATED SOFTWARE PROJECTS */}
            {staticSoftwareProjects
              .slice(0, Math.max(0, visibleProjectCount - adminProjects.length))
              .map((p, idx) => (
                <DesktopProjectCard key={p.id} project={p} index={adminProjects.length + idx} />
              ))}
          </div>

          {visibleProjectCount < totalProjects && (
            <button
              type="button"
              className="show-more-projects"
              onClick={() => setVisibleProjectCount((count) => count + 6)}
            >
              See More
            </button>
          )}

          {/* TECHNOLOGIES & PLATFORMS SECTION */}
          <section className="w-full mt-36 mb-28">
            <div className="section-heading tech-heading">
              <p className="eyebrow">Our toolkit</p>
              <h2 className="webdev-mobile-section-heading">Modern technologies<br /><span>we use.</span></h2>
              <p className="section-lede">The right tools for the right job. Always thoughtfully chosen, never just for show.</p>
            </div>

            <div className="tech-grid software-tech-grid">
              {techStack.map((tech, index) => (
                <div
                  className={`tech-card${['React', 'Firebase', 'Next.js', 'MongoDB', 'TypeScript'].includes(tech.alt) ? ' tech-card--logo-only' : ''}`}
                  key={tech.image}
                >
                  <img
                    src={tech.image}
                    alt={tech.alt}
                    className={`tech-logo${index === techStack.length - 1 ? ' tech-logo-next' : ''}`}
                    style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="w-full max-w-4xl mx-auto mt-28 mb-32 px-4">
            <p className="text-center text-[#1668e8] font-mono text-xs tracking-widest uppercase font-semibold mb-3">
              Frequently Asked Questions
            </p>

            <h2 className="webdev-mobile-section-heading text-center text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-14 leading-snug">
              Your Questions Answered:<br />
              <span className="text-[#1668e8]">Common Queries From Our Software Clients.</span>
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
                <filter id="softdev-orbit-glow" x="-20%" y="-50%" width="140%" height="200%">
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
                filter="url(#softdev-orbit-glow)"
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
                  <path id="softdev-orbit-text-path" d="M 90,90 m -69,0 a 69,69 0 1,1 138,0 a 69,69 0 1,1 -138,0" />
                </defs>
                <text>
                  <textPath href="#softdev-orbit-text-path">zenvotech • </textPath>
                </text>
              </svg>
              <span className="faq-orbit-inner" aria-hidden="true">
                <ArrowUpRight size={27} strokeWidth={1.8} />
              </span>
            </a>
          </section>

          {/* CALL TO ACTION SECTION */}
          <section
            className="relative w-full rounded-3xl mt-20 mb-4 py-20 px-6 sm:px-12 bg-white text-[#0d1b2e] overflow-hidden flex flex-col justify-center items-center text-center"
          >
            {/* Background Decorative Rings */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1668e8]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7cb5ff]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Tagline */}
            <p className="text-[#0d4db5] text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b border-[#1668e8] pb-1">
              Let's Build Together
            </p>

            {/* Headings */}
            <h2 className="software-mobile-cta-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 leading-tight">
            Launch Your Business
            </h2>
            <h3 className="software-mobile-cta-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1668e8] mb-10 leading-tight">
              Smarter With zenvotech
            </h3>

            {/* Sub-text */}
            <p className="text-[#4c6c9f] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
             
            </p>

            {/* CTA Buttons */}
            <div className="flex w-full flex-row items-center justify-center gap-2 sm:w-auto sm:gap-4">
              <a
                href="/#contact"
                className="relative inline-flex min-w-0 flex-1 items-center justify-center gap-1 px-2.5 py-3 sm:flex-none sm:gap-3 sm:px-12 sm:py-5 font-bold text-xs sm:text-base text-white whitespace-nowrap rounded-xl bg-[#1668e8] hover:bg-[#0d4db5] border border-white/20 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group"
              >
                <CalendarDays size={14} className="shrink-0 sm:h-[18px] sm:w-[18px]" />
                <span>Start Your Project</span>
                <ArrowUpRight size={14} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:h-[18px] sm:w-[18px]" />
                <span className="cta-button-shimmer" aria-hidden="true" />
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
    </div>
  );
}
