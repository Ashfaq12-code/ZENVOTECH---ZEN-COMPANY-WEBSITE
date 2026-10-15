import type { MockupProject } from './projectsData';
import { AddedBadge } from './WebProjectsPane';

export function MockupProjectMeta({ project }: { project: MockupProject }) {
  return (
    <div className="project-meta text-center justify-center mt-6">
      {project.createdAt && <AddedBadge createdAt={project.createdAt} centered />}
      <div className="project-name-link justify-center">
        {project.flag && (
          <img src={project.flag} alt={project.country} className="w-6 h-4 rounded-sm" width={24} height={16} loading="lazy" decoding="async" />
        )}
        {project.url ? (
          <a href={project.url}>
            <h3 className="text-xl font-semibold">{project.name}</h3>
          </a>
        ) : (
          <h3 className="text-xl font-semibold">{project.name}</h3>
        )}
      </div>
      {project.category && (
        <span className="mt-1 block text-sm font-semibold text-[#1668e8]">{project.category}</span>
      )}
    </div>
  );
}
