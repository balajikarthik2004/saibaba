import { Link } from 'react-router-dom'
import type { Temple } from '../lib/types'
import { aartiStatus, clockIn, cn, countdownParts, to12h, useTick } from '../lib/utils'
import { Diya } from './Sacred'

/**
 * Circular countdown to the next aarti at the selected sannidhi.
 * The ring fills across the gap between the previous and next aarti.
 */
export function AartiRing({ temple, size = 184 }: { temple: Temple; size?: number }) {
  useTick(20_000)
  const status = aartiStatus(temple)
  const { h, m } = countdownParts(status.minutesUntil)

  // Fraction of the way from the previous aarti to the next one.
  const span = status.tomorrow ? 600 : 300
  const progress = status.live ? 1 : Math.max(0.03, 1 - Math.min(1, status.minutesUntil / span))

  const r = 50
  const c = 2 * Math.PI * r

  return (
    <div className="relative mx-auto flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--c-line)" strokeWidth="2.5" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - progress)}
          className="transition-[stroke-dashoffset] duration-1000"
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--c-gold)" />
            <stop offset="60%" stopColor="var(--c-ember-soft)" />
            <stop offset="100%" stopColor="var(--c-ember)" />
          </linearGradient>
        </defs>
        {temple.aartis.map((a, i) => {
          const angle = (i / temple.aartis.length) * 360
          const rad = (angle * Math.PI) / 180
          return (
            <circle
              key={a.key}
              cx={60 + r * Math.cos(rad)}
              cy={60 + r * Math.sin(rad)}
              r={a.key === status.aarti.key ? 3.5 : 2}
              fill={a.key === status.aarti.key ? 'var(--c-ember)' : 'var(--c-gold)'}
              fillOpacity={a.key === status.aarti.key ? 1 : 0.45}
              className="rotate-90 origin-center"
            />
          )
        })}
      </svg>

      <div className="relative z-10 flex flex-col items-center justify-center px-3 text-center">
        <Diya size={22} className="mx-auto" />
        <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-gold">
          {status.live ? 'Aarti Live' : status.tomorrow ? 'Tomorrow' : 'Next Aarti'}
        </p>
        <p className="mt-0.5 font-display text-[15.5px] font-semibold leading-tight text-ink">
          {status.aarti.name}
        </p>
        <p className="font-deva text-[12px] text-saffron/90">{status.aarti.sanskrit}</p>
        {status.live ? (
          <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-ember">
            <span className="size-1.5 animate-pulse rounded-full bg-ember" /> Happening Now
          </p>
        ) : (
          <p className="mt-1 font-display text-xl font-bold ember-text leading-tight">
            {h > 0 ? `${h}h ${m}m` : `${m} min`}
          </p>
        )}
        <p className="mt-0.5 text-[10.5px] font-medium text-ink-faint">
          {to12h(status.aarti.time)} {temple.tzLabel}
        </p>
      </div>
    </div>
  )
}

/** Compact inline version for the header bar. */
export function AartiPill({ temple, className }: { temple: Temple; className?: string }) {
  useTick(30_000)
  const status = aartiStatus(temple)
  const { h, m } = countdownParts(status.minutesUntil)
  return (
    <Link
      to="/aarti"
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-[12px] transition-colors hover:border-line-strong',
        className,
      )}
    >
      <span
        className={cn(
          'size-1.5 rounded-full',
          status.live ? 'animate-pulse bg-ember' : 'bg-gold',
        )}
      />
      <span className="text-ink-soft">
        {status.live ? (
          <>
            <span className="text-ember">Live</span> · {status.aarti.name}
          </>
        ) : (
          <>
            {status.aarti.name} in{' '}
            <span className="text-gold-light">{h > 0 ? `${h}h ${m}m` : `${m}m`}</span>
          </>
        )}
      </span>
      <span className="hidden text-ink-faint sm:inline">· {clockIn(temple.timezone)} {temple.tzLabel}</span>
    </Link>
  )
}
