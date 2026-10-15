import { getSupabase, recordCallClick } from '../admin/supabase';

// getSupabase loads supabase-js on first call, keeping it out of the visitor entry chunk.
export type PublicSupabaseClient = NonNullable<Awaited<ReturnType<typeof getSupabase>>>;

export const loadPublicSupabase = getSupabase;

export const trackCallClick = recordCallClick;
