import { useMemo, useState } from 'react'
import { BookOpen, Check, RotateCcw, Search, X } from 'lucide-react'
import { chapters, saptahDays } from '../data/satcharitra'
import { useApp } from '../lib/store'
import type { Chapter } from '../lib/types'
import { cn, useReveal } from '../lib/utils'
import { Divider, Mandala, OmMark } from '../components/Sacred'
import { Badge, Button, Chip, PageHeader, Panel, Progress, Section, Stat } from '../components/ui'
import { photos } from '../data/images'

export default function Satcharitra() {
  const { parayan, toggleParayanChapter, resetParayan, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [day, setDay] = useState<number | 'all'>('all')
  const [query, setQuery] = useState('')
  const [reading, setReading] = useState<Chapter | null>(null)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return chapters.filter((c) => {
      const dayOk = day === 'all' || c.day === day
      const qOk = !q || `${c.n} ${c.title} ${c.theme} ${c.excerpt}`.toLowerCase().includes(q)
      return dayOk && qOk
    })
  }, [day, query])

  const pct = Math.round((parayan.length / chapters.length) * 100)
  const currentDay = saptahDays.find((d) => d.chapters.some((c) => !parayan.includes(c.n)))?.day ?? 7

  return (
    <div ref={ref}>
      <PageHeader
        photo={photos.babaSeated}
        eyebrow="Shri Sai Satcharitra"
        title="Fifty-three chapters, seven days"
        sub="Hemadpant wrote it down because Baba told him to. The Saptah Parayan reads the whole book from one Thursday to the next — track yours here."
      />

      <Section wide className="pt-0">
        {/* parayan tracker */}
        <Panel className="reveal relative overflow-hidden px-8 py-9">
          <Mandala className="pointer-events-none absolute -right-36 -top-36 size-[480px] opacity-[0.13] animate-slow-spin" />
          <div className="relative grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your parayan</p>
              <h2 className="mt-3 font-display text-3xl">
                {parayan.length === 0
                  ? 'Begin on a Thursday'
                  : parayan.length === 53
                    ? 'Saptah complete — udyapan and annadanam'
                    : `Day ${currentDay} of the Saptah`}
              </h2>
              <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-soft">
                Traditionally the Saptah begins on a Thursday and concludes the following Thursday, with a lamp
                kept lit and the book never placed on the floor. Mark each chapter as you finish it.
              </p>

              <div className="mt-7">
                <Progress value={parayan.length} max={53} />
                <div className="mt-3 flex items-baseline justify-between">
                  <span className="font-display text-2xl ember-text">
                    {parayan.length} <span className="text-ink-faint text-base">/ 53</span>
                  </span>
                  <span className="text-[12px] text-ink-faint">{pct}% read</span>
                </div>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    resetParayan()
                    notify('Parayan reset', 'Begin again whenever you are ready')
                  }}
                >
                  <RotateCcw size={13} /> Start a new Saptah
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    const next = chapters.find((c) => !parayan.includes(c.n))
                    if (next) {
                      setReading(next)
                    } else {
                      notify('All 53 chapters read', 'Om Sai Ram')
                    }
                  }}
                >
                  <BookOpen size={13} /> Continue reading
                </Button>
              </div>
            </div>

            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The seven days</p>
              <div className="mt-4 space-y-2">
                {saptahDays.map((d) => {
                  const read = d.chapters.filter((c) => parayan.includes(c.n)).length
                  const complete = read === d.chapters.length
                  return (
                    <button
                      key={d.day}
                      onClick={() => setDay(day === d.day ? 'all' : d.day)}
                      className={cn(
                        'flex w-full items-center gap-4 rounded-xl border px-4 py-3 text-left transition-colors',
                        day === d.day ? 'border-ember/45 bg-ember/10' : 'border-line hover:border-line-strong',
                      )}
                    >
                      <span
                        className={cn(
                          'grid size-8 shrink-0 place-items-center rounded-full border text-[12px]',
                          complete
                            ? 'border-ember/50 bg-ember/15 text-ember'
                            : 'border-line text-ink-faint',
                        )}
                      >
                        {complete ? <Check size={13} /> : d.day}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] text-ink">
                          Chapters {d.chapters[0].n}–{d.chapters[d.chapters.length - 1].n}
                        </span>
                        <span className="block text-[11.5px] text-ink-faint">
                          {read} of {d.chapters.length} read
                        </span>
                      </span>
                      <span className="w-14 shrink-0">
                        <Progress value={read} max={d.chapters.length} />
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </Panel>
      </Section>

      {/* chapter list */}
      <Section wide className="py-12">
        <div className="reveal mb-8 flex flex-wrap items-center gap-4">
          <div className="relative min-w-[240px] flex-1">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search chapters — Udi, Mahasamadhi, Dwarkamai…"
              className="w-full rounded-xl border border-line bg-bg-deep/60 px-4 py-3 pl-11 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-ember/70"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip active={day === 'all'} onClick={() => setDay('all')}>
              All 53
            </Chip>
            {saptahDays.map((d) => (
              <Chip key={d.day} active={day === d.day} onClick={() => setDay(d.day)}>
                Day {d.day}
              </Chip>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => {
            const read = parayan.includes(c.n)
            return (
              <Panel
                key={c.n}
                className={cn(
                  'reveal flex flex-col px-6 py-6 transition-all duration-500 hover:-translate-y-1',
                  read && 'border-[var(--c-line-strong)]',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="font-display text-3xl ember-text">{c.n}</span>
                  <div className="flex items-center gap-2">
                    <Badge>{c.theme}</Badge>
                    <button
                      onClick={() => toggleParayanChapter(c.n)}
                      className={cn(
                        'grid size-7 place-items-center rounded-full border transition-colors',
                        read
                          ? 'border-ember/50 bg-ember/15 text-ember'
                          : 'border-line text-ink-faint hover:border-line-strong hover:text-ink',
                      )}
                      aria-label={read ? 'Mark unread' : 'Mark read'}
                    >
                      <Check size={12} />
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 text-balance text-[16px] leading-snug">{c.title}</h3>
                <p className="mt-3 line-clamp-3 flex-1 font-quote text-[15px] italic leading-relaxed text-ink-soft">
                  {c.excerpt}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-[11px] text-ink-faint">
                    Day {c.day} · {c.verses} ovis
                  </span>
                  <button
                    onClick={() => setReading(c)}
                    className="text-[12px] text-gold transition-colors hover:text-ember"
                  >
                    Read →
                  </button>
                </div>
              </Panel>
            )
          })}
        </div>
      </Section>

      <Section wide className="pb-24">
        <Panel className="reveal px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-4">
            <Stat value="53" label="Chapters" />
            <Stat value="7" label="Days of Saptah" />
            <Stat value="1930" label="First published" sub="Marathi ovi" />
            <Stat value={`${pct}%`} label="Your progress" />
          </div>
        </Panel>
      </Section>

      {reading && (
        <ReaderModal
          chapter={reading}
          onClose={() => setReading(null)}
          onMarkRead={() => {
            if (!parayan.includes(reading.n)) toggleParayanChapter(reading.n)
            const next = chapters.find((c) => c.n > reading.n)
            setReading(next ?? null)
          }}
          isRead={parayan.includes(reading.n)}
        />
      )}
    </div>
  )
}

function ReaderModal({
  chapter,
  onClose,
  onMarkRead,
  isRead,
}: {
  chapter: Chapter
  onClose: () => void
  onMarkRead: () => void
  isRead: boolean
}) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center px-4 py-8">
      <button className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <Panel className="rise-in relative z-10 max-h-[88vh] w-[min(96vw,720px)] overflow-y-auto px-8 py-9 sm:px-12">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:text-ink"
        >
          <X size={15} />
        </button>

        <div className="text-center">
          <OmMark size={26} className="mx-auto text-gold" />
          <p className="mt-4 text-[10px] uppercase tracking-[0.34em] text-gold">
            Adhyaya {chapter.n} · Day {chapter.day} of the Saptah
          </p>
          <h2 className="mt-4 text-balance font-display text-3xl leading-snug">{chapter.title}</h2>
          <Divider className="mx-auto mt-7 max-w-xs" icon="diya" />
        </div>

        <p className="mt-8 font-quote text-[21px] italic leading-[1.75] text-ink">{chapter.excerpt}</p>

        <p className="mt-7 text-[14px] leading-[1.9] text-ink-soft">
          The full ovi text of this chapter sits here in the published edition — {chapter.verses} verses in the
          original Marathi, with English, Hindi, Telugu and Tamil translations side by side. In this demonstration
          build the reader shows the chapter’s opening passage only; the complete text arrives with the backend,
          along with the recorded parayan audio read by the temple archakas.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <span className="text-[12px] text-ink-faint">
            Theme: <span className="text-gold-light">{chapter.theme}</span>
          </span>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button onClick={onMarkRead}>
              <Check size={14} /> {isRead ? 'Next chapter' : 'Mark read & continue'}
            </Button>
          </div>
        </div>
      </Panel>
    </div>
  )
}
