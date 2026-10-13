import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, Menu, ShieldCheck, X } from 'lucide-react';
import HomeFooter from './HomeFooter';
import { setPageSeo } from './seo';
import { AdminProject, supabase } from './admin/supabase';

/* ─────────────────────────────────────────────
   STATIC CURATED PROJECTS (from prompt, 1 to 30)
───────────────────────────────────────────── */
interface StaticProject {
  title: string;
  country: string;
  flagUrl: string;
  image: string;
  liveUrl: string;
}

const staticProjects: StaticProject[] = [
  {
    title: 'Bake It With Love',
    country: 'United States',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1fa-1f1f8.svg',
    image: 'https://i.ibb.co/nMV8RMt5/screencapture-bakeitwithlove-2025-09-11-13-59-47.png',
    liveUrl: 'https://bakeitwithlove.com',
  },
  {
    title: 'Bingo Dot Com',
    country: 'Australia',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1e6-1f1fa.svg',
    image: 'https://i.ibb.co/kV0ZHSGp/screencapture-bingodotcom-2025-12-21-16-24-16.png',
    liveUrl: 'https://bingodotcom.com/',
  },
  {
    title: 'Olunid',
    country: 'Italy',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1ee-1f1f9.svg',
    image: 'https://i.ibb.co/7dW24rBJ/screencapture-oliunid-2025-12-21-22-34-54.jpg',
    liveUrl: 'https://olunid.com',
  },
  
  {
    title: 'Bake With Love',
    country: 'Sri Lanka',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg',
    image: 'https://i.ibb.co/jZxbfsnb/screencapture-bakewithaysha-netlify-app-2025-09-05-01-17-46.png',
    liveUrl: 'https://bakewithaysha.netlify.app/',
  },
  {
    title: 'RentifyHub',
    country: 'Sri Lanka',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg',
    image: 'https://i.ibb.co/mCqkLxGp/screencapture-ashxx-neocities-org-2025-12-22-01-31-11.jpg',
    liveUrl: 'https://bakeitwithlove.com',
  },
 
  
  {
    title: 'ALEX WIDES',
    country: 'Italy',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1ee-1f1f9.svg',
    image: 'https://i.ibb.co/1t3PBrM9/screencapture-alexwides-2026-02-09-23-41-31.jpg',
    liveUrl: 'https://www.alexwides.com/',
  },
  {
    title: 'Linkwin Edu',
    country: 'South Korea',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f0-1f1f7.svg',
    image: 'https://i.ibb.co/7dRJcXSv/screencapture-linkwinedu-2026-02-09-23-46-20.jpg',
    liveUrl: 'https://linkwinedu.com/',
  },
  
  {
    title: 'Botanicare',
    country: 'United States',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1fa-1f1f8.svg',
    image: 'https://i.ibb.co/5gwkGtch/screencapture-botanicare-2026-02-09-23-54-54.jpg',
    liveUrl: 'https://www.botanicare.com/',
  },
 
  {
    title: 'Novuct Digital LLC',
    country: 'United States',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1fa-1f1f8.svg',
    image: 'https://i.ibb.co/hJRvGk34/screencapture-novuct-2026-02-10-00-00-12.jpg',
    liveUrl: 'https://novuct.com/',
  },
  {
    title: 'The Lotus House',
    country: 'Italy',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1ee-1f1f9.svg',
    image: 'https://i.ibb.co/DHQC4hKz/full-page-screenshot.jpg',
    liveUrl: 'https://thelotushouse.lk/',
  },
  
  {
    title: 'Prevaix Digital LLC',
    country: 'United States',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1fa-1f1f8.svg',
    image: 'https://i.ibb.co/FLY8mVHd/full-page-screenshot-1.jpg',
    liveUrl: 'https://prevaix.com/',
  },
  {
    title: 'GOLS\'S GYM',
    country: 'Sri Lanka',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg',
    image: 'https://i.ibb.co/4ZvR48vs/full-page-screenshot-3.jpg',
    liveUrl: 'https://goalgym.netlify.app/',
  },
 
  {
    title: 'For Sale By Owner',
    country: 'United States',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1fa-1f1f8.svg',
    image: 'https://i.ibb.co/Kp2p6dRR/full-page-screenshot-5.jpg',
    liveUrl: 'https://www.forsalebyowner.com/',
  },
 
  {
    title: 'EcoNest',
    country: 'Sri Lanka',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg',
    image: 'https://i.ibb.co/b5nGLM3t/screencapture-econestniflacrafts-netlify-app-2026-02-15-20-31-40.jpg',
    liveUrl: 'https://econestniflacrafts.netlify.app/',
  },
 
  {
    title: 'Homyz (pvt) Ltd',
    country: 'Australia',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1fa-1f1f8.svg',
    image: 'https://i.ibb.co/FqLH8MX8/screencapture-real-estate-web-pages-dev-2026-02-15-21-00-02.jpg',
    liveUrl: 'https://real-estate-web.pages.dev/#contact-us',
  },
  {
    title: 'Dart Srilanka',
    country: 'Sri Lanka',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg',
    image: 'https://i.ibb.co/VW57gYCN/screencapture-dartsrilanka-netlify-app-2026-05-26-00-42-20-1.png',
    liveUrl: 'https://dartsrilanka.netlify.app/',
  },
 
  {
    title: 'Bloodline Tattoo Bali',
    country: 'Australia',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1e6-1f1fa.svg',
    image: 'https://i.ibb.co/VcXzzsNC/screencapture-bloodlinetattoobali-2026-05-26-00-56-52.png',
    liveUrl: 'https://bloodlinetattoobali.com/',
  },
  {
    title: 'KTM London',
    country: 'United Kingdom',
    flagUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1280px-Flag_of_the_United_Kingdom_%281-2%29.svg.png',
    image: 'https://i.ibb.co/q3VZwpBz/screencapture-ktmlondonuk-co-uk-2026-05-26-01-01-03.png',
    liveUrl: 'https://ktmlondonuk.co.uk/',
  },
 
  {
    title: 'Anthika Saloon pvt Ltd',
    country: 'Sri Lanka',
    flagUrl: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg',
    image: 'https://i.ibb.co/99VMF6s6/screencapture-anthiaslk-2026-07-22-02-01-21.png',
    liveUrl: 'https://anthiaslk.com/',
  },
];

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
  Italy: 'it',
  'South Korea': 'kr',
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
    q: 'How Long Does It Take To Build A Website?',
    a: (
      <>
        Our development timeline depends on your requirements as we offer a bespoke service.
        <br /><br />
        <span className="block font-medium text-[#1668e8]">• WordPress & Webflow projects — minimum of 1 week.</span>
        <span className="block font-medium text-[#1668e8]">• Ecommerce and WooCommerce projects — minimum of 2 weeks.</span>
        <span className="block font-medium text-[#1668e8]">• Custom-built web applications & full-stack platforms — minimum of 4 weeks (varies by requirements).</span>
      </>
    ),
  },
  {
    q: 'What Are The Minimum Eligibility Criteria For zenvotech To Undertake A Project?',
    a: 'You must provide project details, budget, and your timeline. Every successful project starts with clear requirements and transparent milestones.',
  },
  {
    q: 'Do You Redesign Existing Websites?',
    a: 'Yes, we redesign websites with modern UI/UX, speed optimization, and mobile-first responsive architecture to maximize engagement and conversions.',
  },
  {
    q: "Do You Offer Ongoing Support With Our New Website Once It's Launched?",
    a: 'Yes! We provide monthly maintenance, security patches, performance monitoring, updates, and dedicated long-term technical support packages.',
  },
  {
    q: 'Will My Website Be Supported By Smartphones And Tablets As Well?',
    a: 'Absolutely. All websites and web applications we engineer are 100% responsive across mobile, tablet, laptop, and ultra-wide desktop displays.',
  },
  {
    q: 'How Much Does A Website Cost?',
    a: 'Pricing depends on bespoke design, features, complexity, and technology stack. We provide transparent packages and custom estimates for all budgets.',
  },
  {
    q: 'Do You Undertake Projects With A Limited Budget?',
    a: 'Yes! We work with startups and growing small businesses, offering high-impact, budget-friendly web solutions engineered for long-term scalability.',
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
            <a href="/services/website-development" className="nav-dropdown-link font-semibold text-[#1668e8]" onClick={closeMenu}>Web development</a>
            <a href="/services/app-development" className="nav-dropdown-link" onClick={closeMenu}>App development</a>
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
   MAIN WEBSITE DEVELOPMENT COMPONENT
───────────────────────────────────────────── */
export default function WebsiteDevelopmentPage() {
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>([]);
  const [visibleProjectCount, setVisibleProjectCount] = useState(9);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Load live admin projects if Supabase is connected
  useEffect(() => {
    const portfolioFrame = window.location.hash === '#portfolio'
      ? window.requestAnimationFrame(() => {
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        })
      : null;
    if (portfolioFrame === null) window.scrollTo(0, 0);
    setPageSeo('websites');

    const loadProjects = async () => {
      if (!supabase) return;
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .or('project_type.eq.web,project_type.is.null')
          .order('created_at', { ascending: false });
        if (!error && data) {
          setAdminProjects(data.filter((project) => project.name.trim().toLowerCase() !== 'serlerion'));
        }
      } catch {
        // Fallback silently if not available
      }
    };

    void loadProjects();

    const channel = supabase?.channel('webdev-page-projects')
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
                Modern Web Development
              </span>
              <span className="bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent">
                Solutions.
              </span>
            </h1>

            <div className="relative w-full max-w-[68rem] mx-auto rounded-2xl overflow-hidden border border-[#dce8ff] mb-10 group">
              <video
                src="https://files.catbox.moe/orn7wm.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                aria-label="Modern Web Development"
                className="webdev-mobile-hero-image pointer-events-none w-full object-cover h-[320px] md:h-[420px]"
              />
            </div>

           <p className="webdev-mobile-hero-copy text-lg md:text-xl text-[#4c6c9f] max-w-4xl mx-auto leading-relaxed">
  At <strong className="text-[#1668e8] font-bold">zenvotech</strong>, we deliver comprehensive web development services, combining modern UI/UX design with powerful functionality to build responsive, secure, and scalable digital solutions. From business websites and e-commerce platforms to custom web applications and enterprise systems, we use the latest technologies, including
  <span className="font-semibold text-[#0d1b2e]"> React, Next js, Vue js, Node js, Express js, Laravel, and Python</span>,
  to create seamless digital experiences that drive business growth.
</p>
          </section>

          {/* FEATURES SECTION — Large Visual Icons */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-center mb-28">
            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Web-Design-Layout-1.gif"
                  alt="Fully Modern Design & Development"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">Fully Modern Design & Development</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                We craft sleek, user-centric interfaces that captivate visitors and reflect your brand’s identity with immaculate precision.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Choose-Your-Colors.gif"
                  alt="Responsive Development"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">Responsive Multi-Device Development</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                Your website will look flawless and function seamlessly on all modern devices — from ultra-wide desktops to smartphones and tablets.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Employee-getting-Customer-requirements.gif"
                  alt="Conversion-Optimized Web Structure"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">Conversion-Optimized Architecture</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                Designed with strategy, every page guides users towards meaningful action — turning visitors into loyal leads and high-value customers.
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
              Explore our latest creations — from smart apps to powerful business platforms.
            </p>
          </section>

          {/* PORTFOLIO WORKSTATION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* LIVE DYNAMIC ADMIN PROJECTS (if any exist in Supabase) */}
            {adminProjects.slice(0, visibleProjectCount).map((ap, index) => {
              const code = countryFlagCodes[ap.country] || 'us';
              return (
                <div
                  key={ap.id}
                  className="webdev-project-card group relative w-full max-w-[500px] mx-auto rounded-2xl p-3 transition-all duration-500 webdev-project-reveal"
                  style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-transparent">
                    <img
                      src="https://i.ibb.co/bjnxQGHd/Chat-GPT-Image-Jan-22-2026-01-42-43-AM-removebg-preview-1.png"
                      alt="iMac Mockup"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                    />

                    <div className="absolute top-[8.5%] left-[12.5%] w-[75%] h-[48%] rounded-sm bg-transparent overflow-hidden webdev-scroll-area">
                      <div className="webdev-scroll-content">
                        <img
                          src={ap.image_url}
                          alt={ap.name}
                          className="w-full object-cover block"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <a
                      href={ap.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="webdev-project-overlay"
                      aria-label={`Visit live website for ${ap.name}`}
                    >
                    </a>
                  </div>

                  <div className="mt-4 pb-2 text-center">
                    <h4 className="text-lg font-bold text-[#0d1b2e] group-hover:text-[#1668e8] transition-colors">
                      {ap.live_url ? (
                        <a
                          href={ap.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit live website for ${ap.name}`}
                          className="webdev-project-title-link"
                        >
                          <img
                            src={`https://flagcdn.com/w40/${code}.png`}
                            alt=""
                            aria-hidden="true"
                            className="w-6 h-4 object-cover rounded-sm shadow-sm"
                          />
                          {ap.name}
                        </a>
                      ) : (
                        <>
                          <img
                            src={`https://flagcdn.com/w40/${code}.png`}
                            alt={ap.country}
                            className="mr-2 inline-block h-4 w-6 rounded-sm object-cover shadow-sm"
                          />
                          {ap.name}
                        </>
                      )}
                    </h4>
                    <span className="text-xs text-[#1668e8] font-semibold mt-1 inline-block">
                      Verified Client Project ✦
                    </span>
                  </div>
                </div>
              );
            })}

            {/* CURATED FULL CLIENT PROJECTS (1 to 30) */}
            {staticProjects.slice(0, Math.max(0, visibleProjectCount - adminProjects.length)).map((p, idx) => (
              <div
                key={`${p.title}-${idx}`}
                className="webdev-project-card group relative w-full max-w-[500px] mx-auto rounded-2xl p-3 transition-all duration-500 webdev-project-reveal"
                style={{ animationDelay: `${Math.min(adminProjects.length + idx, 8) * 70}ms` }}
              >
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-xl bg-transparent">
                  <img
                    src="https://i.ibb.co/bjnxQGHd/Chat-GPT-Image-Jan-22-2026-01-42-43-AM-removebg-preview-1.png"
                    alt="iMac Mockup"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10"
                  />

                  <div className="absolute top-[10.3%] left-[13.75%] w-[73.8%] h-[54.8%] rounded-[4px] bg-white overflow-hidden webdev-scroll-area [isolation:isolate] [-webkit-mask-image:-webkit-radial-gradient(white,black)]">
                    <div className="webdev-scroll-content">
                      <img
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        className="w-full object-cover block [image-rendering:-webkit-optimize-contrast]"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="webdev-project-overlay"
                    aria-label={`Visit live website for ${p.title}`}
                  >
                  </a>
                </div>

                <div className="mt-4 pb-2 text-center">
                  <h4 className="text-lg font-bold text-[#0d1b2e] group-hover:text-[#1668e8] transition-colors">
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit live website for ${p.title}`}
                      className="webdev-project-title-link"
                    >
                    {p.flagUrl && (
                      <img
                        src={p.flagUrl}
                        alt=""
                        aria-hidden="true"
                        className="w-6 h-4 object-cover rounded-sm shadow-sm"
                      />
                    )}
                      {p.title}
                    </a>
                  </h4>
                  <span className="text-xs text-[#4c6c9f] mt-0.5 inline-block">
                    {p.country || 'Global Platform'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {visibleProjectCount < adminProjects.length + staticProjects.length && (
            <button
              type="button"
              className="show-more-projects"
              onClick={() => setVisibleProjectCount((count) => count + 9)}
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

            <div className="tech-grid webdev-toolkit-grid">
              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/React.png" alt="React" className="h-14 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card tech-card--logo-only">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Veu-JS.png" alt="Vue.js" className="h-12 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Node.png" alt="Node.js" className="h-14 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/CSS.png" alt="CSS3" className="h-12 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Spring.png" alt="Spring" className="h-14 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Laravel.png" alt="Laravel" className="h-12 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card tech-card--logo-only">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Firebase.png" alt="Firebase" className="h-12 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

        
              <div className="tech-card tech-card--logo-only">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Flutter.png" alt="Flutter" className="h-12 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Mongo.png" alt="MongoDB" className="h-14 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card tech-card--logo-only">
                <img src="https://dynessco.com/wp-content/uploads/2025/06/Web-Flow.png" alt="Webflow" className="h-12 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>

              <div className="tech-card">
                <img src="https://i.ibb.co/zVdG77N7/Gemini-Generated-Image-ijuc4mijuc4mijuc-removebg-preview.png" alt="Next.js" className="h-14 object-contain" style={{ filter: 'brightness(0) saturate(100%) invert(24%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }} />
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="w-full max-w-4xl mx-auto mt-28 mb-32 px-4">
            <p className="text-center text-[#1668e8] font-mono text-xs tracking-widest uppercase font-semibold mb-3">
              Frequently Asked Questions
            </p>

            <h2 className="webdev-mobile-section-heading text-center text-3xl md:text-5xl font-extrabold text-[#0d1b2e] mb-14 leading-snug">
              Your Questions Answered:<br />
              <span className="text-[#1668e8]">Common Queries From Our Web Clients.</span>
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
                <filter id="webdev-orbit-glow" x="-20%" y="-50%" width="140%" height="200%">
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
                filter="url(#webdev-orbit-glow)"
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
                  <path id="webdev-orbit-text-path" d="M 90,90 m -69,0 a 69,69 0 1,1 138,0 a 69,69 0 1,1 -138,0" />
                </defs>
                <text>
                  <textPath href="#webdev-orbit-text-path">zenvotech • </textPath>
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
            <h2 className="webdev-mobile-cta-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 leading-tight">
              Launch Your Business
            </h2>
            <h3 className="webdev-mobile-cta-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1668e8] mb-10 leading-tight">
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

      {/* Dedicated Styles for iMac Scroll Animation and Shimmer */}
      <style>{`
        @media (max-width: 640px) {
          .webdev-mobile-section-heading {
            font-size: clamp(1.75rem, 7.5vw, 2.5rem) !important;
            line-height: 1.15 !important;
          }

          .webdev-mobile-cta-heading {
            font-size: clamp(1.65rem, 7.2vw, 2.5rem) !important;
            line-height: 1.15 !important;
          }
        }

        .webdev-scroll-area {
          overflow: hidden;
        }

        .webdev-scroll-content {
          will-change: transform;
          transition: transform 3.5s cubic-bezier(0.25, 1, 0.5, 1);
        }

        .webdev-project-card:hover .webdev-scroll-content {
          transform: translateY(calc(-100% + 140px));
        }

        .webdev-project-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
          backdrop-filter: none;
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: 0.75rem;
          z-index: 20;
          cursor: pointer;
        }

        .webdev-project-card:hover .webdev-project-overlay {
          opacity: 1;
        }

        @keyframes webdevShine {
          0% { left: -75%; }
          50% { left: 120%; }
          100% { left: -75%; }
        }

        .animate-shine {
          animation: webdevShine 3s infinite linear;
        }
      `}</style>
    </div>
  );
}
