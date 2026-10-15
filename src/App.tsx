import { AppRoutes } from './router';

type AppProps = {
  // A prerender passes the request path; the browser falls back to the current URL.
  pathname?: string;
};

function App({ pathname }: AppProps) {
  return <AppRoutes pathname={pathname ?? currentPathname()} />;
}

function currentPathname(): string {
  return typeof window === 'undefined' ? '/' : window.location.pathname;
}

export default App;
