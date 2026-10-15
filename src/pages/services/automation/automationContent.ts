import { SITE } from '@/config/site';
import type { ServiceFeature } from '../shared/ServiceFeatures';
import type { ServiceFaq, TechLogo } from '../shared/types';

// PI! NEED DATA: confirm license for dynessco.com GIFs and logos, or replace them
const dynessco = 'https://dynessco.com/wp-content/uploads/2025/06';

export const automationFeatures: readonly ServiceFeature[] = [
  {
    title: 'End-to-End Workflow Automation',
    body: 'We map, design, and implement fully automated pipelines that connect your tools, data, and teams — eliminating manual handoffs and bottlenecks at every stage.',
    gif: { src: `${dynessco}/Web-Design-Layout-1.gif`, width: 1200, height: 1200 },
  },
  {
    title: 'Tool Integrations',
    body: 'We connect your CRM, ERP, online store, messaging tools and custom APIs so they share the same data and stay in sync.',
    gif: { src: `${dynessco}/Employee-getting-Customer-requirements.gif`, width: 500, height: 500 },
  },
  {
    title: 'Scalable & Monitored Systems',
    body: 'Every automation we build is designed for reliability and growth — with monitoring, error handling, alerting, and the flexibility to scale as your business demands increase.',
    gif: { src: `${dynessco}/Choose-Your-Colors.gif`, width: 500, height: 500 },
  },
];

export const automationFaqs: readonly ServiceFaq[] = [
  {
    question: 'What Business Processes Can You Automate For Companies In Sri Lanka?',
    answer: 'We automate a wide range of repetitive and manual business workflows.',
    points: [
      'Data entry, reporting & document generation pipelines.',
      'Email, CRM & customer communication workflows.',
      'Inventory sync, invoice processing & ERP integrations.',
      'API-to-API integrations between any tools your business uses.',
    ],
  },
  {
    question: `What Are The Minimum Eligibility Criteria For ${SITE.name} To Undertake A Project?`,
    answer: 'You must provide project details, budget, and your timeline. Every successful project starts with clear requirements and transparent milestones.',
  },
  {
    question: 'Which Tools & Platforms Do You Use For Automation?',
    answer: 'We use a wide toolkit — including Python scripts, Node.js, n8n, Zapier, Make (Integromat), REST APIs, webhooks, and cloud functions — always selecting the right tool for your specific workflow.',
  },
  {
    question: 'Do You Offer Ongoing Support After The Automation Is Deployed?',
    answer: 'Absolutely. We provide monitoring, maintenance, and expansion packages to ensure your automations continue running smoothly as your business evolves.',
  },
  {
    question: 'Can You Connect My Existing Software Tools Together?',
    answer: 'Yes! We specialize in connecting any combination of tools — from Shopify, HubSpot, Notion, Google Workspace, Slack, and Airtable to custom ERPs and internal databases.',
  },
  {
    // PI! NEED DATA: LKR starting price ranges per automation type
    question: 'How Much Does Business Process Automation Cost In Sri Lanka?',
    answer: 'Pricing depends on the complexity, number of integrations, and scale of the workflow. We offer transparent packages and custom estimates for every budget.',
  },
  {
    question: 'Do You Work With Sri Lankan Startups On A Limited Budget?',
    answer: 'Yes! We help startups and small businesses eliminate manual bottlenecks with cost-effective automation solutions that deliver measurable time and cost savings from day one.',
  },
];

const media = '/media/automation';
const shared = '/media/software';

export const automationTechStack: readonly TechLogo[] = [
  { src: `${media}/logo-react.webp`, alt: 'React', width: 256, height: 102 },
  { src: `${dynessco}/Node.png`, alt: 'Node.js', width: 152, height: 40, logoOnly: true },
  { src: `${media}/logo-langchain.webp`, alt: 'LangChain', width: 256, height: 44 },
  { src: `${media}/logo-firebase.webp`, alt: 'Firebase', width: 256, height: 62 },
  { src: `${media}/logo-nextjs.webp`, alt: 'Next.js', width: 256, height: 96 },
  { src: `${media}/logo-mongodb.webp`, alt: 'MongoDB', width: 256, height: 52 },
  { src: `${dynessco}/Spring.png`, alt: 'Spring', width: 152, height: 40, logoOnly: true },
  { src: `${media}/logo-css3.webp`, alt: 'CSS3', width: 256, height: 256 },
  { src: `${media}/logo-python.webp`, alt: 'Python', width: 256, height: 98, logoOnly: true },
  { src: `${media}/logo-docker.webp`, alt: 'Docker', width: 256, height: 256 },
  { src: `${shared}/logo-postgresql.webp`, alt: 'PostgreSQL', width: 256, height: 144 },
  { src: `${media}/logo-aws.webp`, alt: 'AWS', width: 256, height: 256 },
  { src: `${media}/logo-typescript.webp`, alt: 'TypeScript', width: 256, height: 256, logoOnly: true },
  { src: `${shared}/logo-graphql.webp`, alt: 'GraphQL', width: 256, height: 170 },
  { src: `${shared}/logo-redis.webp`, alt: 'Redis', width: 256, height: 290 },
];
