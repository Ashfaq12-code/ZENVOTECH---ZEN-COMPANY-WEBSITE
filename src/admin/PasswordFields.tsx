import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { getPasswordStrength, passwordStrengthLabel } from './supabase';

export function PasswordMeter({ password }: { password: string }) {
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

export function PasswordVisibilityInput({
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
