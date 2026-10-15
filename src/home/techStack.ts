import type { ImageAsset } from './media';

type TechItem = ImageAsset & { name: string };

// PI! NEED DATA: confirm license or replace dynessco.com tech logos
export const techStack: readonly TechItem[] = [
  { name: 'React', src: 'https://dynessco.com/wp-content/uploads/2025/06/React.png', width: 152, height: 40 },
  { name: 'Vue.js', src: 'https://dynessco.com/wp-content/uploads/2025/06/Veu-JS.png', width: 152, height: 40 },
  { name: 'Node.js', src: 'https://dynessco.com/wp-content/uploads/2025/06/Node.png', width: 152, height: 40 },
  { name: 'CSS', src: 'https://dynessco.com/wp-content/uploads/2025/06/CSS.png', width: 152, height: 40 },
  { name: 'Spring', src: 'https://dynessco.com/wp-content/uploads/2025/06/Spring.png', width: 152, height: 40 },
  { name: 'Laravel', src: 'https://dynessco.com/wp-content/uploads/2025/06/Laravel.png', width: 152, height: 40 },
  { name: 'Firebase', src: 'https://dynessco.com/wp-content/uploads/2025/06/Firebase.png', width: 152, height: 40 },
  { name: 'Next.js', src: '/media/home/tech-nextjs.webp', width: 640, height: 160 },
];
