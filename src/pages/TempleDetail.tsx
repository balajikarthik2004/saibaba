import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, Clock, Mail, MapPin, Navigation, Phone, Radio, Users } from 'lucide-react'
import { templeById } from '../data/temples'
import { events } from '../data/events'
import { useApp } from '../lib/store'
import { clockIn, cn, fmtDayMonth, to12h, useReveal, weekdayIn } from '../lib/utils'
import { AartiRing } from '../components/AartiRing'
import { Divider, EmberField, Mandala } from '../components/Sacred'
import { Photo } from '../components/Photo'
import { fromPool, photos } from '../data/images'
import { Badge, Button, KeyValue, Panel, Section, Stat } from '../components/ui'

export default function TempleDetail() {
  const { id } = useParams()
  const { temple: current, setTempleId, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const t = templeById(id ?? '')

  if (!t) {
    return (
      <Section className="py-32 text-center">
        <h1 className="font-display text-3xl">That sannidhi is not in the network</h1>
        <Button to="/temples" variant="ghost" className="mt-8">
          <ArrowLeft size={15} /> Back to all temples
        </Button>
      </Section>
    )
  }

  const active = current.id === t.id
  const today = weekdayIn(t.timezone)
  const templeEvents = events
    .filter((e) => e.templeIds === 'all' || e.templeIds.includes(t.id))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4)

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${t.address}, ${t.city}, ${t.stateCode} ${t.zip}`,
  )}`

  return (
    <div ref={ref}>
      {/* hero */}
      <section className="relative overflow-hidden px-5 pb-12 pt-10 sm:px-8 sm:pt-16">
        <Photo photo={photos.usTempleC} fill priority fallbackSeed={3} />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/92 via-bg/90 to-bg" />
        <EmberField count={16} />
        <Mandala className="pointer-events-none absolute -left-44 -top-40 size-[540px] opacity-[0.13] animate-reverse-spin" />

        <div className="relative mx-auto max-w-[1400px]">
          <Link
            to="/temples"
            className="inline-flex items-center gap-2 text-[12.5px] text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> All sannidhis
          </Link>

          <div className="mt-7 grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>{t.region}</Badge>
                <Badge tone="gold">Est. {t.established}</Badge>
                {t.liveDarshan && (
                  <Badge tone="ember">
                    <Radio size={9} /> Live darshan
                  </Badge>
                )}
              </div>

              <h1 className="mt-5 text-balance font-display text-4xl leading-[1.1] sm:text-5xl">{t.name}</h1>

              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-ink-soft">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-gold" />
                  {t.city}, {t.state}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} className="text-gold" />
                  {clockIn(t.timezone)} {t.tzLabel} · {today}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={13} className="text-gold" />
                  Capacity {t.capacity.toLocaleString()}
                </span>
              </p>

              <p className="mt-7 max-w-2xl text-pretty text-[15px] leading-relaxed text-ink-soft">{t.about}</p>

              <p className="mt-5 inline-flex rounded-xl border border-ember/30 bg-ember/10 px-4 py-2.5 text-[13px] text-ember-soft">
                {t.highlight}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  onClick={() => {
                    setTempleId(t.id)
                    notify('Sannidhi changed', `All timings now shown for ${t.shortName}`)
                  }}
                  disabled={active}
                >
                  {active ? (
                    <>
                      <Check size={15} /> Your sannidhi
                    </>
                  ) : (
                    'Make this my sannidhi'
                  )}
                </Button>
                <Button href={mapsUrl} variant="outline">
                  <Navigation size={15} /> Directions
                </Button>
                <Button to="/sevas" variant="ghost">
                  Book a seva here
                </Button>
              </div>
            </div>

            <Panel className="px-7 py-8">
              <AartiRing temple={t} size={210} />
              <Divider className="my-5" icon="dot" />
              <div className="space-y-0">
                <KeyValue k="Weekdays" v={t.hours.weekday} />
                <KeyValue k="Weekends" v={t.hours.weekend} />
                <KeyValue k="Annadanam" v={t.annadanamDays.join(' · ')} />
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* aartis in full */}
      <Section wide className="py-12">
        <h2 className="reveal mb-7 font-display text-2xl">The four daily aartis</h2>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {t.aartis.map((a, i) => (
            <Panel key={a.key} hover className="reveal flex flex-col px-6 py-7">
              <div className="flex items-baseline justify-between">
                <span className="text-[10px] uppercase tracking-[0.26em] text-gold">0{i + 1}</span>
                <span className="font-display text-2xl ember-text">{to12h(a.time)}</span>
              </div>
              <p className="mt-5 font-deva text-[15px] text-gold-light/85">{a.sanskrit}</p>
              <h3 className="mt-1 font-display text-[19px]">{a.name}</h3>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-ink-soft">{a.meaning}</p>
              <p className="mt-5 text-[11.5px] text-ink-faint">
                {a.duration} minutes · {t.tzLabel}
              </p>
            </Panel>
          ))}
        </div>
      </Section>

      {/* weekly + details */}
      <Section wide className="py-12">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Panel className="reveal px-7 py-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Through the week</p>
            <div className="mt-6 space-y-5">
              {t.weeklyHighlights.map((w) => (
                <div
                  key={w.title}
                  className={cn(
                    'flex gap-5 border-l-2 pl-5',
                    w.day === today ? 'border-ember' : 'border-line',
                  )}
                >
                  <div className="w-24 shrink-0">
                    <p className={cn('text-[13px]', w.day === today ? 'text-ember' : 'text-gold-light')}>{w.day}</p>
                    <p className="text-[11.5px] text-ink-faint">{w.time}</p>
                  </div>
                  <div>
                    <p className="text-[14.5px] text-ink">{w.title}</p>
                    <p className="mt-0.5 text-[12.5px] text-ink-soft">{w.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <Divider className="my-7" icon="dot" />

            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Priests & languages</p>
            <div className="mt-5 space-y-4">
              {t.priests.map((p) => (
                <div key={p.name} className="flex flex-wrap items-baseline justify-between gap-3">
                  <div>
                    <p className="text-[14.5px] text-ink">{p.name}</p>
                    <p className="text-[12px] text-ink-faint">{p.role}</p>
                  </div>
                  <p className="text-[12px] text-gold-light/85">{p.languages.join(' · ')}</p>
                </div>
              ))}
            </div>
          </Panel>

          <div className="space-y-6">
            <Panel className="reveal px-7 py-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Visit</p>
              <div className="mt-5 space-y-3 text-[13.5px] text-ink-soft">
                <p className="flex items-start gap-2.5">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-gold" />
                  <span>
                    {t.address}
                    <br />
                    {t.city}, {t.stateCode} {t.zip}
                  </span>
                </p>
                <p className="flex items-center gap-2.5">
                  <Phone size={14} className="shrink-0 text-gold" />
                  {t.phone}
                </p>
                <p className="flex items-center gap-2.5">
                  <Mail size={14} className="shrink-0 text-gold" />
                  {t.email}
                </p>
              </div>
              <Button href={mapsUrl} variant="ghost" size="sm" className="mt-6" full>
                <Navigation size={14} /> Open in Maps
              </Button>
            </Panel>

            <Panel className="reveal px-7 py-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Deities</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {t.deities.map((d) => (
                  <span key={d} className="rounded-full border border-line px-3 py-1 text-[12px] text-ink-soft">
                    {d}
                  </span>
                ))}
              </div>
              <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-gold">Facilities</p>
              <ul className="mt-4 space-y-2">
                {t.facilities.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-[13px] text-ink-soft">
                    <Check size={13} className="mt-1 shrink-0 text-ember" />
                    {f}
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </Section>

      {/* events here */}
      <Section wide className="pb-24">
        <h2 className="reveal mb-7 font-display text-2xl">Coming up at {t.shortName}</h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {templeEvents.map((e, i) => (
            <Link key={e.id} to={`/events/${e.id}`} className="reveal group panel overflow-hidden">
              <Photo
                photo={fromPool('festivals', i + 1)}
                className="h-28 w-full"
                fallbackSeed={i + 4}
                imgClassName="transition-transform duration-700 group-hover:scale-105"
                scrim
              />
              <div className="px-5 pb-5 pt-1">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{fmtDayMonth(e.date)}</p>
                <p className="mt-1.5 text-balance text-[15px] leading-snug">{e.title}</p>
              </div>
            </Link>
          ))}
        </div>

        <Panel className="reveal mt-10 px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-4">
            <Stat value={t.established} label="Consecrated" />
            <Stat value={t.capacity.toLocaleString()} label="Capacity" />
            <Stat value={t.priests.length} label="Priests" />
            <Stat value={t.annadanamDays.length} label="Annadanam days" sub="per week" />
          </div>
        </Panel>
      </Section>
    </div>
  )
}
