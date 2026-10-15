import { useState } from 'react';

import { formatRelativeTime } from '../admin/supabase';
import { imacFrameImage } from './media';
import { isRecent } from './projectsData';
import type { WebProject } from './projectsData';
import { useScreenshotScroll } from './useScreenshotScroll';

const initialCount = 9;

export function WebProjectsPane({ projects }: { projects: readonly WebProject[] }) {
  const [showAll, setShowAll] = useState(false);
  const screenshotScroll = useScreenshotScroll();
  return (
    <>
      <div className="project-grid" id="works-project-grid">
        {projects.slice(0, showAll ? projects.length : initialCount).map((project, index) => (
          <WebProjectCard project={project} index={index} screenshotScroll={screenshotScroll} key={project.id} />
        ))}
      </div>
      {!showAll && projects.length > initialCount && (
        <button type="button" className="show-more-projects" aria-expanded={showAll} aria-controls="works-project-grid" onClick={() => setShowAll(true)}>Show More</button>
      )}
      <a className="view-more-projects" href="/services/website-development#portfolio">See all website projects</a>
    </>
  );
}

type WebProjectCardProps = {
  project: WebProject;
  index: number;
  screenshotScroll: ReturnType<typeof useScreenshotScroll>;
};

function WebProjectCard({ project, index, screenshotScroll }: WebProjectCardProps) {
  const { screen } = project;
  return (
    <article className={`project-card imac-project${index >= initialCount ? ' project-card-enter' : ''}`}>
      <div
        className="project-visual"
        onMouseEnter={() => screen && screenshotScroll.scroll(project.id, true)}
        onMouseLeave={() => screen && screenshotScroll.scroll(project.id, false)}
      >
        <div className="imac-screen">
          {screen && (
            <img
              ref={screenshotScroll.register(project.id)}
              className="imac-screen-image"
              src={screen.src}
              width={screen.width}
              height={screen.height}
              alt={`${project.title} website screenshot`}
              loading="lazy"
              decoding="async"
              onLoad={() => screenshotScroll.resumeIfHovered(project.id)}
            />
          )}
          {project.createdAt && <AddedBadge createdAt={project.createdAt} />}
        </div>
        <img className="imac-frame" src={imacFrameImage.src} width={imacFrameImage.width} height={imacFrameImage.height} alt="" loading="lazy" decoding="async" />
      </div>
      {/* PI! NEED DATA: year, industry and one-line outcome under each project title */}
      <div className="project-meta">
        <div className="project-name-link">
          {project.flag && <img src={project.flag} width={20} height={16} loading="lazy" decoding="async" alt={project.country ? `${project.country} flag` : ''} />}
          {project.url ? (
            <a href={project.url} target="_blank" rel="noreferrer"><h3>{project.title}</h3></a>
          ) : <h3>{project.title}</h3>}
        </div>
      </div>
    </article>
  );
}

export function AddedBadge({ createdAt, centered = false }: { createdAt: string; centered?: boolean }) {
  return (
    <div className="project-screen-meta" style={centered ? { justifyContent: 'center', marginBottom: '6px' } : undefined}>
      {isRecent(createdAt) && <span className="project-screen-recent">Recent</span>}
      <span className="project-screen-time">Added {formatRelativeTime(createdAt)}</span>
    </div>
  );
}
