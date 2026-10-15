export type AdminAccount = { username: string };
export type OnlineAdmin = { user_id: string; username: string };
export type AdminProfile = { user_id: string; username: string; avatar_url: string | null };
export type Tab = 'projects' | 'reviews' | 'calls' | 'settings';
export type DisplayReview = {
  id: string;
  name: string;
  country: string;
  body: string;
  rating: number;
  avatar?: string;
  created_at: string;
};

export const websiteTestimonials: Omit<DisplayReview, 'id'>[] = [
  { name: 'Maya Chen', country: 'United States', body: 'zenvotech turned our business idea into a complete digital platform that is fast, scalable, and easy to manage.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/44.jpg', created_at: new Date(Date.now() - 7 * 86400000).toISOString() },
  { name: 'Daniel Okafor', country: 'United Kingdom', body: 'They delivered a modern web application that completely improved how our customers interact with our business.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/32.jpg', created_at: new Date(Date.now() - 14 * 86400000).toISOString() },
  { name: 'Sofia Martinez', country: 'Spain', body: 'From mobile app development to backend systems, zenvotech handled everything smoothly from start to launch.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/68.jpg', created_at: new Date(Date.now() - 21 * 86400000).toISOString() },
  { name: 'Elliot Reed', country: 'Australia', body: 'The team helped us automate repetitive processes and save hours of manual work every week.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/75.jpg', created_at: new Date(Date.now() - 30 * 86400000).toISOString() },
  { name: 'Nia Walker', country: 'Canada', body: 'zenvotech gave us the technology foundation we needed to scale our business with confidence.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/65.jpg', created_at: new Date(Date.now() - 45 * 86400000).toISOString() },
  { name: 'Arjun Mehta', country: 'India', body: 'They understood our requirements quickly and built a reliable solution that actually solved our business problems.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/46.jpg', created_at: new Date(Date.now() - 60 * 86400000).toISOString() },
  { name: 'Iris Laurent', country: 'France', body: 'zenvotech combined great design with solid engineering to create a web experience our customers genuinely enjoy using.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/12.jpg', created_at: new Date(Date.now() - 90 * 86400000).toISOString() },
  { name: 'Marcus Bell', country: 'United States', body: 'Our new business system brought our operations into one place and made everyday work much more efficient.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/62.jpg', created_at: new Date(Date.now() - 120 * 86400000).toISOString() },
  { name: 'Leah Park', country: 'Singapore', body: 'The most seamless development partnership we have experienced. Fast, professional, and always focused on the solution.', rating: 5, avatar: 'https://randomuser.me/api/portraits/women/33.jpg', created_at: new Date(Date.now() - 150 * 86400000).toISOString() },
  { name: 'Jonas Berg', country: 'Germany', body: 'Our website and mobile experience are faster, clearer, and performing at a completely different level.', rating: 5, avatar: 'https://randomuser.me/api/portraits/men/42.jpg', created_at: new Date(Date.now() - 180 * 86400000).toISOString() },
];

export const allowedAdmins = ['Ashxx12', 'Zaid12', 'Firaz12', 'Ashfaq12'];
export const countries = [
  'United States', 'United Kingdom', 'Sri Lanka', 'Canada', 'Australia', 'India',
  'United Arab Emirates', 'Germany', 'France', 'Japan', 'Singapore', 'Other',
];
export const countryFlagCodes: Record<string, string> = {
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
};
