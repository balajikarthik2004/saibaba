import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import type { Photo as PhotoData } from '../data/images'
import { Photo } from './Photo'
import { Divider, Mandala } from './Sacred'

/* ---------------- Buttons ---------------- */

type ButtonVariant = 'primary' | 'saffron' | 'maroon' | 'gold' | 'ghost' | 'outline' | 'quiet'

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-saffron-light via-saffron to-[color-mix(in_srgb,var(--c-saffron)_75%,var(--c-crimson))] text-white font-medium shadow-[0_12px_28px_-12px_rgba(230,81,0,0.65)] hover:brightness-110 hover:shadow-[0_16px_34px_-10px_rgba(230,81,0,0.8)]',
  saffron:
    'bg-gradient-to-br from-[#ff9100] via-[#ff6f00] to-[#e65100] text-white font-medium shadow-[0_12px_28px_-12px_rgba(230,81,0,0.65)] hover:brightness-110',
  maroon:
    'bg-gradient-to-br from-[#b71c1c] to-[#880e4f] text-white font-medium shadow-[0_12px_28px_-12px_rgba(136,14,79,0.55)] hover:brightness-110',
  gold:
    'bg-gradient-to-br from-[#ffd54f] via-[#ffb300] to-[#d4af37] text-[#1c140e] font-medium shadow-[0_12px_28px_-12px_rgba(212,175,55,0.6)] hover:brightness-105',
  ghost: 'bg-surface text-ink border border-line hover:border-line-strong hover:bg-surface-2 shadow-sm',
  outline: 'border border-line-strong text-ink-soft hover:text-ink hover:border-saffron hover:bg-saffron/10',
  quiet: 'text-ink-soft hover:text-ink',
}

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  onClick?: () => void
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  full?: boolean
}

export function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className,
  disabled,
  type = 'button',
  full,
}: ButtonProps) {
  const sizes = {
    sm: 'px-4 py-2 text-[13px]',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base font-medium',
  }
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-full tracking-wide transition-all duration-300 active:scale-[0.97] disabled:opacity-45 disabled:pointer-events-none cursor-pointer',
    buttonStyles[variant],
    sizes[size],
    full && 'w-full',
    className,
  )
  if (to) return <Link to={to} className={cls}>{children}</Link>
  if (href)
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
      </a>
    )
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}

/* ---------------- Layout ---------------- */

export function Section({
  children,
  className,
  id,
  wide,
}: {
  children: ReactNode
  className?: string
  id?: string
  wide?: boolean
}) {
  return (
    <section id={id} className={cn('px-5 py-8 sm:px-8 sm:py-10', className)}>
      <div className={cn('mx-auto', wide ? 'max-w-[1400px]' : 'max-w-6xl')}>{children}</div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = 'center',
  action,
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  align?: 'center' | 'left'
  action?: ReactNode
  as?: 'h1' | 'h2'
}) {
  return (
    <div
      className={cn(
        'reveal mb-6 sm:mb-8',
        align === 'center' ? 'text-center' : 'flex flex-wrap items-end justify-between gap-5 text-left',
      )}
    >
      <div className={cn(align === 'center' && 'mx-auto max-w-2xl')}>
        {eyebrow && (
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.38em] text-saffron">{eyebrow}</p>
        )}
        <Tag className="text-balance text-2xl leading-tight sm:text-3xl md:text-[2.5rem] font-display">{title}</Tag>
        {sub && <p className="mt-2.5 text-pretty text-[14.5px] leading-relaxed text-ink-soft">{sub}</p>}
        {align === 'center' && <Divider className="mx-auto mt-5 max-w-xs" />}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/**
 * Standard top-of-page banner. Pass a photograph and it becomes a full-bleed
 * hero; without one it falls back to the turning mandala.
 */
export function PageHeader({
  eyebrow,
  title,
  sub,
  photo,
  children,
}: {
  eyebrow: string
  title: string
  sub?: string
  photo?: PhotoData
  children?: ReactNode
}) {
  return (
    <section
      className={cn(
        'relative overflow-hidden px-5 pb-10 pt-14 sm:px-8 sm:pt-20',
        photo && 'pb-16 sm:pb-20 sm:pt-28',
      )}
    >
      {photo ? (
        <>
          <Photo photo={photo} fill priority fallbackSeed={title.length} />
          {/* Readable over the photograph, fading into the page below it. */}
          <div className="absolute inset-0 bg-gradient-to-br from-bg/75 via-bg/82 to-bg/94" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />
        </>
      ) : null}
      <Mandala className="pointer-events-none absolute -right-40 -top-44 size-[520px] opacity-[0.14] animate-slow-spin" />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionHeading as="h1" align="left" eyebrow={eyebrow} title={title} sub={sub} action={children} />
        <Divider className="max-w-xl" />
      </div>
    </section>
  )
}

/* ---------------- Surfaces ---------------- */

export function Panel({
  children,
  className,
  hover,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
}) {
  return (
    <div
      className={cn(
        'panel relative overflow-hidden',
        hover &&
          'transition-all duration-500 hover:-translate-y-1 hover:border-[var(--c-line-strong)] hover:shadow-[0_30px_70px_-34px_var(--c-ember)]',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Chip({
  children,
  active,
  onClick,
  className,
}: {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}) {
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12px] tracking-wide transition-all duration-300',
        active
          ? 'border-transparent bg-gradient-to-r from-ember to-ember-soft text-[#1a0d04] shadow-[0_8px_24px_-12px_var(--c-ember)]'
          : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

export function Badge({
  children,
  tone = 'gold',
  className,
}: {
  children: ReactNode
  tone?: 'gold' | 'saffron' | 'maroon' | 'amber' | 'neem' | 'navy' | 'ember' | 'kumkum'
  className?: string
}) {
  const tones = {
    gold: 'bg-[#ffb300]/15 text-[#8a6520] dark:text-[#ffd54f] border-[#d4af37]/40',
    saffron: 'bg-[#e65100]/12 text-[#e65100] dark:text-[#ff9100] border-[#e65100]/35 font-semibold',
    maroon: 'bg-[#880e4f]/12 text-[#880e4f] dark:text-[#f48fb1] border-[#880e4f]/35 font-semibold',
    amber: 'bg-[#ffa000]/15 text-[#b26a00] dark:text-[#ffca28] border-[#ffa000]/40',
    neem: 'bg-[#2f6354]/14 text-[#2f6354] dark:text-[#80cbc4] border-[#2f6354]/35 font-semibold',
    navy: 'bg-[#1a2530]/12 text-[#1a2530] dark:text-[#90caf9] border-[#1a2530]/30',
    ember: 'bg-saffron/15 text-saffron border-saffron/35',
    kumkum: 'bg-[#b71c1c]/15 text-[#b71c1c] dark:text-[#ef9a9a] border-[#b71c1c]/35 font-semibold',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10.5px] uppercase tracking-[0.16em] shadow-xs',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Progress({ value, max, className }: { value: number; max: number; className?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-surface-2 border border-line/50', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-saffron via-amber to-gold-metallic transition-[width] duration-1000 shadow-xs"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function Stat({
  value,
  label,
  sub,
  icon,
  className,
}: {
  value: ReactNode
  label: string
  sub?: string
  icon?: ReactNode
  className?: string
}) {
  return (
    <div className={cn('rounded-2xl border border-line bg-surface/70 px-4 py-3.5 text-center shadow-xs transition-all hover:border-saffron/40 hover:-translate-y-0.5', className)}>
      {icon && <div className="mb-1.5 flex justify-center text-saffron">{icon}</div>}
      <div className="font-display text-2xl sm:text-3xl text-saffron font-medium">{value}</div>
      <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-ink">{label}</div>
      {sub && <div className="mt-0.5 text-[11.5px] text-ink-soft">{sub}</div>}
    </div>
  )
}

/* ---------------- Form fields ---------------- */

const fieldBase =
  'w-full rounded-xl border border-line bg-bg-deep/60 px-4 py-3 text-sm text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-ember/70 focus:bg-bg-deep'

export function Field({
  label,
  children,
  hint,
  required,
}: {
  label: string
  children: ReactNode
  hint?: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-ink-faint">
        {label}
        {required && <span className="ml-1 text-ember">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1.5 block text-[11px] text-ink-faint">{hint}</span>}
    </label>
  )
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(fieldBase, props.className)} />
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(fieldBase, 'min-h-28 resize-y', props.className)} />
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(fieldBase, 'appearance-none bg-[length:12px] pr-10', props.className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%23c9a14a' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E\")",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        ...props.style,
      }}
    />
  )
}

/* ---------------- Misc ---------------- */

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <Panel className="px-8 py-16 text-center">
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">{body}</p>
      {action && <div className="mt-7">{action}</div>}
    </Panel>
  )
}

export function KeyValue({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line py-2.5 last:border-0">
      <span className="text-[11px] uppercase tracking-[0.18em] text-ink-faint">{k}</span>
      <span className="text-right text-sm text-ink">{v}</span>
    </div>
  )
}
