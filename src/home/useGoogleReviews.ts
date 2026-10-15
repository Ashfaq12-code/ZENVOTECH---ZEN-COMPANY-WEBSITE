import { useEffect, useState } from 'react';

import type { GoogleReviewPayload } from '../googleReviews';
import { loadPublicSupabase } from './publicSupabase';

type GoogleReviewsState = { data: GoogleReviewPayload | null; error: string };

const refreshIntervalMs = 15 * 60 * 1000;

export function useGoogleReviews(enabled: boolean): GoogleReviewsState {
  const [state, setState] = useState<GoogleReviewsState>({ data: null, error: '' });

  useEffect(() => {
    if (!enabled) return undefined;
    let active = true;
    const load = async () => {
      try {
        const client = await loadPublicSupabase();
        if (!client) return;
        const { data, error } = await client.functions.invoke<GoogleReviewPayload>('google-reviews', { method: 'GET' });
        if (error) throw error;
        if (!data || !Array.isArray(data.reviews)) throw new Error('Google reviews returned an invalid response.');
        if (active) setState({ data, error: '' });
      } catch (caught) {
        if (active) setState((current) => ({ ...current, error: caught instanceof Error ? caught.message : 'Google reviews could not be refreshed.' }));
      }
    };

    void load();
    const timer = window.setInterval(() => void load(), refreshIntervalMs);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [enabled]);

  return state;
}
