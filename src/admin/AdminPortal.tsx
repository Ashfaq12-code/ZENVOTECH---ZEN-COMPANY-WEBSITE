import { useEffect, useState } from 'react';
import { Check, LoaderCircle, X } from 'lucide-react';
import { AccountSettings } from './AccountSettings';
import { AdminAuth } from './AdminAuth';
import { AdminTopbar, NotificationsDrawer } from './AdminChrome';
import { AdminOverview } from './AdminOverview';
import { OnlineTeam } from './AdminTeam';
import type { Tab } from './adminData';
import { CallsTab } from './CallsTab';
import { ProjectsTab } from './ProjectsTab';
import { ReviewsTab } from './ReviewsTab';
import { supabaseClient } from './supabaseClient';
import { useAdminActions } from './useAdminActions';
import { useAdminDashboard } from './useAdminDashboard';
import { useAdminPageMeta } from './useAdminPageMeta';
import { useAdminProfiles, useOnlineAdmins } from './useAdminRoster';
import { useAdminSession } from './useAdminSession';
import './AdminPortal.css';
import './PublicContent.css';

// Static testimonials shown next to database reviews in the admin list.
const STATIC_REVIEW_COUNT = 10;

function AdminPortal() {
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const [tab, setTab] = useState<Tab>('projects');
  const [showNotifications, setShowNotifications] = useState(false);
  useAdminPageMeta();
  const { session, setSession, account, setAccount, loading } = useAdminSession(setError);
  const dashboard = useAdminDashboard(session, setError, setToast);
  const currentAdminName = account?.username ?? session?.user.user_metadata?.username ?? 'Admin';
  const { adminProfiles, setAdminProfiles } = useAdminProfiles(session, setError);
  const onlineAdmins = useOnlineAdmins(session, currentAdminName, setError);
  const actions = useAdminActions({ session, currentAdminName, ...dashboard, setError, setToast });
  useToastTimeout(toast, setToast);
  useDrawerLock(showNotifications, setShowNotifications);

  if (loading) {
    return <main className="admin-shell admin-loading"><LoaderCircle className="admin-spinner" size={26} /> Loading admin portal…</main>;
  }

  if (!session) {
    return <AdminAuth onAuthenticated={(nextSession, nextAccount) => { setSession(nextSession); setAccount(nextAccount); setError(''); }} error={error} setError={setError} />;
  }

  const { projects, reviews, callLogs, notifications } = dashboard;
  const ownAvatar = adminProfiles.find((profile) => profile.user_id === session.user.id)?.avatar_url ?? null;
  const signOut = async () => {
    const { error: signOutError } = await (supabaseClient?.auth.signOut() ?? Promise.resolve({ error: null }));
    if (signOutError) setError(signOutError.message);
    setAccount(null);
    setSession(null);
  };

  return (
    <main className="admin-shell">
      <AdminTopbar
        unreadCount={notifications.filter((notification) => !notification.is_read).length}
        notificationsOpen={showNotifications}
        onToggleNotifications={() => {
          setShowNotifications(!showNotifications);
          if (!showNotifications) void actions.markNotificationsRead();
        }}
        onSignOut={() => void signOut()}
      />
      <NotificationsDrawer open={showNotifications} notifications={notifications} onClose={() => setShowNotifications(false)} />

      <div className="admin-content">
        <AdminOverview
          adminName={currentAdminName}
          accountName={account?.username ?? 'Admin'}
          ownAvatar={ownAvatar}
          counts={{ projects: projects.length, reviews: STATIC_REVIEW_COUNT + reviews.length, calls: callLogs.length }}
          tab={tab}
          onTab={setTab}
        >
          <OnlineTeam onlineAdmins={onlineAdmins} adminProfiles={adminProfiles} currentUserId={session.user.id} />
        </AdminOverview>

        {error && <div className="admin-alert admin-alert--error" role="alert"><X size={16} />{error}<button aria-label="Dismiss error" onClick={() => setError('')}><X size={15} /></button></div>}
        {toast && <div className="admin-toast" role="status"><Check size={16} />{toast}</div>}

        {tab === 'projects' && (
          <ProjectsTab
            projects={projects}
            adminName={currentAdminName}
            onCreated={(project) => {
              if (project) dashboard.setProjects((current) => [project, ...current.filter((item) => item.id !== project.id)]);
              void dashboard.loadDashboard().catch(() => undefined);
              setToast('Project added and shared with all admins.');
            }}
            onDelete={(project) => void actions.deleteProject(project)}
            setError={setError}
          />
        )}
        {tab === 'reviews' && <ReviewsTab reviews={reviews} onDelete={(review) => void actions.deleteReview(review)} />}
        {tab === 'calls' && <CallsTab callLogs={callLogs} currentAdminName={currentAdminName} onAssign={(callLog) => void actions.assignCallToMe(callLog)} onDelete={(callLog) => void actions.deleteCallLog(callLog)} />}
        {tab === 'settings' && <AccountSettings account={account} session={session} avatarUrl={ownAvatar} onUpdated={setAccount} onAvatarUpdated={(avatarUrl) => setAdminProfiles((profiles) => profiles.map((profile) => profile.user_id === session.user.id ? { ...profile, avatar_url: avatarUrl } : profile))} setError={setError} />}
      </div>
    </main>
  );
}

function useToastTimeout(toast: string, setToast: (message: string) => void) {
  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 4000);
    return () => window.clearTimeout(timer);
  }, [toast, setToast]);
}

function useDrawerLock(open: boolean, setOpen: (open: boolean) => void) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [open, setOpen]);
}

export default AdminPortal;
