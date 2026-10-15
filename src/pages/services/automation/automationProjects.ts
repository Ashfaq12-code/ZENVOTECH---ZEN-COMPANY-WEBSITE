import type { PortfolioCard } from '../shared/types';

const media = '/media/automation';
const imageClass = 'desktop-project-video';

// PI! NEED DATA: real screen recordings per automation; cards show stock/AI images until then
// PI! NEED DATA: client industry, year and hours saved per automation
// PI! NEED DATA: confirm license for superoffice.com and unicorn-images CDN images, or replace
export const automationProjects: readonly PortfolioCard[] = [
  {
    id: 'automation-crm',
    name: 'CRM & Sales Automation',
    country: 'United Arab Emirates',
    image: {
      src: 'https://www.superoffice.com/globalassets/blog/2025/sales-process/dashboard.png',
      alt: 'CRM & Sales Automation dashboard preview',
      className: imageClass,
      width: 2880,
      height: 1580,
    },
    category: 'Automation',
  },
  {
    id: 'automation-whatsapp',
    name: 'WhatsApp Automation',
    country: 'Sri Lanka',
    image: {
      src: 'https://unicorn-images.b-cdn.net/b383ae72-9283-4551-937d-323ca8da3f5d?optimizer=gif',
      alt: 'WhatsApp Automation dashboard preview',
      className: imageClass,
      width: 2240,
      height: 1260,
    },
    category: 'Automation',
  },
  {
    id: 'automation-inventory',
    name: 'Inventory & ERP Automation',
    country: 'Sri Lanka',
    image: selfHosted('inventory', 'Inventory & ERP Automation', 476),
    category: 'Automation',
  },
  {
    id: 'automation-email',
    name: 'Email Automation',
    country: 'Sri Lanka',
    image: selfHosted('email', 'Email Automation', 426),
    category: 'Automation',
  },
  {
    id: 'automation-booking',
    name: 'Booking & Appointment Automation',
    country: 'Sri Lanka',
    image: selfHosted('booking', 'Booking & Appointment Automation', 480),
    category: 'Automation',
  },
  {
    id: 'automation-reporting',
    name: 'Data Collection & Reporting',
    country: 'Sri Lanka',
    image: selfHosted('reporting', 'Data Collection & Reporting', 426),
    category: 'Automation',
  },
];

function selfHosted(file: string, name: string, height: number) {
  return {
    src: `${media}/${file}-preview.webp`,
    alt: `${name} dashboard preview`,
    className: imageClass,
    width: 640,
    height,
  };
}
