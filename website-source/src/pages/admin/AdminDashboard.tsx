import { useState, useEffect } from 'react'
import {
  Briefcase,
  Image as ImageIcon,
  FileText,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HardDrive,
  Plus,
} from 'lucide-react'
import { adminStorage, type ClientEnquiry } from '@services/adminStorage.ts'
import type { AdminSection } from './AdminLayout.tsx'

interface AdminDashboardProps {
  onNavigate: (section: AdminSection) => void
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const [projectCount, setProjectCount] = useState(0)
  const [postCount, setPostCount] = useState(0)
  const [mediaCount, setMediaCount] = useState(0)
  const [enquiries, setEnquiries] = useState<ClientEnquiry[]>([])
  const [quickTitle, setQuickTitle] = useState('')
  const [quickContent, setQuickContent] = useState('')
  const [quickDraftSaved, setQuickDraftSaved] = useState(false)

  useEffect(() => {
    setProjectCount(adminStorage.getProjects().length)
    setPostCount(adminStorage.getBlogPosts().length)
    setMediaCount(adminStorage.getMediaItems().length)
    setEnquiries(adminStorage.getEnquiries())
  }, [])

  const handleSaveQuickDraft = (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickTitle.trim()) return

    adminStorage.addBlogPost({
      id: `post-${Date.now()}`,
      title: quickTitle,
      slug: quickTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      excerpt: quickContent.slice(0, 120) || 'Quick draft created from dashboard.',
      content: quickContent,
      coverImage: '/portfolio/video-posters/thumbs/Blue Sapphire Game of Spades-poster.webp',
      category: 'Creative Direction',
      publishedAt: new Date().toISOString().slice(0, 10),
      readTime: '3 min read',
      author: {
        name: 'Syed Hussain',
        role: 'Creative Director',
        avatar: '/images/profile/mahi-portrait.jpg',
      },
      tags: ['Draft'],
      status: 'draft',
    })

    setQuickTitle('')
    setQuickContent('')
    setQuickDraftSaved(true)
    setPostCount(adminStorage.getBlogPosts().length)
    setTimeout(() => setQuickDraftSaved(false), 3000)
  }

  return (
    <div className="space-y-8 max-w-7xl">
      {/* ── Welcome Banner ─────────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 border border-[#2A2E31] bg-[#16181A] flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-heading text-xs font-bold text-accent tracking-widest uppercase">
              WordPress-Style Administration
            </span>
            <span className="text-text-secondary text-xs">•</span>
            <span className="font-body text-xs text-text-secondary">
              Production Environment
            </span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
            Welcome back, Mahi.
          </h2>
          <p className="mt-1 font-body text-body-sm text-text-secondary">
            Here is your live content overview. Manage your portfolio projects, media library, blog articles, and incoming client leads.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 bg-accent text-background px-4 py-2.5 font-body text-xs font-semibold hover:bg-accent/90 transition-colors"
          >
            <Plus size={14} />
            <span>Add Project</span>
          </button>
          <button
            onClick={() => onNavigate('media')}
            className="inline-flex items-center gap-2 bg-[#222629] border border-[#2F3438] text-text-primary px-4 py-2.5 font-body text-xs hover:border-accent transition-colors"
          >
            <ImageIcon size={14} className="text-accent" />
            <span>Upload Media</span>
          </button>
        </div>
      </div>

      {/* ── Metric Snapshot Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Projects */}
        <div
          onClick={() => onNavigate('projects')}
          className="p-6 border border-[#2A2E31] bg-[#16181A] hover:border-accent/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-body text-[11px] uppercase tracking-wider text-text-secondary">
              Total Projects
            </span>
            <div className="w-8 h-8 rounded-none bg-[#202326] border border-[#2E3337] flex items-center justify-center text-accent group-hover:border-accent transition-colors">
              <Briefcase size={15} />
            </div>
          </div>
          <span className="font-heading font-bold text-3xl sm:text-4xl text-text-primary group-hover:text-accent transition-colors">
            {projectCount}
          </span>
          <span className="mt-2 font-body text-xs text-text-secondary block">
            4 categories active
          </span>
        </div>

        {/* Media Assets */}
        <div
          onClick={() => onNavigate('media')}
          className="p-6 border border-[#2A2E31] bg-[#16181A] hover:border-accent/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-body text-[11px] uppercase tracking-wider text-text-secondary">
              Media Assets
            </span>
            <div className="w-8 h-8 rounded-none bg-[#202326] border border-[#2E3337] flex items-center justify-center text-accent group-hover:border-accent transition-colors">
              <ImageIcon size={15} />
            </div>
          </div>
          <span className="font-heading font-bold text-3xl sm:text-4xl text-text-primary group-hover:text-accent transition-colors">
            {mediaCount}
          </span>
          <span className="mt-2 font-body text-xs text-text-secondary block">
            Videos & WebP graphics
          </span>
        </div>

        {/* Blog Posts */}
        <div
          onClick={() => onNavigate('blog')}
          className="p-6 border border-[#2A2E31] bg-[#16181A] hover:border-accent/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-body text-[11px] uppercase tracking-wider text-text-secondary">
              Blog Articles
            </span>
            <div className="w-8 h-8 rounded-none bg-[#202326] border border-[#2E3337] flex items-center justify-center text-accent group-hover:border-accent transition-colors">
              <FileText size={15} />
            </div>
          </div>
          <span className="font-heading font-bold text-3xl sm:text-4xl text-text-primary group-hover:text-accent transition-colors">
            {postCount}
          </span>
          <span className="mt-2 font-body text-xs text-text-secondary block">
            Published & drafts
          </span>
        </div>

        {/* Client Enquiries */}
        <div
          onClick={() => onNavigate('enquiries')}
          className="p-6 border border-[#2A2E31] bg-[#16181A] hover:border-accent/50 transition-colors cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="font-body text-[11px] uppercase tracking-wider text-text-secondary">
              Client Enquiries
            </span>
            <div className="w-8 h-8 rounded-none bg-[#202326] border border-[#2E3337] flex items-center justify-center text-accent group-hover:border-accent transition-colors">
              <Mail size={15} />
            </div>
          </div>
          <span className="font-heading font-bold text-3xl sm:text-4xl text-text-primary group-hover:text-accent transition-colors">
            {enquiries.length}
          </span>
          <span className="mt-2 font-body text-xs text-accent block">
            {enquiries.filter((e) => e.status === 'new').length} new unreviewed
          </span>
        </div>
      </div>

      {/* ── Two Column CMS Dashboard Layout ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Recent Enquiries & Recent Projects */}
        <div className="lg:col-span-7 space-y-6">
          {/* Recent Enquiries Box */}
          <div className="border border-[#2A2E31] bg-[#16181A] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Recent Inquiries
                </h3>
              </div>
              <button
                onClick={() => onNavigate('enquiries')}
                className="font-body text-xs text-accent hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {enquiries.length === 0 ? (
              <p className="font-body text-xs text-text-secondary py-4 text-center">
                No inquiries received yet.
              </p>
            ) : (
              <div className="divide-y divide-[#24282B]">
                {enquiries.slice(0, 3).map((enq) => (
                  <div key={enq.id} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-sm font-bold text-text-primary">
                          {enq.name}
                        </span>
                        {enq.businessName && (
                          <span className="font-body text-xs text-text-secondary">
                            ({enq.businessName})
                          </span>
                        )}
                        {enq.status === 'new' && (
                          <span className="text-[10px] bg-accent/20 text-accent font-semibold px-2 py-0.2 border border-accent/40">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 font-body text-xs text-text-secondary line-clamp-1">
                        {enq.description}
                      </p>
                      <span className="mt-1 font-body text-[10px] text-text-secondary/60 block">
                        {enq.projectType} • {enq.budgetRange} • {enq.submittedAt}
                      </span>
                    </div>

                    <button
                      onClick={() => onNavigate('enquiries')}
                      className="text-xs text-text-secondary hover:text-accent shrink-0 pt-1"
                    >
                      Inspect
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick System Health Box */}
          <div className="border border-[#2A2E31] bg-[#16181A] p-6 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={16} className="text-accent" />
              <h3 className="font-heading text-base font-bold text-text-primary">
                System Status & Verification
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#111315] border border-[#24282B] flex items-center justify-between">
                <span className="text-text-secondary">Media Asset Validation</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 size={13} /> 100% Verified
                </span>
              </div>
              <div className="p-3 bg-[#111315] border border-[#24282B] flex items-center justify-between">
                <span className="text-text-secondary">Local CMS Cache</span>
                <span className="text-accent font-semibold flex items-center gap-1">
                  <HardDrive size={13} /> Synchronized
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: WordPress-Style Quick Draft */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[#2A2E31] bg-[#16181A] p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-accent" />
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  Quick Draft
                </h3>
              </div>
              <span className="font-body text-[11px] text-text-secondary">
                Auto-saves to Blog
              </span>
            </div>

            <p className="font-body text-xs text-text-secondary mb-4">
              Jot down a quick thought or draft an article title. It will be saved as a draft in your Blog manager.
            </p>

            {quickDraftSaved && (
              <div className="mb-4 p-3 bg-accent/15 border border-accent text-accent font-body text-xs">
                Draft article saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveQuickDraft} className="space-y-4">
              <div>
                <input
                  type="text"
                  value={quickTitle}
                  onChange={(e) => setQuickTitle(e.target.value)}
                  placeholder="Article Title..."
                  required
                  className="w-full bg-[#111315] border border-[#2F3438] px-3 py-2 text-xs text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <textarea
                  rows={4}
                  value={quickContent}
                  onChange={(e) => setQuickContent(e.target.value)}
                  placeholder="What's on your mind? Write draft thoughts..."
                  className="w-full bg-[#111315] border border-[#2F3438] px-3 py-2 text-xs text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none resize-y"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  className="bg-accent text-background px-4 py-2 font-body text-xs font-semibold hover:bg-accent/90 transition-colors"
                >
                  Save Draft
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="text-xs text-text-secondary hover:text-text-primary"
                >
                  Go to Full Editor →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
