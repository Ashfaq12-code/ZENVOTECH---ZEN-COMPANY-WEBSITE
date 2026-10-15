import { useCallback, useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { AdminNotification, AdminProject, CallClickLog, ClientReview } from './supabase';
import { supabaseClient } from './supabaseClient';

type Notify = (message: string) => void;

export function useAdminDashboard(session: Session | null, setError: Notify, setToast: Notify) {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [callLogs, setCallLogs] = useState<CallClickLog[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  const loadDashboard = useCallback(async () => {
    const client = supabaseClient;
    if (!client) return;
    const [projectResult, reviewResult, notificationResult, callLogResult] = await Promise.all([
      client.from('projects').select('*').order('created_at', { ascending: false }),
      client.from('client_reviews').select('*').order('created_at', { ascending: false }),
      client.from('admin_notifications').select('*').order('created_at', { ascending: false }).limit(30),
      client.from('call_click_logs').select('*').order('created_at', { ascending: false }).limit(200),
    ]);
    if (projectResult.data) setProjects(projectResult.data);
    if (reviewResult.data) setReviews(reviewResult.data);
    if (callLogResult.data) setCallLogs(callLogResult.data);
    if (notificationResult.data) setNotifications(notificationResult.data);
    // Only a projects failure blocks the dashboard; other sections show what loaded.
    if (projectResult.error) throw projectResult.error;
    const sectionError = reviewResult.error ?? notificationResult.error ?? callLogResult.error;
    if (sectionError) setError(sectionError.message);
  }, [setError]);

  useDashboardRealtime(session, loadDashboard, setError, setToast, setNotifications);

  return { projects, setProjects, reviews, callLogs, setCallLogs, notifications, setNotifications, loadDashboard };
}

function useDashboardRealtime(
  session: Session | null,
  loadDashboard: () => Promise<void>,
  setError: Notify,
  setToast: Notify,
  setNotifications: (update: (current: AdminNotification[]) => AdminNotification[]) => void,
) {
  useEffect(() => {
    const client = supabaseClient;
    if (!session || !client) return;
    let alive = true;
    const refresh = (fallback: string) => {
      void loadDashboard().catch((caught: unknown) => {
        if (alive) setError(caught instanceof Error ? caught.message : fallback);
      });
    };
    refresh('Could not load the dashboard.');

    const channel = client
      .channel('admin-live-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, (payload) => {
        refresh('Could not refresh projects.');
        if (payload.eventType === 'INSERT') setToast(projectToast(payload.new));
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'client_reviews' }, (payload) => {
        refresh('Could not refresh reviews.');
        if (payload.eventType === 'INSERT') setToast('A client review was submitted.');
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'call_click_logs' }, (payload) => {
        refresh('Could not refresh call click logs.');
        if (payload.eventType === 'INSERT') setToast('A visitor tapped a phone number.');
      })
      .on<AdminNotification>('postgres_changes', { event: 'INSERT', schema: 'public', table: 'admin_notifications' }, (payload) => {
        const incoming = payload.new;
        setNotifications((current) => [incoming, ...current.filter((item) => item.id !== incoming.id)].slice(0, 30));
      })
      .subscribe();

    return () => {
      alive = false;
      void client.removeChannel(channel);
    };
  }, [session, loadDashboard, setError, setToast, setNotifications]);
}

function projectToast(row: Partial<AdminProject>): string {
  const typeLabel = row.project_type === 'app' ? 'App' : row.project_type === 'desktop' ? 'Desktop' : 'Web';
  const author = row.created_by_admin ? `${row.created_by_admin} added ` : '';
  return `${author}${typeLabel} project: ${row.name ?? ''}`;
}
