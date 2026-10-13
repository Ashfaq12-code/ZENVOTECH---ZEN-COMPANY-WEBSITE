declare const Deno: {
  env: { get(name: string): string | undefined };
  serve(handler: (request: Request) => Response | Promise<Response>): void;
};

// @ts-expect-error - the Supabase edge runtime resolves this URL module at runtime.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const allowedAdmins = ['Ashxx12', 'Zaid12', 'Firaz12', 'Ashfaq12'];

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (request.method !== 'POST') return response({ error: 'Method not allowed.' }, 405);

  const url = Deno.env.get('SUPABASE_URL');
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY');
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !anonKey || !serviceRoleKey) return response({ error: 'Admin API secrets are not configured.' }, 500);

  const service = createClient(url, serviceRoleKey, { auth: { persistSession: false } });
  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return response({ error: 'Request body must be valid JSON.' }, 400);
  }

  const action = input.action;
  const username = typeof input.username === 'string' ? input.username.trim() : '';
  if (!username) return response({ error: 'A username is required.' }, 400);

  if (action === 'resolve-login') {
    const { data: account, error } = await service
      .from('admin_accounts')
      .select('login_email')
      .eq('username', username)
      .maybeSingle();
    if (error) return response({ error: 'Could not look up the admin account.' }, 500);
    if (!account) return response({ error: 'Username or password is incorrect.' }, 401);
    return response({ email: account.login_email });
  }

  if (action === 'setup-admin') {
    const canonicalUsername = allowedAdmins.find((item) => item.toLowerCase() === username.toLowerCase());
    const code = typeof input.setupCode === 'string' ? input.setupCode.trim() : '';
    const password = typeof input.password === 'string' ? input.password : '';
    if (!canonicalUsername) return response({ error: 'This username is not on the administrator allowlist.' }, 403);
    const strongPassword = password.length >= 12
      && password.length <= 128
      && /[a-z]/.test(password)
      && /[A-Z]/.test(password)
      && /\d/.test(password)
      && /[^A-Za-z0-9]/.test(password);
    if (!code || !strongPassword) {
      return response({ error: 'A setup code and a strong 12–128 character password are required.' }, 400);
    }
    const { data: validInvite, error: inviteError } = await service.rpc('claim_admin_invite', {
      p_username: canonicalUsername,
      p_setup_code: code,
    });
    if (inviteError) return response({ error: 'Could not verify the one-time setup code.' }, 500);
    if (!validInvite) return response({ error: 'That setup code is invalid or has already been used.' }, 401);

    const loginEmail = `admin.${crypto.randomUUID()}@accounts.zenvora.invalid`;
    const { data: created, error: createError } = await service.auth.admin.createUser({
      email: loginEmail,
      password,
      email_confirm: true,
      user_metadata: { username: canonicalUsername },
      app_metadata: { role: 'admin' },
    });
    if (createError || !created.user) {
      return response({ error: createError?.message ?? 'Could not create the admin account. Contact the project owner to reset its setup code.' }, 500);
    }
    const { error: accountError } = await service.from('admin_accounts').insert({
      user_id: created.user.id,
      username: canonicalUsername,
      login_email: loginEmail,
    });
    if (accountError) {
      const { error: cleanupError } = await service.auth.admin.deleteUser(created.user.id);
      const cleanupNote = cleanupError ? ` Account cleanup also failed: ${cleanupError.message}` : '';
      return response({ error: `The admin account was created but could not be registered. Contact the project owner to reset its setup code.${cleanupNote}` }, 500);
    }
    return response({ ok: true });
  }

  if (action === 'rename-admin') {
    if (username.length < 3 || username.length > 32 || !/^[a-zA-Z0-9._-]+$/.test(username)) {
      return response({ error: 'Use 3–32 letters, numbers, dots, hyphens, or underscores.' }, 400);
    }
    const authorization = request.headers.get('Authorization');
    if (!authorization) return response({ error: 'Sign in again to change your username.' }, 401);
    const caller = createClient(url, anonKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false },
    });
    const { data: authData, error: authError } = await caller.auth.getUser();
    if (authError || !authData.user) return response({ error: 'Your admin session is not valid.' }, 401);
    const { data: admin, error: adminError } = await service
      .from('admin_accounts')
      .select('user_id')
      .eq('user_id', authData.user.id)
      .maybeSingle();
    if (adminError || !admin) return response({ error: 'Only registered admins can change their username.' }, 403);
    const { error: updateError } = await service
      .from('admin_accounts')
      .update({ username })
      .eq('user_id', authData.user.id);
    if (updateError?.code === '23505') return response({ error: 'That username is already in use.' }, 409);
    if (updateError) return response({ error: updateError.message }, 500);
    const { error: metadataError } = await service.auth.admin.updateUserById(authData.user.id, { user_metadata: { username } });
    if (metadataError) return response({ error: 'Username changed, but its profile label did not refresh. Sign in again to reload it.' }, 500);
    return response({ ok: true });
  }

  return response({ error: 'Unknown admin action.' }, 400);
});