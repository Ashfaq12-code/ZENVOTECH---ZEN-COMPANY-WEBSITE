import { SITE } from '@/config/site';
import type { FaqEntry } from '@/lib/structuredData';

// PI! NEED DATA: LKR price ranges and confirmed process steps for new FAQs
export const faqItems: readonly FaqEntry[] = [
  {
    question: `What digital services does ${SITE.name} provide?`,
    answer: 'We build websites, mobile and web applications, custom software, and workflow automation tailored to your business.',
  },
  {
    question: `Where is ${SITE.name} based?`,
    answer: `Our team is based in ${SITE.address.countryName}. We work with clients in Sri Lanka and abroad.`,
  },
  {
    question: 'How long does a project take?',
    answer: 'Timing depends on the scope and complexity. After understanding your goals, we’ll share a clear timeline with milestones before work begins.',
  },
  {
    question: 'Can you improve or maintain a product we already have?',
    answer: 'Yes. We can refresh an existing website or app, improve its performance, add features, and provide ongoing support.',
  },
  {
    question: 'Will my website or app work on mobile devices?',
    answer: 'Yes. We design and build responsive experiences for mobile, tablet, and desktop, and test across common screen sizes.',
  },
  {
    question: 'How do we get started?',
    answer: 'Send us a short description of your project through the contact form. We’ll discuss your goals, requirements, and the next steps.',
  },
];
