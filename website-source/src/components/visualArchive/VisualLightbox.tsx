import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Info,
} from 'lucide-react'
import type { ArchiveItem } from '@data/visualDesignArchiveData.ts'

interface VisualLightboxProps {
  item: ArchiveItem | null
  items: ArchiveItem[]
  onClose: () => void
  onSelectIndex: (index: number) => void
}

export function VisualLightbox({
  item,
  items,
  onClose,
  onSelectIndex,
}: VisualLightboxProps) {
  const [showMetadata, setShowMetadata] = useState(true)
  const [isZoomed, setIsZoomed] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1

  // Handle keyboard navigation (Escape, Left, Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectIndex(currentIndex - 1)
        setImageLoaded(false)
        setIsZoomed(false)
      } else if (e.key === 'ArrowRight' && currentIndex < items.length - 1) {
        onSelectIndex(currentIndex + 1)
        setImageLoaded(false)
        setIsZoomed(false)
      } else if (e.key === 'i' || e.key === 'I') {
        setShowMetadata((prev) => !prev)
      }
    }

    if (item) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [item, currentIndex, items.length, onClose, onSelectIndex])

  if (!item) return null

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex > 0) {
      onSelectIndex(currentIndex - 1)
      setImageLoaded(false)
      setIsZoomed(false)
    }
  }

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (currentIndex < items.length - 1) {
      onSelectIndex(currentIndex + 1)
      setImageLoaded(false)
      setIsZoomed(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/96 backdrop-blur-md flex flex-col justify-between overflow-hidden select-none"
        role="dialog"
        aria-modal="true"
        aria-label={`Expanded Artwork: ${item.title}`}
      >
        {/* ── Top Control Bar ──────────────────────────────────────────────── */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative z-30 px-5 sm:px-8 py-4 bg-background/80 backdrop-blur-md border-b border-border/60 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <span className="font-heading text-xs tracking-widest uppercase text-accent font-semibold">
              Digital Art Archive
            </span>
            <span className="text-border">/</span>
            <span className="font-mono text-xs text-text-secondary">
              Asset {currentIndex + 1} of {items.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMetadata((prev) => !prev)}
              className={`p-2 border transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer ${
                showMetadata
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-text-secondary hover:text-text-primary'
              }`}
              title="Toggle artwork metadata (Press I)"
            >
              <Info size={15} />
              <span className="hidden sm:inline">Info</span>
            </button>

            <button
              onClick={() => setIsZoomed((prev) => !prev)}
              className="p-2 border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Toggle fill / fit view"
            >
              {isZoomed ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
            </button>

            <button
              onClick={onClose}
              className="p-2 border border-border text-text-secondary hover:text-text-primary hover:border-error transition-colors flex items-center gap-1.5 text-xs font-mono cursor-pointer ml-1"
              aria-label="Close Lightbox (Escape)"
            >
              <X size={16} />
              <span className="hidden sm:inline">ESC</span>
            </button>
          </div>
        </div>

        {/* ── Central Presentation Viewport (Preserving Original Image Proportions) ── */}
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
          }}
          className="relative flex-1 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-hidden"
        >
          {/* Previous Arrow Button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-background/80 hover:bg-accent hover:text-background border border-border text-text-primary transition-all flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-xs"
              aria-label="Previous artwork"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next Arrow Button */}
          {currentIndex < items.length - 1 && (
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 z-20 w-11 h-11 sm:w-12 sm:h-12 bg-background/80 hover:bg-accent hover:text-background border border-border text-text-primary transition-all flex items-center justify-center cursor-pointer shadow-2xl backdrop-blur-xs"
              aria-label="Next artwork"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Animated Image Container */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex items-center justify-center max-w-full max-h-[82vh]"
          >
            {/* High-Resolution WebP Artwork */}
            <img
              src={item.src}
              alt={item.title}
              loading="eager"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              className={`max-w-full max-h-[78vh] w-auto h-auto transition-all duration-300 drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)] ${
                isZoomed ? 'object-cover scale-110' : 'object-contain'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              style={{
                aspectRatio: item.aspectRatio === '1:1' ? '1/1' : item.aspectRatio === '4:5' ? '4/5' : 'auto',
              }}
            />

            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-surface/50 min-w-[280px] min-h-[340px]">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent animate-spin rounded-full" />
              </div>
            )}
          </motion.div>
        </div>

        {/* ── Collapsible Bottom Curatorial Metadata Panel ─────────────────── */}
        <AnimatePresence>
          {showMetadata && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-30 px-5 sm:px-8 py-5 bg-background/95 backdrop-blur-md border-t border-border/80 flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-6xl mx-auto w-full"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-heading text-xs tracking-wider uppercase text-accent font-semibold bg-accent/10 px-2 py-0.5 border border-accent/30">
                    {item.category}
                  </span>
                  <span className="font-mono text-xs text-text-secondary">
                    {item.client}
                  </span>
                  <span className="text-border">·</span>
                  <span className="font-mono text-xs text-text-secondary">
                    {item.dimensions}
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary tracking-tight">
                  {item.title}
                </h3>

                {/* Short explanation of creative objective */}
                <p className="font-body text-body-sm text-text-secondary leading-relaxed pt-1">
                  {item.objective}
                </p>
              </div>

              {/* Badges and Deliverable Details */}
              <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0 border-t md:border-t-0 border-border/60 pt-3 md:pt-0">
                <span className="font-heading text-[11px] uppercase tracking-wider text-text-secondary">
                  Collection: {item.collection}
                </span>
                <span className="font-mono text-xs text-text-primary bg-surface px-2.5 py-1 border border-border">
                  {item.deliverableType}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
