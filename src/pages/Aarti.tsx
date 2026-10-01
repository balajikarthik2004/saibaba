import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Pause, Play, Volume2 } from 'lucide-react'
import { temples } from '../data/temples'
import { aartiSongs } from '../data/aarti'
import { useApp } from '../lib/store'
import { aartiStatus, clockIn, cn, to12h, useReveal, useTick } from '../lib/utils'
import { AartiRing } from '../components/AartiRing'
import { Divider, Mandala } from '../components/Sacred'
import { Badge, Button, Chip, PageHeader, Panel, Section } from '../components/ui'
import { photos } from '../data/images'

type Key = 'kakad' | 'madhyan' | 'dhoop' | 'shej'

export default function Aarti() {
  const { temple, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  useTick(20_000)

  const live = aartiStatus(temple)
  const [tab, setTab] = useState<Key>(live.aarti.key as Key)
  const [playing, setPlaying] = useState<string | null>(null)

  const current = temple.aartis.find((a) => a.key === tab)!
  const songs = aartiSongs.filter((s) => s.aarti === tab)
  const anytime = aartiSongs.filter((s) => s.aarti === 'any')

  return (
    <div ref={ref}>
      <PageHeader
        photo={photos.aartiLamp}
        eyebrow="Aarti & timings"
        title="Four lamps, every day, for a hundred and sixty years"
        sub="Kakad at dawn, Madhyan at noon, Dhoop at dusk, Shej at night. The same order Baba kept in Dwarkamai, kept now in ten American cities."
      />

      <Section wide className="pt-0">
        {/* live ring + today's four */}
        <Panel className="reveal grid gap-px overflow-hidden bg-line lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid place-items-center bg-surface px-7 py-10">
            <AartiRing temple={temple} size={230} />
            <p className="mt-5 text-center text-[12.5px] text-ink-soft">
              {temple.name}
              <br />
              <span className="text-ink-faint">
                Local time {clockIn(temple.timezone)} {temple.tzLabel}
              </span>
            </p>
          </div>

          <div className="bg-surface px-7 py-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Today at {temple.shortName}</p>
            <div className="mt-6 space-y-3">
              {temple.aartis.map((a) => {
                const isLive = live.live && live.aarti.key === a.key
                const isNext = !live.live && live.aarti.key === a.key
                return (
                  <button
                    key={a.key}
                    onClick={() => setTab(a.key as Key)}
                    className={cn(
                      'flex w-full items-center gap-5 rounded-xl border px-5 py-4 text-left transition-all duration-300',
                      tab === a.key
                        ? 'border-ember/45 bg-ember/10'
                        : 'border-line hover:border-line-strong hover:bg-surface-2',
                    )}
                  >
                    <span className="w-24 shrink-0">
                      <span className="block font-display text-[19px] text-ink">{to12h(a.time)}</span>
                      <span className="block text-[10.5px] text-ink-faint">{a.duration} min</span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-deva text-[13px] text-gold-light/80">{a.sanskrit}</span>
                      <span className="block text-[15px] text-ink">{a.name}</span>
                    </span>
                    {isLive && <Badge tone="ember">Live now</Badge>}
                    {isNext && <Badge>Next</Badge>}
                  </button>
                )
              })}
            </div>
            <p className="mt-6 text-[12.5px] leading-relaxed text-ink-soft">
              Doors open {temple.hours.weekday} on weekdays and {temple.hours.weekend} at weekends. Darshan is always
              free and never needs a booking.
            </p>
          </div>
        </Panel>
      </Section>

      {/* selected aarti detail */}
      <Section wide className="py-12">
        <div className="reveal mb-8 flex flex-wrap items-center gap-2">
          {temple.aartis.map((a) => (
            <Chip key={a.key} active={tab === a.key} onClick={() => setTab(a.key as Key)}>
              {a.name}
            </Chip>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <Panel className="reveal relative overflow-hidden px-8 py-9">
            <Mandala
              rings={2}
              className="pointer-events-none absolute -right-24 -bottom-24 size-[300px] opacity-[0.14] animate-slow-spin"
            />
            <div className="relative">
              <p className="font-deva text-2xl text-gold-light/85">{current.sanskrit}</p>
              <h2 className="mt-2 font-display text-3xl">{current.name}</h2>
              <p className="mt-4 flex items-center gap-2 text-[13px] text-gold">
                <Clock size={13} /> {to12h(current.time)} {temple.tzLabel} · {current.duration} minutes
              </p>
              <Divider className="my-6 max-w-xs" icon="diya" />
              <p className="font-quote text-[18px] italic leading-relaxed text-ink-soft">{current.meaning}</p>

              <div className="mt-8 space-y-2.5">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">This aarti across the network</p>
                {temples.slice(0, 6).map((x) => {
                  const a = x.aartis.find((y) => y.key === tab)!
                  return (
                    <Link
                      key={x.id}
                      to={`/temples/${x.id}`}
                      className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[12.5px] text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                    >
                      <span>{x.shortName}</span>
                      <span className="text-gold-light">
                        {to12h(a.time)} <span className="text-ink-faint">{x.tzLabel}</span>
                      </span>
                    </Link>
                  )
                })}
                <Link
                  to="/temples"
                  className="block px-2 pt-1 text-[12px] text-gold transition-colors hover:text-ember"
                >
                  All ten sannidhis →
                </Link>
              </div>
            </div>
          </Panel>

          <div className="space-y-5">
            {[...songs, ...anytime].map((s) => (
              <Panel key={s.id} className="reveal px-7 py-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-[20px]">{s.title}</h3>
                    <p className="mt-1 text-[12px] text-ink-faint">
                      {s.composer} · {s.minutes} min
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const next = playing === s.id ? null : s.id
                      setPlaying(next)
                      if (next) notify('Playing', `${s.title} — audio is mocked in this build`)
                    }}
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-4 py-2 text-[12px] transition-colors',
                      playing === s.id
                        ? 'border-ember/50 bg-ember/15 text-ember-soft'
                        : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
                    )}
                  >
                    {playing === s.id ? <Pause size={13} /> : <Play size={13} />}
                    {playing === s.id ? 'Playing' : 'Listen'}
                  </button>
                </div>

                {playing === s.id && (
                  <div className="mt-5 flex items-center gap-3">
                    <Volume2 size={14} className="shrink-0 text-gold" />
                    <div className="flex h-6 flex-1 items-end gap-[3px]">
                      {Array.from({ length: 44 }).map((_, i) => (
                        <span
                          key={i}
                          className="flex-1 rounded-full bg-gradient-to-t from-gold/40 to-ember"
                          style={{
                            height: `${20 + Math.abs(Math.sin(i * 0.7)) * 80}%`,
                            animation: `flame-flicker ${0.8 + (i % 5) * 0.18}s ease-in-out infinite`,
                            animationDelay: `${i * 0.04}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.26em] text-gold">Devanagari</p>
                    <p className="mt-2.5 whitespace-pre-line font-deva text-[16px] leading-[2] text-ink">
                      {s.devanagari}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.26em] text-gold">Transliteration</p>
                    <p className="mt-2.5 whitespace-pre-line font-quote text-[16px] italic leading-[1.9] text-ink-soft">
                      {s.transliteration}
                    </p>
                  </div>
                </div>

                <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-ink-soft">
                  {s.meaning}
                </p>
              </Panel>
            ))}
          </div>
        </div>
      </Section>

      {/* sponsor cta */}
      <Section wide className="pb-24">
        <Panel className="reveal flex flex-col items-center gap-6 px-8 py-12 text-center sm:px-14">
          <p className="font-deva text-[15px] text-gold">ॐ साईं राम</p>
          <h2 className="max-w-2xl text-balance text-3xl leading-tight">
            Sponsor an aarti, and your family is named as that day’s yajamana.
          </h2>
          <p className="max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
            The first lamp of the morning or the Udi of the evening, offered on your behalf — with a photograph
            emailed to you the same day.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/sevas" size="lg">
              Sponsor an aarti
            </Button>
            <Button to="/darshan" variant="outline" size="lg">
              Watch live instead
            </Button>
          </div>
        </Panel>
      </Section>
    </div>
  )
}
