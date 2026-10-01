import { useState } from 'react'
import { Check, Users, X } from 'lucide-react'
import { volunteerRoles } from '../data/community'
import { temples } from '../data/temples'
import { useApp } from '../lib/store'
import type { VolunteerRole } from '../lib/types'
import { cn, useReveal } from '../lib/utils'
import { Divider, EmberField, Mandala } from '../components/Sacred'
import { Badge, Button, Field, Input, PageHeader, Panel, Progress, Section, SectionHeading, Select, Stat, Textarea } from '../components/ui'

export default function Volunteer() {
  const { notify, profile } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [applying, setApplying] = useState<VolunteerRole | null>(null)
  const [joined, setJoined] = useState<string[]>([])

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="Seva"
        title="He swept the floor Himself"
        sub="Baba ground wheat, tended lamps, nursed the sick and cooked for the village. Nothing in a temple runs without hands â€” here is where yours fit."
      />

      <Section wide className="pt-0">
        <Panel className="reveal relative overflow-hidden px-8 py-12">
          <EmberField count={12} />
          <Mandala className="pointer-events-none absolute -left-32 -top-32 size-[420px] opacity-[0.12] animate-reverse-spin" />
          <div className="relative grid gap-8 sm:grid-cols-4">
            <Stat value="640" label="Volunteers" sub="across ten sannidhis" />
            <Stat value="8" label="Teams" sub="kitchen to media" />
            <Stat value="0" label="Experience needed" />
            <Stat value="2 hr" label="Smallest shift" sub="per week" />
          </div>
        </Panel>
      </Section>

      <Section wide className="py-14">
        <SectionHeading
          align="left"
          eyebrow="Open roles"
          title="Where hands are needed this season"
          sub="Every role comes with training and somebody who has done it for years standing next to you."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {volunteerRoles.map((r) => {
            const isJoined = joined.includes(r.id)
            const open = r.slots - r.filled
            return (
              <Panel key={r.id} hover className="reveal flex flex-col px-7 py-8">
                <div className="flex items-start justify-between gap-3">
                  <Badge tone={open <= 3 ? 'kumkum' : 'gold'}>{open <= 3 ? `Only ${open} left` : r.team}</Badge>
                  <span className="flex items-center gap-1.5 text-[11.5px] text-ink-faint">
                    <Users size={11} /> {r.filled}/{r.slots}
                  </span>
                </div>

                <h3 className="mt-5 text-balance font-display text-[20px] leading-snug">{r.title}</h3>
                <p className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-gold">{r.commitment}</p>
                <p className="mt-4 flex-1 text-[13.5px] leading-relaxed text-ink-soft">{r.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {r.skills.map((s) => (
                    <span key={s} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-ink-faint">
                      {s}
                    </span>
                  ))}
                </div>

                <div className="mt-6">
                  <Progress value={r.filled} max={r.slots} />
                </div>

                <Button
                  onClick={() => setApplying(r)}
                  variant={isJoined ? 'ghost' : 'primary'}
                  className="mt-5"
                  full
                  disabled={isJoined}
                >
                  {isJoined ? (
                    <>
                      <Check size={14} /> You are signed up
                    </>
                  ) : (
                    'Sign up for this seva'
                  )}
                </Button>
              </Panel>
            )
          })}
        </div>
      </Section>

      <Section wide className="pb-24">
        <Panel className="reveal grid overflow-hidden lg:grid-cols-2">
          <div className="px-8 py-12 sm:px-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Nishkama Seva</p>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight">
              The dakshina Baba asked for was never only money.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft">
              He asked one devotee for two rupees and another for nothing at all, because what He wanted from each
              was the thing they were holding onto. Three hours chopping onions with seven aunties who talk over
              you is the same transaction.
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              There is no minimum. Come once for a festival, or every Thursday at four in the morning. Nobody
              keeps score except the kitchen roster.
            </p>
          </div>
          <div className="border-t border-line px-8 py-12 sm:px-12 lg:border-l lg:border-t-0">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">What volunteers tell us</p>
            <Divider className="my-6 max-w-[180px]" icon="dot" />
            <blockquote className="font-quote text-[19px] italic leading-relaxed text-ink">
              â€œI signed up because I wanted to feel useful, and I was given the least interesting job in the
              building. By the end of it I had not thought about my job once.â€
            </blockquote>
            <p className="mt-5 text-[12.5px] text-ink-faint">Priya N. Â· Suwanee, GA Â· Kitchen team</p>
          </div>
        </Panel>
      </Section>

      {applying && (
        <ApplyModal
          role={applying}
          defaultName={profile.name === 'Devotee' ? '' : profile.name}
          defaultEmail={profile.email}
          onClose={() => setApplying(null)}
          onDone={() => {
            setJoined((j) => [...j, applying.id])
            setApplying(null)
            notify('Welcome to the team', `The ${applying.team} coordinator will be in touch this week`)
          }}
        />
      )}
    </div>
  )
}

function ApplyModal({
  role,
  onClose,
  onDone,
  defaultName,
  defaultEmail,
}: {
  role: VolunteerRole
  onClose: () => void
  onDone: () => void
  defaultName: string
  defaultEmail: string
}) {
  const { temple } = useApp()
  const [form, setForm] = useState({
    name: defaultName,
    email: defaultEmail,
    phone: '',
    templeId: temple.id,
    note: '',
  })
  const [error, setError] = useState('')

  const submit = () => {
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are needed so the coordinator can reach you.')
      return
    }
    onDone()
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center px-4 py-8">
      <button className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <Panel className="rise-in relative z-10 max-h-[88vh] w-[min(96vw,560px)] overflow-y-auto px-8 py-9">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:text-ink"
        >
          <X size={15} />
        </button>

        <Badge tone="gold">{role.team}</Badge>
        <h2 className="mt-4 font-display text-[26px] leading-snug">{role.title}</h2>
        <p className="mt-1.5 text-[12.5px] text-gold">{role.commitment}</p>
        <Divider className="my-6" icon="diya" />

        <div className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" required>
              <Input
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value })
                  setError('')
                }}
              />
            </Field>
            <Field label="Email" required>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value })
                  setError('')
                }}
              />
            </Field>
            <Field label="Phone">
              <Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label="Sannidhi">
              <Select value={form.templeId} onChange={(e) => setForm({ ...form, templeId: e.target.value })}>
                {temples.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.shortName}
                  </option>
                ))}
              </Select>
            </Field>
          </div>

          <Field label="Anything the coordinator should know" hint="Availability, skills, or nothing at all">
            <Textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="I can do alternate Thursdays, and I have a food handler card."
            />
          </Field>
        </div>

        {error && (
          <p className={cn('mt-5 rounded-xl border border-kumkum/40 bg-kumkum/10 px-4 py-3 text-[13px] text-kumkum')}>
            {error}
          </p>
        )}

        <div className="mt-7 flex justify-end gap-3 border-t border-line pt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>Sign me up</Button>
        </div>
      </Panel>
    </div>
  )
}
