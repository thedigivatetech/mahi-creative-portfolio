import { useState, useEffect, useRef } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Grid,
} from 'lucide-react'

interface ImageGalleryViewerProps {
  images: string[]
  title: string
  className?: string
}

export function ImageGalleryViewer({
  images,
  title,
  className = '',
}: ImageGalleryViewerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showThumbnails, setShowThumbnails] = useState(true)
  const viewerRef = useRef<HTMLDivElement>(null)

  const activeImage = images[activeIndex] || images[0]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const toggleFullscreen = () => {
    if (!viewerRef.current) return
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  useEffect(() => {
    const handleFs = () => setIsFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', handleFs)
    return () => document.removeEventListener('fullscreenchange', handleFs)
  }, [])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    } else if (e.key === 'f') {
      e.preventDefault()
      toggleFullscreen()
    }
  }

  return (
    <div
      ref={viewerRef}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Image gallery for ${title}`}
      className={`relative flex flex-col bg-surface border border-border outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      {/* Top Bar with Counter and Fullscreen */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background/90 z-20">
        <div className="flex items-center gap-3">
          <span className="font-heading text-xs tracking-wider uppercase text-accent font-semibold">
            Deliverable View
          </span>
          <span className="text-border">|</span>
          <span className="font-mono text-xs text-text-secondary">
            Asset {activeIndex + 1} of {images.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {images.length > 1 && (
            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className="px-2.5 py-1 text-xs border border-border hover:border-accent text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Toggle Thumbnails Strip"
            >
              <Grid size={13} />
              <span className="hidden sm:inline">Grid Strip</span>
            </button>
          )}

          <button
            onClick={toggleFullscreen}
            className="p-1.5 border border-border hover:border-accent text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[460px] max-h-[68vh] flex items-center justify-center p-4 sm:p-6 bg-black/60 overflow-hidden group">
        <img
          key={activeImage}
          src={activeImage}
          alt={`${title} - deliverable ${activeIndex + 1}`}
          loading="lazy"
          className="max-h-full max-w-full object-contain mx-auto shadow-2xl transition-all duration-300"
        />

        {/* Prev / Next Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous deliverable"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-background/80 hover:bg-accent hover:text-background text-text-primary border border-border transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next deliverable"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-background/80 hover:bg-accent hover:text-background text-text-primary border border-border transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-lg active:scale-95"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Navigation Strip */}
      {images.length > 1 && showThumbnails && (
        <div className="border-t border-border bg-background/95 p-3 overflow-x-auto scrollbar-none flex items-center gap-2.5">
          {images.map((img, idx) => (
            <button
              key={img}
              onClick={() => setActiveIndex(idx)}
              aria-label={`View image ${idx + 1}`}
              className={`relative flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 border overflow-hidden cursor-pointer transition-all ${
                idx === activeIndex
                  ? 'border-accent ring-2 ring-accent/40 scale-105'
                  : 'border-border/80 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute bottom-0 right-0 px-1 py-0.2 bg-background/80 font-mono text-[9px] text-text-secondary">
                {idx + 1}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
