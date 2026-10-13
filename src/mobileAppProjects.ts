import myFitnessCoachVideo from './myfitnesscoach-preview.mp4';

export interface MobileAppProject {
  id: string;
  name: string;
  screenshot: string;
  videoSrc?: string;
  flag: string;
  country: string;
  url?: string;
}

export const mobileAppProjects: MobileAppProject[] = [
  {
    id: 'food-delivery',
    name: 'Food Delivery App',
    screenshot: 'https://image2url.com/r2/default/gifs/1775078415863-f6c0e957-3ef4-4761-acbb-eeb62c7a5e4b.gif',
    flag: 'https://flagcdn.com/w40/us.png',
    country: 'United States',
    url: '/#contact',
  },
  {
    id: 'card-clash',
    name: 'Card Clash Game',
    screenshot: 'https://image2url.com/r2/default/gifs/1775154868843-cc20451d-0491-4d4f-b50e-7c65168181a0.gif',
    flag: 'https://flagcdn.com/w40/us.png',
    country: 'United States',
    url: '/#contact',
  },
  {
    id: 'MyFitnessCoach',
    name: 'My Fitness Coach App',
    screenshot: 'https://image2url.com/r2/default/gifs/1775156111893-af4417f3-41d7-4d87-b5f2-acdb60c0334b.gif',
    videoSrc: myFitnessCoachVideo,
    flag: 'https://flagcdn.com/w40/us.png',
    country: 'United States',
    url: 'https://apps.apple.com/lk/app/myfitnesscoach-fitness-app/id1670136195',
  },
];
