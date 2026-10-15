import type { ImageAsset } from './media';

type TeamProfile = {
  role: string;
  badge: string;
  skills: readonly string[];
};

export type TeamMember = {
  id: string;
  initials: string;
  name: string;
  description: string;
  photo?: ImageAsset;
  // The home page and Who we are page currently show different roles; kept apart until confirmed.
  home: TeamProfile;
  about: TeamProfile;
};

export type TeamView = 'home' | 'about';

const photo = (name: string, width: number, height: number): ImageAsset => ({ src: `/media/home/team-${name}.webp`, width, height });

// PI! NEED DATA: full names, LinkedIn URLs, years of experience per member (Person schema)
// PI! NEED DATA: one confirmed role, badge and skills per member; pages disagree
export const teamMembers: readonly TeamMember[] = [
  {
    id: 'ashfaq',
    initials: 'AA',
    // PI! NEED DATA: are 'Ashfaq' and 'Ashfaq Ahamed' two different people?
    name: 'Ashfaq',
    // PI! NEED DATA: real experience; role is 'FOUNDER & CEO' on home, 'DATA ANALYST' on about
    description: 'Tech lead directing digital strategy, system design, and brand execution.',
    photo: photo('ashfaq', 551, 640),
    home: { role: 'FOUNDER & CEO', badge: 'LEADERSHIP', skills: ['System Design', 'Digital Strategy', 'Tech Lead'] },
    about: { role: 'DATA ANALYST', badge: 'LEADERSHIP', skills: ['System Design', 'Python', 'Node js', 'c#'] },
  },
  {
    id: 'ashfaq-ahamed',
    initials: 'AA',
    name: 'Ashfaq Ahamed',
    description: 'Architecting end-to-end web platforms with high-throughput cloud backends and responsive UIs.',
    photo: photo('ashfaq-ahamed', 544, 640),
    home: { role: 'MID-LEVEL FULLSTACK DEVELOPER', badge: 'CORE ENG', skills: ['Next js', 'Node js', 'APIs', 'TypeScript', 'Python'] },
    about: { role: 'FULLSTACK DEVELOPER', badge: 'CORE ENG', skills: ['Next js', 'Node js', 'APIs', 'TypeScript', 'Python'] },
  },
  {
    id: 'zaid',
    initials: 'JR',
    name: 'Zaid',
    // PI! NEED DATA: Zaid is 'JUNIOR' on home but 'SENIOR' on about; which is right?
    description: 'Engineering interactive frontend interfaces, state management, and backend microservices.',
    photo: photo('zaid', 427, 640),
    home: { role: 'JUNIOR FULLSTACK DEVELOPER', badge: 'CORE ENG', skills: ['Next js', 'GO', 'APIs', 'TypeScript', 'Python'] },
    about: { role: 'SENIOR FULLSTACK DEVELOPER', badge: 'CORE ENG', skills: ['Next js', 'Fullstack', 'APIs', 'TypeScript', 'Python'] },
  },
  {
    id: 'firaz',
    initials: 'KS',
    name: 'Firaz',
    description: 'Building clean responsive components, QA automation, and user interaction workflows.',
    photo: photo('firaz', 501, 640),
    home: { role: 'FULLSTACK DEVELOPER', badge: 'CORE ENG', skills: ['React', 'JavaScript', 'Python & UI', 'Git'] },
    about: { role: 'JUNIOR DEVELOPER', badge: 'ENGINEERING', skills: ['React', 'JavaScript', 'Python & UI', 'Git'] },
  },
];
