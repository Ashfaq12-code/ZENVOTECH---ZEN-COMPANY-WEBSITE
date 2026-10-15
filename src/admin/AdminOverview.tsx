import type { ReactNode } from 'react';
import { BriefcaseBusiness, ChevronDown, LayoutDashboard, MessageSquareText, PhoneCall, UserRound } from 'lucide-react';
import { SITE } from '@/config/site';
import type { Tab } from './adminData';
import { AdminAvatar } from './AdminTeam';
import { StatCard } from './AdminWidgets';

type AdminOverviewProps = {
  adminName: string;
  accountName: string;
  ownAvatar: string | null;
  counts: { projects: number; reviews: number; calls: number };
  tab: Tab;
  onTab: (tab: Tab) => void;
  children: ReactNode;
};

export function AdminOverview({ adminName, accountName, ownAvatar, counts, tab, onTab, children }: AdminOverviewProps) {
  return (
    <>
      <div className="admin-breadcrumb">Home <span>›</span> Admin <span>›</span> <b>Dashboard</b></div>
      <div className="admin-page-heading">
        <div><p className="admin-kicker"><span className="admin-live-dot" /> LIVE ADMIN WORKSPACE</p><h1><LayoutDashboard size={25} /> Admin dashboard</h1><p>Manage {SITE.name} projects and client reviews together, in real time.</p></div>
        <div className="admin-current-user"><AdminAvatar url={ownAvatar} size={18} /><div><strong>{adminName}</strong><small>Administrator · Online</small></div><ChevronDown size={15} /></div>
      </div>

      <div className="admin-stat-grid">
        <StatCard icon={<BriefcaseBusiness size={17} />} label="Admin projects" value={counts.projects} />
        <StatCard icon={<MessageSquareText size={17} />} label="Client reviews" value={counts.reviews} />
        <StatCard icon={<UserRound size={17} />} label="Admin user" value={accountName} />
        <StatCard icon={<span className="admin-live-dot" />} label="Status" value="Online" />
      </div>

      {children}

      <nav className="admin-tabs" aria-label="Dashboard sections">
        <button className={tab === 'projects' ? 'is-active' : ''} onClick={() => onTab('projects')}><BriefcaseBusiness size={15} /> Projects <span>{counts.projects}</span></button>
        <button className={tab === 'reviews' ? 'is-active' : ''} onClick={() => onTab('reviews')}><MessageSquareText size={15} /> Client reviews <span>{counts.reviews}</span></button>
        <button className={tab === 'calls' ? 'is-active' : ''} onClick={() => onTab('calls')}><PhoneCall size={15} /> Call clicks <span>{counts.calls}</span></button>
        <button className={tab === 'settings' ? 'is-active' : ''} onClick={() => onTab('settings')}><UserRound size={15} /> Account settings</button>
      </nav>
    </>
  );
}
