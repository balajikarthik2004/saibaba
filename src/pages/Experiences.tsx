import { useMemo, useState } from 'react'
import { Flame, PenLine, X } from 'lucide-react'
import { experiences } from '../data/community'
import { useApp } from '../lib/store'
import type { Experience } from '../lib/types'
import { cn, fmtDate, slugId, useReveal } from '../lib/utils'
import { Divider, EmberField, Mandala, OmMark } from '../components/Sacred'
import { Button, Chip, Field, Input, PageHeader, Panel, Section, Textarea } from '../components/ui'
import { photos } from '../data/images'

const allTags = Array.from(new Set(experiences.flatMap((e) => e.tags))).sort()

export default function Experiences() {
  const { blessed, toggleBlessing, profile, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [tag, setTag] = useState('All')
  const [writing, setWriting] = useState(false)
  const [mine, setMine] = useState<Experience[]>([])

  const list = useMemo(() => {
    const all = [...mine, ...experiences]
    return tag === 'All' ? all : all.filter((e) => e.tags.includes(tag))
  }, [tag, mine])

  return (
    <div ref={ref}>
      <PageHeader
        photo={photos.devoteesPraying}
        eyebrow="Devotee experiences"
        title="What people actually say happened"
        sub="Unedited accounts from devotees across the network. Baba’s leelas were never argued into existence — they were told, by one person to another, over tea."
      >
        <Button onClick={() => setWriting(true)}>
          <PenLine size={15} /> Share your experience
        </Button>
      </PageHeader>

      <Section wide className="pt-0">
        <div className="reveal mb-9 flex flex-wrap gap-2">
          <Chip active={tag === 'All'} onClick={() => setTag('All')}>
            Everything
          </Chip>
          {allTags.map((t) => (
            <Chip key={t} active={tag === t} onClick={() => setTag(t)}>
              {t}
            </Chip>
          ))}
        </div>

        <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
          {list.map((e) => {
            const isBlessed = blessed.includes(e.id)
            return (
              <Panel key={e.id} className="reveal mb-5 break-inside-avoid px-7 py-8">
                <div className="flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>

                <h3 className="mt-5 text-balance font-display text-[20px] leading-snug">{e.title}</h3>
                <p className="mt-4 font-quote text-[17px] leading-[1.75] text-ink-soft">{e.body}</p>

                <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                  <span className="text-[12.5px]">
                    <span className="text-ink">{e.author}</span>
                    <span className="text-ink-faint"> · {e.city} · {fmtDate(e.date)}</span>
                  </span>
                  <button
                    onClick={() => toggleBlessing(e.id)}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11.5px] transition-colors',
                      isBlessed
                        ? 'border-ember/50 bg-ember/15 text-ember'
                        : 'border-line text-ink-faint hover:border-line-strong hover:text-ink',
                    )}
                  >
                    <Flame size={11} /> {e.blessings + (isBlessed ? 1 : 0)}
                  </button>
                </div>
              </Panel>
            )
          })}
        </div>
      </Section>

      <Section wide className="pb-24">
        <Panel className="reveal relative overflow-hidden px-8 py-14 text-center sm:px-16">
          <EmberField count={14} />
          <Mandala className="pointer-events-none absolute left-1/2 top-1/2 size-[460px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] animate-reverse-spin" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <OmMark size={28} className="mx-auto text-gold" />
            <h2 className="mt-6 text-balance text-3xl leading-tight">Hemadpant wrote his down. Write yours.</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              Baba told Hemadpant to collect the stories and keep a record, and said He would be the one doing the
              writing. Whatever brought you to the sannidhi — write it plainly. Someone reading it will need it.
            </p>
            <Button onClick={() => setWriting(true)} size="lg" className="mt-9">
              <PenLine size={16} /> Share your experience
            </Button>
          </div>
        </Panel>
      </Section>

      {writing && (
        <WriteModal
          onClose={() => setWriting(false)}
          onSubmit={(e) => {
            setMine((m) => [e, ...m])
            setWriting(false)
            notify('Thank you', 'Your account is with the editors for review')
          }}
          defaultName={profile.name === 'Devotee' ? '' : profile.name}
          defaultCity={profile.city}
        />
      )}
    </div>
  )
}

function WriteModal({
  onClose,
  onSubmit,
  defaultName,
  defaultCity,
}: {
  onClose: () => void
  onSubmit: (e: Experience) => void
  defaultName: string
  defaultCity: string
}) {
  const [form, setForm] = useState({
    title: '',
    author: defaultName,
    city: defaultCity,
    body: '',
    tags: [] as string[],
  })
  const [error, setError] = useState('')

  const toggleTag = (t: string) =>
    setForm((f) => ({ ...f, tags: f.tags.includes(t) ? f.tags.filter((x) => x !== t) : [...f.tags, t] }))

  const submit = () => {
    if (!form.title.trim() || !form.body.trim() || !form.author.trim()) {
      setError('A title, your name, and the account itself are needed.')
      return
    }
    onSubmit({
      id: slugId('x'),
      title: form.title.trim(),
      author: form.author.trim(),
      city: form.city.trim() || 'United States',
      date: new Date().toISOString().slice(0, 10),
      body: form.body.trim(),
      tags: form.tags.length ? form.tags : ['Experience'],
      blessings: 0,
    })
  }

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center px-4 py-8">
      <button className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
      <Panel className="rise-in relative z-10 max-h-[88vh] w-[min(96vw,640px)] overflow-y-auto px-8 py-9">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:text-ink"
        >
          <X size={15} />
        </button>

        <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Share your experience</p>
        <h2 className="mt-3 font-display text-3xl">Write it plainly</h2>
        <Divider className="my-6 max-w-xs" icon="diya" />

        <div className="space-y-5">
          <Field label="Title" required>
            <Input
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value })
                setError('')
              }}
              placeholder="The Udi my mother kept in her purse"
            />
          </Field>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" required>
              <Input
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                placeholder="First name and initial is fine"
              />
            </Field>
            <Field label="City">
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Plano, TX"
              />
            </Field>
          </div>

          <Field label="What happened" required hint="No need to polish it">
            <Textarea
              value={form.body}
              onChange={(e) => {
                setForm({ ...form, body: e.target.value })
                setError('')
              }}
              className="min-h-44"
              placeholder="Write it the way you would tell it to someone sitting next to you…"
            />
          </Field>

          <Field label="Tags">
            <div className="flex flex-wrap gap-2 pt-1">
              {allTags.map((t) => (
                <Chip key={t} active={form.tags.includes(t)} onClick={() => toggleTag(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Field>
        </div>

        {error && (
          <p className="mt-5 rounded-xl border border-kumkum/40 bg-kumkum/10 px-4 py-3 text-[13px] text-kumkum">
            {error}
          </p>
        )}

        <div className="mt-7 flex justify-end gap-3 border-t border-line pt-6">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>Submit for review</Button>
        </div>
      </Panel>
    </div>
  )
}
