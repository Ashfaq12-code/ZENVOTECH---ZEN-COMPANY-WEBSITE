import type { SupabaseClient } from '@supabase/supabase-js';
import { createDeferredClient } from './deferredSupabase';
import { supabaseConfigured } from './supabaseConfig';

export { supabaseConfigured };

let clientPromise: Promise<SupabaseClient | null> | null = null;

/** Loads supabase-js on first use and returns the shared client (memoised). */
export function getSupabase(): Promise<SupabaseClient | null> {
  clientPromise ??= import('./supabaseClient')
    .then(({ supabaseClient }) => supabaseClient)
    .catch((caught: unknown) => {
      clientPromise = null;
      throw caught;
    });
  return clientPromise;
}

/** @deprecated Lazy stand-in kept for existing call sites; prefer `await getSupabase()`. */
export const supabase: SupabaseClient | null = supabaseConfigured
  ? createDeferredClient(getSupabase)
  : null;

export type CallClickLog = {
  id: string;
  clicked_number: string;
  assigned_admin: string | null;
  created_at: string;
};

export async function recordCallClick(clickedNumber: string): Promise<void> {
  const client = await getSupabase();
  if (!client) {
    throw new Error('Call tracking is not configured.');
  }

  const { error } = await client.from('call_click_logs').insert({ clicked_number: clickedNumber });

  if (error) {
    throw new Error(`Call click could not be saved: ${error.message}`);
  }
}

export type AdminProject = {
  id: string;
  name: string;
  country: string;
  image_url: string;
  image_width?: number | null;
  image_height?: number | null;
  live_url: string;
  project_type: 'web' | 'app' | 'desktop';
  created_by_admin?: string;
  created_at: string;
};

export type ClientReview = {
  id: string;
  name: string;
  country: string;
  rating: number;
  body: string;
  created_at: string;
};

export type AdminNotification = {
  id: string;
  kind: 'project' | 'review';
  title: string;
  message: string;
  record_id: string;
  is_read: boolean;
  created_at: string;
};

export async function callAdminFunction<T>(
  action: string,
  payload: Record<string, unknown> = {},
): Promise<T> {
  const client = await getSupabase();
  if (!client) {
    throw new Error('Admin services are not configured. Add the Supabase environment variables.');
  }

  const { data, error } = await client.functions.invoke<T>('admin-api', {
    body: { action, ...payload },
  });

  if (error) {
    const fallback = error instanceof Error && error.message ? error.message : 'Edge Function returned an error.';
    const context: unknown = typeof error === 'object' && error !== null && 'context' in error ? error.context : null;
    throw new Error((await readErrorResponse(context)) ?? fallback);
  }
  if (isRecord(data) && data.error) throw new Error(messageFromBody(data) ?? String(data.error));
  if (data === null) throw new Error('Admin API returned an empty response.');
  return data;
}

async function readErrorResponse(context: unknown): Promise<string | null> {
  if (!(context instanceof Response)) return null;
  try {
    const text = await context.clone().text();
    if (!text.trim()) return null;
    try {
      return messageFromBody(JSON.parse(text)) ?? text;
    } catch {
      return text;
    }
  } catch {
    return null;
  }
}

// Accepts both the legacy `{ error: string }` and the `{ error: { code, message } }` shapes.
function messageFromBody(body: unknown): string | null {
  if (!isRecord(body)) return null;
  const { error, message } = body;
  if (typeof error === 'string') return error;
  if (isRecord(error) && typeof error.message === 'string') return error.message;
  return typeof message === 'string' ? message : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function getPasswordStrength(password: string): number {
  if (!password) return 0;
  return [
    password.length >= 12,
    /[a-z]/.test(password) && /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ].filter(Boolean).length;
}

export function passwordStrengthLabel(strength: number): string {
  return ['Enter a password', 'Weak', 'Fair', 'Good', 'Strong'][strength] ?? 'Strong';
}

export function formatRelativeTime(value: string): string {
  const elapsedSeconds = Math.max(0, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (elapsedSeconds < 60) return 'Just now';
  const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;
  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `${elapsedHours}h ago`;
  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays < 7) return `${elapsedDays}d ago`;
  return new Date(value).toLocaleDateString();
}
