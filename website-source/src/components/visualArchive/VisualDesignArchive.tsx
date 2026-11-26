import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Maximize2,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react'
import {
  visualArchiveItems,
  VISUAL_CATEGORIES,
  getArchiveItemsByCategory,
  type VisualCategory,
  type ArchiveItem,
} from '@data/visualDesignArchiveData.ts'
import { Container } from '@components/layout/Container.tsx'
import { Section } from '@components/layout/Section.tsx'
import { VisualLightbox } from './VisualLightbox.tsx'

export function VisualDesignArchive() {
  const [activeCategory, setActiveCategory] = useState<VisualCategory>('All Works')
  const [selectedItem, setSelectedItem] = useState<ArchiveItem | null>(null)

  const filteredItems = getArchiveItemsByCategory(activeCategory)

  // Asymmetric column span classes based on format
  const getItemColSpan = (item: ArchiveItem) => {
    if (item.format === 'square') {
      return 'col-span-12 sm:col-span-6 lg:col-span-4'
    } else if (item.format === 'landscape') {
      return 'col-span-12 sm:col-span-12 lg:col-span-8'
    } else {
      // Portrait 4:5
      return 'col-span-12 sm:col-span-6 lg:col-span-4'
    }
  }

  // Aspect ratio styling
  const getItemAspectRatio = (item: ArchiveItem) => {
    switch (item.aspectRatio) {
      case '1:1':
        return 'aspect-square'
      case '4:5':
        return 'aspect-[4/5]'
      case '16:9':
        return 'aspect-video'
      case '3:4':
      default:
        return 'aspect-[3/4]'
    }
  }

  return (
    <Section id="visual-design" className="border-b border-border/80 bg-background/50 relative overflow-hidden">
      {/* Subtle architectural ambient background glow */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-white/[0.02] rounded-full filter blur-[100px] pointer-events-none" />

      <Container>
        {/* ── Section Header: Digital Art Archive ──────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="w-2 h-2 bg-accent inline-block" />
              <span className="font-heading text-xs uppercase tracking-widest text-accent font-semibold">
                Curated Digital Art Archive
              </span>
            </div>
            <h2 className="font-heading text-display-md font-bold text-text-primary tracking-tight">
              Visual Design & Campaign Graphics
            </h2>
            <p className="mt-2.5 font-body text-body-md text-text-secondary max-w-2xl leading-relaxed">
              A dedicated archive of social media creatives, commercial advertisements, brand identity systems, and promotional posters. Preserved in their original aspect ratios and high-definition WebP formats.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="flex items-center gap-2 px-3 py-1.5 border border-border bg-surface font-mono text-xs text-text-secondary">
              <ShieldCheck size={14} className="text-accent" />
              <span>100% Client Work · Zero Stock</span>
            </div>
            <div className="font-mono text-xs text-text-secondary">
              <span className="text-accent font-bold">{filteredItems.length}</span> of {visualArchiveItems.length} Works
            </div>
          </div>
        </div>

        {/* ── Interactive Category Filtering Navigation ───────────────────── */}
        <div className="mt-8 flex items-center justify-start overflow-x-auto pb-4 pt-1 scrollbar-none border-b border-border/50">
          <nav
            role="tablist"
            aria-label="Visual design archive filter"
            className="flex items-center gap-2 sm:gap-3 flex-nowrap min-w-full sm:min-w-0"
          >
            {VISUAL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              const count = cat === 'All Works'
                ? visualArchiveItems.length
                : visualArchiveItems.filter((i) => i.category === cat || i.categories.includes(cat)).length

              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="archive-grid"
                  id={`archive-tab-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
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
                      layoutId="activeArchivePill"
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

        {/* ── Asymmetric Digital Art Archive Grid ─────────────────────────── */}
        <motion.div
          id="archive-grid"
          role="tabpanel"
          layout
          className="mt-10 grid grid-cols-12 gap-6 sm:gap-8 items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const colSpan = getItemColSpan(item)
              const aspectClass = getItemAspectRatio(item)

              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedItem(item)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Open artwork in lightbox: ${item.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedItem(item)
                    }
                  }}
                  className={`group relative flex flex-col justify-between border border-border bg-surface overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent ${colSpan}`}
                >
                  {/* ── Artwork Frame (Preserving Original Image Proportions) ── */}
                  <div
                    className={`relative w-full overflow-hidden bg-background/95 flex items-center justify-center border-b border-border select-none ${aspectClass}`}
                  >
                    {/* Subtle grid background texture */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-background via-surface/30 to-background/80" />

                    {/* High-Resolution Optimized WebP Asset */}
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />

                    {/* Gradient Overlay for Vignette Feel */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Editorial Index Badges */}
                    <div className="absolute inset-3 sm:inset-4 border border-border/30 pointer-events-none flex flex-col justify-between p-2 z-10">
                      <div className="flex justify-between items-start">
                        <span className="font-heading text-[10px] tracking-widest text-text-secondary uppercase bg-background/80 px-2 py-0.5 backdrop-blur-xs">
                          {item.deliverableType}
                        </span>
                        <span className="font-mono text-xs text-accent bg-background/80 px-2 py-0.5 backdrop-blur-xs">
                          [{item.year}]
                        </span>
                      </div>

                      <div className="flex justify-between items-end">
                        <span className="font-mono text-[10px] tracking-widest text-text-secondary/70 uppercase">
                          {item.dimensions}
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-text-secondary/70 uppercase">
                          {item.aspectRatio}
                        </span>
                      </div>
                    </div>

                    {/* Hover Expansion Cue */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                      <div className="w-12 h-12 rounded-full border border-accent bg-background/90 backdrop-blur-xs flex items-center justify-center text-accent shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                        <Maximize2 size={20} />
                      </div>
                    </div>
                  </div>

                  {/* ── Metadata & Objective Information Below Image ──────── */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-surface/70">
                    <div>
                      {/* Category & Client Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-heading text-[11px] uppercase tracking-wider text-accent font-semibold">
                          {item.category}
                        </span>
                        <span className="font-body text-xs text-text-secondary truncate max-w-[160px]">
                          {item.client}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="font-heading text-lg font-bold text-text-primary group-hover:text-accent transition-colors tracking-tight leading-snug">
                        {item.title}
                      </h3>

                      {/* Short explanation of creative objective */}
                      <p className="mt-2 font-body text-body-sm text-text-secondary leading-relaxed line-clamp-2">
                        {item.objective}
                      </p>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-5 pt-3.5 border-t border-border flex items-center justify-between">
                      <span className="font-mono text-[11px] text-text-secondary truncate max-w-[200px]">
                        {item.collection}
                      </span>

                      <div className="inline-flex items-center gap-1 font-heading text-xs text-accent uppercase tracking-wider font-semibold whitespace-nowrap group-hover:translate-x-0.5 transition-transform">
                        <span>Expand Artwork</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* ── Lightbox Component ───────────────────────────────────────────── */}
        <VisualLightbox
          item={selectedItem}
          items={filteredItems}
          onClose={() => setSelectedItem(null)}
          onSelectIndex={(newIdx) => setSelectedItem(filteredItems[newIdx])}
        />
      </Container>
    </Section>
  )
}
