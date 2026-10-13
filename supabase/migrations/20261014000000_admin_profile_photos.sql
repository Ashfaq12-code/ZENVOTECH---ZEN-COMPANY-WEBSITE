create table if not exists public.admin_profiles (
  user_id uuid primary key references public.admin_accounts(user_id) on delete cascade,
  username text not null,
  avatar_url text,
  updated_at timestamptz not null default now()
);

insert into public.admin_profiles (user_id, username)
select user_id, username
from public.admin_accounts
on conflict (user_id) do update set username = excluded.username;

create or replace function public.sync_admin_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.admin_profiles (user_id, username)
  values (new.user_id, new.username)
  on conflict (user_id) do update set username = excluded.username;
  return new;
end;
$$;

drop trigger if exists sync_admin_profile_from_account on public.admin_accounts;
create trigger sync_admin_profile_from_account
after insert or update of username on public.admin_accounts
for each row execute function public.sync_admin_profile();

alter table public.admin_profiles enable row level security;

drop policy if exists "Admins can read admin profiles" on public.admin_profiles;
create policy "Admins can read admin profiles"
on public.admin_profiles for select to authenticated
using ((select public.is_admin()));

drop policy if exists "Admins can create their own profile" on public.admin_profiles;
create policy "Admins can create their own profile"
on public.admin_profiles for insert to authenticated
with check (
  user_id = (select auth.uid())
  and exists (select 1 from public.admin_accounts where user_id = (select auth.uid()))
);

drop policy if exists "Admins can update their own profile" on public.admin_profiles;
create policy "Admins can update their own profile"
on public.admin_profiles for update to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

grant select, insert, update on public.admin_profiles to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('admin-avatars', 'admin-avatars', true, 15728640, array['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view admin profile photos" on storage.objects;
create policy "Anyone can view admin profile photos"
on storage.objects for select to public
using (bucket_id = 'admin-avatars');

drop policy if exists "Admins can upload their own profile photos" on storage.objects;
create policy "Admins can upload their own profile photos"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'admin-avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
  and (select public.is_admin())
);

drop policy if exists "Admins can update their own profile photos" on storage.objects;
create policy "Admins can update their own profile photos"
on storage.objects for update to authenticated
using (
  bucket_id = 'admin-avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
)
with check (
  bucket_id = 'admin-avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop policy if exists "Admins can delete their own profile photos" on storage.objects;
create policy "Admins can delete their own profile photos"
on storage.objects for delete to authenticated
using (
  bucket_id = 'admin-avatars'
  and (storage.foldername(name))[1] = (select auth.uid())::text
);

drop function if exists public.get_admin_roster();
create function public.get_admin_roster()
returns table (user_id uuid, username text, avatar_url text)
language sql
stable
security definer
set search_path = ''
as $$
  select account.user_id, account.username, profile.avatar_url
  from public.admin_accounts as account
  left join public.admin_profiles as profile on profile.user_id = account.user_id
  where (select public.is_admin())
  order by account.username;
$$;

revoke all on function public.get_admin_roster() from public, anon;
grant execute on function public.get_admin_roster() to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'admin_profiles'
  ) then
    alter publication supabase_realtime add table public.admin_profiles;
  end if;
end;
$$;
