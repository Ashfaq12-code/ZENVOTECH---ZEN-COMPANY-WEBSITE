import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowDownRight,
  ArrowUpRight,
  ChevronDown,
  Code2,
  Globe2,
  Layers3,
  Mail,
  Menu,
  Monitor,
  Play,
  Plus,
  Quote,
  ShieldCheck,
  Smartphone,
  X,
  Zap,
} from 'lucide-react';
import AdminPortal from './admin/AdminPortal';
import ClientReviewForm from './admin/ClientReviewForm';
import { AdminProject, ClientReview, formatRelativeTime, recordCallClick, supabase } from './admin/supabase';
import './admin/PublicContent.css';
import HomeFooter from './HomeFooter';
import { setPageSeo } from './seo';
import WhoWeArePage from './WhoWeArePage';
import WebsiteDevelopmentPage from './WebsiteDevelopmentPage';
import MobileAppDevelopmentPage from './MobileAppDevelopmentPage';
import SoftwareDevelopmentPage from './SoftwareDevelopmentPage';
import AutomationPage from './AutomationPage';
import { mobileAppProjects } from './mobileAppProjects';
import type { GoogleReviewPayload } from './googleReviews';
import alixerPerfumeErpVideo from './alixer-perfume-erp.mp4';
import premioCrmVideo from './premio-crm-preview.mp4';
import permioInventoryVideo from './permio-inventory-preview.mp4';

const brands = [
  'https://i.ibb.co/dJVRRDQv/Gemini-Generated-Image-op1ufiop1ufiop1u-removebg-preview-1.png',
  'https://i.ibb.co/MxgXywHj/Gemini-Generated-Image-cduj72cduj72cduj-removebg-preview-1.png',
  'https://i.ibb.co/1YTD9Vf3/Gemini-Generated-Image-4y6z8o4y6z8o4y6z-removebg-preview-1.png',
  'https://i.ibb.co/8D90RRdF/Gemini-Generated-Image-10w1mk10w1mk10w1-removebg-preview-1.png',
  'https://i.ibb.co/RG5Fqy8V/Gemini-Generated-Image-7fxz807fxz807fxz-1-removebg-preview.png',
  'https://i.ibb.co/R4zP20T3/Gemini-Generated-Image-2gnf6z2gnf6z2gnf-removebg-preview-1-1.webp',
  'https://i.ibb.co/MkGxwD4R/ba33cd8e-dca7-462b-af8b-0929dd788960-removebg-preview-1.png',
  'https://i.ibb.co/GDPsrsF/88c69006-60ce-4908-9e1d-ce8a06f1d31e-removebg-preview-1.png',
];
const projectHoverScrollDuration = 3500;
type DisplayProject = {
  id: string;
  title: string;
  flag: string;
  mockupImage: string;
  preview: boolean;
  screenImage: string;
  url?: string;
  country?: string;
  createdAt?: string;
};

const services = [
  { number: '01', title: 'Web development', text: 'Fast, flexible digital experiences built to turn attention into action.', icon: Globe2 },
  { number: '02', title: 'App development', text: 'Intuitive mobile products that people keep coming back to.', icon: Layers3 },
  { number: '03', title: 'Software development', text: 'Reliable platforms that make complex operations feel simple.', icon: Code2 },
  { number: '04', title: 'Automation', text: 'Intelligent workflows that give your team time back to grow.', icon: Zap },
];

const imacFrameImage = 'https://i.ibb.co/bjnxQGHd/Chat-GPT-Image-Jan-22-2026-01-42-43-AM-removebg-preview-1.png';
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
const projects: DisplayProject[] = [
  { id: 'zenvora', title: 'zenvotech', flag: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg', mockupImage: imacFrameImage, preview: true, screenImage: '' },
  { id: 'sweetladyjane', title: 'Sweetladyjane', flag: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg', mockupImage: imacFrameImage, preview: false, screenImage: 'https://i.ibb.co/MDRtrnNr/10-4-2026-11-55-59-PM.jpg', url: 'https://sweetladyjane.com/' },
  { id: 'olunid', title: 'Olunid', flag: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1ee-1f1f9.svg', mockupImage: imacFrameImage, preview: false, screenImage: 'https://i.ibb.co/PvNdMVXX/10-5-2026-12-09-38-AM.jpg', url: 'https://olunid.com/' },
  { id: 'alexwides', title: 'Alex Wides', flag: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1ee-1f1f9.svg', mockupImage: imacFrameImage, preview: false, screenImage: 'https://i.ibb.co/xS3qmhgP/10-5-2026-12-14-52-AM.jpg', url: 'https://www.alexwides.com/' },
   { id: 'mydreamcar', title: 'Mydreamcar', flag: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg', mockupImage: imacFrameImage, preview: false, screenImage: 'https://i.ibb.co/B5HZG383/10-5-2026-12-28-40-AM.jpg', url: 'https://www.mydreamcar.lk/' },
   { id: 'bloodlinetattoobali', title: 'Bloodlinetattoobali', flag: 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1e6-1f1fa.svg', mockupImage: imacFrameImage, preview: false, screenImage: 'https://i.ibb.co/QFKHz909/10-5-2026-12-32-59-AM.jpg', url: 'https://www.bloodlinetattoobali.com/' },
  
  ...Array.from({ length: 7 }, (_, index) => ({
    id: `empty-${index + 2}`,
    title: '',
    flag: '',
    mockupImage: imacFrameImage,
    preview: false,
    screenImage: '',
  })),
];

type MockupProject = {
  id: string;
  name: string;
  country: string;
  flag: string;
  screenshot?: string;
  video?: string;
  videoSrc?: string;
  category?: string;
  url?: string;
  createdAt?: string;
};

const desktopMockupFrame = 'https://i.ibb.co/0j5HqYt4/Transparent-i-Mac-Style-Monitor-Mockup-1-removebg-preview-1.png';

const appProjects: MockupProject[] = mobileAppProjects.map((project) => ({
  ...project,
  video: project.videoSrc,
}));

const desktopProjects: MockupProject[] = [
  {
    id: 'desk-zenvora-erp',
    name: 'Alixer Perfume ERP',
    country: 'United Arab Emirates',
    flag: 'https://flagcdn.com/w40/ae.png',
    screenshot: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80',
    video: alixerPerfumeErpVideo,
    category: 'Software',
    url: '#contact',
  },
  {
    id: 'desk-omniflow',
    name: 'Football Jercy CRM',
    country: 'Sri Lanka',
    flag: 'https://flagcdn.com/w40/lk.png',
    screenshot: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&auto=format&fit=crop&q=80',
    video: premioCrmVideo,
    category: 'Software',
    url: '#contact',
  },
  {
    id: 'desk-tradepulse',
    name: 'Jercy INVENTORY',
    country: 'Sri Lanka',
    flag: 'https://flagcdn.com/w40/lk.png',
    screenshot: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
    video: permioInventoryVideo,
    category: 'Software',
    url: '#contact',
  },
];

const testimonials = [
  ['“zenvotech turned our business idea into a complete digital platform that is fast, scalable, and easy to manage.”', 'Maya Chen', 'Founder, Clearpath'],

  ['“They delivered a modern web application that completely improved how our customers interact with our business.”', 'Daniel Okafor', 'CEO, Orbit Health'],

  ['“From mobile app development to backend systems, zenvotech handled everything smoothly from start to launch.”', 'Sofia Martinez', 'COO, Northstar'],

  ['“The team helped us automate repetitive processes and save hours of manual work every week.”', 'Elliot Reed', 'Director of Operations, Fuse'],

  ['“zenvotech gave us the technology foundation we needed to scale our business with confidence.”', 'Nia Walker', 'CEO, Lumen Labs'],

  ['“They understood our requirements quickly and built a reliable solution that actually solved our business problems.”', 'Arjun Mehta', 'Product Lead, Vantage'],

  ['“zenvotech combined great design with solid engineering to create a web experience our customers genuinely enjoy using.”', 'Iris Laurent', 'Brand Director, Atelier 09'],

  ['“Our new business system brought our operations into one place and made everyday work much more efficient.”', 'Marcus Bell', 'Founder, Kinetic'],

  ['“The most seamless development partnership we have experienced. Fast, professional, and always focused on the solution.”', 'Leah Park', 'CMO, Orbital'],

  ['“Our website and mobile experience are faster, clearer, and performing at a completely different level.”', 'Jonas Berg', 'Head of Digital, Arcline'],
];

const testimonialAvatars: Record<string, string> = {
  'Maya Chen': 'https://randomuser.me/api/portraits/women/44.jpg',
  'Daniel Okafor': 'https://randomuser.me/api/portraits/men/32.jpg',
  'Sofia Martinez': 'https://randomuser.me/api/portraits/women/68.jpg',
  'Elliot Reed': 'https://randomuser.me/api/portraits/men/75.jpg',
  'Nia Walker': 'https://randomuser.me/api/portraits/women/65.jpg',
  'Arjun Mehta': 'https://randomuser.me/api/portraits/men/46.jpg',
  'Iris Laurent': 'https://randomuser.me/api/portraits/women/12.jpg',
};

const faqItems = [
  {
    question: 'What digital services does zenvotech provide?',
    answer: 'We build websites, mobile and web applications, custom software, and workflow automation tailored to your business.',
  },
  {
    question: 'How long does a project take?',
    answer: 'Timing depends on the scope and complexity. After understanding your goals, we’ll share a clear timeline with milestones before work begins.',
  },
  {
    question: 'Can you improve or maintain a product we already have?',
    answer: 'Yes. We can refresh an existing website or app, improve its performance, add features, and provide ongoing support.',
  },
  {
    question: 'Will my website or app work on mobile devices?',
    answer: 'Yes. We design and build responsive experiences for mobile, tablet, and desktop, and test across common screen sizes.',
  },
  {
    question: 'How do we get started?',
    answer: 'Send us a short description of your project through the contact form. We’ll discuss your goals, requirements, and the next steps.',
  },
];

type ReviewCardData = {
  id: string;
  quote: string;
  name: string;
  detail: string;
  rating: number;
  avatar?: string;
  createdAt?: string;
  attributionUrl?: string;
  source?: 'google';
};

type TeamMember = {
  initials: string;
  name: string;
  role: string;
  badge?: string;
  description: string;
  skills: string[];
  image?: string;
  color: string;
};

const team: TeamMember[] = [
  {
    initials: 'AA',
    name: 'Ashfaq',
    role: 'FOUNDER & CEO',
    badge: 'LEADERSHIP',
    description: 'Visionary tech leader directing digital strategy, scalable system design, and brand execution.',
    skills: ['System Design', 'Digital Strategy', 'Tech Lead'],
    image: 'https://i.ibb.co/DHMbJ7Zs/IMG-1396.jpg',
    color: 'from-[#6ca4f3] to-[#1668e8]',
  },
  {
    initials: 'AA',
    name: 'Ashfaq Ahamed',
    role: 'MID-LEVEL FULLSTACK DEVELOPER',
    badge: 'CORE ENG',
    description: 'Architecting end-to-end web platforms with high-throughput cloud backends and responsive UIs.',
    skills: ['Next js', 'Node js', 'APIs', 'TypeScript', 'Python'],
    image: 'https://i.ibb.co/hJ4wzBZ2/IMG-1397.jpg',
    color: 'from-[#6ca4f3] to-[#1668e8]',
  },
  {
    initials: 'JR',
    name: 'Zaid',
    role: 'JUNIOR FULLSTACK DEVELOPER',
    badge: 'CORE ENG',
    description: 'Engineering interactive frontend interfaces, state management, and robust microservices.',
    skills: ['Next js', 'GO', 'APIs', 'TypeScript','Python'],
    image: 'https://i.ibb.co/FqbjQ4bt/Professional-Blue-Suit-Portrait.png',
    color: 'from-[#6ca4f3] to-[#1668e8]',
  },
  {
    initials: 'KS',
    name: 'Firaz',
    role: 'FULLSTACK DEVELOPER',
    badge: 'CORE ENG',
    description: 'Building clean responsive components, QA automation, and seamless user interaction workflows.',
    skills: ['React', 'JavaScript', 'Python & UI', 'Git'],
    image: 'https://i.ibb.co/fYFXDghm/IMG-1398-1.jpg',
    color: 'from-[#6ca4f3] to-[#1668e8]',
  },
];


const techStack = [
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/React.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Veu-JS.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Node.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/CSS.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Spring.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Laravel.png' },
  { name: '', image: 'https://dynessco.com/wp-content/uploads/2025/06/Firebase.png' },
  { name: '', image: 'https://i.ibb.co/zVdG77N7/Gemini-Generated-Image-ijuc4mijuc4mijuc-removebg-preview.png' },
];

function ReviewCard({ review }: { review: ReviewCardData }) {
  return (
    <article className="review-card">
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
            {review.attributionUrl ? (
              <a className="review-card-name review-card-attribution" href={review.attributionUrl} target="_blank" rel="noreferrer">
                {review.name}
              </a>
            ) : (
              <strong className="review-card-name">{review.name}</strong>
            )}
            {review.detail && <span className="review-card-location">{review.detail}</span>}
          </div>
          <div className="review-card-stars" aria-label={`${review.rating} out of 5 stars`}>
            {'★'.repeat(review.rating)}
            <span className="review-card-stars-empty">{'★'.repeat(Math.max(0, 5 - review.rating))}</span>
          </div>
        </div>
      </div>
      {review.quote && <p className="review-card-quote">“{review.quote.replace(/^“|”$/g, '')}”</p>}
      {review.createdAt && (
        <span className="review-card-time">{formatRelativeTime(review.createdAt)}</span>
      )}
      {review.source === 'google' && <span className="review-card-google-attribution">Google review</span>}
    </article>
  );
}

function SiteSplashScreen() {
  return (
    <div className="site-splash" role="status" aria-label="Loading zenvotech">
      <div className="site-splash-brand">
        <span className="site-splash-glow" aria-hidden="true" />
        <img
          className="site-splash-logo"
          src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png"
          alt=""
        />
        <p className="site-splash-name" aria-hidden="true">
          <span>ZENVO</span><span>TECH</span>
        </p>
        <span className="site-splash-line" aria-hidden="true" />
      </div>
    </div>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    const path = window.location.pathname.replace(/\/+$/, '') || '/';
    const isProjectPreview = new URLSearchParams(window.location.search).has('imac-preview');
    return path !== '/admin' && !isProjectPreview;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllAppProjects, setShowAllAppProjects] = useState(false);
  const [showAllDesktopProjects, setShowAllDesktopProjects] = useState(false);
  const [activeWorkTab, setActiveWorkTab] = useState<'web' | 'app' | 'desktop'>('web');
  const [workTabDirection, setWorkTabDirection] = useState<'right' | 'left'>('right');

  const handleWorkTabChange = (nextTab: 'web' | 'app' | 'desktop') => {
    if (nextTab === activeWorkTab) return;
    const tabOrder: Record<'web' | 'app' | 'desktop', number> = { web: 0, app: 1, desktop: 2 };
    setWorkTabDirection(tabOrder[nextTab] > tabOrder[activeWorkTab] ? 'right' : 'left');
    setActiveWorkTab(nextTab);
  };
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showWhatsAppChat, setShowWhatsAppChat] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [contactEmailStatus, setContactEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [latestProjects, setLatestProjects] = useState<AdminProject[]>([]);
  const [clientReviews, setClientReviews] = useState<ClientReview[]>([]);
  const [googleReviews, setGoogleReviews] = useState<GoogleReviewPayload | null>(null);
  const [googleReviewsError, setGoogleReviewsError] = useState('');
  const [contentError, setContentError] = useState('');
  const [callTrackingError, setCallTrackingError] = useState('');
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const projectPreviewFrame = useRef<HTMLIFrameElement>(null);
  const projectPreviewScrollFrame = useRef<number | null>(null);
  const projectPreviewHovered = useRef(false);
  const projectScreenshotRefs = useRef(new Map<string, HTMLImageElement>());
  const projectScreenshotHovered = useRef(new Map<string, boolean>());
  const projectScreenshotScrollFrames = useRef(new Map<string, number>());
  const isProjectPreview = new URLSearchParams(window.location.search).has('imac-preview');
  const isAdminRoute = window.location.pathname.replace(/\/+$/, '') === '/admin';
  const isWhoWeAreRoute = window.location.pathname.replace(/\/+$/, '') === '/who-we-are';
  const normalizedPath = window.location.pathname.replace(/\/+$/, '');
  const isWebsiteDevelopmentRoute =
    normalizedPath === '/services/website-development' ||
    normalizedPath === '/website-development';
  const isMobileAppDevelopmentRoute =
    normalizedPath === '/services/app-development' ||
    normalizedPath === '/services/mobile-app-development' ||
    normalizedPath === '/app-development' ||
    normalizedPath === '/mobile-app-development';
  const isSoftwareDevelopmentRoute =
    normalizedPath === '/services/software-development' ||
    normalizedPath === '/software-development';
  const isAutomationRoute =
    normalizedPath === '/services/automation' ||
    normalizedPath === '/automation';

  useEffect(() => {
    if (isAdminRoute || isProjectPreview) {
      setPageSeo('private');
    } else if (normalizedPath === '/') {
      setPageSeo('home');
    }
  }, [isAdminRoute, isProjectPreview, normalizedPath]);

  useEffect(() => {
    if (!showSplash) return;
    const splashTimeout = window.setTimeout(() => setShowSplash(false), 2600);
    return () => window.clearTimeout(splashTimeout);
  }, [showSplash]);

  useEffect(() => {
    if (showSplash) return;

    if (normalizedPath !== '' && normalizedPath !== '/') {
      setHeroVisible(false);
      return;
    }

    const hero = document.querySelector<HTMLElement>('.site-shell .hero');
    if (!hero) {
      setHeroVisible(false);
      return;
    }

    const updateHeroVisibility = () => {
      const bounds = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isMobileViewport = window.matchMedia('(max-width: 800px)').matches;
      const isVisible = isMobileViewport
        ? bounds.bottom > 0 && bounds.top < viewportHeight
        : bounds.bottom > 0
          && bounds.top < viewportHeight
          && Math.min(bounds.bottom, viewportHeight) - Math.max(bounds.top, 0) >= bounds.height * 0.35;

      setHeroVisible(isVisible);
      if (!isVisible) setShowWhatsAppChat(false);
    };

    updateHeroVisibility();
    window.addEventListener('scroll', updateHeroVisibility, { passive: true });
    window.addEventListener('resize', updateHeroVisibility);
    return () => {
      window.removeEventListener('scroll', updateHeroVisibility);
      window.removeEventListener('resize', updateHeroVisibility);
    };
  }, [normalizedPath, showSplash]);

  useEffect(() => {
    if (
      showSplash ||
      window.location.pathname !== '/' ||
      !['#contact', '#works'].includes(window.location.hash)
    ) return;

    const targetId = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [showSplash]);

  useEffect(() => {
    let previousScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const footerElement = document.querySelector('footer.footer');
      const footerRect = footerElement?.getBoundingClientRect();
      const inFooter = footerRect ? footerRect.top < window.innerHeight - 20 : false;

      setShowScrollTop(currentScrollY > 420 && !inFooter);
      setNavScrolled(currentScrollY > 80);
      setNavVisible(currentScrollY <= 80 || currentScrollY < previousScrollY);
      previousScrollY = currentScrollY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure all videos play smoothly across iOS Safari, Android Chrome, and Desktop
  useEffect(() => {
    const playAllVideos = () => {
      const videos = document.querySelectorAll<HTMLVideoElement>('video');
      videos.forEach((video) => {
        video.muted = true;
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', '');
        if (video.paused) {
          const promise = video.play();
          if (promise !== undefined) {
            promise.catch(() => {
              // Ignore autoplay restrictions until first touch
            });
          }
        }
      });
    };

    playAllVideos();
    const handleUserInteraction = () => {
      playAllVideos();
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };

    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('click', handleUserInteraction, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
    };
  }, [activeWorkTab, showSplash]);

  // Approach icon animations on mobile — add .is-visible when scrolled into view
  useEffect(() => {
    const articles = document.querySelectorAll<HTMLElement>('.approach-grid article');
    if (!articles.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    articles.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showSplash]);

  useEffect(() => {
    if (!menuOpen) return;  
    

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!supabase || isProjectPreview || isAdminRoute) return;
    const client = supabase;
    let active = true;
    const refreshPublishedContent = async () => {
      const [projectResult, reviewResult] = await Promise.all([
        client.from('projects').select('*').order('created_at', { ascending: false }),
        client.from('client_reviews').select('*').order('created_at', { ascending: false }),
      ]);
      const firstError = projectResult.error ?? reviewResult.error;
      if (firstError) throw firstError;
      if (!active) return;
      setLatestProjects(projectResult.data ?? []);
      setClientReviews(reviewResult.data ?? []);
      setContentError('');
    };

    void refreshPublishedContent().catch((caught: unknown) => {
      if (active) setContentError(caught instanceof Error ? caught.message : 'Published content could not be refreshed.');
    });
    const channel = client
      .channel('published-projects-and-reviews')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => {
        void refreshPublishedContent().catch((caught: unknown) => {
          if (active) setContentError(caught instanceof Error ? caught.message : 'Projects could not be refreshed.');
        });
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'client_reviews' }, () => {
        void refreshPublishedContent().catch((caught: unknown) => {
          if (active) setContentError(caught instanceof Error ? caught.message : 'Reviews could not be refreshed.');
        });
      })
      .subscribe();

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, [isProjectPreview, isAdminRoute]);

  useEffect(() => {
    if (!supabase || normalizedPath !== '/' || isProjectPreview || isAdminRoute) return;
    const client = supabase;
    let active = true;

    const loadGoogleReviews = async () => {
      try {
        const { data, error } = await client.functions.invoke<GoogleReviewPayload>('google-reviews');
        if (error) throw error;
        if (!data || !Array.isArray(data.reviews)) {
          throw new Error('Google reviews returned an invalid response.');
        }
        if (active) {
          setGoogleReviews(data);
          setGoogleReviewsError('');
        }
      } catch (caught) {
        if (active) {
          setGoogleReviewsError(caught instanceof Error ? caught.message : 'Google reviews could not be refreshed.');
        }
      }
    };

    void loadGoogleReviews();
    const refreshTimer = window.setInterval(() => void loadGoogleReviews(), 15 * 60 * 1000);
    return () => {
      active = false;
      window.clearInterval(refreshTimer);
    };
  }, [isAdminRoute, isProjectPreview, normalizedPath]);

  if (showSplash) return <SiteSplashScreen />;
  if (isAdminRoute) return <AdminPortal />;
  if (isWhoWeAreRoute) return <WhoWeArePage clientReviews={clientReviews} contentError={contentError} dashboardProjectCount={latestProjects.length} />;
  if (isWebsiteDevelopmentRoute) return <WebsiteDevelopmentPage />;
  if (isMobileAppDevelopmentRoute) return <MobileAppDevelopmentPage />;
  if (isSoftwareDevelopmentRoute) return <SoftwareDevelopmentPage />;
  if (isAutomationRoute) return <AutomationPage />;


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const trackPhoneClick = (clickedNumber: string) => {
    setCallTrackingError('');
    void recordCallClick(clickedNumber).catch((caught: unknown) => {
      console.error('Unable to record call click:', caught);
      setCallTrackingError('We could not record this call click. Please try again.');
    });
    return true;
  };

  const scrollProjectPreview = (toFooter: boolean) => {
    projectPreviewHovered.current = toFooter;
    const previewWindow = projectPreviewFrame.current?.contentWindow;
    if (!previewWindow) return;

    if (projectPreviewScrollFrame.current !== null) {
      window.cancelAnimationFrame(projectPreviewScrollFrame.current);
    }

    const startPosition = previewWindow.scrollY;
    const endPosition = toFooter
      ? Math.max(0, previewWindow.document.documentElement.scrollHeight - previewWindow.innerHeight)
      : 0;
    const startTime = window.performance.now();

    const animateScroll = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / projectHoverScrollDuration, 1);
      previewWindow.scrollTo({
        top: startPosition + (endPosition - startPosition) * progress,
        behavior: 'instant',
      });

      if (progress < 1) {
        projectPreviewScrollFrame.current = window.requestAnimationFrame(animateScroll);
      } else {
        projectPreviewScrollFrame.current = null;
      }
    };

    projectPreviewScrollFrame.current = window.requestAnimationFrame(animateScroll);
  };

  const scrollProjectScreenshot = (projectId: string, toBottom: boolean) => {
    projectScreenshotHovered.current.set(projectId, toBottom);
    const image = projectScreenshotRefs.current.get(projectId);
    const screen = image?.parentElement;
    if (!image || !screen || !image.complete || !image.naturalWidth) return;

    const existingFrame = projectScreenshotScrollFrames.current.get(projectId);
    if (existingFrame !== undefined) {
      window.cancelAnimationFrame(existingFrame);
    }

    const imageBounds = image.getBoundingClientRect();
    const screenBounds = screen.getBoundingClientRect();
    const startPosition = imageBounds.top - screenBounds.top;
    const renderedHeight = screen.clientWidth * image.naturalHeight / image.naturalWidth;
    const scrollDistance = Math.max(0, renderedHeight - screen.clientHeight);
    const endPosition = toBottom ? -scrollDistance : 0;
    const startTime = window.performance.now();

    const animateScroll = (currentTime: number) => {
      const progress = Math.min((currentTime - startTime) / projectHoverScrollDuration, 1);
      const position = startPosition + (endPosition - startPosition) * progress;
      image.style.transform = `translateY(${position}px)`;

      if (progress < 1) {
        projectScreenshotScrollFrames.current.set(projectId, window.requestAnimationFrame(animateScroll));
      } else {
        projectScreenshotScrollFrames.current.delete(projectId);
      }
    };

    projectScreenshotScrollFrames.current.set(projectId, window.requestAnimationFrame(animateScroll));
  };

  const displayProjects: DisplayProject[] = [
    ...latestProjects
      .filter((p) => (!p.project_type || p.project_type === 'web') && p.name.trim().toLowerCase() !== 'serlerion')
      .map((project) => ({
      id: `admin-${project.id}`,
      title: project.name,
      flag: countryFlagCodes[project.country]
        ? `https://flagcdn.com/w40/${countryFlagCodes[project.country]}.png`
        : '',
      mockupImage: imacFrameImage,
      preview: false,
      screenImage: project.image_url,
      url: project.live_url,
      country: project.country,
      createdAt: project.created_at,
      })),
    ...projects.filter((project) => project.title),
  ];

  // Admin-added App projects for the App tab
  const appAdminProjects: MockupProject[] = latestProjects
    .filter((p) => p.project_type === 'app')
    .map((project) => ({
      id: `admin-app-${project.id}`,
      name: project.name,
      country: project.country,
      flag: countryFlagCodes[project.country]
        ? `https://flagcdn.com/w40/${countryFlagCodes[project.country]}.png`
        : project.country === 'Other' ? '' : '',
      screenshot: project.image_url,
      url: project.live_url,
      createdAt: project.created_at,
    }));

  // Admin-added Desktop projects for the Desktop tab
  const desktopAdminProjects: MockupProject[] = latestProjects
    .filter((p) => p.project_type === 'desktop')
    .map((project) => ({
      id: `admin-desktop-${project.id}`,
      name: project.name,
      country: project.country,
      flag: countryFlagCodes[project.country]
        ? `https://flagcdn.com/w40/${countryFlagCodes[project.country]}.png`
        : '',
      screenshot: project.image_url,
      url: project.live_url,
      createdAt: project.created_at,
    }));
  const reviewCards: ReviewCardData[] = [
    ...testimonials.map(([quote, name, detail], index) => {
      // Stagger realistic relative times for static reviews (e.g. 1 week ago, 2 weeks ago, 1 month ago)
      const fakeDaysAgo = [7, 14, 21, 30, 45, 60, 90, 120, 150, 180][index % 10];
      const fakeDate = new Date(Date.now() - fakeDaysAgo * 24 * 60 * 60 * 1000).toISOString();
      return {
        id: `featured-${index}`,
        quote,
        name,
        detail,
        rating: 5,
        avatar: testimonialAvatars[name],
        createdAt: fakeDate,
      };
    }),
    ...clientReviews
      .filter((review) => !review.body.startsWith('__CALL_CLICK__:'))
      .map((review) => ({
        id: review.id,
        quote: review.body,
        name: review.name,
        detail: review.country,
        rating: review.rating,
        createdAt: review.created_at,
      })),
  ];
  const googleReviewCards: ReviewCardData[] = (googleReviews?.reviews ?? []).map((review) => ({
    id: review.id,
    quote: review.text,
    name: review.author.displayName,
    detail: review.relativePublishTimeDescription,
    rating: review.rating,
    avatar: review.author.photoUri ?? undefined,
    createdAt: review.publishTime ?? undefined,
    attributionUrl: review.author.uri ?? undefined,
    source: 'google',
  }));
  const displayedReviewCards = googleReviewCards.length > 0 ? googleReviewCards : reviewCards;
  const reviewRows = [
    displayedReviewCards.filter((_, index) => index % 2 === 0),
    displayedReviewCards.filter((_, index) => index % 2 === 1),
  ];

  return (
    <main className="site-shell">
      <nav className={`nav-wrap${navScrolled ? ' is-scrolled' : ''}${navVisible ? ' is-visible' : ' is-hidden'}`}>
        <a href="/" className={`brand-mark${menuOpen ? ' nav-brand-hidden' : ''}`} aria-label="zenvotech home" onClick={(event) => { event.preventDefault(); window.location.href = '/'; }}>
          <img className="brand-logo" src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png" alt="zenvotech logo" />
          <span className="brand-name">ZENVO<span>TECH</span></span>
        </a>
        <button className={`menu-toggle ${menuOpen ? 'is-open' : ''}`} aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <div className={`nav-links ${menuOpen ? 'is-open' : ''}`}>
          {/* Mobile slide drawer header with Logo + Brand Name on the left, and Close 'X' on the right */}
          <div className="mobile-nav-header">
            <a href="/" className="brand-mark mobile-drawer-brand" onClick={(event) => { event.preventDefault(); setMenuOpen(false); window.location.href = '/'; }}>
              <img className="brand-logo" src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png" alt="zenvotech logo" />
              <span className="brand-name">ZENVO<span>TECH</span></span>
            </a>
            <button
              type="button"
              className="mobile-drawer-close"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          <a href="#top" onClick={() => setMenuOpen(false)}>Home</a>

          <a href="/who-we-are" onClick={() => setMenuOpen(false)}>About</a>

          {/* Services dropdown */}
          <div className={`nav-item-dropdown${mobileServicesOpen ? ' is-mobile-open' : ''}`}>
            <div className="nav-dropdown-trigger-row">
              <a href="#services" className="nav-dropdown-trigger" onClick={() => setMenuOpen(false)}>
                Services
              </a>
              <button
                type="button"
                className="nav-chevron-btn"
                aria-label="Toggle Services submenu"
                aria-expanded={mobileServicesOpen}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setMobileServicesOpen(!mobileServicesOpen);
                }}
              >
                <ChevronDown size={13} className="nav-chevron" />
              </button>
            </div>
            <div className="nav-dropdown-menu nav-dropdown-services">
              {services.map((srv) => {
                const href =
                  srv.title === 'Web development'
                    ? '/services/website-development'
                    : srv.title === 'App development'
                    ? '/services/app-development'
                    : srv.title === 'Software development'
                    ? '/services/software-development'
                    : srv.title === 'Automation'
                    ? '/services/automation'
                    : '#services';
                return (
                  <a
                    key={srv.number}
                    href={href}
                    className="nav-dropdown-link"
                    onClick={() => { setMenuOpen(false); setMobileServicesOpen(false); }}
                  >
                    {srv.title}
                  </a>
                );
              })}
            </div>
          </div>

          <a href="#works" onClick={() => setMenuOpen(false)}>Works</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#contact" className="nav-cta">Book now <ArrowUpRight size={15} /></a>
          <a href="/admin" className="admin-link"><ShieldCheck size={14} /> Admin</a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> Digital technologies · Est. 2026</p>
          <h1>We Bring <span className="hero-text-nowrap">Cutting Edge</span><br /><em>Digital Solutions.</em></h1>
          <p className="hero-intro">Leading Software Development Company — Empowering businesses
with modern scalable solutions.</p>
          <div className="hero-actions"><a className="button button-primary" href="#contact">Call our team <ArrowUpRight size={17} /></a><a className="text-link" href="#works"><span className="play-icon"><Play size={12} fill="currentColor" /></span> See our work</a></div>
        </div>
        <div className="hero-art" aria-label="zenvotech hero  image">
          <div className="hero-image-frame">
            <img
              src="https://i.ibb.co/rfxJbmrB/Chat-GPT-Image-Oct-3-2026-02-54-51-PM-removebg-preview-1.png"
              alt="zenvotech product and digital strategy concept"
            />
          </div>
        </div>
      </section>

      <section className="trust-section">
        <div className="section-pad trust-intro"><h2><span className="trust-title">Trusted by industry leaders.</span><span className="trust-subtitle">Fueling success stories worldwide.</span></h2></div>
        <div className="marquee-window"><div className="marquee-track">{[...brands, ...brands].map((brand, i) => <span key={`${brand}-${i}`} className="brand-logo-item"><img src={brand} alt="" /><b aria-hidden="true">✦</b></span>)}</div></div>
      </section>

      <section className="section-pad approach" id="about">
        <div className="section-heading"><p className="eyebrow">The zenvotech difference</p><h2>Digital solutions for <span> growth</span></h2><p className="section-lede">We turn complex challenges into clear, confident experiences that help modern businesses find their next level.</p></div>
        <div className="approach-grid"><article><span className="number">01</span><img className="approach-icon approach-icon-bounce" src="https://dynessco.com/wp-content/uploads/2024/11/s1-icon-1.svg" alt="" aria-hidden="true" /><h3>Proven technical expertise</h3><p>Deep craft across modern frameworks and platforms, delivering reliable solutions that scale with you.</p></article><article><span className="number">02</span><img className="approach-icon approach-icon-rotate" src="https://dynessco.com/wp-content/uploads/2024/11/s1-icon-2.svg" alt="" aria-hidden="true" /><h3>Client-centric approach</h3><p>We listen, adapt, and collaborate closely so every decision is aligned with your business goals.</p></article><article><span className="number">03</span><img className="approach-icon approach-icon-shake" src="https://dynessco.com/wp-content/uploads/2024/11/s1-icon-3.svg" alt="" aria-hidden="true" /><h3>End-to-end support</h3><p>From first sketch to post-launch, we stay in your corner with guidance and continuous improvement.</p></article></div>
      </section>

      <section className="section-pad team-section" id="team">
        <div className="section-heading compact">
          <p className="eyebrow">Good people, great work</p>
          <h2>Meet the <span>team.</span></h2>
        </div>
        <div className="team-grid">
          {team.map((member) => (
            <article className="person" key={member.name}>
              <div className="person-card-outer">
                <div className={`person-image${member.image ? ' person-image--photo' : ' person-image--placeholder'}`}>
                  {/* Subtle decorative grid/aurora background inside card */}
                  <div className="person-card-bg" />

                  {/* SVG Animated Circular Gauge with dotted gradient dash */}
                  <div className="person-circle-wrapper">
                    <svg className="person-circle-svg" viewBox="0 0 160 160" aria-hidden="true">
                      {/* Base track */}
                      <circle className="circle-track" cx="80" cy="80" r="70" />
                      {/* Animated rotating dotted loading accents */}
                      <circle className="circle-dots-accent" cx="80" cy="80" r="70" />
                      {/* Glowing progress ring that fills on hover */}
                      <circle className="circle-progress" cx="80" cy="80" r="70" />
                    </svg>

                    {/* Circular photo / avatar container with pure white bg and inner shadow */}
                    <div className="person-avatar-circle">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="person-avatar-img"
                          loading="lazy"
                        />
                      ) : (
                        <div className="person-initials-slot">
                          <span className="person-initials-text">{member.initials}</span>
                          <span className="person-space-hint">Add Photo</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Badges / tag */}
                  {member.badge && (
                    <span className="person-badge">{member.badge}</span>
                  )}

                  {/* Hover Floating Quick-Skill Pill Strip */}
                  <div className="person-hover-card">
                    <p className="person-hover-desc">{member.description}</p>
                    <div className="person-skill-tags">
                      {member.skills.map((skill) => (
                        <span key={skill} className="skill-chip">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Person Meta Footer */}
                <div className="person-meta">
                  <div className="person-meta-content">
                    <div className="person-headline">
                      <h3>{member.name}</h3>
                      <ArrowUpRight size={17} className="person-arrow" />
                    </div>
                    <p className="person-role">{member.role}</p>
                    <p className="person-brief-desc">{member.description}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="tech-section" id="services"><div className="section-pad"><div className="section-heading tech-heading"><p className="eyebrow">Our toolkit</p><h2>Modern technologies<br /><span>we use.</span></h2><p className="section-lede">The right tools for the right job. Always thoughtfully chosen, never just for show.</p></div><div className="tech-grid">{techStack.map((tech, index) => <div className="tech-card" key={tech.image}><img src={tech.image} alt={tech.name || (index === techStack.length - 1 ? 'Next.js' : 'Technology logo')} className={`tech-logo${index === techStack.length - 1 ? ' tech-logo-next' : ''}`} /><strong>{tech.name}</strong></div>)}</div></div></section>

      <section className="section-pad services-section"><div className="section-heading services-heading"><div><p className="eyebrow">What we do</p><h2>Our <span>services.</span></h2></div><p className="section-lede">We provide comprehensive digital solutions to help your business grow and succeed.</p></div><div className="service-list">{services.map(({ number, title, text, icon: Icon }) => { const href = title === 'Web development' ? '/services/website-development' : title === 'App development' ? '/services/app-development' : title === 'Software development' ? '/services/software-development' : title === 'Automation' ? '/services/automation' : '#services'; return <a href={href} className="service-row-link" key={title}><article className="service-row"><span className="service-number">{number}</span><Icon size={27} strokeWidth={1.5} /><div className="service-content"><h3>{title}</h3><p>{text}</p></div><ArrowUpRight className="service-arrow" size={23} /></article></a>; })}</div></section>

      {!isProjectPreview && (
        <section className="section-pad works-section" id="works">
          <div className="section-heading services-heading">
            <div><p className="eyebrow">Selected work</p><h2>What we have <span>done.</span></h2></div>
            <p className="section-lede">Explore our latest creations — from smart apps to powerful business platforms.</p>
          </div>

          {/* Left-aligned options: Web / App / Desktop */}
          <div className="works-tabs-row">
            <div className="works-tabs-pill-box" role="tablist" aria-label="Project categories">
              <button
                type="button"
                role="tab"
                aria-selected={activeWorkTab === 'web'}
                className={`works-tab-item ${activeWorkTab === 'web' ? 'active' : ''}`}
                onClick={() => handleWorkTabChange('web')}
              >
                <Globe2 size={15} />
                <span>Web</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeWorkTab === 'app'}
                className={`works-tab-item ${activeWorkTab === 'app' ? 'active' : ''}`}
                onClick={() => handleWorkTabChange('app')}
              >
                <Smartphone size={15} />
                <span>App</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeWorkTab === 'desktop'}
                className={`works-tab-item ${activeWorkTab === 'desktop' ? 'active' : ''}`}
                onClick={() => handleWorkTabChange('desktop')}
              >
                <Monitor size={15} />
                <span>Desktop</span>
              </button>
            </div>
          </div>

          {contentError && <p className="published-content-error" role="status">Live projects could not be refreshed: {contentError}</p>}

          <div className="works-tab-content-wrapper">
            {activeWorkTab === 'web' && (
              <div
                key="tab-web"
                className={`works-pane-animated ${workTabDirection === 'right' ? 'works-slide-right-enter' : 'works-slide-left-enter'}`}
              >
                <div className="project-grid" id="works-project-grid">
                  {displayProjects.slice(0, showAllProjects ? displayProjects.length : 9).map((project, index) => {
                    const isRecent = project.createdAt && Date.now() - new Date(project.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
                    return (
                      <article className={`project-card imac-project${index >= 9 ? ' project-card-enter' : ''}`} key={project.id}>
                        <div
                          className="project-visual"
                          onMouseEnter={() => project.preview ? scrollProjectPreview(true) : project.screenImage ? scrollProjectScreenshot(project.id, true) : undefined}
                          onMouseLeave={() => project.preview ? scrollProjectPreview(false) : project.screenImage ? scrollProjectScreenshot(project.id, false) : undefined}
                        >
                          <div className="imac-screen">
                            {project.preview ? (
                              <>
                                <iframe ref={projectPreviewFrame} src="/?imac-preview" title="Full zenvotech website preview" tabIndex={-1} />
                                <span className="imac-screen-overlay" />
                              </>
                            ) : project.screenImage ? (
                              <img
                                ref={(image) => {
                                  if (image) projectScreenshotRefs.current.set(project.id, image);
                                  else projectScreenshotRefs.current.delete(project.id);
                                }}
                                className="imac-screen-image"
                                src={project.screenImage}
                                alt={`${project.title} website screenshot`}
                                onLoad={() => {
                                  if (projectScreenshotHovered.current.get(project.id)) scrollProjectScreenshot(project.id, true);
                                }}
                              />
                            ) : null}
                            {project.createdAt && (
                              <div className="project-screen-meta">
                                {isRecent && <span className="project-screen-recent">Recent</span>}
                                <span className="project-screen-time">Added {formatRelativeTime(project.createdAt)}</span>
                              </div>
                            )}
                          </div>
                          <img className="imac-frame" src={project.mockupImage} alt={project.preview ? 'zenvotech website inside an iMac mockup' : 'iMac project mockup'} />
                        </div>
                        {project.title && (
                          <div className="project-meta">
                            <div className="project-name-link">
                              {project.flag && <img src={project.flag} alt={project.country ? `${project.country} flag` : ''} />}
                              {project.preview ? (
                                <a href="/?imac-preview" target="_blank" rel="noreferrer"><h3>{project.title}</h3></a>
                              ) : project.url ? (
                                <a href={project.url} target="_blank" rel="noreferrer"><h3>{project.title}</h3></a>
                              ) : <h3>{project.title}</h3>}
                            </div>
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
                {!showAllProjects && displayProjects.length > 9 && (
                  <button type="button" className="show-more-projects" aria-expanded={showAllProjects} aria-controls="works-project-grid" onClick={() => setShowAllProjects(true)}>Show More</button>
                )}
                <a className="view-more-projects" href="/services/website-development#portfolio">SEE MORE</a>
              </div>
            )}

            {activeWorkTab === 'app' && (
              <div
                key="tab-app"
                className={`works-pane-animated ${workTabDirection === 'right' ? 'works-slide-right-enter' : 'works-slide-left-enter'}`}
              >
                {(() => {
                  const allApps = [...appProjects, ...appAdminProjects];
                  const visibleApps = showAllAppProjects ? allApps : allApps.slice(0, 3);
                  return (
                    <>
                      <div className="works-three-grid" id="works-app-grid">
                        {visibleApps.map((project, index) => {
                          const isRecent = project.createdAt && Date.now() - new Date(project.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
                          return (
                            <div key={project.id} className={`project-card relative${index >= 3 ? ' project-card-enter' : ''}`}>
                              <div className={`iphone-mockup iphone-mockup--portfolio${project.video ? ' iphone-mockup--video' : ''}`}>
                                <div className="iphone-screen">
                                  <div className="dynamic-island"></div>
                                  <div className="screen-content">
                                    {project.video ? (
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
                                        className="project-preview-video"
                                      />
                                    ) : (
                                      <img
                                        src={project.screenshot}
                                        alt={project.name}
                                      />
                                    )}
                                  </div>
                                  <div className="home-indicator"></div>
                                </div>
                              </div>

                              <div className="project-meta text-center justify-center mt-6">
                                {project.createdAt && (
                                  <div className="project-screen-meta" style={{ justifyContent: 'center', marginBottom: '6px' }}>
                                    {isRecent && <span className="project-screen-recent">Recent</span>}
                                    <span className="project-screen-time">Added {formatRelativeTime(project.createdAt)}</span>
                                  </div>
                                )}
                                <div className="project-name-link justify-center">
                                  {project.flag && (
                                    <img
                                      src={project.flag}
                                      alt={project.country}
                                      className="w-6 h-4 rounded-sm"
                                    />
                                  )}
                                  {project.url ? (
                                    <a href={project.url}>
                                      <h3 className="text-xl font-semibold">{project.name}</h3>
                                    </a>
                                  ) : (
                                    <h3 className="text-xl font-semibold">{project.name}</h3>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {!showAllAppProjects && allApps.length > 3 && (
                        <button type="button" className="show-more-projects" aria-expanded={showAllAppProjects} aria-controls="works-app-grid" onClick={() => setShowAllAppProjects(true)}>Show More</button>
                      )}
                      <a className="view-more-projects" href="/services/app-development#portfolio">SEE MORE</a>
                    </>
                  );
                })()}
              </div>
            )}

            {activeWorkTab === 'desktop' && (
              <div
                key="tab-desktop"
                className={`works-pane-animated ${workTabDirection === 'right' ? 'works-slide-right-enter' : 'works-slide-left-enter'}`}
              >
                {(() => {
                  const allDesktops = [...desktopAdminProjects, ...desktopProjects];
                  const visibleDesktops = showAllDesktopProjects ? allDesktops : allDesktops.slice(0, 6);
                  return (
                    <>
                      <div className="works-three-grid" id="works-desktop-grid">
                        {visibleDesktops.map((project, index) => {
                          const isRecent = project.createdAt && Date.now() - new Date(project.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000;
                          return (
                            <div key={project.id} className={`project-card relative${index >= 6 ? ' project-card-enter' : ''}`}>
                              <div className="desktop-mockup-wrap">
                                <div className="desktop-screen-area">
                                  {project.video ? (
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
                                  ) : (
                                    <img
                                      src={project.screenshot}
                                      alt={project.name}
                                    />
                                  )}
                                </div>
                                <img
                                  src="https://i.ibb.co/0j5HqYt4/Transparent-i-Mac-Style-Monitor-Mockup-1-removebg-preview-1.png"
                                  alt="Desktop Monitor Mockup"
                                  className="desktop-frame-overlay"
                                />
                              </div>

                              <div className="project-meta text-center justify-center mt-6">
                                {project.createdAt && (
                                  <div className="project-screen-meta" style={{ justifyContent: 'center', marginBottom: '6px' }}>
                                    {isRecent && <span className="project-screen-recent">Recent</span>}
                                    <span className="project-screen-time">Added {formatRelativeTime(project.createdAt)}</span>
                                  </div>
                                )}
                                <div className="project-name-link justify-center">
                                  {project.flag && (
                                    <img
                                      src={project.flag}
                                      alt={project.country}
                                      className="w-6 h-4 rounded-sm"
                                    />
                                  )}
                                  {project.url ? (
                                    <a href={project.url}>
                                      <h3 className="text-xl font-semibold">{project.name}</h3>
                                    </a>
                                  ) : (
                                    <h3 className="text-xl font-semibold">{project.name}</h3>
                                  )}
                                </div>
                                {project.category && (
                                  <span className="mt-1 block text-sm font-semibold text-[#1668e8]">
                                    {project.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {!showAllDesktopProjects && allDesktops.length > 6 && (
                        <button type="button" className="show-more-projects" aria-expanded={showAllDesktopProjects} aria-controls="works-desktop-grid" onClick={() => setShowAllDesktopProjects(true)}>Show More</button>
                      )}
                      <a className="view-more-projects" href="/services/software-development#portfolio">SEE MORE</a>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="reviews-section">
        <div className="section-pad reviews-header">
          <div><p className="eyebrow">Kind words</p><h2>Good work has <span>good echoes.</span></h2></div>
          <div className="google-rating">
            <div className="google-g">G</div>
            <div>
              {googleReviews?.rating !== null && googleReviews?.rating !== undefined ? (
                <strong>{googleReviews.rating.toFixed(1)} <span>{'★'.repeat(Math.round(googleReviews.rating))}</span></strong>
              ) : (
                <strong>Google rating</strong>
              )}
              <p>
                {googleReviews
                  ? `Based on ${(googleReviews.userRatingCount ?? 0).toLocaleString()} Google reviews`
                  : googleReviewsError
                    ? 'Google rating temporarily unavailable'
                    : 'Loading live Google rating…'}
              </p>
            </div>
            <button className="public-review-button" type="button" onClick={() => setShowReviewForm(true)}><Plus size={14} /> Add a review</button>
          </div>
        </div>
        {contentError && <p className="published-content-error section-pad" role="status">Live reviews could not be refreshed: {contentError}</p>}
        {googleReviewsError && <p className="published-content-error section-pad" role="status">Live Google reviews could not be refreshed: {googleReviewsError}. Showing other client testimonials instead.</p>}
        <div className="reviews-rows" aria-label="Client reviews">
          {reviewRows.map((row, rowIndex) => (
            <div className="reviews-row-window" key={`review-row-${rowIndex}`}>
              <div className={`reviews-row-track${rowIndex % 2 === 1 ? ' reviews-row-track--reverse' : ''}`}>
                {[0, 1].map((copy) => (
                  <div className="reviews-row-group" key={`review-group-${copy}`}>
                    {row.map((review) => <ReviewCard review={review} key={`${review.id}-${copy}`} />)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq-section section-pad" aria-labelledby="faq-title">
        <div className="faq-heading">
          <p className="eyebrow">Frequently asked questions</p>
          <h2 id="faq-title">Your questions, <span>answered.</span></h2>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <article className={`faq-item${isOpen ? ' is-open' : ''}`} key={item.question}>
                <button
                  className="faq-question"
                  type="button"
                  id={`faq-question-${index}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="faq-toggle-icon" aria-hidden="true"><i /><i /></span>
                </button>
                <div
                  className="faq-answer"
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  aria-hidden={!isOpen}
                >
                  <div className="faq-answer-inner"><p>{item.answer}</p></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

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
          aria-label="Open featured project in a new tab"
        >
          <span className="faq-orbit-halo" aria-hidden="true" />
          <span className="faq-orbit-ring" aria-hidden="true" />
          <svg className="faq-orbit-text" viewBox="0 0 180 180" aria-hidden="true">
            <defs>
              <path id="home-orbit-text-path" d="M 90,90 m -69,0 a 69,69 0 1,1 138,0 a 69,69 0 1,1 -138,0" />
            </defs>
            <text>
              <textPath href="#home-orbit-text-path">zenvotech • </textPath>
            </text>
          </svg>
          <span className="faq-orbit-inner" aria-hidden="true">
            <ArrowUpRight size={27} strokeWidth={1.8} />
          </span>
        </a>
      </section>

      <section className="contact-section section-pad" id="contact">
        <div className="contact-copy">
          <p className="eyebrow">Have a good idea?</p>
          <h2>Get In Touch <span>With Us Today.</span></h2>
          <p>Have a project in mind or a question? Reach out to us for expert solutions and start building your next digital product.</p>
          <div className="contact-phone-list" aria-label="Call our team">
            <a href="tel:+94752454335" onClick={(event) => { if (!trackPhoneClick('0752454335')) event.preventDefault(); }}>0752454335</a>
            <a href="tel:+94773991281" onClick={(event) => { if (!trackPhoneClick('0773991281')) event.preventDefault(); }}>0773991281</a>
            <a href="tel:+94717369661" onClick={(event) => { if (!trackPhoneClick('0717369661')) event.preventDefault(); }}>0717369661</a>
            <a href="tel:+94774241122" onClick={(event) => { if (!trackPhoneClick('0774241122')) event.preventDefault(); }}>0774241122</a>
          </div>
          {callTrackingError && <p className="contact-phone-error" role="alert">{callTrackingError}</p>}
          <div className="contact-services" aria-label="Our services">
            {['Website Development', 'App Development', 'Software Development', 'Automation'].map((service) => (
              <span className="contact-service" key={service}>{service}</span>
            ))}
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            if (!serviceId || !templateId || !publicKey) {
              setContactEmailStatus('error');
              return;
            }

            const formData = new FormData(form);
            setContactEmailStatus('sending');
            try {
              await emailjs.send(serviceId, templateId, {
                to_email: 'zenvoratechnologies085@gmail.com',
                from_name: String(formData.get('name') ?? ''),
                reply_to: String(formData.get('email') ?? ''),
                message: String(formData.get('message') ?? ''),
              }, { publicKey });
              form.reset();
              setContactEmailStatus('sent');
            } catch (caught) {
              console.error('Unable to send contact form email:', caught);
              setContactEmailStatus('error');
            }
          }}
        >
          <div className="contact-form-fields">
            <input name="name" type="text" placeholder="Full Name" aria-label="Full name" autoComplete="name" required />
            <input name="email" type="email" placeholder="Email Address" aria-label="Email address" autoComplete="email" required />
          </div>
          <textarea name="message" placeholder="Your Message" aria-label="Your message" rows={5} required />
          <button className="button button-primary" type="submit" disabled={contactEmailStatus === 'sending'}>
            {contactEmailStatus === 'sending' ? 'Sending…' : 'Send'}
          </button>
          {contactEmailStatus === 'sent' && <p className="contact-form-feedback is-success" role="status">Your message was sent. We’ll be in touch soon.</p>}
          {contactEmailStatus === 'error' && (
            <p className="contact-form-feedback is-error" role="alert">
              {import.meta.env.VITE_EMAILJS_SERVICE_ID && import.meta.env.VITE_EMAILJS_TEMPLATE_ID && import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                ? 'We could not send your message. Please try again later.'
                : 'Email is not configured yet. Please contact us at zenvoratechnologies085@gmail.com.'}
            </p>
          )}
        </form>
      </section>

      <HomeFooter onWhatsAppClick={() => setShowWhatsAppChat((isOpen) => !isOpen)} />
      {!isProjectPreview && (
        <div className={`home-whatsapp-widget${heroVisible ? ' is-hero-visible' : ''}`}>
          {showWhatsAppChat && (
            <section className="home-whatsapp-panel" aria-label="WhatsApp chat">
              <div className="home-whatsapp-panel-header">
                <img src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png" alt="zenvotech logo" />
                <div>
                  <strong>Chat with zenvotech</strong>
                  <span>We’re here to help</span>
                </div>
                <button
                  type="button"
                  className="home-whatsapp-close"
                  aria-label="Close WhatsApp chat"
                  onClick={() => setShowWhatsAppChat(false)}
                >
                  <X size={18} />
                </button>
              </div>
              <p>Hi! Have a project or question? Message our team on WhatsApp.</p>
              <a href="https://wa.me/742363574" target="_blank" rel="noopener noreferrer">
                Continue to WhatsApp <ArrowUpRight size={16} />
              </a>
            </section>
          )}
          <button
            type="button"
            className="home-whatsapp-trigger mobile-only-trigger"
            aria-label={showWhatsAppChat ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
            aria-expanded={showWhatsAppChat}
            onClick={() => setShowWhatsAppChat((isOpen) => !isOpen)}
          >
            <img className="home-whatsapp-trigger-brand" src="https://i.ibb.co/GQmp6ZZs/Screenshot-2026-10-03-124656-removebg-preview-1.png" alt="" />
            <img className="home-whatsapp-trigger-badge" src="https://i.ibb.co/ynxfn27n/images-8-removebg-preview.png" alt="" />
          </button>
        </div>
      )}
      {showScrollTop && !isProjectPreview && (
        <button type="button" className="scroll-top-button" aria-label="Scroll to top" onClick={scrollToTop}>
          <ArrowUpRight size={18} />
        </button>
      )}
      {showReviewForm && <ClientReviewForm onClose={() => setShowReviewForm(false)} />}
    </main>
  );
}

export default App;
