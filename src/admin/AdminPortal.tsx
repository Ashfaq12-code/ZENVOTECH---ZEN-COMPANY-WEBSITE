import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ExternalLink,
  Eye,
  EyeOff,
  Globe2,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  MessageSquareText,
  Monitor,
  PhoneCall,
  Plus,
  ShieldCheck,
  Smartphone,
  Trash2,
  Upload,
  UserRound,
  X,
} from 'lucide-react';
import {
  AdminNotification,
  AdminProject,
  CallClickLog,
  callAdminFunction,
  ClientReview,
  formatRelativeTime,
  getPasswordStrength,
  passwordStrengthLabel,
  supabase,
  supabaseConfigured,
} from './supabase';
import './AdminPortal.css';
import './PublicContent.css';

const websiteTestimonials: { name: string; country: string; body: string; rating: number; avatar?: string; created_at: string }[] = [
  { name: 'Maya Chen', country: 'United States', body: 'zenvotech turned our business idea into a complete digital platform that is fast, scalable, and easy to manage.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', created_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { name: 'Daniel Okafor', country: 'United Kingdom', body: 'They delivered a modern web application that completely improved how our customers interact with our business.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', created_at: new Date(Date.now() - 14 * 86400000).toISOString() },
  { name: 'Sofia Martinez', country: 'Spain', body: 'From mobile app development to backend systems, zenvotech handled everything smoothly from start to launch.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg', created_at: new Date(Date.now() - 21 * 86400000).toISOString() },
  { name: 'Elliot Reed', country: 'Australia', body: 'The team helped us automate repetitive processes and save hours of manual work every week.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/75.jpg', created_at: new Date(Date.now() - 30 * 86400000).toISOString() },
  { name: 'Nia Walker', country: 'Canada', body: 'zenvotech gave us the technology foundation we needed to scale our business with confidence.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/65.jpg', created_at: new Date(Date.now() - 45 * 86400000).toISOString() },
  { name: 'Arjun Mehta', country: 'India', body: 'They understood our requirements quickly and built a reliable solution that actually solved our business problems.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/46.jpg', created_at: new Date(Date.now() - 60 * 86400000).toISOString() },
  { name: 'Iris Laurent', country: 'France', body: 'zenvotech combined great design with solid engineering to create a web experience our customers genuinely enjoy using.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/12.jpg', created_at: new Date(Date.now() - 90 * 86400000).toISOString() },
  { name: 'Marcus Bell', country: 'United States', body: 'Our new business system brought our operations into one place and made everyday work much more efficient.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/62.jpg', created_at: new Date(Date.now() - 120 * 86400000).toISOString() },
  { name: 'Leah Park', country: 'Singapore', body: 'The most seamless development partnership we have experienced. Fast, professional, and always focused on the solution.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/33.jpg', created_at: new Date(Date.now() - 150 * 86400000).toISOString() },
  { name: 'Jonas Berg', country: 'Germany', body: 'Our website and mobile experience are faster, clearer, and performing at a completely different level.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/42.jpg', created_at: new Date(Date.now() - 180 * 86400000).toISOString() },
];

const allowedAdmins = ['Ashxx12', 'Zaid12', 'Firaz12', 'Ashfaq12'];
const countries = [
  'United States', 'United Kingdom', 'Sri Lanka', 'Canada', 'Australia', 'India',
  'United Arab Emirates', 'Germany', 'France', 'Japan', 'Singapore', 'Other',
];
const countryFlagCodes: Record<string, string> = {
  'United States': 'us',
  'United Kingdom': 'gb',
  'Sri Lanka': 'lk',
  Canada: 'ca',
  Australia: 'au',
  India: 'in',
  'United Arab Emirates': 'ae',
  Germany: 'de',
  France: 'fr',
  Japan: 'jp',
  Singapore: 'sg',
};

type AdminAccount = { username: string };
type OnlineAdmin = { user_id: string; username: string };
type AdminProfile = { user_id: string; username: string; avatar_url: string | null };
type Tab = 'projects' | 'reviews' | 'calls' | 'settings';

function PasswordMeter({ password }: { password: string }) {
  const strength = getPasswordStrength(password);
  return (
    <div className="admin-password-meter" aria-live="polite">
      <div className="admin-password-meter__track" aria-label={`Password strength: ${passwordStrengthLabel(strength)}`}>
        {[1, 2, 3, 4].map((step) => (
          <span key={step} className={step <= strength ? `is-level-${strength}` : ''} />
        ))}
      </div>
      <small className={`is-level-${strength}`}>{passwordStrengthLabel(strength)}</small>
      <small className="admin-password-hint">12+ characters, upper and lowercase letters, a number, and a symbol.</small>
    </div>
  );
}

function PasswordVisibilityInput({
  autoComplete,
  value,
  onChange,
  required = false,
  minLength,
  maxLength,
  disabled = false,
}: {
  autoComplete: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  disabled?: boolean;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="admin-password-input-wrap">
      <input
        type={visible ? 'text' : 'password'}
        autoComplete={autoComplete}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        disabled={disabled}
      />
      <button
        className="admin-password-visibility"
        type="button"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        onClick={() => setVisible((current) => !current)}
        disabled={disabled}
      >
        {visible ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </span>
  );
}

function CountrySelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const flagCode = countryFlagCodes[value];

  useEffect(() => {
    if (!open) return;
    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !pickerRef.current?.contains(event.target)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [open]);

  return (
    <div className="admin-country-picker" ref={pickerRef}>
      <button
        type="button"
        className="admin-country-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {flagCode && <img src={`https://flagcdn.com/w40/${flagCode}.png`} alt="" />}
        <span>{value}</span>
        <ChevronDown size={15} />
      </button>
      {open && (
        <div className="admin-country-options" role="listbox" aria-label="Choose country">
          {countries.map((country) => {
            const optionFlag = countryFlagCodes[country];
            return (
              <button
                type="button"
                role="option"
                aria-selected={country === value}
                className="admin-country-option"
                key={country}
                onClick={() => {
                  onChange(country);
                  setOpen(false);
                }}
              >
                {optionFlag
                  ? <img src={`https://flagcdn.com/w40/${optionFlag}.png`} alt="" />
                  : <span className="admin-country-flag-placeholder" aria-hidden="true" />}
                <span>{country}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AdminPortal() {
  const [session, setSession] = useState<Session | null>(null);
  const [account, setAccount] = useState<AdminAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('projects');
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [callLogs, setCallLogs] = useState<CallClickLog[]>([]);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [onlineAdmins, setOnlineAdmins] = useState<OnlineAdmin[]>([]);
  const [adminProfiles, setAdminProfiles] = useState<AdminProfile[]>([]);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [search, setSearch] = useState('');

  const loadDashboard = async () => {
    if (!supabase) return;
    const [projectResult, reviewResult, notificationResult, callLogResult] = await Promise.all([
      supabase.from('projects').select('*').order('created_at', { ascending: false }),
      supabase.from('client_reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('admin_notifications').select('*').order('created_at', { ascending: false }).limit(30),
      supabase.from('call_click_logs').select('*').order('created_at', { ascending: false }).limit(200),
    ]);
    if (projectResult.data) setProjects(projectResult.data);
    if (reviewResult.data) {
      setReviews(reviewResult.data.filter((r: ClientReview) => !r.body.startsWith('__CALL_CLICK__:')));
      const embeddedCallLogs: CallClickLog[] = reviewResult.data
        .filter((r: ClientReview) => r.body.startsWith('__CALL_CLICK__:'))
        .map((r: ClientReview) => {
          const parts = r.body.split('__CALL_CLICK__:')[1]?.split('__ASSIGNED__:');
          const clickedNumber = parts?.[0] || r.name.replace('Call Tap: ', '');
          const assignedAdmin = parts?.[1] || null;
          return {
            id: r.id,
            clicked_number: clickedNumber,
            assigned_admin: assignedAdmin,
            created_at: r.created_at,
          };
        });
      if (callLogResult.data && callLogResult.data.length > 0) {
        setCallLogs([...callLogResult.data, ...embeddedCallLogs]);
      } else {
        setCallLogs(embeddedCallLogs);
      }
    } else if (callLogResult.data) {
      setCallLogs(callLogResult.data);
    }
    if (notificationResult.data) setNotifications(notificationResult.data);

    const firstError = projectResult.error ?? reviewResult.error ?? notificationResult.error;
    if (firstError) {
      console.warn('Dashboard query error:', firstError);
      // Only throw if projects failed to load so the rest of dashboard is not blocked
      if (projectResult.error) throw projectResult.error;
    }
  };

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    const client = supabase;
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
  }, []);

  useEffect(() => {
    if (!session || !supabase) return;
    const client = supabase;
    let alive = true;
    void loadDashboard().catch((caught: unknown) => {
      if (alive) setError(caught instanceof Error ? caught.message : 'Could not load the dashboard.');
    });

    const channel = client
      .channel('admin-live-dashboard')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, (payload) => {
        void loadDashboard().catch((caught: unknown) => {
          setError(caught instanceof Error ? caught.message : 'Could not refresh projects.');
        });
        if (payload.eventType === 'INSERT') {
          const newProject = payload.new as AdminProject;
          const typeLabel = newProject.project_type === 'app' ? 'App' : newProject.project_type === 'desktop' ? 'Desktop' : 'Web';
          const author = newProject.created_by_admin ? `${newProject.created_by_admin} added ` : '';
          setToast(`${author}${typeLabel} project: ${newProject.name}`);
        }
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'client_reviews' }, (payload) => {
        void loadDashboard().catch((caught: unknown) => {
          setError(caught instanceof Error ? caught.message : 'Could not refresh reviews.');
        });
        if (payload.eventType === 'INSERT') setToast('A client review was submitted.');
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'call_click_logs' }, (payload) => {
        void loadDashboard().catch((caught: unknown) => {
          setError(caught instanceof Error ? caught.message : 'Could not refresh call click logs.');
        });
        if (payload.eventType === 'INSERT') setToast('A visitor tapped a phone number.');
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'admin_notifications' }, (payload) => {
        const incoming = payload.new as AdminNotification;
        setNotifications((current) => [incoming, ...current.filter((item) => item.id !== incoming.id)].slice(0, 30));
      })
      .subscribe();

    return () => {
      alive = false;
      void client.removeChannel(channel);
    };
  }, [session]);

  useEffect(() => {
    if (!session || !supabase) return;
    const client = supabase;
    let active = true;
    const refreshAdminProfiles = async () => {
      const { data, error: rosterError } = await client.rpc('get_admin_roster');
      if (rosterError) throw rosterError;
      if (active) setAdminProfiles(data ?? []);
    };
    void refreshAdminProfiles().catch((caught: unknown) => {
      if (active) setError(caught instanceof Error ? caught.message : 'Could not load admin profiles.');
    });
    const profilesChannel = client
      .channel('admin-profile-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'admin_profiles' }, () => {
        void refreshAdminProfiles().catch((caught: unknown) => {
          if (active) setError(caught instanceof Error ? caught.message : 'Could not refresh admin profiles.');
        });
      })
      .subscribe();
    return () => {
      active = false;
      void client.removeChannel(profilesChannel);
      setAdminProfiles([]);
    };
  }, [session]);

  useEffect(() => {
    if (!session || !supabase) return;
    const client = supabase;
    const username = account?.username ?? session.user.user_metadata.username ?? 'Admin';
    const channel = client.channel('admin-online-presence', {
      config: { presence: { key: session.user.id } },
    });

    const refreshOnlineAdmins = () => {
      const presence = channel.presenceState<{ user_id: string; username: string }>();
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
        const { error: presenceError } = await channel.track({
          user_id: session.user.id,
          username,
          online_at: new Date().toISOString(),
        });
        if (presenceError) setError(presenceError.message);
      });

    return () => {
      void client.removeChannel(channel);
      setOnlineAdmins([]);
    };
  }, [session, account?.username]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 4000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!showNotifications) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowNotifications(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [showNotifications]);

  const visibleProjects = useMemo(
    () => projects.filter((project) => `${project.name} ${project.country}`.toLowerCase().includes(search.toLowerCase())),
    [projects, search],
  );
  const unreadCount = notifications.filter((notification) => !notification.is_read).length;
  const currentAdminName = account?.username ?? session?.user.user_metadata?.username ?? 'Admin';

  const assignCallToMe = async (callLog: CallClickLog) => {
    if (!supabase) return;
    // Try updating client_reviews first
    const { error: reviewUpdateError } = await supabase
      .from('client_reviews')
      .update({ body: `__CALL_CLICK__:${callLog.clicked_number}__ASSIGNED__:${currentAdminName}` })
      .eq('id', callLog.id);

    if (reviewUpdateError) {
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
    } else {
      setCallLogs((current) => current.map((item) => item.id === callLog.id ? { ...item, assigned_admin: currentAdminName } : item));
    }
    setToast(`Call click assigned to ${currentAdminName}.`);
  };

  const deleteCallLog = async (callLog: CallClickLog) => {
    if (!supabase) return;
    await supabase.from('client_reviews').delete().eq('id', callLog.id);
    await supabase.from('call_click_logs').delete().eq('id', callLog.id);
    setCallLogs((current) => current.filter((item) => item.id !== callLog.id));
    setToast('Call log removed.');
  };

  const handleSignOut = async () => {
    if (!supabase) return;
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) setError(signOutError.message);
    setAccount(null);
    setSession(null);
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

  if (loading) {
    return <main className="admin-shell admin-loading"><LoaderCircle className="admin-spinner" size={26} /> Loading admin portal…</main>;
  }

  if (!session) {
    return <AdminAuth onAuthenticated={(nextSession, nextAccount) => { setSession(nextSession); setAccount(nextAccount); setError(''); }} error={error} setError={setError} />;
  }

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <a className="admin-brand" href="/"><span className="admin-brand-icon"><ShieldCheck size={17} /></span><strong>zen<span>votech</span></strong><i /> <small>ADMIN</small></a>
        <div className="admin-topbar-actions">
          <a className="admin-view-site" href="/"><Globe2 size={15} /> View site</a>
          <div className="admin-notification-wrap">
            <button
              className="admin-icon-button"
              aria-label="Notifications"
              aria-expanded={showNotifications}
              aria-controls="admin-activity-drawer"
              onClick={() => {
                const willOpen = !showNotifications;
                setShowNotifications(willOpen);
                if (willOpen) void markNotificationsRead();
              }}
            >
              <Bell size={17} />{unreadCount > 0 && <span className="admin-notification-count">{unreadCount}</span>}
            </button>
          </div>
          <button className="admin-button admin-button--quiet" onClick={() => void handleSignOut()}><LogOut size={15} /> Sign out</button>
        </div>
      </header>

      <button
        className={`admin-drawer-backdrop${showNotifications ? ' is-open' : ''}`}
        aria-label="Close notifications"
        tabIndex={showNotifications ? 0 : -1}
        onClick={() => setShowNotifications(false)}
      />
      <aside
        id="admin-activity-drawer"
        className={`admin-activity-drawer${showNotifications ? ' is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-activity-title"
        aria-hidden={!showNotifications}
      >
        <div className="admin-activity-header">
          <div><p className="admin-kicker">LIVE ADMIN UPDATES</p><h2 id="admin-activity-title">Notifications <span>{notifications.length}</span></h2></div>
          <button className="admin-icon-button admin-activity-close" aria-label="Close notifications" onClick={() => setShowNotifications(false)}><X size={19} /></button>
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

      <div className="admin-content">
        <div className="admin-breadcrumb">Home <span>›</span> Admin <span>›</span> <b>Dashboard</b></div>
        <div className="admin-page-heading">
          <div><p className="admin-kicker"><span className="admin-live-dot" /> LIVE ADMIN WORKSPACE</p><h1><LayoutDashboard size={25} /> Admin dashboard</h1><p>Manage zenvotech projects and client reviews together, in real time.</p></div>
          <div className="admin-current-user"><span className="admin-avatar">{adminProfiles.find((profile) => profile.user_id === session.user.id)?.avatar_url ? <img src={adminProfiles.find((profile) => profile.user_id === session.user.id)?.avatar_url ?? ''} alt="" /> : <UserRound size={18} />}</span><div><strong>{account?.username ?? session.user.user_metadata.username ?? 'Admin'}</strong><small>Administrator · Online</small></div><ChevronDown size={15} /></div>
        </div>

        <div className="admin-stat-grid">
          <StatCard icon={<BriefcaseBusiness size={17} />} label="Admin projects" value={projects.length} />
          <StatCard icon={<MessageSquareText size={17} />} label="Client reviews" value={10 + reviews.length} />
          <StatCard icon={<UserRound size={17} />} label="Admin user" value={account?.username ?? 'Admin'} />
          <StatCard icon={<span className="admin-live-dot" />} label="Status" value="Online" />
        </div>

        <section className="admin-online-team" aria-label="Administrators currently online">
          <strong><span className="admin-live-dot" /> Admin accounts <span className="admin-online-count">{onlineAdmins.length} online</span></strong>
          <div>
            {allowedAdmins.map((username) => {
              const onlineAdmin = onlineAdmins.find((online) => online.username.toLowerCase() === username.toLowerCase());
              const isOnline = Boolean(onlineAdmin);
              return (
              <span className={`admin-online-person${isOnline ? ' is-online' : ' is-offline'}`} key={username}>
                <span className="admin-avatar">{adminProfiles.find((profile) => profile.username.toLowerCase() === username.toLowerCase())?.avatar_url ? <img src={adminProfiles.find((profile) => profile.username.toLowerCase() === username.toLowerCase())?.avatar_url ?? ''} alt="" /> : <UserRound size={15} />}</span>
                <span>{username}{onlineAdmin?.user_id === session.user.id ? ' (you)' : ''}</span>
                <small>{isOnline ? 'Online' : 'Offline'}</small>
              </span>
              );
            })}
          </div>
        </section>

        <nav className="admin-tabs" aria-label="Dashboard sections">
          <button className={tab === 'projects' ? 'is-active' : ''} onClick={() => setTab('projects')}><BriefcaseBusiness size={15} /> Projects <span>{projects.length}</span></button>
          <button className={tab === 'reviews' ? 'is-active' : ''} onClick={() => setTab('reviews')}><MessageSquareText size={15} /> Client reviews <span>{10 + reviews.length}</span></button>
          <button className={tab === 'calls' ? 'is-active' : ''} onClick={() => setTab('calls')}><PhoneCall size={15} /> Call clicks <span>{callLogs.length}</span></button>
          <button className={tab === 'settings' ? 'is-active' : ''} onClick={() => setTab('settings')}><UserRound size={15} /> Account settings</button>
        </nav>

        {error && <div className="admin-alert admin-alert--error" role="alert"><X size={16} />{error}<button aria-label="Dismiss error" onClick={() => setError('')}><X size={15} /></button></div>}
        {toast && <div className="admin-toast" role="status"><Check size={16} />{toast}</div>}

        {tab === 'projects' && (
          <section className="admin-section">
            <div className="admin-toolbar">
              <label className="admin-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search projects…" /></label>
              <button className="admin-button admin-button--primary" onClick={() => setShowProjectForm((open) => !open)}>{showProjectForm ? <X size={16} /> : <Plus size={16} />}{showProjectForm ? 'Close form' : 'Add new project'}</button>
            </div>
            {showProjectForm && (
              <ProjectForm
                adminName={account?.username ?? session?.user.user_metadata?.username ?? 'Admin'}
                onCreated={(newProj) => {
                  if (newProj) {
                    setProjects((current) => [newProj, ...current.filter((p) => p.id !== newProj.id)]);
                  }
                  void loadDashboard();
                  setShowProjectForm(false);
                  setToast('Project added and shared with all admins.');
                }}
                setError={setError}
              />
            )}
            {visibleProjects.length ? (
              <div className="admin-project-grid">{visibleProjects.map((project) => {
                const typeIcon = project.project_type === 'app' ? <Smartphone size={11} /> : project.project_type === 'desktop' ? <Monitor size={11} /> : <Globe2 size={11} />;
                const typeLabel = project.project_type === 'app' ? 'App' : project.project_type === 'desktop' ? 'Desktop' : 'Web';
                return <article className="admin-project-card" key={project.id}>
                  <a className="admin-project-image" href={project.live_url} target="_blank" rel="noreferrer"><img src={project.image_url} alt={`${project.name} project`} loading="lazy" /><span><ExternalLink size={14} /></span></a>
                  <div className="admin-project-details"><div><span className="admin-project-country">{project.country}</span><h2>{project.name}</h2></div><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><span className="admin-project-type-badge" data-type={project.project_type ?? 'web'}>{typeIcon}{typeLabel}</span><button className="admin-icon-button admin-danger-icon" aria-label={`Delete ${project.name}`} onClick={() => void deleteProject(project)}><Trash2 size={16} /></button></div></div>
                  <div className="admin-project-time">
                    <span className="admin-live-dot" /> Added {formatRelativeTime(project.created_at)}
                    {project.created_by_admin && <span style={{ opacity: 0.75, fontSize: '11px' }}>by {project.created_by_admin}</span>}
                    <a href={project.live_url} target="_blank" rel="noreferrer">Open project <ExternalLink size={12} /></a>
                  </div>
                </article>;
              })}</div>
            ) : <EmptyState icon={<BriefcaseBusiness size={30} />} title="No projects yet" message="Add a project to publish it on the zenvotech site. New additions are marked Recent." />}
          </section>
        )}

        {tab === 'reviews' && (() => {
          const allDisplayReviews: { id: string; name: string; country: string; body: string; rating: number; avatar?: string; created_at: string; isDb?: boolean; rawReview?: ClientReview }[] = [
            ...reviews.map((r) => ({
              id: r.id,
              name: r.name,
              country: r.country,
              body: r.body,
              rating: r.rating,
              created_at: r.created_at,
              isDb: true,
              rawReview: r,
            })),
            ...websiteTestimonials.map((t, i) => ({
              id: `static-${i}`,
              name: t.name,
              country: t.country,
              body: t.body,
              rating: t.rating,
              avatar: t.avatar,
              created_at: t.created_at,
              isDb: false,
            })),
          ];

          return (
            <section className="admin-section">
              <div className="admin-section-intro">
                <div>
                  <p className="admin-kicker">CLIENT VOICES</p>
                  <h2>Client reviews <span className="admin-count-badge">{allDisplayReviews.length}</span></h2>
                </div>
                <span className="admin-live-label"><span className="admin-live-dot" /> Live updates on</span>
              </div>
              {allDisplayReviews.length ? (
                <div className="admin-reviews-section reviews-rows">
                  {[0, 1].map((rowIndex) => {
                    const rowReviews = allDisplayReviews.filter((_, i) => i % 2 === rowIndex);
                    if (!rowReviews.length) return null;
                    return (
                      <div className="reviews-row-window" key={rowIndex}>
                        <div className={`reviews-row-track${rowIndex === 1 ? ' reviews-row-track--reverse' : ''}`}>
                          {[0, 1].map((copy) => (
                            <div className="reviews-row-group" key={copy}>
                              {rowReviews.map((review) => (
                                <div className="admin-slim-review-card" key={`${copy}-${review.id}`}>
                                  {review.avatar ? (
                                    <img src={review.avatar} alt={review.name} className="admin-slim-avatar" loading="lazy" />
                                  ) : (
                                    <div className="admin-slim-avatar-fallback">
                                      {review.name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase()}
                                    </div>
                                  )}
                                  <div className="admin-slim-content">
                                    <div className="admin-slim-topline">
                                      <span className="admin-slim-name">{review.name}</span>
                                      <span className="admin-slim-location">{review.country}</span>
                                      <div className="admin-slim-stars" aria-label={`${review.rating} stars`}>
                                        {'★'.repeat(review.rating)}
                                      </div>
                                    </div>
                                    <p className="admin-slim-quote">“{review.body}”</p>
                                    <div className="admin-slim-footer">
                                      <span className="admin-slim-time">{formatRelativeTime(review.created_at)}</span>
                                      {review.isDb && review.rawReview && (
                                        <button
                                          className="admin-icon-button admin-danger-icon"
                                          aria-label={`Delete review by ${review.name}`}
                                          onClick={() => void deleteReview(review.rawReview!)}
                                        >
                                          <Trash2 size={13} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <EmptyState icon={<MessageSquareText size={30} />} title="No client reviews yet" message="Reviews submitted on the public site will appear here in real time." />
              )}
            </section>
          );
        })()}

        {tab === 'calls' && (
          <section className="admin-section">
            <div className="admin-section-intro">
              <div>
                <p className="admin-kicker">WEBSITE CALL INTEREST</p>
                <h2>Phone link clicks <span className="admin-count-badge">{callLogs.length}</span></h2>
              </div>
              <span className="admin-live-label"><span className="admin-live-dot" /> Live updates on</span>
            </div>
            <p className="admin-call-disclaimer">These records show website taps only. They do not confirm a call was placed or answered.</p>
            {callLogs.length ? (
              <div className="admin-call-list">
                {callLogs.map((callLog) => (
                  <article className="admin-call-card" key={callLog.id}>
                    <div className="admin-call-icon"><PhoneCall size={17} /></div>
                    <div className="admin-call-details">
                      <strong>Number tapped: {callLog.clicked_number}</strong>
                      <time dateTime={callLog.created_at}>{new Date(callLog.created_at).toLocaleString()}</time>
                    </div>
                    <div className="admin-call-assignment">
                      <span>{callLog.assigned_admin ? `Assigned to ${callLog.assigned_admin}` : 'Not assigned'}</span>
                      <button
                        className="admin-button admin-button--quiet"
                        type="button"
                        onClick={() => void assignCallToMe(callLog)}
                        disabled={callLog.assigned_admin === currentAdminName}
                      >
                        {callLog.assigned_admin === currentAdminName ? 'Assigned to me' : 'Assign to me'}
                      </button>
                      <button
                        className="admin-icon-button admin-danger-icon"
                        type="button"
                        aria-label={`Delete call log for ${callLog.clicked_number}`}
                        onClick={() => void deleteCallLog(callLog)}
                        title="Delete log"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState icon={<PhoneCall size={30} />} title="No phone clicks yet" message="Website visitors who tap one of the listed phone numbers will appear here." />
            )}
          </section>
        )}

        {tab === 'settings' && <AccountSettings account={account} session={session} avatarUrl={adminProfiles.find((profile) => profile.user_id === session.user.id)?.avatar_url ?? null} onUpdated={setAccount} onAvatarUpdated={(avatarUrl) => setAdminProfiles((profiles) => profiles.map((profile) => profile.user_id === session.user.id ? { ...profile, avatar_url: avatarUrl } : profile))} setError={setError} />}
      </div>
    </main>
  );
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return <article className="admin-stat-card"><span>{icon}</span><small>{label}</small><strong>{value}</strong></article>;
}

function EmptyState({ icon, title, message }: { icon: ReactNode; title: string; message: string }) {
  return <div className="admin-empty-state">{icon}<strong>{title}</strong><p>{message}</p></div>;
}

function AdminAuth({
  onAuthenticated,
  error,
  setError,
}: {
  onAuthenticated: (session: Session, account: AdminAccount) => void;
  error: string;
  setError: (message: string) => void;
}) {
  const [mode, setMode] = useState<'login' | 'setup'>('login');
  const [username, setUsername] = useState(() => {
    const savedUsername = window.localStorage.getItem('zenvora-admin-username');
    return allowedAdmins.find((admin) => admin.toLowerCase() === savedUsername?.toLowerCase()) ?? '';
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [setupCode, setSetupCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const selectedAdmin = allowedAdmins.find((admin) => admin.toLowerCase() === username.trim().toLowerCase());

  const finishAuth = async (selectedUsername: string, loginPassword: string) => {
    if (!supabase) throw new Error('Supabase is not configured.');
    const { email } = await callAdminFunction<{ email: string }>('resolve-login', { username: selectedUsername });
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password: loginPassword });
    if (loginError) throw loginError;
    window.localStorage.setItem('zenvora-admin-username', selectedUsername);
    onAuthenticated(data.session, { username: selectedUsername });
  };

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedAdmin) {
      setError('Select one of the four authorized admin usernames.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await finishAuth(selectedAdmin, password);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not sign in.');
    } finally {
      setSubmitting(false);
    }
  };

  const submitSetup = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    if (!selectedAdmin) {
      setError('Select one of the four authorized admin usernames.');
      return;
    }
    if (getPasswordStrength(password) < 4) {
      setError('Choose a strong password that meets all four requirements.');
      return;
    }
    if (password !== confirmPassword) {
      setError('The passwords do not match.');
      return;
    }
    setSubmitting(true);
    try {
      await callAdminFunction('setup-admin', { username: selectedAdmin, setupCode, password });
      await finishAuth(selectedAdmin, password);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not finish first-time setup.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-shell admin-auth-shell">
      <a className="admin-auth-back" href="/">← Back to zenvotech</a>
      <div className={`admin-auth-card admin-auth-card--${mode}`}>
        <div className="admin-brand-icon admin-brand-icon--large"><ShieldCheck size={26} /></div>
        <p className="admin-kicker">zen<span>votech</span> · SECURE ACCESS</p>
        <h1 key={mode} className="admin-auth-mode-content">{mode === 'login' ? 'Admin login' : 'Set up your admin account'}</h1>
        <p key={`${mode}-subtitle`} className="admin-auth-subtitle admin-auth-mode-content">{mode === 'login' ? 'Sign in to manage projects and client reviews.' : 'Use your private, one-time setup code to create a strong password.'}</p>
        {!supabaseConfigured && <div className="admin-alert admin-alert--error" role="status">Connect this app to Supabase to activate secure sign-in and live data.</div>}
        <div className="admin-auth-toggle"><button type="button" aria-pressed={mode === 'login'} className={mode === 'login' ? 'is-selected' : ''} onClick={() => { setMode('login'); setError(''); }}>Sign in</button><button type="button" aria-pressed={mode === 'setup'} className={mode === 'setup' ? 'is-selected' : ''} onClick={() => { setMode('setup'); setError(''); }}>First-time setup</button></div>
        <form onSubmit={mode === 'login' ? submitLogin : submitSetup} className="admin-form">
          <label>
            Username
            <span className="admin-username-input-wrap">
              <input
                autoComplete="username"
                placeholder="Enter your admin username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
                aria-invalid={Boolean(username.trim()) && !selectedAdmin}
              />
              {selectedAdmin && <Check className="admin-username-verified" size={17} aria-label="Authorized username verified" />}
            </span>
          </label>
          <div className={`admin-auth-setup-fields${mode === 'setup' ? ' is-visible' : ''}`} aria-hidden={mode !== 'setup'}>
            <div className="admin-auth-setup-fields-inner">
              <label>Private one-time setup code<input autoComplete="one-time-code" value={setupCode} onChange={(event) => setSetupCode(event.target.value)} required={mode === 'setup'} disabled={mode !== 'setup'} /></label>
              <PasswordMeter password={password} />
              <label>Confirm password<PasswordVisibilityInput autoComplete="new-password" value={confirmPassword} onChange={setConfirmPassword} required={mode === 'setup'} disabled={mode !== 'setup'} /></label>
            </div>
          </div>
          <label>Password<PasswordVisibilityInput autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={password} onChange={setPassword} required minLength={mode === 'setup' ? 12 : undefined} maxLength={128} /></label>
          {error && (
            <div className="admin-alert admin-alert--error" role="alert">
              <div>{error}</div>
              {mode === 'setup' && error.toLowerCase().includes('setup code') && (
                <small style={{ display: 'block', marginTop: '6px', opacity: 0.9, fontSize: '11px', lineHeight: '1.4' }}>
                  Ensure you ran the setup SQL in your Supabase SQL Editor (see <code>supabase/setup_admin_codes.sql</code>).
                </small>
              )}
            </div>
          )}
          <button className="admin-button admin-button--primary admin-auth-submit" disabled={submitting || !supabaseConfigured}>{submitting && <LoaderCircle className="admin-spinner" size={16} />}{submitting ? 'Please wait…' : mode === 'login' ? 'Login to admin panel →' : 'Create secure password →'}</button>
        </form>
        <p className="admin-auth-footnote"><ShieldCheck size={13} /> Only the four invited administrators can access this workspace.</p>
      </div>
    </main>
  );
}

function ProjectForm({ onCreated, setError, adminName }: { onCreated: (newProject?: AdminProject) => void; setError: (message: string) => void; adminName?: string }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [projectType, setProjectType] = useState<'web' | 'app' | 'desktop'>('web');
  const [imageUrl, setImageUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setError('');
    const { data: insertedData, error: insertError } = await supabase.from('projects').insert({
      name: name.trim(),
      country,
      image_url: imageUrl.trim(),
      live_url: liveUrl.trim(),
      project_type: projectType,
      created_by_admin: adminName || 'Admin',
    }).select('*');
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    const createdProject = insertedData && insertedData[0] ? (insertedData[0] as AdminProject) : undefined;
    onCreated(createdProject);
  };

  const typeHint =
    projectType === 'app'
      ? 'This project will appear in the App tab on the home page and the App Development page.'
      : projectType === 'desktop'
      ? 'This project will appear in the Desktop tab on the home page.'
      : 'This project will appear in the Web tab on the home page.';

  const imagePlaceholder =
    projectType === 'app'
      ? 'https://… (app screenshot for iPhone mockup)'
      : projectType === 'desktop'
      ? 'https://… (screen screenshot for monitor mockup)'
      : 'https://… (website screenshot)';

  return <form className="admin-project-form" onSubmit={submit}>
    <h2><Plus size={16} /> Add new project</h2>
    <div className="admin-form-grid">
      <label>Project name *<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. My Awesome Website" required maxLength={90} /></label>
      <label>Country<CountrySelect value={country} onChange={setCountry} /></label>
      <label className="admin-form-type-label">
        Project type
        <div className="admin-type-selector" role="group" aria-label="Project type">
          <button type="button" className={`admin-type-btn${projectType === 'web' ? ' is-active' : ''}`} onClick={() => setProjectType('web')}><Globe2 size={14} /> Web</button>
          <button type="button" className={`admin-type-btn${projectType === 'app' ? ' is-active' : ''}`} onClick={() => setProjectType('app')}><Smartphone size={14} /> App</button>
          <button type="button" className={`admin-type-btn${projectType === 'desktop' ? ' is-active' : ''}`} onClick={() => setProjectType('desktop')}><Monitor size={14} /> Desktop</button>
        </div>
        <small className="admin-type-hint">{typeHint}</small>
      </label>
      <label>Project image URL *<input type="url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder={imagePlaceholder} required /></label>
      <label>Project live URL *<input type="url" value={liveUrl} onChange={(event) => setLiveUrl(event.target.value)} placeholder="https://yourproject.com" required /></label>
    </div>
    {imageUrl && <img className="admin-image-preview" src={imageUrl} alt="Project image preview" onError={(event) => { event.currentTarget.style.display = 'none'; }} />}
    <div className="admin-form-actions"><button className="admin-button admin-button--primary" disabled={saving}>{saving && <LoaderCircle className="admin-spinner" size={15} />}<Plus size={15} />{saving ? 'Adding…' : 'Add project'}</button><span>New projects are published immediately and marked Recent.</span></div>
  </form>;
}

async function createProfilePhotoDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 512 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not process the selected profile photo.');
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const compressedPhoto = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Could not compress the selected profile photo.')),
        'image/webp',
        0.82,
      );
    });
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === 'string'
        ? resolve(reader.result)
        : reject(new Error('Could not read the processed profile photo.'));
      reader.onerror = () => reject(new Error('Could not read the processed profile photo.'));
      reader.readAsDataURL(compressedPhoto);
    });
  } finally {
    bitmap.close();
  }
}

function AccountSettings({
  account,
  session,
  avatarUrl,
  onUpdated,
  onAvatarUpdated,
  setError,
}: {
  account: AdminAccount | null;
  session: Session;
  avatarUrl: string | null;
  onUpdated: (account: AdminAccount) => void;
  onAvatarUpdated: (avatarUrl: string | null) => void;
  setError: (message: string) => void;
}) {
  const [username, setUsername] = useState(account?.username ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [savingUsername, setSavingUsername] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingPhoto, setSavingPhoto] = useState(false);
  const [removingPhoto, setRemovingPhoto] = useState(false);
  const [notice, setNotice] = useState('');

  const removeProfilePhoto = async () => {
    if (!supabase) return;
    setRemovingPhoto(true);
    setError('');
    try {
      const currentUsername = account?.username || username || 'Admin';
      const { error: profileError } = await supabase
        .from('admin_profiles')
        .upsert(
          {
            user_id: session.user.id,
            username: currentUsername,
            avatar_url: null,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );
      if (profileError) throw profileError;
      onAvatarUpdated(null);
      setNotice('Profile photo removed.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not remove profile photo.');
    } finally {
      setRemovingPhoto(false);
    }
  };

  const uploadProfilePhoto = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !supabase) return;
    if (!['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(file.type)) {
      setError('Choose a JPG, PNG, WebP, or GIF profile photo.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setError('Profile photos must be 15 MB or smaller.');
      return;
    }

    setSavingPhoto(true);
    setError('');
    try {
      const avatarUrl = await createProfilePhotoDataUrl(file);
      const currentUsername = account?.username || username || 'Admin';
      const { error: profileError } = await supabase
        .from('admin_profiles')
        .upsert(
          {
            user_id: session.user.id,
            username: currentUsername,
            avatar_url: avatarUrl,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'user_id' }
        );
      if (profileError) throw profileError;
      onAvatarUpdated(avatarUrl);
      setNotice('Profile photo updated and shared with the admin team.');
    } catch (caught) {
      const uploadError = caught && typeof caught === 'object'
        ? caught as { message?: unknown; code?: unknown; details?: unknown; hint?: unknown }
        : null;
      const errorMessage = typeof uploadError?.message === 'string'
        ? uploadError.message
        : caught instanceof Error
          ? caught.message
          : 'Could not upload the profile photo.';
      const errorCode = typeof uploadError?.code === 'string' ? uploadError.code : '';
      const lowerMessage = errorMessage.toLowerCase();
      if (errorCode === 'PGRST205' || errorCode === '42P01' || lowerMessage.includes('relation "public.admin_profiles" does not exist')) {
        setError('Admin profile storage is not set up in this Supabase project. Run supabase/setup_admin_profiles.sql in its SQL Editor, then upload again.');
      } else if (errorCode === 'PGRST204' || lowerMessage.includes('could not find the') && lowerMessage.includes('column')) {
        setError(`The admin profile table is missing a required column. Run supabase/setup_admin_profiles.sql in this Supabase project, then refresh the page. Supabase: ${errorMessage}`);
      } else {
        const details = [uploadError?.details, uploadError?.hint]
          .filter((value): value is string => typeof value === 'string' && value.length > 0)
          .join(' ');
        const code = errorCode ? ` (${errorCode})` : '';
        setError(`${errorMessage}${code}${details ? ` — ${details}` : ''}`);
      }
    } finally {
      setSavingPhoto(false);
    }
  };

  const updateUsername = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavingUsername(true);
    setError('');
    try {
      await callAdminFunction('rename-admin', { username: username.trim() });
      onUpdated({ username: username.trim() });
      setNotice('Username updated for your account.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not update username.');
    } finally {
      setSavingUsername(false);
    }
  };

  const updatePassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase || !session.user.email) return;
    setError('');
    if (getPasswordStrength(newPassword) < 4) {
      setError('Choose a strong password that meets all four requirements.');
      return;
    }
    setSavingPassword(true);
    try {
      const { error: verifyError } = await supabase.auth.signInWithPassword({ email: session.user.email, password: currentPassword });
      if (verifyError) throw new Error('Current password is incorrect.');
      const { error: passwordError } = await supabase.auth.updateUser({ password: newPassword });
      if (passwordError) throw passwordError;
      setCurrentPassword('');
      setNewPassword('');
      setNotice('Password changed successfully.');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not change password.');
    } finally {
      setSavingPassword(false);
    }
  };

  return <section className="admin-section admin-settings">
    <div className="admin-section-intro"><div><p className="admin-kicker">YOUR SECURITY</p><h2>Account settings</h2></div></div>
    {notice && <div className="admin-alert admin-alert--success"><Check size={16} />{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={15} /></button></div>}
    <section className="admin-settings-card admin-profile-photo-card">
      <div className="admin-profile-photo-preview">
        {avatarUrl ? <img src={avatarUrl} alt={`${account?.username ?? 'Admin'} profile`} /> : <UserRound size={24} />}
      </div>
      <div className="admin-profile-photo-copy">
        <h3>Profile photo</h3>
        <p>Your photo is visible to the other admins in the live dashboard.</p>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <label className="admin-button admin-button--quiet admin-profile-photo-upload">
          <Upload size={15} />{savingPhoto ? 'Uploading…' : avatarUrl ? 'Change photo' : 'Upload photo'}
          <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => void uploadProfilePhoto(event)} disabled={savingPhoto || removingPhoto} />
        </label>
        {avatarUrl && (
          <button
            type="button"
            className="admin-button admin-button--quiet"
            style={{ color: '#ff7b89', borderColor: '#ff4d6033' }}
            onClick={() => void removeProfilePhoto()}
            disabled={savingPhoto || removingPhoto}
            title="Remove profile photo"
          >
            <Trash2 size={15} />{removingPhoto ? 'Removing…' : 'Remove'}
          </button>
        )}
      </div>
    </section>
    <form className="admin-settings-card" onSubmit={updateUsername}>
      <div><h3>Change username</h3><p>Only your username changes; other administrators keep their own accounts.</p></div>
      <label>Username<input value={username} onChange={(event) => setUsername(event.target.value)} minLength={3} maxLength={32} required /></label>
      <button className="admin-button admin-button--primary" disabled={savingUsername}>{savingUsername ? 'Saving…' : 'Save username'}</button>
    </form>
    <form className="admin-settings-card" onSubmit={updatePassword}>
      <div><h3>Change password</h3><p>Confirm your current password, then choose a strong new one.</p></div>
      <label>Current password<PasswordVisibilityInput autoComplete="current-password" value={currentPassword} onChange={setCurrentPassword} required /></label>
      <label>New password<PasswordVisibilityInput autoComplete="new-password" value={newPassword} onChange={setNewPassword} required minLength={12} /></label>
      <PasswordMeter password={newPassword} />
      <button className="admin-button admin-button--primary" disabled={savingPassword}>{savingPassword ? 'Saving…' : 'Update password'}</button>
    </form>
  </section>;
}

export default AdminPortal;