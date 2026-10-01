import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Check, MapPin, Users } from 'lucide-react'
import { eventById, events } from '../data/events'
import { temples } from '../data/temples'
import { useApp } from '../lib/store'
import { fmtDateLong, fmtDayMonth, relativeDay, useReveal } from '../lib/utils'
import { ArtTile, Divider, EmberField, Mandala } from '../components/Sacred'
import { Badge, Button, Field, Input, Panel, Progress, Section, Select } from '../components/ui'

export default function EventDetail() {
  const { id } = useParams()
  const { temple, addBooking, profile, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const e = eventById(id ?? '')

  const [seats, setSeats] = useState('2')
  const [templeId, setTempleId] = useState(temple.id)
  const [name, setName] = useState(profile.name === 'Devotee' ? '' : profile.name)
  const [rsvped, setRsvped] = useState(false)

  if (!e) {
    return (
      <Section className="py-32 text-center">
        <h1 className="font-display text-3xl">That event is not in the calendar</h1>
        <Button to="/events" variant="ghost" className="mt-8">
          <ArrowLeft size={15} /> Back to festivals
        </Button>
      </Section>
    )
  }

  const hosting = e.templeIds === 'all' ? temples : temples.filter((t) => e.templeIds.includes(t.id))
  const related = events.filter((x) => x.id !== e.id && x.category === e.category).slice(0, 3)

  const submitRsvp = () => {
    if (!name.trim()) {
      notify('A name is needed', 'So the hospitality team can hold your places')
      return
    }
    addBooking({
      kind: 'event',
      title: `${e.title} — ${seats} place${Number(seats) > 1 ? 's' : ''}`,
      templeId,
      date: e.date,
      amount: 0,
      devotee: name.trim(),
    })
    setRsvped(true)
    notify('Places reserved', `${seats} at ${temples.find((t) => t.id === templeId)?.shortName}`)
  }

  return (
    <div ref={ref}>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 h-[360px]">
          <ArtTile seed={e.title.length} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/35" />
        </div>
        <EmberField count={18} />

        <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-[12.5px] text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> All festivals
          </Link>

          <div className="mt-7 flex flex-wrap gap-2">
            <Badge tone="ember">{e.category}</Badge>
            <Badge>{relativeDay(e.date)}</Badge>
            {e.rsvp && <Badge tone="neem">RSVP open</Badge>}
          </div>

          <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl leading-[1.08] sm:text-5xl">{e.title}</h1>

          <p className="mt-4 text-[14px] text-gold-light">
            {fmtDateLong(e.date)}
            {e.endDate ? ` — ${fmtDateLong(e.endDate)}` : ''}
          </p>

          <p className="mt-6 max-w-2xl text-pretty text-[15.5px] leading-relaxed text-ink-soft">{e.summary}</p>
        </div>
      </section>

      <Section wide className="pt-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <Panel className="reveal relative overflow-hidden px-8 py-9">
              <Mandala
                rings={2}
                className="pointer-events-none absolute -right-28 -top-28 size-[320px] opacity-[0.12] animate-slow-spin"
              />
              <div className="relative">
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">About this observance</p>
                <p className="mt-5 font-quote text-[19px] leading-relaxed text-ink-soft">{e.detail}</p>
              </div>
            </Panel>

            <Panel className="reveal px-8 py-9">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Order of the day</p>
              <div className="mt-6 space-y-0">
                {e.schedule.map((s, i) => (
                  <div key={i} className="flex gap-6 border-b border-line py-4 last:border-0">
                    <span className="w-28 shrink-0 text-[13px] text-gold-light">{s.time}</span>
                    <span className="text-[14.5px] text-ink">{s.item}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <Panel className="reveal px-8 py-9">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Observed at {hosting.length} sannidhi{hosting.length > 1 ? 's' : ''}
              </p>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {hosting.map((t) => (
                  <Link
                    key={t.id}
                    to={`/temples/${t.id}`}
                    className="flex items-center justify-between rounded-xl border border-line px-4 py-3 transition-colors hover:border-line-strong hover:bg-surface-2"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-[13.5px] text-ink">{t.shortName}</span>
                      <span className="block text-[11.5px] text-ink-faint">
                        {t.city}, {t.stateCode}
                      </span>
                    </span>
                    <MapPin size={13} className="shrink-0 text-gold" />
                  </Link>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-6">
            {e.rsvp ? (
              <Panel className="reveal px-7 py-8">
                {rsvped ? (
                  <div className="text-center">
                    <span className="mx-auto grid size-14 place-items-center rounded-full border border-ember/40 bg-ember/10">
                      <Check size={22} className="text-ember" />
                    </span>
                    <p className="mt-5 font-display text-xl">Your places are held</p>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                      {seats} place{Number(seats) > 1 ? 's' : ''} reserved at{' '}
                      {temples.find((t) => t.id === templeId)?.shortName}. Come a little early — the hospitality
                      desk will be looking for your name.
                    </p>
                    <Button to="/account" variant="ghost" size="sm" className="mt-6">
                      See it in My Seva
                    </Button>
                  </div>
                ) : (
                  <>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Reserve your place</p>
                    {e.seats && (
                      <div className="mt-5">
                        <Progress value={e.seatsTaken ?? 0} max={e.seats} />
                        <p className="mt-2.5 flex items-center gap-1.5 text-[12px] text-ink-faint">
                          <Users size={12} /> {e.seatsTaken} of {e.seats} taken ·{' '}
                          {e.seats - (e.seatsTaken ?? 0)} left
                        </p>
                      </div>
                    )}
                    <div className="mt-6 space-y-4">
                      <Field label="Name" required>
                        <Input value={name} onChange={(ev) => setName(ev.target.value)} placeholder="Your name" />
                      </Field>
                      <Field label="Sannidhi">
                        <Select value={templeId} onChange={(ev) => setTempleId(ev.target.value)}>
                          {hosting.map((t) => (
                            <option key={t.id} value={t.id}>
                              {t.shortName} — {t.city}, {t.stateCode}
                            </option>
                          ))}
                        </Select>
                      </Field>
                      <Field label="How many coming">
                        <Select value={seats} onChange={(ev) => setSeats(ev.target.value)}>
                          {['1', '2', '3', '4', '5', '6', '8', '10'].map((n) => (
                            <option key={n} value={n}>
                              {n}
                            </option>
                          ))}
                        </Select>
                      </Field>
                    </div>
                    <Button onClick={submitRsvp} className="mt-6" full>
                      Reserve — free
                    </Button>
                    <p className="mt-4 text-center text-[11.5px] leading-relaxed text-ink-faint">
                      Darshan and annadanam are free and open to all. RSVP only holds seating.
                    </p>
                  </>
                )}
              </Panel>
            ) : (
              <Panel className="reveal px-7 py-8 text-center">
                <p className="font-display text-xl">No booking needed</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                  Come as you are, at any point during the day. Darshan, Udi and annadanam are free and open to
                  everyone.
                </p>
                <Button to="/temples" variant="ghost" size="sm" className="mt-6">
                  Find your sannidhi
                </Button>
              </Panel>
            )}

            <Panel className="reveal px-7 py-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Offer a seva for this day</p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-ink-soft">
                Sponsor the abhishekam, the aarti or the annadanam on a festival day and your family is named as
                that day’s yajamana at every aarti.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Button to="/sevas" size="sm" full>
                  Choose a seva
                </Button>
                <Button to="/annadanam" variant="ghost" size="sm" full>
                  Sponsor the meal
                </Button>
              </div>
            </Panel>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section wide className="pb-24">
          <Divider className="mb-10 max-w-sm" icon="dot" />
          <h2 className="reveal mb-7 font-display text-2xl">More {e.category.toLowerCase()} observances</h2>
          <div className="grid gap-5 sm:grid-cols-3">
            {related.map((r, i) => (
              <Link key={r.id} to={`/events/${r.id}`} className="reveal group panel overflow-hidden">
                <div className="relative h-32 overflow-hidden">
                  <ArtTile seed={i + 9} className="transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                </div>
                <div className="px-6 pb-6 pt-2">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold">{fmtDayMonth(r.date)}</p>
                  <p className="mt-1.5 text-balance text-[16px] leading-snug">{r.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </div>
  )
}
