import { useState } from 'react';

import { InViewVideo } from '@/components/InViewVideo';
import { desktopFrameImage } from './media';
import { MockupProjectMeta } from './MockupProjectMeta';
import type { MockupProject } from './projectsData';

const initialCount = 6;

export function DesktopProjectsPane({ projects }: { projects: readonly MockupProject[] }) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? projects : projects.slice(0, initialCount);
  return (
    <>
      <div className="works-three-grid" id="works-desktop-grid">
        {visible.map((project, index) => (
          <div key={project.id} className={`project-card relative${index >= initialCount ? ' project-card-enter' : ''}`}>
            <div className="desktop-mockup-wrap">
              <div className="desktop-screen-area">
                {project.video ? (
                  <InViewVideo src={project.video.src} poster={project.video.poster} width={project.video.width} height={project.video.height} label={`${project.name} preview`} className="desktop-project-video" />
                ) : (
                  <img src={project.screenshot} alt={project.name} loading="lazy" decoding="async" />
                )}
              </div>
              <img
                src={desktopFrameImage.src}
                width={desktopFrameImage.width}
                height={desktopFrameImage.height}
                alt=""
                loading="lazy"
                decoding="async"
                className="desktop-frame-overlay"
              />
            </div>
            <MockupProjectMeta project={project} />
          </div>
        ))}
      </div>
      {!showAll && projects.length > initialCount && (
        <button type="button" className="show-more-projects" aria-expanded={showAll} aria-controls="works-desktop-grid" onClick={() => setShowAll(true)}>Show More</button>
      )}
      <a className="view-more-projects" href="/services/software-development#portfolio">See all software projects</a>
    </>
  );
}
