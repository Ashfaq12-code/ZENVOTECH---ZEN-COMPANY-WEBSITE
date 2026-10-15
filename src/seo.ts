// No DOM access at module top level and a relative import (no Vite alias), so a
// Node prerender step can import buildRouteHead and write static <head> per route.
import { SITE } from './config/site';

type RouteKind = 'home' | 'about' | 'service' | 'private' | 'notFound';

type RouteMeta = {
  path: string;
  kind: RouteKind;
  title: string;
  description: string | null;
  breadcrumb?: string;
  serviceType?: string;
};

type JsonLdNode = Record<string, unknown>;

export type RouteHead = {
  title: string;
  description: string | null;
  canonical: string | null;
  robots: string;
  alternates: readonly { hreflang: string; href: string }[];
  og: {
    type: 'website';
    siteName: string;
    locale: string;
    title: string;
    description: string | null;
    url: string | null;
    image: string;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
    imageType: string;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string | null;
    image: string;
    imageAlt: string;
  };
  jsonLd: readonly JsonLdNode[];
};

const siteUrl = SITE.url;
const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;
const ogImage = {
  url: `${siteUrl}/media/brand/og-image.png`,
  alt: `${SITE.name} logo`,
  width: 1200,
  height: 630,
  type: 'image/png',
};
const areaServed = [{ '@type': 'Country', name: SITE.address.countryName }, { '@type': 'Place', name: 'Worldwide' }];

export const seoRoutes = {
  home: {
    path: '/',
    kind: 'home',
    title: `Web, App & Software Agency in Sri Lanka | ${SITE.name}`,
    description:
      `${SITE.name} is a software agency in Sri Lanka. We build websites, mobile apps, custom software and business automation for clients worldwide.`,
  },
  about: {
    path: '/who-we-are',
    kind: 'about',
    title: `About ${SITE.name} | Software Agency in Sri Lanka`,
    description:
      `Meet ${SITE.name}, a software agency in Sri Lanka. We plan, build and support websites, mobile apps, custom software and automation for you.`,
    breadcrumb: 'Who we are',
  },
  websites: {
    path: '/services/website-development',
    kind: 'service',
    title: `Website Development in Sri Lanka | ${SITE.name}`,
    description:
      `Get a fast, responsive website for your business. ${SITE.name} designs and builds custom websites in Sri Lanka, for clients here and worldwide.`,
    breadcrumb: 'Website development',
    serviceType: 'Website development',
  },
  apps: {
    path: '/services/app-development',
    kind: 'service',
    title: `Mobile App Development in Sri Lanka | ${SITE.name}`,
    description:
      `Plan, build and launch iOS and Android apps with ${SITE.name} in Sri Lanka, from product design and development to release and ongoing support.`,
    breadcrumb: 'App development',
    serviceType: 'Mobile app development',
  },
  software: {
    path: '/services/software-development',
    kind: 'service',
    title: `Custom Software Development in Sri Lanka | ${SITE.name}`,
    description:
      `${SITE.name} builds custom business software, desktop applications and scalable platforms in Sri Lanka, tailored to the way your team works.`,
    breadcrumb: 'Software development',
    serviceType: 'Custom software development',
  },
  automation: {
    path: '/services/automation',
    kind: 'service',
    title: `Business Automation in Sri Lanka | ${SITE.name}`,
    description:
      `Automate repetitive work with integrations, APIs and custom tools from ${SITE.name} in Sri Lanka, so your team spends less time on manual tasks.`,
    breadcrumb: 'Automation',
    serviceType: 'Business process automation',
  },
  notFound: {
    path: '',
    kind: 'notFound',
    title: `Page not found | ${SITE.name}`,
    description:
      `The page you were looking for does not exist. Go back to the ${SITE.name} home page to see our web, app, software and automation services.`,
  },
  private: {
    path: '',
    kind: 'private',
    title: `Private page | ${SITE.name}`,
    description: null,
  },
} as const satisfies Record<string, RouteMeta>;

export type SeoPage = keyof typeof seoRoutes;

const indexableKinds: readonly RouteKind[] = ['home', 'about', 'service'];

export function buildRouteHead(page: SeoPage): RouteHead {
  const route: RouteMeta = seoRoutes[page];
  const indexable = indexableKinds.includes(route.kind);
  const canonical = indexable ? absoluteUrl(route.path) : null;
  return {
    title: route.title,
    description: route.description,
    canonical,
    robots: indexable ? 'index, follow, max-image-preview:large' : 'noindex, nofollow',
    alternates: canonical
      ? [
          { hreflang: 'en-LK', href: canonical },
          { hreflang: 'x-default', href: canonical },
        ]
      : [],
    ...buildSocial(route, canonical),
    jsonLd: canonical ? buildJsonLd(route, canonical) : [],
  };
}

function buildSocial(route: RouteMeta, canonical: string | null): Pick<RouteHead, 'og' | 'twitter'> {
  return {
    og: {
      type: 'website',
      siteName: SITE.name,
      locale: 'en_LK',
      title: route.title,
      description: route.description,
      url: canonical,
      image: ogImage.url,
      imageAlt: ogImage.alt,
      imageWidth: ogImage.width,
      imageHeight: ogImage.height,
      imageType: ogImage.type,
    },
    twitter: {
      card: 'summary_large_image',
      title: route.title,
      description: route.description,
      image: ogImage.url,
      imageAlt: ogImage.alt,
    },
  };
}

function absoluteUrl(path: string): string {
  return path === '/' ? `${siteUrl}/` : `${siteUrl}${path}`;
}

function buildJsonLd(route: RouteMeta, canonical: string): JsonLdNode[] {
  const nodes: JsonLdNode[] = [buildWebPage(route, canonical)];
  if (route.breadcrumb) nodes.push(buildBreadcrumb(route.breadcrumb, canonical, route.kind === 'service'));
  if (route.serviceType) nodes.push(buildService(route, route.serviceType, canonical));
  return nodes;
}

function buildWebPage(route: RouteMeta, canonical: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': route.kind === 'about' ? 'AboutPage' : 'WebPage',
    '@id': `${canonical}#webpage`,
    url: canonical,
    name: route.title,
    description: route.description,
    inLanguage: 'en-LK',
    isPartOf: { '@id': websiteId },
    about: { '@id': organizationId },
    primaryImageOfPage: { '@type': 'ImageObject', url: ogImage.url },
    ...(route.breadcrumb ? { breadcrumb: { '@id': `${canonical}#breadcrumb` } } : {}),
    creator: { '@id': 'https://techalh.com/#organization' },
  };
}

// Mirrors the visible trail: service pages read Home > Services (home section) > page.
function buildBreadcrumb(name: string, canonical: string, isService: boolean): JsonLdNode {
  const services = isService ? [{ name: 'Services', item: `${siteUrl}/#services` }] : [];
  const trail = [{ name: 'Home', item: `${siteUrl}/` }, ...services, { name, item: canonical }];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: trail.map((step, index) => ({ '@type': 'ListItem', position: index + 1, ...step })),
  };
}

function buildService(route: RouteMeta, serviceType: string, canonical: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: serviceType,
    serviceType,
    description: route.description,
    url: canonical,
    provider: { '@id': organizationId },
    areaServed,
  };
}

export function setPageSeo(page: SeoPage) {
  const head = buildRouteHead(page);
  document.title = head.title;
  setMeta('name', 'description', head.description);
  setMeta('name', 'robots', head.robots);
  setMeta('property', 'og:type', head.og.type);
  setMeta('property', 'og:site_name', head.og.siteName);
  setMeta('property', 'og:locale', head.og.locale);
  setMeta('property', 'og:title', head.og.title);
  setMeta('property', 'og:description', head.og.description);
  setMeta('property', 'og:url', head.og.url);
  setMeta('property', 'og:image', head.og.image);
  setMeta('property', 'og:image:alt', head.og.imageAlt);
  setMeta('property', 'og:image:width', String(head.og.imageWidth));
  setMeta('property', 'og:image:height', String(head.og.imageHeight));
  setMeta('property', 'og:image:type', head.og.imageType);
  setMeta('name', 'twitter:card', head.twitter.card);
  setMeta('name', 'twitter:title', head.twitter.title);
  setMeta('name', 'twitter:description', head.twitter.description);
  setMeta('name', 'twitter:image', head.twitter.image);
  setMeta('name', 'twitter:image:alt', head.twitter.imageAlt);
  setCanonical(head.canonical);
  setAlternates(head.alternates);
  setPageJsonLd(head.jsonLd);
}

// null removes the tag, so private and 404 pages never ship empty content.
function setMeta(attribute: 'name' | 'property', key: string, content: string | null) {
  const existing = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (content === null) {
    existing?.remove();
    return;
  }
  const element = existing ?? document.createElement('meta');
  element.setAttribute(attribute, key);
  element.content = content;
  if (!existing) document.head.append(element);
}

function setCanonical(href: string | null) {
  const existing = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (href === null) {
    existing?.remove();
    return;
  }
  const element = existing ?? document.createElement('link');
  element.rel = 'canonical';
  element.href = href;
  if (!existing) document.head.append(element);
}

function setAlternates(alternates: RouteHead['alternates']) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((link) => link.remove());
  alternates.forEach(({ hreflang, href }) => {
    const link = document.createElement('link');
    link.rel = 'alternate';
    link.hreflang = hreflang;
    link.href = href;
    document.head.append(link);
  });
}

function setPageJsonLd(nodes: RouteHead['jsonLd']) {
  const scriptId = 'page-seo-schema';
  document.getElementById(scriptId)?.remove();
  if (nodes.length === 0) return;
  const script = document.createElement('script');
  script.id = scriptId;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(nodes);
  document.head.append(script);
}
