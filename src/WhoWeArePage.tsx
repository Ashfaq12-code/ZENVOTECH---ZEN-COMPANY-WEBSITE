import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, ChevronDown, Menu, Plus, ShieldCheck, X } from 'lucide-react';
import HomeFooter from './HomeFooter';
import { setPageSeo } from './seo';
import ClientReviewForm from './admin/ClientReviewForm';
import { ClientReview, formatRelativeTime, supabase } from './admin/supabase';
import TeamSection from './TeamSection';

/* ─────────────────────────────────────────────
   FAQ DATA
───────────────────────────────────────────── */
interface FaqItem {
  q: string;
  a: React.ReactNode;
}

const faqList: FaqItem[] = [
  {
    q: 'How long does it take zenvotech to build a website?',
    a: (
      <>
        Our project timeline depends on the scope and complexity of your requirements. Typical timelines are:
        <br /><br />
        <span className="block">• Landing / E- Business websites — deliver  from 1 week.</span>
        <span className="block">• E-commerce websites — deliver from 2 weeks.</span>
        <span className="block">• Custom-built web applications — deliver from 4 weeks (may vary by complexity).</span>
      </>
    ),
  },
  {
    q: 'What are the requirements for zenvotech to start a project?',
    a: 'To get started, share your project details, expected budget, and timeline. We make sure every project begins with clear requirements and shared expectations.',
  },
  {
    q: 'Does zenvotech redesign existing websites?',
    a: 'Yes! We revamp existing websites with modern UI/UX design, performance optimisation, and mobile-first responsiveness.',
  },
  {
    q: 'Does zenvotech offer ongoing support after launch?',
    a: 'Absolutely. We provide monthly maintenance, updates, and long-term support packages tailored to your needs.',
  },
  {
    q: 'Will my website be fully responsive on all devices?',
    a: 'Yes. All websites we build are optimised for mobile, tablet, and desktop to ensure a seamless experience everywhere.',
  },
  {
    q: 'How much does a website cost with zenvotech?',
    a: 'Our pricing depends on complexity, features, and platform. We offer flexible packages to accommodate startups, SMEs, and enterprise clients.',
  },
  {
    q: 'Can zenvotech handle projects with a limited budget?',
    a: 'Definitely! We work with startups and small businesses, offering cost-effective solutions without compromising quality.',
  },
];

/* ─────────────────────────────────────────────
   FAQ COMPONENT
───────────────────────────────────────────── */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 px-4 bg-white overflow-hidden">
      {/* subtle blue radial tint */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(22,104,232,0.07), transparent 70%)',
        }}
      />

      <div className="max-w-3xl mx-auto">
        <p className="text-center text-[#1668e8] font-mono text-xs tracking-widest uppercase mb-3">
          Frequently Asked Questions
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-[#0d1b2e] mb-14 leading-snug">
          zenvotech Website Development:<br />
          
        </h2>

        <div className="space-y-3">
          {faqList.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`rounded-xl p-5 cursor-pointer border transition-all duration-300 ${
                  isOpen
                    ? 'border-[#1668e8] bg-[#eef4ff] shadow-[0_0_0_3px_rgba(22,104,232,0.12)]'
                    : 'border-gray-200 bg-gray-50 hover:border-[#1668e8]/40'
                }`}
              >
                {/* animated top bar */}
                <div
                  className="h-0.5 rounded-full mb-3 transition-all duration-500"
                  style={{
                    background: 'linear-gradient(to right,#a8c8f8,#1668e8,#a8c8f8)',
                    transform: `scaleX(${isOpen ? 1 : 0})`,
                    transformOrigin: 'left',
                  }}
                />

                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xl font-bold leading-none ${
                        isOpen ? 'text-[#1668e8]' : 'text-gray-400'
                      }`}
                    >
                      {isOpen ? '×' : '+'}
                    </span>
                    <h3 className="text-[#0d1b2e] font-semibold text-sm md:text-base">
                      {faq.q}
                    </h3>
                  </div>
                  <span className={`text-xl flex-shrink-0 ${isOpen ? 'text-[#1668e8]' : 'text-gray-400'}`}>
                    {isOpen ? '–' : '+'}
                  </span>
                </div>

                <div
                  className="overflow-hidden transition-all duration-500"
                  style={{ maxHeight: isOpen ? '400px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="text-gray-600 text-sm md:text-base mt-4 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIALS (auto-scroll)
───────────────────────────────────────────── */
const reviews = [
  { author: 'Maya Chen', company: 'Clearpath', rating: 5, text: 'zenvotech turned our business idea into a complete digital platform that is fast, scalable, and easy to manage.', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { author: 'Daniel Okafor', company: 'Orbit Health', rating: 5, text: 'They delivered a modern web application that completely improved how our customers interact with our business.', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { author: 'Sofia Martinez', company: 'Northstar', rating: 5, text: 'From mobile app development to backend systems, zenvotech handled everything smoothly from start to launch.', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { author: 'Elliot Reed', company: 'Fuse', rating: 5, text: 'The team helped us automate repetitive processes and save hours of manual work every week.', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
  { author: 'Nia Walker', company: 'Lumen Labs', rating: 5, text: 'zenvotech gave us the technology foundation we needed to scale our business with confidence.', avatar: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { author: 'Arjun Mehta', company: 'Vantage', rating: 5, text: 'They understood our requirements quickly and built a reliable solution that actually solved our business problems.', avatar: 'https://randomuser.me/api/portraits/men/46.jpg' },
  { author: 'Iris Laurent', company: 'Atelier 09', rating: 5, text: 'zenvotech combined great design with solid engineering to create a web experience our customers genuinely enjoy using.', avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
  { author: 'Marcus Bell', company: 'Kinetic', rating: 5, text: 'Our new business system brought our operations into one place and made everyday work much more efficient.', avatar: '' },
  { author: 'Leah Park', company: 'Orbital', rating: 5, text: 'The most seamless development partnership we have experienced. Fast, professional, and always focused on the solution.', avatar: '' },
  { author: 'Jonas Berg', company: 'Arcline', rating: 5, text: 'Our website and mobile experience are faster, clearer, and performing at a completely different level.', avatar: '' },
];

type WhoWeArePageProps = {
  clientReviews: ClientReview[];
  contentError: string;
  dashboardProjectCount: number;
};

type TestimonialsProps = Pick<WhoWeArePageProps, 'clientReviews' | 'contentError'>;

function Testimonials({ clientReviews, contentError }: TestimonialsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const reviewCards = [
    ...reviews.map((review, index) => {
      const fakeDaysAgo = [7, 14, 21, 30, 45, 60, 90, 120, 150, 180][index % 10];
      return {
        id: `featured-${index}`,
        quote: review.text,
        name: review.author,
        detail: review.company,
        rating: review.rating,
        avatar: review.avatar,
        createdAt: new Date(Date.now() - fakeDaysAgo * 24 * 60 * 60 * 1000).toISOString(),
      };
    }),
    ...clientReviews.map((review) => ({
      id: review.id,
      quote: review.body,
      name: review.name,
      detail: review.country,
      rating: review.rating,
      avatar: undefined,
      createdAt: review.created_at,
    })),
  ];
  const reviewRows = [
    reviewCards.filter((_, index) => index % 2 === 0),
    reviewCards.filter((_, index) => index % 2 === 1),
  ];

  return (
    <section className="reviews-section who-reviews-section">
      <div className="section-pad reviews-header">
        <div>
          <p className="eyebrow">Kind words</p>
          <h2>Good work has <span>good echoes.</span></h2>
        </div>
        <div className="google-rating">
          <div className="google-g">G</div>
          <div>
            <strong>5.0 <span>★★★★★</span></strong>
            <p>Based on Google reviews</p>
          </div>
          <button className="public-review-button" type="button" onClick={() => setShowReviewForm(true)}><Plus size={14} /> Add a review</button>
        </div>
      </div>

      {contentError && <p className="published-content-error section-pad" role="status">Live reviews could not be refreshed: {contentError}</p>}
      <div className="reviews-rows" aria-label="Client reviews">
        {reviewRows.map((row, rowIndex) => (
          <div className="reviews-row-window" key={`who-review-row-${rowIndex}`}>
            <div className={`reviews-row-track${rowIndex % 2 === 1 ? ' reviews-row-track--reverse' : ''}`}>
              {[0, 1].map((copy) => (
                <div className="reviews-row-group" key={`who-review-group-${copy}`}>
                  {row.map((review) => (
                    <article className="review-card" key={`${review.id}-${copy}`}>
                      <div className="review-card-header">
                        {review.avatar ? (
                          <img src={review.avatar} alt={review.name} className="review-card-avatar" loading="lazy" />
                        ) : (
                          <span className="review-card-avatar-fallback" aria-hidden="true">
                            {review.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                          </span>
                        )}
                        <div className="review-card-meta">
                          <div className="review-card-name-row">
                            <strong className="review-card-name">{review.name}</strong>
                            {review.detail && <span className="review-card-location">{review.detail}</span>}
                          </div>
                          <div className="review-card-stars" aria-label={`${review.rating} out of 5 stars`}>
                            {'★'.repeat(review.rating)}
                            <span className="review-card-stars-empty">{'★'.repeat(Math.max(0, 5 - review.rating))}</span>
                          </div>
                        </div>
                      </div>
                      <p className="review-card-quote">“{review.quote.replace(/^“|”$/g, '')}”</p>
                      {review.createdAt && (
                        <span className="review-card-time">{formatRelativeTime(review.createdAt)}</span>
                      )}
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {showReviewForm && <ClientReviewForm onClose={() => setShowReviewForm(false)} />}
    </section>
  );
}

/* ─────────────────────────────────────────────
   WHY CHOOSE SECTION
───────────────────────────────────────────── */
const features = [
  {
    img: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-1.svg',
    title: 'Proven Technical Expertise',
    description:
      'Deep craft across modern frameworks and platforms, delivering reliable solutions that scale with you. Years of hands-on experience across multiple industries back every line of code we ship.',
  },
  {
    img: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-2.svg',
    title: 'Client-Centric Approach',
    description:
      'Your success is our priority. We work closely with you throughout every stage, ensuring full transparency, open communication, and solutions tailored specifically to your goals.',
  },
  {
    img: 'https://dynessco.com/wp-content/uploads/2024/11/s1-icon-3.svg',
    title: 'Scalable & Future-Ready Technology',
    description:
      'We build robust, secure, and scalable software using the latest technologies. Our solutions are designed to grow with your business and adapt to evolving market needs.',
  },
];

const curatedProjectCount = 30;

function AnimatedMetric({ value, started }: { value: number; started: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!started) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return;
    }

    let frame = 0;
    const startTime = performance.now();
    const duration = 850;
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setDisplayValue(Math.round(value * easedProgress));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [started, value]);

  return <>{displayValue.toLocaleString()}</>;
}

function CompanyMetrics({ dashboardProjectCount }: { dashboardProjectCount: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [started, setStarted] = useState(false);
  const [clientCount, setClientCount] = useState(30);
  const [metricsError, setMetricsError] = useState('');
  const projectCount = curatedProjectCount + dashboardProjectCount;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setStarted(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (!supabase) {
      setMetricsError('Live totals are unavailable right now.');
      return;
    }

    const client = supabase;
    let active = true;
    const refreshCounts = async () => {
      const { count, error } = await client.from('client_reviews').select('id', { count: 'exact', head: true });
      const firstError = error;
      if (firstError) throw firstError;
      if (count === null) {
        throw new Error('Live client total could not be read.');
      }
      if (!active) return;

      setClientCount(30 + count);
      setMetricsError('');
    };

    void refreshCounts().catch((error: unknown) => {
      if (active) {
        setMetricsError(error instanceof Error ? error.message : 'Live totals could not be refreshed.');
      }
    });

    const channel = client
      .channel('who-we-are-company-metrics')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'client_reviews' }, () => {
        void refreshCounts().catch((error: unknown) => {
          if (active) setMetricsError(error instanceof Error ? error.message : 'Client total could not be refreshed.');
        });
      })
      .subscribe((status) => {
        if (active && (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT')) {
          setMetricsError('Live totals could not connect. Please refresh the page.');
        }
      });

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, [started]);

  return (
    <section className="who-company-metrics" ref={sectionRef} aria-label="About zenvotech in numbers">
      <article className="who-company-metric">
        <strong><AnimatedMetric value={6} started={started} />+</strong>
        <h3>Years of experience</h3>
      </article>
      <article className="who-company-metric">
        <strong><AnimatedMetric value={projectCount} started={started} />+</strong>
        <h3>Projects worldwide</h3>
        <p>Across web, app, and desktop</p>
      </article>
      <article className="who-company-metric">
        <strong><AnimatedMetric value={clientCount} started={started} />+</strong>
        <h3>Clients worldwide</h3>
      </article>
      {metricsError && <p className="who-company-metrics-error" role="status">{metricsError}</p>}
    </section>
  );
}

function WhyChoose({ dashboardProjectCount }: { dashboardProjectCount: number }) {
  return (
    <section className="who-why-section">
      <div className="max-w-6xl mx-auto">
        <div className="who-why-heading">
          <p className="text-[#1668e8] font-mono text-xs tracking-widest uppercase mb-3">
            Why zenvotech
          </p>
          <h2 className="text-[clamp(1.5rem,7vw,1.875rem)] md:text-4xl lg:text-5xl font-bold leading-tight">
            <span className="text-[#1668e8]">Trusted, Scalable, and<br className="hidden sm:block" />Result-</span>
            <span className="text-[#0d1b2e]"> Digital Solutions</span>
          </h2>
        </div>

        <CompanyMetrics dashboardProjectCount={dashboardProjectCount} />

        <div className="who-why-features">
          {features.map((f, i) => (
            <article className="who-why-feature" key={i}>
              <span className="who-why-number" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <img
                src={f.img}
                alt=""
                aria-hidden="true"
                className="who-why-icon"
                style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(91%) saturate(2964%) hue-rotate(211deg) brightness(93%) contrast(101%)' }}
              />
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const techStack = [
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/React.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Veu-JS.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Node.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/CSS.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Spring.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Laravel.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Firebase.png' },
  { name: '', image: 'https://i.ibb.co/zVdG77N7/Gemini-Generated-Image-ijuc4mijuc4mijuc-removebg-preview.png' },

  { name: '', image: 'https://i.ibb.co/NdcBxqrp/Gemini-Generated-Image-svky9zsvky9zsvky-removebg-preview-1.png' },
  { name: '', image: 'https://i.ibb.co/PvHPgw17/Gemini-Generated-Image-jfmzbljfmzbljfmz-removebg-preview-1.png' },
  { name: '', image: 'https://i.ibb.co/LDyLtmyW/Gemini-Generated-Image-f1n8xzf1n8xzf1n8-removebg-preview.png' },
  { name: '', image: 'https://i.ibb.co/ds251dLs/Gemini-Generated-Image-ryri36ryri36ryri-removebg-preview-1.png' },

   { name: '', image: 'https://i.ibb.co/GQFcXZGh/Gemini-Generated-Image-yatot2yatot2yato-2-removebg-preview-1.png' },
  { name: '', image: 'https://i.ibb.co/rGkFHBg2/Gemini-Generated-Image-deyqxldeyqxldeyq-removebg-preview-1-1.png' },
  { name: '', image: 'https://i.ibb.co/C3L7N3Wt/Gemini-Generated-Image-nydfzanydfzanydf-removebg-preview-1.png' },
];

function TechnologySection() {
  return (
    <section className="tech-section who-tech-section">
      <div className="section-pad">
        <div className="section-heading tech-heading">
          <p className="eyebrow">Our toolkit</p>
          <h2>Modern technologies<br /><span>we use.</span></h2>
          <p className="section-lede">The right tools for the right job. Always thoughtfully chosen, never just for show.</p>
        </div>
        <div className="tech-grid">
          {techStack.map((tech, index) => (
            <div
              className={`tech-card${[1, 2, 5, 8, 10, 12, 14].includes(index) ? ' tech-card--logo-only' : ''}`}
              key={tech.image}
            >
              <img
                src={tech.image}
                alt={tech.name || (index === techStack.length - 1 ? 'Next.js' : 'Technology logo')}
                className={`tech-logo${index === techStack.length - 1 ? ' tech-logo-next' : ''}`}
              />
              <strong>{tech.name}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[70vh] flex flex-col items-center justify-center bg-white overflow-hidden px-4 pt-12 pb-24 text-center">
      {/* decorative blue glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(22,104,232,0.10), transparent 70%)',
        }}
      />

      <p className="text-[#1668e8] font-mono text-xs tracking-widest uppercase mb-4">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#1668e8] mr-2 mb-0.5" />
        About zenvotech
      </p>

      <h1 className="text-[clamp(1.5rem,7vw,2rem)] md:text-5xl lg:text-6xl font-bold text-[#0d1b2e] leading-tight mb-6 max-w-4xl">
        Who We Are —{' '}
        <span className="text-[#1668e8]">
          Trusted Software<br className="hidden sm:block" /> Development Company In Sri Lanka

        </span>
      </h1>

      

      <div className="relative max-w-2xl md:max-w-3xl w-full mx-auto mt-0 md:mt-6 rounded-2xl overflow-hidden border border-[#dce8ff]">
        <video
          src="https://files.catbox.moe/ntxded.mp4"
          aria-label="zenvotech team video"
          className="w-full h-64 md:h-[22rem] object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
        {/* blue tint overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, rgba(22,104,232,0.18), transparent 60%)' }}
        />
      </div>

      <p className="mt-8 text-gray-500 text-base md:text-lg max-w-2xl leading-relaxed mb-10">
       zenvotech Pvt Ltd is a full-stack software development company delivering innovative, secure, and scalable solutions. We build custom software, mobile apps, and web applications tailored to meet modern business needs.

      </p>

      {/* scroll cue */}
      <div className="flex flex-col items-center mt-12 gap-2">
        <div className="w-10 h-10 rounded-full bg-[#1668e8] flex items-center justify-center shadow-lg shadow-[#1668e8]/40 animate-bounce">
          <ArrowDown className="w-5 h-5 text-white" />
        </div>
        <div className="w-px h-10 bg-gradient-to-b from-[#1668e8] to-transparent" />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   NAV (matches zenvotech style)
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
            <a href="/#services" className="nav-dropdown-trigger" onClick={closeMenu}>Services</a>
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
            {['Web development', 'App development', 'Software development', 'Automation'].map((service) => {
              const href =
                service === 'Web development'
                  ? '/services/website-development'
                  : service === 'App development'
                  ? '/services/app-development'
                  : service === 'Software development'
                  ? '/services/software-development'
                  : service === 'Automation'
                  ? '/services/automation'
                  : '/#services';
              return (
                <a
                  key={service}
                  href={href}
                  className="nav-dropdown-link"
                  onClick={closeMenu}
                >
                  {service}
                </a>
              );
            })}
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
   MAIN EXPORT
───────────────────────────────────────────── */
export default function WhoWeArePage({ clientReviews, contentError, dashboardProjectCount }: WhoWeArePageProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageSeo('about');
    return () => setPageSeo('home');
  }, []);

  useEffect(() => {
    const updateScrollTopVisibility = () => setShowScrollTop(window.scrollY > 420);
    updateScrollTopVisibility();
    window.addEventListener('scroll', updateScrollTopVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollTopVisibility);
  }, []);

  return (
    <div className="bg-white min-h-screen font-[Manrope,sans-serif]">
      <PageNav />
      <div className="pt-20">
        <Hero />
        <WhyChoose dashboardProjectCount={dashboardProjectCount} />
        <TeamSection />
        <TechnologySection />
        <FAQ />
        <section className="faq-orbit" aria-label="Visit our featured project">
          <svg
            className="faq-orbit-path"
            viewBox="0 0 1200 300"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="faq-orbit-glow" x="-20%" y="-50%" width="140%" height="200%">
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
              filter="url(#faq-orbit-glow)"
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
                <path id="who-we-are-orbit-text-path" d="M 90,90 m -69,0 a 69,69 0 1,1 138,0 a 69,69 0 1,1 -138,0" />
              </defs>
              <text>
                <textPath href="#who-we-are-orbit-text-path">zenvotech • </textPath>
              </text>
            </svg>
            <span className="faq-orbit-inner" aria-hidden="true">
              <ArrowUpRight size={27} strokeWidth={1.8} />
            </span>
          </a>
        </section>
        <Testimonials clientReviews={clientReviews} contentError={contentError} />
      </div>
      <HomeFooter />
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
