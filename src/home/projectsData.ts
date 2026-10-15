import { SITE } from '@/config/site';
import type { AdminProject } from '../admin/supabase';
import { mobileAppProjects } from '../mobileAppProjects';
import { portfolioVideos } from './media';
import type { VideoAsset } from './media';

export type ScreenImage = { src: string; width?: number; height?: number };
export type VideoSource = Partial<VideoAsset> & { src: string };

export type WebProject = {
  id: string;
  title: string;
  flag: string;
  screen?: ScreenImage;
  url?: string;
  country?: string;
  createdAt?: string;
};

export type MockupProject = {
  id: string;
  name: string;
  country: string;
  flag: string;
  screenshot?: string;
  video?: VideoSource;
  category?: string;
  url?: string;
  createdAt?: string;
};

const lkFlag = 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1f1-1f1f0.svg';
const itFlag = 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1ee-1f1f9.svg';
const auFlag = 'https://s.w.org/images/core/emoji/16.0.1/svg/1f1e6-1f1fa.svg';
const shot = (name: string, width: number, height: number): ScreenImage => ({ src: `/media/home/shot-${name}.webp`, width, height });

// PI! NEED DATA: year, client industry and measurable result per portfolio project
export const webProjects: readonly WebProject[] = [
  { id: 'zenvora', title: SITE.name, flag: lkFlag, screen: shot('zenvotech', 480, 1234) },
  { id: 'sweetladyjane', title: 'Sweetladyjane', flag: lkFlag, screen: shot('sweetladyjane', 201, 640), url: 'https://sweetladyjane.com/' },
  { id: 'olunid', title: 'Olunid', flag: itFlag, screen: shot('olunid', 622, 640), url: 'https://olunid.com/' },
  { id: 'alexwides', title: 'Alex Wides', flag: itFlag, screen: shot('alexwides', 159, 640), url: 'https://www.alexwides.com/' },
  { id: 'mydreamcar', title: 'Mydreamcar', flag: lkFlag, screen: shot('mydreamcar', 124, 638), url: 'https://www.mydreamcar.lk/' },
  { id: 'bloodlinetattoobali', title: 'Bloodlinetattoobali', flag: auFlag, screen: shot('bloodlinetattoobali', 265, 640), url: 'https://www.bloodlinetattoobali.com/' },
];

// PI! NEED DATA: case study or live URL for each desktop project
export const desktopProjects: readonly MockupProject[] = [
  { id: 'desk-zenvora-erp', name: 'Alixer Perfume ERP', country: 'United Arab Emirates', flag: 'https://flagcdn.com/w40/ae.png', video: portfolioVideos.alixerErp, category: 'Software' },
  { id: 'desk-omniflow', name: 'Football Jersey CRM', country: 'Sri Lanka', flag: 'https://flagcdn.com/w40/lk.png', video: portfolioVideos.premioCrm, category: 'Software' },
  { id: 'desk-tradepulse', name: 'Jersey Inventory', country: 'Sri Lanka', flag: 'https://flagcdn.com/w40/lk.png', video: portfolioVideos.permioInventory, category: 'Software' },
];

// Self-hosted copies with posters; the source list still imports the src/ mp4 for other pages.
const appVideoOverrides: Record<string, VideoAsset> = { MyFitnessCoach: portfolioVideos.myFitnessCoach };

export const appProjects: readonly MockupProject[] = mobileAppProjects.map((project) => ({
  ...project,
  video: appVideoOverrides[project.id] ?? (project.videoSrc ? { src: project.videoSrc } : undefined),
}));

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

function flagFor(country: string): string {
  const code = countryFlagCodes[country];
  return code ? `https://flagcdn.com/w40/${code}.png` : '';
}

export function toWebProjects(projects: readonly AdminProject[]): WebProject[] {
  return projects
    .filter((p) => (!p.project_type || p.project_type === 'web') && p.name.trim().toLowerCase() !== 'serlerion')
    .map((project) => ({
      id: `admin-${project.id}`,
      title: project.name,
      flag: flagFor(project.country),
      screen: { src: project.image_url, width: project.image_width ?? undefined, height: project.image_height ?? undefined },
      url: project.live_url,
      country: project.country,
      createdAt: project.created_at,
    }));
}

export function toMockupProjects(projects: readonly AdminProject[], type: 'app' | 'desktop'): MockupProject[] {
  return projects
    .filter((p) => p.project_type === type)
    .map((project) => ({
      id: `admin-${type}-${project.id}`,
      name: project.name,
      country: project.country,
      flag: flagFor(project.country),
      screenshot: project.image_url,
      url: project.live_url,
      createdAt: project.created_at,
    }));
}

const weekMs = 7 * 24 * 60 * 60 * 1000;

export function isRecent(createdAt?: string): boolean {
  return Boolean(createdAt) && Date.now() - new Date(createdAt ?? '').getTime() < weekMs;
}
