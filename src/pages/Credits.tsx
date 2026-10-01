import { ExternalLink } from 'lucide-react'
import { photos } from '../data/images'
import { useReveal } from '../lib/utils'
import { Photo } from '../components/Photo'
import { Panel, Section, PageHeader } from '../components/ui'

const entries = Object.entries(photos)

export default function Credits() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <PageHeader
        photo={photos.shrineOfferings}
        eyebrow="Image credits"
        title="Every photograph, attributed"
        sub="This prototype uses freely licensed photography from Wikimedia Commons in place of the temples’ own archives. Each image is listed below with its author and licence."
      />

      <Section wide className="pt-0 pb-24">
        <Panel className="mb-8 px-7 py-6">
          <p className="text-[13.5px] leading-relaxed text-ink-soft">
            When the temples supply their own photography, replace the <code className="text-gold-light">src</code>{' '}
            of each entry in <code className="text-gold-light">src/data/images.ts</code> and delete this page — no
            other file needs to change. Until then, keep this page reachable: the CC BY and CC BY-SA licences used
            here require attribution.
          </p>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {entries.map(([key, p]) => (
            <Panel key={key} className="reveal overflow-hidden">
              <Photo photo={p} ratio="16/10" className="w-full" fallbackSeed={key.length} />
              <div className="px-5 py-4">
                <p className="text-[13px] leading-snug text-ink">{p.alt}</p>
                <p className="mt-2 text-[11.5px] text-ink-faint">
                  <span className="text-gold-light">{p.license}</span>
                  {p.credit ? ` · ${p.credit}` : ''}
                </p>
                {p.source && (
                  <a
                    href={p.source}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 text-[11.5px] text-gold transition-colors hover:text-ember"
                  >
                    Source <ExternalLink size={10} />
                  </a>
                )}
                <p className="mt-2 font-mono text-[10px] text-ink-faint/70">{key}</p>
              </div>
            </Panel>
          ))}
        </div>
      </Section>
    </div>
  )
}
