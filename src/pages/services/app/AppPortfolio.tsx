import { useState } from 'react';
import { formatRelativeTime } from '@/admin/supabase';
import { mobileAppProjects } from '@/mobileAppProjects';
import { ProjectCard } from '../shared/ProjectCard';
import { useLiveProjects } from '../shared/useLiveProjects';
import { fromAdmin, fromCurated, type AppCard } from './appCards';
import { PhoneScreen } from './PhoneScreen';

const weekMs = 7 * 24 * 60 * 60 * 1000;

export function AppPortfolio() {
  const liveProjects = useLiveProjects('app');
  const [visibleCount, setVisibleCount] = useState(6);
  const apps = [...mobileAppProjects.map(fromCurated), ...liveProjects.map(fromAdmin)];

  return (
    <>
      <PortfolioIntro total={apps.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {apps.slice(0, visibleCount).map((app, index) => (
          <AppProjectCard key={app.id} app={app} index={index} />
        ))}
      </div>
      {visibleCount < apps.length && (
        <div className="flex justify-center mt-12">
          <button type="button" className="show-more-projects" onClick={() => setVisibleCount((count) => count + 6)}>
            See more apps
          </button>
        </div>
      )}
    </>
  );
}

function PortfolioIntro({ total }: { total: number }) {
  return (
    <section id="portfolio" className="text-center mb-16 scroll-mt-24">
      <span className="text-[#1668e8] font-mono text-xs tracking-widest uppercase font-bold block mb-2">
        MOBILE EXPERIENCES & APPS
      </span>
      <p aria-hidden="true" className="text-6xl md:text-8xl font-black text-[#dce8ff] tracking-tighter mb-2 select-none">
        PORTFOLIO
      </p>
      <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight -mt-8 md:-mt-12">
        <span className="bg-gradient-to-r from-[#0d4db5] via-[#1668e8] to-[#3985ff] bg-clip-text text-transparent">
          Mobile apps we have built
        </span>
      </h2>
      {/* PI! NEED DATA: platforms (iOS/Android) and client industries for this intro */}
      <p className="text-[#4c6c9f] max-w-xl mx-auto mt-4 text-base">
        {total} apps we have designed and built, including food delivery, mobile gaming and fitness apps.
      </p>
    </section>
  );
}

function AppProjectCard({ app, index }: { app: AppCard; index: number }) {
  const isRecent = app.createdAt !== undefined && Date.now() - new Date(app.createdAt).getTime() < weekMs;
  const addedMeta = app.createdAt && (
    <div className="project-screen-meta" style={{ justifyContent: 'center', marginBottom: '8px' }}>
      {isRecent && <span className="project-screen-recent">Recent</span>}
      <span className="project-screen-time">Added {formatRelativeTime(app.createdAt)}</span>
    </div>
  );
  return (
    <ProjectCard
      title={app.name}
      href={app.url}
      flag={app.flagSrc ? { src: app.flagSrc, alt: app.country } : undefined}
      details={app.details}
      className="webdev-project-reveal group relative w-full max-w-[380px] mx-auto bg-white rounded-3xl p-6 transition-all duration-500 flex flex-col items-center"
      style={{ animationDelay: `${Math.min(index, 8) * 70}ms` }}
      captionClassName="mt-6 text-center"
      titleClassName="text-xl font-bold text-[#0d1b2e] flex items-center justify-center gap-2 group-hover:text-[#1668e8] transition-colors"
      linkClassName="inline-flex items-center gap-2"
      beforeTitle={addedMeta}
    >
      <PhoneScreen app={app} />
    </ProjectCard>
  );
}
