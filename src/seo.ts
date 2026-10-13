const siteUrl = 'https://zenvora.lk';
const organizationId = `${siteUrl}/#organization`;

const pageMetadata = {
  home: {
    path: '/',
    title: 'Web, Mobile & Software Development in Sri Lanka | Zenvotech',
    description:
      'Zenvotech builds custom websites, mobile apps, business software, and automation for companies in Sri Lanka and worldwide.',
  },
  about: {
    path: '/who-we-are',
    title: 'About Zenvotech | Digital Solutions Company in Sri Lanka',
    description:
      'Meet Zenvotech: a digital technology team delivering thoughtful web, mobile, software, and automation solutions for growing businesses.',
  },
  websites: {
    path: '/services/website-development',
    title: 'Website Development in Sri Lanka | Zenvotech',
    description:
      'Get a fast, responsive website built for your business. Zenvotech delivers custom website design and development in Sri Lanka.',
  },
  apps: {
    path: '/services/app-development',
    title: 'Mobile App Development in Sri Lanka | Zenvotech',
    description:
      'Plan and build iOS and Android applications with Zenvotech, from product design and development to launch and ongoing support.',
  },
  software: {
    path: '/services/software-development',
    title: 'Custom Software Development in Sri Lanka | Zenvotech',
    description:
      'Zenvotech develops custom business software, desktop applications, and scalable platforms tailored to your workflows.',
  },
  automation: {
    path: '/services/automation',
    title: 'Business Process Automation in Sri Lanka | Zenvotech',
    description:
      'Automate repetitive business workflows with integrations, APIs, and custom solutions from Zenvotech.',
  },
  private: {
    path: '',
    title: 'Private page | Zenvotech',
    description: '',
  },
} as const;

export type SeoPage = keyof typeof pageMetadata;

function setMeta(attribute: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

export function setPageSeo(page: SeoPage) {
  const metadata = pageMetadata[page];
  const isPrivate = page === 'private';
  const canonicalUrl = isPrivate ? '' : new URL(metadata.path, siteUrl).toString();

  document.title = metadata.title;
  setMeta('name', 'description', metadata.description);
  setMeta('name', 'robots', isPrivate ? 'noindex, nofollow' : 'index, follow, max-image-preview:large');
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'Zenvotech');
  setMeta('property', 'og:title', metadata.title);
  setMeta('property', 'og:description', metadata.description);
  setMeta('property', 'og:url', canonicalUrl);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', metadata.title);
  setMeta('name', 'twitter:description', metadata.description);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (isPrivate) {
    canonical?.remove();
  } else {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = canonicalUrl;
  }

  const pageSchemaId = 'page-seo-schema';
  let pageSchema = document.getElementById(pageSchemaId);
  if (isPrivate) {
    pageSchema?.remove();
    return;
  }

  if (!pageSchema) {
    pageSchema = document.createElement('script');
    pageSchema.id = pageSchemaId;
    pageSchema.setAttribute('type', 'application/ld+json');
    document.head.append(pageSchema);
  }
  pageSchema.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: metadata.title,
    description: metadata.description,
    url: canonicalUrl,
    isPartOf: { '@id': `${siteUrl}/#website` },
    about: { '@id': organizationId },
    creator: { '@id': 'https://techalh.com/#organization' },
  });
}
