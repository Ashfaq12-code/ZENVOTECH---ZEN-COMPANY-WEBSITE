import { FormEvent, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Check, LoaderCircle, ShieldCheck } from 'lucide-react';
import { SITE } from '@/config/site';
import { allowedAdmins } from './adminData';
import type { AdminAccount } from './adminData';
import { PasswordMeter, PasswordVisibilityInput } from './PasswordFields';
import { callAdminFunction, getPasswordStrength, supabaseConfigured } from './supabase';
import { supabaseClient as supabase } from './supabaseClient';

export function AdminAuth({
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
      <a className="admin-auth-back" href="/">← Back to {SITE.name}</a>
      <div className={`admin-auth-card admin-auth-card--${mode}`}>
        <div className="admin-brand-icon admin-brand-icon--large"><ShieldCheck size={26} /></div>
        <p className="admin-kicker">Zenvo<span> Tech</span> · SECURE ACCESS</p>
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
