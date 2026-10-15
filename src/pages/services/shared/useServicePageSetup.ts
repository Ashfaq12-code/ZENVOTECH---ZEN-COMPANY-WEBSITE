import { useEffect } from 'react';
import { setPageSeo, type SeoPage } from '@/seo';

// Sets page SEO and honours a #portfolio deep link; restores home SEO on leave.
export function useServicePageSetup(page: SeoPage) {
  useEffect(() => {
    const portfolioFrame = window.location.hash === '#portfolio'
      ? window.requestAnimationFrame(() => {
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        })
      : null;
    if (portfolioFrame === null) window.scrollTo(0, 0);
    setPageSeo(page);

    return () => {
      setPageSeo('home');
      if (portfolioFrame !== null) window.cancelAnimationFrame(portfolioFrame);
    };
  }, [page]);
}
