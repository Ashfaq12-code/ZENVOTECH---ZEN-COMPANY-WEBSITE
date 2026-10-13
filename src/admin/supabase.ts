import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || 'https://cbstalyfyzlpzedwnydb.supabase.co';
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_DFsRwoBaiRgtvGNygoxOYg_EvG5X-Ey';

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type CallClickLog = {
  id: string;
  clicked_number: string;
  assigned_admin: string | null;
  created_at: string;
};

export async function recordCallClick(clickedNumber: string): Promise<void> {
  if (!supabase) {
    throw new Error('Call tracking is not configured.');
  }

  const { error } = await supabase.from('client_reviews').insert([
    {
      name: `Call Tap: ${clickedNumber}`,
      country: 'Direct Call',
      rating: 5,
      body: `__CALL_CLICK__:${clickedNumber}`,
    },
  ]);

  if (error) {
    throw new Error(`Call click could not be saved: ${error.message}`);
  }
}

export type AdminProject = {
  id: string;
  name: string;
  country: string;
  image_url: string;
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
  if (!supabase) {
    throw new Error('Admin services are not configured. Add the Supabase environment variables.');
  }

  const { data, error } = await supabase.functions.invoke('admin-api', {
    body: { action, ...payload },
  });

  if (error) {
    let message = (error as Error)?.message || 'Edge Function returned an error.';

    const context = (error && typeof error === 'object' && 'context' in error)
      ? (error as { context?: unknown }).context
      : null;

    if (context && typeof context === 'object') {
      try {
        const resp = context as Response;
        let responseBody: unknown;

        if (typeof resp.json === 'function') {
          try {
            responseBody = await (typeof resp.clone === 'function' ? resp.clone().json() : resp.json());
          } catch {
            if (typeof resp.text === 'function') {
              responseBody = await (typeof resp.clone === 'function' ? resp.clone().text() : resp.text());
            }
          }
        }

        if (responseBody && typeof responseBody === 'object') {
          const bodyObj = responseBody as Record<string, unknown>;
          if (typeof bodyObj.error === 'string') {
            message = bodyObj.error;
          } else if (typeof bodyObj.message === 'string') {
            message = bodyObj.message;
          }
        } else if (typeof responseBody === 'string' && responseBody.trim().length > 0) {
          try {
            const parsed = JSON.parse(responseBody);
            if (parsed && typeof parsed.error === 'string') {
              message = parsed.error;
            } else if (parsed && typeof parsed.message === 'string') {
              message = parsed.message;
            } else {
              message = responseBody;
            }
          } catch {
            message = responseBody;
          }
        }
      } catch {
        // Fallback to error message
      }
    }

    throw new Error(message);
  }
  if (data?.error) throw new Error(String(data.error));
  return data as T;
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