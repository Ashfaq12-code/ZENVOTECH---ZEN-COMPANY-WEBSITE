import { useState } from 'react';

import { InViewVideo } from '@/components/InViewVideo';
import { MockupProjectMeta } from './MockupProjectMeta';
import type { MockupProject } from './projectsData';

const initialCount = 3;

export function AppProjectsPane({ projects }: { projects: readonly MockupProject[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, initialCount);
  return (
    <>
      <div className="works-three-grid" id="works-app-grid">
        {visible.map((project, index) => (
          <div key={project.id} className={`project-card relative${index >= initialCount ? ' project-card-enter' : ''}`}>
            <div className={`iphone-mockup iphone-mockup--portfolio${project.video ? ' iphone-mockup--video' : ''}`}>
              <div className="iphone-screen">
                <div className="dynamic-island"></div>
                <div className="screen-content">
                  {project.video ? (
                    <InViewVideo src={project.video.src} poster={project.video.poster} width={project.video.width} height={project.video.height} label={`${project.name} preview`} className="project-preview-video" />
                  ) : (
                    <img src={project.screenshot} alt={project.name} loading="lazy" decoding="async" />
                  )}
                </div>
                <div className="home-indicator"></div>
              </div>
            </div>
            <MockupProjectMeta project={project} />
          </div>
        ))}
      </div>
      {!showAll && projects.length > initialCount && (
        <button type="button" className="show-more-projects" aria-expanded={showAll} aria-controls="works-app-grid" onClick={() => setShowAll(true)}>Show More</button>
      )}
      <a className="view-more-projects" href="/services/app-development#portfolio">See all mobile app projects</a>
    </>
  );
}
