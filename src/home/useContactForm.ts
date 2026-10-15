import { useState } from 'react';

import { SITE } from '@/config/site';

export type ContactField = 'name' | 'email' | 'message';
export type ContactFieldErrors = Partial<Record<ContactField, string>>;
export type ContactSendState =
  | { status: 'idle' }
  | { status: 'running' }
  | { status: 'error'; message: string }
  | { status: 'done' };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useContactForm() {
  const [sendState, setSendState] = useState<ContactSendState>({ status: 'idle' });
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  const submit = async (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const values = { name: readField(formData, 'name'), email: readField(formData, 'email'), message: readField(formData, 'message') };
    const errors = validate(values);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    // Bots fill the hidden field; acknowledge without sending.
    if (readField(formData, 'company')) {
      setSendState({ status: 'done' });
      return;
    }
    setSendState({ status: 'running' });
    const result = await sendContactEmail(values);
    setSendState(result);
    if (result.status === 'done') form.reset();
  };

  return { sendState, fieldErrors, submit };
}

function readField(formData: FormData, name: string): string {
  return String(formData.get(name) ?? '').trim();
}

function validate(values: Record<ContactField, string>): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (!values.name) errors.name = 'Please enter your name.';
  if (!emailPattern.test(values.email)) errors.email = 'Please enter a valid email address.';
  if (!values.message) errors.message = 'Please tell us about your project.';
  return errors;
}

async function sendContactEmail(values: Record<ContactField, string>): Promise<ContactSendState> {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  if (!serviceId || !templateId || !publicKey) {
    return { status: 'error', message: `Email is not configured yet. Please contact us at ${SITE.email}.` };
  }
  try {
    const { default: emailjs } = await import('@emailjs/browser');
    await emailjs.send(serviceId, templateId, {
      to_email: SITE.email,
      from_name: values.name,
      reply_to: values.email,
      message: values.message,
    }, { publicKey });
    return { status: 'done' };
  } catch {
    return { status: 'error', message: 'We could not send your message. Please try again later.' };
  }
}
