import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import {
  portfolioProjects,
  GALLERY_CATEGORIES,
  getProjectsByCategory,
  getProjectById,
  getCategoryCounts,
  type GalleryCategory,
  type PortfolioProject,
} from '@data/projectsData.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { GalleryCard } from './GalleryCard.tsx'
import { ProjectDetailModal } from './ProjectDetailModal.tsx'

export function InteractiveGallery() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All Work')
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)

  const counts = getCategoryCounts()
  const filteredProjects = getProjectsByCategory(activeCategory)

  // URL query parameter synchronization (e.g. ?project=beautyworld-dubai)
  useEffect(() => {
    const projectIdFromUrl = searchParams.get('project')
    if (projectIdFromUrl) {
      const match = getProjectById(projectIdFromUrl)
      if (match) {
        setSelectedProject(match)
      }
    }
  }, [searchParams])

  const handleSelectProject = (project: PortfolioProject) => {
    setSelectedProject(project)
    setSearchParams((prev) => {
      prev.set('project', project.id)
      return prev
    }, { replace: true })
  }

  const handleCloseModal = () => {
    setSelectedProject(null)
    setSearchParams((prev) => {
      prev.delete('project')
      return prev
    }, { replace: true })
  }

  return (
    <Section id="work" className="border-b border-border/80">
      <Container>
        {/* ── Section Header ──────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-accent inline-block" />
              <span className="font-heading text-xs uppercase tracking-widest text-accent font-semibold">
                Portfolio Gallery — 2024
              </span>
            </div>
            <h2 className="font-heading text-display-md font-bold text-text-primary tracking-tight">
              Selected Works & Case Studies
            </h2>
            <p className="mt-2 font-body text-body-md text-text-secondary max-w-2xl leading-relaxed">
              An asymmetric editorial collection of commercial reels, advertising campaigns, graphic systems, and creative direction executed for UK and global clients.
            </p>
          </div>

          <div className="font-mono text-xs text-text-secondary self-start md:self-end">
            <span className="text-accent font-bold">{filteredProjects.length}</span> of {portfolioProjects.length} Projects Loaded
          </div>
        </div>

        {/* ── Animated Category Filter Navigation ─────────────────────────── */}
        <div className="mt-8 flex items-center justify-start overflow-x-auto pb-4 pt-1 scrollbar-none border-b border-border/50">
          <nav
            role="tablist"
            aria-label="Portfolio category filter"
            className="flex items-center gap-2 sm:gap-3 flex-nowrap min-w-full sm:min-w-0"
          >
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              const count = counts[cat] || 0

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="gallery-grid"
                  id={`tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative isolate px-4 py-2 text-xs uppercase tracking-wider font-heading transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2 border select-none ${
                    isActive
                      ? 'text-background font-bold border-accent shadow-sm'
                      : 'text-text-secondary hover:text-text-primary border-border bg-surface/50 hover:border-text-secondary'
                  }`}
                >
                  {/* Active Animated Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-accent -z-1"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                  <span
                    className={`relative z-10 font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-background/25 text-background font-bold'
                        : 'bg-background text-text-secondary'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* ── Asymmetric Editorial Work Grid ───────────────────────────────── */}
        <motion.div
          id="gallery-grid"
          role="tabpanel"
          layout
          className="mt-10 grid grid-cols-12 gap-6 sm:gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <GalleryCard
                key={project.id}
                project={project}
                index={index}
                onSelect={handleSelectProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Guard */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center border border-border mt-8 bg-surface/40">
            <span className="font-heading text-xs uppercase tracking-widest text-accent mb-2 block">
              Filtered Category
            </span>
            <h3 className="font-heading text-xl font-bold text-text-primary">
              No Projects Under This Filter
            </h3>
            <p className="mt-2 text-sm text-text-secondary max-w-sm mx-auto">
              Select another category above to view verified creative work.
            </p>
          </div>
        )}

        {/* ── Project Detail Modal Experience ─────────────────────────────── */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={handleCloseModal}
          onSelectProject={handleSelectProject}
        />
      </Container>
    </Section>
  )
}
