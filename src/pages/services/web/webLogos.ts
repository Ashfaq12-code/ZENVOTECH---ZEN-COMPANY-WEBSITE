import type { TechLogo } from '../shared/types';

const dyness = (file: string) => `https://dynessco.com/wp-content/uploads/2025/06/${file}`;

// PI! NEED DATA: confirm license or replace dynessco.com logo images
export const webLogos: readonly TechLogo[] = [
  { src: dyness('React.png'), alt: 'React', width: 152, height: 40, heightClass: 'h-14' },
  { src: dyness('Veu-JS.png'), alt: 'Vue.js', width: 152, height: 40, heightClass: 'h-12', logoOnly: true },
  { src: dyness('Node.png'), alt: 'Node.js', width: 152, height: 40, heightClass: 'h-14' },
  { src: dyness('CSS.png'), alt: 'CSS3', width: 152, height: 40, heightClass: 'h-12' },
  { src: dyness('Spring.png'), alt: 'Spring', width: 152, height: 40, heightClass: 'h-14' },
  { src: dyness('Laravel.png'), alt: 'Laravel', width: 152, height: 40, heightClass: 'h-12' },
  { src: dyness('Firebase.png'), alt: 'Firebase', width: 152, height: 40, heightClass: 'h-12', logoOnly: true },
  { src: dyness('Flutter.png'), alt: 'Flutter', width: 152, height: 40, heightClass: 'h-12', logoOnly: true },
  { src: dyness('Mongo.png'), alt: 'MongoDB', width: 152, height: 40, heightClass: 'h-14' },
  { src: dyness('Web-Flow.png'), alt: 'Webflow', width: 152, height: 40, heightClass: 'h-12', logoOnly: true },
  { src: '/media/web/logo-nextjs.webp', alt: 'Next.js', width: 640, height: 160, heightClass: 'h-14' },
];
