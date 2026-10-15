import { lazy, Suspense, useEffect } from 'react';

import AutomationPage from './AutomationPage';
import { HomePage } from './home/HomePage';
import { usePublishedContent } from './home/usePublishedContent';
import MobileAppDevelopmentPage from './MobileAppDevelopmentPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { resolveRoute } from './routes';
import type { Route } from './routes';
import { setPageSeo } from './seo';
import SoftwareDevelopmentPage from './SoftwareDevelopmentPage';
import WebsiteDevelopmentPage from './WebsiteDevelopmentPage';
import WhoWeArePage from './WhoWeArePage';

// Kept lazy so admin and Supabase auth code never ships in the visitor entry chunk.
const AdminPortal = lazy(() => import('./admin/AdminPortal'));

// Pages that own their SEO call setPageSeo themselves; these routes have no page that does.
function useRouteSeo(route: Route) {
  useEffect(() => {
    if (route === 'home') setPageSeo('home');
    else if (route === 'admin') setPageSeo('private');
    else if (route === 'notFound') setPageSeo('notFound');
  }, [route]);
}

export function AppRoutes({ pathname }: { pathname: string }) {
  const route = resolveRoute(pathname);
  const content = usePublishedContent(route === 'home' || route === 'about');
  useRouteSeo(route);

  switch (route) {
    case 'home':
      return <HomePage content={content} />;
    case 'about':
      return <WhoWeArePage clientReviews={content.reviews} contentError={content.error} dashboardProjectCount={content.projects.length} />;
    case 'web':
      return <WebsiteDevelopmentPage />;
    case 'app':
      return <MobileAppDevelopmentPage />;
    case 'software':
      return <SoftwareDevelopmentPage />;
    case 'automation':
      return <AutomationPage />;
    case 'admin':
      return (
        <Suspense fallback={<p className="p-8 text-base" role="status">Loading admin…</p>}>
          <AdminPortal />
        </Suspense>
      );
    case 'notFound':
      return <NotFoundPage />;
  }
  const unreachable: never = route;
  return unreachable;
}
