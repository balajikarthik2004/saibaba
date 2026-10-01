import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Check,
  ChevronDown,
  Flame,
  Globe,
  Heart,
  LayoutDashboard,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Moon,
  Phone,
  Settings,
  ShoppingBag,
  Sun,
  User,
  X,
} from 'lucide-react'
import { useApp } from '../lib/store'
import { temples } from '../data/temples'
import { announcements } from '../data/community'
import { languages } from '../lib/i18n'
import { cn, usd } from '../lib/utils'
import { Divider, OmMark } from './Sacred'
import { AartiPill } from './AartiRing'

/* ---------------- navigation model ---------------- */

const navGroups = [
  {
    label: 'Worship',
    items: [
      { to: '/aarti', label: 'Aarti & Timings', desc: 'Four daily aartis, lyrics and meaning' },
      { to: '/sevas', label: 'Sevas & Poojas', desc: 'Archana, abhishekam, homam, vratham' },
      { to: '/darshan', label: 'Live Darshan', desc: 'Streaming from eight sannidhis' },
      { to: '/annadanam', label: 'Annadanam', desc: 'Sponsor a day of meals' },
    ],
  },
  {
    label: 'Gather',
    items: [
      { to: '/events', label: 'Festivals & Events', desc: 'Punyatithi, Ram Navami, Navratri' },
      { to: '/temples', label: 'Temple Network', desc: 'Ten sannidhis across the country' },
      { to: '/volunteer', label: 'Volunteer', desc: 'Kitchen, hospitality, media, teaching' },
      { to: '/gallery', label: 'Gallery', desc: 'Festivals, darshan and seva' },
    ],
  },
  {
    label: 'Learn',
    items: [
      { to: '/satcharitra', label: 'Sai Satcharitra', desc: '53 chapters with a parayan tracker' },
      { to: '/teachings', label: 'Teachings & Life', desc: 'Eleven Assurances, Shraddha & Saburi' },
      { to: '/experiences', label: 'Devotee Experiences', desc: 'Stories from the sangha' },
      { to: '/contact', label: 'Visiting & FAQ', desc: 'First time? Start here' },
    ],
  },
]

/* ---------------- header ---------------- */

export function Header() {
  const { temple, setTempleId, theme, toggleTheme, lang, setLang, cart, t } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [templeOpen, setTempleOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)

  // Close every open panel when the route changes — adjusted during render
  // rather than in an effect, so the menus never flash open on the new page.
  const [lastPath, setLastPath] = useState(location.pathname)
  if (lastPath !== location.pathname) {
    setLastPath(location.pathname)
    setMobileOpen(false)
    setOpenMenu(null)
    setTempleOpen(false)
    setLangOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
        setTempleOpen(false)
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <AnnouncementBar />

      <header
        ref={headerRef}
        className={cn(
          'sticky top-0 z-50 border-b transition-all duration-500',
          scrolled
            ? 'border-line bg-[var(--veil)] backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 py-3 sm:px-8">
          {/* brand */}
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <span className="relative grid size-10 place-items-center rounded-full border border-line-strong bg-surface">
              <OmMark size={20} className="text-gold transition-colors group-hover:text-ember" />
              <span className="absolute inset-0 rounded-full ring-gold opacity-60" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[17px] tracking-wide text-ink">Sai Sannidhi</span>
              <span className="mt-0.5 block text-[9.5px] uppercase tracking-[0.3em] text-gold/80">
                Shirdi Sai · North America
              </span>
            </span>
          </Link>

          {/* desktop nav */}
          <nav className="ml-4 hidden items-center gap-1 xl:flex">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-[13px] transition-colors',
                  isActive ? 'text-gold-light' : 'text-ink-soft hover:text-ink',
                )
              }
            >
              {t('nav.home')}
            </NavLink>

            {navGroups.map((group) => (
              <div key={group.label} className="relative">
                <button
                  onClick={() => setOpenMenu((m) => (m === group.label ? null : group.label))}
                  className={cn(
                    'flex items-center gap-1 rounded-full px-3.5 py-2 text-[13px] transition-colors',
                    openMenu === group.label ? 'text-gold-light' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {group.label}
                  <ChevronDown
                    size={13}
                    className={cn('transition-transform duration-300', openMenu === group.label && 'rotate-180')}
                  />
                </button>
                {openMenu === group.label && (
                  <div className="panel rise-in absolute left-0 top-full mt-2 w-[320px] p-2">
                    {group.items.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="block rounded-xl px-4 py-3 transition-colors hover:bg-surface-2"
                      >
                        <span className="block text-[13.5px] text-ink">{item.label}</span>
                        <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-faint">{item.desc}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <NavLink
              to="/donate"
              className={({ isActive }) =>
                cn(
                  'rounded-full px-3.5 py-2 text-[13px] transition-colors',
                  isActive ? 'text-gold-light' : 'text-ink-soft hover:text-ink',
                )
              }
            >
              {t('nav.donate')}
            </NavLink>
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <AartiPill temple={temple} className="hidden lg:inline-flex" />

            {/* temple switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => {
                  setTempleOpen((v) => !v)
                  setLangOpen(false)
                }}
                className="flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-2 text-[12px] text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
              >
                <MapPin size={13} className="text-gold" />
                <span className="max-w-[110px] truncate">{temple.shortName}</span>
                <ChevronDown size={12} className={cn('transition-transform', templeOpen && 'rotate-180')} />
              </button>
              {templeOpen && (
                <div className="panel rise-in absolute right-0 top-full mt-2 max-h-[70vh] w-[320px] overflow-y-auto p-2">
                  <p className="px-3 py-2 text-[10px] uppercase tracking-[0.26em] text-gold">
                    {t('label.chooseTemple')}
                  </p>
                  {temples.map((x) => (
                    <button
                      key={x.id}
                      onClick={() => {
                        setTempleId(x.id)
                        setTempleOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface-2',
                        x.id === temple.id && 'bg-surface-2',
                      )}
                    >
                      <span className="flex-1">
                        <span className="block text-[13px] text-ink">{x.shortName}</span>
                        <span className="block text-[11px] text-ink-faint">
                          {x.city}, {x.stateCode} · {x.tzLabel}
                        </span>
                      </span>
                      {x.id === temple.id && <Check size={14} className="text-ember" />}
                    </button>
                  ))}
                  <Link
                    to="/temples"
                    className="mt-1 block rounded-xl px-3 py-2.5 text-[12px] text-gold hover:bg-surface-2"
                  >
                    Find the sannidhi nearest you →
                  </Link>
                </div>
              )}
            </div>

            {/* language */}
            <div className="relative hidden md:block">
              <button
                onClick={() => {
                  setLangOpen((v) => !v)
                  setTempleOpen(false)
                }}
                className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
                aria-label="Change language"
              >
                <Globe size={15} />
              </button>
              {langOpen && (
                <div className="panel rise-in absolute right-0 top-full mt-2 w-44 p-2">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLang(l.code)
                        setLangOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition-colors hover:bg-surface-2',
                        lang === l.code ? 'text-gold-light' : 'text-ink-soft',
                      )}
                    >
                      <span>{l.native}</span>
                      {lang === l.code && <Check size={13} className="text-ember" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
              aria-label="Toggle light and dark"
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <Link
              to="/sevas/checkout"
              className="relative grid size-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
              aria-label="Seva basket"
            >
              <ShoppingBag size={15} />
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 grid size-4.5 min-w-[18px] place-items-center rounded-full bg-ember px-1 text-[10px] font-medium text-[#1a0d04]">
                  {cart.length}
                </span>
              )}
            </Link>

            <AccountControl />

            <button
              onClick={() => setMobileOpen(true)}
              className="grid size-9 place-items-center rounded-full border border-line text-ink xl:hidden"
              aria-label="Open menu"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
    </>
  )
}

/* ---------------- account control ---------------- */

function AccountControl() {
  const { user, signOut, notify } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  if (!user) {
    return (
      <Link
        to="/login"
        className="hidden items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-[12.5px] text-gold-light transition-colors hover:bg-gold/10 sm:inline-flex"
      >
        <User size={14} /> Sign in
      </Link>
    )
  }

  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 rounded-full border border-line bg-surface/60 py-1 pl-1 pr-3 transition-colors hover:border-line-strong"
      >
        <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-ember-soft to-ember text-[11px] font-medium text-[#1a0d04]">
          {initials}
        </span>
        <span className="max-w-[90px] truncate text-[12.5px] text-ink-soft">{user.name.split(' ')[0]}</span>
        <ChevronDown size={12} className={cn('text-ink-faint transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="panel rise-in absolute right-0 top-full mt-2 w-60 p-2">
          <div className="px-3 py-2.5">
            <p className="truncate text-[13px] text-ink">{user.name}</p>
            <p className="truncate text-[11.5px] text-ink-faint">{user.email}</p>
            <span className="mt-2 inline-block rounded-full border border-ember/35 bg-ember/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-ember-soft">
              {user.role}
            </span>
          </div>
          <div className="my-1 h-px bg-line" />
          {[
            { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { to: '/dashboard/sevas', label: 'My sevas', icon: ShoppingBag },
            { to: '/dashboard/giving', label: 'Giving & receipts', icon: Heart },
            { to: '/dashboard/profile', label: 'Profile', icon: Settings },
          ].map((i) => (
            <Link
              key={i.to}
              to={i.to}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink"
            >
              <i.icon size={14} className="text-gold" />
              {i.label}
            </Link>
          ))}
          <div className="my-1 h-px bg-line" />
          <button
            onClick={() => {
              signOut()
              setOpen(false)
              notify('Signed out', 'Om Sai Ram')
              navigate('/')
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-ink-soft transition-colors hover:bg-kumkum/10 hover:text-kumkum"
          >
            <LogOut size={14} />
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}

/* ---------------- announcement ticker ---------------- */

function AnnouncementBar() {
  const items = [...announcements, ...announcements]
  return (
    <div className="relative overflow-hidden border-b border-line bg-bg-deep/80 py-2">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap px-6">
        {items.map((a, i) => (
          <span key={i} className="flex items-center gap-3 text-[11.5px] tracking-wide text-ink-soft">
            <Flame size={11} className="shrink-0 text-ember" />
            {a}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ---------------- mobile menu ---------------- */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const { temple, setTempleId, lang, setLang, user } = useApp()
  return (
    <div className="fixed inset-0 z-[60] xl:hidden">
      <button className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label="Close menu" />
      <div className="panel rise-in absolute inset-y-0 right-0 flex w-[min(92vw,400px)] flex-col overflow-y-auto rounded-l-3xl rounded-r-none border-l px-6 py-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2.5">
            <OmMark size={20} className="text-gold" />
            <span className="font-display text-[16px]">Sai Sannidhi</span>
          </span>
          <button onClick={onClose} className="grid size-9 place-items-center rounded-full border border-line">
            <X size={16} />
          </button>
        </div>

        <Divider className="my-5" />

        <nav className="space-y-6">
          <NavLink to="/" className="block font-display text-lg text-ink">
            Home
          </NavLink>
          {navGroups.map((g) => (
            <div key={g.label}>
              <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-gold">{g.label}</p>
              <div className="space-y-1">
                {g.items.map((i) => (
                  <NavLink
                    key={i.to}
                    to={i.to}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-lg px-2 py-2 text-[14.5px] transition-colors',
                        isActive ? 'bg-surface-2 text-gold-light' : 'text-ink-soft hover:text-ink',
                      )
                    }
                  >
                    {i.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
          <div className="flex gap-3">
            <NavLink
              to="/donate"
              className="flex-1 rounded-full bg-gradient-to-br from-ember-soft to-ember px-4 py-3 text-center text-[13px] text-[#1a0d04]"
            >
              Donate
            </NavLink>
            <NavLink
              to={user ? '/dashboard' : '/login'}
              className="flex-1 rounded-full border border-line-strong px-4 py-3 text-center text-[13px] text-gold-light"
            >
              {user ? 'Dashboard' : 'Sign in'}
            </NavLink>
          </div>
        </nav>

        <Divider className="my-5" />

        <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-gold">Your sannidhi</p>
        <select
          value={temple.id}
          onChange={(e) => setTempleId(e.target.value)}
          className="w-full rounded-xl border border-line bg-bg-deep/60 px-4 py-3 text-sm text-ink"
        >
          {temples.map((x) => (
            <option key={x.id} value={x.id}>
              {x.shortName} — {x.city}, {x.stateCode}
            </option>
          ))}
        </select>

        <p className="mb-2 mt-5 text-[10px] uppercase tracking-[0.3em] text-gold">Language</p>
        <div className="flex flex-wrap gap-2">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => setLang(l.code)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-[12px]',
                lang === l.code ? 'border-ember/50 bg-ember/15 text-ember-soft' : 'border-line text-ink-soft',
              )}
            >
              {l.native}
            </button>
          ))}
        </div>

        <p className="mt-auto pt-8 text-center font-deva text-sm text-gold/70">ॐ साईं राम</p>
      </div>
    </div>
  )
}

/* ---------------- footer ---------------- */

export function Footer() {
  const { temple } = useApp()
  return (
    <footer className="relative mt-16 border-t border-line bg-bg-deep/70">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <OmMark size={26} className="text-gold" />
              <span className="font-display text-xl">Sai Sannidhi</span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-soft">
              A devotee companion for the Shirdi Sai Baba temples of North America — aarti timings in your own
              time zone, seva booking, live darshan, annadanam and the Satcharitra, in one place.
            </p>
            <p className="mt-5 font-quote text-lg italic text-gold-light">“Why fear when I am here?”</p>
            <div className="mt-6 flex items-center gap-3 text-[12px] text-ink-faint">
              <span className="rounded-full border border-line px-3 py-1">501(c)(3) non-profit</span>
              <span className="rounded-full border border-line px-3 py-1">EIN 00-0000000</span>
            </div>
          </div>

          <FooterCol
            title="Worship"
            links={[
              { to: '/aarti', label: 'Aarti & Timings' },
              { to: '/sevas', label: 'Sevas & Poojas' },
              { to: '/darshan', label: 'Live Darshan' },
              { to: '/annadanam', label: 'Annadanam' },
              { to: '/satcharitra', label: 'Sai Satcharitra' },
            ]}
          />
          <FooterCol
            title="Community"
            links={[
              { to: '/temples', label: 'Temple Network' },
              { to: '/events', label: 'Festivals' },
              { to: '/volunteer', label: 'Volunteer' },
              { to: '/experiences', label: 'Experiences' },
              { to: '/gallery', label: 'Gallery' },
            ]}
          />

          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold">Your sannidhi</p>
            <p className="font-display text-[15px] text-ink">{temple.name}</p>
            <div className="mt-3 space-y-2 text-[13px] text-ink-soft">
              <p className="flex items-start gap-2">
                <MapPin size={13} className="mt-0.5 shrink-0 text-gold" />
                <span>
                  {temple.address}, {temple.city}, {temple.stateCode} {temple.zip}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone size={13} className="shrink-0 text-gold" />
                {temple.phone}
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="shrink-0 text-gold" />
                {temple.email}
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-gold transition-colors hover:text-ember"
            >
              Visiting for the first time? <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        <Divider className="my-10" icon="dot" />

        <div className="flex flex-col items-center justify-between gap-4 text-[11.5px] text-ink-faint sm:flex-row">
          <p>
            © {new Date().getFullYear()} Sai Sannidhi Temple Network. Mock data — no live transactions ·{' '}
            <Link to="/credits" className="text-gold transition-colors hover:text-ember">
              Image credits
            </Link>
          </p>
          <p className="flex items-center gap-2">
            Built with <Heart size={11} className="text-kumkum" /> in seva ·{' '}
            <span className="font-deva text-gold/70">सबका मालिक एक</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-gold">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="text-[13.5px] text-ink-soft transition-colors hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ---------------- toasts ---------------- */

export function Toaster() {
  const { toasts, dismissToast } = useApp()
  if (toasts.length === 0) return null
  return (
    <div className="fixed bottom-5 right-5 z-[70] flex w-[min(92vw,360px)] flex-col gap-3">
      {toasts.map((t) => (
        <button
          key={t.id}
          onClick={() => dismissToast(t.id)}
          className="panel rise-in flex items-start gap-3 px-4 py-3.5 text-left"
        >
          <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ember/15">
            <Check size={13} className="text-ember" />
          </span>
          <span>
            <span className="block text-[13.5px] text-ink">{t.title}</span>
            {t.body && <span className="mt-0.5 block text-[12px] text-ink-faint">{t.body}</span>}
          </span>
        </button>
      ))}
    </div>
  )
}

/* ---------------- floating basket summary ---------------- */

export function BasketBar() {
  const { cart, cartTotal } = useApp()
  const location = useLocation()
  if (cart.length === 0 || location.pathname.startsWith('/sevas/checkout')) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:hidden">
      <Link
        to="/sevas/checkout"
        className="panel flex items-center justify-between gap-4 px-5 py-3.5"
      >
        <span className="text-[13px] text-ink-soft">
          {cart.length} seva{cart.length > 1 ? 's' : ''} · <span className="text-gold-light">{usd(cartTotal)}</span>
        </span>
        <span className="rounded-full bg-gradient-to-br from-ember-soft to-ember px-4 py-1.5 text-[12px] text-[#1a0d04]">
          Review
        </span>
      </Link>
    </div>
  )
}

