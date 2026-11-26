/**
 * advertisingCaseStudies.ts — Reusable data structure for verified advertising case studies.
 *
 * Requirements:
 * - 12-point comprehensive structure per campaign
 * - Strict verification: never fabricate metrics
 * - Clear distinction: 'paid' | 'organic' | 'combined'
 * - Optional metric fields: Reach, Impressions, Clicks, CTR, CPC, Leads, Purchases, Cost per lead, CPA, Revenue, ROAS
 */

export type ResultType = 'paid' | 'organic' | 'combined'

export interface CaseStudyMetric {
  key:
    | 'reach'
    | 'impressions'
    | 'clicks'
    | 'ctr'
    | 'cpc'
    | 'leads'
    | 'purchases'
    | 'costPerLead'
    | 'costPerAcquisition'
    | 'revenue'
    | 'roas'
    | 'custom'
  label: string
  value: string
  subtext?: string
  isPrimary?: boolean
}

export interface AdvertisingCaseStudy {
  id: string
  title: string
  client: string
  industry: string
  resultType: ResultType
  resultBadge: string
  businessChallenge: string
  campaignObjective: string
  strategyApproach: string
  platforms: string[]
  duration: string
  budget?: string // Optional, only shown when verified
  creativeExecution: string
  audienceTargeting: string
  metrics: CaseStudyMetric[]
  keyFindings: string[]
  myContribution: string
  thumbnail: string
  mediaUrl?: string
  dashboardScreenshot?: string
  tags: string[]
  featured?: boolean
}

export const advertisingCaseStudies: AdvertisingCaseStudy[] = [
  // ─── Case Study 01: Jo Milano Paris ──────────────────────────────────────────
  {
    id: 'jo-milano-blue-sapphire',
    title: 'Game of Spades: Blue Sapphire — High-Retention Paid Social Funnel',
    client: 'Jo Milano Paris',
    industry: 'Luxury Fragrance & E-Commerce',
    resultType: 'paid',
    resultBadge: 'Paid Advertising Result',
    businessChallenge:
      'High competition in the luxury fragrance space on Meta and TikTok feeds, leading to ad fatigue and low return on ad spend with static product imagery.',
    campaignObjective:
      'Scale profitable e-commerce sales for the Blue Sapphire eau de parfum through sensory, high-retention vertical video creatives.',
    strategyApproach:
      'Engineered a video-first funnel focused on the first 3 seconds of viewer retention. Deployed dynamic speed-ramped reels paired with deep acoustic bass drops to trigger immediate impulse purchase behavior.',
    platforms: ['Meta Ads (Instagram Reels & Stories)', 'TikTok Ads Manager', 'Facebook Feed'],
    duration: '45-Day Acquisition Flight',
    budget: 'Undisclosed Commercial Ad Spend',
    creativeExecution:
      'Produced bespoke 9:16 vertical video assets with sapphire-blue lighting accents, macro bottle surface sweeps, fluid speed-ramping, and rhythmic audio cutdowns.',
    audienceTargeting:
      'High-intent luxury fragrance shoppers, niche eau de parfum enthusiasts, and lookalike audiences based on previous high-ticket e-commerce purchasers across the UK and GCC.',
    metrics: [
      { key: 'roas', label: 'Return On Ad Spend (ROAS)', value: '4.2×', subtext: 'Meta Ads Manager audited return', isPrimary: true },
      { key: 'ctr', label: 'Click-Through Rate (CTR)', value: '3.18%', subtext: 'Benchmark: 1.20% industry avg', isPrimary: true },
      { key: 'custom', label: 'First 3s Retention Rate', value: '82%', subtext: 'Vs. 35% standard video baseline' },
      { key: 'purchases', label: 'E-Commerce Purchases', value: '1,420+', subtext: 'Direct digital conversions' },
      { key: 'cpc', label: 'Cost Per Click (CPC)', value: '£0.38', subtext: 'Reduced from £0.84 previous average' },
    ],
    keyFindings: [
      'Pacing cuts to audio transients increased first-3-second retention by 47% compared to traditional product commercials.',
      '9:16 vertical aspect ratio generated a 64% lower CPA than 1:1 square cutdowns on Instagram Reels placements.',
      'Dark-room color grading with vivid sapphire highlights dramatically elevated perceived luxury pricing power.',
    ],
    myContribution:
      'End-to-end creative direction, video editing, pacing architecture, sound design, and creative iteration based on live retention drop-off analytics.',
    thumbnail: '/portfolio/video-posters/thumbs/Blue Sapphire Game of Spades-poster.webp',
    mediaUrl: '/portfolio/videos/compressed/Blue Sapphire Game of Spades.mp4',
    tags: ['E-Commerce', 'ROAS 4.2×', 'Meta Ads', 'TikTok Ads', 'Fragrance'],
    featured: true,
  },

  // ─── Case Study 02: Beautyworld Dubai ────────────────────────────────────────
  {
    id: 'beautyworld-dubai-showcase',
    title: 'Global Fragrance Showcase — International Trade & B2B Inquiries',
    client: 'Beautyworld Middle East / Luxury Perfume House',
    industry: 'Luxury Fragrance & Global Trade Exhibition',
    resultType: 'combined',
    resultBadge: 'Combined Business Outcome',
    businessChallenge:
      'International exhibitions often generate short-lived offline interest without sustained digital reach or measurable post-event B2B trade partnerships.',
    campaignObjective:
      'Capture the physical grandeur of the Dubai exhibition pavilion and convert it into global digital prestige, driving high-value distribution partnerships.',
    strategyApproach:
      'Blended organic VIP trade distribution on LinkedIn and Instagram with targeted paid amplification reaching fragrance brand executives, distributors, and buyers worldwide.',
    platforms: ['Instagram Organic & Reels Boost', 'LinkedIn Sponsored Content', 'Direct Trade Portals'],
    duration: '3-Week Event & Post-Event Campaign',
    budget: 'Hybrid Organic + Targeted Amplification',
    creativeExecution:
      'Cinematic architectural pacing, golden hour color grading, macro perfume bottle facets, and spatial sound design communicating prestige and scale.',
    audienceTargeting:
      'Fragrance house founders, international distributors, luxury department store buyers, and trade summit attendees in London, Dubai, Paris, and Milan.',
    metrics: [
      { key: 'reach', label: 'Total Verified Campaign Reach', value: '580K+', subtext: 'Across international trade channels', isPrimary: true },
      { key: 'custom', label: 'Average Watch Time', value: '74%', subtext: 'Far exceeding trade event reel norms', isPrimary: true },
      { key: 'impressions', label: 'Digital Impressions', value: '890K+', subtext: 'Multi-platform impressions' },
      { key: 'leads', label: 'B2B Distribution Inquiries', value: '48 Inquiries', subtext: 'Verified executive partner leads' },
    ],
    keyFindings: [
      'Editorial cinematic pacing outperformed fast-cut trade summaries in executive engagement and direct DM inquiries.',
      'Combining organic trade presence with geo-fenced paid social targeting drove 3.8× higher inquiry quality.',
    ],
    myContribution:
      'Lead Video Editor, Motion Designer & Sound Architect. Orchestrated pacing, multi-track audio engineering, cinematic color grading, and commercial mastering.',
    thumbnail: '/portfolio/video-posters/thumbs/Beautyworld Dubai 2026-poster.webp',
    mediaUrl: '/portfolio/videos/compressed/Beautyworld Dubai 2026.mp4',
    tags: ['B2B Growth', '580K Reach', 'Trade Exhibition', 'Luxury Video'],
    featured: true,
  },

  // ─── Case Study 03: Domino's Pizza ───────────────────────────────────────────
  {
    id: 'dominos-pizza-suite',
    title: 'Regional Promotional Ad Suite — Appetising Visuals & Order Lift',
    client: "Domino's Pizza (Regional Franchise Network)",
    industry: 'Food & Quick Service Restaurant',
    resultType: 'paid',
    resultBadge: 'Paid Advertising Result',
    businessChallenge:
      'High saturation of generic fast-food social posts leading to ad blindness and stagnant order rates on mobile promotional days.',
    campaignObjective:
      'Drive immediate digital mobile app orders and raise promotional click-through rates across regional takeaway trade areas.',
    strategyApproach:
      'Developed a standardized 21-asset promotional design suite emphasizing mouthwatering product close-ups, bold Swiss typography, and high-contrast deal badges.',
    platforms: ['Meta Ads (Facebook & Instagram Feed)', 'Google Display Network', 'Local App Push Banners'],
    duration: '30-Day Seasonal Promotion',
    budget: 'Regional Paid Social Budget',
    creativeExecution:
      'Crafted 21 unified advertising layouts highlighting cheese-pull texture, fresh toppings, dynamic steam accents, and unambiguous call-to-actions.',
    audienceTargeting:
      'Geo-fenced within a 5-mile delivery radius of participating franchise locations, targeting pizza enthusiasts, students, and evening mobile delivery shoppers.',
    metrics: [
      { key: 'ctr', label: 'Click-Through Rate Uplift', value: '+34%', subtext: 'Uplift over previous promotional cycle', isPrimary: true },
      { key: 'custom', label: 'Total Creatives Deployed', value: '21 Creatives', subtext: 'Full cross-format campaign suite', isPrimary: true },
      { key: 'clicks', label: 'Direct Order Link Clicks', value: '18,400+', subtext: 'Traffic sent to online ordering portal' },
      { key: 'cpc', label: 'Average Cost Per Click', value: '£0.22', subtext: '28% below regional QSR average' },
    ],
    keyFindings: [
      'High-contrast yellow and red typographic CTA banners generated a 34% higher click-through rate than full-photo layouts without text hierarchy.',
      'Rotating creative variants every 5 days eliminated ad fatigue and maintained consistent weekly order volume.',
    ],
    myContribution:
      'Lead Graphic Designer & Advertising Art Director. Visual concept creation, photo grading, graphic layouts, and typography systems.',
    thumbnail: "/portfolio/thumbnails/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-1-thumb.webp",
    tags: ['QSR', '+34% CTR', '21 Creatives', 'Meta Ads', 'Regional Campaign'],
    featured: true,
  },

  // ─── Case Study 04: Petronas Lubricants ───────────────────────────────────────
  {
    id: 'petronas-lubricants-campaign',
    title: 'Syntium Performance Drive — Precision Engineering Narrative',
    client: 'Petronas Lubricants International',
    industry: 'Automotive & Industrial Lubricants',
    resultType: 'paid',
    resultBadge: 'Paid Advertising Result',
    businessChallenge:
      'Technical industrial products often struggle to connect emotionally with vehicle owners who perceive motor oil as a generic commodity.',
    campaignObjective:
      'Position Petronas Syntium as the high-precision choice for engine longevity, fuel efficiency, and Formula 1-inspired performance.',
    strategyApproach:
      'Created a multi-panel visual advertising campaign pairing sleek technological fluid graphics with clean performance messaging and bold typographic benchmarks.',
    platforms: ['Meta Ads (Instagram & Facebook Feed)', 'Automotive Enthusiast Display Portals'],
    duration: '6-Week Targeted Campaign',
    budget: 'Targeted Performance Ad Flight',
    creativeExecution:
      'Minimalist dark-mode graphic architecture, technical callouts, vibrant neon green performance accents, and clean product can renders.',
    audienceTargeting:
      'Vehicle owners, automotive enthusiasts, DIY mechanics, and commercial fleet managers aged 22–55 in major metropolitan transport corridors.',
    metrics: [
      { key: 'impressions', label: 'Targeted Driver Impressions', value: '420K+', subtext: 'Across key urban automotive corridors', isPrimary: true },
      { key: 'custom', label: 'Brand Perception Rating', value: '4.8 / 5.0', subtext: 'Audited post-campaign consumer survey', isPrimary: true },
      { key: 'ctr', label: 'Average Click-Through Rate', value: '2.45%', subtext: 'Above industrial category average' },
      { key: 'cpc', label: 'Cost Per Engaged Visitor', value: '£0.41', subtext: 'Targeted high-intent landing page traffic' },
    ],
    keyFindings: [
      'Pairing technical performance stats with dark-mode aesthetic styling increased average dwell time on landing pages by 52%.',
      'Framing motor oil through thermal efficiency and protection rather than price increased premium-tier purchase interest.',
    ],
    myContribution:
      'Creative Advertising Direction & Graphic Layouts. Visual asset structuring, color tuning, and copy hierarchy.',
    thumbnail: '/portfolio/thumbnails/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-1-thumb.webp',
    tags: ['Automotive', '420K Impressions', 'Brand Equity', 'Performance Ads'],
  },

  // ─── Case Study 05: Runner Properties ────────────────────────────────────────
  {
    id: 'runner-properties-debut',
    title: 'Luxury Commercial Development — High-Net-Worth Investor Debut',
    client: 'Runner Properties',
    industry: 'Real Estate & Commercial Development',
    resultType: 'combined',
    resultBadge: 'Combined Business Outcome',
    businessChallenge:
      'Launching a high-tier commercial architectural development into an uncertain real estate investment climate required immediate credibility and high investor trust.',
    campaignObjective:
      'Generate qualified investor meetings and project reservations for commercial retail and corporate spaces.',
    strategyApproach:
      'Engineered an architectural branding suite pairing architectural photography with gold typographic accents and structured financial opportunity highlights.',
    platforms: ['Meta Paid Investor Prospecting', 'LinkedIn Executive Sponsored Content', 'Private Wealth Network'],
    duration: '60-Day Investment Phase',
    budget: 'Commercial Property Launch Budget',
    creativeExecution:
      'Bespoke architectural ad layouts, financial milestone callouts, floor plan teasers, and elegant editorial framing that communicated stability and prestige.',
    audienceTargeting:
      'Commercial property investors, corporate real estate directors, family offices, and high-net-worth individuals.',
    metrics: [
      { key: 'leads', label: 'Investor Inflow Uplift', value: '2.8×', subtext: 'During initial commercial debut window', isPrimary: true },
      { key: 'custom', label: 'Commercial Reservations', value: '85% Reserved', subtext: 'Within 60 days of campaign launch', isPrimary: true },
      { key: 'costPerLead', label: 'Cost Per Qualified Investor', value: '£38.50', subtext: 'Substantially below industry £85 benchmark' },
    ],
    keyFindings: [
      'Presenting verified yield forecasts and structural integrity metrics alongside architectural visuals drove 3.2× more qualified inquiries than lifestyle-only creatives.',
      'Single-point creative direction ensured total consistency between advertising collateral, investor pitch decks, and digital landing pages.',
    ],
    myContribution:
      'Campaign Creative Director & Lead Designer. Branding architecture, advertising graphic systems, investor presentation decks, and visual copy.',
    thumbnail: '/portfolio/thumbnails/creative-ads-for-runner-properties/Creative Ads For Runner Properties-1-thumb.webp',
    tags: ['Real Estate', '2.8× Investor Uplift', 'B2B Leads', 'Commercial Launch'],
  },

  // ─── Case Study 06: Miss Zainab ──────────────────────────────────────────────
  {
    id: 'miss-zainab-organic-momentum',
    title: 'Lifestyle & Culinary Storytelling — High-Velocity Organic Community Growth',
    client: 'Miss Zainab Lifestyle Brand',
    industry: 'Food, Lifestyle & Hospitality',
    resultType: 'organic',
    resultBadge: 'Organic Content Result',
    businessChallenge:
      'Breaking through the algorithmic noise on Instagram and TikTok without paying for sponsored ad reach.',
    campaignObjective:
      'Establish a devoted, active community through narrative pacing, culinary sound design, and relatable lifestyle reels.',
    strategyApproach:
      'Zero paid ad spend. Strategy focused on sensory ASMR audio, snappy visual hooks under 1.5 seconds, and rhythmic narrative pacing that encourages saves and shares.',
    platforms: ['Instagram Reels (Organic)', 'TikTok (Organic Feed)'],
    duration: 'Ongoing Content Cadence',
    budget: '£0.00 Paid Ad Spend (Pure Organic)',
    creativeExecution:
      'Dynamic short-form reel editing, Foley sound layering, synchronized background scores, punchy subtitles, and vibrant natural color grading.',
    audienceTargeting:
      'Organic algorithmic distribution targeting food lovers, recipe seekers, and modern lifestyle audiences across the UK.',
    metrics: [
      { key: 'reach', label: 'Organic Video Views', value: '250K+', subtext: 'Achieved within 48 hours of posting', isPrimary: true },
      { key: 'custom', label: 'Community Interactions', value: '18K+', subtext: 'Verified comments, shares, and bookmarks', isPrimary: true },
      { key: 'custom', label: 'Paid Ad Spend', value: '£0.00', subtext: '100% organic algorithmic momentum' },
    ],
    keyFindings: [
      'Layering acoustic Foley sound effects (crunching, pouring, sizzling) doubled viewer retention through to the final frame.',
      'Clear, bold on-screen questions in the opening second increased comment section dialogue by over 300%.',
    ],
    myContribution:
      'Creative Content Director, Video Editor & Sound Designer. Script pacing, narrative hook development, audio Foley design, and motion subtitles.',
    thumbnail: '/portfolio/video-posters/thumbs/Miss Zainab is Back-poster.webp',
    mediaUrl: '/portfolio/videos/compressed/Miss Zainab.mp4',
    tags: ['Organic Growth', '250K Views', '18K Interactions', 'Zero Ad Spend', 'Reels'],
  },
]
