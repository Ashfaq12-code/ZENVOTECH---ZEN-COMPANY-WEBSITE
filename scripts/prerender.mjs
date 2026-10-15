// Writes static HTML for every public route after `vite build` + `vite build --ssr`.
// Body comes from React's renderToString (hydrated by src/main.tsx); the per-route head
// block between the route-head markers in index.html is rebuilt from src/seo.ts.
import { readFile, rm, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distDir = resolve(root, 'dist');
const ssrDir = resolve(root, 'dist-ssr');

const routes = [
  { path: '/', page: 'home', file: 'index.html', preloads: ['<link rel="preload" as="image" href="/media/home/hero.webp" fetchpriority="high" />'] },
  { path: '/who-we-are', page: 'about', file: 'who-we-are.html' },
  { path: '/services/website-development', page: 'websites', file: 'services/website-development.html' },
  { path: '/services/app-development', page: 'apps', file: 'services/app-development.html' },
  { path: '/services/software-development', page: 'software', file: 'services/software-development.html' },
  { path: '/services/automation', page: 'automation', file: 'services/automation.html' },
];

const headBlock = /<!-- route-head:start[^>]*-->[\s\S]*?<!-- route-head:end -->/;
const noscriptBlock = /\s*<noscript>[\s\S]*?<\/noscript>/;
const emptyRoot = '<div id="root"></div>';

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escapeText = (value) => String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON-LD lives inside <script>; "<" escaped so text can never close the tag.
const safeJson = (json) => json.replace(/</g, '\\u003c');

const meta = (attr, key, content) =>
  content === null || content === undefined ? null : `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
const jsonLdScript = (id, json) => `<script id="${id}" type="application/ld+json">${safeJson(json)}</script>`;

function renderHead(head, { jsonLd = [], preloads = [] } = {}) {
  const lines = [
    `<title>${escapeText(head.title)}</title>`,
    meta('name', 'description', head.description),
    meta('name', 'robots', head.robots),
    head.canonical ? `<link rel="canonical" href="${escapeAttr(head.canonical)}" />` : null,
    ...head.alternates.map((alt) => `<link rel="alternate" hreflang="${alt.hreflang}" href="${escapeAttr(alt.href)}" />`),
    meta('property', 'og:type', head.og.type),
    meta('property', 'og:site_name', head.og.siteName),
    meta('property', 'og:locale', head.og.locale),
    meta('property', 'og:title', head.og.title),
    meta('property', 'og:description', head.og.description),
    meta('property', 'og:url', head.og.url),
    meta('property', 'og:image', head.og.image),
    meta('property', 'og:image:alt', head.og.imageAlt),
    meta('property', 'og:image:width', head.og.imageWidth),
    meta('property', 'og:image:height', head.og.imageHeight),
    meta('property', 'og:image:type', head.og.imageType),
    meta('name', 'twitter:card', head.twitter.card),
    meta('name', 'twitter:title', head.twitter.title),
    meta('name', 'twitter:description', head.twitter.description),
    meta('name', 'twitter:image', head.twitter.image),
    meta('name', 'twitter:image:alt', head.twitter.imageAlt),
    ...preloads,
    // Same ids the client uses (setPageSeo / useJsonLd), so hydration replaces instead of duplicating.
    head.jsonLd.length > 0 ? jsonLdScript('page-seo-schema', JSON.stringify(head.jsonLd)) : null,
    ...jsonLd.map(({ id, json }) => jsonLdScript(id, json)),
  ];
  return lines.filter(Boolean).join('\n    ');
}

function replaceOnce(html, pattern, replacement, label) {
  if (!(typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html))) {
    throw new Error(`prerender: ${label} not found in dist/index.html`);
  }
  return html.replace(pattern, () => replacement);
}

const template = await readFile(resolve(distDir, 'index.html'), 'utf8');
const { render, buildRouteHead } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href);

// /admin stays the client-only shell, with the private (noindex) head.
const adminHtml = replaceOnce(template, headBlock, renderHead(buildRouteHead('private')), 'route-head block');
await writeFile(resolve(distDir, 'admin.html'), adminHtml);

for (const route of routes) {
  const { html: body, jsonLd } = render(route.path);
  if (!body.includes('<h1')) throw new Error(`prerender: ${route.path} rendered without an <h1>`);
  let html = replaceOnce(template, headBlock, renderHead(buildRouteHead(route.page), { jsonLd, preloads: route.preloads }), 'route-head block');
  html = replaceOnce(html, noscriptBlock, '', '<noscript> fallback');
  html = replaceOnce(html, emptyRoot, `<div id="root">${body}</div>`, 'empty #root');
  const outFile = resolve(distDir, route.file);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  console.log(`prerender: ${route.path} -> dist/${route.file} (${(html.length / 1024).toFixed(1)} kB)`);
}

await rm(ssrDir, { recursive: true, force: true });
