import { FormEvent, useState } from 'react';
import { LoaderCircle, MessageSquareText, Star, X } from 'lucide-react';
import { supabase, supabaseConfigured } from './supabase';
import './AdminPortal.css';

const countries = ['United States', 'United Kingdom', 'Sri Lanka', 'Canada', 'Australia', 'India', 'United Arab Emirates', 'Germany', 'France', 'Japan', 'Singapore', 'Other'];

export default function ClientReviewForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) {
      setError('Review submissions are unavailable until Supabase is configured.');
      return;
    }
    setSaving(true);
    setError('');
    const { error: insertError } = await supabase.from('client_reviews').insert({
      name: name.trim(),
      country,
      rating,
      body: body.trim(),
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setSent(true);
  };

  return <div className="review-modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="review-modal" role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
      <button className="review-modal-close" aria-label="Close review form" onClick={onClose}><X size={18} /></button>
      {sent ? <div className="review-success"><span><MessageSquareText size={22} /></span><h2 id="review-modal-title">Thank you for sharing.</h2><p>Your review is live on the site and has been shared with the admin team.</p><button className="admin-button admin-button--primary" onClick={onClose}>Done</button></div> : <>
        <p className="admin-kicker">YOUR EXPERIENCE</p><h2 id="review-modal-title">Add a client review</h2><p className="review-modal-subtitle">Share your experience with the zenvotech team. Your review appears live once submitted.</p>
        {!supabaseConfigured && <p className="admin-alert admin-alert--error">Review submissions are unavailable until Supabase is configured.</p>}
        <form className="admin-form review-submit-form" onSubmit={submit}>
          <label>Your name<input value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} /></label>
          <label>Country<select value={country} onChange={(event) => setCountry(event.target.value)}>{countries.map((item) => <option key={item}>{item}</option>)}</select></label>
          <fieldset className="review-rating-field"><legend>Your rating</legend><div>{[1, 2, 3, 4, 5].map((value) => <button type="button" aria-label={`${value} star${value === 1 ? '' : 's'}`} aria-pressed={rating === value} key={value} onClick={() => setRating(value)}><Star size={22} fill={value <= rating ? 'currentColor' : 'none'} /></button>)}</div></fieldset>
          <label>Your review<textarea value={body} onChange={(event) => setBody(event.target.value)} rows={4} required minLength={12} maxLength={1000} placeholder="What was it like working with us?" /></label>
          {error && <div className="admin-alert admin-alert--error" role="alert">{error}</div>}
          <button className="admin-button admin-button--primary" disabled={saving || !supabaseConfigured}>{saving && <LoaderCircle className="admin-spinner" size={15} />}{saving ? 'Submitting…' : 'Publish review'}</button>
        </form>
      </>}
    </section>
  </div>;
}
