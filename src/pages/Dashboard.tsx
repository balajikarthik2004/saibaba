import { useState } from 'react'
import { Link, NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Download,
  Flame,
  Heart,
  HandHeart,
  LayoutDashboard,
  LogOut,
  Menu,
  Receipt,
  Save,
  Settings,
  Utensils,
  X,
} from 'lucide-react'
import { useApp } from '../lib/store'
import { templeById, temples } from '../data/temples'
import { gotras, nakshatras } from '../data/sevas'
import { galleryItems } from '../data/community'
import { chapters } from '../data/satcharitra'
import { events } from '../data/events'
import { photos, pools, type PhotoKey } from '../data/images'
import { aartiStatus, clockIn, cn, countdownParts, fmtDate, relativeDay, to12h, usd, useTick } from '../lib/utils'
import { Avatar, Photo } from '../components/Photo'
import { Divider, Mandala, OmMark } from '../components/Sacred'
import { Badge, Button, EmptyState, Field, Input, Panel, Progress, Select } from '../components/ui'

const nav = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/sevas', label: 'My Sevas', icon: HandHeart },
  { to: '/dashboard/giving', label: 'Giving & Receipts', icon: Receipt },
  { to: '/dashboard/parayan', label: 'Parayan', icon: BookOpen },
  { to: '/dashboard/saved', label: 'Saved', icon: Heart },
  { to: '/dashboard/profile', label: 'Profile', icon: Settings },
]

/* ============================================================
   Layout
   ============================================================ */

export default function Dashboard() {
  const { user, temple, signOut, notify } = useApp()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  if (!user) return <Navigate to="/login" replace />

  const leave = () => {
    signOut()
    notify('Signed out', 'Om Sai Ram')
    navigate('/')
  }

  return (
    <div className="mx-auto flex w-full max-w-[1500px] gap-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* ---------- sidebar ---------- */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-[70] w-[282px] shrink-0 overflow-y-auto border-r border-line bg-bg px-5 py-6 transition-transform duration-400 lg:sticky lg:top-24 lg:z-auto lg:h-[calc(100dvh-8rem)] lg:rounded-2xl lg:border lg:bg-transparent',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex items-center justify-between lg:hidden">
          <span className="flex items-center gap-2.5">
            <OmMark size={20} className="text-gold" />
            <span className="font-display text-[16px]">Dashboard</span>
          </span>
          <button onClick={() => setOpen(false)} className="grid size-9 place-items-center rounded-full border border-line">
            <X size={16} />
          </button>
        </div>

        {/* devotee card with imagery */}
        <Panel className="mt-4 overflow-hidden lg:mt-0">
          <Photo photo={photos.babaStatue} ratio="16/9" className="w-full" fallbackSeed={1} scrim />
          <div className="-mt-9 px-5 pb-5">
            <Avatar photo={photos.babaShrine} size={52} className="ring-2 ring-[var(--c-surface)]" />
            <p className="mt-3 font-display text-[17px] leading-tight text-ink">{user.name}</p>
            <p className="mt-0.5 truncate text-[11.5px] text-ink-faint">{user.email}</p>
            <div className="mt-3 flex items-center gap-2">
              <Badge tone="ember">{user.role}</Badge>
              <span className="text-[11px] text-ink-faint">since {fmtDate(user.since)}</span>
            </div>
          </div>
        </Panel>

        <nav className="mt-6 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13.5px] transition-all duration-300',
                  isActive
                    ? 'border border-line-strong bg-surface-2 text-gold-light'
                    : 'border border-transparent text-ink-soft hover:bg-surface-2/60 hover:text-ink',
                )
              }
            >
              <n.icon size={15} className="shrink-0" />
              {n.label}
            </NavLink>
          ))}
        </nav>

        <Divider className="my-6" icon="dot" />

        <SidebarAarti />

        <Divider className="my-6" icon="dot" />

        <Link
          to={`/temples/${temple.id}`}
          className="group block overflow-hidden rounded-xl border border-line transition-colors hover:border-line-strong"
        >
          <Photo photo={photos.usTempleA} ratio="16/10" className="w-full" fallbackSeed={4} scrim>
            <span className="absolute inset-x-0 bottom-0 p-4">
              <span className="block text-[10px] uppercase tracking-[0.24em] text-gold">Your sannidhi</span>
              <span className="mt-1 block text-[14px] leading-tight text-ink">{temple.shortName}</span>
            </span>
          </Photo>
        </Link>

        <button
          onClick={leave}
          className="mt-6 flex w-full items-center gap-3 rounded-xl border border-transparent px-4 py-2.5 text-[13.5px] text-ink-soft transition-colors hover:border-kumkum/35 hover:bg-kumkum/10 hover:text-kumkum"
        >
          <LogOut size={15} /> Sign out
        </button>
      </aside>

      {open && (
        <button
          className="fixed inset-0 z-[65] bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      {/* ---------- content ---------- */}
      <div className="min-w-0 flex-1">
        <button
          onClick={() => setOpen(true)}
          className="mb-5 flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[12.5px] text-ink-soft lg:hidden"
        >
          <Menu size={14} /> Dashboard menu
        </button>

        <Routes>
          <Route index element={<Overview />} />
          <Route path="sevas" element={<MySevas />} />
          <Route path="giving" element={<Giving />} />
          <Route path="parayan" element={<Parayan />} />
          <Route path="saved" element={<Saved />} />
          <Route path="profile" element={<ProfilePanel />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function SidebarAarti() {
  const { temple } = useApp()
  useTick(20_000)
  const status = aartiStatus(temple)
  const { h, m } = countdownParts(status.minutesUntil)
  return (
    <div className="rounded-xl border border-line px-4 py-4">
      <p className="text-[10px] uppercase tracking-[0.26em] text-gold">
        {status.live ? 'Aarti now' : 'Next aarti'}
      </p>
      <p className="mt-2 font-display text-[15px] text-ink">{status.aarti.name}</p>
      <p className="mt-0.5 font-deva text-[12px] text-gold-light/75">{status.aarti.sanskrit}</p>
      <p className="mt-2.5 font-display text-xl ember-text">
        {status.live ? 'In progress' : h > 0 ? `${h}h ${m}m` : `${m} min`}
      </p>
      <p className="mt-1 text-[11px] text-ink-faint">
        {to12h(status.aarti.time)} {temple.tzLabel} · now {clockIn(temple.timezone)}
      </p>
    </div>
  )
}

/* ============================================================
   Shared bits
   ============================================================ */

function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
      <div>
        <h1 className="font-display text-3xl leading-tight sm:text-[2.3rem]">{title}</h1>
        {sub && <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{sub}</p>}
      </div>
      {action}
    </div>
  )
}

function MetricCard({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string
  value: React.ReactNode
  sub?: string
  icon: typeof Flame
}) {
  return (
    <Panel className="px-6 py-6">
      <div className="flex items-start justify-between">
        <p className="text-[10px] uppercase tracking-[0.24em] text-ink-faint">{label}</p>
        <span className="grid size-8 place-items-center rounded-full border border-line bg-bg-deep/40 text-gold">
          <Icon size={14} />
        </span>
      </div>
      <p className="mt-4 font-display text-3xl ember-text">{value}</p>
      {sub && <p className="mt-1.5 text-[12px] text-ink-faint">{sub}</p>}
    </Panel>
  )
}

/* ============================================================
   Overview
   ============================================================ */

function Overview() {
  const { user, bookings, donations, parayan, favourites, temple } = useApp()
  const given = donations.reduce((s, d) => s + d.amount, 0)
  const sevaTotal = bookings.reduce((s, b) => s + b.amount, 0)
  const upcoming = bookings.filter((b) => b.status !== 'Completed').slice(0, 3)
  const nextFestivals = events
    .filter((e) => e.category !== 'Weekly')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  return (
    <>
      {/* hero banner */}
      <Panel className="relative mb-6 overflow-hidden">
        <Photo photo={photos.templeNight} fill fallbackSeed={6} />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/88 to-surface/35" />
        <div className="relative px-7 py-9 sm:px-10 sm:py-11">
          <p className="font-deva text-[14px] text-gold">ॐ साईं राम</p>
          <h1 className="mt-3 max-w-xl text-balance font-display text-3xl leading-tight sm:text-[2.5rem]">
            Om Sai Ram, {user?.name.split(' ')[0]}
          </h1>
          <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-ink-soft">
            Your sevas, giving and parayan at {temple.name} — and across all ten sannidhis.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button to="/sevas" size="sm">
              Offer a seva
            </Button>
            <Button to="/annadanam" variant="outline" size="sm">
              Sponsor annadanam
            </Button>
          </div>
        </div>
      </Panel>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Sevas offered" value={bookings.length} sub="all time" icon={HandHeart} />
        <MetricCard label="Given" value={usd(sevaTotal + given)} sub="sevas and donations" icon={Receipt} />
        <MetricCard label="Parayan" value={`${parayan.length}/53`} sub="chapters read" icon={BookOpen} />
        <MetricCard label="Saved" value={favourites.length} sub="photographs" icon={Heart} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <Panel className="px-7 py-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl">Coming up for you</h2>
            <Link to="/dashboard/sevas" className="text-[12px] text-gold transition-colors hover:text-ember">
              All sevas →
            </Link>
          </div>

          {upcoming.length === 0 ? (
            <p className="mt-6 text-[13.5px] leading-relaxed text-ink-soft">
              Nothing booked yet. An archana takes twenty minutes and is offered in your name and gotra.
            </p>
          ) : (
            <div className="mt-6 space-y-3">
              {upcoming.map((b) => (
                <div
                  key={b.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line px-5 py-4"
                >
                  <div className="min-w-0">
                    <p className="text-[14.5px] leading-snug text-ink">{b.title}</p>
                    <p className="mt-1 text-[11.5px] text-ink-faint">
                      {templeById(b.templeId)?.shortName} · {fmtDate(b.date)}
                      {b.time ? ` · ${to12h(b.time)}` : ''}
                    </p>
                  </div>
                  <Badge tone="neem">{relativeDay(b.date)}</Badge>
                </div>
              ))}
            </div>
          )}

          <Divider className="my-7" icon="dot" />

          <h2 className="font-display text-xl">Festivals at your sannidhi</h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {nextFestivals.map((e, i) => (
              <Link key={e.id} to={`/events/${e.id}`} className="group overflow-hidden rounded-xl border border-line">
                <Photo
                  photo={photos[pools.festivals[i % pools.festivals.length] as PhotoKey]}
                  ratio="16/10"
                  className="w-full"
                  fallbackSeed={i + 2}
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                  scrim
                />
                <div className="px-4 py-3.5">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gold">{relativeDay(e.date)}</p>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-ink">{e.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel className="relative overflow-hidden px-7 py-7">
            <Mandala
              rings={2}
              className="pointer-events-none absolute -right-24 -top-24 size-[280px] opacity-[0.14] animate-slow-spin"
            />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.26em] text-gold">Your Saptah</p>
              <p className="mt-4 font-display text-4xl ember-text">
                {parayan.length}
                <span className="text-lg text-ink-faint"> / 53</span>
              </p>
              <Progress value={parayan.length} max={53} className="mt-4" />
              <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                {parayan.length === 53
                  ? 'Complete. Udyapan and annadanam traditionally follow.'
                  : `${53 - parayan.length} chapters to go.`}
              </p>
              <Button to="/satcharitra" variant="ghost" size="sm" className="mt-5" full>
                <BookOpen size={13} /> Continue reading
              </Button>
            </div>
          </Panel>

          <Panel className="overflow-hidden">
            <Photo photo={photos.langarServing} ratio="16/9" className="w-full" fallbackSeed={5} scrim />
            <div className="px-7 py-6">
              <p className="text-[10px] uppercase tracking-[0.26em] text-gold">Annadanam</p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
                Thursdays at {temple.shortName} serve the largest meal of the week. Sponsor a day, or come and
                cook.
              </p>
              <div className="mt-5 flex gap-3">
                <Button to="/annadanam" size="sm">
                  <Utensils size={13} /> Sponsor
                </Button>
                <Button to="/volunteer" variant="ghost" size="sm">
                  Volunteer
                </Button>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}

/* ============================================================
   My Sevas
   ============================================================ */

function MySevas() {
  const { bookings } = useApp()
  return (
    <>
      <PageTitle
        title="My sevas"
        sub="Every archana, abhishekam, annadanam and RSVP registered in your name."
        action={
          <Button to="/sevas" size="sm">
            Offer another <ArrowRight size={14} />
          </Button>
        }
      />

      {bookings.length === 0 ? (
        <EmptyState
          title="No sevas yet"
          body="Choose an archana, an abhishekam or a day of annadanam — it is offered in your name and gotra at the sannidhi you pick."
          action={<Button to="/sevas">Browse sevas</Button>}
        />
      ) : (
        <div className="space-y-4">
          {bookings.map((b, i) => {
            const t = templeById(b.templeId)
            return (
              <Panel key={b.id} className="grid overflow-hidden sm:grid-cols-[180px_1fr]">
                <Photo
                  photo={photos[pools.worship[i % pools.worship.length] as PhotoKey]}
                  className="h-36 w-full sm:h-full"
                  fallbackSeed={i}
                />
                <div className="px-6 py-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone={b.kind === 'annadanam' ? 'neem' : b.kind === 'event' ? 'gold' : 'ember'}>
                          {b.kind === 'annadanam' ? 'Annadanam' : b.kind}
                        </Badge>
                        <Badge tone={b.status === 'Completed' ? 'gold' : 'neem'}>{b.status}</Badge>
                      </div>
                      <h3 className="mt-3 text-[17px] leading-snug">{b.title}</h3>
                      <p className="mt-1.5 text-[12.5px] text-ink-faint">
                        {t?.shortName} · {fmtDate(b.date)}
                        {b.time ? ` · ${to12h(b.time)}` : ''}
                        {b.gotra ? ` · ${b.gotra} gotra` : ''}
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
                </div>
              </Panel>
            )
          })}
        </div>
      )}
    </>
  )
}

/* ============================================================
   Giving
   ============================================================ */

function Giving() {
  const { donations, bookings, notify } = useApp()
  const year = new Date().getFullYear()
  const thisYear = donations.filter((d) => d.date.startsWith(String(year)))
  const total = thisYear.reduce((s, d) => s + d.amount, 0)
  const sevaTotal = bookings.reduce((s, b) => s + b.amount, 0)

  return (
    <>
      <PageTitle title="Giving & receipts" sub="Tax-deductible contributions across the network, ready for filing." />

      <div className="grid gap-5 sm:grid-cols-3">
        <MetricCard label={`${year} donations`} value={usd(total)} sub={`${thisYear.length} contributions`} icon={Receipt} />
        <MetricCard label="Seva offerings" value={usd(sevaTotal)} sub="all time" icon={HandHeart} />
        <MetricCard label="Combined" value={usd(total + sevaTotal)} sub="deductible" icon={Flame} />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          {donations.length === 0 ? (
            <EmptyState
              title="No giving recorded yet"
              body="Contributions to any of the six funds appear here with their receipt numbers."
              action={<Button to="/donate">See the funds</Button>}
            />
          ) : (
            donations.map((d) => (
              <Panel key={d.id} className="flex flex-wrap items-center justify-between gap-4 px-7 py-6">
                <div>
                  <h3 className="text-[16px]">{d.campaignTitle}</h3>
                  <p className="mt-1.5 text-[12.5px] text-ink-faint">
                    {fmtDate(d.date)} · {d.frequency} · {templeById(d.templeId)?.shortName}
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

        <Panel className="h-fit overflow-hidden">
          <Photo photo={photos.kitchenVolunteers} ratio="16/9" className="w-full" fallbackSeed={3} scrim />
          <div className="px-7 py-7">
            <p className="text-[10px] uppercase tracking-[0.26em] text-gold">{year} statement</p>
            <p className="mt-4 font-display text-4xl ember-text">{usd(total)}</p>
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
          </div>
        </Panel>
      </div>
    </>
  )
}

/* ============================================================
   Parayan
   ============================================================ */

function Parayan() {
  const { parayan, toggleParayanChapter } = useApp()
  return (
    <>
      <PageTitle
        title="Satcharitra parayan"
        sub="Fifty-three chapters, read Thursday to Thursday. Tap a number to mark it read."
        action={
          <Button to="/satcharitra" size="sm">
            Open the book <ArrowRight size={14} />
          </Button>
        }
      />

      <Panel className="relative mb-6 overflow-hidden">
        <Photo photo={photos.babaPortrait} fill fallbackSeed={0} />
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-surface/40" />
        <div className="relative px-8 py-9">
          <p className="text-[10px] uppercase tracking-[0.26em] text-gold">Progress</p>
          <p className="mt-3 font-display text-5xl ember-text">
            {parayan.length}
            <span className="text-xl text-ink-faint"> / 53</span>
          </p>
          <Progress value={parayan.length} max={53} className="mt-5 max-w-md" />
          <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-ink-soft">
            {Math.round((parayan.length / 53) * 100)}% complete
            {parayan.length < 53 ? ` · ${53 - parayan.length} chapters remaining` : ' · Saptah complete'}
          </p>
        </div>
      </Panel>

      <Panel className="px-7 py-7">
        <p className="text-[10px] uppercase tracking-[0.26em] text-gold">All chapters</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {chapters.map((c) => (
            <button
              key={c.n}
              title={c.title}
              onClick={() => toggleParayanChapter(c.n)}
              className={cn(
                'grid size-10 place-items-center rounded-xl border text-[12.5px] transition-all duration-300',
                parayan.includes(c.n)
                  ? 'border-ember/45 bg-ember/15 text-ember-soft'
                  : 'border-line text-ink-faint hover:border-line-strong hover:text-ink',
              )}
            >
              {c.n}
            </button>
          ))}
        </div>
      </Panel>
    </>
  )
}

/* ============================================================
   Saved
   ============================================================ */

function Saved() {
  const { favourites } = useApp()
  const saved = galleryItems.filter((g) => favourites.includes(g.id))
  return (
    <>
      <PageTitle title="Saved" sub="Photographs you have kept from the gallery." />
      {saved.length === 0 ? (
        <EmptyState
          title="Nothing saved yet"
          body="Tap the heart on any photograph in the gallery and it is kept here for you."
          action={<Button to="/gallery">Open the gallery</Button>}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((g, i) => (
            <Link key={g.id} to="/gallery" className="group panel overflow-hidden">
              <Photo
                photo={photos[pools.festivals[(g.art + i) % pools.festivals.length] as PhotoKey]}
                ratio="4/3"
                className="w-full"
                fallbackSeed={g.art}
                imgClassName="transition-transform duration-700 group-hover:scale-105"
                scrim
              >
                <Heart size={14} className="absolute right-4 top-4 text-kumkum" fill="currentColor" />
              </Photo>
              <div className="px-5 py-4">
                <p className="text-balance text-[14.5px] leading-snug text-ink">{g.title}</p>
                <p className="mt-1 text-[11.5px] text-ink-faint">{templeById(g.templeId)?.shortName}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

/* ============================================================
   Profile
   ============================================================ */

function ProfilePanel() {
  const { profile, setProfile, user, temple, setTempleId, notify } = useApp()
  const [draft, setDraft] = useState(profile)

  return (
    <>
      <PageTitle title="Profile" sub="Pre-fills your sankalpa details so you do not type your gotra every time." />

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Panel className="px-8 py-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name">
              <Input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
            </Field>
            <Field label="Email">
              <Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
            </Field>
            <Field label="Phone">
              <Input type="tel" value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
            </Field>
            <Field label="City">
              <Input value={draft.city} onChange={(e) => setDraft({ ...draft, city: e.target.value })} />
            </Field>
            <Field label="Gotra" hint="Choose “Not known” if unsure">
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
            <div className="sm:col-span-2">
              <Field label="Home sannidhi">
                <Select value={temple.id} onChange={(e) => setTempleId(e.target.value)}>
                  {temples.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.shortName} — {t.city}, {t.stateCode}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-line pt-6">
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

        <div className="space-y-6">
          <Panel className="overflow-hidden">
            <Photo photo={photos.marigoldGarland} ratio="16/10" className="w-full" fallbackSeed={7} scrim />
            <div className="px-7 py-6">
              <p className="text-[10px] uppercase tracking-[0.26em] text-gold">Session</p>
              <p className="mt-3 text-[14px] text-ink">{user?.name}</p>
              <p className="mt-0.5 text-[12.5px] text-ink-faint">{user?.email}</p>
              <p className="mt-3">
                <Badge tone="ember">{user?.role}</Badge>
              </p>
              <p className="mt-5 text-[11.5px] leading-relaxed text-ink-faint">
                Development session only — stored in this browser, never sent anywhere.
              </p>
            </div>
          </Panel>

          <Panel className="px-7 py-7">
            <p className="text-[10px] uppercase tracking-[0.26em] text-gold">Quick links</p>
            <div className="mt-4 space-y-2">
              {[
                { to: '/sevas', label: 'Book a seva', icon: HandHeart },
                { to: '/annadanam', label: 'Sponsor annadanam', icon: Utensils },
                { to: '/events', label: 'Festival calendar', icon: CalendarDays },
                { to: '/donate', label: 'Offer a donation', icon: Receipt },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <l.icon size={14} className="text-gold" />
                  {l.label}
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </>
  )
}
