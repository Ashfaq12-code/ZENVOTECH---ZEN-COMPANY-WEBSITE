import type { TechLogo } from '../shared/types';

const dyness = (file: string) => `https://dynessco.com/wp-content/uploads/2025/06/${file}`;

// PI! NEED DATA: confirm license or replace dynessco.com logo images
export const appLogos: readonly TechLogo[] = [
  { src: '/media/app/logo-react-native.webp', alt: 'React Native', width: 640, height: 197, heightClass: 'h-14' },
  { src: '/media/app/logo-vue.webp', alt: 'Vue.js', width: 566, height: 640, heightClass: 'h-12' },
  { src: dyness('Node.png'), alt: 'Node.js', width: 152, height: 40, heightClass: 'h-14', logoOnly: true },
  { src: dyness('CSS.png'), alt: 'CSS3', width: 152, height: 40, heightClass: 'h-12' },
  { src: '/media/app/logo-spring.webp', alt: 'Spring', width: 640, height: 173, heightClass: 'h-14' },
  { src: '/media/app/logo-laravel.webp', alt: 'Laravel', width: 640, height: 199, heightClass: 'h-12' },
  { src: dyness('Firebase.png'), alt: 'Firebase', width: 152, height: 40, heightClass: 'h-12' },
  { src: dyness('Flutter.png'), alt: 'Flutter', width: 152, height: 40, heightClass: 'h-12' },
  { src: dyness('Web-Flow.png'), alt: 'Webflow', width: 152, height: 40, heightClass: 'h-12', logoOnly: true },
];
