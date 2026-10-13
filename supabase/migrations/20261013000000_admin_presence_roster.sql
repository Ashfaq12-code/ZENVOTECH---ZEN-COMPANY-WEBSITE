create or replace function public.get_admin_roster()
returns table (user_id uuid, username text)
language sql
stable
security definer
set search_path = ''
as $$
  select account.user_id, account.username
  from public.admin_accounts as account
  where (select public.is_admin())
  order by account.username;
$$;

revoke all on function public.get_admin_roster() from public, anon;
grant execute on function public.get_admin_roster() to authenticated;
