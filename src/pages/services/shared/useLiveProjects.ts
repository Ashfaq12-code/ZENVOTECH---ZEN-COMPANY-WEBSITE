import { useEffect, useState } from 'react';
import { getSupabase, type AdminProject } from '@/admin/supabase';

export type LiveProjectKind = 'web' | 'app' | 'desktop';

// Projects added in the admin portal, kept fresh over a realtime channel.
export function useLiveProjects(kind: LiveProjectKind): AdminProject[] {
  const [projects, setProjects] = useState<AdminProject[]>([]);

  useEffect(() => {
    let active = true;
    let cleanup: (() => void) | null = null;

    void getSupabase().then((client) => {
      if (!client || !active) return;
      const load = async () => {
        const { data, error } = await selectProjects(client, kind);
        if (!error && data && active) setProjects(filterProjects(data, kind));
      };
      void load();
      const channel = client
        .channel(`${kind}-service-page-projects`)
        .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => void load())
        .subscribe();
      cleanup = () => void client.removeChannel(channel);
    }).catch(() => undefined);

    return () => {
      active = false;
      cleanup?.();
    };
  }, [kind]);

  return projects;
}

type Client = NonNullable<Awaited<ReturnType<typeof getSupabase>>>;

function selectProjects(client: Client, kind: LiveProjectKind) {
  const query = client.from('projects').select('*');
  switch (kind) {
    case 'web':
      return query.or('project_type.eq.web,project_type.is.null').order('created_at', { ascending: false }).returns<AdminProject[]>();
    case 'app':
    case 'desktop':
      return query.eq('project_type', kind).order('created_at', { ascending: false }).returns<AdminProject[]>();
    default: {
      const unreachable: never = kind;
      return unreachable;
    }
  }
}

// 'serlerion' is a test entry that must never show on the public web page.
function filterProjects(projects: AdminProject[], kind: LiveProjectKind): AdminProject[] {
  if (kind !== 'web') return projects;
  return projects.filter((project) => project.name.trim().toLowerCase() !== 'serlerion');
}
