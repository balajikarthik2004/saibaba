import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react'
import { albums, galleryItems } from '../data/community'
import { templeById } from '../data/temples'
import { useApp } from '../lib/store'
import { cn, fmtDate, useReveal } from '../lib/utils'
import { Divider } from '../components/Sacred'
import { Photo } from '../components/Photo'
import { photos, type PhotoKey } from '../data/images'

/** The gallery mixes every pool, so each item gets a distinct photograph. */
const galleryKeys: PhotoKey[] = [
  'procession', 'aartiThali', 'deepLights', 'dhuniFire', 'langarServing', 'goshala',
  'usTempleA', 'utsavRally', 'havanRitual', 'bhajanMandali', 'marigoldHeap', 'kitchenOpen',
  'templeTower', 'kitchenVolunteers', 'devoteesPraying', 'pandalNight', 'diyaRow', 'templeBell',
  'samadhiMandir', 'prasadSweets',
]
const galleryPhoto = (i: number) => photos[galleryKeys[i % galleryKeys.length]]
import { Badge, Chip, PageHeader, Panel, Section } from '../components/ui'

export default function Gallery() {
  const { favourites, toggleFavourite } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [album, setAlbum] = useState<string>('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const list = useMemo(
    () => galleryItems.filter((g) => album === 'All' || g.album === album),
    [album],
  )

  const open = lightbox !== null ? list[lightbox] : null

  return (
    <div ref={ref}>
      <PageHeader
        photo={photos.utsavRally}
        eyebrow="Gallery"
        title="A year in the sannidhis"
        sub="Palki at dusk, two thousand plates on a Thursday, a thousand lamps on the prakaram wall, and the Dhuni that has not gone out since 2003."
      />

      <Section wide className="pt-0">
        <div className="reveal mb-9 flex flex-wrap gap-2">
          <Chip active={album === 'All'} onClick={() => setAlbum('All')}>
            Everything
          </Chip>
          {albums.map((a) => (
            <Chip key={a} active={album === a} onClick={() => setAlbum(a)}>
              {a}
            </Chip>
          ))}
        </div>

        <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((g, i) => {
            const tall = i % 7 === 0 || i % 7 === 4
            return (
              <button
                key={g.id}
                onClick={() => setLightbox(i)}
                className={cn(
                  'reveal group panel relative overflow-hidden text-left',
                  tall && 'row-span-2',
                )}
              >
                <Photo
                  photo={galleryPhoto(g.art)}
                  fill
                  fallbackSeed={g.art}
                  imgClassName="transition-transform duration-[900ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/25 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-95" />

                <span
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavourite(g.id)
                  }}
                  className={cn(
                    'absolute right-4 top-4 grid size-8 place-items-center rounded-full border backdrop-blur transition-colors',
                    favourites.includes(g.id)
                      ? 'border-kumkum/50 bg-kumkum/25 text-kumkum'
                      : 'border-line-strong bg-bg-deep/50 text-ink-soft opacity-0 group-hover:opacity-100',
                  )}
                >
                  <Heart size={13} fill={favourites.includes(g.id) ? 'currentColor' : 'none'} />
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <Badge tone="gold">{g.album}</Badge>
                  <p className="mt-2.5 text-balance font-display text-[17px] leading-snug text-ink">{g.title}</p>
                  <p className="mt-1 text-[11.5px] text-ink-faint">
                    {templeById(g.templeId)?.shortName} · {fmtDate(g.date)}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <p className="reveal mt-10 text-center text-[12px] leading-relaxed text-ink-faint">
          Photographs are licensed images from Wikimedia Commons standing in for the temples&rsquo; own archives �
          see{' '}
          <Link to="/credits" className="text-gold transition-colors hover:text-ember">
            image credits
          </Link>
          . Replace the <code className="text-gold-light">src</code> of each entry in{' '}
          <code className="text-gold-light">src/data/images.ts</code> to swap in your own.
        </p>
      </Section>

      {open && lightbox !== null && (
        <div className="fixed inset-0 z-[85] grid place-items-center px-4 py-8">
          <button
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={() => setLightbox(null)}
            aria-label="Close"
          />
          <div className="rise-in relative z-10 w-[min(96vw,980px)]">
            <Panel className="overflow-hidden">
              <Photo photo={galleryPhoto(open.art)} ratio="16/9" className="w-full" priority fallbackSeed={open.art}>
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
              </Photo>
              <div className="px-8 py-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Badge tone="gold">{open.album}</Badge>
                    <h2 className="mt-3 font-display text-2xl">{open.title}</h2>
                    <p className="mt-1 text-[12.5px] text-ink-faint">
                      {templeById(open.templeId)?.name} · {fmtDate(open.date)}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleFavourite(open.id)}
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] transition-colors',
                      favourites.includes(open.id)
                        ? 'border-kumkum/50 bg-kumkum/15 text-kumkum'
                        : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
                    )}
                  >
                    <Heart size={13} fill={favourites.includes(open.id) ? 'currentColor' : 'none'} />
                    {favourites.includes(open.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
                <Divider className="my-5" icon="dot" />
                <p className="font-quote text-[18px] italic leading-relaxed text-ink-soft">{open.caption}</p>
              </div>
            </Panel>

            <button
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 grid size-10 place-items-center rounded-full border border-line-strong bg-bg-deep/70 text-ink backdrop-blur"
            >
              <X size={16} />
            </button>

            <button
              onClick={() => setLightbox((n) => (n! - 1 + list.length) % list.length)}
              className="absolute -left-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg-deep/80 text-gold backdrop-blur sm:-left-16"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setLightbox((n) => (n! + 1) % list.length)}
              className="absolute -right-4 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-bg-deep/80 text-gold backdrop-blur sm:-right-16"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
