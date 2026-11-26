import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Film, Play } from 'lucide-react'
import type { PortfolioProject } from '@data/projectsData.ts'
import { Tag } from '@components/ui/Tag.tsx'

interface GalleryCardProps {
  project: PortfolioProject
  index: number
  onSelect: (project: PortfolioProject) => void
}

export function GalleryCard({ project, index, onSelect }: GalleryCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const reduced = useReducedMotion()

  // Asymmetric column span classes based on format and grid rhythm
  const getColSpan = () => {
    switch (project.format) {
      case 'wide':
        return 'col-span-12 lg:col-span-8'
      case 'square':
        return 'col-span-12 sm:col-span-6 lg:col-span-6'
      case 'tall':
        return 'col-span-12 sm:col-span-6 lg:col-span-4'
      case 'portrait':
      default:
        return 'col-span-12 sm:col-span-6 lg:col-span-4'
    }
  }

  // Asymmetric aspect ratio classes
  const getAspectRatio = () => {
    switch (project.format) {
      case 'wide':
        return 'aspect-video sm:aspect-[16/9]'
      case 'square':
        return 'aspect-square'
      case 'tall':
        return 'aspect-[4/5] sm:aspect-[9/14]'
      case 'portrait':
      default:
        return 'aspect-[4/5]'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(project)
    }
  }

  // Descriptive alt text for accessibility & SEO
  const altText = project.mediaType === 'video'
    ? `${project.title} — ${project.visualTag} preview thumbnail`
    : `${project.title} — ${project.category} creative work thumbnail`

  // Effective thumbnail: prioritize lightweight WebP thumbnail, fallback to poster or hero image
  const displayThumbnail = imgError
    ? project.fallbackThumbnail || project.poster || project.mediaUrl
    : project.thumbnail || project.poster || project.mediaUrl

  return (
    <motion.div
      layout
      initial={!reduced ? { opacity: 0, y: 24 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={!reduced ? { opacity: 0, scale: 0.96 } : undefined}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: !reduced ? index * 0.05 : 0 }}
      whileHover={!reduced ? { y: -4, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } : undefined}
      whileTap={!reduced ? { scale: 0.98 } : undefined}
      className={`group relative flex flex-col justify-between border border-border bg-surface overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent ${getColSpan()}`}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View case breakdown: ${project.title}`}
    >
      {/* ── Media Frame with Attractive Static Thumbnail ── */}
      <div
        className={`relative overflow-hidden bg-background/95 flex items-center justify-center border-b border-border select-none ${getAspectRatio()}`}
      >
        {/* Subtle grid background texture */}
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-surface/30 to-background/80" />

        {/* Static Optimized Image Thumbnail (Lazy Loaded with native loading="lazy") */}
        <img
          src={displayThumbnail}
          alt={altText}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImgError(true)}
          className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            imageLoaded ? 'opacity-90' : 'opacity-0'
          } group-hover:scale-105 group-hover:opacity-100`}
        />

        {/* Ambient Dark Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-85 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Crosshair Frame & Editorial Badges */}
        <div className="absolute inset-3 sm:inset-4 border border-border/40 pointer-events-none flex flex-col justify-between p-2.5 z-10">
          <div className="flex justify-between items-start">
            <span className="font-heading text-[11px] tracking-widest text-text-secondary uppercase bg-background/70 px-2 py-0.5 backdrop-blur-xs">
              {project.visualTag}
            </span>
            <span className="font-mono text-xs text-accent bg-background/70 px-2 py-0.5 backdrop-blur-xs">
              [{project.year}]
            </span>
          </div>

          <div className="flex justify-between items-end">
            <span className="font-mono text-[10px] tracking-widest text-text-secondary/70 uppercase">
              INDEX 0{index + 1}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-text-secondary/70 uppercase">
              {project.aspectRatio || '1:1'}
            </span>
          </div>
        </div>

        {/* Central Play Badge for Video Projects */}
        {project.mediaType === 'video' && (
          <div className="relative z-20 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-accent bg-background/80 backdrop-blur-xs flex items-center justify-center text-accent shadow-xl group-hover:bg-accent group-hover:text-background transition-colors">
              <Play size={24} fill="currentColor" className="ml-0.5" />
            </div>
            <span className="mt-2 font-mono text-[10px] text-accent uppercase tracking-widest bg-background/90 px-2.5 py-0.5 border border-border">
              Featured Video
            </span>
          </div>
        )}

        {/* Image Suite Badge for Graphic/Campaign Projects */}
        {project.mediaType === 'image' && (
          <div className="relative z-20 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
            <div className="w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-xs flex items-center justify-center text-text-secondary group-hover:text-accent group-hover:border-accent transition-colors">
              <Film size={20} />
            </div>
            <span className="mt-2 font-mono text-[10px] text-text-secondary uppercase tracking-widest bg-background/90 px-2.5 py-0.5 border border-border">
              {project.gallery?.length || 1} Assets
            </span>
          </div>
        )}
      </div>

      {/* ── Metadata and Scope Information Below Media ── */}
      <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between bg-surface/60">
        <div>
          {/* Category & Client Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <Tag>{project.category}</Tag>
            <span className="font-body text-xs text-text-secondary truncate max-w-[180px]">
              {project.client}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary group-hover:text-accent transition-colors tracking-tight leading-snug">
            {project.title}
          </h3>

          {/* Project Description Alongside Media */}
          <p className="mt-2.5 font-body text-body-sm text-text-secondary leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Deliverables Scope Taglist & Action Trigger */}
        <div className="mt-5 pt-4 border-t border-border flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-6">
            {project.deliverables.slice(0, 2).map((deliv) => (
              <span
                key={deliv}
                className="font-body text-[11px] text-text-secondary bg-background px-2 py-0.5 border border-border truncate max-w-[140px]"
              >
                {deliv}
              </span>
            ))}
            {project.deliverables.length > 2 && (
              <span className="font-body text-[11px] text-accent bg-background px-1.5 py-0.5 border border-border">
                +{project.deliverables.length - 2}
              </span>
            )}
          </div>

          <div className="inline-flex items-center gap-1 font-heading text-xs text-accent uppercase tracking-wider font-semibold whitespace-nowrap group-hover:translate-x-0.5 transition-transform">
            <span>Explore</span>
            <span>↗</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
