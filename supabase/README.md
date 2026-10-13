# Zenvora admin workspace setup

The admin portal and live project/review publishing use Supabase. Do not put the service-role key, setup codes, or passwords in the browser bundle or source control.

## Configure the frontend

Create a local `.env` file (and configure the same values in your host's environment settings):

```text
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

## Install the database schema

Apply the SQL migrations in `migrations/` in filename order with the Supabase CLI or SQL editor. The `20261014000000_admin_profile_photos.sql` migration creates the admin profile table and realtime publication. Profile photos are resized in the browser and stored in that table, so photo uploads do not depend on a Supabase Storage bucket. If the existing project does not yet have the admin profile table or roster function, run `setup_admin_profiles.sql` in its SQL Editor; this installs only the required profile table, admin-only policies, and realtime roster function.

Before inviting admins, set a different, high-entropy one-time code for each account in the SQL editor. Share each code privately with only its intended administrator; the code can only be used once. Do not commit real codes:

```sql
update public.admin_invites
set setup_code_hash = extensions.crypt('REPLACE_WITH_A_PRIVATE_RANDOM_CODE', extensions.gen_salt('bf'))
where username = 'Ashxx12';
```

Repeat for `Zaid12`, `Firaz12`, and `Ashfaq12`, using a unique code per person. Store the raw codes outside the repository. Each admin uses the matching username and code once at `/admin`, then sets their own strong password. Thereafter, they sign in with username and password.

Configure the hosting provider to serve the SPA entry (`index.html`) for `/admin` as well as `/`; direct visits and refreshes of the admin URL need that fallback.

## Deploy the admin Edge Function

Deploy `functions/admin-api/index.ts` as the `admin-api` Supabase Edge Function. The included `config.toml` disables gateway JWT verification because first-time setup and username lookup happen before an admin session exists; the function validates one-time codes for setup and authenticates the session itself for username changes. Supabase supplies `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to deployed functions; keep the service-role key server-side. Do not enable public Supabase Auth sign-ups: accounts are created only after the server verifies a one-time invite code.

The schema intentionally allows public review submissions, as requested. Submitted reviews are immediately visible on the site and generate a notification for each registered admin. Admins can remove a review from the dashboard.
