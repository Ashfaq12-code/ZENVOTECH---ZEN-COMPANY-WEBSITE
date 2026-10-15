# AGENTS.md

Rules for anyone changing this repo, human or agent. Read it before your first change.

**Only change code where I put a `PI!` comment.** No changes on your own initiative. Spot a problem elsewhere? Name it in one line, don't touch it.

**I have ADHD.** No walls of text. Show the full thing, shrunk as far as it goes.

## What this is

- Marketing site for **Zenvora Technologies (Pvt) Ltd**, trading as **Zenvotech**, a software agency in Sri Lanka. Served at `zenvora.lk`.
- B2B agency/portfolio. Sells four services: web development, mobile apps, custom software, business automation.
- SPA: search engines see one `index.html`. Its meta + Schema.org tags carry the SEO. Treat them as product code.
- Scaffolded by Bolt.new (`ZENVORA/config.json`, template `bolt-vite-react-ts`).

## Branches

Main branch is `development`. Target every PR at `development`, never `main`. Never commit or push directly to `development`.

## Stack (locked versions, check the lockfile before trusting this table)

| Thing | Version |
|---|---|
| Node / npm | 22 / 10, `package-lock.json` v3. npm only, never yarn/pnpm |
| React / react-dom | 18.3.1 |
| TypeScript | 5.6.3 |
| Vite / plugin-react | 5.4.8 / 4.3.2 |
| Tailwind / PostCSS / autoprefixer | 3.4.17 / 8.4.47 / 10.4.20 |
| Supabase JS | 2.57.4 (Postgres + SQL migrations, Deno edge functions `admin-api`, `google-reviews`) |
| EmailJS | 5.0.3 (contact form) |
| Icons | lucide-react 0.446.0 |
| Lint | ESLint 9 flat config + typescript-eslint |
| Hosting | Netlify + Vercel configs, both rewrite to `index.html` |

- **No major bumps without an ADR.** React 19, Vite 6+, Tailwind 4 all exist. Tailwind 3 → 4 is the big one (config moves to CSS `@theme`). One major per PR, never bundled.
- Stale `caniuse-lite`: `npx update-browserslist-db@latest` is a safe standalone PR.

## Where things live

```
index.html              meta, OG, Schema.org JSON-LD (SEO lives here)
src/App.tsx             home page + hand-rolled routing (1,520 lines, over cap, split when a PI! touches it)
src/admin/              admin workspace + client review form (Supabase auth)
src/<feature>/          service pages, who-we-are, team, reviews, portfolio
supabase/migrations/    SQL, append-only
supabase/functions/     Deno edge functions: admin-api, google-reviews
netlify.toml, vercel.json   SPA rewrites, keep both in sync
```

## Architecture rules

### Layers

- **UI** = components (dumb) + hooks (logic). **Data** = `services/` (one per external source) + `repositories/` (one per data type).
- Flow is one way: data → hooks → components. Events go component → hook → repository.
- **Component** renders props/hook state only. Allowed logic: show/hide on a flag, layout from viewport, links.
- **Hook** (`useXxx`) holds UI state + async actions. Calls repositories, never Supabase directly.
- **Repository** (`XxxRepository`) is the only code that calls a service. Maps API rows → domain types. Returns `Result<T>`, never throws to UI.
- **Service** wraps exactly one source: `supabaseClient`, `emailService` (EmailJS), `reviewsService` (edge fn). Stateless. Knows nothing about repositories.
- Only `src/lib/supabase.ts` calls `createClient`. Nothing else imports `@supabase/supabase-js`.

### Types and state

- `strict: true`. No `any`, no `as` casts to dodge errors, no `!` non-null.
- API row types (`XxxRow`) are separate from domain types (`Xxx`). Generate DB types with `supabase gen types`, never hand-write them.
- One async action = one state union: `{ status: 'idle' | 'running' | 'error' | 'done' }`. Never parallel `isLoading`/`isError` booleans that can contradict.
- Every view handles **running / error / empty / loaded**.
- Fence async: a request that can be superseded carries a token; stale results are dropped.
- Exhaustive `switch` on unions with a `never` check, no `default`.

### Routing

- Hand-rolled on `window.location.pathname`. Routes: `/`, `/who-we-are`, `/admin`, service pages.
- New route = one entry in the route map + one SEO entry (title, description, canonical). No route without both.
- Moving to `react-router` needs an ADR first. Don't half-migrate.

### Admin + Supabase

- **RLS on every table, no exceptions.** The anon key ships to every browser, so RLS is the only wall.
- Service-role key lives only in edge function env. Never in `src/`, never `VITE_*`.
- Anything privileged goes through `admin-api`, which checks the caller's JWT + role itself.
- Migrations are append-only. Never edit a merged one; write a new one.
- Edge functions: validate every input, return `{ error: { code, message } }`, never raw Postgres errors.

### Contact form

- EmailJS public key is public by design. Rate-limit in the EmailJS dashboard + honeypot field.
- Validate client side for UX only; never trust it.

## Files and code

- **Caps: file ≤ 300 lines, function/component ≤ 40 lines.** Past either, split by responsibility in the same folder. No `utils.ts` dumping ground.
- One transform, one home (e.g. `reviewMapper.ts`). Reuse, never copy.
- Order: imports (packages, then `@/`, then relative), types, component, private helpers.
- Single quotes, trailing commas, `const` over `let`, named exports (default only where Vite needs it).
- No dead code, no commented-out code, no `console.log`, no TODO you didn't inherit. Comments say why, never what.
- Env vars: `VITE_` prefix only for public values. Read them once in `src/config/env.ts`, typed.

## UI (full rules in `DESIGN.md`)

- Never hardcode colour, size or spacing. Tailwind tokens from `tailwind.config` only. No arbitrary `[#hex]` / `[13px]` values.
- Animate state changes (loading → content). Respect `prefers-reduced-motion`.
- Copy is plain English. Short. No jargon, no hype ("cutting-edge", "synergy" banned).

## Testing

- **Today there is no test runner in the repo.** Adding Vitest + Testing Library + Playwright is its own PR, its own ADR.
- Once in: unit-test every repository, hook, mapper. Component test every page. Playwright e2e for every flow: home → service page → contact submit, admin login → review form, reviews load.
- Coverage gate ≥ 95% of `src/` lines. A change that drops it is not done.
- Fakes in `src/testing/fakes/`, one per file. No sleeps to hide a bug.

## Performance + SEO gates

- LCP ≤ 2.0 s, INP ≤ 200 ms, CLS ≤ 0.05, initial JS ≤ 150 KB gz, Lighthouse ≥ 95 on every page.
- Portfolio videos: `preload="none"`, poster image, lazy below the fold. They are the LCP killers.
- `/admin` is lazy-loaded (`React.lazy`) so Supabase auth code never ships to visitors.
- Schema.org JSON-LD must validate (Google Rich Results test) after any `index.html` change.

## Evidence

- Facts about a library come from `node_modules/<pkg>` or its current docs, never memory.
- Read the whole file and every caller before editing. Trace the path end to end.
- Two readings of the code fit equally? **Stop and ask.**
- Every change ends with these, both reported:

```sh
npm run lint
npm run build    # tsc + vite build, 0 errors
```

## Never

- Commit `.env`, keys, or the service-role key.
- Disable RLS, "temporarily" or otherwise.
- Hand-roll auth, forms validation libs, or date math that a proven lib already does.
- Edit generated Supabase types by hand.
- Add a dependency without a one-line reason in the PR.