/**
 * servicesData.ts — Comprehensive definition of Mahi Hossain's services & capabilities.
 *
 * Structure:
 * - Group 1: Creative & Content (Primary personal craft — strongest visual prominence)
 * - Group 2: Brand & Digital Management (Extended specialist team under Mahi's direct leadership)
 * - Group 3: Technology & Automation (Extended specialist team under Mahi's direct leadership)
 *
 * Rules:
 * - No generic outsourcing jargon.
 * - Clear single-point accountability and direct client communication.
 * - Flexible engagement: single dedicated service or coordinated multi-disciplinary project.
 */

export interface ServiceItem {
  id: string
  title: string
  lead: string
  description: string
  deliverables: string[]
  isHeroService?: boolean // True for Video Editing, Creative Consultation, Content Production
  tags?: string[]
}

export interface ServiceGroup {
  id: string
  groupNumber: string
  name: string
  subtitle: string
  deliveryModel: 'Personal Craft & Direction' | 'Extended Specialist Team (Directed by Mahi)'
  description: string
  services: ServiceItem[]
  ctaLabel: string
  ctaHref: string
  badgeText: string
}

export const serviceGroups: ServiceGroup[] = [
  {
    id: 'creative-content',
    groupNumber: 'GROUP 01',
    name: 'Creative & Content',
    subtitle: 'Primary Personal Craft & Executive Creative Direction',
    deliveryModel: 'Personal Craft & Direction',
    badgeText: 'Delivered Personally by Mahi Hossain',
    description:
      'The core creative foundation. High-impact video, cinematic post-production, visual strategy, and design systems crafted hands-on to give your brand an unmistakable presence.',
    ctaLabel: 'Enquire About Creative & Content',
    ctaHref: '#contact',
    services: [
      {
        id: 'video-editing',
        title: 'Video Editing & Post-Production',
        lead: 'High-retention editing, narrative pacing & cinematic finish',
        description:
          'Transforming raw footage into rhythmically precise, emotionally compelling commercial stories. Focused on rhythm, audio soundscapes, color grading, and viewer retention that drives action.',
        deliverables: [
          'Commercial Brand Films & Spot Cuts',
          'Cinematic Color Grading & Balancing',
          'Sound Design, Mixing & Audio Mastering',
          'Motion Graphics & Kinetic Typography',
          'Platform-Native Export Standards (16:9 & 9:16)',
        ],
        isHeroService: true,
        tags: ['Pacing', 'Sound Design', 'Color Grading', 'Kinetic Type'],
      },
      {
        id: 'creative-consultation',
        title: 'Creative Consultation',
        lead: 'Executive creative direction, tone of voice & visual auditing',
        description:
          'Direct strategic advisory to define where your brand stands, how it should look and sound, and how creative decisions tie directly into your commercial objectives.',
        deliverables: [
          'Comprehensive Visual & Aesthetic Brand Audit',
          'Creative Concept & Treatment Decks',
          'Campaign Moodboards & Lookbooks',
          'Art Direction & Styling Guidelines',
          'Audience Perception Alignment',
        ],
        isHeroService: true,
        tags: ['Brand Audit', 'Art Direction', 'Concept Decks', 'Advisory'],
      },
      {
        id: 'content-production',
        title: 'Content Production & Direction',
        lead: 'End-to-end creative supervision, shoot direction & narrative capture',
        description:
          'On-location and studio creative direction. Guiding visual framing, pacing scenes, styling aesthetics, and directing founders or brand ambassadors to capture authentic brand moments.',
        deliverables: [
          'Creative Shot Lists & Moodboards',
          'On-Set Creative Direction & Framing',
          'Lighting & Aesthetic Styling Supervision',
          'Founder & Brand Storytelling Direction',
          'High-Fidelity Visual Asset Capture',
        ],
        isHeroService: true,
        tags: ['Shot Lists', 'On-Set Direction', 'Storytelling', 'Creative Supervision'],
      },
      {
        id: 'content-strategy',
        title: 'Content Strategy & Roadmaps',
        lead: 'Architecting content pillars, publication cadences & narrative themes',
        description:
          'Developing systematic content calendars and narrative frameworks that ensure every published asset reinforces brand authority and drives sustained audience engagement.',
        deliverables: [
          'Content Pillar & Thematic Architecture',
          'Publishing Cadence & Channel Mapping',
          'Hook & Narrative Development',
          'Audience Engagement Roadmaps',
        ],
        isHeroService: false,
        tags: ['Content Strategy', 'Pillars', 'Roadmaps', 'Calendars'],
      },
      {
        id: 'short-form-reels',
        title: 'Short-Form Reels & Social Content',
        lead: 'Vertical video crafted for algorithmic momentum and audience retention',
        description:
          'High-velocity 9:16 video tailored for Instagram Reels, TikTok, and YouTube Shorts. Engineered with strong 3-second hooks, precise cut timing, and dynamic subtitles.',
        deliverables: [
          '9:16 Native Vertical Edits',
          'Thumb-Stopping Visual Hooks',
          'Animated Subtitles & Micro-Graphics',
          'Audio-Beat Synchronization',
          'Batch Content Production',
        ],
        isHeroService: false,
        tags: ['Instagram Reels', 'TikTok', 'Shorts', 'Vertical 9:16'],
      },
      {
        id: 'commercial-video',
        title: 'Commercial Video Content',
        lead: 'Premium promotional video for products, spaces, and digital releases',
        description:
          'Polished commercial videos crafted to present products, culinary offerings, retail spaces, or service propositions with editorial prestige.',
        deliverables: [
          'Product Showcase Commercials',
          'Venue & Architecture Walkthroughs',
          'Promotional Launch Teasers',
          'Brand Anthem Videos',
          'Multi-Format Cutdowns for Ad Campaigns',
        ],
        isHeroService: false,
        tags: ['Promotional', 'Showcase', 'Launch Teasers', 'Anthem'],
      },
      {
        id: 'photo-editing',
        title: 'Photo Editing & Retouching',
        lead: 'Editorial color science, beauty retouching & atmospheric grading',
        description:
          'High-end post-processing for commercial photography, portraits, food & hospitality imagery, and product assets, harmonizing every image into your brand look.',
        deliverables: [
          'High-End Portrait & Lookbook Retouching',
          'Color Harmonization & Atmosphere Grading',
          'Product Detail Cleaning & Enhancement',
          'Composite Framing & Background Tuning',
          'Print & Web Ready Asset Delivery',
        ],
        isHeroService: false,
        tags: ['Retouching', 'Color Grading', 'Editorial', 'Product Assets'],
      },
      {
        id: 'graphic-design',
        title: 'Graphic Design & Brand Collateral',
        lead: 'Typographic precision, promotional posters & digital design kits',
        description:
          'Refined graphic design rooted in Swiss typographic tradition and contemporary editorial standards. Every asset feels cohesive, legible, and distinctly premium.',
        deliverables: [
          'Promotional Posters & Campaign Key Visuals',
          'Social Media Design Systems & Grids',
          'Digital Display Ads & Promotional Banners',
          'Menu & Marketing Collateral Layouts',
          'Brand Identity Guidelines & Typography Sheets',
        ],
        isHeroService: false,
        tags: ['Key Visuals', 'Posters', 'Typography', 'Social Systems'],
      },
    ],
  },
  {
    id: 'brand-digital-management',
    groupNumber: 'GROUP 02',
    name: 'Brand & Digital Management',
    subtitle: 'Extended Commercial & Growth Infrastructure',
    deliveryModel: 'Extended Specialist Team (Directed by Mahi)',
    badgeText: 'Delivered with Extended Team — Directed by Mahi',
    description:
      'Translating your brand’s visual power into customer acquisition, retention, and digital infrastructure. Coordinated through trusted digital specialists with Mahi as your single point of accountability.',
    ctaLabel: 'Enquire About Brand & Digital Management',
    ctaHref: '#contact',
    services: [
      {
        id: 'web-design-dev',
        title: 'Website Design & Development',
        lead: 'Bespoke web experiences built for conversion, speed & brand authority',
        description:
          'Modern, responsive digital homes engineered with fast, accessible web standards (React, Next.js, Webflow, Shopify). Designed to turn curious visitors into committed clients.',
        deliverables: [
          'Custom UI/UX Wireframing & Prototyping',
          'Responsive Front-End & CMS Development',
          'Performance & Core Web Vitals Optimization',
          'Mobile-First Editorial Design',
        ],
        tags: ['React / Next.js', 'UI/UX Design', 'Performance', 'E-Commerce'],
      },
      {
        id: 'social-media-management',
        title: 'Social Media Management',
        lead: 'Consistent feed curation, publishing cadences & audience engagement',
        description:
          'Complete management of your active social channels. We handle scheduling, aesthetic curation, copywriting, and day-to-day audience interaction.',
        deliverables: [
          'Editorial Calendar & Publishing Cadence',
          'Captions, Hooks & Brand Copywriting',
          'Community Engagement & Response Protocols',
          'Monthly Growth & Engagement Analytics',
        ],
        tags: ['Feed Curation', 'Publishing', 'Copywriting', 'Analytics'],
      },
      {
        id: 'lead-generation',
        title: 'Targeted Lead Generation',
        lead: 'Predictable client acquisition funnels for UK & international businesses',
        description:
          'Data-driven client acquisition pipelines combining paid discovery, tailored landing pages, and lead qualification workflows tailored to your sector.',
        deliverables: [
          'Multi-Channel Acquisition Funnels',
          'High-Converting Landing Pages',
          'Lead Capture & Qualification Forms',
          'Prospect Retargeting Systems',
        ],
        tags: ['Acquisition', 'Funnels', 'Landing Pages', 'Qualification'],
      },
      {
        id: 'digital-advertising',
        title: 'Digital Advertising (Paid Social & Search)',
        lead: 'Performance-driven advertising campaigns with transparent ROAS',
        description:
          'Targeted campaigns across Meta (Instagram/Facebook), Google Search, and TikTok Ads. Paired directly with our bespoke video and visual creatives for maximum ROAS.',
        deliverables: [
          'Meta & Google Ads Campaign Setup',
          'Creative A/B Testing Matrix',
          'Audience Demographic & Interest Targeting',
          'Transparent Weekly Performance Reporting',
        ],
        tags: ['Meta Ads', 'Google Ads', 'A/B Testing', 'ROAS Optimization'],
      },
      {
        id: 'email-marketing',
        title: 'Email Marketing & Editorial Broadcasts',
        lead: 'Engaging newsletters and promotional campaigns that build loyalty',
        description:
          'Editorial-style email campaigns that subscribers actually read. Designed with clean typography, compelling brand stories, and clear calls to action.',
        deliverables: [
          'Custom Email Template Design',
          'Editorial Newsletter Copywriting',
          'Subscriber Segmentation & List Hygiene',
          'Broadcast Scheduling & Tracking',
        ],
        tags: ['Newsletters', 'Templates', 'Copywriting', 'Segmentation'],
      },
      {
        id: 'email-automation',
        title: 'Email Lifecycle Automation',
        lead: 'Triggered automated workflows that nurture leads and drive repeat revenue',
        description:
          'Automated email sequences that welcome new subscribers, recover abandoned carts, re-engage dormant buyers, and upsell customers on complete autopilot.',
        deliverables: [
          'Welcome & Onboarding Sequences',
          'Abandoned Cart & Browse Recovery',
          'Post-Purchase Nurture Workflows',
          'Klaviyo, Mailchimp & HubSpot Setup',
        ],
        tags: ['Automation', 'Lifecycle Flows', 'Klaviyo', 'Retention'],
      },
      {
        id: 'brand-development',
        title: 'Brand Development & Positioning',
        lead: 'Comprehensive identity systems that differentiate you in competitive markets',
        description:
          'End-to-end brand evolution for new launches or established businesses refreshing their market position. Defining mission, visual language, and brand assets.',
        deliverables: [
          'Brand Positioning & Value Proposition',
          'Visual Identity Guidelines',
          'Brand Book & Typography Specs',
          'Multi-Platform Brand Assets',
        ],
        tags: ['Brand Identity', 'Positioning', 'Guidelines', 'Design Systems'],
      },
    ],
  },
  {
    id: 'technology-automation',
    groupNumber: 'GROUP 03',
    name: 'Technology & Automation',
    subtitle: 'Operational Systems & Modern Intelligent Tech',
    deliveryModel: 'Extended Specialist Team (Directed by Mahi)',
    badgeText: 'Delivered with Extended Team — Directed by Mahi',
    description:
      'Eliminating operational friction through intelligent automation, enterprise resource planning, and custom integrations so your business runs efficiently as you scale.',
    ctaLabel: 'Enquire About Technology & Automation',
    ctaHref: '#contact',
    services: [
      {
        id: 'ai-business-solutions',
        title: 'AI-Powered Business Solutions',
        lead: 'Custom generative models, internal copilots & automated content intelligence',
        description:
          'Applying practical artificial intelligence to streamline repetitive business operations, generate draft content variations, automate customer triage, and synthesize insights.',
        deliverables: [
          'Custom AI Prompt Engineering & Assistants',
          'Automated Inquiry Routing & Triage',
          'Content Generation & Localization Workflows',
          'Knowledge Base Vector Integration',
        ],
        tags: ['AI Assistants', 'Workflow Automation', 'Intelligence', 'Custom Prompts'],
      },
      {
        id: 'erp-systems',
        title: 'ERP Systems Implementation & Tuning',
        lead: 'Centralized operational software unifying inventory, sales & logistics',
        description:
          'Configuring, deploying, and optimizing Enterprise Resource Planning platforms to ensure multi-channel stock sync, order management, and unified financial reporting.',
        deliverables: [
          'ERP Requirements Assessment & Architecture',
          'Inventory & Multi-Warehouse Synchronization',
          'Order Processing & Fulfillment Automation',
          'Financial & Operational Reporting Setup',
        ],
        tags: ['ERP Architecture', 'Inventory Sync', 'Operations', 'Reporting'],
      },
      {
        id: 'crm-automation',
        title: 'CRM & Workflow Automation',
        lead: 'Automated pipeline tracking, lead routing & client communication',
        description:
          'Structuring modern CRM platforms (HubSpot, Salesforce, Pipedrive) to ensure no lead falls through the cracks and client onboarding runs without manual intervention.',
        deliverables: [
          'CRM Architecture & Pipeline Stage Design',
          'Automated Lead Notification & Task Assignment',
          'Client Onboarding Workflows',
          'Data Synchronization Across Tools',
        ],
        tags: ['CRM Pipelines', 'HubSpot / Pipedrive', 'Task Automation', 'Onboarding'],
      },
      {
        id: 'process-optimisation',
        title: 'Business Process Optimisation',
        lead: 'Systematic operational audits to remove bottlenecks and manual overhead',
        description:
          'Reviewing your internal team workflows to identify redundancies, automate manual data entry, and establish reliable standard operating procedures.',
        deliverables: [
          'Operational Workflow Mapping',
          'Bottleneck & Friction Identification',
          'Automation Feasibility Roadmap',
          'Documentation & Team Handover',
        ],
        tags: ['Workflow Mapping', 'SOPs', 'Efficiency', 'Overhead Reduction'],
      },
      {
        id: 'technical-integrations',
        title: 'Technical Integrations & APIs',
        lead: 'Connecting disparate SaaS tools, payment gateways & legacy databases',
        description:
          'Building custom webhook and API connections via Zapier, Make, or custom Node.js middleware to synchronize your website, CRM, invoicing, and messaging systems.',
        deliverables: [
          'Custom Webhook & API Connectors',
          'Zapier & Make Automation Pipelines',
          'Payment Gateway (Stripe/PayPal) Integrations',
          'Database Sync & Data Validation Scripts',
        ],
        tags: ['APIs', 'Webhooks', 'Zapier / Make', 'Stripe Integration'],
      },
    ],
  },
]
