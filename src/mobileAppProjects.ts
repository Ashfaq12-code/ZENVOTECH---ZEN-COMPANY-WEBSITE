import type { ProjectDetails } from './pages/services/shared/types';

export interface MobileAppProject {
  id: string;
  name: string;
  /** Poster frame (WebP); shown before the video loads and under reduced motion. */
  screenshot: string;
  size: { width: number; height: number };
  videoSrc?: string;
  videoWebm?: string;
  flag: string;
  country: string;
  url?: string;
  details?: ProjectDetails;
}

const media = '/media/app/projects';

// PI! NEED DATA: year, platform (iOS/Android), client industry and outcome per app (`details`)
export const mobileAppProjects: MobileAppProject[] = [
  {
    id: 'food-delivery',
    name: 'Food Delivery App',
    screenshot: `${media}/food-delivery-poster.webp`,
    size: { width: 400, height: 690 },
    videoSrc: `${media}/food-delivery.mp4`,
    videoWebm: `${media}/food-delivery.webm`,
    flag: 'https://flagcdn.com/w40/us.png',
    country: 'United States',
    // PI! NEED DATA: App Store / Play Store or case-study URL for Food Delivery App
  },
  {
    id: 'card-clash',
    name: 'Card Clash Game',
    screenshot: `${media}/card-clash-poster.webp`,
    size: { width: 400, height: 692 },
    videoSrc: `${media}/card-clash.mp4`,
    videoWebm: `${media}/card-clash.webm`,
    flag: 'https://flagcdn.com/w40/us.png',
    country: 'United States',
    // PI! NEED DATA: App Store / Play Store or case-study URL for Card Clash Game
  },
  {
    id: 'MyFitnessCoach',
    name: 'My Fitness Coach App',
    screenshot: `${media}/myfitnesscoach-poster.webp`,
    size: { width: 634, height: 1148 },
    videoSrc: '/media/home/myfitnesscoach-preview.mp4',
    flag: 'https://flagcdn.com/w40/us.png',
    country: 'United States',
    url: 'https://apps.apple.com/lk/app/myfitnesscoach-fitness-app/id1670136195',
  },
];
