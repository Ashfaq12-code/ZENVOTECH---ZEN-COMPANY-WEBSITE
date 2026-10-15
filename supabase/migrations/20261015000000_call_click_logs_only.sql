-- Call taps used to be stored as fake 5-star rows in client_reviews
-- (body '__CALL_CLICK__:<number>[__ASSIGNED__:<admin>]'). They now live only in
-- call_click_logs. This moves the legacy rows, deletes them from client_reviews,
-- blocks new ones, and tightens call_click_logs privileges.

-- 1. Move legacy call taps that pass the call_click_logs number check.
insert into public.call_click_logs (id, clicked_number, assigned_admin, created_at)
select
  legacy.id,
  legacy.clicked_number,
  legacy.assigned_admin,
  legacy.created_at
from (
  select
    r.id,
    split_part(substr(r.body, char_length('__CALL_CLICK__:') + 1), '__ASSIGNED__:', 1) as clicked_number,
    nullif(split_part(r.body, '__ASSIGNED__:', 2), '') as assigned_admin,
    r.created_at
  from public.client_reviews r
  where r.body like '\_\_CALL\_CLICK\_\_:%'
) as legacy
where legacy.clicked_number in ('0752454335', '0773991281', '0717369661', '0774241122')
on conflict (id) do nothing;

-- 2. Remove every call-tap row from reviews so ratings and counts are real.
delete from public.client_reviews
where body like '\_\_CALL\_CLICK\_\_:%';

-- 3. Old cached clients must not keep writing call taps as reviews.
alter table public.client_reviews
  drop constraint if exists client_reviews_not_call_click;
alter table public.client_reviews
  add constraint client_reviews_not_call_click
  check (body not like '\_\_CALL\_CLICK\_\_:%');

-- 4. call_click_logs is append-only for visitors: insert of clicked_number only,
--    no select/update/delete. Supabase grants ALL on new tables by default, so
--    revoke first and grant back only what each role needs.
revoke all on public.call_click_logs from anon, authenticated;
grant insert (clicked_number) on public.call_click_logs to anon, authenticated;
grant select, delete on public.call_click_logs to authenticated;
grant update (assigned_admin) on public.call_click_logs to authenticated;

-- 5. The admin dashboard removes handled call logs.
drop policy if exists "Admins can delete phone link clicks" on public.call_click_logs;
create policy "Admins can delete phone link clicks"
on public.call_click_logs for delete to authenticated
using ((select public.is_admin()));

-- 6. Optional intrinsic size for project screenshots so public cards reserve space (CLS).
alter table public.projects
  add column if not exists image_width integer check (image_width is null or image_width between 1 and 10000),
  add column if not exists image_height integer check (image_height is null or image_height between 1 and 10000);
