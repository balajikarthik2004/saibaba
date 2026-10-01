import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, ChevronLeft, ChevronRight, LayoutGrid, MapPin, Users } from 'lucide-react'
import { eventCategories, events } from '../data/events'
import { temples } from '../data/temples'
import { useApp } from '../lib/store'
import { cn, fmtDayMonth, relativeDay, useReveal } from '../lib/utils'
import { Photo } from '../components/Photo'
import { fromPool, photos } from '../data/images'
import { Badge, Button, Chip, PageHeader, Panel, Progress, Section } from '../components/ui'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export default function Events() {
  const { temple } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [category, setCategory] = useState('All')
  const [mine, setMine] = useState(false)
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [cursor, setCursor] = useState(() => new Date(2026, 9, 1))

  const list = useMemo(
    () =>
      events
        .filter((e) => category === 'All' || e.category === category)
        .filter((e) => !mine || e.templeIds === 'all' || e.templeIds.includes(temple.id))
        .sort((a, b) => a.date.localeCompare(b.date)),
    [category, mine, temple.id],
  )

  return (
    <div ref={ref}>
      <PageHeader
        photo={photos.procession}
        eyebrow="Festivals & events"
        title="The year, kept together"
        sub="Vijayadashami Punyatithi, Ram Navami Urs, Navratri, Datta Jayanti — and the Thursday palki that never misses a week."
      />

      <Section wide className="pt-0">
        <Panel className="reveal mb-10 flex flex-wrap items-center gap-4 px-7 py-6">
          <div className="flex flex-wrap gap-2">
            <Chip active={category === 'All'} onClick={() => setCategory('All')}>
              Everything
            </Chip>
            {eventCategories.map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Chip active={mine} onClick={() => setMine((m) => !m)}>
              <MapPin size={11} /> {temple.shortName} only
            </Chip>
            <div className="flex overflow-hidden rounded-full border border-line">
              <button
                onClick={() => setView('list')}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] transition-colors',
                  view === 'list' ? 'bg-ember/15 text-ember-soft' : 'text-ink-soft hover:text-ink',
                )}
              >
                <LayoutGrid size={12} /> List
              </button>
              <button
                onClick={() => setView('calendar')}
                className={cn(
                  'flex items-center gap-1.5 px-3.5 py-1.5 text-[12px] transition-colors',
                  view === 'calendar' ? 'bg-ember/15 text-ember-soft' : 'text-ink-soft hover:text-ink',
                )}
              >
                <CalendarDays size={12} /> Calendar
              </button>
            </div>
          </div>
        </Panel>

        {view === 'calendar' ? (
          <CalendarView cursor={cursor} setCursor={setCursor} list={list} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {list.map((e, i) => (
              <Link
                key={e.id}
                to={`/events/${e.id}`}
                className="reveal group panel grid overflow-hidden sm:grid-cols-[180px_1fr]"
              >
                <Photo
                  photo={fromPool('festivals', i)}
                  className="h-40 w-full sm:h-full"
                  fallbackSeed={i + 1}
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-surface" />
                  <div className="absolute left-4 top-4 rounded-xl border border-line-strong bg-bg-deep/80 px-3 py-2 text-center backdrop-blur">
                    <p className="font-display text-xl leading-none text-ink">{e.date.slice(8, 10)}</p>
                    <p className="mt-0.5 text-[9.5px] uppercase tracking-[0.18em] text-gold">
                      {MONTHS[Number(e.date.slice(5, 7)) - 1].slice(0, 3)}
                    </p>
                  </div>
                </Photo>

                <div className="px-6 py-6">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={e.category === 'Festival' ? 'ember' : 'gold'}>{e.category}</Badge>
                    <Badge tone="neem">{relativeDay(e.date)}</Badge>
                  </div>
                  <h3 className="mt-4 text-balance text-[19px] leading-snug">{e.title}</h3>
                  <p className="mt-2.5 line-clamp-3 text-[13.5px] leading-relaxed text-ink-soft">{e.summary}</p>
                  <p className="mt-4 text-[12px] text-ink-faint">
                    {e.templeIds === 'all' ? 'All ten sannidhis' : `${e.templeIds.length} sannidhis`}
                    {e.endDate ? ` · ${fmtDayMonth(e.date)} – ${fmtDayMonth(e.endDate)}` : ''}
                  </p>
                  {e.rsvp && e.seats && (
                    <div className="mt-4">
                      <Progress value={e.seatsTaken ?? 0} max={e.seats} />
                      <p className="mt-2 flex items-center gap-1.5 text-[11px] text-ink-faint">
                        <Users size={11} /> {e.seatsTaken} of {e.seats} places reserved
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>

      <Section wide className="pb-24">
        <Panel className="reveal flex flex-col items-center gap-5 px-8 py-12 text-center">
          <p className="font-deva text-[15px] text-gold">श्रद्धा और सबूरी</p>
          <h2 className="max-w-2xl text-balance text-3xl leading-tight">
            Every festival ends the same way — with everyone eating together.
          </h2>
          <p className="max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
            Annadanam is served at every event in this calendar, free, to anyone who comes. Sponsor a day, or come
            and cook.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/annadanam" size="lg">
              Sponsor annadanam
            </Button>
            <Button to="/volunteer" variant="outline" size="lg">
              Volunteer in the kitchen
            </Button>
          </div>
        </Panel>
      </Section>
    </div>
  )
}

function CalendarView({
  cursor,
  setCursor,
  list,
}: {
  cursor: Date
  setCursor: (d: Date) => void
  list: typeof events
}) {
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const byDay = useMemo(() => {
    const y = cursor.getFullYear()
    const mo = cursor.getMonth()
    const map = new Map<number, typeof events>()
    list.forEach((e) => {
      const start = new Date(`${e.date}T12:00:00`)
      const end = new Date(`${e.endDate ?? e.date}T12:00:00`)
      for (const d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        if (d.getFullYear() === y && d.getMonth() === mo) {
          const k = d.getDate()
          map.set(k, [...(map.get(k) ?? []), e])
        }
      }
    })
    return map
  }, [list, cursor])

  const cells = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  const today = new Date()
  const isThisMonth = today.getFullYear() === year && today.getMonth() === month

  return (
    <Panel className="reveal px-6 py-7 sm:px-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCursor(new Date(year, month - 1, 1))}
          className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
        >
          <ChevronLeft size={15} />
        </button>
        <h3 className="font-display text-2xl">
          {MONTHS[month]} <span className="text-ink-faint">{year}</span>
        </h3>
        <button
          onClick={() => setCursor(new Date(year, month + 1, 1))}
          className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
        >
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="mt-7 grid grid-cols-7 gap-1.5 sm:gap-2.5">
        {DOW.map((d, i) => (
          <div key={i} className="pb-2 text-center text-[10px] uppercase tracking-[0.2em] text-gold">
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          if (day === null) return <div key={`e${i}`} />
          const dayEvents = byDay.get(day) ?? []
          const isToday = isThisMonth && today.getDate() === day
          const isThursday = new Date(year, month, day).getDay() === 4
          return (
            <div
              key={day}
              className={cn(
                'min-h-[84px] rounded-xl border p-2 transition-colors sm:min-h-[104px]',
                dayEvents.length > 0
                  ? 'border-line-strong bg-surface-2/60'
                  : isThursday
                    ? 'border-ember/20 bg-ember/[0.04]'
                    : 'border-line',
                isToday && 'ring-1 ring-ember',
              )}
            >
              <p
                className={cn(
                  'text-[12px]',
                  isToday ? 'font-medium text-ember' : dayEvents.length ? 'text-ink' : 'text-ink-faint',
                )}
              >
                {day}
              </p>
              <div className="mt-1 space-y-1">
                {dayEvents.slice(0, 2).map((e) => (
                  <Link
                    key={e.id}
                    to={`/events/${e.id}`}
                    className="block truncate rounded-md bg-ember/15 px-1.5 py-0.5 text-[9.5px] leading-tight text-ember-soft transition-colors hover:bg-ember/25"
                  >
                    {e.title}
                  </Link>
                ))}
                {dayEvents.length > 2 && (
                  <p className="px-1.5 text-[9.5px] text-ink-faint">+{dayEvents.length - 2} more</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <p className="mt-6 flex flex-wrap items-center gap-5 border-t border-line pt-5 text-[11.5px] text-ink-faint">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded bg-ember/25" /> Festival or event
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded border border-ember/30 bg-ember/[0.06]" /> Thursday — palki & annadanam
        </span>
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded ring-1 ring-ember" /> Today
        </span>
        <span className="ml-auto">{temples.length} sannidhis follow this calendar</span>
      </p>
    </Panel>
  )
}
