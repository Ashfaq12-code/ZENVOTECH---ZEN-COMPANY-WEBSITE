import { Bell, BriefcaseBusiness, Globe2, LogOut, MessageSquareText, ShieldCheck, X } from 'lucide-react';
import type { AdminNotification } from './supabase';
import { formatRelativeTime } from './supabase';

type TopbarProps = {
  unreadCount: number;
  notificationsOpen: boolean;
  onToggleNotifications: () => void;
  onSignOut: () => void;
};

export function AdminTopbar({ unreadCount, notificationsOpen, onToggleNotifications, onSignOut }: TopbarProps) {
  return (
    <header className="admin-topbar">
      <a className="admin-brand" href="/"><span className="admin-brand-icon"><ShieldCheck size={17} /></span><strong>Zenvo<span> Tech</span></strong><i /> <small>ADMIN</small></a>
      <div className="admin-topbar-actions">
        <a className="admin-view-site" href="/"><Globe2 size={15} /> View site</a>
        <div className="admin-notification-wrap">
          <button
            className="admin-icon-button"
            aria-label="Notifications"
            aria-expanded={notificationsOpen}
            aria-controls="admin-activity-drawer"
            onClick={onToggleNotifications}
          >
            <Bell size={17} />{unreadCount > 0 && <span className="admin-notification-count">{unreadCount}</span>}
          </button>
        </div>
        <button className="admin-button admin-button--quiet" onClick={onSignOut}><LogOut size={15} /> Sign out</button>
      </div>
    </header>
  );
}

export function NotificationsDrawer({ open, notifications, onClose }: { open: boolean; notifications: AdminNotification[]; onClose: () => void }) {
  return (
    <>
      <button
        className={`admin-drawer-backdrop${open ? ' is-open' : ''}`}
        aria-label="Close notifications"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <aside
        id="admin-activity-drawer"
        className={`admin-activity-drawer${open ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-activity-title"
        aria-hidden={!open}
      >
        <div className="admin-activity-header">
          <div><p className="admin-kicker">LIVE ADMIN UPDATES</p><h2 id="admin-activity-title">Notifications <span>{notifications.length}</span></h2></div>
          <button className="admin-icon-button admin-activity-close" aria-label="Close notifications" onClick={onClose}><X size={19} /></button>
        </div>
        <div className="admin-activity-list">
          {notifications.length ? notifications.map((notification) => (
            <article className={`admin-notification-item${notification.is_read ? '' : ' is-unread'}`} key={notification.id}>
              <span className="admin-notification-icon">{notification.kind === 'project' ? <BriefcaseBusiness size={16} /> : <MessageSquareText size={16} />}</span>
              <div className="admin-notification-copy"><strong>{notification.title}</strong><p>{notification.message}</p><small>{formatRelativeTime(notification.created_at)}</small></div>
              {!notification.is_read && <span className="admin-notification-dot" aria-label="Unread" />}
            </article>
          )) : <div className="admin-activity-empty"><Bell size={24} /><strong>You’re all caught up</strong><p>New project and client review activity will appear here.</p></div>}
        </div>
        <div className="admin-activity-footer"><span className="admin-live-dot" /> Updates arrive in real time</div>
      </aside>
    </>
  );
}
