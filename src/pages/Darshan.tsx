import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Maximize2, Radio, Send, Volume2 } from 'lucide-react'
import { temples } from '../data/temples'
import { useApp } from '../lib/store'
import { aartiStatus, clockIn, cn, to12h, useReveal, useTick } from '../lib/utils'
import { BabaSilhouette, Divider, EmberField, Mandala, OmMark } from '../components/Sacred'
import { Badge, Button, Input, PageHeader, Panel, Section } from '../components/ui'

const seedChat = [
  { who: 'Anitha, Fremont CA', msg: 'Om Sai Ram from California ðŸ™' },
  { who: 'Ramesh, Edison NJ', msg: 'Watching with my mother, she cannot travel any more. Thank you for this.' },
  { who: 'Sandhya, Toronto', msg: 'Om Sai Ram ðŸª”' },
  { who: 'Deepak, Plano TX', msg: 'The Udi reached us yesterday. Grateful.' },
  { who: 'Meena, Seattle WA', msg: 'Shraddha and Saburi ðŸ™' },
]

export default function Darshan() {
  const { temple, setTempleId, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  useTick(20_000)

  const [chat, setChat] = useState(seedChat)
  const [draft, setDraft] = useState('')
  const [reminders, setReminders] = useState<string[]>([])

  const live = temples.filter((t) => t.liveDarshan)
  const status = aartiStatus(temple)
  const streaming = temple.liveDarshan

  const send = () => {
    if (!draft.trim()) return
    setChat((c) => [...c, { who: 'You', msg: draft.trim() }])
    setDraft('')
  }

  const toggleReminder = (key: string) => {
    setReminders((r) => {
      const next = r.includes(key) ? r.filter((x) => x !== key) : [...r, key]
      notify(
        r.includes(key) ? 'Reminder removed' : 'Reminder set',
        r.includes(key) ? undefined : 'We will nudge you ten minutes before',
      )
      return next
    })
  }

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="Live darshan"
        title="Darshan, wherever you are"
        sub="Eight sannidhis stream all four aartis. For devotees who are housebound, travelling, or a thousand miles from the nearest temple."
      />

      <Section wide className="pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* player */}
          <Panel className="reveal overflow-hidden">
            <div className="relative aspect-video overflow-hidden bg-bg-deep">
              <Mandala className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 opacity-[0.18] animate-slow-spin" />
              <EmberField count={20} />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <BabaSilhouette className="mx-auto w-[min(42vw,210px)] opacity-90" />
                  <p className="mt-4 font-deva text-[15px] text-gold">à¥ à¤¸à¤¾à¤ˆà¤‚ à¤°à¤¾à¤®</p>
                  <p className="mt-2 text-[13px] text-ink-soft">
                    {streaming
                      ? status.live
                        ? `${status.aarti.name} in progress`
                        : `Stream resumes at ${to12h(status.aarti.time)} ${temple.tzLabel}`
                      : `${temple.shortName} does not stream yet`}
                  </p>
                  <p className="mt-3 text-[11.5px] text-ink-faint">
                    Video player is mocked in this build â€” the real stream drops in here.
                  </p>
                </div>
              </div>

              <div className="absolute left-5 top-5 flex items-center gap-2">
                {streaming && status.live ? (
                  <span className="flex items-center gap-2 rounded-full bg-kumkum px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
                    <span className="size-1.5 animate-pulse rounded-full bg-white" /> Live
                  </span>
                ) : (
                  <Badge>{streaming ? 'Next aarti' : 'Offline'}</Badge>
                )}
                <Badge tone="gold">{temple.shortName}</Badge>
              </div>

              <div className="absolute bottom-5 right-5 flex gap-2">
                <button className="grid size-9 place-items-center rounded-full border border-line-strong bg-bg-deep/70 text-gold backdrop-blur">
                  <Volume2 size={15} />
                </button>
                <button className="grid size-9 place-items-center rounded-full border border-line-strong bg-bg-deep/70 text-gold backdrop-blur">
                  <Maximize2 size={15} />
                </button>
              </div>
            </div>

            <div className="px-7 py-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl">{temple.name}</h2>
                  <p className="mt-1.5 text-[12.5px] text-ink-faint">
                    {temple.city}, {temple.state} Â· {clockIn(temple.timezone)} {temple.tzLabel}
                  </p>
                </div>
                <Button to={`/temples/${temple.id}`} variant="ghost" size="sm">
                  About this sannidhi
                </Button>
              </div>

              <Divider className="my-6" icon="dot" />

              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Todayâ€™s stream schedule</p>
              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {temple.aartis.map((a) => {
                  const key = `${temple.id}-${a.key}`
                  const isLive = status.live && status.aarti.key === a.key
                  return (
                    <div
                      key={a.key}
                      className={cn(
                        'flex items-center justify-between rounded-xl border px-4 py-3',
                        isLive ? 'border-ember/45 bg-ember/10' : 'border-line',
                      )}
                    >
                      <span>
                        <span className="block text-[13.5px] text-ink">{a.name}</span>
                        <span className="block text-[11.5px] text-ink-faint">
                          {to12h(a.time)} {temple.tzLabel}
                        </span>
                      </span>
                      <button
                        onClick={() => toggleReminder(key)}
                        className={cn(
                          'grid size-8 place-items-center rounded-full border transition-colors',
                          reminders.includes(key)
                            ? 'border-ember/50 bg-ember/15 text-ember'
                            : 'border-line text-ink-faint hover:text-ink',
                        )}
                        aria-label="Remind me"
                      >
                        <Bell size={13} />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </Panel>

          {/* side */}
          <div className="space-y-6">
            <Panel className="reveal px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Streaming now</p>
              <div className="mt-4 space-y-1.5">
                {live.map((t) => {
                  const s = aartiStatus(t)
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTempleId(t.id)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left transition-colors',
                        t.id === temple.id ? 'bg-surface-2' : 'hover:bg-surface-2',
                      )}
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[13.5px] text-ink">{t.shortName}</span>
                        <span className="block text-[11.5px] text-ink-faint">
                          {s.live ? s.aarti.name : `Next ${to12h(s.aarti.time)} ${t.tzLabel}`}
                        </span>
                      </span>
                      {s.live ? (
                        <span className="flex items-center gap-1.5 text-[11px] text-ember">
                          <span className="size-1.5 animate-pulse rounded-full bg-ember" /> Live
                        </span>
                      ) : (
                        <Radio size={13} className="shrink-0 text-ink-faint" />
                      )}
                    </button>
                  )
                })}
              </div>
            </Panel>

            <Panel className="reveal flex h-[420px] flex-col px-6 py-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Devotees watching</p>
              <div className="mt-4 flex-1 space-y-3.5 overflow-y-auto pr-1">
                {chat.map((c, i) => (
                  <div key={i}>
                    <p className="text-[11px] text-gold-light/80">{c.who}</p>
                    <p className="mt-0.5 text-[13.5px] leading-relaxed text-ink-soft">{c.msg}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex gap-2 border-t border-line pt-4">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Om Sai Ramâ€¦"
                />
                <Button onClick={send} size="sm" className="shrink-0">
                  <Send size={14} />
                </Button>
              </div>
            </Panel>
          </div>
        </div>
      </Section>

      <Section wide className="pb-24">
        <Panel className="reveal flex flex-col items-center gap-5 px-8 py-12 text-center">
          <OmMark size={30} className="text-gold" />
          <h2 className="max-w-2xl text-balance text-3xl leading-tight">
            Two sannidhis still need a stream â€” and a volunteer to run it.
          </h2>
          <p className="max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
            Seattle and South Florida have the cameras but not the hands. If you can run OBS and an audio desk for
            two aartis a week, you put darshan in front of hundreds of housebound devotees.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button to="/volunteer" size="lg">
              Volunteer for media seva
            </Button>
            <Link
              to="/donate"
              className="inline-flex items-center justify-center rounded-full border border-line-strong px-8 py-4 text-base text-gold-light transition-colors hover:bg-gold/10"
            >
              Fund the equipment
            </Link>
          </div>
        </Panel>
      </Section>
    </div>
  )
}
