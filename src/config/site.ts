type Phone = {
  e164: string;
  display: string;
};

type SiteConfig = {
  name: string;
  url: string;
  email: string;
  phone: Phone;
  whatsappUrl: string;
  googleProfileUrl: string;
  address: {
    street: string;
    locality: string;
    postalCode: string;
    region: string;
    country: string;
    countryName: string;
  };
  socials: {
    instagram: string;
    tiktok: string;
    linkedin: string;
    facebook: string;
  };
  contactPhones: readonly Phone[];
};

// Single source of truth for NAP (name, address, phone) and social links.
export const SITE = {
  name: 'Zenvo Tech',
  url: 'https://zenvotech.lk',
  email: 'hello@zenvotech.lk',
  phone: { e164: '+94742363574', display: '+94 74 236 3574' },
  whatsappUrl: 'https://wa.me/94742363574',
  // Google Business Profile, same place id the google-reviews edge function falls back to.
  googleProfileUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJKRL3TZZp4zoRsudeowa3gIY',
  address: {
    street: 'No. 02',
    locality: 'Kandy',
    postalCode: '20000',
    region: 'Central Province',
    country: 'LK',
    countryName: 'Sri Lanka',
  },
  socials: {
    instagram: 'https://www.instagram.com/zenvo_technologies/',
    tiktok: 'https://www.tiktok.com/@zenvotechnologies7',
    linkedin: 'https://www.linkedin.com/in/zenvo-tech-328906443/',
    facebook: 'https://www.facebook.com/people/Zenvo-Tech/61595053245347/',
  },
  contactPhones: [
    { e164: '+94752454335', display: '+94 75 245 4335' },
    { e164: '+94773991281', display: '+94 77 399 1281' },
    { e164: '+94717369661', display: '+94 71 736 9661' },
    { e164: '+94774241122', display: '+94 77 424 1122' },
  ],
} as const satisfies SiteConfig;

export function formatAddress(): string {
  const { street, locality, postalCode, countryName } = SITE.address;
  return `${street}, ${locality} ${postalCode}, ${countryName}`;
}
