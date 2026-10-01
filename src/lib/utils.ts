import { useEffect, useRef, useState } from 'react'
import type { Aarti, Temple } from './types'

export const cn = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(' ')

export const usd = (n: number, cents = false) =>
  n.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  })

/**
 * Accepts both a plain "YYYY-MM-DD" and a full ISO timestamp. The date-only
 * form is pinned to midday so it never slips a day across time zones.
 */
const asDate = (iso: string | Date) =>
  typeof iso === 'string' ? new Date(/^\d{4}-\d{2}-\d{2}$/.test(iso) ? `${iso}T12:00:00` : iso) : iso

export const fmtDate = (iso: string | Date) =>
  asDate(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

export const fmtDateLong = (iso: string | Date) =>
  asDate(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

export const fmtDayMonth = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

/** "18:30" -> "6:30 PM" */
export function to12h(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${period}`
}

/** Minutes since midnight in a given IANA timezone. */
export function minutesNowIn(timeZone: string, now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const h = Number(parts.find((p) => p.type === 'hour')?.value ?? 0)
  const m = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return (h % 24) * 60 + m
}

export function clockIn(timeZone: string, now = new Date()) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(now)
}

export function weekdayIn(timeZone: string, now = new Date()) {
  return new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long' }).format(now)
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export interface AartiStatus {
  aarti: Aarti
  minutesUntil: number
  live: boolean
  tomorrow: boolean
}

/** Which aarti is happening now, or next, at this temple. */
export function aartiStatus(temple: Temple, now = new Date()): AartiStatus {
  const cur = minutesNowIn(temple.timezone, now)
  const live = temple.aartis.find((a) => {
    const start = toMinutes(a.time)
    return cur >= start && cur < start + a.duration
  })
  if (live) {
    return { aarti: live, minutesUntil: 0, live: true, tomorrow: false }
  }
  const upcoming = temple.aartis
    .map((a) => ({ a, diff: toMinutes(a.time) - cur }))
    .filter((x) => x.diff > 0)
    .sort((a, b) => a.diff - b.diff)[0]
  if (upcoming) {
    return { aarti: upcoming.a, minutesUntil: upcoming.diff, live: false, tomorrow: false }
  }
  const first = temple.aartis[0]
  return { aarti: first, minutesUntil: 1440 - cur + toMinutes(first.time), live: false, tomorrow: true }
}

export function countdownParts(minutes: number) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return { h, m }
}

/** Re-renders on an interval so clocks and countdowns stay alive. */
export function useTick(ms = 30_000) {
  const [, setN] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setN((n) => n + 1), ms)
    return () => clearInterval(id)
  }, [ms])
}

/** Adds `is-visible` to `.reveal` elements as they scroll into view. */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const nodes = root.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  })
  return ref
}

export function daysUntil(iso: string) {
  const target = new Date(`${iso}T00:00:00`)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.round((target.getTime() - today.getTime()) / 86400000)
}

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? '' : 's'}`

export function relativeDay(iso: string) {
  const d = daysUntil(iso)
  if (d === 0) return 'Today'
  if (d === 1) return 'Tomorrow'
  if (d === -1) return 'Yesterday'
  if (d < 0) return `${plural(Math.abs(d), 'day')} ago`
  if (d < 7) return `In ${plural(d, 'day')}`
  if (d < 31) return `In ${plural(Math.ceil(d / 7), 'week')}`
  return `In ${plural(Math.round(d / 30), 'month')}`
}

export const slugId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36).slice(-5).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`

export function readStore<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

export function writeStore<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage may be unavailable in private mode — the app still works */
  }
}

/** Deterministic pseudo-random in [0,1) from a seed, for stable generated art. */
export function seeded(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}
