import type { AdminProject } from '@/admin/supabase';
import type { MobileAppProject } from '@/mobileAppProjects';
import { flagCdnUrl, flagCodeFor } from '../shared/flags';
import type { VideoSource } from '@/components/InViewVideo';
import type { ProjectDetails } from '../shared/types';

// One shape for curated and admin-added apps, so the card never guesses which fields exist.
export type AppCard = {
  id: string;
  name: string;
  country: string;
  flagSrc?: string;
  url?: string;
  createdAt?: string;
  details?: ProjectDetails;
  poster: string;
  width?: number;
  height?: number;
  videos: VideoSource[];
};

export function fromCurated(project: MobileAppProject): AppCard {
  const videos: VideoSource[] = [];
  if (project.videoSrc) videos.push({ src: project.videoSrc, type: 'video/mp4' });
  if (project.videoWebm) videos.push({ src: project.videoWebm, type: 'video/webm' });
  return {
    id: project.id,
    name: project.name,
    country: project.country,
    flagSrc: project.flag,
    url: project.url,
    details: project.details,
    poster: project.screenshot,
    width: project.size.width,
    height: project.size.height,
    videos,
  };
}

export function fromAdmin(project: AdminProject): AppCard {
  const code = flagCodeFor(project.country);
  return {
    id: `live-${project.id}`,
    name: project.name,
    country: project.country,
    flagSrc: code ? flagCdnUrl(code) : undefined,
    url: project.live_url || undefined,
    createdAt: project.created_at,
    poster: project.image_url,
    width: project.image_width ?? undefined,
    height: project.image_height ?? undefined,
    videos: [],
  };
}
