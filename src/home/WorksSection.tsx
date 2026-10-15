import { useState } from 'react';
import { Globe2, Monitor, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { AdminProject } from '../admin/supabase';
import { AppProjectsPane } from './AppProjectsPane';
import { DesktopProjectsPane } from './DesktopProjectsPane';
import { appProjects, desktopProjects, toMockupProjects, toWebProjects, webProjects } from './projectsData';
import { WebProjectsPane } from './WebProjectsPane';

type WorkTab = 'web' | 'app' | 'desktop';

const tabs: ReadonlyArray<{ id: WorkTab; label: string; icon: LucideIcon }> = [
  { id: 'web', label: 'Web', icon: Globe2 },
  { id: 'app', label: 'App', icon: Smartphone },
  { id: 'desktop', label: 'Desktop', icon: Monitor },
];
const tabOrder: Record<WorkTab, number> = { web: 0, app: 1, desktop: 2 };

type WorksSectionProps = { latestProjects: readonly AdminProject[]; contentError: string };

export function WorksSection({ latestProjects, contentError }: WorksSectionProps) {
  const [activeTab, setActiveTab] = useState<WorkTab>('web');
  const [direction, setDirection] = useState<'right' | 'left'>('right');
  const changeTab = (next: WorkTab) => {
    if (next === activeTab) return;
    setDirection(tabOrder[next] > tabOrder[activeTab] ? 'right' : 'left');
    setActiveTab(next);
  };

  return (
    <section className="section-pad works-section" id="works">
      <div className="section-heading services-heading">
        <div><p className="eyebrow">Selected work</p><h2>What we have <span>done.</span></h2></div>
        <p className="section-lede">Explore our latest creations — from smart apps to powerful business platforms.</p>
      </div>
      <div className="works-tabs-row">
        <div className="works-tabs-pill-box" role="tablist" aria-label="Project categories">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button key={id} type="button" role="tab" aria-selected={activeTab === id} className={`works-tab-item ${activeTab === id ? 'active' : ''}`} onClick={() => changeTab(id)}>
              <Icon size={15} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      {contentError && <p className="published-content-error" role="status">Live projects could not be refreshed: {contentError}</p>}
      <div className="works-tab-content-wrapper">
        <div key={`tab-${activeTab}`} className={`works-pane-animated ${direction === 'right' ? 'works-slide-right-enter' : 'works-slide-left-enter'}`}>
          <WorkTabPane tab={activeTab} latestProjects={latestProjects} />
        </div>
      </div>
    </section>
  );
}

function WorkTabPane({ tab, latestProjects }: { tab: WorkTab; latestProjects: readonly AdminProject[] }) {
  switch (tab) {
    case 'web':
      return <WebProjectsPane projects={[...toWebProjects(latestProjects), ...webProjects]} />;
    case 'app':
      return <AppProjectsPane projects={[...appProjects, ...toMockupProjects(latestProjects, 'app')]} />;
    case 'desktop':
      return <DesktopProjectsPane projects={[...toMockupProjects(latestProjects, 'desktop'), ...desktopProjects]} />;
  }
  const unreachable: never = tab;
  return unreachable;
}
