import { useMemo } from 'react'
import { cn, seeded } from '../lib/utils'

/* ============================================================
   Sacred art primitives — all drawn inline so the app ships
   with no image dependencies and stays crisp at any size.
   ============================================================ */

export function OmMark({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 38c0-7 5-12 12-12 5 0 8 3 8 7s-3 6-6 6c-2 0-4-1-4-3"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d="M20 50c7 4 16 3 21-3 4-5 4-11 1-15"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M34 26c4-4 10-4 14 0" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M44 19c3 0 5 2 5 5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="44" cy="12" r="2.6" fill="currentColor" />
      <path d="M36 9c5-3 12-2 16 2" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" opacity=".75" />
    </svg>
  )
}

/** Sacred Padukas (Divine Footwear of Sai Baba) */
export function PadukasIcon({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Left Paduka */}
      <rect x="9" y="8" width="12" height="32" rx="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
      <circle cx="15" cy="14" r="2" fill="currentColor" />
      <path d="M15 16v18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
      
      {/* Right Paduka */}
      <rect x="27" y="8" width="12" height="32" rx="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.15" />
      <circle cx="33" cy="14" r="2" fill="currentColor" />
      <path d="M33 16v18" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 3" />
    </svg>
  )
}

/** Sacred Fire (Dhuni) with Udi Pot */
export function DhuniPotIcon({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Flames */}
      <path
        d="M24 6c3 5 6 9 6 13a6 6 0 0 1-12 0c0-4 3-8 6-13Z"
        fill="var(--c-saffron, #e65100)"
        className="animate-flicker"
      />
      <path
        d="M24 13c1.5 2.5 3 4.5 3 6.5a3 3 0 0 1-6 0c0-2 1.5-4 3-6.5Z"
        fill="var(--c-amber, #ffa000)"
      />
      {/* Pot / Bowl */}
      <path
        d="M10 28h28c0 8-6 14-14 14S10 36 10 28Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="8" y1="28" x2="40" y2="28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 34h16" stroke="var(--c-gold, #d4af37)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Neem Tree Leaves (Medicinal Light / Shirdi Gurusthan) */
export function NeemLeafIcon({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 40V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* Top Leaf */}
      <path d="M24 8c-4 5-4 12 0 16 4-4 4-11 0-16Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5" />
      {/* Left Leaves */}
      <path d="M24 20c-7-3-12 1-14 7 6 2 11-2 14-7Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 29c-6-2-10 1-12 6 5 2 9-1 12-6Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      {/* Right Leaves */}
      <path d="M24 20c7-3 12 1 14 7-6 2-11-2-14-7Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 29c6-2 10 1 12 6-5 2-9-1-12-6Z" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/** Satka (Stick) & Chimta (Tongs) */
export function SatkaChimtaIcon({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Satka / Stick */}
      <line x1="12" y1="36" x2="36" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="36" cy="12" r="3" fill="var(--c-gold, #d4af37)" />
      {/* Chimta / Tongs */}
      <path d="M14 14l10 10 10-10" stroke="var(--c-saffron, #e65100)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="24" r="2" fill="currentColor" />
      <line x1="24" y1="24" x2="24" y2="38" stroke="var(--c-saffron, #e65100)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

/** Bhiksha Bowl (Begging Bowl with Prasad) */
export function BhikshaBowlIcon({ className = '', size = 28 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 22h32c0 10-7 18-16 18S8 32 8 22Z"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <ellipse cx="24" cy="22" rx="16" ry="4" stroke="currentColor" strokeWidth="1.8" fill="var(--c-surface-2, #fff9ee)" />
      <circle cx="24" cy="16" r="2.5" fill="var(--c-amber, #ffa000)" />
      <path d="M20 18q4-6 8 0" stroke="var(--c-gold, #d4af37)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/** Minimalist Sacred Geometry (Yantra / Mandalic Star) */
export function SacredGeometryPattern({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" strokeOpacity="0.6" />
      <polygon points="32,6 56,48 8,48" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
      <polygon points="32,58 8,16 56,16" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5" fill="none" />
      <circle cx="32" cy="32" r="5" fill="currentColor" fillOpacity="0.4" />
    </svg>
  )
}

/** Stylised seated figure with halo — a reverent abstraction, not a portrait. */
export function BabaSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 300" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="robe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--c-gold-light)" stopOpacity=".95" />
          <stop offset="55%" stopColor="var(--c-gold)" stopOpacity=".7" />
          <stop offset="100%" stopColor="var(--c-ember)" stopOpacity=".45" />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="50%">
          <stop offset="0%" stopColor="var(--c-ember-soft)" stopOpacity=".55" />
          <stop offset="65%" stopColor="var(--c-ember)" stopOpacity=".12" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="92" r="86" fill="url(#halo)" className="animate-halo" />

      {/* seated outline: folded legs, draped kafni, head-wrap */}
      <path
        d="M120 46c15 0 25 11 25 25 0 9-4 15-9 19 19 7 33 24 37 46l6 38H61l6-38c4-22 18-39 37-46-5-4-9-10-9-19 0-14 10-25 25-25Z"
        fill="url(#robe)"
      />
      <path
        d="M120 40c17 0 29 6 29 14 0 4-3 6-8 7-6 1-13 2-21 2s-15-1-21-2c-5-1-8-3-8-7 0-8 12-14 29-14Z"
        fill="var(--c-gold-light)"
        opacity=".9"
      />
      <path
        d="M58 274c12-16 34-24 62-24s50 8 62 24c-14 8-37 12-62 12s-48-4-62-12Z"
        fill="url(#robe)"
        opacity=".85"
      />
      <path d="M120 250v-34" stroke="var(--c-bg)" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M88 196c10 10 22 15 32 15s22-5 32-15"
        stroke="var(--c-bg)"
        strokeOpacity=".3"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Rotating mandala — concentric petal rings. */
export function Mandala({ className = '', rings = 3 }: { className?: string; rings?: number }) {
  const petals = useMemo(() => {
    const out: { r: number; n: number; rot: number; op: number }[] = []
    for (let i = 0; i < rings; i++) {
      out.push({ r: 48 + i * 32, n: 12 + i * 6, rot: i * 7, op: 0.42 - i * 0.08 })
    }
    return out
  }, [rings])

  return (
    <svg viewBox="-160 -160 320 320" fill="none" className={className} aria-hidden="true">
      <circle r="150" stroke="var(--c-gold)" strokeOpacity=".16" strokeWidth="1" />
      <circle r="126" stroke="var(--c-gold)" strokeOpacity=".1" strokeWidth="1" strokeDasharray="2 7" />
      {petals.map((ring, ri) => (
        <g key={ri} transform={`rotate(${ring.rot})`} opacity={ring.op}>
          {Array.from({ length: ring.n }).map((_, i) => {
            const a = (360 / ring.n) * i
            return (
              <g key={i} transform={`rotate(${a})`}>
                <path
                  d={`M0 ${-ring.r} q ${ring.r * 0.17} ${ring.r * 0.2} 0 ${ring.r * 0.42} q ${-ring.r * 0.17} ${-ring.r * 0.22} 0 ${-ring.r * 0.42}Z`}
                  fill="var(--c-gold)"
                />
              </g>
            )
          })}
        </g>
      ))}
      <circle r="22" stroke="var(--c-ember)" strokeOpacity=".5" strokeWidth="1.5" />
      <circle r="9" fill="var(--c-ember)" fillOpacity=".35" />
    </svg>
  )
}

/** Decorative temple arch, used to frame the hero and section headers. */
export function TempleArch({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 220" fill="none" className={className} aria-hidden="true" preserveAspectRatio="none">
      <path
        d="M10 220V120C10 62 95 14 200 14s190 48 190 106v100"
        stroke="var(--c-gold)"
        strokeOpacity=".4"
        strokeWidth="1.5"
      />
      <path
        d="M30 220V124c0-50 76-92 170-92s170 42 170 92v96"
        stroke="var(--c-gold)"
        strokeOpacity=".22"
        strokeWidth="1"
        strokeDasharray="3 6"
      />
      <path d="M200 6v18" stroke="var(--c-gold)" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      <circle cx="200" cy="4" r="4" fill="var(--c-ember)" fillOpacity=".75" />
      {[70, 130, 270, 330].map((x, i) => (
        <circle key={i} cx={x} cy={i < 2 ? 46 + i * 14 : 46 + (3 - i) * 14} r="2.5" fill="var(--c-gold)" fillOpacity=".4" />
      ))}
    </svg>
  )
}

/** Flame that flickers — used in the aarti ring and on buttons. */
export function Diya({ className = '', size = 40 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="flame" cx="50%" cy="68%">
          <stop offset="0%" stopColor="#fff6d8" />
          <stop offset="40%" stopColor="var(--c-ember-soft)" />
          <stop offset="100%" stopColor="var(--c-ember)" stopOpacity=".2" />
        </radialGradient>
      </defs>
      <g className="animate-flicker">
        <path d="M20 4c6 7 9 11 9 16a9 9 0 1 1-18 0c0-5 3-9 9-16Z" fill="url(#flame)" />
        <path d="M20 14c2.6 3 4 5 4 7.4a4 4 0 1 1-8 0c0-2.4 1.4-4.4 4-7.4Z" fill="#fff8e5" fillOpacity=".9" />
      </g>
      <path
        d="M5 32h30c0 6-6.7 10-15 10S5 38 5 32Z"
        fill="var(--c-kumkum)"
        fillOpacity=".85"
      />
      <path d="M5 32h30" stroke="var(--c-gold)" strokeOpacity=".7" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

/** Rising embers from the Dhuni. */
export function EmberField({ count = 24, className = '' }: { count?: number; className?: string }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: seeded(i + 1) * 100,
        size: 1.5 + seeded(i + 90) * 3.5,
        delay: seeded(i + 300) * 14,
        dur: 9 + seeded(i + 700) * 11,
        dx: (seeded(i + 1100) - 0.5) * 90,
        op: 0.35 + seeded(i + 1600) * 0.55,
      })),
    [count],
  )
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className="animate-ember absolute bottom-0 rounded-full"
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            background: i % 3 === 0 ? 'var(--c-gold-light)' : 'var(--c-ember-soft)',
            boxShadow: '0 0 10px 2px color-mix(in srgb, var(--c-ember) 55%, transparent)',
            opacity: m.op,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.dur}s`,
            ['--dx' as string]: `${m.dx}px`,
          }}
        />
      ))}
    </div>
  )
}

/** Gold rule with an Om or trishul at the centre. */
export function Divider({ icon = 'om', className = '' }: { icon?: 'om' | 'diya' | 'dot'; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 text-gold/70', className)} aria-hidden="true">
      <div className="gold-rule flex-1 opacity-50" />
      {icon === 'om' && <OmMark size={20} className="text-gold" />}
      {icon === 'diya' && <Diya size={18} />}
      {icon === 'dot' && <span className="size-1.5 rounded-full bg-gold" />}
      <div className="gold-rule flex-1 opacity-50" />
    </div>
  )
}

/* ------------------------------------------------------------
   Procedural art tiles — stand in for photography until real
   temple imagery is supplied. Each motif is deterministic.
   ------------------------------------------------------------ */

const palettes = [
  ['#2a150c', '#7c3a10', '#f97316'],
  ['#1a1208', '#6b4a12', '#fbbf24'],
  ['#2b0f10', '#8b2020', '#f6c76b'],
  ['#0f1a17', '#2f5d50', '#c9a14a'],
  ['#1d1206', '#9a6416', '#ffd79a'],
  ['#120c1e', '#4a2f6b', '#e0b457'],
]

export function ArtTile({ seed, className = '' }: { seed: number; className?: string }) {
  const p = palettes[seed % palettes.length]
  const motif = seed % 5
  const rings = 4 + (seed % 4)

  return (
    <svg viewBox="0 0 200 200" className={cn('h-full w-full', className)} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`bg-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p[0]} />
          <stop offset="100%" stopColor={p[1]} />
        </linearGradient>
        <radialGradient id={`gl-${seed}`} cx="50%" cy={motif % 2 ? '35%' : '62%'}>
          <stop offset="0%" stopColor={p[2]} stopOpacity=".75" />
          <stop offset="100%" stopColor={p[2]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill={`url(#bg-${seed})`} />
      <rect width="200" height="200" fill={`url(#gl-${seed})`} />

      {motif === 0 &&
        Array.from({ length: rings }).map((_, i) => (
          <circle key={i} cx="100" cy="110" r={18 + i * 17} stroke={p[2]} strokeOpacity={0.5 - i * 0.06} fill="none" />
        ))}

      {motif === 1 &&
        Array.from({ length: 18 }).map((_, i) => (
          <g key={i} transform={`rotate(${i * 20} 100 100)`}>
            <path d="M100 32 q10 22 0 44 q-10-22 0-44Z" fill={p[2]} fillOpacity=".3" />
          </g>
        ))}

      {motif === 2 && (
        <>
          <path d="M20 170 L100 46 L180 170Z" fill={p[2]} fillOpacity=".18" />
          <path d="M44 170 L100 82 L156 170Z" fill={p[2]} fillOpacity=".26" />
          <circle cx="100" cy="40" r="7" fill={p[2]} fillOpacity=".7" />
        </>
      )}

      {motif === 3 &&
        Array.from({ length: 11 }).map((_, i) => (
          <g key={i}>
            <circle cx={18 + i * 17} cy={150 + Math.sin(i) * 12} r="4.5" fill={p[2]} fillOpacity=".7" />
            <path
              d={`M${18 + i * 17} ${140 + Math.sin(i) * 12} q5 -10 0 -17 q-5 7 0 17Z`}
              fill="#fff3d0"
              fillOpacity=".6"
            />
          </g>
        ))}

      {motif === 4 && (
        <>
          {Array.from({ length: 7 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${30 + i * 26} Q 100 ${10 + i * 26} 200 ${30 + i * 26}`}
              stroke={p[2]}
              strokeOpacity={0.3 - i * 0.03}
              fill="none"
              strokeWidth="1.4"
            />
          ))}
          <circle cx="140" cy="60" r="26" stroke={p[2]} strokeOpacity=".45" fill="none" />
        </>
      )}

      <rect x="6" y="6" width="188" height="188" fill="none" stroke={p[2]} strokeOpacity=".3" />
    </svg>
  )
}
