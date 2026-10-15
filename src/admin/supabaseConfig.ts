export const supabaseUrl: string =
  import.meta.env.VITE_SUPABASE_URL || 'https://cbstalyfyzlpzedwnydb.supabase.co';
export const supabaseAnonKey: string =
  import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_DFsRwoBaiRgtvGNygoxOYg_EvG5X-Ey';

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
