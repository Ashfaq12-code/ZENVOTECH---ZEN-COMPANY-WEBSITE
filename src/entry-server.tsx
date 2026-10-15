// Prerender entry: built with `vite build --ssr` and called by scripts/prerender.mjs once per route.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import App from './App';
import { takeServerJsonLd } from './lib/structuredData';

export { buildRouteHead } from './seo';
export type { RouteHead, SeoPage } from './seo';

export function render(pathname: string) {
  const html = renderToString(
    <StrictMode>
      <App pathname={pathname} />
    </StrictMode>
  );
  return { html, jsonLd: takeServerJsonLd() };
}
