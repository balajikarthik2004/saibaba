import { useState } from 'react'
import type { Photo as PhotoData } from '../data/images'
import { cn } from '../lib/utils'
import { ArtTile } from './Sacred'

/**
 * A photograph with a shimmering placeholder while it decodes and a drawn
 * fallback if the network is unavailable — so a card is never empty or broken.
 */
export function Photo({
  photo,
  className,
  imgClassName,
  ratio,
  scrim,
  priority,
  fill,
  fallbackSeed = 0,
  children,
}: {
  photo: PhotoData
  className?: string
  imgClassName?: string
  ratio?: string
  scrim?: boolean
  priority?: boolean
  /** Stretch to cover the nearest positioned ancestor, behind its content. */
  fill?: boolean
  fallbackSeed?: number
  children?: React.ReactNode
}) {
  const [state, setState] = useState<'loading' | 'loaded' | 'failed'>('loading')

  return (
    <div
      // `fill` must replace `relative`, not sit alongside it — Tailwind would
      // otherwise keep the element in flow and it would collapse to no height.
      className={cn('overflow-hidden', fill ? 'absolute inset-0 size-full' : 'relative', className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      {state === 'loading' && <div className="skeleton absolute inset-0" />}

      {state === 'failed' ? (
        <ArtTile seed={fallbackSeed} />
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setState('loaded')}
          onError={() => setState('failed')}
          className={cn(
            'photo-fade photo-tint absolute inset-0 size-full object-cover',
            state === 'loaded' && 'is-loaded',
            imgClassName,
          )}
        />
      )}

      {scrim && <div className="photo-scrim" />}
      {children}
    </div>
  )
}

/** Small round photograph — sidebar avatars, priest lists, temple chips. */
export function Avatar({
  photo,
  size = 40,
  className,
}: {
  photo: PhotoData
  size?: number
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  return (
    <span
      className={cn(
        'relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full border border-line bg-surface-2',
        className,
      )}
      style={{ width: size, height: size }}
    >
      {failed ? (
        <ArtTile seed={size} />
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      )}
    </span>
  )
}
