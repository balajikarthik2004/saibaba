import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Download, Heart, Receipt, Save, Utensils } from 'lucide-react'
import { useApp } from '../lib/store'
import { templeById, temples } from '../data/temples'
import { gotras, nakshatras } from '../data/sevas'
import { galleryItems } from '../data/community'
import { chapters } from '../data/satcharitra'
import { cn, fmtDate, to12h, usd, useReveal } from '../lib/utils'
import { ArtTile, Divider, Mandala, OmMark } from '../components/Sacred'
import { Badge, Button, EmptyState, Field, Input, PageHeader, Panel, Progress, Section, Select, Stat } from '../components/ui'

const tabs = ['Sevas', 'Giving', 'Parayan', 'Saved', 'Profile'] as const
type Tab = (typeof tabs)[number]

export default function Account() {
  const { bookings, donations, parayan, favourites, profile, setProfile, temple, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [tab, setTab] = useState<Tab>('Sevas')
  const [draft, setDraft] = useState(profile)

  const givenThisYear = donations
    .filter((d) => d.date.startsWith(String(new Date().getFullYear())))
    .reduce((s, d) => s + d.amount, 0)
  const sevaTotal = bookings.reduce((s, b) => s + b.amount, 0)
  const upcoming = bookings.filter((b) => b.status !== 'Completed')

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="My seva"
        title={profile.name === 'Devotee' ? 'Om Sai Ram' : `Om Sai Ram, ${profile.name.split(' ')[0]}`}
        sub="Your sevas, your giving, your parayan and your sannidhi â€” kept in one place. Stored on this device only until the backend lands."
      />

      <Section wide className="pt-0">
        <Panel className="reveal relative overflow-hidden px-8 py-10">
          <Mandala className="pointer-events-none absolute -right-32 -top-32 size-[420px] opacity-[0.12] animate-slow-spin" />
          <div className="relative grid gap-8 sm:grid-cols-4">
            <Stat value={bookings.length} label="Sevas offered" />
            <Stat value={usd(sevaTotal + givenThisYear)} label="Given this year" />
            <Stat value={`${parayan.length}/53`} label="Parayan" />
            <Stat value={temple.shortName} label="Your sannidhi" />
          </div>
        </Panel>
      </Section>

      <Section wide className="pt-10">
        <div className="reveal mb-8 flex flex-wrap gap-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                'rounded-full border px-5 py-2.5 text-[13px] transition-all duration-300',
                tab === t
                  ? 'border-transparent bg-gradient-to-r from-ember to-ember-soft text-[#1a0d04]'
                  : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* SEVAS */}
        {tab === 'Sevas' && (
          <div className="space-y-4">
            {bookings.length === 0 ? (
              <EmptyState
                title="No sevas yet"
                body="Offer an archana, an abhishekam, or a day of annadanam â€” it will be registered in your name and gotra at the sannidhi you choose."
                action={<Button to="/sevas">Browse sevas</Button>}
              />
            ) : (
              <>
                {upcoming.length > 0 && (
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Upcoming</p>
                )}
                {bookings.map((b) => {
                  const t = templeById(b.templeId)
                  return (
                    <Panel key={b.id} className="reveal px-7 py-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone={b.kind === 'annadanam' ? 'neem' : b.kind === 'event' ? 'gold' : 'ember'}>
                              {b.kind === 'annadanam' ? (
                                <>
                                  <Utensils size={9} /> Annadanam
                                </>
                              ) : (
                                b.kind
                              )}
                            </Badge>
                            <Badge tone={b.status === 'Completed' ? 'gold' : 'neem'}>{b.status}</Badge>
                          </div>
                          <h3 className="mt-3 text-[17px] leading-snug">{b.title}</h3>
                          <p className="mt-1.5 text-[12.5px] text-ink-faint">
                            {t?.shortName} Â· {fmtDate(b.date)}
                            {b.time ? ` Â· ${to12h(b.time)}` : ''}
                            {b.gotra ? ` Â· ${b.gotra} gotra` : ''}
                          </p>
                          {b.note && (
                            <p className="mt-3 border-l border-line pl-4 font-quote text-[15px] italic text-ink-soft">
                              {b.note}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-display text-xl ember-text">{b.amount > 0 ? usd(b.amount) : 'Free'}</p>
                          <p className="mt-1 text-[11px] text-ink-faint">{b.id}</p>
                        </div>
                      </div>
                    </Panel>
                  )
                })}
              </>
            )}
          </div>
        )}

        {/* GIVING */}
        {tab === 'Giving' && (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="space-y-4">
              {donations.length === 0 ? (
                <EmptyState
                  title="No giving recorded yet"
                  body="Contributions to any of the six funds appear here with their receipt numbers, ready for your annual filing."
                  action={<Button to="/donate">See the funds</Button>}
                />
              ) : (
                donations.map((d) => (
                  <Panel key={d.id} className="reveal flex flex-wrap items-center justify-between gap-4 px-7 py-6">
                    <div>
                      <h3 className="text-[16px]">{d.campaignTitle}</h3>
                      <p className="mt-1.5 text-[12.5px] text-ink-faint">
                        {fmtDate(d.date)} Â· {d.frequency} Â· {templeById(d.templeId)?.shortName}
                      </p>
                      <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-gold">
                        <Receipt size={11} /> {d.receiptNo}
                      </p>
                    </div>
                    <span className="font-display text-2xl ember-text">{usd(d.amount)}</span>
                  </Panel>
                ))
              )}
            </div>

            <Panel className="reveal h-fit px-7 py-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                {new Date().getFullYear()} statement
              </p>
              <p className="mt-5 font-display text-4xl ember-text">{usd(givenThisYear)}</p>
              <p className="mt-1.5 text-[12.5px] text-ink-faint">
                across {donations.length} contribution{donations.length === 1 ? '' : 's'}
              </p>
              <Divider className="my-6" icon="dot" />
              <p className="text-[12.5px] leading-relaxed text-ink-soft">
                Sai Sannidhi Temple Network is a registered 501(c)(3) non-profit, EIN 00-0000000. A consolidated
                statement is issued each January.
              </p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-6"
                full
                onClick={() => notify('Statement requested', 'A PDF will be emailed once the backend is connected')}
              >
                <Download size={13} /> Download statement
              </Button>
            </Panel>
          </div>
        )}

        {/* PARAYAN */}
        {tab === 'Parayan' && (
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <Panel className="reveal relative overflow-hidden px-8 py-9">
              <Mandala
                rings={2}
                className="pointer-events-none absolute -bottom-24 -right-24 size-[300px] opacity-[0.14] animate-slow-spin"
              />
              <div className="relative">
                <OmMark size={26} className="text-gold" />
                <h3 className="mt-5 font-display text-2xl">Your Saptah</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                  The traditional parayan reads all 53 chapters from one Thursday to the next, with a lamp kept lit
                  and the book never placed on the floor.
                </p>
                <div className="mt-7">
                  <Progress value={parayan.length} max={53} />
                  <p className="mt-3 font-display text-3xl ember-text">
                    {parayan.length} <span className="text-base text-ink-faint">of 53</span>
                  </p>
                </div>
                <Button to="/satcharitra" className="mt-7" size="sm">
                  <BookOpen size={13} /> Continue reading
                </Button>
              </div>
            </Panel>

            <Panel className="reveal px-7 py-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Chapters read</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {chapters.map((c) => (
                  <span
                    key={c.n}
                    title={c.title}
                    className={cn(
                      'grid size-8 place-items-center rounded-lg border text-[11.5px] transition-colors',
                      parayan.includes(c.n)
                        ? 'border-ember/45 bg-ember/15 text-ember-soft'
                        : 'border-line text-ink-faint',
                    )}
                  >
                    {c.n}
                  </span>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {/* SAVED */}
        {tab === 'Saved' && (
          <>
            {favourites.length === 0 ? (
              <EmptyState
                title="Nothing saved yet"
                body="Tap the heart on any photograph in the gallery and it is kept here for you."
                action={<Button to="/gallery">Open the gallery</Button>}
              />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {galleryItems
                  .filter((g) => favourites.includes(g.id))
                  .map((g) => (
                    <Link key={g.id} to="/gallery" className="reveal group panel relative overflow-hidden">
                      <div className="relative h-48">
                        <ArtTile seed={g.art} className="transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/20 to-transparent" />
                        <Heart size={14} className="absolute right-4 top-4 text-kumkum" fill="currentColor" />
                        <div className="absolute inset-x-0 bottom-0 p-4">
                          <p className="text-balance text-[14px] leading-snug text-ink">{g.title}</p>
                          <p className="mt-0.5 text-[11px] text-ink-faint">{templeById(g.templeId)?.shortName}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}
          </>
        )}

        {/* PROFILE */}
        {tab === 'Profile' && (
          <Panel className="reveal mx-auto max-w-2xl px-8 py-9">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your details</p>
            <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
              Used to pre-fill sankalpa forms so you do not type your gotra every time. Stored in this browser only.
            </p>
            <Divider className="my-7" icon="dot" />

            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name">
                <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  value={draft.email}
                  onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                />
              </Field>
              <Field label="Phone">
                <Input type="tel" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
              </Field>
              <Field label="City">
                <Input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
              </Field>
              <Field label="Gotra" hint="Choose â€œNot knownâ€ if unsure">
                <Select value={draft.gotra} onChange={(e) => setDraft({ ...draft, gotra: e.target.value })}>
                  {gotras.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Nakshatra">
                <Select value={draft.nakshatra} onChange={(e) => setDraft({ ...draft, nakshatra: e.target.value })}>
                  {nakshatras.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
              <p className="text-[12px] text-ink-faint">
                Your sannidhi is <span className="text-gold-light">{temple.shortName}</span> Â·{' '}
                <Link to="/temples" className="text-gold hover:text-ember">
                  change it
                </Link>
              </p>
              <Button
                onClick={() => {
                  setProfile(draft)
                  notify('Saved', 'Your details will pre-fill seva forms')
                }}
              >
                <Save size={14} /> Save details
              </Button>
            </div>
          </Panel>
        )}
      </Section>

      <Section wide className="pb-24">
        <Panel className="reveal flex flex-wrap items-center justify-between gap-6 px-8 py-8">
          <div>
            <p className="font-display text-xl">Your sannidhi: {temple.name}</p>
            <p className="mt-1.5 text-[12.5px] text-ink-faint">
              {temple.city}, {temple.state} Â· {temple.phone}
            </p>
          </div>
          <div className="flex gap-3">
            <Button to={`/temples/${temple.id}`} variant="ghost" size="sm">
              Temple page
            </Button>
            <Button to="/sevas" size="sm">
              Offer a seva
            </Button>
          </div>
        </Panel>
        <p className="reveal mt-6 text-center text-[11.5px] text-ink-faint">
          {temples.length} sannidhis in the network Â· data in this build is stored locally and never sent anywhere
        </p>
      </Section>
    </div>
  )
}
