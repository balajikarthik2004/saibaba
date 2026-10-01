import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Divider, Mandala } from './Sacred'

/* ---------------- Buttons ---------------- */

type ButtonVariant = 'primary' | 'ghost' | 'outline' | 'quiet'

const buttonStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-br from-ember-soft via-ember to-[color-mix(in_srgb,var(--c-ember)_72%,var(--c-kumkum))] text-[#1a0d04] font-medium shadow-[0_14px_38px_-18px_var(--c-ember)] hover:brightness-110',
  ghost: 'bg-surface-2/70 text-ink border border-line hover:border-line-strong hover:bg-surface-2',
  outline: 'border border-line-strong text-gold-light hover:bg-gold/10',
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
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }
  const cls = cn(
    'inline-flex items-center justify-center gap-2 rounded-full tracking-wide transition-all duration-300 active:scale-[0.97] disabled:opacity-45 disabled:pointer-events-none',
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
    <section id={id} className={cn('px-5 py-16 sm:px-8 sm:py-20', className)}>
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
}: {
  eyebrow?: string
  title: ReactNode
  sub?: ReactNode
  align?: 'center' | 'left'
  action?: ReactNode
}) {
  return (
    <div
      className={cn(
        'reveal mb-12',
        align === 'center' ? 'text-center' : 'flex flex-wrap items-end justify-between gap-6 text-left',
      )}
    >
      <div className={cn(align === 'center' && 'mx-auto max-w-2xl')}>
        {eyebrow && (
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.42em] text-gold">{eyebrow}</p>
        )}
        <h2 className="text-balance text-3xl leading-tight sm:text-4xl md:text-[2.7rem]">{title}</h2>
        {sub && <p className="mt-4 text-pretty text-[15px] leading-relaxed text-ink-soft">{sub}</p>}
        {align === 'center' && <Divider className="mx-auto mt-7 max-w-xs" />}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}

/** Standard top-of-page banner with a slowly turning mandala behind it. */
export function PageHeader({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string
  title: string
  sub?: string
  children?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-10 pt-14 sm:px-8 sm:pt-20">
      <Mandala className="pointer-events-none absolute -right-40 -top-44 size-[520px] opacity-[0.14] animate-slow-spin" />
      <div className="relative mx-auto max-w-[1400px]">
        <SectionHeading align="left" eyebrow={eyebrow} title={title} sub={sub} action={children} />
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

export function Badge({ children, tone = 'gold' }: { children: ReactNode; tone?: 'gold' | 'ember' | 'neem' | 'kumkum' }) {
  const tones = {
    gold: 'bg-gold/14 text-gold-light border-gold/30',
    ember: 'bg-ember/16 text-ember-soft border-ember/35',
    neem: 'bg-neem/18 text-neem border-neem/40',
    kumkum: 'bg-kumkum/16 text-kumkum border-kumkum/35',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em]',
        tones[tone],
      )}
    >
      {children}
    </span>
  )
}

export function Progress({ value, max, className }: { value: number; max: number; className?: string }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={cn('h-1.5 w-full overflow-hidden rounded-full bg-surface-2', className)}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-gold via-ember-soft to-ember transition-[width] duration-1000"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}

export function Stat({ value, label, sub }: { value: ReactNode; label: string; sub?: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl ember-text sm:text-4xl">{value}</div>
      <div className="mt-1.5 text-[11px] uppercase tracking-[0.26em] text-ink-faint">{label}</div>
      {sub && <div className="mt-1 text-xs text-ink-soft">{sub}</div>}
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
