import { useEffect, useRef, useState } from 'react';

const durationMs = 850;

// Starts at the final value so crawlers, no-JS snapshots and reduced-motion users see the real number.
// When the section scrolls into view the number counts up once; later value changes apply directly.
export function useCountUp(value: number, started: boolean) {
  const [displayValue, setDisplayValue] = useState(value);
  const animated = useRef(false);

  useEffect(() => {
    if (!started || animated.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(value);
      return undefined;
    }

    let frame = 0;
    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      setDisplayValue(Math.round(value * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
      else animated.current = true;
    };
    frame = window.requestAnimationFrame(animate);
    return () => {
      window.cancelAnimationFrame(frame);
      setDisplayValue(value);
    };
  }, [started, value]);

  return displayValue;
}
