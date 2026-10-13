import { useEffect, useState } from 'react';
import { ArrowUpRight, CalendarDays, ChevronDown, Menu, ShieldCheck, X } from 'lucide-react';
import HomeFooter from './HomeFooter';
import { setPageSeo } from './seo';
import alixerPerfumeErpVideo from './alixer-perfume-erp.mp4';
import premioCrmVideo from './premio-crm-preview.mp4';
import permioInventoryVideo from './permio-inventory-preview.mp4';

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqList: FaqItem[] = [
  {
    q: 'What Kind Of Business Processes Can You Automate?',
    a: (
      <>
        We automate a wide range of repetitive and manual business workflows.
        <br /><br />
        <span className="block font-medium text-[#1668e8]">• Data entry, reporting & document generation pipelines.</span>
        <span className="block font-medium text-[#1668e8]">• Email, CRM & customer communication workflows.</span>
        <span className="block font-medium text-[#1668e8]">• Inventory sync, invoice processing & ERP integrations.</span>
        <span className="block font-medium text-[#1668e8]">• API-to-API integrations between any tools your business uses.</span>
      </>
    ),
  },
  {
    q: 'What Are The Minimum Eligibility Criteria For zenvotech To Undertake A Project?',
    a: 'You must provide project details, budget, and your timeline. Every successful project starts with clear requirements and transparent milestones.',
  },
  {
    q: 'Which Tools & Platforms Do You Use For Automation?',
    a: 'We use a wide toolkit — including Python scripts, Node.js, n8n, Zapier, Make (Integromat), REST APIs, webhooks, and cloud functions — always selecting the right tool for your specific workflow.',
  },
  {
    q: 'Do You Offer Ongoing Support After The Automation Is Deployed?',
    a: 'Absolutely. We provide monitoring, maintenance, and expansion packages to ensure your automations continue running smoothly as your business evolves.',
  },
  {
    q: 'Can You Connect My Existing Software Tools Together?',
    a: 'Yes! We specialize in connecting any combination of tools — from Shopify, HubSpot, Notion, Google Workspace, Slack, and Airtable to custom ERPs and internal databases.',
  },
  {
    q: 'How Much Does A Business Automation Solution Cost?',
    a: 'Pricing depends on the complexity, number of integrations, and scale of the workflow. We offer transparent packages and custom estimates for every budget.',
  },
  {
    q: 'Do You Work With Startups With A Limited Budget?',
    a: 'Yes! We help startups and small businesses eliminate manual bottlenecks with cost-effective automation solutions that deliver measurable time and cost savings from day one.',
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
            <a href="/services/software-development" className="nav-dropdown-link" onClick={closeMenu}>Software development</a>
            <a href="/services/automation" className="nav-dropdown-link font-semibold text-[#1668e8]" onClick={closeMenu}>Automation</a>
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
   TECH STACK — same extended set as WhoWeArePage
───────────────────────────────────────────── */
const techStack = [
  { image: 'https://i.ibb.co/4wfFQQc4/Gemini-Generated-Image-hcefv9hcefv9hcef-removebg-preview-1.png', alt: 'React' },
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/Node.png', alt: 'Node.js' },
  { image: 'https://i.ibb.co/23jxSHL4/Lang-Chain-Logo-svg.png', alt: 'Laravel' },
  { image: 'https://i.ibb.co/4wR9jcn3/images-5-removebg-preview-1.png', alt: 'Firebase' },
  { image: 'https://i.ibb.co/Ngn4SQph/Gemini-Generated-Image-sfelm0sfelm0sfel-removebg-preview-1.png', alt: 'Next.js' },
  { image: 'https://i.ibb.co/9m8cYmPN/Gemini-Generated-Image-z05rhrz05rhrz05r-removebg-preview-1.png', alt: 'MongoDB' },
  { image: 'https://dynessco.com/wp-content/uploads/2025/06/Spring.png', alt: 'Spring' },
  { image: 'https://i.ibb.co/LzfP4WN9/images-6-removebg-preview-1.png', alt: 'CSS3' },
  { image: 'https://i.ibb.co/Sw4354yx/Gemini-Generated-Image-bzv8f2bzv8f2bzv8-removebg-preview-1.png', alt: 'Python' },
  { image: 'https://i.ibb.co/7N2Y351h/Gemini-Generated-Image-yqvmcdyqvmcdyqvm-removebg-preview-1.png', alt: 'Docker' },
  { image: 'https://i.ibb.co/LDyLtmyW/Gemini-Generated-Image-f1n8xzf1n8xzf1n8-removebg-preview.png', alt: 'PostgreSQL' },
  { image: 'https://i.ibb.co/ks65GqPt/Gemini-Generated-Image-m5tsqrm5tsqrm5ts-removebg-preview-1.png', alt: 'AWS' },
  { image: 'https://i.ibb.co/M5Cg49qT/Gemini-Generated-Image-tx8b1stx8b1stx8b-removebg-preview-1.png', alt: 'TypeScript' },
  { image: 'https://i.ibb.co/rGkFHBg2/Gemini-Generated-Image-deyqxldeyqxldeyq-removebg-preview-1-1.png', alt: 'GraphQL' },
  { image: 'https://i.ibb.co/C3L7N3Wt/Gemini-Generated-Image-nydfzanydfzanydf-removebg-preview-1.png', alt: 'Redis' },
];

const automationProjects: {
  id: string;
  name: string;
  country: string;
  flag?: string;
  video?: string;
  image?: string;
  category: string;
}[] = [
  {
    id: 'automation-crm',
    name: 'CRM & Sales Automation',
    country: 'United Arab Emirates',
    image: 'https://www.superoffice.com/globalassets/blog/2025/sales-process/dashboard.png',
    category: 'Automation',
  },
  {
    id: 'automation-whatsapp',
    name: 'WhatsApp Automation',
    country: 'Sri Lanka',
    image: 'https://unicorn-images.b-cdn.net/b383ae72-9283-4551-937d-323ca8da3f5d?optimizer=gif',
    video: premioCrmVideo,
    category: 'Automation',
  },
  {
    id: 'automation-inventory',
    name: 'Inventory & ERP Automation',
    country: 'Sri Lanka',
    image: 'https://images.openai.com/static-rsc-4/DKu-mCFZDb-7aAXqcjpltzFki36UlK0-ycTgcWMQBB0nHaA1cYsOT6hWWRiTQPsuZm7wGMEryyfSpVOiF58qxIApkSSr_h6gM-_ZPBF5Z4E_Q_YZPJE9r0BiS3ghVjb05NZ3Q_IYrG4KcWGGR-WEB96fSegWpDtfYwxB5FJ3F_4CVS7Pces5YFy8ld7dcSKN?purpose=fullsize',
    video: permioInventoryVideo,
    category: 'Automation',
  },
   {
    id: 'automation-email',
    name: 'Email Automation',
    country: 'Sri Lanka',
    image: 'https://images.openai.com/static-rsc-4/EqkWBkZgBkrbasOpBrMSmlJwol5FSboiyfbHzcUndHkBlAY_poMQ0-_xFB4CoXpvqymo4Y_fAnVH4WSTujVpg3HtKfmZhIx3LVC4HPkNV9f2OfnI7OlAbRFZb4lmqRXyH0EaVo4WbTqH86VgZACPFlZHwtxyIBU7BSQwrLRI6pOmBibMmiMpZJUU5qK6eJL6?purpose=fullsize',
    video: permioInventoryVideo,
    category: 'Automation',
  },
   {
    id: 'automation-booking',
    name: 'Booking & Appointment Automation',
    country: 'Sri Lanka',
    image: 'https://images.openai.com/static-rsc-4/gzmeXHgkC08Rkwe65VdqnDAkz8pZGWzbvXEcLSvclrRuWmCIZzIvXa6Ttc_JL0zrs2gahwo1yilfREpbMSLG1h2pLTcXyDCyu4fPIROJd-mQmZaSWRHuO3UVm7kXUWplgffkga32v3a1JxD9udxi90IkCPO1jFnlpVq7j7uvMC5ycjoYWWDw-doqxcva-kjb?purpose=fullsize',
    video: permioInventoryVideo,
    category: 'Automation',
  },
   {
    id: 'automation-reporting',
    name: 'Data Collection & Reporting',
    country: 'Sri Lanka',
    image: 'https://images.openai.com/static-rsc-4/QGTnnRXEFFIZw-s64Nq1UNNiakoNgQd_yXmDG_i9xibOKBs21kDDsJnwKA5NxpMloUEk_KdRxdsMOIEE3eBUxcPo1D1244_3qXAbrGM3SE1tFVQcV0-b52kpn0BLsxx52rVtTIrNd5LSyN-EQBF3Z_w2orvyd8kNUhE-bBj43KhieFZAatw3Hymd8cTbnEIg?purpose=fullsize',
    video: permioInventoryVideo,
    category: 'Automation',
  },
];

/* ─────────────────────────────────────────────
   MAIN AUTOMATION PAGE COMPONENT
───────────────────────────────────────────── */
export default function AutomationPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleProjectCount, setVisibleProjectCount] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo('automation');

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      setPageSeo('home');
      window.removeEventListener('scroll', handleScroll);
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
            {/* Eyebrow */}
            <div className="inline-flex translate-y-1 md:translate-y-2 lg:translate-y-3 items-center gap-2 px-4 py-1.5 rounded-full bg-[#eef4ff] border border-[#cde0ff] text-[#1668e8] text-xs font-mono font-semibold uppercase tracking-wider mb-6">
              <span className="w-2 h-2 rounded-full bg-[#1668e8] animate-pulse" />
              zenvotech
            </div>

            <h1 className="webdev-mobile-hero-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-[#0d1b2e] tracking-tight min-h-[3.5rem] md:min-h-[4.5rem] mb-6 flex flex-col lg:flex-row items-center justify-center lg:gap-x-3 lg:whitespace-nowrap">
              <span className="bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent">
                Intelligent Workflow
              </span>
              <span className="bg-gradient-to-r from-[#0d1b2e] via-[#1668e8] to-[#0d4db5] bg-clip-text text-transparent">
                Automation
              </span>
            </h1>

            <div className="relative w-full max-w-[68rem] mx-auto rounded-2xl overflow-hidden border border-[#dce8ff] mb-10 group">
              <video
                src="https://files.catbox.moe/bg5loa.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                aria-label="Workflow Automation"
                className="webdev-mobile-hero-image pointer-events-none w-full object-cover h-[320px] md:h-[420px]"
              />
            </div>

            <p className="webdev-mobile-hero-copy text-lg md:text-xl text-[#4c6c9f] max-w-4xl mx-auto leading-relaxed">
              At <strong className="text-[#1668e8] font-bold">zenvotech</strong>, we design and deploy intelligent workflow automation solutions that eliminate repetitive tasks, reduce operational overhead, and free your team to focus on what truly matters. From API integrations and data pipelines to full process orchestration using{' '}
              <span className="font-semibold text-[#0d1b2e]">Python, Node js, n8n, Make, Puppet, REST APIs, and Cloud Functions</span>
              {' '}— we automate the work so you don't have to.
            </p>
        
          </section>

          {/* FEATURES SECTION */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-center mb-28">
            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Web-Design-Layout-1.gif"
                  alt="End-to-End Workflow Automation"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">End-to-End Workflow Automation</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                We map, design, and implement fully automated pipelines that connect your tools, data, and teams — eliminating manual handoffs and bottlenecks at every stage.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Employee-getting-Customer-requirements.gif"
                  alt="Seamless Tool Integrations"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">Seamless Tool Integrations</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                We connect any combination of platforms — CRMs, ERPs, e-commerce, communication tools, and custom APIs — into one unified, synchronized digital ecosystem.
              </p>
            </div>

            <div className="flex flex-col items-center p-8 bg-white">
              <div className="w-52 h-52 mb-6 flex items-center justify-center">
                <img
                  src="https://dynessco.com/wp-content/uploads/2025/06/Choose-Your-Colors.gif"
                  alt="Scalable & Monitored Systems"
                  className="w-full h-full object-contain"
                  style={{ filter: 'hue-rotate(70deg)' }}
                />
              </div>
              <h3 className="mb-3 whitespace-nowrap text-[clamp(0.9375rem,4vw,1.125rem)] font-bold text-[#1668e8]">Scalable & Monitored Systems</h3>
              <p className="text-[#4c6c9f] text-sm leading-relaxed max-w-xs">
                Every automation we build is designed for reliability and growth — with monitoring, error handling, alerting, and the flexibility to scale as your business demands increase.
              </p>
            </div>
          </section>

          {/* AUTOMATION PORTFOLIO */}
          <section className="w-full mb-16 flex flex-col items-center text-center">
            <div className="w-full">
              <h2 className="webdev-mobile-section-heading !mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>What we have <span>done.</span></h2>
            </div>
            <p className="section-lede mx-auto text-center">
              Explore automation-powered business platforms built to streamline everyday operations.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" id="automation-project-grid">
            {automationProjects.slice(0, visibleProjectCount).map((project, index) => (
              <div
                key={project.id}
                className="webdev-project-card group relative w-full max-w-[500px] mx-auto rounded-2xl p-3 transition-all duration-500 webdev-project-reveal"
                style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
              >
                <div className="desktop-mockup-wrap">
                  <div className="desktop-screen-area">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.name} dashboard preview`}
                        className="desktop-project-video"
                      />
                    ) : (
                      <video
                        src={project.video}
                        aria-label={`${project.name} preview`}
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
                    )}
                  </div>
                  <img
                    src="https://i.ibb.co/0j5HqYt4/Transparent-i-Mac-Style-Monitor-Mockup-1-removebg-preview-1.png"
                    alt="Desktop Monitor Mockup"
                    className="desktop-frame-overlay"
                  />
                </div>

                <div className="mt-4 pb-2 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <img src={project.flag} alt="" className="w-6 h-4 object-cover rounded-sm shadow-sm flex-shrink-0" />
                    <h3 className="text-lg font-bold text-[#0d1b2e] leading-tight select-none">{project.name}</h3>
                  </div>
                  <span className="text-xs text-[#1668e8] font-semibold mt-1 inline-block">
                    {project.category} ✦
                  </span>
                </div>
              </div>
            ))}
          </div>
          {visibleProjectCount < automationProjects.length && (
            <button
              type="button"
              className="show-more-projects"
              aria-expanded={visibleProjectCount > 6}
              aria-controls="automation-project-grid"
              onClick={() => setVisibleProjectCount((count) => count + 6)}
            >
              See More
            </button>
          )}

          {/* TECHNOLOGIES & PLATFORMS SECTION */}
          <section className="w-full mt-20 mb-28">
            <div className="section-heading tech-heading">
              <p className="eyebrow">Our toolkit</p>
              <h2 className="webdev-mobile-section-heading">Modern technologies<br /><span>we use.</span></h2>
              <p className="section-lede">The right tools for the right job. Always thoughtfully chosen, never just for show.</p>
            </div>

            <div className="tech-grid automation-tech-grid">
              {techStack.map((tech, index) => (
                <div
                  className={`tech-card${['Node.js', 'Spring', 'JavaScript', 'TypeScript', 'Python'].includes(tech.alt) ? ' tech-card--logo-only' : ''}`}
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
              <span className="text-[#1668e8]">Common Queries From Our Automation Clients.</span>
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
                <filter id="automation-orbit-glow" x="-20%" y="-50%" width="140%" height="200%">
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
                filter="url(#automation-orbit-glow)"
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
                  <path id="automation-orbit-text-path" d="M 90,90 m -69,0 a 69,69 0 1,1 138,0 a 69,69 0 1,1 -138,0" />
                </defs>
                <text>
                  <textPath href="#automation-orbit-text-path">zenvotech • </textPath>
                </text>
              </svg>
              <span className="faq-orbit-inner" aria-hidden="true">
                <ArrowUpRight size={27} strokeWidth={1.8} />
              </span>
            </a>
          </section>

          {/* CALL TO ACTION SECTION */}
          <section className="relative w-full rounded-3xl mt-20 mb-4 py-20 px-6 sm:px-12 bg-white text-[#0d1b2e] overflow-hidden flex flex-col justify-center items-center text-center">
            {/* Background Decorative Rings */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#1668e8]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7cb5ff]/10 rounded-full blur-3xl pointer-events-none" />

            <p className="text-[#0d4db5] text-xs font-mono font-bold uppercase tracking-widest mb-4 border-b border-[#1668e8] pb-1">
              Automate Your Business
            </p>

            <h2 className="webdev-mobile-cta-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-3 leading-tight">
              Smarter With zenvotech
            </h2>
            <h3 className="webdev-mobile-cta-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#1668e8] mb-10 leading-tight">
              
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
            <p className="text-[#4c6c9f] text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              
            </p>

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
