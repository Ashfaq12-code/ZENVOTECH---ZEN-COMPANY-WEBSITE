import { createClient } from '@supabase/supabase-js';
import { supabaseAnonKey, supabaseConfigured, supabaseUrl } from './supabaseConfig';

// The only createClient call. Visitor code reaches it through a dynamic import
// (see getSupabase in ./supabase), so supabase-js stays out of the entry bundle.
// Admin modules import it statically; they are themselves lazy-loaded.
export const supabaseClient = supabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
