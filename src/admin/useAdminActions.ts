import type { Dispatch, SetStateAction } from 'react';
import type { Session } from '@supabase/supabase-js';
import type { AdminNotification, AdminProject, CallClickLog, ClientReview } from './supabase';
import { supabaseClient as supabase } from './supabaseClient';

type ActionDeps = {
  session: Session | null;
  currentAdminName: string;
  notifications: AdminNotification[];
  setCallLogs: Dispatch<SetStateAction<CallClickLog[]>>;
  setNotifications: Dispatch<SetStateAction<AdminNotification[]>>;
  setError: (message: string) => void;
  setToast: (message: string) => void;
};

export function useAdminActions({ session, currentAdminName, notifications, setCallLogs, setNotifications, setError, setToast }: ActionDeps) {
  const assignCallToMe = async (callLog: CallClickLog) => {
    if (!supabase) return;
    const { data, error: updateError } = await supabase
      .from('call_click_logs')
      .update({ assigned_admin: currentAdminName })
      .eq('id', callLog.id)
      .select('*')
      .single();
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setCallLogs((current) => current.map((item) => item.id === data.id ? data : item));
    setToast(`Call click assigned to ${currentAdminName}.`);
  };

  const deleteCallLog = async (callLog: CallClickLog) => {
    if (!supabase) return;
    const { error: deleteError } = await supabase.from('call_click_logs').delete().eq('id', callLog.id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setCallLogs((current) => current.filter((item) => item.id !== callLog.id));
    setToast('Call log removed.');
  };

  const deleteProject = async (project: AdminProject) => {
    if (!supabase) return;
    const { error: deleteError } = await supabase.from('projects').delete().eq('id', project.id);
    if (deleteError) setError(deleteError.message);
  };

  const deleteReview = async (review: ClientReview) => {
    if (!supabase) return;
    const { error: deleteError } = await supabase.from('client_reviews').delete().eq('id', review.id);
    if (deleteError) setError(deleteError.message);
  };

  const markNotificationsRead = async () => {
    if (!supabase || !session) return;
    const unreadIds = notifications.filter((notification) => !notification.is_read).map((notification) => notification.id);
    if (!unreadIds.length) return;
    const { error: updateError } = await supabase
      .from('admin_notifications')
      .update({ is_read: true })
      .in('id', unreadIds)
      .eq('owner_id', session.user.id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setNotifications((current) => current.map((notification) => ({ ...notification, is_read: true })));
  };

  return { assignCallToMe, deleteCallLog, deleteProject, deleteReview, markNotificationsRead };
}
