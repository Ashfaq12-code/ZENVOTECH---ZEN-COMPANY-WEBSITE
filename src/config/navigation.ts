export type ActivePage = 'home' | 'about' | 'web' | 'app' | 'software' | 'automation';

type ServiceLink = { page: ActivePage; label: string; href: string };

export const serviceLinks: readonly ServiceLink[] = [
  { page: 'web', label: 'Web development', href: '/services/website-development' },
  { page: 'app', label: 'App development', href: '/services/app-development' },
  { page: 'software', label: 'Software development', href: '/services/software-development' },
  { page: 'automation', label: 'Automation', href: '/services/automation' },
];
