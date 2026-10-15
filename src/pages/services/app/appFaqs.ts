import { SITE } from '@/config/site';
import type { ServiceFaq } from '../shared/types';

export const appFaqs: readonly ServiceFaq[] = [
  {
    question: 'How long does it take to build a mobile app?',
    answer: 'It depends on how complex the app is and which features it needs.',
    points: [
      'Simple MVPs and utility apps: at least 2 weeks.',
      'Ecommerce and booking apps: at least 4 weeks.',
      'Custom business apps and real-time platforms: at least 6 weeks, depending on requirements.',
    ],
  },
  {
    question: 'Do you build apps for both iOS and Android?',
    answer: 'Yes. We build cross-platform apps with Flutter and React Native, and native apps when a project needs platform-specific features.',
  },
  {
    question: 'Do you maintain apps after launch?',
    answer: 'Yes. We offer monthly maintenance: OS compatibility updates, performance tuning, bug fixes and new features.',
  },
  {
    question: 'Can you add payments and ecommerce features?',
    answer: 'Yes. We integrate secure payment gateways (Stripe, Apple Pay, Google Pay), push notifications, analytics, cart and checkout flows, and backend APIs.',
  },
  {
    question: 'Will my app run smoothly?',
    answer: 'Yes. We optimise every app for fast startup, smooth 60 fps animations, low memory use and low battery drain.',
  },
  {
    question: 'Do you work with startups on a budget?',
    answer: 'Yes. We offer startup packages that launch a minimum viable product (MVP) quickly, without cutting design or code quality.',
  },
  {
    // PI! NEED DATA: LKR starting price per app type (MVP, ecommerce, custom)
    question: 'How much does it cost to build a mobile app in Sri Lanka?',
    answer: 'The price depends on the platforms, features and backend your app needs. Tell us about your project and we will send you a custom quote.',
  },
  {
    question: 'Where are you based, and do you build apps for clients outside Sri Lanka?',
    answer: `${SITE.name} is based in ${SITE.address.locality}, ${SITE.address.countryName}. We build apps for businesses in Sri Lanka and abroad.`,
  },
];
