export type ServiceFaq = {
  question: string;
  answer: string;
  points?: readonly string[];
};

// Optional facts per portfolio item; render only what the owner has confirmed.
export type ProjectDetails = {
  year?: number;
  industry?: string;
  outcome?: string;
  platforms?: readonly ('iOS' | 'Android' | 'Web')[];
};

export type TechLogo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Fixed logo height; omit to let the page CSS size it. */
  heightClass?: 'h-12' | 'h-14';
  logoOnly?: boolean;
};

export type PortfolioImage = {
  src: string;
  alt: string;
  className: string;
  width?: number;
  height?: number;
};

// Desktop-frame portfolio entry; year, industry and outcome render only when the owner confirmed them.
export type PortfolioCard = ProjectDetails & {
  id: string;
  name: string;
  country?: string;
  flag?: string;
  video?: string;
  poster?: string;
  image?: PortfolioImage;
  category?: string;
  link?: { href: string; label: string };
};
