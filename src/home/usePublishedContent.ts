import { useEffect, useState } from 'react';

import type { AdminProject, ClientReview } from '../admin/supabase';
import { loadPublicSupabase } from './publicSupabase';
import type { PublicSupabaseClient } from './publicSupabase';

export type PublishedContent = {
  projects: AdminProject[];
  reviews: ClientReview[];
  error: string;
};

const emptyContent: PublishedContent = { projects: [], reviews: [], error: '' };

// Admin-published projects and reviews, kept live through a realtime channel.
export function usePublishedContent(enabled: boolean): PublishedContent {
  const [content, setContent] = useState<PublishedContent>(emptyContent);

  useEffect(() => {
    if (!enabled) return undefined;
    let active = true;
    let unsubscribe: (() => void) | undefined;
    const refresh = (client: PublicSupabaseClient, fallback: string) => {
      fetchPublishedContent(client)
        .then(({ projects, reviews }) => { if (active) setContent({ projects, reviews, error: '' }); })
        .catch((caught: unknown) => {
          if (active) setContent((current) => ({ ...current, error: caught instanceof Error ? caught.message : fallback }));
        });
    };

    void loadPublicSupabase().then((client) => {
      if (!client || !active) return;
      refresh(client, 'Published content could not be refreshed.');
      const channel = client
        .channel('published-projects-and-reviews')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, () => refresh(client, 'Projects could not be refreshed.'))
        .on('postgres_changes', { event: '*', schema: 'public', table: 'client_reviews' }, () => refresh(client, 'Reviews could not be refreshed.'))
        .subscribe();
      unsubscribe = () => void client.removeChannel(channel);
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, [enabled]);

  return content;
}

async function fetchPublishedContent(client: PublicSupabaseClient) {
  const [projectResult, reviewResult] = await Promise.all([
    client.from('projects').select('*').order('created_at', { ascending: false }),
    client.from('client_reviews').select('*').order('created_at', { ascending: false }),
  ]);
  const firstError = projectResult.error ?? reviewResult.error;
  if (firstError) throw firstError;
  const projects: AdminProject[] = projectResult.data ?? [];
  const reviews: ClientReview[] = reviewResult.data ?? [];
  return { projects, reviews };
}
