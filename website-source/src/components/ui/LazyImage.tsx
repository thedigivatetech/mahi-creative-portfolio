import { useState } from 'react'
import { cn } from '@hooks/cn.ts'

type AspectRatio = '16/9' | '4/3' | '1/1' | '4/5' | '3/2' | 'auto'

interface LazyImageProps {
  src: string
  alt: string
  ratio?: AspectRatio
  className?: string
  imgClassName?: string
  priority?: boolean          // skip lazy loading for above-fold images
  objectFit?: 'cover' | 'contain'
}

const ratioClasses: Record<AspectRatio, string> = {
  '16/9': 'aspect-video',
  '4/3':  'aspect-[4/3]',
  '1/1':  'aspect-square',
  '4/5':  'aspect-[4/5]',
  '3/2':  'aspect-[3/2]',
  'auto': '',
}

/**
 * LazyImage — responsive image with:
 * - Fade-in on load
 * - Defined aspect ratio (no layout shift)
 * - Native lazy loading
 * - Accessible alt text required
 */
export function LazyImage({
  src,
  alt,
  ratio = '16/9',
  className,
  imgClassName,
  priority = false,
  objectFit = 'cover',
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError]   = useState(false)

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-surface',
        ratio !== 'auto' && ratioClasses[ratio],
        className
      )}
    >
      {!error ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={cn(
            'w-full h-full transition-opacity duration-500',
            objectFit === 'cover'    && 'object-cover',
            objectFit === 'contain'  && 'object-contain',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
        />
      ) : (
        /* Error state — invisible to users, screen-reader friendly */
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-center justify-center bg-surface"
        >
          <span className="font-body text-label text-text-secondary uppercase tracking-widest">
            Image unavailable
          </span>
        </div>
      )}
    </div>
  )
}
