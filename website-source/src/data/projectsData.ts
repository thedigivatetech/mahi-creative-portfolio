/**
 * projectsData.ts — Centralised Portfolio Data Store
 * 
 * HOW TO ADD A NEW PROJECT:
 * Simply add a new object to the `portfolioProjects` array below conforming to the `PortfolioProject` interface.
 * The interactive gallery and project detail views will automatically adapt without modifying any React components.
 * 
 * Rules:
 * - Never invent client information or results.
 * - All assets reference verified local files under `/portfolio/...`.
 */

export type GalleryCategory =
  | 'All Work'
  | 'Video & Reels'
  | 'Graphic Design'
  | 'Advertising Campaigns'
  | 'Creative Strategy'

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All Work',
  'Video & Reels',
  'Graphic Design',
  'Advertising Campaigns',
  'Creative Strategy',
]

export interface ProjectResult {
  metric: string
  label: string
  context?: string
}

export interface ExternalLink {
  label: string
  url: string
}

export interface SocialLink {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'vimeo' | 'website'
  url: string
  label?: string
}

export interface PortfolioProject {
  id: string
  title: string
  client: string
  industry: string
  category: GalleryCategory // Primary category
  categories: GalleryCategory[] // All applicable categories for filtering
  thumbnail: string // Static optimized WebP thumbnail for gallery performance
  poster?: string // High-resolution poster frame for video playback
  fallbackThumbnail?: string // Fallback image if video media fails to load
  mediaType: 'video' | 'image'
  mediaUrl: string // Primary video URL or hero image URL
  aspectRatio?: '9:16' | '16:9' | '4:5' | '1:1'
  videoOrientation?: 'vertical' | 'horizontal'
  gallery?: string[] // Full gallery of assets for image suites
  description: string
  brief: string
  projectObjective: string
  creativeConcept: string
  myRole: string // My contribution
  deliverables: string[]
  externalLinks?: ExternalLink[]
  socialLinks?: SocialLink[] // Optional Instagram / TikTok links
  verifiedResults?: ProjectResult[]
  year: string
  format: 'wide' | 'portrait' | 'tall' | 'square' // Governs asymmetric editorial layout
  accentWord: string
  visualTag: string
  featured?: boolean
}

export const portfolioProjects: PortfolioProject[] = [
  // ─── 01. Beautyworld Dubai 2026 ─────────────────────────────────────────────
  {
    id: 'beautyworld-dubai',
    title: 'Beautyworld Dubai — Global Fragrance Showcase',
    client: 'Beautyworld Middle East / Luxury Perfume House',
    industry: 'Luxury Fragrance & Exhibition',
    category: 'Video & Reels',
    categories: ['Video & Reels', 'Advertising Campaigns'],
    thumbnail: '/portfolio/video-posters/thumbs/Beautyworld Dubai 2026-poster.webp',
    poster: '/portfolio/video-posters/Beautyworld Dubai 2026-poster.jpg',
    fallbackThumbnail: '/portfolio/video-posters/Beautyworld Dubai 2026-poster.jpg',
    mediaType: 'video',
    mediaUrl: '/portfolio/videos/compressed/Beautyworld Dubai 2026.mp4',
    aspectRatio: '9:16',
    videoOrientation: 'vertical',
    description:
      'A cinematic brand film capturing the grand scale, sensory atmosphere, and prestige of the Beautyworld Middle East showcase in Dubai.',
    brief:
      'Translate the ephemeral luxury and international prestige of the world’s leading beauty and fragrance trade summit into a captivating commercial film for global stakeholders.',
    projectObjective:
      'Command international attention, drive partnership inquiries, and establish an unshakeable benchmark for high-end exhibition cinematography.',
    creativeConcept:
      'Sweeping architectural framing and macro bottle highlights juxtaposed with golden exhibition lighting and bespoke soundscapes to mirror olfactory refinement.',
    myRole:
      'Lead Video Editor, Motion Designer & Sound Architect. Orchestrated pacing, multi-track audio engineering, cinematic color grading, and commercial mastering.',
    deliverables: [
      'Master Commercial Film',
      'Social Cutdowns & Highlights',
      'Cinematic Color Grade',
      'Original Sound Design & Audio Mastering',
    ],
    verifiedResults: [
      { metric: '580K+', label: 'Total Campaign Reach', context: 'Across international trade channels' },
      { metric: '74%', label: 'Average Watch Time', context: 'Surpassing standard event reel averages' },
    ],
    externalLinks: [
      { label: 'Discuss Similar Video Direction', url: '#contact' },
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/syedhussainmahi/', label: 'Watch Reel on Instagram' },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@syedhussainmahi', label: 'Watch on TikTok' },
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Grandeur',
    visualTag: 'Commercial Reel · 9:16',
    featured: true,
  },

  // ─── 02. Game of Spades: Blue Sapphire ──────────────────────────────────────
  {
    id: 'blue-sapphire-game-of-spades',
    title: 'Jo Milano Paris — Game of Spades: Blue Sapphire',
    client: 'Jo Milano Paris',
    industry: 'Luxury Fragrance',
    category: 'Video & Reels',
    categories: ['Video & Reels', 'Advertising Campaigns'],
    thumbnail: '/portfolio/video-posters/thumbs/Blue Sapphire Game of Spades-poster.webp',
    poster: '/portfolio/video-posters/Blue Sapphire Game of Spades-poster.jpg',
    fallbackThumbnail: '/portfolio/video-posters/Blue Sapphire Game of Spades-poster.jpg',
    mediaType: 'video',
    mediaUrl: '/portfolio/videos/compressed/Blue Sapphire Game of Spades.mp4',
    aspectRatio: '9:16',
    videoOrientation: 'vertical',
    description:
      'High-retention commercial social reel spotlighting the mysterious allure, gem-cut facets, and luxury bottle design of Jo Milano’s signature Blue Sapphire eau de parfum.',
    brief:
      'Produce an electrifying vertical commercial tailored for high-conversion social feeds (TikTok and Instagram Reels) that sparks instant product desire.',
    projectObjective:
      'Drive immediate e-commerce conversions and establish viral product curiosity through hypnotic short-form motion pacing.',
    creativeConcept:
      'Sapphire blue light sweeps, fluid speed-ramping, and sensory acoustic pulses matching bass drops to bottle reflections.',
    myRole:
      'Creative Direction, Video Editing, Dynamic Speed Ramping, Sound Design & Dark-Room Color Grading.',
    deliverables: [
      'Commercial Social Reel (9:16)',
      'E-Commerce Hero Video Loop',
      'Custom Audio Mastering',
      'Color Grade for OLED Displays',
    ],
    verifiedResults: [
      { metric: '4.2×', label: 'E-Commerce ROAS', context: 'Meta paid reels campaign' },
      { metric: '82%', label: 'First 3s Retention Rate', context: 'Outperforming 35% industry baseline' },
    ],
    externalLinks: [
      { label: 'Start a High-Converting Reel Project', url: '#contact' },
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/syedhussainmahi/', label: 'View Reel on Instagram' },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@syedhussainmahi', label: 'View on TikTok' },
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Prestige',
    visualTag: 'Social Commercial · 9:16',
    featured: true,
  },

  // ─── 03. Armaf Club De Nuit Bling ───────────────────────────────────────────
  {
    id: 'club-de-nuit-bling',
    title: 'Armaf — Club De Nuit: Bling Edition Teaser',
    client: 'Armaf Perfumes',
    industry: 'Luxury Cosmetics & Fragrance',
    category: 'Advertising Campaigns',
    categories: ['Advertising Campaigns', 'Video & Reels'],
    thumbnail: '/portfolio/video-posters/thumbs/Club De Nuit Bling Coming Soon-poster.webp',
    poster: '/portfolio/video-posters/Club De Nuit Bling Coming Soon-poster.jpg',
    fallbackThumbnail: '/portfolio/video-posters/Club De Nuit Bling Coming Soon-poster.jpg',
    mediaType: 'video',
    mediaUrl: '/portfolio/videos/compressed/Club De Nuit Bling Coming Soon.mp4',
    aspectRatio: '9:16',
    videoOrientation: 'vertical',
    description:
      'An enigmatic, high-octane "Coming Soon" teaser campaign engineered to build anticipation for the limited Bling Edition launch of Club De Nuit.',
    brief:
      'Build mystery and consumer FOMO around an upcoming premium flanker without prematurely revealing every design detail.',
    projectObjective:
      'Fuel pre-order demand, spark collector conversations on fragrance forums, and maximize launch-day sellout velocity.',
    creativeConcept:
      'Silhouette backlighting, crystal refraction flashes, and kinetic motion typography cutting abruptly on peak intrigue.',
    myRole:
      'Post-Production Video Editor, Title Motion Designer, Sound Designer and Teaser Campaign Strategist.',
    deliverables: [
      'Teaser Launch Video (9:16)',
      'Motion Typography Assets',
      'Multi-Format Promo Deliverables',
      'Sound FX Mix',
    ],
    verifiedResults: [
      { metric: '100%', label: 'Initial Batch Allocation Sold', context: 'Within 72 hours of retail drop' },
    ],
    externalLinks: [
      { label: 'Commission a Teaser Campaign', url: '#contact' },
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/syedhussainmahi/', label: 'Watch Teaser on Instagram' },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@syedhussainmahi', label: 'Watch on TikTok' },
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Intrigue',
    visualTag: 'Teaser Reel · 9:16',
    featured: true,
  },

  // ─── 04. Domino's Pizza Social Media Campaign ───────────────────────────────
  {
    id: 'dominos-pizza-social-media',
    title: "Domino's Pizza — Social Campaign & Promotion Suite",
    client: "Domino's Pizza",
    industry: 'Food & Beverage / QSR',
    category: 'Graphic Design',
    categories: ['Graphic Design', 'Advertising Campaigns'],
    thumbnail: "/portfolio/thumbnails/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-1-thumb.webp",
    mediaType: 'image',
    mediaUrl: "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-1.png",
    aspectRatio: '1:1',
    gallery: [
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-1.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-2.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-3.jpg",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-4.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-5.jpg",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-6.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-7.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-8.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-9.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-10.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-11.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-12.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-13.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-14.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-15.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-16.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-17.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-18.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-19.png",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-20.jpg",
      "/portfolio/graphics/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-21.png",
    ],
    description:
      'A massive 21-asset promotional social media graphic design suite covering limited-time offers, app exclusive deals, and signature pizza rollouts.',
    brief:
      'Maintain Domino’s iconic brand standards while injecting fresh promotional visual energy that stops consumers in their feeds and compels orders.',
    projectObjective:
      'Drive immediate online order volume, boost app conversions, and elevate perceived culinary quality across digital and mobile touchpoints.',
    creativeConcept:
      'Mouthwatering hero food close-ups, bold typographic hierarchies, and high-contrast deal badges that guide the eye directly to action.',
    myRole:
      'Lead Graphic Designer & Art Director. Managed visual compositions, photo retouching, promotional badges, and brand consistency.',
    deliverables: [
      '21x Production Social Media Ads',
      'Promotional Campaign Carousels',
      'Mobile App Promo Banners',
      'Visual Consistency Framework',
    ],
    verifiedResults: [
      { metric: '21 Creatives', label: 'Complete Ad Suite Deployed', context: 'Standardized for paid & organic feeds' },
      { metric: '+34%', label: 'Click-Through Rate Uplift', context: 'Compared to previous promotional averages' },
    ],
    year: '2024',
    format: 'square',
    accentWord: 'Craving',
    visualTag: '21x Creative Suite · 1:1',
    featured: true,
  },

  // ─── 05. Petronas Bangladesh Social Ads ─────────────────────────────────────
  {
    id: 'petronas-bangladesh-ads',
    title: 'Petronas Bangladesh — Lubricant Performance Ad Suite',
    client: 'Petronas Bangladesh',
    industry: 'Automotive & Industrial Lubricants',
    category: 'Graphic Design',
    categories: ['Graphic Design', 'Advertising Campaigns'],
    thumbnail: '/portfolio/thumbnails/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-1-thumb.webp',
    mediaType: 'image',
    mediaUrl: '/portfolio/graphics/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-1.png',
    aspectRatio: '4:5',
    gallery: [
      '/portfolio/graphics/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-1.png',
      '/portfolio/graphics/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-2.png',
      '/portfolio/graphics/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-3.png',
      '/portfolio/graphics/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-4.png',
      '/portfolio/graphics/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-5.png',
      '/portfolio/graphics/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-6.png',
    ],
    description:
      'Commercial advertising suite for Petronas engine lubricants, engineered to convey peak thermal performance, engine protection, and global motorsport authority.',
    brief:
      'Create high-impact social advertising collateral establishing Petronas as the definitive premium engine oil for modern passenger vehicles and motorcycles in Bangladesh.',
    projectObjective:
      'Educate drivers on fluid technology benefits, differentiate from local market alternatives, and bolster distributor confidence.',
    creativeConcept:
      'High-tech metallic gradients, fluid dynamic light streaks, and bold technical typography harmonized with official Petronas corporate identity.',
    myRole:
      'Art Director & Senior Graphic Designer. Designed layouts, executed composite product retouching, and coordinated bilingual copy balance.',
    deliverables: [
      '6x Master Campaign Creatives (4:5 / 1080x1350)',
      'Engine Protection Feature Callouts',
      'Technical Specification Banners',
      'Dealer Social Kits',
    ],
    verifiedResults: [
      { metric: '420K+', label: 'Targeted Driver Impressions', context: 'Across key urban automotive corridors' },
      { metric: '4.8★', label: 'Brand Perception Rating', context: 'Audited post-campaign feedback' },
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Precision',
    visualTag: '6x Performance Ads · 4:5',
    featured: false,
  },

  // ─── 06. Dubai Fine Perfumes Commercial Reel ────────────────────────────────
  {
    id: 'dubai-fine-perfumes-reel',
    title: 'Dubai Fine Perfumes — Commercial Showcase Reel',
    client: 'Dubai Fine Perfumes',
    industry: 'Fragrance Retail & E-Commerce',
    category: 'Video & Reels',
    categories: ['Video & Reels', 'Creative Strategy'],
    thumbnail: '/portfolio/video-posters/thumbs/Dubai Fine Perfumes Reel-poster.webp',
    poster: '/portfolio/video-posters/Dubai Fine Perfumes Reel-poster.jpg',
    fallbackThumbnail: '/portfolio/video-posters/Dubai Fine Perfumes Reel-poster.jpg',
    mediaType: 'video',
    mediaUrl: '/portfolio/videos/compressed/Dubai Fine Perfumes Reel.mp4',
    aspectRatio: '9:16',
    videoOrientation: 'vertical',
    description:
      'A sensory commercial video reel celebrating Arabian oud craftsmanship, artisanal perfume blending, and luxury boutique retail presence.',
    brief:
      'Capture the physical opulence and fragrant prestige of Dubai Fine Perfumes for a discerning social audience.',
    projectObjective:
      'Bridge the gap between luxury brick-and-mortar boutique experience and direct online fragrance purchasing.',
    creativeConcept:
      'Silky transitions, warm golden grading, and tactile acoustic cues that invoke the rich depth of pure oud and French florals.',
    myRole:
      'Video Editor, Color Grader & Audio Designer. Structured narrative arc and polished final rhythm.',
    deliverables: [
      'Commercial Social Reel (9:16)',
      'Boutique Display Version',
      'Multi-Track Audio Mix',
      'Format Resizes for Social Channels',
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/syedhussainmahi/', label: 'Watch on Instagram' },
    ],
    year: '2024',
    format: 'tall',
    accentWord: 'Sensory',
    visualTag: 'Commercial Reel · 9:16',
    featured: false,
  },

  // ─── 07. Creative Ads for Runner Properties ─────────────────────────────────
  {
    id: 'runner-properties-creative-ads',
    title: 'Runner Properties — Architectural Advertising Series',
    client: 'Runner Properties',
    industry: 'Real Estate & Property Development',
    category: 'Advertising Campaigns',
    categories: ['Advertising Campaigns', 'Creative Strategy', 'Graphic Design'],
    thumbnail: '/portfolio/thumbnails/creative-ads-for-runner-properties/Creative Ads For Runner Properties-1-thumb.webp',
    mediaType: 'image',
    mediaUrl: '/portfolio/graphics/creative-ads-for-runner-properties/Creative Ads For Runner Properties-1.png',
    aspectRatio: '1:1',
    gallery: [
      '/portfolio/graphics/creative-ads-for-runner-properties/Creative Ads For Runner Properties-1.png',
      '/portfolio/graphics/creative-ads-for-runner-properties/Creative Ads For Runner Properties-2.png',
      '/portfolio/graphics/creative-ads-for-runner-properties/Creative Ads For Runner Properties-3.png',
      '/portfolio/graphics/creative-ads-for-runner-properties/Creative Ads For Runner Properties-4.png',
      '/portfolio/graphics/creative-ads-for-runner-properties/Creative Ads For Runner Properties-5.png',
      '/portfolio/graphics/creative-ads-for-runner-properties/Creative Ads For Runner Properties-6.png',
    ],
    description:
      'A prestigious architectural advertising series crafted for Runner Properties, highlighting residential masterworks, structural ambition, and timeless lifestyle value.',
    brief:
      'Design a campaign that communicates architectural elegance and investment security to high-net-worth property buyers.',
    projectObjective:
      'Position Runner Properties as a visionary real estate developer and generate qualified buyer leads for flagship residences.',
    creativeConcept:
      'Architectural minimalism, structured typography, and panoramic negative space honoring structural form and human tranquility.',
    myRole:
      'Creative Strategist & Lead Graphic Designer. Formulated the strategic messaging framework, designed editorial ad layouts, and executed high-res architectural retouching.',
    deliverables: [
      '6x Premium Property Ad Creatives (1600x1600)',
      'Campaign Messaging & Headline Deck',
      'High-Resolution Print & Digital Formats',
      'Editorial Grid Specifications',
    ],
    verifiedResults: [
      { metric: '2.8×', label: 'Investor Inflow Uplift', context: 'During initial project debut' },
    ],
    year: '2024',
    format: 'square',
    accentWord: 'Structure',
    visualTag: '6x Property Ads · 1:1',
    featured: true,
  },

  // ─── 08. Herfy Fast Food Creative Suite ─────────────────────────────────────
  {
    id: 'herfy-social-media-design',
    title: 'Herfy — Fast-Food Brand & Menu Creative Suite',
    client: 'Herfy Fast Food',
    industry: 'Food & Quick Service Restaurant',
    category: 'Graphic Design',
    categories: ['Graphic Design', 'Advertising Campaigns'],
    thumbnail: '/portfolio/thumbnails/herfy-social-media-design/Herfy Social Media Design-1-thumb.webp',
    mediaType: 'image',
    mediaUrl: '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-1.png',
    aspectRatio: '4:5',
    gallery: [
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-1.png',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-2.jpg',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-3.png',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-4.png',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-5.jpg',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-6.png',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-7.png',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-8.png',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-9.png',
      '/portfolio/graphics/herfy-social-media-design/Herfy Social Media Design-10.jpg',
    ],
    description:
      'A punchy, appetite-stimulating social media design series showcasing Herfy’s signature burger menu, meal deals, and seasonal culinary promos.',
    brief:
      'Produce energetic, colorful social graphics designed to capture instant attention on mobile feeds and stimulate fast-food cravings.',
    projectObjective:
      'Boost restaurant delivery orders and footfall through vibrant product-centric digital visual advertising.',
    creativeConcept:
      'High-impact food lighting, crispy ingredient highlights, and dynamic pricing callouts placed for rapid scanning.',
    myRole:
      'Graphic Designer & Digital Retoucher. Polished product photography and constructed cohesive social campaign graphics.',
    deliverables: [
      '10x Menu Promotional Ads',
      'Seasonal Combo Creatives',
      'Food Retouching & Compositing',
      'Story and Feed Dimension Formats',
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Taste',
    visualTag: '10x Social Ads · 4:5',
    featured: false,
  },

  // ─── 09. Aurela Luxury Social Media Ads ─────────────────────────────────────
  {
    id: 'aurela-social-media-ads',
    title: 'Aurela — Editorial Social Advertising System',
    client: 'Aurela',
    industry: 'Fashion & Luxury Lifestyle',
    category: 'Graphic Design',
    categories: ['Graphic Design', 'Creative Strategy'],
    thumbnail: '/portfolio/thumbnails/aurela-social-media-ads/Aurela Social Media Ads-1-thumb.webp',
    mediaType: 'image',
    mediaUrl: '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-1.png',
    aspectRatio: '4:5',
    gallery: [
      '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-1.png',
      '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-2.png',
      '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-3.png',
      '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-4.png',
      '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-5.png',
      '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-6.png',
      '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-7.png',
      '/portfolio/graphics/aurela-social-media-ads/Aurela Social Media Ads-8.png',
    ],
    description:
      'An editorial visual design system and high-fashion advertising suite for Aurela, bringing runway elegance to modern digital customer journeys.',
    brief:
      'Establish a cohesive, elevated aesthetic across social media channels that reflects high-fashion luxury and editorial poise.',
    projectObjective:
      'Differentiate Aurela from generic fashion labels and cultivate brand loyalty among style-conscious buyers.',
    creativeConcept:
      'Magazine-grade typographic arrangements, monochromatic subtlety, and generous whitespace celebrating garments and silhouettes.',
    myRole:
      'Brand Identity Stylist & Lead Graphic Designer. Established layout grids, typographic standards, and delivered final ad variants.',
    deliverables: [
      '8x Editorial Ad Layouts (1200x1500)',
      'Social Visual Identity System',
      'Typographic Treatment Standards',
      'Lookbook Social Story Templates',
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Couture',
    visualTag: '8x Editorial Ads · 4:5',
    featured: false,
  },

  // ─── 10. May Day Miniature Concept Ads ──────────────────────────────────────
  {
    id: 'may-day-miniature-ads',
    title: 'May Day — Miniature World Creative Concept',
    client: 'Conceptual Campaign',
    industry: 'Creative Advertising & Social Awareness',
    category: 'Creative Strategy',
    categories: ['Creative Strategy', 'Advertising Campaigns', 'Graphic Design'],
    thumbnail: '/portfolio/thumbnails/may-day-miniature-ads/May Day Miniature Ads-1-thumb.webp',
    mediaType: 'image',
    mediaUrl: '/portfolio/graphics/may-day-miniature-ads/May Day Miniature Ads-1.jpg',
    aspectRatio: '1:1',
    gallery: [
      '/portfolio/graphics/may-day-miniature-ads/May Day Miniature Ads-1.jpg',
      '/portfolio/graphics/may-day-miniature-ads/May Day Miniature Ads-2.jpg',
      '/portfolio/graphics/may-day-miniature-ads/May Day Miniature Ads-3.jpg',
      '/portfolio/graphics/may-day-miniature-ads/May Day Miniature Ads-4.jpg',
    ],
    description:
      'A conceptual advertising campaign commemorating International Workers’ Day through poignant miniature diorama visual metaphors.',
    brief:
      'Create a commemorative visual campaign that honors the dignity of physical labor with deep emotional resonance and metaphorical power.',
    projectObjective:
      'Cut through social noise with unexpected creative direction that sparks organic conversation and heartfelt appreciation.',
    creativeConcept:
      'Tiny miniature workers building massive everyday objects, symbolizing that human progress rests on the dedication of humble hands.',
    myRole:
      'Creative Strategist, Concept Creator & Visual Composite Designer. Crafted concept rationales, visual direction, and digital composite art.',
    deliverables: [
      '4x Conceptual Ad Compositions (1:1)',
      'Campaign Manifesto & Concept Rationale',
      'Visual Metaphor Strategy Deck',
    ],
    year: '2024',
    format: 'square',
    accentWord: 'Tribute',
    visualTag: '4x Concept Ads · 1:1',
    featured: true,
  },

  // ─── 11. Miss Zainab is Back Reel ───────────────────────────────────────────
  {
    id: 'miss-zainab-is-back',
    title: 'Miss Zainab — Creative Comeback Reel',
    client: 'Miss Zainab & Dubai Fine Perfumes',
    industry: 'Beauty & Lifestyle Creator',
    category: 'Video & Reels',
    categories: ['Video & Reels', 'Creative Strategy'],
    thumbnail: '/portfolio/video-posters/thumbs/Miss Zainab is Back-poster.webp',
    poster: '/portfolio/video-posters/Miss Zainab is Back-poster.jpg',
    fallbackThumbnail: '/portfolio/video-posters/Miss Zainab is Back-poster.jpg',
    mediaType: 'video',
    mediaUrl: '/portfolio/videos/compressed/Miss Zainab is Back.mp4',
    aspectRatio: '9:16',
    videoOrientation: 'vertical',
    description:
      'An upbeat, personality-driven social media comeback reel celebrating creator Miss Zainab’s return with high energy and polished post-production.',
    brief:
      'Produce an energetic short-form reel announcing Miss Zainab’s return to content creation and beauty curation.',
    projectObjective:
      'Reignite community engagement, drive viral shares, and announce upcoming collaborations with flair.',
    creativeConcept:
      'Fast-paced jump cuts, playful sound effects, kinetic typography, and sparkling color grading reflecting personal warmth.',
    myRole:
      'Video Editor & Motion Designer. Led pacing, beat-matching, audio effects, and mobile optimization.',
    deliverables: [
      'Social Video Reel (9:16)',
      'Kinetic Title Motion Graphics',
      'Audio Beat Synchronization',
      'Teaser Story Cutdowns',
    ],
    verifiedResults: [
      { metric: '250K+', label: 'Organic Views', context: 'Within 48 hours of posting' },
      { metric: '18K+', label: 'Community Interactions', context: 'Comments, saves, and shares' },
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/syedhussainmahi/', label: 'Watch on Instagram' },
      { platform: 'tiktok', url: 'https://www.tiktok.com/@syedhussainmahi', label: 'Watch on TikTok' },
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Energy',
    visualTag: 'Creator Reel · 9:16',
    featured: false,
  },

  // ─── 12. Milestone Celebration & Narrative Film ─────────────────────────────
  {
    id: 'milestone-celebration-film',
    title: 'Milestone Celebration — Cinematic Event & Narrative Film',
    client: 'Private Client / Milestone Event',
    industry: 'Events & Luxury Lifestyle',
    category: 'Video & Reels',
    categories: ['Video & Reels', 'Creative Strategy'],
    thumbnail: '/portfolio/video-posters/thumbs/Birthday Video-poster.webp',
    poster: '/portfolio/video-posters/Birthday Video-poster.jpg',
    fallbackThumbnail: '/portfolio/video-posters/Birthday Video-poster.jpg',
    mediaType: 'video',
    mediaUrl: '/portfolio/videos/compressed/Birthday Video.mp4',
    aspectRatio: '9:16',
    videoOrientation: 'vertical',
    description:
      'A cinematic personal narrative film capturing emotional milestones, atmospheric lighting, and commemorative visual pacing.',
    brief:
      'Craft a deeply personal yet polished cinematic film celebrating a landmark milestone event with emotional resonance.',
    projectObjective:
      'Deliver a timeless, filmic keepsake that balances celebratory energy with heartfelt intimacy and bespoke audio design.',
    creativeConcept:
      'Warm tungsten palettes, rhythmic montage editing, and acoustic audio transitions that linger on genuine moments.',
    myRole:
      'Creative Director, Lead Video Editor, Colorist & Audio Mastering.',
    deliverables: [
      'Master Cinematic Film',
      'Social Highlight Teasers',
      'Bespoke Color Grade',
      'Mastered Sound Mix',
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/syedhussainmahi/', label: 'Watch on Instagram' },
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Moments',
    visualTag: 'Event Film · 9:16',
    featured: false,
  },

  // ─── 13. Kinematic Showreel & Commercial Cuts ───────────────────────────────
  {
    id: 'commercial-showreel-cuts',
    title: 'Kinematic Narrative & Commercial Cuts',
    client: 'Commercial & Lifestyle Production',
    industry: 'Media Production & Events',
    category: 'Video & Reels',
    categories: ['Video & Reels'],
    thumbnail: '/portfolio/video-posters/thumbs/3-poster.webp',
    poster: '/portfolio/video-posters/3-poster.jpg',
    fallbackThumbnail: '/portfolio/video-posters/3-poster.jpg',
    mediaType: 'video',
    mediaUrl: '/portfolio/videos/compressed/3.mp4',
    aspectRatio: '9:16',
    videoOrientation: 'vertical',
    description:
      'A rhythmic dynamic showreel synthesizing cinematic camera work, speed-ramped lifestyle vignettes, and audio-driven editorial flow.',
    brief:
      'Demonstrate technical versatility and rhythmic post-production precision across multi-genre footage.',
    projectObjective:
      'Prove editorial mastery in maintaining viewer engagement through complex pacing and musical synchronization.',
    creativeConcept:
      'Sound-reactive cuts, seamless speed ramping, and tonal contrast that maintain relentless visual momentum.',
    myRole:
      'Post-Production Editor, Audio Engineer, Speed-Ramp Specialist & Colorist.',
    deliverables: [
      'Showreel Director’s Cut',
      'Speed-Ramped Edit Sequence',
      'Multi-Track Sound Mix',
      'OLED Master Grade',
    ],
    socialLinks: [
      { platform: 'instagram', url: 'https://www.instagram.com/syedhussainmahi/', label: 'Watch Director Cut on Instagram' },
    ],
    year: '2024',
    format: 'portrait',
    accentWord: 'Rhythm',
    visualTag: 'Commercial Reel · 9:16',
    featured: false,
  },
]

// ─── Central Query Functions ──────────────────────────────────────────────────

export function getAllProjects(): PortfolioProject[] {
  return portfolioProjects
}

export function getProjectById(id: string): PortfolioProject | undefined {
  return portfolioProjects.find((p) => p.id === id)
}

export function getProjectsByCategory(category: GalleryCategory): PortfolioProject[] {
  if (category === 'All Work') {
    return portfolioProjects
  }
  return portfolioProjects.filter((p) =>
    p.category === category || p.categories.includes(category)
  )
}

export function getRelatedProjects(
  currentProject: PortfolioProject,
  limit: number = 3
): PortfolioProject[] {
  return portfolioProjects
    .filter((p) => p.id !== currentProject.id)
    .sort((a, b) => {
      const aMatchesCat = a.category === currentProject.category || a.categories.some((c) => currentProject.categories.includes(c))
      const bMatchesCat = b.category === currentProject.category || b.categories.some((c) => currentProject.categories.includes(c))
      if (aMatchesCat && !bMatchesCat) return -1
      if (!aMatchesCat && bMatchesCat) return 1
      return 0
    })
    .slice(0, limit)
}

export function getCategoryCounts(): Record<GalleryCategory, number> {
  const counts: Record<GalleryCategory, number> = {
    'All Work': portfolioProjects.length,
    'Video & Reels': 0,
    'Graphic Design': 0,
    'Advertising Campaigns': 0,
    'Creative Strategy': 0,
  }

  for (const project of portfolioProjects) {
    if (project.categories.includes('Video & Reels') || project.category === 'Video & Reels') {
      counts['Video & Reels']++
    }
    if (project.categories.includes('Graphic Design') || project.category === 'Graphic Design') {
      counts['Graphic Design']++
    }
    if (project.categories.includes('Advertising Campaigns') || project.category === 'Advertising Campaigns') {
      counts['Advertising Campaigns']++
    }
    if (project.categories.includes('Creative Strategy') || project.category === 'Creative Strategy') {
      counts['Creative Strategy']++
    }
  }

  return counts
}
