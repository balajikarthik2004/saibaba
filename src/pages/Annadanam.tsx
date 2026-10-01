import { useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Utensils } from 'lucide-react'
import { temples } from '../data/temples'
import { useApp } from '../lib/store'
import { cn, fmtDateLong, usd, useReveal } from '../lib/utils'
import { Divider, EmberField, Mandala } from '../components/Sacred'
import { Badge, Button, Field, Input, PageHeader, Panel, Section, SectionHeading, Select, Stat, Textarea } from '../components/ui'
import { photos } from '../data/images'

const tiers = [
  {
    id: 'half',
    name: 'Half day',
    price: 151,
    serves: '~150 plates',
    detail: 'One meal service — the noon annadanam after Madhyan Aarti.',
  },
  {
    id: 'full',
    name: 'Full day',
    price: 301,
    serves: '~400 plates',
    detail: 'Every devotee who comes for darshan that day eats as your guest.',
    popular: true,
  },
  {
    id: 'thursday',
    name: 'Thursday',
    price: 501,
    serves: '~900 plates',
    detail: 'Baba’s own day — the largest gathering of the week, palki and all.',
  },
  {
    id: 'festival',
    name: 'Festival day',
    price: 1101,
    serves: '2,000+ plates',
    detail: 'Punyatithi, Ram Navami or Navratri — the maha annadanam.',
  },
]

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/** Days already sponsored by other devotees (mock). */
const taken = new Set([3, 6, 9, 12, 13, 17, 20, 24, 27, 30])

export default function Annadanam() {
  const { temple, addBooking, profile, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()

  const [cursor, setCursor] = useState(() => new Date(2026, 10, 1))
  const [picked, setPicked] = useState<number | null>(null)
  const [tier, setTier] = useState('full')
  const [templeId, setTempleId] = useState(temple.id)
  const [name, setName] = useState(profile.name === 'Devotee' ? '' : profile.name)
  const [dedication, setDedication] = useState('')
  const [done, setDone] = useState(false)

  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstDow = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = [...Array(firstDow).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const selectedTier = tiers.find((t) => t.id === tier)!
  const isoDate = picked
    ? `${year}-${String(month + 1).padStart(2, '0')}-${String(picked).padStart(2, '0')}`
    : ''

  const confirm = () => {
    if (!picked) {
      notify('Choose a day', 'Pick a date from the calendar first')
      return
    }
    if (!name.trim()) {
      notify('A name is needed', 'So the priest can read it at the aartis')
      return
    }
    addBooking({
      kind: 'annadanam',
      title: `Annadanam — ${selectedTier.name}`,
      templeId,
      date: isoDate,
      amount: selectedTier.price,
      devotee: name.trim(),
      note: dedication.trim() || undefined,
    })
    setDone(true)
    notify('Annadanam sponsored', `${fmtDateLong(isoDate)} at ${temples.find((t) => t.id === templeId)?.shortName}`)
  }

  return (
    <div ref={ref}>
      <PageHeader
        photo={photos.langarHall}
        eyebrow="Annadanam"
        title="Feed whoever comes to the door"
        sub="Baba begged bhiksha at five houses every day for sixty years and cooked for the whole village from one pot. Nobody was asked their name, caste or religion first."
      />

      {/* impact */}
      <Section wide className="pt-0">
        <Panel className="reveal relative overflow-hidden px-8 py-12">
          <EmberField count={14} />
          <Mandala className="pointer-events-none absolute -right-32 -top-32 size-[420px] opacity-[0.12] animate-slow-spin" />
          <div className="relative grid gap-8 sm:grid-cols-4">
            <Stat value="186,400" label="Meals a year" sub="across the network" />
            <Stat value="$0" label="Cost to eat" sub="always, for anyone" />
            <Stat value="640" label="Kitchen volunteers" />
            <Stat value="11" label="Food banks" sub="partnered locally" />
          </div>
        </Panel>
      </Section>

      {/* tiers */}
      <Section wide className="py-14">
        <SectionHeading
          align="left"
          eyebrow="Choose the scale"
          title="Sponsor a day of meals"
          sub="Your family is named as that day’s yajamana at all four aartis, and you are welcome to come and serve the meal yourself."
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {tiers.map((t) => (
            <button
              key={t.id}
              onClick={() => setTier(t.id)}
              className={cn(
                'reveal panel flex flex-col px-7 py-8 text-left transition-all duration-400',
                tier === t.id
                  ? 'border-[var(--c-line-strong)] shadow-[0_28px_64px_-32px_var(--c-ember)]'
                  : 'hover:-translate-y-1',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                {t.popular ? <Badge tone="ember">Most chosen</Badge> : <Badge>{t.serves}</Badge>}
                {tier === t.id && (
                  <span className="grid size-6 place-items-center rounded-full bg-ember/20 text-ember">
                    <Check size={13} />
                  </span>
                )}
              </div>
              <h3 className="mt-5 font-display text-[22px]">{t.name}</h3>
              <p className="mt-1 font-display text-3xl ember-text">{usd(t.price)}</p>
              <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-ink-soft">{t.detail}</p>
              <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-[12px] text-gold-light">
                <Utensils size={12} /> {t.serves}
              </p>
            </button>
          ))}
        </div>
      </Section>

      {/* calendar + form */}
      <Section wide className="py-6">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
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

            <div className="mt-7 grid grid-cols-7 gap-1.5 sm:gap-2">
              {DOW.map((d, i) => (
                <div key={i} className="pb-2 text-center text-[10px] uppercase tracking-[0.2em] text-gold">
                  {d}
                </div>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <div key={`e${i}`} />
                const isTaken = taken.has(day)
                const isThursday = new Date(year, month, day).getDay() === 4
                const isPicked = picked === day
                return (
                  <button
                    key={day}
                    disabled={isTaken}
                    onClick={() => setPicked(day)}
                    className={cn(
                      'grid aspect-square place-items-center rounded-xl border text-[13px] transition-all duration-300',
                      isTaken && 'cursor-not-allowed border-line bg-surface-2/40 text-ink-faint/50 line-through',
                      !isTaken && isPicked && 'border-transparent bg-gradient-to-br from-ember-soft to-ember text-[#1a0d04]',
                      !isTaken && !isPicked && isThursday && 'border-ember/30 bg-ember/[0.07] text-ember-soft hover:border-ember/60',
                      !isTaken && !isPicked && !isThursday && 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
                    )}
                  >
                    {day}
                  </button>
                )
              })}
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-5 border-t border-line pt-5 text-[11.5px] text-ink-faint">
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded border border-ember/30 bg-ember/[0.07]" /> Thursday
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded bg-surface-2" /> Already sponsored
              </span>
              <span className="flex items-center gap-2">
                <span className="size-2.5 rounded bg-ember" /> Your choice
              </span>
            </p>
          </Panel>

          <Panel className="reveal px-7 py-8">
            {done ? (
              <div className="py-6 text-center">
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-ember/40 bg-ember/10">
                  <Check size={22} className="text-ember" />
                </span>
                <p className="mt-5 font-deva text-[14px] text-gold">ॐ साईं राम</p>
                <h3 className="mt-3 font-display text-2xl">The day is yours</h3>
                <p className="mt-4 text-[13.5px] leading-relaxed text-ink-soft">
                  {fmtDateLong(isoDate)} at {temples.find((t) => t.id === templeId)?.shortName}. Your name will be
                  read at all four aartis, and the kitchen will expect you if you want to serve.
                </p>
                <div className="mt-7 flex flex-col gap-3">
                  <Button to="/dashboard/sevas" size="sm" full>
                    See it in My Seva
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    full
                    onClick={() => {
                      setDone(false)
                      setPicked(null)
                      setDedication('')
                    }}
                  >
                    Sponsor another day
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your sponsorship</p>
                <div className="mt-5 space-y-4">
                  <Field label="Day chosen">
                    <div
                      className={cn(
                        'rounded-xl border px-4 py-3 text-sm',
                        picked ? 'border-ember/40 bg-ember/10 text-ember-soft' : 'border-line text-ink-faint',
                      )}
                    >
                      {picked ? fmtDateLong(isoDate) : 'Pick a date from the calendar'}
                    </div>
                  </Field>

                  <Field label="Sannidhi" required>
                    <Select value={templeId} onChange={(e) => setTempleId(e.target.value)}>
                      {temples.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.shortName} — {t.city}, {t.stateCode}
                        </option>
                      ))}
                    </Select>
                  </Field>

                  <Field label="Name for the aarti" required>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Family name" />
                  </Field>

                  <Field label="Dedication" hint="In memory of, in gratitude for, on the occasion of…">
                    <Textarea
                      value={dedication}
                      onChange={(e) => setDedication(e.target.value)}
                      placeholder="In memory of my grandmother, Smt. Kamala"
                    />
                  </Field>
                </div>

                <Divider className="my-6" icon="dot" />

                <div className="flex items-baseline justify-between">
                  <span>
                    <span className="block text-[13px] text-ink">{selectedTier.name}</span>
                    <span className="block text-[11.5px] text-ink-faint">{selectedTier.serves}</span>
                  </span>
                  <span className="font-display text-3xl ember-text">{usd(selectedTier.price)}</span>
                </div>

                <Button onClick={confirm} className="mt-6" size="lg" full>
                  Sponsor this day
                </Button>
                <p className="mt-4 text-center text-[11.5px] leading-relaxed text-ink-faint">
                  Tax-deductible. Mock data — no payment is taken in this build.
                </p>
              </>
            )}
          </Panel>
        </div>
      </Section>

      <Section wide className="pb-24 pt-14">
        <Panel className="reveal flex flex-col items-center gap-5 px-8 py-12 text-center">
          <p className="font-deva text-[15px] text-gold">अन्नदानम्</p>
          <h2 className="max-w-2xl text-balance text-3xl leading-tight">
            “Feed the hungry before you worship Me.”
          </h2>
          <p className="max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
            If you would rather give your hands than your money, the kitchens start at four in the morning and
            there is always room for one more.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/volunteer" size="lg">
              Join the kitchen team
            </Button>
            <Button to="/donate" variant="outline" size="lg">
              Give to the Annadanam Fund
            </Button>
          </div>
        </Panel>
      </Section>
    </div>
  )
}
