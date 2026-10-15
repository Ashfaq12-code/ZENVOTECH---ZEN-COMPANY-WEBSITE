import { useEffect, useState } from 'react';

// The WhatsApp widget changes style while the hero is on screen.
export function useHeroVisible(onHidden: () => void): boolean {
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.site-shell .hero');
    if (!hero) return undefined;
    const update = () => {
      const bounds = hero.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const onScreen = bounds.bottom > 0 && bounds.top < viewportHeight;
      const mostlyVisible = Math.min(bounds.bottom, viewportHeight) - Math.max(bounds.top, 0) >= bounds.height * 0.35;
      const visible = window.matchMedia('(max-width: 800px)').matches ? onScreen : onScreen && mostlyVisible;
      setHeroVisible(visible);
      if (!visible) onHidden();
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [onHidden]);

  return heroVisible;
}
