import { SiteHeader } from '@/components/SiteHeader';
import { serviceLinks } from '@/config/navigation';
import HomeFooter from '../HomeFooter';

export function NotFoundPage() {
  return (
    <div className="site-shell">
      <SiteHeader active="home" />
      <main id="main" tabIndex={-1} className="section-pad pb-16 pt-36 md:pb-24 md:pt-44">
        <p className="eyebrow">Error 404</p>
        <h1>Page not found.</h1>
        <p className="max-w-prose text-base">The page you asked for does not exist or has moved. Try one of these instead:</p>
        <ul className="mt-6 flex flex-col gap-3 text-base font-semibold underline">
          <li><a href="/">Go to the home page</a></li>
          {serviceLinks.map((link) => (
            <li key={link.href}><a href={link.href}>{link.label} services</a></li>
          ))}
        </ul>
      </main>
      <HomeFooter showMap={false} />
    </div>
  );
}
