import { useRef, useState } from 'react'
import { Volume2, VolumeX, Play, Pause } from 'lucide-react'
import { cn } from '@hooks/cn.ts'

interface VideoPlayerProps {
  src: string
  poster?: string
  title: string            // accessibility label
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  showControls?: boolean   // show custom play / sound controls
  ratio?: '16/9' | '4/3' | '1/1'
  className?: string
}

const ratioClasses = {
  '16/9': 'aspect-video',
  '4/3':  'aspect-[4/3]',
  '1/1':  'aspect-square',
}

/**
 * VideoPlayer — custom-skinned HTML5 video component:
 * - Autoplay muted loop for reels (default)
 * - Optional sound toggle
 * - Play / pause on click
 * - Respects prefers-reduced-motion (pauses autoplay)
 * - Accessible: title, aria-label, keyboard-operable controls
 */
export function VideoPlayer({
  src,
  poster,
  title,
  autoPlay = true,
  loop = true,
  muted: initialMuted = true,
  showControls = true,
  ratio = '16/9',
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(autoPlay)
  const [muted,   setMuted]   = useState(initialMuted)

  const togglePlay = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => null)
      setPlaying(true)
    } else {
      videoRef.current.pause()
      setPlaying(false)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted((m) => !m)
  }

  // Respect prefers-reduced-motion
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const shouldAutoPlay = autoPlay && !prefersReduced

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface cursor-pointer group',
        ratioClasses[ratio],
        className
      )}
      onClick={togglePlay}
      role="region"
      aria-label={title}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        autoPlay={shouldAutoPlay}
        loop={loop}
        muted={muted}
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />

      {showControls && (
        <div className="absolute inset-0 pointer-events-none">
          {/* Play / pause hint — only visible when paused or on hover */}
          <div
            className={cn(
              'absolute inset-0 flex items-center justify-center transition-opacity duration-300',
              playing
                ? 'opacity-0 group-hover:opacity-100'
                : 'opacity-100'
            )}
          >
            <div className="bg-background/70 backdrop-blur-sm p-4">
              {playing
                ? <Pause size={20} className="text-text-primary" aria-hidden="true" />
                : <Play  size={20} className="text-text-primary" aria-hidden="true" />
              }
            </div>
          </div>

          {/* Sound toggle — always visible bottom-left */}
          <button
            className="absolute bottom-4 left-4 pointer-events-auto flex items-center gap-2 font-body text-body-sm text-text-primary bg-background/70 backdrop-blur-sm px-3 py-2 hover:bg-background/90 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute video' : 'Mute video'}
          >
            {muted
              ? <VolumeX size={14} aria-hidden="true" />
              : <Volume2 size={14} aria-hidden="true" />
            }
            <span>{muted ? 'Play with sound' : 'Mute'}</span>
          </button>
        </div>
      )}
    </div>
  )
}
