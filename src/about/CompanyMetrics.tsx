import { useEffect, useRef, useState, type RefObject } from 'react';
import { SITE } from '@/config/site';
import { useCountUp } from './useCountUp';
import { curatedBaseline, useLiveClientTotal } from './useLiveClientTotal';

export function CompanyMetrics({ dashboardProjectCount }: { dashboardProjectCount: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const started = useInView(sectionRef);
  const { clientCount, metricsError } = useLiveClientTotal(started);
  const projectCount = curatedBaseline + dashboardProjectCount;

  return (
    <section className="who-company-metrics" ref={sectionRef} aria-label={`About ${SITE.name} in numbers`}>
      {/* PI! NEED DATA: '6+ years' here vs 'Est. 2026' on home; confirm founding year */}
      <article className="who-company-metric">
        <strong><Metric value={6} started={started} />+</strong>
        <h3>Years of experience</h3>
      </article>
      <article className="who-company-metric">
        <strong><Metric value={projectCount} started={started} />+</strong>
        <h3>Projects worldwide</h3>
        <p>Across web, app, and desktop</p>
      </article>
      <article className="who-company-metric">
        <strong><Metric value={clientCount} started={started} />+</strong>
        <h3>Clients worldwide</h3>
      </article>
      {metricsError && <p className="who-company-metrics-error" role="status">{metricsError}</p>}
    </section>
  );
}

function Metric({ value, started }: { value: number; started: boolean }) {
  return <>{useCountUp(value, started).toLocaleString()}</>;
}

function useInView(ref: RefObject<HTMLElement>) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  return inView;
}
