import type { SupabaseClient } from '@supabase/supabase-js';

type Step = { key: PropertyKey; args?: unknown[] };
type Settled = { value: unknown };
type Starter = () => Promise<Settled>;

// Realtime calls that do work without ever being awaited.
const eagerCalls = new Set<PropertyKey>(['subscribe', 'removeChannel', 'removeAllChannels']);
const starters = new WeakMap<object, Starter>();
// One queue keeps replays in call order (e.g. StrictMode subscribe → remove → subscribe).
let queue: Promise<unknown> = Promise.resolve();

/**
 * A stand-in for the Supabase client that records property/method chains and
 * replays them on the real client once supabase-js has been dynamically loaded.
 * Lets existing `supabase.from(...)` / `.channel(...)` call sites stay unchanged
 * while supabase-js leaves the entry bundle. New code should call getSupabase().
 */
export function createDeferredClient(load: () => Promise<SupabaseClient | null>): SupabaseClient {
  const run = (steps: Step[]): Promise<Settled> => {
    const argValues = new Map<unknown, Promise<Settled>>();
    steps.forEach(({ args }) => args?.forEach((arg) => {
      const start = isObjectLike(arg) ? starters.get(arg) : undefined;
      if (start) argValues.set(arg, start());
    }));
    const result = queue.then(async () => {
      const client = await load();
      if (!client) throw new Error('Supabase is not configured.');
      return replay(client, steps, argValues);
    });
    queue = result.catch(() => undefined);
    return result;
  };

  const make = (steps: Step[]): unknown => {
    let started: Promise<Settled> | null = null;
    const start: Starter = () => (started ??= run(steps));
    const settle = () => start().then(({ value }) => value);
    const proxy = new Proxy(function deferred() {}, {
      get(_target, key) {
        if (key === 'then') return (ok?: (v: unknown) => unknown, fail?: (e: unknown) => unknown) => settle().then(ok, fail);
        if (key === 'catch') return (fail?: (e: unknown) => unknown) => settle().catch(fail);
        if (key === 'finally') return (done?: () => void) => settle().finally(done);
        return make([...steps, { key }]);
      },
      apply(_target, _this, args: unknown[]) {
        const last = steps[steps.length - 1];
        if (!last) throw new TypeError('The Supabase client is not callable.');
        const next = make([...steps.slice(0, -1), { key: last.key, args }]);
        if (eagerCalls.has(last.key)) void Promise.resolve(next).catch(() => undefined);
        return next;
      },
    });
    starters.set(proxy, start);
    return proxy;
  };

  // The proxy mirrors SupabaseClient at runtime; TypeScript cannot see through a Proxy.
  return make([]) as SupabaseClient;
}

// Returns the result wrapped so a thenable query builder is not run (and awaited) inside the queue.
async function replay(client: SupabaseClient, steps: Step[], argValues: Map<unknown, Promise<Settled>>): Promise<Settled> {
  let current: unknown = client;
  for (const { key, args } of steps) {
    if (!isObjectLike(current)) throw new TypeError(`Cannot read ${String(key)} of a non-object.`);
    const owner = current;
    const member: unknown = Reflect.get(owner, key);
    if (!args) {
      current = member;
      continue;
    }
    if (typeof member !== 'function') throw new TypeError(`${String(key)} is not a function.`);
    const resolvedArgs = await Promise.all(args.map(async (arg) => {
      const pending = argValues.get(arg);
      return pending ? (await pending).value : arg;
    }));
    current = Reflect.apply(member, owner, resolvedArgs);
  }
  return { value: current };
}

function isObjectLike(value: unknown): value is object {
  return (typeof value === 'object' && value !== null) || typeof value === 'function';
}
