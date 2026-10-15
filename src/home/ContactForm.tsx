import { Loader2 } from 'lucide-react';

import { useContactForm } from './useContactForm';
import type { ContactField, ContactFieldErrors } from './useContactForm';

const labelClass = 'flex flex-col gap-2 text-xs font-bold text-blue-800';

export function ContactForm() {
  const { sendState, fieldErrors, submit } = useContactForm();
  const sending = sendState.status === 'running';

  return (
    <form className="contact-form" noValidate onSubmit={(event) => { event.preventDefault(); void submit(event.currentTarget); }}>
      <div className="contact-form-fields">
        <label className={labelClass}>
          Full name
          <input name="name" type="text" placeholder="Full Name" autoComplete="name" required {...fieldA11y('name', fieldErrors)} />
          <FieldError field="name" errors={fieldErrors} />
        </label>
        <label className={labelClass}>
          Email address
          <input name="email" type="email" placeholder="Email Address" autoComplete="email" required {...fieldA11y('email', fieldErrors)} />
          <FieldError field="email" errors={fieldErrors} />
        </label>
      </div>
      <label className={labelClass}>
        Your message
        <textarea name="message" placeholder="Your Message" rows={5} required {...fieldA11y('message', fieldErrors)} />
        <FieldError field="message" errors={fieldErrors} />
      </label>
      <div className="hidden" aria-hidden="true">
        <label>Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <button className="button button-primary" type="submit" disabled={sending}>
        {sending && <Loader2 size={16} className="animate-spin motion-reduce:animate-none" aria-hidden="true" />}
        {sending ? 'Sending…' : 'Send'}
      </button>
      <div aria-live="polite">
        {sendState.status === 'done' && <p className="contact-form-feedback is-success">Your message was sent. We’ll be in touch soon.</p>}
        {sendState.status === 'error' && <p className="contact-form-feedback is-error">{sendState.message}</p>}
      </div>
    </form>
  );
}

function fieldA11y(field: ContactField, errors: ContactFieldErrors) {
  const invalid = Boolean(errors[field]);
  return { 'aria-invalid': invalid, 'aria-describedby': invalid ? `contact-${field}-error` : undefined };
}

function FieldError({ field, errors }: { field: ContactField; errors: ContactFieldErrors }) {
  const message = errors[field];
  if (!message) return null;
  return <span id={`contact-${field}-error`} className="font-semibold text-red-700">{message}</span>;
}
