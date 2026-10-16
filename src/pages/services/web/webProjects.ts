import type { ProjectDetails } from '../shared/types';

export type WebProject = {
  title: string;
  country: string;
  flagUrl: string;
  image: { src: string; width: number; height: number };
  liveUrl?: string;
  details?: ProjectDetails;
};

const emojiFlag = (codepoints: string) => `https://s.w.org/images/core/emoji/16.0.1/svg/${codepoints}.svg`;
const flags = {
  us: emojiFlag('1f1fa-1f1f8'),
  au: emojiFlag('1f1e6-1f1fa'),
  it: emojiFlag('1f1ee-1f1f9'),
  lk: emojiFlag('1f1f1-1f1f0'),
  kr: emojiFlag('1f1f0-1f1f7'),
  gb: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1280px-Flag_of_the_United_Kingdom_%281-2%29.svg.png',
};

const shot = (slug: string, width: number, height: number) => ({ src: `/media/web/projects/${slug}.webp`, width, height });

// PI! NEED DATA: year, industry and one-line result per project (fills `details`)
export const webProjects: readonly WebProject[] = [
  { title: 'Bake It With Love', country: 'United States', flagUrl: flags.us, image: shot('bake-it-with-love', 110, 640), liveUrl: 'https://bakeitwithlove.com' },
  { title: 'Bingo Dot Com', country: 'Australia', flagUrl: flags.au, image: shot('bingo-dot-com', 198, 640), liveUrl: 'https://bingodotcom.com/' },
  { title: 'Olunid', country: 'Italy', flagUrl: flags.it, image: shot('olunid', 135, 640), liveUrl: 'https://olunid.com' },
  { title: 'Bake With Love', country: 'Sri Lanka', flagUrl: flags.lk, image: shot('bake-with-love', 142, 640), liveUrl: 'https://bakewithaysha.netlify.app/' },
  // PI! NEED DATA: RentifyHub live URL (old link pointed to bakeitwithlove.com)
  { title: 'RentifyHub', country: 'Sri Lanka', flagUrl: flags.lk, image: shot('rentifyhub', 218, 640) },
  { title: 'ALEX WIDES', country: 'Italy', flagUrl: flags.it, image: shot('alex-wides', 153, 640), liveUrl: 'https://www.alexwides.com/' },
  { title: 'Linkwin Edu', country: 'South Korea', flagUrl: flags.kr, image: shot('linkwin-edu', 101, 640), liveUrl: 'https://linkwinedu.com/' },
  { title: 'Botanicare', country: 'United States', flagUrl: flags.us, image: shot('botanicare', 640, 302), liveUrl: 'https://www.botanicare.com/' },
  { title: 'Novuct Digital LLC', country: 'United States', flagUrl: flags.us, image: shot('novuct', 118, 640), liveUrl: 'https://novuct.com/' },
  // PI! NEED DATA: confirm The Lotus House country (.lk domain, listed as Italy)
  { title: 'The Lotus House', country: 'Italy', flagUrl: flags.it, image: shot('lotus-house', 116, 640), liveUrl: 'https://thelotushouse.lk/' },
  { title: 'Prevaix Digital LLC', country: 'United States', flagUrl: flags.us, image: shot('prevaix', 89, 640), liveUrl: 'https://prevaix.com/' },
  { title: 'GOLS\'S GYM', country: 'Sri Lanka', flagUrl: flags.lk, image: shot('goals-gym', 232, 640), liveUrl: 'https://goalgym.netlify.app/' },
  { title: 'For Sale By Owner', country: 'United States', flagUrl: flags.us, image: shot('for-sale-by-owner', 163, 640), liveUrl: 'https://www.forsalebyowner.com/' },
  { title: 'EcoNest', country: 'Sri Lanka', flagUrl: flags.lk, image: shot('econest', 166, 640), liveUrl: 'https://econestniflacrafts.netlify.app/' },
  { title: 'Homyz (pvt) Ltd', country: 'Australia', flagUrl: flags.au, image: shot('homyz', 274, 640), liveUrl: 'https://real-estate-web.pages.dev/#contact-us' },
  { title: 'Dart Srilanka', country: 'Sri Lanka', flagUrl: flags.lk, image: shot('dart-sri-lanka', 264, 1280), liveUrl: 'https://dartsrilanka.netlify.app/' },
  { title: 'Bloodline Tattoo Bali', country: 'Australia', flagUrl: flags.au, image: shot('bloodline-tattoo', 139, 640), liveUrl: 'https://bloodlinetattoobali.com/' },
  { title: 'KTM London', country: 'United Kingdom', flagUrl: flags.gb, image: shot('ktm-london', 214, 640), liveUrl: 'https://ktmlondonuk.co.uk/' },
  { title: 'Anthika Saloon pvt Ltd', country: 'Sri Lanka', flagUrl: flags.lk, image: shot('anthika-saloon', 134, 640), liveUrl: 'https://anthiaslk.com/' },
];
