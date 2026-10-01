import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, MapPin, Navigation, Radio, Search } from 'lucide-react'
import { regions, temples } from '../data/temples'
import { useApp } from '../lib/store'
import { clockIn, cn, to12h, useReveal } from '../lib/utils'
import { Mandala } from '../components/Sacred'
import { Photo } from '../components/Photo'
import { fromPool, photos } from '../data/images'
import { Badge, Button, Chip, Input, PageHeader, Panel, Section, Stat } from '../components/ui'

export default function Temples() {
  const { temple: current, setTempleId, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [region, setRegion] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [zip, setZip] = useState('')
  const [nearest, setNearest] = useState<string[]>([])

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return temples.filter((t) => {
      const regionOk = region === 'All' || t.region === region
      const queryOk =
        !q ||
        [t.name, t.shortName, t.city, t.state, t.stateCode, t.zip, ...t.deities].join(' ').toLowerCase().includes(q)
      return regionOk && queryOk
    })
  }, [region, query])

  const findNearest = () => {
    const digits = zip.replace(/\D/g, '')
    if (digits.length < 3) {
      notify('Enter a ZIP code', 'Five digits, for example 95035')
      return
    }
    // Mock proximity: rank by numeric distance between ZIP prefixes.
    const ranked = [...temples]
      .map((t) => ({ id: t.id, d: Math.abs(Number(t.zip) - Number(digits.padEnd(5, '0'))) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, 3)
      .map((x) => x.id)
    setNearest(ranked)
    notify('Three sannidhis near you', 'Ranked by distance from your ZIP code')
  }

  return (
    <div ref={ref}>
      <PageHeader
        photo={photos.templeTower}
        eyebrow="The network"
        title="Ten sannidhis, one Dhuni"
        sub="Every temple keeps the same four aartis and the same open kitchen, in its own time zone. Choose yours and the whole site follows you."
      />

      <Section wide className="pt-0">
        <Panel className="reveal mb-10 grid gap-px overflow-hidden bg-line lg:grid-cols-[2fr_1fr]">
          <div className="bg-surface px-7 py-7">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] flex-1">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by city, state or deity"
                  className="pl-11"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Chip active={region === 'All'} onClick={() => setRegion('All')}>
                  All regions
                </Chip>
                {regions.map((r) => (
                  <Chip key={r} active={region === r} onClick={() => setRegion(r)}>
                    {r}
                  </Chip>
                ))}
              </div>
            </div>
            <p className="mt-4 text-[12.5px] text-ink-faint">
              {list.length} of {temples.length} sannidhis shown
            </p>
          </div>

          <div className="bg-surface px-7 py-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Find the nearest</p>
            <div className="mt-4 flex gap-2">
              <Input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && findNearest()}
                placeholder="ZIP code"
                inputMode="numeric"
                maxLength={5}
              />
              <Button onClick={findNearest} size="sm" className="shrink-0">
                <Navigation size={14} />
              </Button>
            </div>
            {nearest.length > 0 && (
              <div className="mt-4 space-y-1.5">
                {nearest.map((id, i) => {
                  const t = temples.find((x) => x.id === id)!
                  return (
                    <Link
                      key={id}
                      to={`/temples/${id}`}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[12.5px] text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                    >
                      <span>
                        <span className="text-gold">{i + 1}.</span> {t.shortName}
                      </span>
                      <span className="text-ink-faint">{t.city}, {t.stateCode}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </Panel>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {list.map((t, i) => {
            const active = current.id === t.id
            return (
              <Panel
                key={t.id}
                hover
                className={cn('reveal flex flex-col', active && 'border-[var(--c-line-strong)]')}
              >
                <Photo
                  photo={fromPool('temples', i)}
                  className="h-44 w-full"
                  fallbackSeed={i + 1}
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  scrim
                >
                  <div className="absolute left-5 top-5 flex gap-2">
                    <Badge>{t.region}</Badge>
                    {t.liveDarshan && (
                      <Badge tone="ember">
                        <Radio size={9} /> Live
                      </Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-5 text-right">
                    <p className="font-display text-lg text-ink">{clockIn(t.timezone)}</p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{t.tzLabel}</p>
                  </div>
                </Photo>

                <div className="flex flex-1 flex-col px-6 pb-6 pt-2">
                  <h3 className="text-balance text-[19px] leading-snug">{t.name}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-ink-faint">
                    <MapPin size={12} className="text-gold" />
                    {t.city}, {t.state} · est. {t.established}
                  </p>
                  <p className="mt-4 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ink-soft">{t.highlight}</p>

                  <div className="mt-5 grid grid-cols-4 gap-2 border-y border-line py-3.5 text-center">
                    {t.aartis.map((a) => (
                      <div key={a.key}>
                        <p className="text-[9.5px] uppercase tracking-[0.12em] text-ink-faint">
                          {a.name.split(' ')[0]}
                        </p>
                        <p className="mt-0.5 text-[12.5px] text-gold-light">{to12h(a.time)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex gap-2">
                    <button
                      onClick={() => {
                        setTempleId(t.id)
                        notify('Sannidhi changed', `Timings now shown for ${t.shortName}`)
                      }}
                      className={cn(
                        'flex flex-1 items-center justify-center gap-1.5 rounded-full border px-4 py-2.5 text-[12.5px] transition-colors',
                        active
                          ? 'border-ember/50 bg-ember/15 text-ember-soft'
                          : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
                      )}
                    >
                      {active && <Check size={13} />}
                      {active ? 'Your sannidhi' : 'Make this mine'}
                    </button>
                    <Link
                      to={`/temples/${t.id}`}
                      className="grid size-10 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                      aria-label={`Visit ${t.shortName}`}
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </Panel>
            )
          })}
        </div>

        {list.length === 0 && (
          <Panel className="px-8 py-16 text-center">
            <p className="font-display text-xl">No sannidhi matches that search</p>
            <p className="mt-3 text-sm text-ink-soft">Try a city, a state code, or clear the filters.</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-6"
              onClick={() => {
                setQuery('')
                setRegion('All')
              }}
            >
              Clear filters
            </Button>
          </Panel>
        )}
      </Section>

      <Section wide className="pb-24">
        <Panel className="reveal relative overflow-hidden px-8 py-14">
          <Mandala className="pointer-events-none absolute -right-28 -top-28 size-[420px] opacity-[0.12] animate-slow-spin" />
          <div className="relative grid gap-10 sm:grid-cols-4">
            <Stat value={temples.length} label="Sannidhis" sub="8 states" />
            <Stat value="38,400" label="Devotees" sub="on the register" />
            <Stat value="186k" label="Meals a year" sub="annadanam served" />
            <Stat value="24" label="Priests" sub="9 languages" />
          </div>
        </Panel>
      </Section>
    </div>
  )
}
