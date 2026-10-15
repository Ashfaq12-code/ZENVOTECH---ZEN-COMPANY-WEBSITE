import type { ReactNode } from 'react';

export function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string | number }) {
  return <article className="admin-stat-card"><span>{icon}</span><small>{label}</small><strong>{value}</strong></article>;
}

export function EmptyState({ icon, title, message }: { icon: ReactNode; title: string; message: string }) {
  return <div className="admin-empty-state">{icon}<strong>{title}</strong><p>{message}</p></div>;
}
