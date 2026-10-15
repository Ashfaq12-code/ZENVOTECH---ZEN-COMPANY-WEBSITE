import { useMemo, useState } from 'react';
import { BriefcaseBusiness, ExternalLink, Globe2, Monitor, Plus, Smartphone, Trash2, X } from 'lucide-react';
import { SITE } from '@/config/site';
import { EmptyState } from './AdminWidgets';
import { ProjectForm } from './ProjectForm';
import type { AdminProject } from './supabase';
import { formatRelativeTime } from './supabase';

type ProjectsTabProps = {
  projects: AdminProject[];
  adminName: string;
  onCreated: (project?: AdminProject) => void;
  onDelete: (project: AdminProject) => void;
  setError: (message: string) => void;
};

export function ProjectsTab({ projects, adminName, onCreated, onDelete, setError }: ProjectsTabProps) {
  const [search, setSearch] = useState('');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const visibleProjects = useMemo(
    () => projects.filter((project) => `${project.name} ${project.country}`.toLowerCase().includes(search.toLowerCase())),
    [projects, search],
  );

  return (
    <section className="admin-section">
      <div className="admin-toolbar">
        <label className="admin-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects…" /></label>
        <button className="admin-button admin-button--primary" onClick={() => setShowProjectForm((open) => !open)}>{showProjectForm ? <X size={16} /> : <Plus size={16} />}{showProjectForm ? 'Close form' : 'Add new project'}</button>
      </div>
      {showProjectForm && (
        <ProjectForm
          adminName={adminName}
          onCreated={(project) => {
            onCreated(project);
            setShowProjectForm(false);
          }}
          setError={setError}
        />
      )}
      {visibleProjects.length ? (
        <div className="admin-project-grid">{visibleProjects.map((project) => <ProjectCard key={project.id} project={project} onDelete={onDelete} />)}</div>
      ) : <EmptyState icon={<BriefcaseBusiness size={30} />} title="No projects yet" message={`Add a project to publish it on the ${SITE.name} site. New additions are marked Recent.`} />}
    </section>
  );
}

function ProjectCard({ project, onDelete }: { project: AdminProject; onDelete: (project: AdminProject) => void }) {
  const typeIcon = project.project_type === 'app' ? <Smartphone size={11} /> : project.project_type === 'desktop' ? <Monitor size={11} /> : <Globe2 size={11} />;
  const typeLabel = project.project_type === 'app' ? 'App' : project.project_type === 'desktop' ? 'Desktop' : 'Web';
  return (
    <article className="admin-project-card">
      <a className="admin-project-image" href={project.live_url} target="_blank" rel="noreferrer"><img src={project.image_url} alt={`${project.name} project`} loading="lazy" decoding="async" width={project.image_width ?? undefined} height={project.image_height ?? undefined} /><span><ExternalLink size={14} /></span></a>
      <div className="admin-project-details"><div><span className="admin-project-country">{project.country}</span><h2>{project.name}</h2></div><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span className="admin-project-type-badge" data-type={project.project_type ?? 'web'}>{typeIcon}{typeLabel}</span><button className="admin-icon-button admin-danger-icon" aria-label={`Delete ${project.name}`} onClick={() => onDelete(project)}><Trash2 size={16} /></button></div></div>
      <div className="admin-project-time">
        <span className="admin-live-dot" /> Added {formatRelativeTime(project.created_at)}
        {project.created_by_admin && <span style={{ opacity: 0.75, fontSize: '11px' }}>by {project.created_by_admin}</span>}
        <a href={project.live_url} target="_blank" rel="noreferrer">Open project <ExternalLink size={12} /></a>
      </div>
    </article>
  );
}
