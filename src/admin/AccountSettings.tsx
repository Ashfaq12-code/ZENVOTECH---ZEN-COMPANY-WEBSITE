import { ChangeEvent, FormEvent, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import { Check, Trash2, Upload, UserRound, X } from 'lucide-react';
import type { AdminAccount } from './adminData';
import { PasswordMeter, PasswordVisibilityInput } from './PasswordFields';
import { createProfilePhotoDataUrl, describeProfilePhotoError } from './profilePhoto';
import { callAdminFunction, getPasswordStrength } from './supabase';
import { supabaseClient as supabase } from './supabaseClient';

export function AccountSettings({
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
      setError(describeProfilePhotoError(caught));
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
