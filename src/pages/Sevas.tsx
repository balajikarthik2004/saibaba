import { useMemo, useState } from 'react'
import { Check, Search, X } from 'lucide-react'
import { gotras, nakshatras, sevaCategories, sevas } from '../data/sevas'
import { temples } from '../data/temples'
import { useApp } from '../lib/store'
import type { Seva } from '../lib/types'
import { cn, usd, useReveal } from '../lib/utils'
import { Divider, Mandala } from '../components/Sacred'
import { Badge, Button, Chip, Field, Input, PageHeader, Panel, Section, Select, Textarea } from '../components/ui'

const timeSlots = ['06:30', '08:00', '09:30', '11:00', '12:00', '16:00', '17:30', '18:30', '20:00']

export default function Sevas() {
  const ref = useReveal<HTMLDivElement>()
  const [category, setCategory] = useState<string>('All')
  const [place, setPlace] = useState<string>('All')
  const [query, setQuery] = useState('')
  const [booking, setBooking] = useState<Seva | null>(null)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    return sevas.filter((s) => {
      const catOk = category === 'All' || s.category === category
      const placeOk = place === 'All' || s.performedAt.includes(place as 'Temple' | 'Home' | 'Virtual')
      const qOk = !q || `${s.name} ${s.description} ${s.category}`.toLowerCase().includes(q)
      return catOk && placeOk && qOk
    })
  }, [category, place, query])

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="Sevas & poojas"
        title="Offer a seva in your name and gotra"
        sub="Twenty sevas, from a twenty-minute archana to a full temple wedding. Anything marked Virtual is performed at the sannidhi and the prasad posted to you."
      />

      <Section wide className="pt-0">
        <Panel className="reveal mb-10 px-7 py-7">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[240px] flex-1">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search sevas â€” archana, abhishekam, homamâ€¦"
                className="pl-11"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Temple', 'Home', 'Virtual'].map((p) => (
                <Chip key={p} active={place === p} onClick={() => setPlace(p)}>
                  {p === 'All' ? 'Anywhere' : p}
                </Chip>
              ))}
            </div>
          </div>
          <Divider className="my-6" icon="dot" />
          <div className="flex flex-wrap gap-2">
            <Chip active={category === 'All'} onClick={() => setCategory('All')}>
              All categories
            </Chip>
            {sevaCategories.map((c) => (
              <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </Panel>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((s) => (
            <Panel key={s.id} hover className="reveal flex flex-col px-7 py-7">
              <div className="flex items-start justify-between gap-4">
                <Badge tone={s.popular ? 'ember' : 'gold'}>{s.popular ? 'Most offered' : s.category}</Badge>
                <span className="font-display text-2xl ember-text">{usd(s.price)}</span>
              </div>

              {s.sanskrit && <p className="mt-5 font-deva text-[14px] text-gold-light/80">{s.sanskrit}</p>}
              <h3 className="mt-1 text-balance text-[19px] leading-snug">{s.name}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{s.description}</p>

              <ul className="mt-5 flex-1 space-y-2">
                {s.includes.map((inc) => (
                  <li key={inc} className="flex items-start gap-2.5 text-[12.5px] text-ink-soft">
                    <Check size={12} className="mt-1 shrink-0 text-ember" />
                    {inc}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-ink-faint">
                <span className="rounded-full border border-line px-2.5 py-1">{s.duration}</span>
                {s.performedAt.map((p) => (
                  <span key={p} className="rounded-full border border-line px-2.5 py-1">
                    {p}
                  </span>
                ))}
                {s.bestDay && <span className="rounded-full border border-line px-2.5 py-1">{s.bestDay}</span>}
              </div>

              <Button onClick={() => setBooking(s)} className="mt-6" full>
                Book this seva
              </Button>
            </Panel>
          ))}
        </div>

        {list.length === 0 && (
          <Panel className="px-8 py-16 text-center">
            <p className="font-display text-xl">No seva matches that</p>
            <p className="mt-3 text-sm text-ink-soft">Try clearing the filters, or call your sannidhi directly.</p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-6"
              onClick={() => {
                setQuery('')
                setCategory('All')
                setPlace('All')
              }}
            >
              Clear filters
            </Button>
          </Panel>
        )}
      </Section>

      <Section wide className="pb-24">
        <Panel className="reveal relative overflow-hidden px-8 py-12">
          <Mandala className="pointer-events-none absolute -right-32 -top-32 size-[420px] opacity-[0.12] animate-slow-spin" />
          <div className="relative grid gap-8 md:grid-cols-3">
            {[
              {
                t: 'What is a gotra?',
                b: 'A paternal lineage name used in the sankalpa so the seva is offered specifically for you. If you do not know yours, choose "Not known" â€” the priest uses the universal Kashyapa gotra, which is the traditional provision for exactly that case.',
              },
              {
                t: 'Can I book from far away?',
                b: 'Yes. Any seva marked Virtual is performed at the sannidhi in your name, recorded or streamed for you, and the prasad, Udi and kumkum are posted anywhere in the United States.',
              },
              {
                t: 'Is this tax-deductible?',
                b: 'Seva offerings to a 501(c)(3) temple are generally deductible to the extent allowed by law. A receipt with the EIN is emailed immediately and a consolidated statement is issued each January.',
              },
            ].map((f) => (
              <div key={f.t}>
                <p className="font-display text-[17px] text-ink">{f.t}</p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{f.b}</p>
              </div>
            ))}
          </div>
        </Panel>
      </Section>

      {booking && <BookingModal seva={booking} onClose={() => setBooking(null)} />}
    </div>
  )
}

/* ---------------- booking modal ---------------- */

function BookingModal({ seva, onClose }: { seva: Seva; onClose: () => void }) {
  const { temple, addToCart, profile } = useApp()
  const [tomorrow] = useState(() => new Date(Date.now() + 86400000).toISOString().slice(0, 10))

  const [form, setForm] = useState({
    templeId: temple.id,
    date: tomorrow,
    time: timeSlots[4],
    devotee: profile.name === 'Devotee' ? '' : profile.name,
    gotra: profile.gotra,
    nakshatra: profile.nakshatra,
    note: '',
    performedAt: seva.performedAt[0] as string,
  })
  const [error, setError] = useState('')

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }))

  const submit = () => {
    if (!form.devotee.trim()) {
      setError('Please enter the name the sankalpa should be made in.')
      return
    }
    addToCart({
      sevaId: seva.id,
      name: seva.name,
      price: seva.price,
      templeId: form.templeId,
      date: form.date,
      time: form.time,
      devotee: form.devotee.trim(),
      gotra: form.gotra,
      nakshatra: form.nakshatra,
      note: form.note.trim(),
      performedAt: form.performedAt,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center px-4 py-8">
      <button className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <Panel className="rise-in relative z-10 max-h-[88vh] w-[min(96vw,640px)] overflow-y-auto px-7 py-8 sm:px-9">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:text-ink"
        >
          <X size={15} />
        </button>

        <Badge tone="gold">{seva.category}</Badge>
        {seva.sanskrit && <p className="mt-4 font-deva text-[15px] text-gold-light/80">{seva.sanskrit}</p>}
        <h2 className="mt-1 text-balance font-display text-[26px] leading-snug">{seva.name}</h2>
        <p className="mt-2 text-[13px] text-ink-faint">
          {usd(seva.price)} Â· {seva.duration}
        </p>

        <Divider className="my-6" icon="diya" />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Sannidhi" required>
            <Select value={form.templeId} onChange={(e) => set('templeId', e.target.value)}>
              {temples.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.shortName} â€” {t.city}, {t.stateCode}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Performed at" required>
            <Select value={form.performedAt} onChange={(e) => set('performedAt', e.target.value)}>
              {seva.performedAt.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Date" required>
            <Input type="date" value={form.date} min={tomorrow} onChange={(e) => set('date', e.target.value)} />
          </Field>

          <Field label="Preferred time" hint="Confirmed by the temple office">
            <Select value={form.time} onChange={(e) => set('time', e.target.value)}>
              {timeSlots.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
          </Field>

          <div className="sm:col-span-2">
            <Field label="Name for the sankalpa" required>
              <Input
                value={form.devotee}
                onChange={(e) => {
                  set('devotee', e.target.value)
                  setError('')
                }}
                placeholder="The name the priest should read aloud"
              />
            </Field>
          </div>

          {seva.requiresGotra && (
            <>
              <Field label="Gotra" hint="Choose â€œNot knownâ€ if unsure">
                <Select value={form.gotra} onChange={(e) => set('gotra', e.target.value)}>
                  {gotras.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Nakshatra">
                <Select value={form.nakshatra} onChange={(e) => set('nakshatra', e.target.value)}>
                  {nakshatras.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Select>
              </Field>
            </>
          )}

          <div className="sm:col-span-2">
            <Field label="Sankalpa or note" hint="A prayer, a dedication, or a name to remember">
              <Textarea
                value={form.note}
                onChange={(e) => set('note', e.target.value)}
                placeholder="For the health of my mother Â· In memory ofâ€¦"
              />
            </Field>
          </div>
        </div>

        {error && (
          <p className={cn('mt-5 rounded-xl border border-kumkum/40 bg-kumkum/10 px-4 py-3 text-[13px] text-kumkum')}>
            {error}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <span className="font-display text-2xl ember-text">{usd(seva.price)}</span>
          <div className="flex gap-3">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={submit}>Add to seva basket</Button>
          </div>
        </div>
      </Panel>
    </div>
  )
}
