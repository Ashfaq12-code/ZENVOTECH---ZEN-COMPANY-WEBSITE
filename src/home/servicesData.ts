import { Code2, Globe2, Layers3, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { serviceLinks } from '@/config/navigation';

type ServiceItem = {
  number: string;
  title: string;
  text: string;
  icon: LucideIcon;
  href: string;
};

const hrefFor = (page: 'web' | 'app' | 'software' | 'automation'): string =>
  serviceLinks.find((link) => link.page === page)?.href ?? '/';

export const services: readonly ServiceItem[] = [
  { number: '01', title: 'Web development', text: 'Fast websites that turn visitors into enquiries, for businesses in Sri Lanka and abroad.', icon: Globe2, href: hrefFor('web') },
  { number: '02', title: 'App development', text: 'iOS and Android apps your customers keep using, designed and built in Sri Lanka.', icon: Layers3, href: hrefFor('app') },
  { number: '03', title: 'Software development', text: 'Custom business software that puts your daily operations in one place.', icon: Code2, href: hrefFor('software') },
  { number: '04', title: 'Automation', text: 'Automated workflows that take repetitive tasks off your team.', icon: Zap, href: hrefFor('automation') },
];
