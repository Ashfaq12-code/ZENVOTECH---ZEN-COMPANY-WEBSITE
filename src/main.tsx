import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './theme-overrides.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Missing #root element in index.html.');

const app = (
  <StrictMode>
    <App pathname={window.location.pathname} />
  </StrictMode>
);

// Prerendered routes ship markup in #root; the admin shell and dev server ship it empty.
if (rootElement.hasChildNodes()) hydrateRoot(rootElement, app);
else createRoot(rootElement).render(app);
