import { SITE } from '@/config/site';

import type { ServiceFeature } from '../shared/ServiceFeatures';
import type { ServiceFaq, TechLogo } from '../shared/types';

// PI! NEED DATA: confirm license for dynessco.com GIFs and logos, or replace them
const dynessco = 'https://dynessco.com/wp-content/uploads/2025/06';

export const softwareFeatures: readonly ServiceFeature[] = [
  {
    title: 'Custom Software Architecture',
    body: 'We engineer bespoke software solutions tailored precisely to your business processes — built to scale, secure, and perform from day one.',
    gif: { src: `${dynessco}/Employee-getting-Customer-requirements.gif`, width: 500, height: 500 },
  },
  {
    title: 'Enterprise-Grade Systems',
    body: 'From CRMs and ERPs to inventory and analytics platforms — we build robust business systems that unify your operations and power productivity.',
    gif: { src: `${dynessco}/Web-Design-Layout-1.gif`, width: 1200, height: 1200 },
  },
  {
    title: 'Integrations & APIs',
    body: 'We connect your software to payment gateways, cloud platforms, third-party services and custom APIs, so data moves between them without anyone re-typing it.',
    gif: { src: `${dynessco}/Choose-Your-Colors.gif`, width: 500, height: 500 },
  },
];

export const softwareFaqs: readonly ServiceFaq[] = [
  {
    question: 'How Long Does Custom Software Development Take In Sri Lanka?',
    answer: 'Our development timeline depends on your project requirements and complexity.',
    points: [
      'Simple automation tools & internal dashboards — minimum of 2 weeks.',
      'CRM, ERP & inventory systems — minimum of 4 weeks.',
      'Enterprise-grade platforms & SaaS applications — minimum of 8 weeks (varies by requirements).',
    ],
  },
  {
    question: `What Are The Minimum Eligibility Criteria For ${SITE.name} To Undertake A Project?`,
    answer: 'You must provide project details, budget, and your timeline. Every successful project starts with clear requirements and transparent milestones.',
  },
  {
    question: 'Do You Build Both Web-Based and Desktop Software?',
    answer: 'Yes. We develop web-based SaaS platforms, desktop applications, and hybrid systems tailored to your operational workflows and infrastructure needs.',
  },
  {
    question: 'Do You Offer Ongoing Support After The Software Is Launched?',
    answer: 'Absolutely. We provide monthly maintenance, security patches, performance monitoring, feature additions, and dedicated long-term technical support packages.',
  },
  {
    question: 'Can You Integrate My Software With Third-Party APIs & Services?',
    answer: 'Yes. We connect your software to payment gateways, CRMs, ERPs, cloud services, analytics platforms and custom APIs.',
  },
  {
    // PI! NEED DATA: LKR starting price ranges per software type (CRM, ERP, SaaS)
    question: 'How Much Does Custom Software Development Cost In Sri Lanka?',
    answer: 'Pricing depends on bespoke architecture, feature scope, complexity, and the technology stack. We provide transparent packages and custom estimates for all budgets.',
  },
  {
    question: 'Do You Take On Projects From Sri Lankan Startups With A Limited Budget?',
    answer: 'Yes! We work with startups and growing small businesses, offering high-impact, budget-friendly software solutions engineered for long-term scalability.',
  },
];

const media = '/media/software';

export const softwareTechStack: readonly TechLogo[] = [
  { src: `${dynessco}/React.png`, alt: 'React', width: 152, height: 40, logoOnly: true },
  { src: `${dynessco}/Node.png`, alt: 'Node.js', width: 152, height: 40 },
  { src: `${dynessco}/Laravel.png`, alt: 'Laravel', width: 152, height: 40 },
  { src: `${dynessco}/Firebase.png`, alt: 'Firebase', width: 152, height: 40, logoOnly: true },
  { src: `${media}/logo-nextjs.webp`, alt: 'Next.js', width: 256, height: 64, logoOnly: true },
  { src: `${dynessco}/Mongo.png`, alt: 'MongoDB', width: 152, height: 40, logoOnly: true },
  { src: `${dynessco}/Spring.png`, alt: 'Spring', width: 152, height: 40 },
  { src: `${dynessco}/CSS.png`, alt: 'CSS3', width: 152, height: 40 },
  { src: `${media}/logo-python.webp`, alt: 'Python', width: 256, height: 176 },
  { src: `${media}/logo-docker.webp`, alt: 'Docker', width: 256, height: 62 },
  { src: `${media}/logo-postgresql.webp`, alt: 'PostgreSQL', width: 256, height: 144 },
  { src: `${media}/logo-aws.webp`, alt: 'AWS', width: 256, height: 160 },
  { src: `${media}/logo-typescript.webp`, alt: 'TypeScript', width: 256, height: 256, logoOnly: true },
  { src: `${media}/logo-graphql.webp`, alt: 'GraphQL', width: 256, height: 170 },
  { src: `${media}/logo-redis.webp`, alt: 'Redis', width: 256, height: 290 },
];
