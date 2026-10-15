import { useEffect } from 'react';
import { SITE } from '@/config/site';

// The admin route must never be indexed; restore the public head on the way out.
export function useAdminPageMeta() {
  useEffect(() => {
    const previousTitle = document.title;
    let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const createdRobots = !robots;
    const previousRobots = robots?.content ?? '';
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex, nofollow';
    document.title = `Admin | ${SITE.name}`;
    const robotsMeta = robots;
    return () => {
      document.title = previousTitle;
      if (createdRobots) robotsMeta.remove();
      else robotsMeta.content = previousRobots;
    };
  }, []);
}
