import { useState, useEffect } from 'react'
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Download,
  X,
  Save,
} from 'lucide-react'
import { adminStorage } from '@services/adminStorage.ts'
import type { PortfolioProject, GalleryCategory } from '@data/projectsData.ts'

const CATEGORIES: GalleryCategory[] = [
  'All Work',
  'Video & Reels',
  'Graphic Design',
  'Advertising Campaigns',
  'Creative Strategy',
]

export function AdminProjects() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>('All Work')
  const [searchQuery, setSearchQuery] = useState('')
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  useEffect(() => {
    setProjects(adminStorage.getProjects())
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const filteredProjects = projects.filter((p) => {
    const matchesCat =
      selectedCategory === 'All Work' ||
      p.category === selectedCategory ||
      p.categories.includes(selectedCategory)
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  const handleCreateNew = () => {
    const newProj: PortfolioProject = {
      id: `project-${Date.now()}`,
      title: 'New Commercial Showcase',
      client: 'Client Name',
      industry: 'Industry Sector',
      category: 'Video & Reels',
      categories: ['Video & Reels'],
      thumbnail: '/portfolio/video-posters/thumbs/Blue Sapphire Game of Spades-poster.webp',
      poster: '/portfolio/video-posters/Blue Sapphire Game of Spades-poster.jpg',
      mediaType: 'video',
      mediaUrl: '/portfolio/videos/compressed/Blue Sapphire Game of Spades.mp4',
      aspectRatio: '9:16',
      videoOrientation: 'vertical',
      description: 'Project brief and narrative summary.',
      brief: 'Commercial client brief and deliverables scope.',
      projectObjective: 'Commercial targets and audience engagement goals.',
      creativeConcept: 'Visual concept, styling, and color grading direction.',
      myRole: 'Creative Direction, Video Editing, Sound Design & Color Grading.',
      deliverables: ['Commercial Master Film', 'Vertical Social Cutdowns', 'Bespoke Color Grade'],
      year: new Date().getFullYear().toString(),
      format: 'portrait',
      accentWord: 'Impact',
      visualTag: 'Commercial Project',
      featured: false,
    }
    setEditingProject(newProj)
    setIsModalOpen(true)
  }

  const handleEdit = (p: PortfolioProject) => {
    setEditingProject({ ...p })
    setIsModalOpen(true)
  }

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      adminStorage.deleteProject(id)
      setProjects(adminStorage.getProjects())
      showToast(`Project "${title}" removed.`)
    }
  }

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProject) return

    const existing = projects.find((p) => p.id === editingProject.id)
    if (existing) {
      adminStorage.updateProject(editingProject.id, editingProject)
      showToast(`Updated "${editingProject.title}"`)
    } else {
      adminStorage.addProject(editingProject)
      showToast(`Added new project "${editingProject.title}"`)
    }

    setProjects(adminStorage.getProjects())
    setIsModalOpen(false)
    setEditingProject(null)
  }

  const handleExportJson = () => {
    const json = JSON.stringify(projects, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `projectsData-export-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
    URL.revokeObjectURL(url)
    showToast('Downloaded projects JSON backup.')
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* ── Top Bar ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2E31] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading text-xs font-bold text-accent uppercase tracking-wider">
              Portfolio Content Manager
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-text-primary">
            Projects ({projects.length})
          </h2>
          <p className="font-body text-xs text-text-secondary mt-0.5">
            Organised across Video & Reels, Graphic Design, Advertising Campaigns, and Creative Strategy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#1A1D1F] border border-[#2F3438] text-xs text-text-secondary hover:text-text-primary transition-colors"
            title="Download JSON file"
          >
            <Download size={13} />
            <span>Export JSON</span>
          </button>

          <button
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 bg-accent text-background px-4 py-2 font-body text-xs font-semibold hover:bg-accent/90 transition-colors shadow-sm"
          >
            <Plus size={14} />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="p-3 bg-accent/15 border border-accent text-accent font-body text-xs">
          {toastMessage}
        </div>
      )}

      {/* ── Search & Filter Controls ───────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 border border-[#2A2E31] bg-[#16181A]">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 font-body text-xs transition-colors ${
                selectedCategory === cat
                  ? 'bg-accent text-background font-semibold'
                  : 'bg-[#111315] text-text-secondary hover:text-text-primary border border-[#262A2D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-2.5 text-text-secondary" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title or client..."
            className="w-full bg-[#111315] border border-[#262A2D] pl-8 pr-3 py-1.5 text-xs text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      {/* ── Projects Data Table ────────────────────────────────────────────── */}
      <div className="border border-[#2A2E31] bg-[#16181A] overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#2A2E31] bg-[#121415] text-text-secondary uppercase tracking-wider text-[11px]">
              <th className="p-3 w-16">Preview</th>
              <th className="p-3">Title & Client</th>
              <th className="p-3">Category</th>
              <th className="p-3">Media</th>
              <th className="p-3">Year</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#202326]">
            {filteredProjects.map((p) => (
              <tr key={p.id} className="hover:bg-[#1A1D1F] transition-colors group">
                {/* Thumbnail */}
                <td className="p-3">
                  <div className="w-12 h-14 bg-[#111315] border border-[#2A2E31] overflow-hidden relative">
                    <img
                      src={p.thumbnail}
                      alt={p.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>

                {/* Title & Client */}
                <td className="p-3">
                  <div className="font-heading font-bold text-text-primary text-sm group-hover:text-accent transition-colors">
                    {p.title}
                  </div>
                  <div className="font-body text-xs text-text-secondary mt-0.5">
                    {p.client} • {p.industry}
                  </div>
                </td>

                {/* Category */}
                <td className="p-3">
                  <span className="bg-[#111315] text-accent px-2 py-0.5 border border-[#2F3438] font-medium text-[11px]">
                    {p.category}
                  </span>
                </td>

                {/* Media Type */}
                <td className="p-3">
                  <span className="text-text-secondary uppercase tracking-wider text-[10px]">
                    {p.mediaType} ({p.aspectRatio || '9:16'})
                  </span>
                </td>

                {/* Year */}
                <td className="p-3 text-text-secondary">
                  {p.year}
                </td>

                {/* Actions */}
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-1.5 hover:bg-[#2A2E31] text-text-secondary hover:text-accent transition-colors"
                      title="Edit Project"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.title)}
                      className="p-1.5 hover:bg-red-500/20 text-text-secondary hover:text-red-400 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Add / Edit Project Modal ───────────────────────────────────────── */}
      {isModalOpen && editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <div
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#16181A] border border-[#2A2E31] shadow-2xl flex flex-col overflow-hidden z-10">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#2A2E31] bg-[#121415] flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-bold text-text-primary">
                  {projects.some((p) => p.id === editingProject.id)
                    ? 'Edit Project'
                    : 'Add New Project'}
                </h3>
                <span className="font-body text-xs text-text-secondary">
                  ID: {editingProject.id}
                </span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 border border-[#2A2E31] flex items-center justify-center text-text-secondary hover:text-text-primary"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Form */}
            <form onSubmit={handleSaveModal} className="p-6 overflow-y-auto space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-text-secondary uppercase tracking-wider block mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                    className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-secondary uppercase tracking-wider block mb-1">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.client}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, client: e.target.value })
                    }
                    className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-text-secondary uppercase tracking-wider block mb-1">
                    Industry Sector
                  </label>
                  <input
                    type="text"
                    value={editingProject.industry}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, industry: e.target.value })
                    }
                    className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-secondary uppercase tracking-wider block mb-1">
                    Primary Category *
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        category: e.target.value as GalleryCategory,
                        categories: [e.target.value as GalleryCategory],
                      })
                    }
                    className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Work').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-text-secondary uppercase tracking-wider block mb-1">
                    Media Type
                  </label>
                  <select
                    value={editingProject.mediaType}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        mediaType: e.target.value as 'video' | 'image',
                      })
                    }
                    className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                  >
                    <option value="video">Video (MP4)</option>
                    <option value="image">Image / Graphic Suite</option>
                  </select>
                </div>
              </div>

              {/* Media Paths */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-text-secondary uppercase tracking-wider block mb-1">
                    Thumbnail URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.thumbnail}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, thumbnail: e.target.value })
                    }
                    className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-text-secondary uppercase tracking-wider block mb-1">
                    Primary Video or Image URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.mediaUrl}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, mediaUrl: e.target.value })
                    }
                    className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-text-secondary uppercase tracking-wider block mb-1">
                  Project Description & Overview
                </label>
                <textarea
                  rows={3}
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, description: e.target.value })
                  }
                  className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                />
              </div>

              {/* Role & Contribution */}
              <div>
                <label className="text-text-secondary uppercase tracking-wider block mb-1">
                  My Contribution & Role
                </label>
                <input
                  type="text"
                  value={editingProject.myRole}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, myRole: e.target.value })
                  }
                  className="w-full bg-[#111315] border border-[#2E3337] px-3 py-2 text-text-primary focus:border-accent focus:outline-none"
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-[#2A2E31] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#2A2E31] text-text-secondary hover:text-text-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-accent text-background px-5 py-2 font-semibold hover:bg-accent/90"
                >
                  <Save size={14} />
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
