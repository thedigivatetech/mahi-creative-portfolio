import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RotateCcw,
  AlertCircle,
  Loader2,
} from 'lucide-react'

interface VideoPlayerWithControlsProps {
  src: string
  poster?: string
  fallbackThumbnail?: string
  title: string
  autoPlay?: boolean
  aspectRatio?: '9:16' | '16:9' | '4:5' | '1:1'
  videoOrientation?: 'vertical' | 'horizontal'
  className?: string
}

export function VideoPlayerWithControls({
  src,
  poster,
  fallbackThumbnail,
  title,
  aspectRatio = '9:16',
  videoOrientation = 'vertical',
  className = '',
}: VideoPlayerWithControlsProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Explicitly do NOT autoplay audio to preserve user trust & browser autoplay policies
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.9)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [isBuffering, setIsBuffering] = useState(false)
  const [hasError, setHasError] = useState(false)

  const controlsTimeoutRef = useRef<number | null>(null)

  // Play / pause toggle
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn('Playback request failed or prevented:', err)
          setIsPlaying(false)
        })
    } else {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }, [])

  // Mute toggle
  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
    if (!nextMuted && videoRef.current.volume === 0) {
      videoRef.current.volume = 0.8
      setVolume(0.8)
    }
  }, [isMuted])

  // Volume slider change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (videoRef.current) {
      videoRef.current.volume = val
      videoRef.current.muted = val === 0
      setIsMuted(val === 0)
    }
  }

  // Seek bar click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !videoRef.current || !duration) return
    const rect = progressRef.current.getBoundingClientRect()
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const targetTime = pos * duration
    videoRef.current.currentTime = targetTime
    setCurrentTime(targetTime)
  }

  // Restart video
  const handleRestart = () => {
    if (!videoRef.current) return
    videoRef.current.currentTime = 0
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
  }

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  // Auto-hide controls during active playback
  const handleMouseMove = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    if (isPlaying) {
      controlsTimeoutRef.current = window.setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  // Time format helper (m:ss)
  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  // Keyboard shortcut listener (Space to play/pause, M to mute, F to fullscreen)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not capture if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return

      if (e.code === 'Space' && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault()
        togglePlay()
      } else if (e.code === 'KeyM' && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault()
        toggleMute()
      } else if (e.code === 'KeyF' && containerRef.current?.contains(document.activeElement)) {
        e.preventDefault()
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [togglePlay, toggleMute])

  // Determine frame container aspect ratio class
  const isVertical = videoOrientation === 'vertical' || aspectRatio === '9:16'
  const effectiveFallback = fallbackThumbnail || poster

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      tabIndex={0}
      role="region"
      aria-label={`Video presentation: ${title}`}
      className={`relative w-full flex items-center justify-center bg-black/95 select-none overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
    >
      {/* Video Element — Preserving original video proportions without stretching or cropping */}
      {!hasError ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          muted={isMuted}
          controls={false}
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
          onTimeUpdate={() => videoRef.current && setCurrentTime(videoRef.current.currentTime)}
          onLoadedMetadata={() => videoRef.current && setDuration(videoRef.current.duration)}
          onWaiting={() => setIsBuffering(true)}
          onPlaying={() => {
            setIsBuffering(false)
            setIsPlaying(true)
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onError={() => {
            console.error('Video failed to load:', src)
            setHasError(true)
          }}
          className={`w-auto h-auto max-w-full max-h-[58vh] object-contain transition-opacity duration-300 cursor-pointer ${
            isVertical ? 'aspect-[9/16]' : 'aspect-video'
          }`}
        />
      ) : (
        /* Fallback Thumbnail if Video Fails */
        <div className="relative w-full max-w-lg aspect-[9/16] sm:aspect-video flex flex-col items-center justify-center bg-surface p-6 text-center border border-border">
          {effectiveFallback && (
            <img
              src={effectiveFallback}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-30 filter blur-xs"
            />
          )}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 bg-surface/80 border border-border flex items-center justify-center text-text-secondary mb-3">
              <AlertCircle size={22} className="text-accent" />
            </div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-text-primary mb-1">
              Video Preview Offline
            </h4>
            <p className="font-body text-xs text-text-secondary max-w-xs mb-4">
              Unable to stream video file directly. Fallback poster frame retained.
            </p>
            <button
              onClick={() => {
                setHasError(false)
                if (videoRef.current) {
                  videoRef.current.load()
                }
              }}
              className="px-4 py-2 bg-accent text-background font-body text-xs font-semibold hover:bg-accent/90 transition-colors"
            >
              Retry Video Load
            </button>
          </div>
        </div>
      )}

      {/* Buffering Indicator */}
      {isBuffering && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-xs z-20">
          <div className="flex items-center gap-3 bg-surface/90 px-4 py-2.5 border border-border">
            <Loader2 size={18} className="animate-spin text-accent" />
            <span className="font-heading text-xs tracking-wider uppercase text-text-primary">
              Buffering Media...
            </span>
          </div>
        </div>
      )}

      {/* Big Initial Play Button (Overlay when paused or idle) */}
      {!isPlaying && !isBuffering && !hasError && (
        <div
          onClick={(e) => {
            e.stopPropagation()
            togglePlay()
          }}
          className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px] cursor-pointer z-10 transition-opacity"
        >
          <div className="group/btn relative w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-accent bg-background/80 flex items-center justify-center text-accent shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-accent hover:text-background">
            <Play size={28} fill="currentColor" className="ml-1" />
            <div className="absolute -inset-2 rounded-full border border-accent/40 animate-ping opacity-40 pointer-events-none" />
          </div>
          <span className="absolute bottom-6 font-mono text-[11px] text-text-secondary uppercase tracking-widest bg-background/80 px-3 py-1 border border-border">
            Click or Press Space to Play
          </span>
        </div>
      )}

      {/* ── Native / Custom Overlay Playback Controls ───────────────────────── */}
      {!hasError && (
        <div
          className={`absolute inset-x-0 bottom-0 z-30 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-5 transition-opacity duration-300 flex flex-col gap-2.5 ${
            showControls || !isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress / Seek Timeline Bar */}
          <div
            ref={progressRef}
            onClick={handleSeek}
            role="slider"
            aria-label="Video scrubber"
            aria-valuemin={0}
            aria-valuemax={duration || 100}
            aria-valuenow={currentTime}
            className="group/seek relative w-full h-2 bg-white/20 hover:h-3 rounded-none cursor-pointer transition-all flex items-center"
          >
            {/* Loaded / Buffered Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white/30"
              style={{
                width: `${videoRef.current && videoRef.current.buffered.length > 0 ? (videoRef.current.buffered.end(videoRef.current.buffered.length - 1) / (duration || 1)) * 100 : 0}%`,
              }}
            />

            {/* Current Playhead Bar */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-accent transition-all"
              style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
            />

            {/* Scrubber Knob */}
            <div
              className="absolute w-3.5 h-3.5 bg-accent border border-background shadow-md opacity-0 group-hover/seek:opacity-100 -translate-x-1/2 transition-opacity"
              style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}
            />
          </div>

          {/* Controls Bottom Row */}
          <div className="flex items-center justify-between text-text-primary gap-3 pt-1">
            {/* Left: Play/Pause, Restart, Time readout */}
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="p-1.5 text-text-primary hover:text-accent transition-colors cursor-pointer"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
              </button>

              <button
                onClick={handleRestart}
                className="p-1.5 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label="Restart video"
              >
                <RotateCcw size={15} />
              </button>

              <div className="font-mono text-xs text-text-secondary select-none">
                <span className="text-text-primary font-medium">{formatTime(currentTime)}</span>
                <span className="mx-1 text-border">/</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Right: Volume slider, Mute, Fullscreen */}
            <div className="flex items-center gap-3">
              {/* Volume Slider Group */}
              <div className="flex items-center gap-2 group/vol">
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-text-primary hover:text-accent transition-colors cursor-pointer"
                  aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 sm:w-20 h-1 bg-white/20 accent-accent cursor-pointer transition-all"
                  aria-label="Volume controller"
                />
              </div>

              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
              >
                {isFullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
