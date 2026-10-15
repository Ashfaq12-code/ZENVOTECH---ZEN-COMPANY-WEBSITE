import { SITE } from '@/config/site';
import type { ServiceFaq } from '../shared/types';

export const webFaqs: readonly ServiceFaq[] = [
  {
    question: 'How long does it take to build a website?',
    answer: 'It depends on what you need, because every site is built to your requirements.',
    points: [
      'WordPress and Webflow sites: at least 1 week.',
      'Ecommerce and WooCommerce stores: at least 2 weeks.',
      'Custom web applications and full-stack platforms: at least 4 weeks, depending on requirements.',
    ],
  },
  {
    question: 'What do you need from me to start a project?',
    answer: 'Send us your project details, budget and timeline. Clear requirements and agreed milestones keep every project on track.',
  },
  {
    question: 'Do you redesign existing websites?',
    answer: 'Yes. We redesign existing sites with a new UI/UX, faster load times and a mobile-first responsive layout.',
  },
  {
    question: 'Do you offer support after the website launches?',
    answer: 'Yes. We offer monthly maintenance: security patches, performance monitoring, updates and long-term technical support.',
  },
  {
    question: 'Will my website work on phones and tablets?',
    answer: 'Yes. Every site we build is responsive and works on phones, tablets, laptops and wide desktop screens.',
  },
  {
    // PI! NEED DATA: LKR starting price per website type (WordPress, ecommerce, custom)
    question: 'How much does a website cost in Sri Lanka?',
    answer: 'The price depends on the design, features, complexity and technology. We offer clear packages and custom quotes for every budget.',
  },
  {
    question: 'Do you take on projects with a small budget?',
    answer: 'Yes. We work with startups and small businesses and offer budget-friendly options built to grow with you.',
  },
  {
    question: 'Where are you based, and do you work with clients outside Sri Lanka?',
    answer: `${SITE.name} is based in ${SITE.address.locality}, ${SITE.address.countryName}. We build websites for businesses in Sri Lanka and abroad, including clients in the United States, Australia, the United Kingdom, Italy and South Korea.`,
  },
];
