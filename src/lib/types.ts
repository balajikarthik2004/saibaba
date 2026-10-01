export type AartiKey = 'kakad' | 'madhyan' | 'dhoop' | 'shej'

export interface Aarti {
  key: AartiKey
  name: string
  sanskrit: string
  time: string // "HH:MM" local to the temple
  meaning: string
  duration: number // minutes
}

export interface Temple {
  id: string
  name: string
  shortName: string
  city: string
  state: string
  stateCode: string
  region: 'West' | 'Midwest' | 'South' | 'Northeast'
  address: string
  zip: string
  phone: string
  email: string
  established: number
  timezone: string
  tzLabel: string
  lat: number
  lng: number
  hours: { weekday: string; weekend: string }
  aartis: Aarti[]
  deities: string[]
  facilities: string[]
  highlight: string
  about: string
  priests: { name: string; role: string; languages: string[] }[]
  weeklyHighlights: { day: string; title: string; time: string; note: string }[]
  liveDarshan: boolean
  capacity: number
  annadanamDays: string[]
}

export interface Seva {
  id: string
  name: string
  sanskrit?: string
  category: 'Daily Seva' | 'Abhishekam' | 'Life Milestone' | 'Homam & Vratham' | 'Annadanam' | 'Long-term Sankalpa'
  price: number
  duration: string
  performedAt: ('Temple' | 'Home' | 'Virtual')[]
  description: string
  includes: string[]
  popular?: boolean
  bestDay?: string
  requiresGotra: boolean
}

export interface TempleEvent {
  id: string
  title: string
  date: string // ISO
  endDate?: string
  templeIds: string[] | 'all'
  category: 'Festival' | 'Weekly' | 'Discourse' | 'Community' | 'Youth' | 'Seva Drive'
  summary: string
  detail: string
  schedule: { time: string; item: string }[]
  rsvp: boolean
  seats?: number
  seatsTaken?: number
  banner: string // gradient token
}

export interface Chapter {
  n: number
  title: string
  theme: string
  verses: number
  excerpt: string
  day: number // Saptah parayan day 1-7
}

export interface Campaign {
  id: string
  title: string
  purpose: string
  goal: number
  raised: number
  donors: number
  templeId: string
  endsOn: string
  tag: string
}

export interface GalleryItem {
  id: string
  title: string
  album: 'Festivals' | 'Daily Darshan' | 'Annadanam' | 'Temple & Architecture' | 'Seva & Volunteers'
  templeId: string
  caption: string
  art: number // index of generated art motif
  date: string
}

export interface Experience {
  id: string
  title: string
  author: string
  city: string
  date: string
  body: string
  tags: string[]
  blessings: number
}

export interface VolunteerRole {
  id: string
  title: string
  team: string
  commitment: string
  description: string
  slots: number
  filled: number
  skills: string[]
}

export interface Booking {
  id: string
  kind: 'seva' | 'annadanam' | 'hall' | 'event'
  title: string
  templeId: string
  date: string
  time?: string
  amount: number
  devotee: string
  gotra?: string
  nakshatra?: string
  note?: string
  status: 'Confirmed' | 'Pending' | 'Completed'
  createdAt: string
}

export interface DonationRecord {
  id: string
  campaignId: string
  campaignTitle: string
  amount: number
  frequency: 'One-time' | 'Monthly'
  templeId: string
  date: string
  receiptNo: string
}

export interface CartLine {
  id: string
  sevaId: string
  name: string
  price: number
  templeId: string
  date: string
  time: string
  devotee: string
  gotra: string
  nakshatra: string
  note: string
  performedAt: string
}
