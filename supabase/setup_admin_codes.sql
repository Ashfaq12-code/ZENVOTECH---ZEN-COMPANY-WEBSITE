-- Direct Link to Run this in Supabase:
-- https://supabase.com/dashboard/project/cbstalyfyzlpzedwnydb/sql/new

-- Paste and click "Run":
create or replace function public.claim_admin_invite(p_username text, p_setup_code text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  claimed_username text;
begin
  update public.admin_invites
  set setup_code_hash = null, claimed_at = now()
  where lower(username) = lower(trim(p_username))
    and claimed_at is null
  returning username into claimed_username;
  return claimed_username is not null;
end;
$$;

grant execute on function public.claim_admin_invite(text, text) to service_role;
