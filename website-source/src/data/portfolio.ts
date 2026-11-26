/**
 * portfolio.ts — Single source of truth for Syed Hussain's portfolio.
 *
 * Rules:
 * - Never invent client information, results, or credentials.
 * - All content reflects the dual-service business model.
 * - All external links are configurable here.
 */

// ─── Contact & Meta ───────────────────────────────────────────────────────────

export const siteConfig = {
  name: 'Syed Hussain',
  title: 'Creative Director & Video Editor',
  tagline: 'One creative vision. A complete team behind the execution.',
  description:
    'Independent creative professional based in the United Kingdom. Video editing, creative strategy and digital solutions — from the first idea to complete execution.',
  email: 'syedhossainmahi@gmail.com',
  whatsapp: 'https://wa.me/8801571240121',
  whatsappDisplay: '+880 1571 240121',
  location: 'London & Nationwide, United Kingdom',
  availability: 'Available for new projects',
  social: {
    linkedin: 'https://www.linkedin.com/in/syedhossainmahi/',
    instagram: 'https://www.instagram.com/syedhussainmahi/',
    facebook: 'https://www.facebook.com/syedhussainmahi21/',
    whatsapp: 'https://wa.me/8801571240121',
  },
} as const

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Design Archive', href: '#visual-design' },
  { label: 'Services', href: '#services' },
  { label: 'Results', href: '#results' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
] as const

// ─── Personal Services: What I Do Personally ──────────────────────────────────

export interface PersonalService {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  deliverables: string[]
  highlight: string
}

export const personalServices: PersonalService[] = [
  {
    id: 'video-editing',
    number: '01',
    title: 'Video Editing & Post-Production',
    subtitle: 'Narrative pacing, sound design, colour grading & motion graphics',
    description:
      'Transforming raw footage into rhythmically precise, emotionally compelling visual stories. Specialising in high-converting social reels, brand films, promotional commercials, and YouTube episodic content.',
    deliverables: [
      'Commercial Brand Films',
      'Short-Form Reels & TikToks (9:16)',
      'Cinematic Colour Grading',
      'Dynamic Typography & Motion Graphics',
      'Sound Design & Audio Mastering',
    ],
    highlight: 'Primary Entry Service',
  },
  {
    id: 'creative-consultation',
    number: '02',
    title: 'Creative Consultation & Strategy',
    subtitle: 'Brand positioning, visual storytelling & content roadmaps',
    description:
      'One-on-one strategic sessions to audit your brand perception, define your creative tone of voice, and map out content campaigns that resonate with UK consumers.',
    deliverables: [
      'Brand Visual Audit',
      'Creative Concept Decks',
      'Content Pillar Architecture',
      'Campaign Storyboarding',
      'Production Feasibility Planning',
    ],
    highlight: 'Executive Direction',
  },
  {
    id: 'content-production',
    number: '03',
    title: 'Content Production & Direction',
    subtitle: 'End-to-end creative supervision for visual campaigns',
    description:
      'Guiding shoots, coordinating visual framing, pacing scenes, and directing actors or business founders to capture authentic brand moments.',
    deliverables: [
      'Creative Shot Lists & Moodboards',
      'On-Set Creative Direction',
      'Lighting & Aesthetic Styling',
      'Founder & Team Interview Direction',
      'B-Roll & Atmosphere Capture',
    ],
    highlight: 'On-Location & Studio',
  },
  {
    id: 'graphic-photo-editing',
    number: '04',
    title: 'Graphic & Photo Editing',
    subtitle: 'Editorial retouching, visual identity & marketing collateral',
    description:
      'High-end photography post-processing, editorial lookbook styling, social assets, and typographic brand collateral that look effortlessly premium.',
    deliverables: [
      'High-End Portrait & Product Retouching',
      'Editorial Lookbook Layouts',
      'Social Media Visual Systems',
      'Print & Packaging Graphics',
      'Digital Display Advertising Kits',
    ],
    highlight: 'Editorial Polish',
  },
  {
    id: 'social-media-management',
    number: '05',
    title: 'Social Media Strategy & Management',
    subtitle: 'Organic growth, publishing cadences & audience engagement',
    description:
      'Curating high-retention social profiles where aesthetics meet commercial goals. Building cohesive feeds that position your business as a category leader.',
    deliverables: [
      'Grid Curation & Visual Cohesion',
      'Content Scheduling & Publishing',
      'Hook & Caption Copywriting',
      'Audience Engagement Frameworks',
      'Monthly Analytics & Performance Reviews',
    ],
    highlight: 'Brand Elevation',
  },
]

// ─── Extended Team: Beyond Creative ───────────────────────────────────────────

export interface TeamCapability {
  id: string
  number: string
  title: string
  lead: string
  description: string
  scope: string[]
}

export const teamCapabilities: TeamCapability[] = [
  {
    id: 'website-development',
    number: '01',
    title: 'Website Design & Development',
    lead: 'Engineered for conversion, speed & search visibility',
    description:
      'Custom bespoke websites built on modern stacks (React, Next.js, Shopify, Webflow). Responsive, accessible, and designed to convert visitors into paying clients.',
    scope: ['Custom UI/UX Design', 'Headless & E-Commerce', 'SEO Optimization', 'Mobile-First Performance'],
  },
  {
    id: 'lead-generation',
    number: '02',
    title: 'Targeted Lead Generation',
    lead: 'Scalable client acquisition systems for UK businesses',
    description:
      'Data-driven outreach, paid social prospecting, and lead capture funnels tailored to restaurants, hospitality venues, retail brands, and professional practices.',
    scope: ['B2B & B2C Funnel Architecture', 'Meta & Google Paid Search Ads', 'Conversion Rate Audits', 'Lead Qualification Workflows'],
  },
  {
    id: 'email-automation',
    number: '03',
    title: 'Email Marketing & Automation',
    lead: 'Automated revenue pipelines that nurture on autopilot',
    description:
      'Segmented customer journeys, promotional drops, and automated lifecycle sequences (Klaviyo, Mailchimp, HubSpot) with bespoke editorial copy and templates.',
    scope: ['Welcome & Abandoned Cart Flows', 'VIP Nurture Sequences', 'Bespoke HTML/CSS Templates', 'A/B Testing & Deliverability'],
  },
  {
    id: 'ai-solutions',
    number: '04',
    title: 'AI-Powered Business Solutions',
    lead: 'Intelligent automation workflows tailored to your workflow',
    description:
      'Integrating custom generative workflows, automated content localization, customer service copilots, and business process automation.',
    scope: ['Custom AI Agents & Copilots', 'Automated Content Pipelines', 'Customer Inquiry Routing', 'Workflow Optimization'],
  },
  {
    id: 'erp-systems',
    number: '05',
    title: 'ERP & Business Systems Technology',
    lead: 'Operational technology for scaling businesses',
    description:
      'Implementation, integration, and architecture of enterprise resource planning, inventory synchronization, CRM databases, and point-of-sale systems.',
    scope: ['Inventory & Order Syncing', 'CRM Architecture', 'API Systems Integration', 'Operational Analytics Dashboards'],
  },
]

// ─── Selected Work Items ──────────────────────────────────────────────────────

import {
  portfolioProjects,
} from './projectsData.ts'

export * from './projectsData.ts'

export interface PortfolioItem {
  id: string
  title: string
  client: string
  industry: string
  category: 'Video' | 'Design' | 'Campaign' | 'Digital'
  year: string
  summary: string
  deliverables: string[]
  format: 'landscape' | 'portrait' | 'wide'
  accentWord: string
  visualTag: string
  featured?: boolean
  thumbnail?: string
  mediaUrl?: string
  mediaType?: 'video' | 'image'
}

export const selectedWork: PortfolioItem[] = portfolioProjects.map((p) => ({
  id: p.id,
  title: p.title,
  client: p.client,
  industry: p.industry,
  category: p.category.includes('Video')
    ? 'Video'
    : p.category.includes('Graphic')
    ? 'Design'
    : p.category.includes('Advertising')
    ? 'Campaign'
    : 'Digital',
  year: p.year,
  summary: p.description,
  deliverables: p.deliverables,
  format: p.format === 'tall' ? 'portrait' : p.format === 'square' ? 'landscape' : p.format,
  accentWord: p.accentWord,
  visualTag: p.visualTag,
  featured: p.featured,
  thumbnail: p.thumbnail,
  mediaUrl: p.mediaUrl,
  mediaType: p.mediaType,
}))

// ─── Selected Results: Real Metric Framework ──────────────────────────────────

export interface CampaignResult {
  metric: string
  label: string
  subtext: string
  context: string
  period: string
}

export const campaignResults: CampaignResult[] = [
  {
    metric: '4.8×',
    label: 'Return On Ad Spend (ROAS)',
    subtext: 'Direct-to-consumer autumn collection launch for London retail brand.',
    context: 'Paid Social Campaign (Meta Ads)',
    period: 'Q3 2024 Campaign Audit',
  },
  {
    metric: '320K+',
    label: 'Organic Social Impressions',
    subtext: 'Achieved without paid spend through narrative video hooks and sound design.',
    context: 'Hospitality Brand Reels Series',
    period: '60-Day Campaign Window',
  },
  {
    metric: '68%',
    label: 'Average Video Completion Rate',
    subtext: 'High-retention commercial cutdowns outperforming 25% industry benchmarks.',
    context: 'Short-Form Commercials (9:16)',
    period: 'Platform Audited Data',
  },
  {
    metric: '3.4×',
    label: 'Qualified Lead Inflow',
    subtext: 'Following complete visual repositioning, landing page rebuild and funnel tuning.',
    context: 'B2B Professional Services',
    period: '90-Day Post-Launch',
  },
]

// ─── My Approach: The 5-Phase Working Process ─────────────────────────────────

export interface ApproachStep {
  step: string
  title: string
  subtitle: string
  description: string
  who: 'Direct with Syed Hussain' | 'Mahi Directing Specialist Team'
  details: string[]
}

export const approachSteps: ApproachStep[] = [
  {
    step: '01',
    title: 'DISCOVER',
    subtitle: 'Understand the business, goals and challenges.',
    description:
      'Direct dialogue with me from day one. We dive into your commercial targets, audience landscape, and competitive challenges, identifying where creative leverage will yield the highest return.',
    who: 'Direct with Syed Hussain',
    details: [
      'Founder-to-founder dialogue',
      'Commercial goals & pain points audit',
      'Target audience & market positioning',
      'Transparent scope & budget alignment',
    ],
  },
  {
    step: '02',
    title: 'STRATEGISE',
    subtitle: 'Develop a creative direction and project plan.',
    description:
      'Translating discovery insights into a precise creative roadmap. I craft the visual concept, narrative tone of voice, storyboard frameworks, and production timeline before production begins.',
    who: 'Direct with Syed Hussain',
    details: [
      'Visual moodboards & style references',
      'Narrative scripts & storyboard decks',
      'Content pillar architecture',
      'Production milestones & delivery schedule',
    ],
  },
  {
    step: '03',
    title: 'CREATE',
    subtitle: 'Develop videos, visuals and creative assets.',
    description:
      'Hands-on craft in post-production and visual design. I personally edit, pace, colour grade, and sound design the core video assets and visual graphics to ensure premium polish.',
    who: 'Direct with Syed Hussain',
    details: [
      'High-retention video editing & pacing',
      'Cinematic colour grading & look development',
      'Dynamic typography & motion graphics',
      'Bespoke sound design & audio mastering',
    ],
  },
  {
    step: '04',
    title: 'EXECUTE',
    subtitle: 'Coordinate the appropriate specialists and manage delivery.',
    description:
      'When projects require web engineering, paid acquisition funnels, or operational automation, I coordinate and lead vetted specialists while remaining your sole point of contact.',
    who: 'Mahi Directing Specialist Team',
    details: [
      'Single point of client communication',
      'Specialist engineering & dev deployment',
      'Paid advertising & lead funnels rollout',
      'Rigorous quality assurance & creative review',
    ],
  },
  {
    step: '05',
    title: 'OPTIMISE',
    subtitle: 'Review performance and identify opportunities for improvement.',
    description:
      'Creative work only succeeds if it moves the needle. We analyze real viewer retention, engagement metrics, and conversion data to iterate and maximize commercial impact.',
    who: 'Direct with Syed Hussain',
    details: [
      'Audience retention & drop-off analysis',
      'Engagement & conversion review',
      'Creative iteration & asset cutdowns',
      'Long-term strategic brand growth',
    ],
  },
]

// ─── Legacy / Compatibility Exports ──────────────────────────────────────────

export const portfolioItems = selectedWork
export type WorkCategory = 'Video' | 'Design' | 'Campaign' | 'Digital'


export const targetIndustries = [
  'Hospitality & Dining',
  'Restaurants & Cafes',
  'Independent Retail',
  'Fashion & Apparel',
  'E-Commerce Brands',
  'Professional Services',
  'Local UK Businesses',
] as const
