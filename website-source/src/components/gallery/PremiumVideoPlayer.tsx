import { useState, useRef } from 'react'
import {
  AlertTriangle,
  RotateCcw,
  Sparkles,
} from 'lucide-react'

interface PremiumVideoPlayerProps {
  src: string
  poster?: string
  fallbackThumbnail?: string
  title: string
  aspectRatio?: '9:16' | '16:9' | '4:5' | '1:1'
  videoOrientation?: 'vertical' | 'horizontal'
  className?: string
}

export function PremiumVideoPlayer({
  src,
  poster,
  fallbackThumbnail,
  title,
  aspectRatio = '9:16',
  className = '',
}: PremiumVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasError, setHasError] = useState(false)
  const [retryKey, setRetryKey] = useState(0)

  // Aspect ratio container styles
  const isVertical = aspectRatio === '9:16' || aspectRatio === '4:5'

  const handleRetry = () => {
    setHasError(false)
    setRetryKey((k) => k + 1)
  }

  return (
    <div
      className={`relative w-full flex items-center justify-center bg-black/95 overflow-hidden select-none ${className}`}
    >
      {/* ── Ambient Blurred Backlight ────────────────────────────────────── */}
      {poster && (
        <div
          className="absolute inset-0 -inset-x-8 scale-110 filter blur-2xl opacity-25 pointer-events-none transition-opacity duration-1000"
          style={{
            backgroundImage: `url('${poster}')`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
          aria-hidden="true"
        />
      )}

      {/* ── Video Player Core Container ──────────────────────────────────── */}
      <div
        className={`relative z-10 w-full flex items-center justify-center ${
          isVertical ? 'max-h-[78vh]' : 'max-h-[75vh]'
        }`}
      >
        {!hasError ? (
          <div
            className={`relative flex items-center justify-center w-full ${
              isVertical
                ? 'aspect-[9/16] max-w-[380px] sm:max-w-[420px] shadow-2xl rounded-sm border border-border/80 bg-black'
                : 'aspect-video max-w-4xl shadow-2xl rounded-sm border border-border/80 bg-black'
            }`}
          >
            <video
              key={`${src}-${retryKey}`}
              ref={videoRef}
              src={src}
              poster={poster}
              preload="metadata"
              controls
              playsInline
              controlsList="nodownload"
              onError={() => setHasError(true)}
              aria-label={`Video presentation: ${title}`}
              className="w-full h-full object-contain mx-auto"
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Quality pill indicator overlay */}
            <div className="absolute top-3 right-3 pointer-events-none z-20">
              <span className="font-heading text-[10px] tracking-wider uppercase px-2 py-0.5 bg-background/85 backdrop-blur-xs border border-border/80 text-accent font-semibold flex items-center gap-1 shadow-sm">
                <Sparkles size={10} />
                <span>{isVertical ? '9:16 4K Reel' : '16:9 Cinema'}</span>
              </span>
            </div>
          </div>
        ) : (
          /* ── Fallback Thumbnail View if Video Fails to Load ─────────────── */
          <div
            className={`relative flex flex-col items-center justify-center p-6 text-center border border-error/40 bg-surface/90 ${
              isVertical ? 'aspect-[9/16] max-w-[380px]' : 'aspect-video max-w-4xl'
            }`}
          >
            {fallbackThumbnail && (
              <img
                src={fallbackThumbnail}
                alt={`${title} fallback`}
                className="absolute inset-0 w-full h-full object-cover opacity-30 filter grayscale"
              />
            )}
            <div className="relative z-10 max-w-sm">
              <div className="w-12 h-12 rounded-full bg-error/20 text-error flex items-center justify-center mx-auto mb-3">
                <AlertTriangle size={24} />
              </div>
              <h4 className="font-heading text-lg font-bold text-text-primary">
                Video Stream Unavailable
              </h4>
              <p className="mt-1.5 font-body text-xs text-text-secondary leading-relaxed">
                The high-resolution media stream could not be loaded on this network connection. A fallback thumbnail is displayed.
              </p>
              <button
                onClick={handleRetry}
                className="mt-4 px-4 py-2 bg-accent text-background font-body text-xs font-semibold hover:bg-accent/90 transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <RotateCcw size={14} />
                <span>Retry Playback</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
