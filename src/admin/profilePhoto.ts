export async function createProfilePhotoDataUrl(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, 512 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not process the selected profile photo.');
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const compressedPhoto = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Could not compress the selected profile photo.')),
        'image/webp',
        0.82,
      );
    });
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => typeof reader.result === 'string'
        ? resolve(reader.result)
        : reject(new Error('Could not read the processed profile photo.'));
      reader.onerror = () => reject(new Error('Could not read the processed profile photo.'));
      reader.readAsDataURL(compressedPhoto);
    });
  } finally {
    bitmap.close();
  }
}

// Maps Supabase/PostgREST failures to a message that tells the admin what to fix.
export function describeProfilePhotoError(caught: unknown): string {
  const field = (key: string): string => {
    if (!caught || typeof caught !== 'object' || !(key in caught)) return '';
    const value: unknown = Reflect.get(caught, key);
    return typeof value === 'string' ? value : '';
  };
  const errorMessage = field('message') || 'Could not upload the profile photo.';
  const errorCode = field('code');
  const lowerMessage = errorMessage.toLowerCase();
  if (errorCode === 'PGRST205' || errorCode === '42P01' || lowerMessage.includes('relation "public.admin_profiles" does not exist')) {
    return 'Admin profile storage is not set up in this Supabase project. Run supabase/setup_admin_profiles.sql in its SQL Editor, then upload again.';
  }
  if (errorCode === 'PGRST204' || (lowerMessage.includes('could not find the') && lowerMessage.includes('column'))) {
    return `The admin profile table is missing a required column. Run supabase/setup_admin_profiles.sql in this Supabase project, then refresh the page. Supabase: ${errorMessage}`;
  }
  const details = [field('details'), field('hint')].filter((value) => value.length > 0).join(' ');
  const code = errorCode ? ` (${errorCode})` : '';
  return `${errorMessage}${code}${details ? ` — ${details}` : ''}`;
}
