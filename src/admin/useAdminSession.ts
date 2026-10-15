import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { AdminAccount } from './adminData';
import { supabaseClient } from './supabaseClient';

export function useAdminSession(setError: (message: string) => void) {
  const [session, setSession] = useState<Session | null>(null);
  const [account, setAccount] = useState<AdminAccount | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const client = supabaseClient;
    if (!client) {
      setLoading(false);
      return;
    }
    let alive = true;
    const restoreSession = async () => {
      try {
        const { data, error: sessionError } = await client.auth.getSession();
        if (sessionError) throw sessionError;
        if (!alive) return;
        setSession(data.session);
        if (data.session) {
          const { data: profile, error: profileError } = await client
            .from('admin_accounts')
            .select('username')
            .eq('user_id', data.session.user.id)
            .single();
          if (profileError) throw profileError;
          if (alive) setAccount(profile);
        }
      } catch (caught) {
        if (alive) setError(caught instanceof Error ? caught.message : 'Unable to restore the admin session.');
      } finally {
        if (alive) setLoading(false);
      }
    };

    void restoreSession();
    const { data: authListener } = client.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      if (!nextSession) setAccount(null);
    });
    return () => {
      alive = false;
      authListener.subscription.unsubscribe();
    };
  }, [setError]);

  return { session, setSession, account, setAccount, loading };
}
