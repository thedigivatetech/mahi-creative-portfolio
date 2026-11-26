import { useState, useEffect } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Briefcase,
  Image as ImageIcon,
  FileText,
  Mail,
  Settings,
  Plus,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'
import { adminStorage } from '@services/adminStorage.ts'
import { AdminDashboard } from './AdminDashboard.tsx'
import { AdminProjects } from './AdminProjects.tsx'
import { AdminMediaLibrary } from './AdminMediaLibrary.tsx'
import { AdminBlog } from './AdminBlog.tsx'
import { AdminEnquiries } from './AdminEnquiries.tsx'
import { AdminSettings } from './AdminSettings.tsx'

export type AdminSection =
  | 'dashboard'
  | 'projects'
  | 'media'
  | 'blog'
  | 'enquiries'
  | 'settings'

export function AdminLayout() {
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [quickNewOpen, setQuickNewOpen] = useState(false)
  const [unreadEnquiries, setUnreadEnquiries] = useState(0)

  useEffect(() => {
    // Check unread enquiries
    const enquiries = adminStorage.getEnquiries()
    setUnreadEnquiries(enquiries.filter((e: { status: string }) => e.status === 'new').length)
  }, [activeSection])

  type MenuItem = {
    id: AdminSection
    label: string
    icon: React.ComponentType<{ size?: number; className?: string }>
    badge?: number
  }

  const menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects', label: 'Portfolio Projects', icon: Briefcase },
    { id: 'media', label: 'Media Library', icon: ImageIcon },
    { id: 'blog', label: 'Blog & Articles', icon: FileText },
    {
      id: 'enquiries',
      label: 'Client Enquiries',
      icon: Mail,
      badge: unreadEnquiries > 0 ? unreadEnquiries : undefined,
    },
    { id: 'settings', label: 'Settings & Export', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[#111315] text-[#F5F4EF] flex flex-col font-body selection:bg-accent selection:text-background">
      {/* ── WordPress-Style Top Admin Bar ──────────────────────────────────── */}
      <header className="h-12 bg-[#1A1D1F] border-b border-[#2A2E31] flex items-center justify-between px-4 z-40 sticky top-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-text-secondary hover:text-text-primary"
            aria-label="Toggle Navigation"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-none bg-accent flex items-center justify-center font-heading font-black text-xs text-background">
              M
            </span>
            <span className="font-heading font-bold text-sm tracking-wider uppercase text-text-primary hidden sm:inline">
              Mahi CMS
            </span>
            <span className="text-[11px] font-body bg-[#24282B] text-accent px-2 py-0.5 border border-[#33383D]">
              v2.4
            </span>
          </div>

          <div className="h-4 w-px bg-[#2A2E31] hidden sm:block" />

          {/* Visit Front-end Site Link */}
          <Link
            to="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-accent transition-colors"
          >
            <span>Visit Live Portfolio</span>
            <ExternalLink size={12} />
          </Link>

          {/* Quick New Dropdown */}
          <div className="relative">
            <button
              onClick={() => setQuickNewOpen(!quickNewOpen)}
              className="inline-flex items-center gap-1 text-xs bg-[#24282B] hover:bg-[#2C3135] text-text-primary px-2.5 py-1 border border-[#33383D] transition-colors"
            >
              <Plus size={13} className="text-accent" />
              <span>New</span>
            </button>

            {quickNewOpen && (
              <div
                className="absolute left-0 mt-1 w-44 bg-[#1A1D1F] border border-[#2A2E31] shadow-2xl py-1 z-50 text-xs"
                onMouseLeave={() => setQuickNewOpen(false)}
              >
                <button
                  onClick={() => {
                    setActiveSection('projects')
                    setQuickNewOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#24282B] hover:text-accent flex items-center gap-2"
                >
                  <Briefcase size={13} />
                  <span>New Portfolio Project</span>
                </button>
                <button
                  onClick={() => {
                    setActiveSection('blog')
                    setQuickNewOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#24282B] hover:text-accent flex items-center gap-2"
                >
                  <FileText size={13} />
                  <span>New Blog Article</span>
                </button>
                <button
                  onClick={() => {
                    setActiveSection('media')
                    setQuickNewOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#24282B] hover:text-accent flex items-center gap-2"
                >
                  <ImageIcon size={13} />
                  <span>Upload Media Asset</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right side user badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <img
              src="/images/profile/mahi-portrait.jpg"
              alt="Syed Hussain"
              className="w-6 h-6 rounded-full object-cover border border-accent/40"
            />
            <span className="hidden sm:inline font-heading font-medium text-text-primary">
              Mahi Hossain
            </span>
          </div>

          <Link
            to="/"
            className="text-xs text-text-secondary hover:text-accent flex items-center gap-1 ml-2"
            title="Exit Admin"
          >
            <LogOut size={14} />
            <span className="hidden md:inline">Exit</span>
          </Link>
        </div>
      </header>

      {/* ── Main CMS Container ─────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">
        {/* WordPress-Style Left Sidebar */}
        <aside
          className={`w-64 bg-[#16181A] border-r border-[#2A2E31] flex flex-col justify-between shrink-0 transition-all duration-300 z-30 ${
            sidebarOpen
              ? 'fixed inset-y-12 left-0 z-50 w-64'
              : 'hidden md:flex'
          }`}
        >
          {/* Main Navigation links */}
          <div className="py-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as AdminSection)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-background font-semibold border-l-4 border-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-[#1E2124]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={16} className={isActive ? 'text-background' : 'text-accent'} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-[10px] bg-accent text-background font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Quick System Info in sidebar footer */}
          <div className="p-4 border-t border-[#2A2E31] bg-[#121415] space-y-2">
            <div className="flex items-center justify-between text-[11px] text-text-secondary">
              <span>Local Storage</span>
              <span className="text-accent font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-text-secondary">
              <span>Total Projects</span>
              <span className="text-text-primary">{adminStorage.getProjects().length}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-text-secondary">
              <span>Articles</span>
              <span className="text-text-primary">{adminStorage.getBlogPosts().length}</span>
            </div>
          </div>
        </aside>

        {/* ── Content View Area ────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto bg-[#111315] p-4 sm:p-8 lg:p-10">
          {activeSection === 'dashboard' && (
            <AdminDashboard
              onNavigate={(section) => setActiveSection(section)}
            />
          )}

          {activeSection === 'projects' && <AdminProjects />}

          {activeSection === 'media' && <AdminMediaLibrary />}

          {activeSection === 'blog' && <AdminBlog />}

          {activeSection === 'enquiries' && (
            <AdminEnquiries onRefresh={() => setUnreadEnquiries(0)} />
          )}

          {activeSection === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  )
}
