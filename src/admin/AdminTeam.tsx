import { UserRound } from 'lucide-react';
import { allowedAdmins } from './adminData';
import type { AdminProfile, OnlineAdmin } from './adminData';

export function AdminAvatar({ url, size }: { url: string | null | undefined; size: number }) {
  return <span className="admin-avatar">{url ? <img src={url} alt="" /> : <UserRound size={size} />}</span>;
}

type OnlineTeamProps = { onlineAdmins: OnlineAdmin[]; adminProfiles: AdminProfile[]; currentUserId: string };

export function OnlineTeam({ onlineAdmins, adminProfiles, currentUserId }: OnlineTeamProps) {
  return (
    <section className="admin-online-team" aria-label="Administrators currently online">
      <strong><span className="admin-live-dot" /> Admin accounts <span className="admin-online-count">{onlineAdmins.length} online</span></strong>
      <div>
        {allowedAdmins.map((username) => {
          const matches = (name: string) => name.toLowerCase() === username.toLowerCase();
          const onlineAdmin = onlineAdmins.find((online) => matches(online.username));
          const isOnline = Boolean(onlineAdmin);
          return (
            <span className={`admin-online-person${isOnline ? ' is-online' : ' is-offline'}`} key={username}>
              <AdminAvatar url={adminProfiles.find((profile) => matches(profile.username))?.avatar_url} size={15} />
              <span>{username}{onlineAdmin?.user_id === currentUserId ? ' (you)' : ''}</span>
              <small>{isOnline ? 'Online' : 'Offline'}</small>
            </span>
          );
        })}
      </div>
    </section>
  );
}
