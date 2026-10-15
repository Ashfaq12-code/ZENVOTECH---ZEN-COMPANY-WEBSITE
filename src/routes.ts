export type Route = 'home' | 'about' | 'web' | 'app' | 'software' | 'automation' | 'admin' | 'notFound';

const routeByPath = new Map<string, Route>([
  ['/', 'home'],
  ['/who-we-are', 'about'],
  ['/admin', 'admin'],
  ['/services/website-development', 'web'],
  ['/website-development', 'web'],
  ['/services/app-development', 'app'],
  ['/services/mobile-app-development', 'app'],
  ['/app-development', 'app'],
  ['/mobile-app-development', 'app'],
  ['/services/software-development', 'software'],
  ['/software-development', 'software'],
  ['/services/automation', 'automation'],
  ['/automation', 'automation'],
]);

export function normalizePath(pathname: string): string {
  return pathname.replace(/\/+$/, '') || '/';
}

export function resolveRoute(pathname: string): Route {
  return routeByPath.get(normalizePath(pathname)) ?? 'notFound';
}
