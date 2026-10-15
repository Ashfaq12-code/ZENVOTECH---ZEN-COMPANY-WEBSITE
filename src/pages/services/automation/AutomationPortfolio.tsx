import { useState } from 'react';

import { DesktopProjectCard } from '../shared/DesktopProjectCard';
import { automationProjects } from './automationProjects';

const pageSize = 6;

export function AutomationPortfolio() {
  const [visibleCount, setVisibleCount] = useState(pageSize);

  return (
    <>
      <section id="portfolio" className="w-full mb-16 flex flex-col items-center text-center scroll-mt-24" aria-labelledby="automation-portfolio-heading">
        <div className="w-full">
          <h2 id="automation-portfolio-heading" className="webdev-mobile-section-heading !mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Automations we have <span>built.</span>
          </h2>
        </div>
        {/* PI! NEED DATA: total hours saved per month across client automations */}
        <p className="section-lede mx-auto text-center">
          {automationProjects.length} automations for businesses in Sri Lanka and the UAE, from sales follow-ups to stock and reporting.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" id="automation-project-grid">
        {automationProjects.slice(0, visibleCount).map((project, index) => (
          <DesktopProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {visibleCount < automationProjects.length && (
        <button
          type="button"
          className="show-more-projects"
          aria-controls="automation-project-grid"
          onClick={() => setVisibleCount((count) => count + pageSize)}
        >
          See more automations
        </button>
      )}
    </>
  );
}
