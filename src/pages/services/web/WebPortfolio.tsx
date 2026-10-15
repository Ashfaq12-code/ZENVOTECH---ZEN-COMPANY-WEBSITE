import { useState } from 'react';
import type { AdminProject } from '@/admin/supabase';
import { flagCdnUrl, flagCodeFor } from '../shared/flags';
import { ProjectCard } from '../shared/ProjectCard';
import { useLiveProjects } from '../shared/useLiveProjects';
import { ImacScreen } from './ImacScreen';
import { webProjects, type WebProject } from './webProjects';

const cardClass = 'webdev-project-card group relative w-full max-w-[500px] mx-auto rounded-2xl p-3 transition-all duration-500 webdev-project-reveal';
const titleClass = 'text-lg font-bold text-[#0d1b2e] group-hover:text-[#1668e8] transition-colors';
const revealDelay = (index: number) => ({ animationDelay: `${Math.min(index, 8) * 70}ms` });

export function WebPortfolio() {
  const liveProjects = useLiveProjects('web');
  const [visibleCount, setVisibleCount] = useState(9);
  const curatedVisible = webProjects.slice(0, Math.max(0, visibleCount - liveProjects.length));

  return (
    <>
      <PortfolioIntro liveProjects={liveProjects} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {liveProjects.slice(0, visibleCount).map((project, index) => (
          <LiveWebCard key={project.id} project={project} index={index} />
        ))}
        {curatedVisible.map((project, index) => (
          <CuratedWebCard key={project.title} project={project} index={liveProjects.length + index} />
        ))}
      </div>
      {visibleCount < liveProjects.length + webProjects.length && (
        <button type="button" className="show-more-projects" onClick={() => setVisibleCount((count) => count + 9)}>
          See more projects
        </button>
      )}
    </>
  );
}

function PortfolioIntro({ liveProjects }: { liveProjects: readonly AdminProject[] }) {
  const total = liveProjects.length + webProjects.length;
  const countries = new Set([...webProjects.map((p) => p.country), ...liveProjects.map((p) => p.country)]);
  return (
    <section id="portfolio" className="w-full mb-16 flex flex-col items-center text-center scroll-mt-24">
      <h2 className="webdev-mobile-section-heading !mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Websites we have <span>built.</span></h2>
      {/* PI! NEED DATA: client industries to name in this portfolio intro */}
      <p className="section-lede mx-auto text-center">
        {total} websites we have designed and built for businesses in {countries.size} countries, including Sri Lanka.
      </p>
    </section>
  );
}

function CuratedWebCard({ project, index }: { project: WebProject; index: number }) {
  return (
    <ProjectCard
      title={project.title}
      href={project.liveUrl}
      flag={{ src: project.flagUrl, alt: '' }}
      details={project.details}
      className={cardClass}
      style={revealDelay(index)}
      captionClassName="mt-4 pb-2 text-center"
      titleClassName={titleClass}
      linkClassName="webdev-project-title-link"
      afterTitle={<span className="text-xs text-[#4c6c9f] mt-0.5 inline-block">{project.country}</span>}
    >
      <ImacScreen title={project.title} href={project.liveUrl} image={project.image} variant="curated" />
    </ProjectCard>
  );
}

function LiveWebCard({ project, index }: { project: AdminProject; index: number }) {
  const code = flagCodeFor(project.country);
  const image = { src: project.image_url, width: project.image_width ?? undefined, height: project.image_height ?? undefined };
  return (
    <ProjectCard
      title={project.name}
      href={project.live_url || undefined}
      flag={code ? { src: flagCdnUrl(code), alt: project.country } : undefined}
      className={cardClass}
      style={revealDelay(index)}
      captionClassName="mt-4 pb-2 text-center"
      titleClassName={titleClass}
      linkClassName="webdev-project-title-link"
      afterTitle={<span className="text-xs text-[#1668e8] font-semibold mt-1 inline-block">Verified Client Project ✦</span>}
    >
      <ImacScreen title={project.name} href={project.live_url || undefined} image={image} variant="live" />
    </ProjectCard>
  );
}
