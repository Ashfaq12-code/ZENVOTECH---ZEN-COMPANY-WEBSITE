const countryFlagCodes: Record<string, string> = {
  'United States': 'us',
  'United Kingdom': 'gb',
  'Sri Lanka': 'lk',
  Canada: 'ca',
  Australia: 'au',
  India: 'in',
  'United Arab Emirates': 'ae',
  Germany: 'de',
  France: 'fr',
  Japan: 'jp',
  Singapore: 'sg',
  Italy: 'it',
  'South Korea': 'kr',
};

export function flagCodeFor(country: string): string | undefined {
  return countryFlagCodes[country];
}

export function flagCdnUrl(code: string): string {
  return `https://flagcdn.com/w40/${code}.png`;
}
