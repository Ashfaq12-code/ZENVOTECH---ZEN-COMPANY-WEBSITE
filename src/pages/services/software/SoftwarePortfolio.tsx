import { useState } from 'react';

import { DesktopProjectCard } from '../shared/DesktopProjectCard';
import { useLiveProjects } from '../shared/useLiveProjects';
import { adminToCard, staticSoftwareProjects, staticToCard } from './softwareProjects';

const pageSize = 6;

export function SoftwarePortfolio() {
  const adminProjects = useLiveProjects('desktop');
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const cards = [...adminProjects.map(adminToCard), ...staticSoftwareProjects.map(staticToCard)];

  return (
    <>
      <section id="portfolio" className="w-full mb-16 flex flex-col items-center text-center scroll-mt-24" aria-labelledby="software-portfolio-heading">
        <div className="w-full">
          <h2 id="software-portfolio-heading" className="webdev-mobile-section-heading !mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Software we have <span>built.</span>
          </h2>
        </div>
        <p className="section-lede mx-auto text-center">
          {cards.length} systems so far, including ERP, CRM and inventory software for businesses in Sri Lanka and the UAE.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" id="software-project-grid">
        {cards.slice(0, visibleCount).map((card, index) => (
          <DesktopProjectCard key={card.id} project={card} index={index} />
        ))}
      </div>

      {visibleCount < cards.length && (
        <button
          type="button"
          className="show-more-projects"
          aria-controls="software-project-grid"
          onClick={() => setVisibleCount((count) => count + pageSize)}
        >
          See more projects
        </button>
      )}
    </>
  );
}
