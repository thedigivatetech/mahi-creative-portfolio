/**
 * adminStorage.ts — Persistence & State Management for Mahi's WordPress-like Backend Panel
 */

import { portfolioProjects, type PortfolioProject } from '@data/projectsData.ts'
import { initialBlogPosts, type BlogPost } from '@data/blogsData.ts'

export interface MediaItem {
  id: string
  title: string
  url: string
  type: 'image' | 'video'
  format: string
  size: string
  uploadedAt: string
  dimensions?: string
  alt?: string
}

export interface ClientEnquiry {
  id: string
  name: string
  businessName?: string
  email: string
  website?: string
  projectType: string
  budgetRange: string
  description: string
  submittedAt: string
  status: 'new' | 'reviewed' | 'contacted'
}

const STORAGE_KEYS = {
  PROJECTS: 'mahi_cms_projects_v2',
  BLOGS: 'mahi_cms_blogs_v2',
  MEDIA: 'mahi_cms_media_v2',
  ENQUIRIES: 'mahi_cms_enquiries_v2',
  SETTINGS: 'mahi_cms_settings_v2',
}

// Built-in verified media assets from disk
const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media-beautyworld-vid',
    title: 'Beautyworld Dubai 2026 Commercial Master',
    url: '/portfolio/videos/compressed/Beautyworld Dubai 2026.mp4',
    type: 'video',
    format: 'MP4 (H.264)',
    size: '18.4 MB',
    uploadedAt: '2024-10-12',
    dimensions: '1080 × 1920 (9:16)',
    alt: 'Beautyworld Dubai Showcase Video',
  },
  {
    id: 'media-beautyworld-thumb',
    title: 'Beautyworld Dubai Poster WebP',
    url: '/portfolio/video-posters/thumbs/Beautyworld Dubai 2026-poster.webp',
    type: 'image',
    format: 'WebP',
    size: '84 KB',
    uploadedAt: '2024-10-12',
    dimensions: '1080 × 1920',
    alt: 'Beautyworld Dubai Thumbnail',
  },
  {
    id: 'media-blue-sapphire-vid',
    title: 'Jo Milano — Blue Sapphire Video',
    url: '/portfolio/videos/compressed/Blue Sapphire Game of Spades.mp4',
    type: 'video',
    format: 'MP4 (H.264)',
    size: '14.2 MB',
    uploadedAt: '2024-10-15',
    dimensions: '1080 × 1920 (9:16)',
    alt: 'Blue Sapphire Commercial Video',
  },
  {
    id: 'media-blue-sapphire-thumb',
    title: 'Blue Sapphire Poster WebP',
    url: '/portfolio/video-posters/thumbs/Blue Sapphire Game of Spades-poster.webp',
    type: 'image',
    format: 'WebP',
    size: '72 KB',
    uploadedAt: '2024-10-15',
    dimensions: '1080 × 1920',
    alt: 'Blue Sapphire Thumbnail',
  },
  {
    id: 'media-dominos-1',
    title: "Domino's Pizza Creative 01",
    url: "/portfolio/thumbnails/domino-s-pizza-social-media-design/Domino's Pizza Social Media Design-1-thumb.webp",
    type: 'image',
    format: 'WebP',
    size: '64 KB',
    uploadedAt: '2024-10-20',
    dimensions: '1080 × 1080',
    alt: "Domino's Pizza Promotional Graphic",
  },
  {
    id: 'media-petronas-1',
    title: 'Petronas Syntium Ad 01',
    url: '/portfolio/thumbnails/petronas-bangladesh-social-media-ads/Petronas Bangladesh Social Media Ads-1-thumb.webp',
    type: 'image',
    format: 'WebP',
    size: '68 KB',
    uploadedAt: '2024-10-22',
    dimensions: '1080 × 1350',
    alt: 'Petronas Lubricants Performance Ad',
  },
  {
    id: 'media-runner-1',
    title: 'Runner Properties Commercial 01',
    url: '/portfolio/thumbnails/creative-ads-for-runner-properties/Creative Ads For Runner Properties-1-thumb.webp',
    type: 'image',
    format: 'WebP',
    size: '76 KB',
    uploadedAt: '2024-10-25',
    dimensions: '1080 × 1080',
    alt: 'Runner Properties Architectural Ad',
  },
  {
    id: 'media-zainab-vid',
    title: 'Miss Zainab Comeback Reel',
    url: '/portfolio/videos/compressed/Miss Zainab is Back.mp4',
    type: 'video',
    format: 'MP4 (H.264)',
    size: '12.8 MB',
    uploadedAt: '2024-10-28',
    dimensions: '1080 × 1920 (9:16)',
    alt: 'Miss Zainab Lifestyle Reel',
  },
  {
    id: 'media-birthday-vid',
    title: 'Milestone Celebration Video',
    url: '/portfolio/videos/compressed/Birthday Video.mp4',
    type: 'video',
    format: 'MP4 (H.264)',
    size: '16.5 MB',
    uploadedAt: '2024-11-01',
    dimensions: '1080 × 1920 (9:16)',
    alt: 'Milestone Celebration Reel',
  },
  {
    id: 'media-showreel-vid',
    title: 'Kinematic Narrative Cuts Reel',
    url: '/portfolio/videos/compressed/3.mp4',
    type: 'video',
    format: 'MP4 (H.264)',
    size: '15.1 MB',
    uploadedAt: '2024-11-05',
    dimensions: '1080 × 1920 (9:16)',
    alt: 'Commercial Cuts Showreel',
  },
]

class AdminStorageService {
  // ─── Projects ─────────────────────────────────────────────────────────────
  getProjects(): PortfolioProject[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Fallback
    }
    return portfolioProjects
  }

  saveProjects(projects: PortfolioProject[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects))
    } catch (e) {
      console.warn('Failed to save projects to localStorage:', e)
    }
  }

  addProject(project: PortfolioProject): PortfolioProject {
    const list = this.getProjects()
    const updated = [project, ...list]
    this.saveProjects(updated)
    return project
  }

  updateProject(id: string, updates: Partial<PortfolioProject>): PortfolioProject | null {
    const list = this.getProjects()
    const index = list.findIndex((p) => p.id === id)
    if (index === -1) return null
    list[index] = { ...list[index], ...updates }
    this.saveProjects(list)
    return list[index]
  }

  deleteProject(id: string): boolean {
    const list = this.getProjects()
    const filtered = list.filter((p) => p.id !== id)
    if (filtered.length !== list.length) {
      this.saveProjects(filtered)
      return true
    }
    return false
  }

  // ─── Blog Posts ───────────────────────────────────────────────────────────
  getBlogPosts(): BlogPost[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BLOGS)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Fallback
    }
    return initialBlogPosts
  }

  saveBlogPosts(posts: BlogPost[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(posts))
    } catch (e) {
      console.warn('Failed to save blog posts:', e)
    }
  }

  addBlogPost(post: BlogPost): BlogPost {
    const list = this.getBlogPosts()
    const updated = [post, ...list]
    this.saveBlogPosts(updated)
    return post
  }

  updateBlogPost(id: string, updates: Partial<BlogPost>): BlogPost | null {
    const list = this.getBlogPosts()
    const index = list.findIndex((b) => b.id === id)
    if (index === -1) return null
    list[index] = { ...list[index], ...updates }
    this.saveBlogPosts(list)
    return list[index]
  }

  deleteBlogPost(id: string): boolean {
    const list = this.getBlogPosts()
    const filtered = list.filter((b) => b.id !== id)
    if (filtered.length !== list.length) {
      this.saveBlogPosts(filtered)
      return true
    }
    return false
  }

  getBlogPostBySlug(slug: string): BlogPost | undefined {
    return this.getBlogPosts().find((b) => b.slug === slug)
  }

  // ─── Media Library ────────────────────────────────────────────────────────
  getMediaItems(): MediaItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.MEDIA)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Fallback
    }
    return DEFAULT_MEDIA_ITEMS
  }

  saveMediaItems(items: MediaItem[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.MEDIA, JSON.stringify(items))
    } catch (e) {
      console.warn('Failed to save media items:', e)
    }
  }

  addMediaItem(item: MediaItem): MediaItem {
    const list = this.getMediaItems()
    const updated = [item, ...list]
    this.saveMediaItems(updated)
    return item
  }

  deleteMediaItem(id: string): boolean {
    const list = this.getMediaItems()
    const filtered = list.filter((m) => m.id !== id)
    if (filtered.length !== list.length) {
      this.saveMediaItems(filtered)
      return true
    }
    return false
  }

  // ─── Enquiries ────────────────────────────────────────────────────────────
  getEnquiries(): ClientEnquiry[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ENQUIRIES)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // Fallback
    }
    return [
      {
        id: 'enquiry-sample-1',
        name: 'James Alexander',
        businessName: 'Mayfair Retail & Lifestyle',
        email: 'james@mayfairretail.co.uk',
        website: 'https://mayfairretail.co.uk',
        projectType: 'Video editing',
        budgetRange: '£2,000 – £5,000',
        description: 'Need commercial cutdowns and 9:16 vertical reels for our upcoming autumn showcase.',
        submittedAt: '2024-11-20 14:32',
        status: 'new',
      },
      {
        id: 'enquiry-sample-2',
        name: 'Sarah Jenkins',
        businessName: 'Sora Dining London',
        email: 'sarah@soradining.com',
        website: 'https://soradining.com',
        projectType: 'Complete branding project',
        budgetRange: '£5,000 – £15,000',
        description: 'Looking to rebrand our restaurant chain, produce 12 signature reels and develop a new website.',
        submittedAt: '2024-11-22 09:15',
        status: 'reviewed',
      },
    ]
  }

  addEnquiry(enquiryData: Omit<ClientEnquiry, 'id' | 'submittedAt' | 'status'>): ClientEnquiry {
    const newEnquiry: ClientEnquiry = {
      ...enquiryData,
      id: `enquiry-${Date.now()}`,
      submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      status: 'new',
    }
    const list = this.getEnquiries()
    const updated = [newEnquiry, ...list]
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated))
    } catch (e) {
      console.warn('Failed to save enquiry:', e)
    }
    return newEnquiry
  }

  updateEnquiryStatus(id: string, status: ClientEnquiry['status']) {
    const list = this.getEnquiries()
    const index = list.findIndex((e) => e.id === id)
    if (index !== -1) {
      list[index].status = status
      try {
        localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(list))
      } catch (e) {
        console.warn('Failed to save enquiry update:', e)
      }
    }
  }

  deleteEnquiry(id: string) {
    const list = this.getEnquiries()
    const filtered = list.filter((e) => e.id !== id)
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(filtered))
    } catch (e) {
      console.warn('Failed to delete enquiry:', e)
    }
  }

  // ─── Reset / Export ───────────────────────────────────────────────────────
  resetAllToDefaults() {
    localStorage.removeItem(STORAGE_KEYS.PROJECTS)
    localStorage.removeItem(STORAGE_KEYS.BLOGS)
    localStorage.removeItem(STORAGE_KEYS.MEDIA)
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES)
  }

  exportAllDataJson(): string {
    const data = {
      exportedAt: new Date().toISOString(),
      projects: this.getProjects(),
      blogs: this.getBlogPosts(),
      media: this.getMediaItems(),
      enquiries: this.getEnquiries(),
    }
    return JSON.stringify(data, null, 2)
  }
}

export const adminStorage = new AdminStorageService()
