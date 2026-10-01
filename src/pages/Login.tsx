import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Sparkles, TriangleAlert } from 'lucide-react'
import { useApp } from '../lib/store'
import type { SessionUser } from '../lib/store'
import { photos } from '../data/images'
import { cn } from '../lib/utils'
import { Photo } from '../components/Photo'
import { Divider, EmberField, Mandala, OmMark } from '../components/Sacred'
import { Button, Field, Input } from '../components/ui'

const demoAccounts: { role: SessionUser['role']; email: string; name: string; blurb: string }[] = [
  { role: 'Devotee', email: 'devotee@saisannidhi.org', name: 'Ananya Rao', blurb: 'Sevas, giving and parayan' },
  { role: 'Volunteer', email: 'volunteer@saisannidhi.org', name: 'Ravi Menon', blurb: 'Adds the kitchen roster' },
  { role: 'Trustee', email: 'trustee@saisannidhi.org', name: 'Dr. Suresh Iyer', blurb: 'Adds network-wide figures' },
]

export default function Login() {
  const { signIn, notify } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [role, setRole] = useState<SessionUser['role']>('Devotee')
  const [error, setError] = useState('')

  const enter = (e: string, name?: string, r: SessionUser['role'] = role) => {
    const session = signIn(e, name, r)
    notify(`Om Sai Ram, ${session.name.split(' ')[0]}`, 'Signed in to your devotee dashboard')
    navigate(from, { replace: true })
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!email.trim() || !/.+@.+\..+/.test(email)) {
      setError('Enter an email address — any address works in this build.')
      return
    }
    if (password.length < 4) {
      setError('Enter at least four characters. Nothing is checked against a server.')
      return
    }
    enter(email)
  }

  return (
    <div className="grid min-h-[calc(100dvh-120px)] overflow-x-clip lg:grid-cols-[1.05fr_1fr]">
      {/* ---------- imagery side ---------- */}
      <div className="relative hidden overflow-hidden lg:block">
        <Photo photo={photos.babaShrine} fill priority fallbackSeed={2} />
        {/* Darkest at the foot, where the quote sits; the murti stays visible. */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/75 to-bg-deep/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-deep/70 to-transparent" />
        <EmberField count={20} />
        <Mandala className="pointer-events-none absolute -bottom-40 -left-32 size-[560px] opacity-[0.16] animate-slow-spin" />

        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <Link to="/" className="inline-flex w-fit items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full border border-line-strong bg-surface/70">
              <OmMark size={21} className="text-gold" />
            </span>
            <span>
              <span className="block font-display text-lg text-ink">Sai Sannidhi</span>
              <span className="block text-[9.5px] uppercase tracking-[0.3em] text-gold/85">
                Shirdi Sai · North America
              </span>
            </span>
          </Link>

          <div className="max-w-lg">
            <p className="font-deva text-[15px] text-gold">श्रद्धा और सबूरी</p>
            <blockquote className="mt-5 font-quote text-[2.4rem] italic leading-[1.2] text-ink">
              “If you cast your burden on Me, I shall surely bear it.”
            </blockquote>
            <p className="mt-5 text-[12px] uppercase tracking-[0.3em] text-gold">— The Ninth Assurance</p>
            <Divider className="mt-9 max-w-xs" icon="diya" />
            <p className="mt-7 text-[14px] leading-relaxed text-ink-soft">
              Sign in to keep your sevas, your giving history and your Satcharitra parayan together across every
              sannidhi in the network.
            </p>
          </div>

          <div className="flex gap-10">
            {[
              ['10', 'Sannidhis'],
              ['38k+', 'Devotees'],
              ['186k', 'Meals a year'],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl ember-text">{v}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-ink-faint">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- form side ---------- */}
      <div className="relative grid place-items-center overflow-hidden px-5 py-14 sm:px-10">
        <Mandala
          rings={2}
          className="pointer-events-none absolute -right-40 -top-32 size-[420px] opacity-[0.1] animate-reverse-spin"
        />

        <div className="relative w-full max-w-[420px]">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-[12.5px] text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} /> Back to the site
          </Link>

          <div className="lg:hidden">
            <OmMark size={28} className="text-gold" />
          </div>

          <h1 className="mt-4 font-display text-4xl leading-tight">Welcome back</h1>
          <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">
            Sign in to your devotee dashboard.
          </p>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-ember/30 bg-ember/10 px-4 py-3">
            <TriangleAlert size={14} className="mt-0.5 shrink-0 text-ember" />
            <p className="text-[12px] leading-relaxed text-ember-soft">
              <span className="font-medium">Development authentication.</span> No server, no password check — any
              email and a four-character password will sign you in.
            </p>
          </div>

          <form onSubmit={submit} className="mt-7 space-y-4">
            <Field label="Email" required>
              <Input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError('')
                }}
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Password" required>
              <div className="relative">
                <Input
                  type={show ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="••••••••"
                  className="pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  className="absolute right-3 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-ink-faint transition-colors hover:text-ink"
                  aria-label={show ? 'Hide password' : 'Show password'}
                >
                  {show ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </Field>

            <div>
              <span className="mb-2 block text-[11px] uppercase tracking-[0.2em] text-ink-faint">Sign in as</span>
              <div className="flex overflow-hidden rounded-full border border-line">
                {(['Devotee', 'Volunteer', 'Trustee'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={cn(
                      'flex-1 py-2.5 text-[12.5px] transition-colors',
                      role === r ? 'bg-ember/15 text-ember-soft' : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-kumkum/40 bg-kumkum/10 px-4 py-3 text-[13px] text-kumkum">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" full className="mt-2">
              Sign in <ArrowRight size={16} />
            </Button>
          </form>

          <Divider className="my-8" icon="dot" />

          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-gold">Or jump straight in</p>
          <div className="space-y-2.5">
            {demoAccounts.map((d) => (
              <button
                key={d.role}
                onClick={() => enter(d.email, d.name, d.role)}
                className="group flex w-full items-center gap-4 rounded-xl border border-line px-4 py-3 text-left transition-all duration-300 hover:border-line-strong hover:bg-surface-2"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line bg-bg-deep/50 text-gold transition-colors group-hover:border-ember/50 group-hover:text-ember">
                  <Sparkles size={14} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13.5px] text-ink">{d.name}</span>
                  <span className="block text-[11.5px] text-ink-faint">
                    {d.role} · {d.blurb}
                  </span>
                </span>
                <ArrowRight
                  size={14}
                  className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-gold"
                />
              </button>
            ))}
          </div>

          <p className="mt-8 text-center text-[12px] text-ink-faint">
            Darshan, aarti timings and festivals are open to everyone —{' '}
            <Link to="/" className="text-gold transition-colors hover:text-ember">
              no account needed
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

/** Wraps routes that need a signed-in devotee. */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user } = useApp()
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }
  return <>{children}</>
}
