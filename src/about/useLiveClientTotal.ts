import { useEffect, useState } from 'react';
import { supabase } from '../admin/supabase';

// PI! NEED DATA: verify the 30 projects/clients baseline against real records
export const curatedBaseline = 30;

// Live client total = curated baseline + published client reviews, refreshed on table changes.
export function useLiveClientTotal(started: boolean) {
  const [clientCount, setClientCount] = useState(curatedBaseline);
  const [metricsError, setMetricsError] = useState('');

  useEffect(() => {
    if (!started) return undefined;
    if (!supabase) {
      setMetricsError('Live totals are unavailable right now.');
      return undefined;
    }

    const client = supabase;
    let active = true;
    const refreshCounts = async () => {
      const { count, error } = await client.from('client_reviews').select('id', { count: 'exact', head: true });
      if (error) throw error;
      if (count === null) throw new Error('Live client total could not be read.');
      if (!active) return;
      setClientCount(curatedBaseline + count);
      setMetricsError('');
    };
    const refresh = (fallback: string) => {
      void refreshCounts().catch((error: unknown) => {
        if (active) setMetricsError(error instanceof Error ? error.message : fallback);
      });
    };

    refresh('Live totals could not be refreshed.');
    const channel = client
      .channel('who-we-are-company-metrics')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'client_reviews' }, () => refresh('Client total could not be refreshed.'))
      .subscribe((status) => {
        if (active && (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT')) {
          setMetricsError('Live totals could not connect. Please refresh the page.');
        }
      });

    return () => {
      active = false;
      void client.removeChannel(channel);
    };
  }, [started]);

  return { clientCount, metricsError };
}
