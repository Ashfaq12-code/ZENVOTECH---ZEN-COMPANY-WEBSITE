create table if not exists public.call_click_logs (
  id uuid primary key default gen_random_uuid(),
  clicked_number text not null check (clicked_number in ('0752454335', '0773991281', '0717369661', '0774241122')),
  assigned_admin text,
  created_at timestamptz not null default now()
);

create index if not exists call_click_logs_created_at_idx
on public.call_click_logs (created_at desc);

alter table public.call_click_logs enable row level security;

create policy "Visitors can log allowed phone link clicks"
on public.call_click_logs for insert to anon, authenticated
with check (
  clicked_number in ('0752454335', '0773991281', '0717369661', '0774241122')
  and assigned_admin is null
);

create policy "Admins can read phone link clicks"
on public.call_click_logs for select to authenticated
using ((select public.is_admin()));

create policy "Admins can assign phone link clicks to themselves"
on public.call_click_logs for update to authenticated
using ((select public.is_admin()))
with check (
  (select public.is_admin())
  and (
    assigned_admin is null
    or assigned_admin = (
      select username
      from public.admin_accounts
      where user_id = (select auth.uid())
    )
  )
);

grant insert (clicked_number) on public.call_click_logs to anon, authenticated;
grant select on public.call_click_logs to authenticated;
grant update (assigned_admin) on public.call_click_logs to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'call_click_logs'
  ) then
    alter publication supabase_realtime add table public.call_click_logs;
  end if;
end;
$$;
