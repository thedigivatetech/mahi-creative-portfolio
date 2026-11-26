import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Target,
  Lightbulb,
  CheckCircle2,
  Share2,
  ExternalLink,
} from 'lucide-react'
import type { PortfolioProject } from '@data/projectsData.ts'
import { getRelatedProjects } from '@data/projectsData.ts'
import { Tag } from '@components/ui/Tag.tsx'
import { VideoPlayerWithControls } from './VideoPlayerWithControls.tsx'
import { ImageGalleryViewer } from './ImageGalleryViewer.tsx'
import { InstagramIcon, TikTokIcon } from '@components/ui/SocialIcons.tsx'

interface ProjectDetailModalProps {
  project: PortfolioProject | null
  onClose: () => void
  onSelectProject: (project: PortfolioProject) => void
}

export function ProjectDetailModal({
  project,
  onClose,
  onSelectProject,
}: ProjectDetailModalProps) {
  const modalContentRef = useRef<HTMLDivElement>(null)

  // Trap Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (project) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  const relatedProjects = getRelatedProjects(project, 3)

  const handleShare = () => {
    const url = `${window.location.origin}/work/${project.id}`
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      alert('Project link copied to clipboard!')
    }
  }

  const isVertical = project.videoOrientation === 'vertical' || project.aspectRatio === '9:16'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-project-title"
      >
        <motion.div
          ref={modalContentRef}
          initial={{ scale: 0.95, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.95, y: 20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-surface border border-border w-full max-w-5xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto"
        >
          {/* ── Sticky Modal Header ─────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-border bg-surface/95 backdrop-blur-xs z-30">
            <div className="flex items-center gap-3">
              <span className="font-heading text-xs tracking-widest uppercase text-accent font-semibold">
                Featured Case Study
              </span>
              <span className="text-border">/</span>
              <span className="font-body text-xs text-text-secondary truncate max-w-[200px] sm:max-w-xs">
                {project.client}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 text-text-secondary hover:text-text-primary border border-border hover:border-accent transition-colors flex items-center gap-1 text-xs cursor-pointer"
                title="Share project link"
              >
                <Share2 size={14} />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={onClose}
                className="p-2 text-text-secondary hover:text-text-primary border border-border hover:border-error transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
                <span className="hidden sm:inline">ESC</span>
              </button>
            </div>
          </div>

          {/* ── Scrollable Body ─────────────────────────────────────────────── */}
          <div className="overflow-y-auto flex-1 p-5 sm:p-8 space-y-10 focus:outline-none">
            {/* Project Title & Key Metadata Hero */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Tag>{project.category}</Tag>
                <span className="font-body text-xs text-text-secondary bg-background px-2.5 py-1 border border-border">
                  {project.industry}
                </span>
                <span className="font-heading text-xs text-accent bg-background px-2 py-1 border border-border">
                  [{project.year}]
                </span>
                {project.aspectRatio && (
                  <span className="font-mono text-xs text-text-secondary bg-background px-2 py-1 border border-border">
                    {project.aspectRatio} {isVertical ? 'Reel' : 'Format'}
                  </span>
                )}
              </div>

              <h2
                id="modal-project-title"
                className="font-heading text-2xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight"
              >
                {project.title}
              </h2>

              {/* Project Description alongside Presentation */}
              <p className="mt-3 font-body text-body-lg text-text-secondary max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* ── Final Video or Image Gallery Presentation ───────────────── */}
            <div className="border border-border bg-background/50 overflow-hidden">
              <div className="px-4 py-2.5 bg-background border-b border-border flex items-center justify-between">
                <span className="font-heading text-xs uppercase tracking-wider text-text-secondary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  Primary Media Presentation
                </span>
                <span className="font-mono text-xs text-accent">
                  {project.mediaType === 'video'
                    ? isVertical
                      ? '9:16 Vertical Reel Player'
                      : '16:9 Cinema Player'
                    : `${project.gallery?.length || 1} Creative Assets`}
                </span>
              </div>

              {project.mediaType === 'video' ? (
                <div className="max-h-[72vh] flex items-center justify-center bg-black/98 p-2 sm:p-4" onClick={(e) => e.stopPropagation()}>
                  <VideoPlayerWithControls
                    src={project.mediaUrl}
                    poster={project.poster || project.thumbnail}
                    fallbackThumbnail={project.fallbackThumbnail || project.thumbnail}
                    title={project.title}
                    autoPlay={false}
                    aspectRatio={project.aspectRatio || '9:16'}
                    videoOrientation={project.videoOrientation || 'vertical'}
                    className="w-full"
                  />
                </div>
              ) : (
                <ImageGalleryViewer
                  images={project.gallery && project.gallery.length > 0 ? project.gallery : [project.mediaUrl]}
                  title={project.title}
                />
              )}
            </div>

            {/* ── Optional External Social Links (Instagram / TikTok) ─────── */}
            {project.socialLinks && project.socialLinks.length > 0 && (
              <div className="p-5 border border-border bg-surface/50 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-text-primary font-heading text-xs uppercase tracking-wider">
                  <span className="w-2 h-2 bg-accent inline-block" />
                  <span>Original Campaign Release Channels</span>
                </div>
                <div className="flex items-center gap-3">
                  {project.socialLinks.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-border bg-background font-body text-xs text-text-secondary hover:text-text-primary hover:border-accent transition-colors"
                    >
                      {s.platform === 'instagram' && <InstagramIcon size={14} className="text-accent" />}
                      {s.platform === 'tiktok' && <TikTokIcon size={14} className="text-accent" />}
                      {s.platform === 'website' && <ExternalLink size={14} className="text-accent" />}
                      <span>{s.label || `View on ${s.platform}`}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* ── Verified Results (If Available) ─────────────────────────── */}
            {project.verifiedResults && project.verifiedResults.length > 0 && (
              <div className="p-6 border border-accent/30 bg-accent/5">
                <div className="flex items-center gap-2 text-accent mb-4">
                  <TrendingUp size={18} />
                  <span className="font-heading text-sm uppercase tracking-wider font-semibold">
                    Verified Performance Results
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.verifiedResults.map((res, i) => (
                    <div
                      key={i}
                      className="p-4 bg-background border border-border flex flex-col justify-between"
                    >
                      <span className="font-heading text-stat text-accent font-bold">
                        {res.metric}
                      </span>
                      <div className="mt-1">
                        <span className="font-body text-body-sm font-semibold text-text-primary block">
                          {res.label}
                        </span>
                        {res.context && (
                          <span className="font-body text-xs text-text-secondary mt-0.5 block">
                            {res.context}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── 4-Pillar Strategic Breakdown Grid ───────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Brief */}
              <div className="p-6 border border-border bg-background/60">
                <div className="flex items-center gap-2 text-text-secondary mb-2">
                  <Briefcase size={16} className="text-accent" />
                  <span className="font-heading text-xs uppercase tracking-widest font-semibold">
                    The Brief
                  </span>
                </div>
                <p className="font-body text-body-sm text-text-primary/90 leading-relaxed">
                  {project.brief}
                </p>
              </div>

              {/* Objective */}
              <div className="p-6 border border-border bg-background/60">
                <div className="flex items-center gap-2 text-text-secondary mb-2">
                  <Target size={16} className="text-accent" />
                  <span className="font-heading text-xs uppercase tracking-widest font-semibold">
                    Strategic Objective
                  </span>
                </div>
                <p className="font-body text-body-sm text-text-primary/90 leading-relaxed">
                  {project.projectObjective}
                </p>
              </div>

              {/* Creative Concept */}
              <div className="p-6 border border-border bg-background/60">
                <div className="flex items-center gap-2 text-text-secondary mb-2">
                  <Lightbulb size={16} className="text-accent" />
                  <span className="font-heading text-xs uppercase tracking-widest font-semibold">
                    Creative Concept
                  </span>
                </div>
                <p className="font-body text-body-sm text-text-primary/90 leading-relaxed">
                  {project.creativeConcept}
                </p>
              </div>

              {/* My Contribution */}
              <div className="p-6 border border-border bg-background/60">
                <div className="flex items-center gap-2 text-text-secondary mb-2">
                  <CheckCircle2 size={16} className="text-accent" />
                  <span className="font-heading text-xs uppercase tracking-widest font-semibold">
                    My Contribution
                  </span>
                </div>
                <p className="font-body text-body-sm text-text-primary/90 leading-relaxed">
                  {project.myRole}
                </p>
              </div>
            </div>

            {/* ── Deliverables Scope List ──────────────────────────────────── */}
            <div className="p-6 border border-border bg-background/30">
              <span className="font-heading text-xs uppercase tracking-wider text-text-secondary block mb-3">
                Complete Deliverables Scope
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.deliverables.map((deliv) => (
                  <div
                    key={deliv}
                    className="flex items-center gap-2.5 text-body-sm text-text-primary bg-background px-3.5 py-2 border border-border"
                  >
                    <span className="w-1.5 h-1.5 bg-accent flex-shrink-0" />
                    <span>{deliv}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── External Links & Discussion CTA ─────────────────────────── */}
            <div className="p-6 border border-border bg-gradient-to-r from-surface to-background flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-heading text-xs uppercase tracking-wider text-accent font-semibold block mb-1">
                  Commission Similar Work
                </span>
                <p className="font-body text-body-sm text-text-secondary">
                  Ready to produce high-impact visuals for {project.client || 'your brand'}?
                </p>
              </div>
              <div className="flex items-center gap-3">
                {project.externalLinks?.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    onClick={() => link.url.startsWith('#') && onClose()}
                    className="px-4 py-2.5 border border-accent bg-accent text-background font-body text-body-sm font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={14} />
                  </a>
                ))}
                {!project.externalLinks && (
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="px-4 py-2.5 border border-accent bg-accent text-background font-body text-body-sm font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
                  >
                    <span>Inquire About Video Production</span>
                    <ArrowRight size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* ── Related Projects Section ─────────────────────────────────── */}
            {relatedProjects.length > 0 && (
              <div className="pt-8 border-t border-border">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-xs uppercase tracking-widest text-text-secondary font-semibold">
                    Related Projects In {project.category}
                  </span>
                  <span className="font-mono text-xs text-text-secondary">
                    {relatedProjects.length} Recommendations
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProjects.map((rel) => (
                    <div
                      key={rel.id}
                      onClick={() => onSelectProject(rel)}
                      className="group border border-border bg-background/80 p-4 hover:border-accent/60 transition-colors cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <span className="font-body text-[10px] uppercase tracking-wider text-accent block mb-1">
                          {rel.client}
                        </span>
                        <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
                          {rel.title}
                        </h3>
                        <p className="mt-1 font-body text-xs text-text-secondary line-clamp-2">
                          {rel.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-text-secondary group-hover:text-text-primary">
                        <span>{rel.year}</span>
                        <span className="text-accent">Switch Project →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
