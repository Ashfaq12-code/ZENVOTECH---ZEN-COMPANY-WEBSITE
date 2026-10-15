import { FormEvent, useState } from 'react';
import { Globe2, LoaderCircle, Monitor, Plus, Smartphone } from 'lucide-react';
import { countries } from './adminData';
import { CountrySelect } from './CountrySelect';
import type { AdminProject } from './supabase';
import { supabaseClient as supabase } from './supabaseClient';

export function ProjectForm({ onCreated, setError, adminName }: { onCreated: (newProject?: AdminProject) => void; setError: (message: string) => void; adminName?: string }) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState(countries[0]);
  const [projectType, setProjectType] = useState<'web' | 'app' | 'desktop'>('web');
  // PI! NEED DATA: create a project-images Storage bucket? confirm name, size limit, public read
  const [imageUrl, setImageUrl] = useState('');
  const [imageSize, setImageSize] = useState<{ width: number; height: number } | null>(null);
  const [liveUrl, setLiveUrl] = useState('');
  const [saving, setSaving] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!supabase) return;
    setSaving(true);
    setError('');
    const { data: insertedData, error: insertError } = await supabase.from('projects').insert({
      name: name.trim(),
      country,
      image_url: imageUrl.trim(),
      live_url: liveUrl.trim(),
      project_type: projectType,
      created_by_admin: adminName || 'Admin',
      ...(imageSize ? { image_width: imageSize.width, image_height: imageSize.height } : {}),
    }).select('*');
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    const createdProject: AdminProject | undefined = insertedData?.[0];
    onCreated(createdProject);
  };

  const typeHint =
    projectType === 'app'
      ? 'This project will appear in the App tab on the home page and the App Development page.'
      : projectType === 'desktop'
      ? 'This project will appear in the Desktop tab on the home page.'
      : 'This project will appear in the Web tab on the home page.';

  const imagePlaceholder =
    projectType === 'app'
      ? 'https://… (app screenshot for iPhone mockup)'
      : projectType === 'desktop'
      ? 'https://… (screen screenshot for monitor mockup)'
      : 'https://… (website screenshot)';

  return <form className="admin-project-form" onSubmit={submit}>
    <h2><Plus size={16} /> Add new project</h2>
    <div className="admin-form-grid">
      <label>Project name *<input value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. My Awesome Website" required maxLength={90} /></label>
      <label>Country<CountrySelect value={country} onChange={setCountry} /></label>
      <label className="admin-form-type-label">
        Project type
        <div className="admin-type-selector" role="group" aria-label="Project type">
          <button type="button" className={`admin-type-btn${projectType === 'web' ? ' is-active' : ''}`} onClick={() => setProjectType('web')}><Globe2 size={14} /> Web</button>
          <button type="button" className={`admin-type-btn${projectType === 'app' ? ' is-active' : ''}`} onClick={() => setProjectType('app')}><Smartphone size={14} /> App</button>
          <button type="button" className={`admin-type-btn${projectType === 'desktop' ? ' is-active' : ''}`} onClick={() => setProjectType('desktop')}><Monitor size={14} /> Desktop</button>
        </div>
        <small className="admin-type-hint">{typeHint}</small>
      </label>
      <label>Project image URL *<input type="url" value={imageUrl} onChange={(event) => { setImageUrl(event.target.value); setImageSize(null); }} placeholder={imagePlaceholder} required /></label>
      <label>Project live URL *<input type="url" value={liveUrl} onChange={(event) => setLiveUrl(event.target.value)} placeholder="https://yourproject.com" required /></label>
    </div>
    {imageUrl && <img className="admin-image-preview" src={imageUrl} alt="Project image preview" onLoad={(event) => setImageSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })} onError={(event) => { event.currentTarget.style.display = 'none'; }} />}
    <div className="admin-form-actions"><button className="admin-button admin-button--primary" disabled={saving}>{saving && <LoaderCircle className="admin-spinner" size={15} />}<Plus size={15} />{saving ? 'Adding…' : 'Add project'}</button><span>New projects are published immediately and marked Recent.</span></div>
  </form>;
}
