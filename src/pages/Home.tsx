import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Flame,
  HandHeart,
  Mail,
  Radio,
  Sparkles,
  Utensils,
} from 'lucide-react'
import { useApp } from '../lib/store'
import { temples } from '../data/temples'
import { sevas } from '../data/sevas'
import { events } from '../data/events'
import { campaigns, experiences } from '../data/community'
import { chapters, guidingPrinciples, quotes } from '../data/satcharitra'
import { panchangFor } from '../data/aarti'
import {
  clockIn,
  cn,
  daysUntil,
  fmtDayMonth,
  relativeDay,
  to12h,
  usd,
  useReveal,
  weekdayIn,
} from '../lib/utils'
import { AartiRing } from '../components/AartiRing'
import { Photo } from '../components/Photo'
import { fromPool, photos } from '../data/images'
import { Divider, EmberField, Mandala, TempleArch } from '../components/Sacred'
import { Badge, Button, Chip, Panel, Progress, Section, SectionHeading, Stat } from '../components/ui'

export default function Home() {
  const { temple, t, parayan } = useApp()
  const ref = useReveal<HTMLDivElement>()

  const today = new Date()
  const panchang = panchangFor(today)
  const quote = quotes[today.getDate() % quotes.length]
  const chapterOfDay = chapters[today.getDate() % chapters.length]
  const isThursday = weekdayIn(temple.timezone) === 'Thursday'

  const upcoming = events
    .filter((e) => daysUntil(e.endDate ?? e.date) >= 0 && e.category !== 'Weekly')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 3)

  const featured = sevas.filter((s) => s.popular).slice(0, 4)
  const topCampaigns = campaigns.slice(0, 3)

  return (
    <div ref={ref}>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
        {/* Photograph behind the hero, veiled so the type stays readable. */}
        <Photo photo={photos.templeNight} fill className="z-0" priority fallbackSeed={2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-bg via-bg/90 to-bg/62" />
        {/* Fade the photograph out at the foot so the hero meets the page cleanly. */}
        <div className="absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-bg to-transparent" />
        <EmberField count={30} className="z-0" />
        <Mandala className="pointer-events-none absolute -right-40 -top-28 z-0 size-[640px] opacity-[0.22] animate-slow-spin" />
        <Mandala
          rings={2}
          className="pointer-events-none absolute -bottom-48 -left-40 z-0 size-[520px] opacity-[0.13] animate-reverse-spin"
        />
        <TempleArch className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[320px] w-full opacity-60" />

        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rise-in">
            <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/50 px-4 py-1.5 text-[11px] uppercase tracking-[0.28em] text-gold">
              <Flame size={11} className="text-ember" />
              {isThursday ? 'Guruvar · Baba’s own day' : `${temples.length} sannidhis · one sangha`}
            </span>

            <h1 className="mt-7 text-balance font-display text-[2.6rem] leading-[1.06] sm:text-6xl lg:text-[4.2rem]">
              <span className="ember-text">Sabka Malik Ek</span>
              <span className="mt-2 block text-ink">One Master of all.</span>
            </h1>

            <p className="mt-3 font-deva text-xl text-gold-light/85">सबका मालिक एक</p>

            <p className="mt-7 max-w-xl text-pretty text-[15.5px] leading-relaxed text-ink-soft">
              {t('label.greeting')}. From a ruined mosque in a Maharashtra village to ten sannidhis across North
              America — the same Dhuni, the same four aartis, the same open kitchen. Find your temple, keep your
              timings, and offer your seva from wherever you are.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/sevas" size="lg">
                {t('cta.bookSeva')} <ArrowRight size={16} />
              </Button>
              <Button to="/darshan" variant="outline" size="lg">
                <Radio size={15} /> Live Darshan
              </Button>
              <Button to="/annadanam" variant="ghost" size="lg">
                <Utensils size={15} /> Sponsor Annadanam
              </Button>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6">
              <Stat value={temples.length} label="Sannidhis" sub="across 8 states" />
              <Stat value="4" label="Daily aartis" sub="Kakad to Shej" />
              <Stat value="38k+" label="Devotees" sub="in the network" />
            </div>
          </div>

          <div className="relative mx-auto w-[min(92vw,380px)]">
            <div className="absolute -inset-6 -z-10 rounded-[40px] bg-[radial-gradient(circle_at_50%_40%,color-mix(in_srgb,var(--c-ember)_22%,transparent),transparent_66%)] blur-2xl" />
            <Panel className="overflow-hidden">
              <Photo photo={photos.babaShrine} ratio="4/5" className="w-full" priority fallbackSeed={1}>
                <span className="absolute inset-x-0 top-0 bg-gradient-to-b from-bg-deep via-bg-deep/85 to-transparent px-5 pb-14 pt-5">
                  <span className="block font-deva text-[12px] text-gold">श्री साईनाथ महाराज</span>
                  <span className="mt-0.5 block font-display text-lg leading-tight text-ink">
                    {temple.shortName}
                  </span>
                  <span className="mt-0.5 block text-[11.5px] text-ink-soft">
                    {clockIn(temple.timezone)} {temple.tzLabel} · {temple.city}, {temple.stateCode}
                  </span>
                </span>
                {/* Scrim only at the foot, where the aarti card sits. */}
                <span className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
              </Photo>
            </Panel>

            <Panel className="elevated relative z-10 mx-auto -mt-32 w-[min(80vw,262px)] px-5 py-5 text-center">
              <AartiRing temple={temple} size={176} />
            </Panel>
          </div>
        </div>
      </section>

      {/* ============ TODAY ============ */}
      <Section wide className="pt-4">
        <Panel className="reveal grid gap-px overflow-hidden bg-line md:grid-cols-[1.1fr_2fr]">
          <div className="bg-surface px-7 py-7">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">{t('label.todayPanchang')}</p>
            <p className="mt-3 font-display text-xl">
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <p className="mt-1 text-[12px] text-ink-faint">
              {panchang.masa} · {panchang.samvat}
            </p>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 text-[12.5px]">
              <PanchangRow k="Tithi" v={panchang.tithi} />
              <PanchangRow k="Nakshatra" v={panchang.nakshatra} />
              <PanchangRow k="Yoga" v={panchang.yoga} />
              <PanchangRow k="Karana" v={panchang.karana} />
              <PanchangRow k="Sunrise" v={panchang.sunrise} />
              <PanchangRow k="Rahu Kalam" v={panchang.rahuKalam} />
            </div>
            {isThursday && (
              <p className="mt-5 flex items-center gap-2 rounded-xl border border-ember/30 bg-ember/10 px-3.5 py-2.5 text-[12px] text-ember-soft">
                <Sparkles size={13} /> Thursday — palki, annadanam and Udi at every sannidhi
              </p>
            )}
          </div>

          <div className="bg-surface px-7 py-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">
                Today’s aartis · {temple.shortName}
              </p>
              <Link to="/aarti" className="text-[12px] text-gold transition-colors hover:text-ember">
                All timings & lyrics →
              </Link>
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {temple.aartis.map((a) => (
                <div
                  key={a.key}
                  className="group rounded-xl border border-line bg-bg-deep/40 px-4 py-4 transition-colors hover:border-line-strong"
                >
                  <p className="font-deva text-[13px] text-gold-light/80">{a.sanskrit}</p>
                  <p className="mt-1 font-display text-[15px] text-ink">{a.name}</p>
                  <p className="mt-2 font-display text-xl ember-text">{to12h(a.time)}</p>
                  <p className="mt-1 text-[11px] text-ink-faint">{a.duration} min · {temple.tzLabel}</p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[12.5px] leading-relaxed text-ink-soft">
              <span className="text-gold-light">{temple.highlight}.</span> {temple.hours.weekday} on weekdays,{' '}
              {temple.hours.weekend} at weekends.
            </p>
          </div>
        </Panel>
      </Section>

      {/* ============ QUICK ACTIONS ============ */}
      <Section wide className="py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            { to: '/sevas', icon: HandHeart, label: 'Book a Seva', sub: '20 sevas offered' },
            { to: '/annadanam', icon: Utensils, label: 'Annadanam', sub: 'Feed a day' },
            { to: '/darshan', icon: Radio, label: 'Live Darshan', sub: '8 temples live' },
            { to: '/satcharitra', icon: BookOpen, label: 'Parayan', sub: `${parayan.length}/53 read` },
            { to: '/events', icon: CalendarDays, label: 'Festivals', sub: `${upcoming.length} upcoming` },
            { to: '/donate', icon: Flame, label: 'Donate', sub: 'Tax-deductible' },
          ].map((a, i) => (
            <Link
              key={a.to}
              to={a.to}
              className="reveal group panel flex items-center gap-4 px-5 py-5 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--c-line-strong)]"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-bg-deep/50 text-gold transition-colors group-hover:border-ember/50 group-hover:text-ember">
                <a.icon size={17} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[14px] text-ink">{a.label}</span>
                <span className="block truncate text-[11.5px] text-ink-faint">{a.sub}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ============ QUOTE ============ */}
      <Section className="relative overflow-hidden py-24">
        <Mandala className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[560px] -translate-x-1/2 -translate-y-1/2 opacity-[0.14] animate-slow-spin" />
        <div className="reveal relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.34em] text-gold">{t('label.quote')}</p>
          <blockquote className="mt-7 text-balance font-quote text-3xl italic leading-snug text-ink sm:text-[2.6rem]">
            “{quote.text}”
          </blockquote>
          <p className="mt-6 text-[12px] uppercase tracking-[0.3em] text-ink-faint">— {quote.source}</p>
          <Divider className="mx-auto mt-10 max-w-sm" />
        </div>
      </Section>

      {/* ============ FESTIVALS ============ */}
      <Section wide>
        <SectionHeading
          align="left"
          eyebrow="The year ahead"
          title="Festivals at every sannidhi"
          sub="Punyatithi, Ram Navami, Navratri and the Thursday palki — the same calendar kept in ten cities."
          action={
            <Button to="/events" variant="outline">
              Full calendar <ArrowRight size={15} />
            </Button>
          }
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {upcoming.map((e, i) => (
            <Link
              key={e.id}
              to={`/events/${e.id}`}
              className="reveal group panel overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_34px_80px_-36px_var(--c-ember)]"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <Photo
                photo={fromPool('festivals', i)}
                className="h-44 w-full"
                fallbackSeed={i * 3 + 2}
                imgClassName="transition-transform duration-700 group-hover:scale-105"
                scrim
              >
                <div className="absolute left-5 top-5 flex gap-2">
                  <Badge tone="ember">{e.category}</Badge>
                  <Badge>{relativeDay(e.date)}</Badge>
                </div>
              </Photo>
              <div className="px-6 pb-6 pt-1">
                <p className="text-[11px] uppercase tracking-[0.2em] text-gold">
                  {fmtDayMonth(e.date)}
                  {e.endDate ? ` – ${fmtDayMonth(e.endDate)}` : ''}
                </p>
                <h3 className="mt-2 text-balance text-xl leading-snug">{e.title}</h3>
                <p className="mt-3 line-clamp-3 text-[13.5px] leading-relaxed text-ink-soft">{e.summary}</p>
                {e.rsvp && e.seats && (
                  <div className="mt-5">
                    <Progress value={e.seatsTaken ?? 0} max={e.seats} />
                    <p className="mt-2 text-[11px] text-ink-faint">
                      {e.seatsTaken} of {e.seats} places reserved
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ============ SEVAS ============ */}
      <Section wide className="relative">
        <SectionHeading
          align="left"
          eyebrow="Offer a seva"
          title="Sevas most often offered"
          sub="Booked in your name and gotra, performed at the sannidhi, with prasad and Udi posted to you if you cannot travel."
          action={
            <Button to="/sevas" variant="outline">
              All 20 sevas <ArrowRight size={15} />
            </Button>
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((s, i) => (
            <Link
              key={s.id}
              to="/sevas"
              className="reveal group panel flex flex-col px-6 py-7 transition-all duration-500 hover:-translate-y-1.5"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <Badge tone="gold">{s.category}</Badge>
                <span className="font-display text-xl ember-text">{usd(s.price)}</span>
              </div>
              {s.sanskrit && <p className="mt-4 font-deva text-[13px] text-gold-light/75">{s.sanskrit}</p>}
              <h3 className="mt-1.5 text-balance text-[17px] leading-snug">{s.name}</h3>
              <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-ink-soft">{s.description}</p>
              <div className="mt-5 flex items-center gap-2 text-[11.5px] text-ink-faint">
                <span className="rounded-full border border-line px-2.5 py-0.5">{s.duration}</span>
                {s.bestDay && <span className="rounded-full border border-line px-2.5 py-0.5">{s.bestDay}</span>}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ============ TEMPLE NETWORK ============ */}
      <Section wide className="relative overflow-hidden">
        <SectionHeading
          eyebrow="The network"
          title="Ten sannidhis, one Dhuni"
          sub="Each temple keeps its own timings and its own character — the switcher in the header follows you through the whole site."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {temples.map((x, i) => (
            <TempleMini key={x.id} id={x.id} index={i} />
          ))}
        </div>
      </Section>

      {/* ============ CAMPAIGNS ============ */}
      <Section wide>
        <SectionHeading
          align="left"
          eyebrow="Seva that feeds"
          title="Where your offering goes"
          sub="Every temple in the network is a registered 501(c)(3). Receipts are issued immediately and a consolidated statement each January."
          action={
            <Button to="/donate" variant="outline">
              Offer a donation <ArrowRight size={15} />
            </Button>
          }
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {topCampaigns.map((c) => (
            <Panel
              key={c.id}
              hover
              className="reveal flex flex-col px-6 py-7"
            >
              <div className="flex items-start justify-between gap-3">
                <Badge tone={c.tag === 'Urgent' ? 'kumkum' : 'neem'}>{c.tag}</Badge>
                <span className="text-[11px] text-ink-faint">{c.donors.toLocaleString()} donors</span>
              </div>
              <h3 className="mt-4 text-[18px] leading-snug">{c.title}</h3>
              <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-relaxed text-ink-soft">{c.purpose}</p>
              <div className="mt-6">
                <Progress value={c.raised} max={c.goal} />
                <div className="mt-2.5 flex items-baseline justify-between">
                  <span className="font-display text-lg ember-text">{usd(c.raised)}</span>
                  <span className="text-[11.5px] text-ink-faint">of {usd(c.goal)}</span>
                </div>
              </div>
              <Button to="/donate" variant="ghost" size="sm" className="mt-5" full>
                Contribute
              </Button>
            </Panel>
          ))}
        </div>
      </Section>

      {/* ============ SATCHARITRA + TEACHINGS ============ */}
      <Section wide>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Panel className="reveal relative overflow-hidden px-8 py-9">
            <Mandala
              rings={2}
              className="pointer-events-none absolute -right-24 -top-24 size-[320px] opacity-[0.16] animate-slow-spin"
            />
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Chapter for today</p>
              <p className="mt-4 font-display text-5xl ember-text">{chapterOfDay.n}</p>
              <h3 className="mt-2 max-w-md text-balance text-[21px] leading-snug">{chapterOfDay.title}</h3>
              <p className="mt-4 max-w-lg font-quote text-[17px] italic leading-relaxed text-ink-soft">
                {chapterOfDay.excerpt}
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="flex-1">
                  <Progress value={parayan.length} max={53} />
                  <p className="mt-2 text-[11.5px] text-ink-faint">
                    Your parayan — {parayan.length} of 53 chapters read
                  </p>
                </div>
                <Button to="/satcharitra" variant="ghost" size="sm">
                  Open the book
                </Button>
              </div>
            </div>
          </Panel>

          <Panel className="reveal px-8 py-9">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Two coins only</p>
            <h3 className="mt-3 text-[26px] leading-snug">
              Baba asked for nothing but <span className="ember-text">Shraddha</span> and{' '}
              <span className="ember-text">Saburi</span>.
            </h3>
            <div className="mt-7 space-y-5">
              {guidingPrinciples.slice(0, 3).map((p) => (
                <div key={p.title} className="border-l border-line pl-5">
                  <p className="flex items-baseline gap-3">
                    <span className="font-display text-[16px] text-ink">{p.title}</span>
                    <span className="font-deva text-[13px] text-gold-light/75">{p.sanskrit}</span>
                  </p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              ))}
            </div>
            <Button to="/teachings" variant="ghost" size="sm" className="mt-7">
              His life and teaching <ArrowRight size={14} />
            </Button>
          </Panel>
        </div>
      </Section>

      {/* ============ EXPERIENCES ============ */}
      <Section wide>
        <SectionHeading
          eyebrow="From the sangha"
          title="What devotees have written"
          sub="Unedited accounts shared by devotees across the network — the leelas people actually talk about."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {experiences.slice(0, 3).map((e) => (
            <Panel key={e.id} hover className="reveal flex flex-col px-7 py-8">
              <div className="flex flex-wrap gap-2">
                {e.tags.map((tg) => (
                  <Chip key={tg}>{tg}</Chip>
                ))}
              </div>
              <h3 className="mt-5 text-balance text-[18px] leading-snug">{e.title}</h3>
              <p className="mt-3 line-clamp-5 flex-1 font-quote text-[16px] leading-relaxed text-ink-soft">
                {e.body}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4 text-[12px]">
                <span className="text-ink">
                  {e.author} <span className="text-ink-faint">· {e.city}</span>
                </span>
                <span className="flex items-center gap-1.5 text-gold">
                  <Flame size={11} /> {e.blessings}
                </span>
              </div>
            </Panel>
          ))}
        </div>
        <div className="reveal mt-10 text-center">
          <Button to="/experiences" variant="outline">
            Read more, or share your own <ArrowRight size={15} />
          </Button>
        </div>
      </Section>

      {/* ============ CLOSING CTA ============ */}
      <Section wide className="pb-24">
        <Panel className="reveal relative overflow-hidden px-8 py-16 text-center sm:px-16">
          <Photo photo={photos.dhuniFire} fill fallbackSeed={3} />
          <div className="absolute inset-0 bg-gradient-to-b from-surface/95 via-surface/90 to-surface/96" />
          <EmberField count={16} />
          <Mandala className="pointer-events-none absolute left-1/2 top-1/2 size-[520px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] animate-reverse-spin" />
          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="font-deva text-[15px] text-gold">ॐ साईं राम</p>
            <h2 className="mt-5 text-balance text-3xl leading-tight sm:text-[2.6rem]">
              Udi from the Dhuni, posted to your door.
            </h2>
            <p className="mt-5 text-pretty text-[15px] leading-relaxed text-ink-soft">
              If you cannot come to the sannidhi, let it come to you. Sacred ash from the temple fire, kumkum, a
              photograph and prasad — anywhere in the United States, in three days.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button to="/sevas" size="lg">
                <Mail size={16} /> Request Udi & Prasad
              </Button>
              <Button to="/volunteer" variant="outline" size="lg">
                Volunteer at your temple
              </Button>
            </div>
          </div>
        </Panel>
      </Section>
    </div>
  )
}

function PanchangRow({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.18em] text-ink-faint">{k}</p>
      <p className="mt-0.5 text-ink">{v}</p>
    </div>
  )
}

function TempleMini({ id, index }: { id: string; index: number }) {
  const { temple: current, setTempleId } = useApp()
  const x = temples.find((tx) => tx.id === id)!
  const active = current.id === x.id
  return (
    <div
      className={cn(
        'reveal group panel flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1',
        active && 'border-[var(--c-line-strong)] shadow-[0_26px_60px_-34px_var(--c-ember)]',
      )}
      style={{ transitionDelay: `${index * 45}ms` }}
    >
      <Photo
        photo={fromPool('temples', index)}
        ratio="16/10"
        className="w-full"
        fallbackSeed={index + 1}
        imgClassName="transition-transform duration-700 group-hover:scale-105"
        scrim
      >
        {x.liveDarshan && (
          <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full border border-line-strong bg-bg-deep/70 px-2.5 py-1 text-[10px] text-ember backdrop-blur">
            <span className="size-1.5 animate-pulse rounded-full bg-ember" /> Live
          </span>
        )}
      </Photo>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-3">
        <span className="font-display text-[15px] leading-tight text-ink">{x.shortName}</span>
        <p className="mt-1 text-[11.5px] text-ink-faint">
          {x.city}, {x.stateCode}
        </p>
        <p className="mt-3 text-[12px] text-gold-light/85">
          {clockIn(x.timezone)} {x.tzLabel}
        </p>
        <p className="mt-0.5 text-[11px] text-ink-faint">Kakad {to12h(x.aartis[0].time)}</p>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setTempleId(x.id)}
            className={cn(
              'flex-1 rounded-full border px-3 py-1.5 text-[11.5px] transition-colors',
              active
                ? 'border-ember/50 bg-ember/15 text-ember-soft'
                : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
            )}
          >
            {active ? 'Your sannidhi' : 'Choose'}
          </button>
          <Link
            to={`/temples/${x.id}`}
            className="grid size-7 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
            aria-label={`About ${x.shortName}`}
          >
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  )
}
