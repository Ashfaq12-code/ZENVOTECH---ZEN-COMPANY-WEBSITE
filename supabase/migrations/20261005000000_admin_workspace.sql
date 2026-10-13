create extension if not exists pgcrypto with schema extensions;

create table if not exists public.admin_invites (
  username text primary key,
  setup_code_hash text,
  claimed_at timestamptz,
  constraint admin_invites_allowed_username check (username in ('Ashxx12', 'Zaid12', 'Firaz12', 'Ashfaq12'))
);

insert into public.admin_invites (username)
values ('Ashxx12'), ('Zaid12'), ('Firaz12'), ('Ashfaq12')
on conflict (username) do nothing;

create table if not exists public.admin_accounts (
  user_id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  login_email text not null unique,
  created_at timestamptz not null default now()
);

create unique index if not exists admin_accounts_username_lower_idx
on public.admin_accounts (lower(username));

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 90),
  country text not null check (char_length(country) between 1 and 80),
  image_url text not null check (image_url ~ '^https?://'),
  live_url text not null check (live_url ~ '^https?://'),
  created_at timestamptz not null default now()
);

create table if not exists public.client_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  country text not null check (char_length(country) between 1 and 80),
  rating integer not null check (rating between 1 and 5),
  body text not null check (char_length(body) between 12 and 1000),
  created_at timestamptz not null default now()
);

create table if not exists public.admin_notifications (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.admin_accounts(user_id) on delete cascade,
  kind text not null check (kind in ('project', 'review')),
  title text not null,
  message text not null,
  record_id uuid not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists projects_created_at_idx on public.projects (created_at desc);
create index if not exists client_reviews_created_at_idx on public.client_reviews (created_at desc);
create index if not exists admin_notifications_owner_created_idx on public.admin_notifications (owner_id, created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admin_accounts where user_id = (select auth.uid())
  );
$$;

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
    and setup_code_hash is not null
    and setup_code_hash = extensions.crypt(p_setup_code, setup_code_hash)
  returning username into claimed_username;
  return claimed_username is not null;
end;
$$;

revoke all on function public.claim_admin_invite(text, text) from public, anon, authenticated;
grant execute on function public.claim_admin_invite(text, text) to service_role;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_invites enable row level security;
alter table public.admin_accounts enable row level security;
alter table public.projects enable row level security;
alter table public.client_reviews enable row level security;
alter table public.admin_notifications enable row level security;

create policy "Admins can read their own account"
on public.admin_accounts for select to authenticated
using (user_id = (select auth.uid()));

create policy "Anyone can read projects"
on public.projects for select to anon, authenticated
using (true);

create policy "Admins can manage projects"
on public.projects for all to authenticated
using ((select public.is_admin()))
with check ((select public.is_admin()));

create policy "Anyone can read client reviews"
on public.client_reviews for select to anon, authenticated
using (true);

create policy "Visitors can submit client reviews"
on public.client_reviews for insert to anon, authenticated
with check (true);

create policy "Admins can delete client reviews"
on public.client_reviews for delete to authenticated
using ((select public.is_admin()));

create policy "Admins can read their notifications"
on public.admin_notifications for select to authenticated
using (owner_id = (select auth.uid()));

create policy "Admins can update their notifications"
on public.admin_notifications for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));

grant select on public.projects, public.client_reviews to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant insert, delete on public.client_reviews to authenticated;
grant insert on public.client_reviews to anon;
grant select on public.admin_accounts to authenticated;
grant select, update on public.admin_notifications to authenticated;

create or replace function public.notify_admins_of_content()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  notification_kind text;
  notification_title text;
  notification_message text;
begin
  if tg_table_name = 'projects' then
    notification_kind := 'project';
    notification_title := 'New project added';
    notification_message := new.name || ' · ' || new.country;
  else
    notification_kind := 'review';
    notification_title := 'New client review';
    notification_message := new.name || ' · ' || new.rating || ' star review';
  end if;

  insert into public.admin_notifications (owner_id, kind, title, message, record_id)
  select user_id, notification_kind, notification_title, notification_message, new.id
  from public.admin_accounts;
  return new;
end;
$$;

drop trigger if exists notify_admins_on_project on public.projects;
create trigger notify_admins_on_project after insert on public.projects
for each row execute function public.notify_admins_of_content();

drop trigger if exists notify_admins_on_review on public.client_reviews;
create trigger notify_admins_on_review after insert on public.client_reviews
for each row execute function public.notify_admins_of_content();

do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'projects') then
    alter publication supabase_realtime add table public.projects;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'client_reviews') then
    alter publication supabase_realtime add table public.client_reviews;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'admin_notifications') then
    alter publication supabase_realtime add table public.admin_notifications;
  end if;
end;
$$;