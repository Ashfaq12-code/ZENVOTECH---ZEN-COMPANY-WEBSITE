import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { AdminProfile, OnlineAdmin } from './adminData';
import { supabaseClient } from './supabaseClient';

type Notify = (message: string) => void;

export function useAdminProfiles(session: Session | null, setError: Notify) {
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);

  useEffect(() => {
    const client = supabaseClient;
    if (!session || !client) return;
    let active = true;
    const refreshAdminProfiles = async () => {
      const { data, error: rosterError } = await client.rpc('get_admin_roster');
      if (rosterError) throw rosterError;
      if (active) setAdminProfiles(data ?? []);
    };
    const refresh = (fallback: string) => {
      void refreshAdminProfiles().catch((caught: unknown) => {
        if (active) setError(caught instanceof Error ? caught.message : fallback);
      });
    };
    refresh('Could not load admin profiles.');
    const profilesChannel = client
      .channel('admin-profile-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_profiles' }, () => refresh('Could not refresh admin profiles.'))
      .subscribe();
    return () => {
      active = false;
      void client.removeChannel(profilesChannel);
      setAdminProfiles([]);
    };
  }, [session, setError]);

  return { adminProfiles, setAdminProfiles };
}

export function useOnlineAdmins(session: Session | null, username: string, setError: Notify) {
  const [onlineAdmins, setOnlineAdmins] = useState<OnlineAdmin[]>([]);

  useEffect(() => {
    const client = supabaseClient;
    if (!session || !client) return;
    const channel = client.channel('admin-online-presence', {
      config: { presence: { key: session.user.id } },
    });

    const refreshOnlineAdmins = () => {
      const presence = channel.presenceState<OnlineAdmin>();
      const byUserId = new Map<string, OnlineAdmin>();
      Object.values(presence).flat().forEach((entry) => {
        byUserId.set(entry.user_id, { user_id: entry.user_id, username: entry.username });
      });
      setOnlineAdmins(Array.from(byUserId.values()).sort((left, right) => left.username.localeCompare(right.username)));
    };

    channel
      .on('presence', { event: 'sync' }, refreshOnlineAdmins)
      .on('presence', { event: 'join' }, refreshOnlineAdmins)
      .on('presence', { event: 'leave' }, refreshOnlineAdmins)
      .subscribe(async (status) => {
        if (status !== 'SUBSCRIBED') return;
        const trackStatus = await channel.track({
          user_id: session.user.id,
          username,
          online_at: new Date().toISOString(),
        });
        if (trackStatus !== 'ok') setError(`Could not share your online status (${trackStatus}).`);
      });

    return () => {
      void client.removeChannel(channel);
      setOnlineAdmins([]);
    };
  }, [session, username, setError]);

  return onlineAdmins;
}
