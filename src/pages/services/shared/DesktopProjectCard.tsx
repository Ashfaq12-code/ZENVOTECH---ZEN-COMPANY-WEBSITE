import { InViewVideo } from '@/components/InViewVideo';

import { ProjectCard } from './ProjectCard';
import type { PortfolioCard } from './types';

const monitorFrame = { src: '/media/software/monitor-frame.webp', width: 640, height: 378 };

type DesktopProjectCardProps = {
  project: PortfolioCard;
  index: number;
};

// Portfolio card in a desktop-monitor frame (software and automation pages).
export function DesktopProjectCard({ project, index }: DesktopProjectCardProps) {
  return (
    <ProjectCard
      title={project.name}
      flag={project.flag ? { src: project.flag, alt: project.country ?? '' } : undefined}
      details={project}
      className="webdev-project-card group relative w-full max-w-[500px] mx-auto rounded-2xl p-3 transition-all duration-500 webdev-project-reveal"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
      captionClassName="mt-4 pb-2 text-center"
      titleClassName="flex items-center justify-center gap-2 text-lg font-bold text-[#0d1b2e] leading-tight select-none"
      afterTitle={project.category && <span className="text-xs text-[#1668e8] font-semibold mt-1 inline-block">{project.category} ✦</span>}
      footer={project.link && (
        <a href={project.link.href} className="mt-2 inline-block text-xs font-semibold text-[#1668e8] underline underline-offset-4 hover:text-[#0d4db5]">
          {project.link.label}
        </a>
      )}
    >
      <div className="desktop-mockup-wrap">
        <div className="desktop-screen-area">
          <ProjectScreen project={project} />
        </div>
        <img
          src={monitorFrame.src}
          alt=""
          width={monitorFrame.width}
          height={monitorFrame.height}
          loading="lazy"
          decoding="async"
          className="desktop-frame-overlay"
        />
      </div>
    </ProjectCard>
  );
}

function ProjectScreen({ project }: { project: PortfolioCard }) {
  if (project.video) {
    return (
      <InViewVideo
        src={project.video}
        poster={project.poster ?? project.image?.src}
        label={`${project.name} preview`}
        className="desktop-project-video"
      />
    );
  }
  if (!project.image) return null;
  const { src, alt, className, width, height } = project.image;
  return <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" className={className} />;
}
