import { SITE, formatAddress } from '@/config/site';
import type { FaqEntry } from '@/lib/structuredData';

// Plain text only: the same strings feed the visible FAQ and the FAQPage JSON-LD.
export const aboutFaqs: readonly FaqEntry[] = [
  {
    question: `What is ${SITE.name}?`,
    answer: `${SITE.name} is a software development company based in Sri lanka. We build websites, mobile apps, custom software and business automation for startups and small and medium-sized businesses.`,
  },
  {
    question: `Where is ${SITE.name} based?`,
    answer: `Our office is at ${formatAddress()}. You can call or WhatsApp us on ${SITE.phone.display}, or email ${SITE.email}.`,
  },
  {
    question: `Which services does ${SITE.name} offer?`,
    answer: 'We offer four services: website development, mobile app development, custom software development and business automation.',
  },
  {
    question: `How does ${SITE.name} work with clients?`,
    answer: 'We start by talking through your goals, then agree on scope, budget and timeline. We build in stages, keep you updated at every step, and stay on after launch for support.',
  },
  {
    question: `How do I start a project with ${SITE.name}?`,
    answer: `Share your project details, expected budget and timeline through the contact form, by phone on ${SITE.phone.display}, or by email at ${SITE.email}. Every project begins with clear requirements and shared expectations.`,
  },
  {
    question: `Who does ${SITE.name} work with?`,
    answer: 'We work with startups, small businesses, SMEs and larger companies, including projects with a limited budget.',
  },
  {
    question: `Does ${SITE.name} offer support after launch?`,
    answer: 'Yes. We offer monthly maintenance, updates and long-term support packages tailored to your needs.',
  },
  {
    // PI! NEED DATA: LKR starting prices per service for this answer
    question: `How much does a project with ${SITE.name} cost?`,
    answer: 'Pricing depends on complexity, features and platform. We offer flexible packages for startups, SMEs and larger companies.',
  },
];
