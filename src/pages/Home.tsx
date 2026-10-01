import { Link } from 'react-router-dom'
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  Clock,
  Flame,
  HandHeart,
  HeartHandshake,
  Mail,
  MapPin,
  PackageCheck,
  Radio,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Users,
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
import {
  BhikshaBowlIcon,
  DhuniPotIcon,
  EmberField,
  Mandala,
  NeemLeafIcon,
  OmMark,
  PadukasIcon,
  SacredGeometryPattern,
  TempleArch,
} from '../components/Sacred'
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
    <div ref={ref} className="relative">
      {/* ============ HERO SECTION ============ */}
      <section className="relative overflow-hidden px-5 pb-12 pt-6 sm:px-8 sm:pb-16 sm:pt-10">
        {/* Background photo + warm spiritual lighting */}
        <Photo photo={photos.templeNight} fill className="z-0 opacity-40 dark:opacity-60" priority fallbackSeed={2} />
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-bg/95 via-bg/85 to-bg-deep/90" />
        <div className="absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        <EmberField count={28} className="z-0" />
        
        {/* Sacred Geometry background elements */}
        <Mandala className="pointer-events-none absolute -right-36 -top-24 z-0 size-[580px] opacity-[0.16] animate-slow-spin text-gold" />
        <Mandala
          rings={2}
          className="pointer-events-none absolute -bottom-36 -left-36 z-0 size-[460px] opacity-[0.10] animate-reverse-spin text-saffron"
        />
        <TempleArch className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[260px] w-full opacity-40 text-gold" />

        <div className="relative z-10 mx-auto grid max-w-[1400px] items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="rise-in">
            {/* Top Divine Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-saffron/40 bg-gradient-to-r from-saffron/15 via-maroon/10 to-transparent px-4 py-1.5 shadow-xs">
              <span className="flex size-5 items-center justify-center rounded-full bg-saffron text-white">
                <Flame size={12} className="animate-pulse" />
              </span>
              <span className="text-[11.5px] font-semibold uppercase tracking-[0.25em] text-saffron dark:text-saffron-light">
                {isThursday ? 'Guruvar · Baba’s Sacred Day' : `${temples.length} Sannidhis · One Sangha`}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-5 text-balance font-display text-[2.8rem] leading-[1.05] sm:text-6xl lg:text-[4.2rem]">
              <span className="divine-text block drop-shadow-xs font-medium">Sabka Malik Ek</span>
              <span className="mt-1 block text-ink">One Master of all.</span>
            </h1>

            {/* Sacred Tagline in Devanagari */}
            <div className="mt-3 flex items-center gap-3">
              <span className="font-deva text-xl text-saffron font-medium">सबका मालिक एक</span>
              <span className="h-1.5 w-1.5 rounded-full bg-gold/60" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-medium">Shraddha · Saburi</span>
            </div>

            {/* Description */}
            <p className="mt-5 max-w-xl text-pretty text-[15px] sm:text-[16px] leading-relaxed text-ink-soft">
              {t('label.greeting')}. From the sacred Dhuni in Shirdi to ten sanctified sannidhis across North
              America — keeping the same eternal flame, four daily aartis, and open annadanam. Find your temple,
              participate in live darshan, and offer your seva from anywhere.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Button to="/sevas" variant="saffron" size="lg">
                <HandHeart size={17} /> {t('cta.bookSeva')} <ArrowRight size={16} />
              </Button>
              <Button to="/darshan" variant="ghost" size="lg" className="border-crimson/30 hover:border-crimson/60">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-crimson" />
                </span>
                <Radio size={16} className="text-crimson" /> Live Darshan
              </Button>
              <Button to="/annadanam" variant="outline" size="lg">
                <Utensils size={16} className="text-amber" /> Sponsor Annadanam
              </Button>
            </div>

            {/* Quick Feature Stats */}
            <div className="mt-10 grid max-w-lg grid-cols-3 gap-3.5 sm:gap-4">
              <Stat
                icon={<PadukasIcon size={22} className="text-saffron" />}
                value={temples.length}
                label="Sannidhis"
                sub="across 8 states"
              />
              <Stat
                icon={<DhuniPotIcon size={22} className="text-amber" />}
                value="4"
                label="Daily Aartis"
                sub="Kakad to Shej"
              />
              <Stat
                icon={<Users size={20} className="text-gold" />}
                value="38k+"
                label="Devotees"
                sub="in North America"
              />
            </div>
          </div>

          {/* Right Hero Card: Grand Baba Live Shrine & Overlapping Aarti Ring */}
          <div className="relative mx-auto w-full max-w-[410px] sm:max-w-[440px] lg:max-w-[450px] -mt-7 lg:-mt-10">
            {/* Radiant Golden-Saffron Divine Aura Halo */}
            <div
              className="absolute -inset-7 -z-10 rounded-[44px] bg-[radial-gradient(circle_at_50%_40%,rgba(255,111,0,0.28),rgba(212,175,55,0.20),rgba(136,14,79,0.10),transparent_70%)] blur-2xl animate-pulse pointer-events-none"
              style={{ animationDuration: '6s' }}
            />
            <Mandala className="pointer-events-none absolute -top-10 -right-10 size-[300px] opacity-[0.12] animate-slow-spin text-gold" />
            
            {/* Main Shrine Card with Ornate Gold Frame */}
            <div className="gold-border-glow relative overflow-hidden rounded-3xl border-2 border-gold/45 bg-surface shadow-xl transition-all duration-500 hover:shadow-saffron/20 hover:border-gold">
              {/* Top Velvet Temple Header Bar */}
              <div className="flex items-center justify-between border-b border-gold/30 bg-gradient-to-r from-maroon/25 via-surface to-saffron/20 px-4 py-2.5 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <span className="flex size-1.5 rounded-full bg-saffron animate-ping" />
                  <span className="font-deva text-[13px] font-semibold text-saffron tracking-wide">
                    ॥ श्री साईंनाथाय नमः ॥
                  </span>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-crimson/15 border border-crimson/30 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-wider text-crimson">
                  <span className="size-1.5 rounded-full bg-crimson animate-pulse" />
                  Live Sannidhi
                </div>
              </div>

              {/* Main Hero Photo Showcase - 3D Divine Sai Baba on Lotus */}
              <div className="relative h-[360px] sm:h-[390px] w-full overflow-hidden bg-[#0a0a0c]">
                <img
                  src="/art/saibaba-divine.jpg"
                  alt="Shirdi Sai Baba Sacred 3D Lotus Enshrined Murti"
                  className="h-full w-full object-contain object-center transition-transform duration-1000 hover:scale-105"
                />
                
                {/* Ambient Divine Embers over Portrait */}
                <EmberField count={12} className="opacity-70 pointer-events-none" />

                {/* Top Dark Scrim for Temple Information */}
                <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/85 via-black/45 to-transparent px-4 pb-12 pt-3.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="block font-display text-lg sm:text-xl font-bold text-white drop-shadow-md">
                        {temple.name}
                      </span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-[11.5px] font-medium text-amber-200 drop-shadow-xs">
                        <Clock size={12} className="text-gold" />
                        {clockIn(temple.timezone)} {temple.tzLabel} · {temple.city}, {temple.stateCode}
                      </span>
                    </div>
                    <span className="rounded-md border border-gold/35 bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-gold backdrop-blur-md shrink-0 shadow-sm">
                      Est. {temple.established}
                    </span>
                  </div>
                </div>

                {/* Bottom Ambient Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Overlapping Floating Aarti Card at Bottom Right */}
            <div className="panel elevated absolute -bottom-10 sm:-bottom-12 -right-3 sm:-right-5 z-20 w-[min(78vw,224px)] rounded-2xl border-2 border-gold/50 bg-surface/95 p-3 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-[1.02]">
              <AartiRing temple={temple} size={184} />
            </div>
          </div>
        </div>
      </section>

      {/* ============ TODAY: PANCHANG & AARTI TIMINGS ============ */}
      <Section wide className="py-5 sm:py-7">
        <div className="grid gap-5 md:grid-cols-[1.1fr_1.9fr]">
          {/* Panchang Card */}
          <div className="panel reveal relative flex flex-col overflow-hidden bg-surface shadow-md">
            {/* Top Velvet Accent Strip */}
            <div className="flex items-center justify-between border-b border-line bg-gradient-to-r from-maroon/15 via-saffron/10 to-transparent px-6 py-3">
              <div className="flex items-center gap-2">
                <OmMark size={18} className="text-saffron" />
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-saffron">
                  {t('label.todayPanchang')}
                </p>
              </div>
              <Badge tone="gold">Vedic Tithi</Badge>
            </div>

            <div className="flex flex-1 flex-col px-6 py-5">
              <p className="font-display text-xl font-medium text-ink">
                {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <p className="mt-0.5 text-[12px] font-medium text-gold">
                {panchang.masa} · {panchang.samvat}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-2.5 text-[12.5px]">
                <PanchangBadge label="Tithi" value={panchang.tithi} />
                <PanchangBadge label="Nakshatra" value={panchang.nakshatra} />
                <PanchangBadge label="Yoga" value={panchang.yoga} />
                <PanchangBadge label="Karana" value={panchang.karana} />
                <PanchangBadge label="Sunrise" value={panchang.sunrise} icon={<SunMedium size={12} className="text-amber" />} />
                <PanchangBadge label="Rahu Kalam" value={panchang.rahuKalam} />
              </div>

              {isThursday && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-saffron/30 bg-saffron/10 px-3.5 py-2 text-[12px] text-saffron font-medium">
                  <Sparkles size={14} className="shrink-0 text-saffron" />
                  <span>Thursday Special — Palki, Annadanam & Udi Prasad at all sannidhis</span>
                </div>
              )}
            </div>
          </div>

          {/* Aarti Schedule Card */}
          <div className="panel reveal flex flex-col overflow-hidden bg-surface shadow-md px-6 py-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line/60 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-saffron">
                  Daily Aarti Schedule
                </span>
                <h3 className="font-display text-lg font-medium text-ink mt-0.5">
                  {temple.shortName} · {temple.city}, {temple.stateCode}
                </h3>
              </div>
              <Link
                to="/aarti"
                className="inline-flex items-center gap-1 text-[12.5px] font-medium text-saffron hover:text-saffron-light transition-colors"
              >
                Lyrics & Meanings <ArrowRight size={13} />
              </Link>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {temple.aartis.map((a, idx) => {
                const isFirst = idx === 0
                return (
                  <div
                    key={a.key}
                    className={cn(
                      'group relative rounded-xl border p-3.5 transition-all duration-300 hover:-translate-y-0.5',
                      isFirst
                        ? 'border-saffron/40 bg-gradient-to-br from-saffron/15 via-surface to-amber/10 shadow-xs'
                        : 'border-line bg-surface-2/60 hover:border-gold/50',
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-deva text-[12.5px] font-semibold text-saffron">{a.sanskrit}</p>
                      {isFirst && (
                        <span className="rounded-full bg-saffron px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
                          First
                        </span>
                      )}
                    </div>
                    <p className="mt-1 font-display text-[15px] font-medium text-ink">{a.name}</p>
                    <p className="mt-1.5 font-display text-xl font-semibold text-saffron">{to12h(a.time)}</p>
                    <p className="mt-1 text-[11px] text-ink-faint">
                      {a.duration} min · {temple.tzLabel}
                    </p>
                  </div>
                )
              })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-2/60 px-4 py-2.5 text-[12.5px] text-ink-soft border border-line/60">
              <span>
                <strong className="text-saffron font-medium">{temple.highlight}.</strong> Weekdays: {temple.hours.weekday} | Weekends: {temple.hours.weekend}
              </span>
              <Link to="/temples" className="text-[12px] font-semibold text-gold hover:underline">
                Change Temple ({temple.shortName})
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ QUICK ACTIONS (6 Divine Feature Cards) ============ */}
      <Section wide className="py-4 sm:py-6">
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {[
            {
              to: '/sevas',
              label: 'Book a Seva',
              sub: '20 sacred poojas',
              tag: 'Archana & Homam',
              gradient: 'from-[#ff9100] via-[#ff6f00] to-[#e65100]',
              borderHover: 'hover:border-[#e65100]',
              topBar: 'bg-gradient-to-r from-[#ff9100] to-[#e65100]',
              bgTint: 'hover:bg-[#ff6f00]/5',
              glow: 'hover:shadow-[0_12px_28px_-10px_rgba(230,81,0,0.35)]',
              icon: <PadukasIcon size={22} className="text-white drop-shadow-xs" />,
            },
            {
              to: '/annadanam',
              label: 'Annadanam',
              sub: 'Sponsor daily meals',
              tag: 'Maha Prasad',
              gradient: 'from-[#ffca28] via-[#ffa000] to-[#f57c00]',
              borderHover: 'hover:border-[#ffa000]',
              topBar: 'bg-gradient-to-r from-[#ffca28] to-[#ffa000]',
              bgTint: 'hover:bg-[#ffa000]/5',
              glow: 'hover:shadow-[0_12px_28px_-10px_rgba(255,160,0,0.35)]',
              icon: <BhikshaBowlIcon size={22} className="text-white drop-shadow-xs" />,
            },
            {
              to: '/darshan',
              label: 'Live Darshan',
              sub: '8 temples streaming',
              tag: '🔴 Live Streaming',
              gradient: 'from-[#ef5350] via-[#d32f2f] to-[#b71c1c]',
              borderHover: 'hover:border-[#b71c1c]',
              topBar: 'bg-gradient-to-r from-[#ef5350] to-[#b71c1c]',
              bgTint: 'hover:bg-[#b71c1c]/5',
              glow: 'hover:shadow-[0_12px_28px_-10px_rgba(183,28,28,0.35)]',
              icon: <Radio size={21} className="text-white drop-shadow-xs" />,
            },
            {
              to: '/satcharitra',
              label: 'Sai Satcharitra',
              sub: '53 holy chapters',
              tag: `${parayan.length}/53 Chapters`,
              gradient: 'from-[#66bb6a] via-[#2f6354] to-[#1b5e20]',
              borderHover: 'hover:border-[#2f6354]',
              topBar: 'bg-gradient-to-r from-[#66bb6a] to-[#2f6354]',
              bgTint: 'hover:bg-[#2f6354]/5',
              glow: 'hover:shadow-[0_12px_28px_-10px_rgba(47,99,84,0.35)]',
              icon: <NeemLeafIcon size={22} className="text-white drop-shadow-xs" />,
            },
            {
              to: '/events',
              label: 'Festivals',
              sub: `${upcoming.length} upcoming utsavs`,
              tag: 'Holy Celebrations',
              gradient: 'from-[#ffd54f] via-[#d4af37] to-[#c59b27]',
              borderHover: 'hover:border-[#d4af37]',
              topBar: 'bg-gradient-to-r from-[#ffd54f] to-[#d4af37]',
              bgTint: 'hover:bg-[#d4af37]/5',
              glow: 'hover:shadow-[0_12px_28px_-10px_rgba(212,175,55,0.35)]',
              icon: <CalendarDays size={21} className="text-[#1c140e] drop-shadow-xs" />,
            },
            {
              to: '/donate',
              label: 'Sacred Dan',
              sub: 'Tax-deductible offering',
              tag: '501(c)(3) Exempt',
              gradient: 'from-[#ba68c8] via-[#880e4f] to-[#4a148c]',
              borderHover: 'hover:border-[#880e4f]',
              topBar: 'bg-gradient-to-r from-[#ba68c8] to-[#880e4f]',
              bgTint: 'hover:bg-[#880e4f]/5',
              glow: 'hover:shadow-[0_12px_28px_-10px_rgba(136,14,79,0.35)]',
              icon: <DhuniPotIcon size={22} className="text-white drop-shadow-xs" />,
            },
          ].map((a, i) => (
            <Link
              key={a.to}
              to={a.to}
              className={cn(
                'reveal group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-1.5 shadow-xs',
                a.borderHover,
                a.bgTint,
                a.glow,
              )}
              style={{ transitionDelay: `${i * 35}ms` }}
            >
              {/* Top Accent Color Bar */}
              <span className={cn('absolute inset-x-0 top-0 h-1', a.topBar)} />
              
              {/* Sacred Geometry watermark in top right corner */}
              <SacredGeometryPattern className="pointer-events-none absolute -right-3 -top-3 size-16 opacity-[0.06] group-hover:opacity-[0.14] transition-opacity text-current" />

              <div>
                <div className="flex items-center justify-between">
                  {/* Glowing Vibrant Gradient Icon Circle */}
                  <span
                    className={cn(
                      'flex size-11 items-center justify-center rounded-xl bg-gradient-to-br shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3',
                      a.gradient,
                    )}
                  >
                    {a.icon}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-ink-faint group-hover:text-ink transition-colors">
                    {a.tag}
                  </span>
                </div>

                <h3 className="mt-3.5 font-display text-[15.5px] font-medium leading-tight text-ink group-hover:text-saffron transition-colors">
                  {a.label}
                </h3>
                <p className="mt-1 text-[12px] leading-snug text-ink-soft">{a.sub}</p>
              </div>

              <div className="mt-3 flex items-center gap-1 text-[11.5px] font-medium text-saffron opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Explore</span>
                <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ============ BABA'S QUOTE (Divine Parchment Card) ============ */}
      <Section className="py-6 sm:py-8">
        <div className="reveal relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-b from-surface-2/80 via-surface to-surface-2/90 px-6 py-9 text-center shadow-lg sm:px-12 sm:py-11">
          <Mandala className="pointer-events-none absolute left-1/2 top-1/2 z-0 size-[480px] -translate-x-1/2 -translate-y-1/2 opacity-[0.10] animate-slow-spin text-gold" />
          <SacredGeometryPattern className="pointer-events-none absolute -right-6 -top-6 size-32 opacity-15 text-saffron" />
          <SacredGeometryPattern className="pointer-events-none absolute -bottom-6 -left-6 size-32 opacity-15 text-gold" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-saffron/10 px-3.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.28em] text-saffron">
              <PadukasIcon size={14} className="text-saffron" />
              {t('label.quote')}
            </div>

            <blockquote className="mt-5 text-balance font-quote text-2xl italic leading-snug text-ink sm:text-[2.3rem]">
              “{quote.text}”
            </blockquote>

            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-gold/50" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.25em] text-saffron">— {quote.source}</p>
              <span className="h-px w-8 bg-gold/50" />
            </div>
          </div>
        </div>
      </Section>

      {/* ============ FESTIVALS SECTION ============ */}
      <Section wide className="py-6 sm:py-8">
        <SectionHeading
          align="left"
          eyebrow="Sacred Celebrations"
          title="Festivals at Every Sannidhi"
          sub="Punyatithi, Ram Navami, Guru Purnima and the weekly Thursday palki — united under one calendar."
          action={
            <Button to="/events" variant="outline">
              Full Calendar <ArrowRight size={15} />
            </Button>
          }
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {upcoming.map((e, i) => (
            <Link
              key={e.id}
              to={`/events/${e.id}`}
              className="reveal group temple-futuristic-card flex flex-col"
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              {/* Photo & High-Contrast Top Badges */}
              <div className="relative h-48 w-full overflow-hidden">
                <Photo
                  photo={fromPool('festivals', i)}
                  className="h-full w-full"
                  fallbackSeed={i * 3 + 2}
                  imgClassName="temple-photo-zoom object-cover"
                />
                {/* Top protective vignette for crystal clear badge contrast on any photo */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/75 via-black/35 to-transparent" />
                
                {/* Top Left Badges */}
                <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md",
                      e.category === 'Festival'
                        ? "bg-crimson/90 text-white border border-white/20"
                        : "bg-saffron/90 text-white border border-white/20"
                    )}
                  >
                    {e.category}
                  </span>
                  <span className="rounded-full border border-white/25 bg-black/55 px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide text-amber-200 shadow-md backdrop-blur-md">
                    {relativeDay(e.date)}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-saffron">
                  <CalendarDays size={13} className="text-saffron shrink-0" />
                  <span>
                    {fmtDayMonth(e.date)}
                    {e.endDate ? ` – ${fmtDayMonth(e.endDate)}` : ''}
                  </span>
                </div>

                <h3 className="mt-1.5 text-balance text-[17.5px] font-medium leading-snug text-ink group-hover:text-saffron transition-colors">
                  {e.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ink-soft">{e.summary}</p>
                
                {e.rsvp && e.seats && (
                  <div className="mt-4 border-t border-line/60 pt-3">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-ink-soft">Registered Devotees</span>
                      <span className="font-semibold text-saffron">{e.seatsTaken} / {e.seats}</span>
                    </div>
                    <Progress value={e.seatsTaken ?? 0} max={e.seats} />
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ============ SEVAS SECTION ============ */}
      <Section wide className="py-6 sm:py-8">
        <SectionHeading
          align="left"
          eyebrow="Devotional Offerings"
          title="Most Requested Sevas"
          sub="Performed in your name and gotra at your chosen sannidhi, with consecrated prasad and sacred Udi delivered to you."
          action={
            <Button to="/sevas" variant="outline">
              View All 20 Sevas <ArrowRight size={15} />
            </Button>
          }
        />
        <div className="grid gap-4.5 sm:grid-cols-2 xl:grid-cols-4">
          {featured.map((s, i) => (
            <Link
              key={s.id}
              to="/sevas"
              className="reveal group panel flex flex-col px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-saffron/50 hover:shadow-lg bg-surface"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="flex items-start justify-between gap-3">
                <Badge tone="saffron">{s.category}</Badge>
                <span className="font-display text-xl font-bold text-saffron">{usd(s.price)}</span>
              </div>
              {s.sanskrit && <p className="mt-3 font-deva text-[13px] font-semibold text-gold">{s.sanskrit}</p>}
              <h3 className="mt-1 text-balance text-[16.5px] font-medium leading-snug text-ink group-hover:text-saffron transition-colors">
                {s.name}
              </h3>
              <p className="mt-2 line-clamp-3 flex-1 text-[13px] leading-relaxed text-ink-soft">{s.description}</p>
              <div className="mt-4 flex items-center gap-2 border-t border-line/60 pt-3 text-[11.5px] text-ink-faint">
                <span className="rounded-full border border-line bg-surface-2 px-2.5 py-0.5">{s.duration}</span>
                {s.bestDay && (
                  <span className="rounded-full border border-saffron/25 bg-saffron/10 px-2.5 py-0.5 text-saffron font-medium">
                    {s.bestDay}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ============ TEMPLE NETWORK SECTION ============ */}
      <Section wide className="py-6 sm:py-8">
        <SectionHeading
          eyebrow="North America Sannidhis"
          title="Ten Sannidhis, One Sacred Dhuni"
          sub="Select your local temple to personalize timings, aarti alerts, and community services."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {temples.map((x, i) => (
            <TempleMini key={x.id} id={x.id} index={i} />
          ))}
        </div>
      </Section>

      {/* ============ CAMPAIGNS & ANNADANAM ============ */}
      <Section wide className="py-6 sm:py-8">
        <SectionHeading
          align="left"
          eyebrow="Sacred Giving"
          title="Seva That Feeds & Heals"
          sub="Every temple is a registered 501(c)(3) tax-exempt organization. Immediate donation receipts and consolidated tax letters."
          action={
            <Button to="/donate" variant="outline">
              Make a Donation <ArrowRight size={15} />
            </Button>
          }
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {topCampaigns.map((c) => (
            <Panel key={c.id} hover className="reveal flex flex-col px-6 py-6 bg-surface shadow-md">
              <div className="flex items-start justify-between gap-3">
                <Badge tone={c.tag === 'Urgent' ? 'maroon' : 'neem'}>{c.tag}</Badge>
                <span className="text-[11.5px] font-medium text-ink-faint">{c.donors.toLocaleString()} donors</span>
              </div>
              <h3 className="mt-3 text-[17.5px] font-medium leading-snug text-ink">{c.title}</h3>
              <p className="mt-2 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ink-soft">{c.purpose}</p>
              <div className="mt-5">
                <Progress value={c.raised} max={c.goal} />
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-display text-lg font-bold text-saffron">{usd(c.raised)}</span>
                  <span className="text-[11.5px] text-ink-faint">of {usd(c.goal)}</span>
                </div>
              </div>
              <Button to="/donate" variant="ghost" size="sm" className="mt-4 border-saffron/30 hover:bg-saffron/10 text-saffron" full>
                Contribute with Card / Zelle
              </Button>
            </Panel>
          ))}
        </div>
      </Section>

      {/* ============ SATCHARITRA & TEACHINGS ============ */}
      <Section wide className="py-6 sm:py-8">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Panel className="reveal relative overflow-hidden px-7 py-7 bg-surface shadow-md flex flex-col justify-between">
            <Mandala
              rings={2}
              className="pointer-events-none absolute -right-20 -top-20 size-[320px] opacity-[0.10] animate-slow-spin text-gold"
            />
            <div className="relative">
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <NeemLeafIcon size={16} className="text-neem" />
                  <p className="text-[10.5px] font-bold uppercase tracking-[0.25em] text-neem">Chapter For Today</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge tone="saffron">{chapterOfDay.theme}</Badge>
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="mt-3.5 flex items-baseline gap-3">
                <p className="font-display text-3xl sm:text-4xl font-bold text-saffron">Chapter {chapterOfDay.n}</p>
                <span className="text-[12px] font-medium text-ink-faint">
                  {chapterOfDay.verses} Verses · ~10 min read
                </span>
              </div>
              <h3 className="mt-1 text-balance text-[18.5px] font-medium leading-snug text-ink">{chapterOfDay.title}</h3>

              {/* Excerpt Quote */}
              <div className="mt-3.5 rounded-xl border-l-2 border-saffron bg-surface-2/70 p-3.5">
                <p className="font-quote text-[15.5px] italic leading-relaxed text-ink">
                  “{chapterOfDay.excerpt}”
                </p>
              </div>

              {/* Spiritual Insight / Leela Takeaway */}
              <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-line/60 bg-gradient-to-r from-surface-2/60 to-surface/40 p-3 text-[12px] text-ink-soft">
                <BookOpen size={15} className="text-saffron shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="text-ink font-semibold">Parayan Blessing:</strong> Reading this chapter with devotion frees one from worldly anxieties and grants inner peace and unwavering faith in Baba.
                </p>
              </div>
            </div>

            {/* Parayan Progress & Action */}
            <div className="relative mt-5 border-t border-line/60 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex-1 min-w-[200px]">
                  <div className="flex items-center justify-between mb-1 text-[11.5px]">
                    <span className="text-ink-soft">Your Parayan Progress</span>
                    <span className="font-semibold text-saffron">{parayan.length} of 53 Completed</span>
                  </div>
                  <Progress value={parayan.length} max={53} />
                  <p className="mt-1 text-[10.5px] text-ink-faint">
                    {Math.round((parayan.length / 53) * 100)}% complete · Read 1 chapter daily for peace & grace
                  </p>
                </div>
                <Button to="/satcharitra" variant="saffron" size="sm">
                  Read Chapter {chapterOfDay.n} →
                </Button>
              </div>
            </div>
          </Panel>

          <Panel className="reveal px-7 py-8 bg-surface shadow-md">
            <p className="text-[10.5px] font-bold uppercase tracking-[0.25em] text-saffron">Two Coins of Sai</p>
            <h3 className="mt-2 text-[22px] font-medium leading-snug">
              Baba asked for only <span className="text-saffron font-bold">Shraddha</span> (Faith) and{' '}
              <span className="text-gold font-bold">Saburi</span> (Patience).
            </h3>
            <div className="mt-5 space-y-4">
              {guidingPrinciples.slice(0, 3).map((p) => (
                <div key={p.title} className="border-l-2 border-saffron/60 pl-4">
                  <p className="flex items-baseline gap-2.5">
                    <span className="font-display text-[15px] font-semibold text-ink">{p.title}</span>
                    <span className="font-deva text-[12.5px] text-saffron">{p.sanskrit}</span>
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-ink-soft">{p.body}</p>
                </div>
              ))}
            </div>
            <Button to="/teachings" variant="ghost" size="sm" className="mt-5">
              Read Baba's Assurances <ArrowRight size={14} />
            </Button>
          </Panel>
        </div>
      </Section>

      {/* ============ DEVOTEE EXPERIENCES ============ */}
      <Section wide className="py-6 sm:py-8">
        <SectionHeading
          eyebrow="Sangha Voices"
          title="Devotee Leelas & Miracles"
          sub="Personal accounts submitted by devotees across North America experiencing Baba's omnipresent grace."
        />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {experiences.slice(0, 3).map((e) => (
            <Panel key={e.id} hover className="reveal flex flex-col px-6 py-6 bg-surface shadow-md">
              <div className="flex flex-wrap gap-2">
                {e.tags.map((tg) => (
                  <Chip key={tg}>{tg}</Chip>
                ))}
              </div>
              <h3 className="mt-4 text-balance text-[17.5px] font-medium leading-snug text-ink">{e.title}</h3>
              <p className="mt-2.5 line-clamp-4 flex-1 font-quote text-[15.5px] leading-relaxed text-ink-soft">
                “{e.body}”
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-line/60 pt-3 text-[12px]">
                <span className="font-medium text-ink">
                  {e.author} <span className="text-ink-faint">· {e.city}</span>
                </span>
                <span className="flex items-center gap-1 font-semibold text-saffron">
                  <Flame size={12} /> {e.blessings} Blessings
                </span>
              </div>
            </Panel>
          ))}
        </div>
        <div className="reveal mt-6 text-center">
          <Button to="/experiences" variant="outline">
            Read All Experiences or Share Yours <ArrowRight size={15} />
          </Button>
        </div>
      </Section>

      {/* ============ CLOSING SACRED CTA ============ */}
      <Section wide className="pb-14 pt-4">
        <div className="reveal relative overflow-hidden rounded-3xl border border-saffron/30 bg-gradient-to-br from-surface via-surface-2 to-surface p-7 sm:p-10 lg:p-12 shadow-xl">
          <Photo photo={photos.dhuniFire} fill fallbackSeed={3} className="opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/85 to-bg/95" />
          <EmberField count={18} />
          <Mandala className="pointer-events-none absolute -right-16 -bottom-16 size-[440px] opacity-[0.10] animate-reverse-spin text-saffron" />
          
          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            {/* Left Column: Core Message & Actions */}
            <div>
              <div className="flex items-center gap-2">
                <DhuniPotIcon size={24} className="text-saffron" />
                <p className="font-deva text-[16px] font-bold text-saffron">ॐ साईं राम</p>
                <span className="ml-2 inline-flex items-center gap-1 rounded-full border border-saffron/30 bg-saffron/10 px-2.5 py-0.5 text-[10.5px] font-bold tracking-wide text-saffron uppercase">
                  Akhand Dhuni Seva
                </span>
              </div>
              <h2 className="mt-3.5 text-balance font-display text-3xl font-medium leading-tight sm:text-[2.5rem]">
                Sacred Udi from the Dhuni, <span className="bg-gradient-to-r from-saffron to-gold bg-clip-text text-transparent">Delivered to Your Home</span>
              </h2>
              <p className="mt-3.5 text-pretty text-[15px] leading-relaxed text-ink-soft">
                If you are unable to physically visit the sannidhi, receive blessed Udi ash consecrated at the eternal Dhuni, sacred kumkum, and prasadam delivered directly to your doorstep anywhere across the United States and Canada.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3.5">
                <Button to="/sevas" variant="saffron" size="lg" className="shadow-lg shadow-saffron/20">
                  <Mail size={16} /> Request Sacred Udi & Prasad
                </Button>
                <Button to="/volunteer" variant="outline" size="lg">
                  <HeartHandshake size={16} /> Volunteer at Sannidhi
                </Button>
              </div>

              {/* Assurance trust points */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px]">
                <span className="flex items-center gap-1.5 text-ink-soft">
                  <ShieldCheck size={14} className="text-neem" /> Consecrated Daily
                </span>
                <span className="flex items-center gap-1.5 text-ink-soft">
                  <PackageCheck size={14} className="text-saffron" /> Sealed Sacred Packaging
                </span>
                <span className="flex items-center gap-1.5 text-ink-soft">
                  <HeartHandshake size={14} className="text-gold" /> Free Devotee Service
                </span>
              </div>
            </div>

            {/* Right Column: 3 Sacred Offering Highlights */}
            <div className="space-y-3 rounded-2xl border border-line/60 bg-surface/80 p-4 sm:p-5 backdrop-blur-sm shadow-inner">
              <div className="flex items-start gap-3.5 rounded-xl border border-line/50 bg-surface-2/60 p-3.5 transition-colors hover:border-saffron/40">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-saffron/15 text-saffron">
                  <Flame size={18} />
                </div>
                <div>
                  <h4 className="font-display text-[14px] font-semibold text-ink">Akhand Dhuni Ash (उदी)</h4>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
                    Collected directly from the sacred unbroken fire of the Sannidhi, carrying Baba's healing blessings.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-line/50 bg-surface-2/60 p-3.5 transition-colors hover:border-saffron/40">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <BhikshaBowlIcon size={18} />
                </div>
                <div>
                  <h4 className="font-display text-[14px] font-semibold text-ink">Sanctified Prasad & Kumkum</h4>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
                    Offered during Kakad and Shej Aartis, packed hermetically with sacred chandan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 rounded-xl border border-line/50 bg-surface-2/60 p-3.5 transition-colors hover:border-saffron/40">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-neem/15 text-neem">
                  <NeemLeafIcon size={18} />
                </div>
                <div>
                  <h4 className="font-display text-[14px] font-semibold text-ink">All 50 US States & Canada</h4>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">
                    Dispatched weekly by our network of seva volunteers with tracking and utmost reverence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function PanchangBadge({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line/60 bg-surface-2/60 px-3 py-2">
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-faint">
        {icon}
        {label}
      </p>
      <p className="mt-0.5 font-medium text-ink truncate">{value}</p>
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
        'reveal group temple-futuristic-card flex flex-col',
        active
          ? 'ring-2 ring-saffron shadow-lg shadow-saffron/15 border-saffron'
          : 'border-line hover:border-saffron/70',
      )}
      style={{ transitionDelay: `${index * 35}ms` }}
    >
      {/* Top Accent Glowing Line */}
      <span
        className={cn(
          'absolute inset-x-0 top-0 h-[3px] z-10 transition-opacity duration-500',
          active
            ? 'bg-gradient-to-r from-amber to-saffron opacity-100'
            : 'bg-gradient-to-r from-saffron/60 via-gold to-amber/60 opacity-0 group-hover:opacity-100',
        )}
      />

      {/* Ambient background bloom on hover */}
      <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-saffron/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Photo Container with Ultra-Smooth Zoom */}
      <div className="relative overflow-hidden bg-black/10">
        <Photo
          photo={fromPool('temples', index)}
          ratio="16/10"
          className="w-full"
          fallbackSeed={index + 1}
          imgClassName="temple-photo-zoom transform-gpu will-change-transform"
        >
          {/* Glassmorphic State Badge */}
          <div className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full border border-white/25 bg-black/60 px-2.5 py-0.5 text-[10.5px] font-semibold text-white backdrop-blur-md shadow-xs">
            <span className="size-1.5 rounded-full bg-amber" />
            <span>{x.stateCode} · Sannidhi</span>
          </div>

          <div className="absolute right-2.5 top-2.5 rounded-full border border-white/15 bg-black/55 px-2 py-0.5 text-[9.5px] font-medium text-white/90 backdrop-blur-sm">
            {x.tzLabel}
          </div>
        </Photo>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col px-4.5 pb-4 pt-3.5 relative z-10">
        {/* Place Name and Live Badge Header Row */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <h4 className="font-display text-[16px] font-semibold leading-snug text-ink group-hover:text-saffron transition-colors">
              {x.shortName}
            </h4>

            {/* Unique Futuristic Live Badge next to place name */}
            {x.liveDarshan && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-crimson/35 bg-gradient-to-r from-crimson/15 to-transparent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-crimson shadow-xs backdrop-blur-xs">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-crimson" />
                </span>
                LIVE
              </span>
            )}
          </div>

          <p className="mt-0.5 flex items-center gap-1 text-[11.5px] text-ink-faint">
            <MapPin size={11} className="text-saffron shrink-0" />
            <span className="truncate">{x.city}, {x.stateCode}</span>
          </p>
        </div>

        {/* HUD Live Time & Aarti Bar */}
        <div className="mt-3 rounded-xl border border-line/60 bg-gradient-to-r from-surface-2/80 to-surface/90 px-3 py-2 text-[11.5px] shadow-xs group-hover:border-saffron/30 transition-colors">
          <div className="flex items-center justify-between text-saffron font-medium">
            <span className="flex items-center gap-1">
              <Clock size={11} className="text-amber" />
              <span>{clockIn(x.timezone)} {x.tzLabel}</span>
            </span>
            <span className="text-[11px] font-semibold text-ink-soft flex items-center gap-1">
              <Flame size={11} className="text-saffron" />
              Kakad {to12h(x.aartis[0].time)}
            </span>
          </div>
        </div>

        {/* Action Controls with Devotional Gateway Button */}
        <div className="mt-3.5 flex items-center gap-2">
          <button
            onClick={() => setTempleId(x.id)}
            className={cn(
              'flex-1 rounded-full border py-2 px-3 text-[12px] font-medium transition-all duration-300 cursor-pointer text-center',
              active
                ? 'border-transparent bg-gradient-to-r from-[#ff9100] to-[#e65100] text-white shadow-md shadow-saffron/25 font-semibold'
                : 'border-line text-ink-soft hover:border-saffron/70 hover:text-saffron hover:bg-saffron/10 active:scale-98',
            )}
          >
            {active ? 'Selected Sannidhi' : 'Select Temple'}
          </button>

          {/* Detail Link Button with Clean Color Transition */}
          <Link
            to={`/temples/${x.id}`}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-surface-2/70 text-ink-soft transition-all duration-300 hover:border-saffron hover:text-saffron group-hover:bg-saffron/10 group-hover:border-saffron/70 group-hover:text-saffron shadow-xs"
            aria-label={`About ${x.shortName}`}
          >
            <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}
