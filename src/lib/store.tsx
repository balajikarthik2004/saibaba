/* eslint-disable react-refresh/only-export-components -- provider and its hook belong together */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { temples } from '../data/temples'
import type { Booking, CartLine, DonationRecord, Temple } from './types'
import { readStore, slugId, writeStore } from './utils'
import { translate, type LangCode } from './i18n'

const K = {
  temple: 'sai.temple',
  theme: 'sai.theme',
  lang: 'sai.lang',
  cart: 'sai.cart',
  bookings: 'sai.bookings',
  donations: 'sai.donations',
  parayan: 'sai.parayan',
  favourites: 'sai.favourites',
  profile: 'sai.profile',
  blessed: 'sai.blessed',
  user: 'sai.user',
}

/**
 * Development authentication only. There is no server, no password check and
 * no token — the session is a record in localStorage so the dashboard can be
 * demonstrated end to end. Replace `signIn` with a real call when the backend
 * exists; nothing else in the app reads credentials.
 */
export interface SessionUser {
  name: string
  email: string
  role: 'Devotee' | 'Volunteer' | 'Trustee'
  since: string
  templeId: string
}

export interface Profile {
  name: string
  email: string
  phone: string
  gotra: string
  nakshatra: string
  city: string
}

const emptyProfile: Profile = {
  name: 'Devotee',
  email: '',
  phone: '',
  gotra: 'Not known',
  nakshatra: 'Not known',
  city: '',
}

interface Toast {
  id: string
  title: string
  body?: string
}

interface Ctx {
  temple: Temple
  setTempleId: (id: string) => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
  lang: LangCode
  setLang: (l: LangCode) => void
  t: (key: string) => string

  cart: CartLine[]
  addToCart: (line: Omit<CartLine, 'id'>) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  cartTotal: number

  bookings: Booking[]
  addBooking: (b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Booking
  checkoutCart: () => Booking[]

  donations: DonationRecord[]
  addDonation: (d: Omit<DonationRecord, 'id' | 'date' | 'receiptNo'>) => DonationRecord

  parayan: number[]
  toggleParayanChapter: (n: number) => void
  resetParayan: () => void

  favourites: string[]
  toggleFavourite: (id: string) => void

  blessed: string[]
  toggleBlessing: (id: string) => void

  profile: Profile
  setProfile: (p: Profile) => void

  user: SessionUser | null
  signIn: (email: string, name?: string, role?: SessionUser['role']) => SessionUser
  signOut: () => void

  toasts: Toast[]
  notify: (title: string, body?: string) => void
  dismissToast: (id: string) => void
}

const AppCtx = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [templeId, setTempleIdState] = useState(() => readStore(K.temple, temples[0].id))
  const [theme, setTheme] = useState<'dark' | 'light'>(() => readStore<'dark' | 'light'>(K.theme, 'light'))
  const [lang, setLangState] = useState<LangCode>(() => readStore<LangCode>(K.lang, 'en'))
  const [cart, setCart] = useState<CartLine[]>(() => readStore<CartLine[]>(K.cart, []))
  const [bookings, setBookings] = useState<Booking[]>(() => readStore<Booking[]>(K.bookings, seedBookings))
  const [donations, setDonations] = useState<DonationRecord[]>(() =>
    readStore<DonationRecord[]>(K.donations, seedDonations),
  )
  const [parayan, setParayan] = useState<number[]>(() => readStore<number[]>(K.parayan, [1, 2, 3, 4, 5]))
  const [favourites, setFavourites] = useState<string[]>(() => readStore<string[]>(K.favourites, []))
  const [blessed, setBlessed] = useState<string[]>(() => readStore<string[]>(K.blessed, []))
  const [profile, setProfileState] = useState<Profile>(() => readStore<Profile>(K.profile, emptyProfile))
  const [user, setUser] = useState<SessionUser | null>(() => readStore<SessionUser | null>(K.user, null))
  const [toasts, setToasts] = useState<Toast[]>([])

  const temple = useMemo(() => temples.find((x) => x.id === templeId) ?? temples[0], [templeId])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    writeStore(K.theme, theme)
  }, [theme])
  useEffect(() => writeStore(K.temple, templeId), [templeId])
  useEffect(() => writeStore(K.lang, lang), [lang])
  useEffect(() => writeStore(K.cart, cart), [cart])
  useEffect(() => writeStore(K.bookings, bookings), [bookings])
  useEffect(() => writeStore(K.donations, donations), [donations])
  useEffect(() => writeStore(K.parayan, parayan), [parayan])
  useEffect(() => writeStore(K.favourites, favourites), [favourites])
  useEffect(() => writeStore(K.blessed, blessed), [blessed])
  useEffect(() => writeStore(K.profile, profile), [profile])
  useEffect(() => writeStore(K.user, user), [user])

  const notify = useCallback((title: string, body?: string) => {
    const id = slugId('t')
    setToasts((prev) => [...prev, { id, title, body }])
    setTimeout(() => setToasts((prev) => prev.filter((x) => x.id !== id)), 5200)
  }, [])

  const dismissToast = useCallback((id: string) => setToasts((prev) => prev.filter((x) => x.id !== id)), [])

  const addToCart = useCallback(
    (line: Omit<CartLine, 'id'>) => {
      setCart((prev) => [...prev, { ...line, id: slugId('c') }])
      notify('Added to your seva basket', line.name)
    },
    [notify],
  )

  const addBooking = useCallback((b: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    const booking: Booking = {
      ...b,
      id: slugId('SAI'),
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    }
    setBookings((prev) => [booking, ...prev])
    return booking
  }, [])

  const checkoutCart = useCallback(() => {
    const made: Booking[] = cart.map((line) => ({
      id: slugId('SAI'),
      kind: 'seva' as const,
      title: line.name,
      templeId: line.templeId,
      date: line.date,
      time: line.time,
      amount: line.price,
      devotee: line.devotee,
      gotra: line.gotra,
      nakshatra: line.nakshatra,
      note: line.note,
      status: 'Confirmed' as const,
      createdAt: new Date().toISOString(),
    }))
    setBookings((prev) => [...made, ...prev])
    setCart([])
    return made
  }, [cart])

  const addDonation = useCallback((d: Omit<DonationRecord, 'id' | 'date' | 'receiptNo'>) => {
    const rec: DonationRecord = {
      ...d,
      id: slugId('D'),
      date: new Date().toISOString().slice(0, 10),
      receiptNo: `SSN-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`,
    }
    setDonations((prev) => [rec, ...prev])
    return rec
  }, [])

  const value: Ctx = {
    temple,
    setTempleId: setTempleIdState,
    theme,
    toggleTheme: () => setTheme((x) => (x === 'dark' ? 'light' : 'dark')),
    lang,
    setLang: setLangState,
    t: (key: string) => translate(lang, key),

    cart,
    addToCart,
    removeFromCart: (id) => setCart((prev) => prev.filter((x) => x.id !== id)),
    clearCart: () => setCart([]),
    cartTotal: cart.reduce((sum, l) => sum + l.price, 0),

    bookings,
    addBooking,
    checkoutCart,

    donations,
    addDonation,

    parayan,
    toggleParayanChapter: (n) =>
      setParayan((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n].sort((a, b) => a - b))),
    resetParayan: () => setParayan([]),

    favourites,
    toggleFavourite: (id) =>
      setFavourites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),

    blessed,
    toggleBlessing: (id) => setBlessed((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),

    profile,
    setProfile: setProfileState,

    user,
    signIn: (email, name, role = 'Devotee') => {
      const derived =
        name?.trim() ||
        email
          .split('@')[0]
          .replace(/[._-]+/g, ' ')
          .replace(/\b\w/g, (ch) => ch.toUpperCase())
      const session: SessionUser = {
        name: derived,
        email: email.trim(),
        role,
        since: new Date().toISOString(),
        templeId,
      }
      setUser(session)
      setProfileState((p) => ({ ...p, name: derived, email: email.trim() }))
      return session
    },
    signOut: () => setUser(null),

    toasts,
    notify,
    dismissToast,
  }

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>')
  return ctx
}

/* ---------- seed data so the account page is never empty ---------- */

const seedBookings: Booking[] = [
  {
    id: 'SAI-9KQ4T',
    kind: 'seva',
    title: 'Sai Ashtottara Shatanamavali Archana',
    templeId: 'milpitas',
    date: '2026-10-08',
    time: '12:00',
    amount: 21,
    devotee: 'Devotee',
    gotra: 'Kashyapa',
    nakshatra: 'Rohini',
    status: 'Confirmed',
    createdAt: '2026-09-20T10:04:00.000Z',
  },
  {
    id: 'SAI-7MR2B',
    kind: 'annadanam',
    title: 'Annadanam â€” Sponsor a Day',
    templeId: 'milpitas',
    date: '2026-09-11',
    amount: 301,
    devotee: 'Devotee',
    note: 'In memory of my grandmother',
    status: 'Completed',
    createdAt: '2026-08-30T17:22:00.000Z',
  },
]

const seedDonations: DonationRecord[] = [
  {
    id: 'D-4PX1',
    campaignId: 'annadanam-fund',
    campaignTitle: 'Maha Annadanam Fund',
    amount: 108,
    frequency: 'Monthly',
    templeId: 'milpitas',
    date: '2026-09-01',
    receiptNo: 'SSN-2026-41872',
  },
]
