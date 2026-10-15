import { PhoneCall, Trash2 } from 'lucide-react';
import { EmptyState } from './AdminWidgets';
import type { CallClickLog } from './supabase';

type CallsTabProps = {
  callLogs: CallClickLog[];
  currentAdminName: string;
  onAssign: (callLog: CallClickLog) => void;
  onDelete: (callLog: CallClickLog) => void;
};

export function CallsTab({ callLogs, currentAdminName, onAssign, onDelete }: CallsTabProps) {
  return (
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
                <button className="admin-button admin-button--quiet" type="button" onClick={() => onAssign(callLog)} disabled={callLog.assigned_admin === currentAdminName}>
                  {callLog.assigned_admin === currentAdminName ? 'Assigned to me' : 'Assign to me'}
                </button>
                <button className="admin-icon-button admin-danger-icon" type="button" aria-label={`Delete call log for ${callLog.clicked_number}`} onClick={() => onDelete(callLog)} title="Delete log">
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
  );
}
