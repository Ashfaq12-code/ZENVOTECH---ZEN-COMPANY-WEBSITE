import { useEffect } from 'react';

const scrollableHashes = ['#contact', '#works'];

// Links like /#contact from other pages land before React renders, so scroll once mounted.
export function useInitialHashScroll() {
  useEffect(() => {
    if (window.location.pathname !== '/' || !scrollableHashes.includes(window.location.hash)) return undefined;
    const targetId = window.location.hash.slice(1);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);
}
