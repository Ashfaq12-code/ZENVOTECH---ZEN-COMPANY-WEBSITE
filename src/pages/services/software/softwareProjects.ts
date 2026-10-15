import type { AdminProject } from '@/admin/supabase';

import type { PortfolioCard } from '../shared/types';

type StaticSoftwareProject = {
  id: string;
  name: string;
  country: string;
  flag: string;
  video: string;
  poster: string;
  category: string;
  year?: number;
  industry?: string;
  outcome?: string;
  caseStudyUrl?: string;
};

// PI! NEED DATA: year, client industry, measurable outcome per project
// PI! NEED DATA: case-study URL per project ('#contact' links removed)
// PI! NEED DATA: confirm 'Jercy' spelling (brand name or 'Jersey'?)
export const staticSoftwareProjects: readonly StaticSoftwareProject[] = [
  {
    id: 'sw-alixer-erp',
    name: 'Alixer Perfume ERP',
    country: 'United Arab Emirates',
    flag: 'https://flagcdn.com/w40/ae.png',
    video: '/media/software/alixer-perfume-erp.mp4',
    poster: '/media/software/alixer-perfume-erp-poster.webp',
    category: 'ERP System',
  },
  {
    id: 'sw-football-crm',
    name: 'Football Jercy CRM',
    country: 'Sri Lanka',
    flag: 'https://flagcdn.com/w40/lk.png',
    video: '/media/software/football-crm.mp4',
    poster: '/media/software/football-crm-poster.webp',
    category: 'CRM Platform',
  },
  {
    id: 'sw-jercy-inventory',
    name: 'Jercy INVENTORY',
    country: 'Sri Lanka',
    flag: 'https://flagcdn.com/w40/lk.png',
    video: '/media/software/jercy-inventory.mp4',
    poster: '/media/software/jercy-inventory-poster.webp',
    category: 'Inventory Management',
  },
];

export function staticToCard(project: StaticSoftwareProject): PortfolioCard {
  const { caseStudyUrl, ...card } = project;
  return {
    ...card,
    link: caseStudyUrl ? { href: caseStudyUrl, label: `Read the ${project.name} case study` } : undefined,
  };
}

export function adminToCard(project: AdminProject): PortfolioCard {
  return {
    id: project.id,
    name: project.name,
    image: project.image_url
      ? { src: project.image_url, alt: project.name, className: 'w-full h-full object-cover' }
      : undefined,
    link: isWebUrl(project.live_url) ? { href: project.live_url, label: `Visit ${project.name}` } : undefined,
  };
}

// Admin-entered URLs reach an href; only http(s) is allowed so a javascript: URL can never render.
function isWebUrl(value: string | null | undefined): value is string {
  return typeof value === 'string' && /^https?:\/\//i.test(value);
}
