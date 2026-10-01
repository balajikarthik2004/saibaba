import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, ShieldCheck, Trash2 } from 'lucide-react'
import { useApp } from '../lib/store'
import { templeById } from '../data/temples'
import type { Booking } from '../lib/types'
import { fmtDate, to12h, usd, useReveal } from '../lib/utils'
import { Divider, EmberField, Mandala, OmMark } from '../components/Sacred'
import { Badge, Button, EmptyState, Field, Input, KeyValue, Panel, Section } from '../components/ui'

export default function Checkout() {
  const { cart, removeFromCart, cartTotal, checkoutCart, profile, setProfile, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [done, setDone] = useState<Booking[] | null>(null)
  const [contact, setContact] = useState({
    name: profile.name === 'Devotee' ? '' : profile.name,
    email: profile.email,
    phone: profile.phone,
  })
  const [error, setError] = useState('')

  const place = () => {
    if (!contact.name.trim() || !contact.email.trim()) {
      setError('Name and email are needed so the temple office can send your confirmation.')
      return
    }
    setProfile({ ...profile, name: contact.name.trim(), email: contact.email.trim(), phone: contact.phone.trim() })
    const made = checkoutCart()
    setDone(made)
    notify('Seva confirmed', `${made.length} seva${made.length > 1 ? 's' : ''} registered at the temple`)
  }

  if (done) {
    return (
      <div ref={ref}>
        <Section className="py-20">
          <Panel className="relative overflow-hidden px-8 py-14 text-center sm:px-16">
            <EmberField count={18} />
            <Mandala className="pointer-events-none absolute left-1/2 top-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] animate-slow-spin" />
            <div className="relative z-10">
              <span className="mx-auto grid size-16 place-items-center rounded-full border border-ember/40 bg-ember/10">
                <Check size={26} className="text-ember" />
              </span>
              <p className="mt-7 font-deva text-[15px] text-gold">ॐ साईं राम</p>
              <h1 className="mt-3 text-balance font-display text-4xl">Your seva is registered</h1>
              <p className="mx-auto mt-5 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
                The temple office has your sankalpa. A confirmation with the archaka’s name and the exact time has
                gone to <span className="text-gold-light">{contact.email}</span>.
              </p>

              <div className="mx-auto mt-10 max-w-xl space-y-4 text-left">
                {done.map((b) => (
                  <Panel key={b.id} className="px-6 py-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-[15px] text-ink">{b.title}</p>
                        <p className="mt-1 text-[12.5px] text-ink-faint">
                          {templeById(b.templeId)?.shortName} · {fmtDate(b.date)}
                          {b.time ? ` · ${to12h(b.time)}` : ''}
                        </p>
                      </div>
                      <Badge tone="ember">{b.id}</Badge>
                    </div>
                  </Panel>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Button to="/account">View in My Seva</Button>
                <Button to="/sevas" variant="outline">
                  Offer another seva
                </Button>
              </div>
            </div>
          </Panel>
        </Section>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <Section className="py-24">
        <EmptyState
          title="Your seva basket is empty"
          body="Choose an archana, an abhishekam or a day of annadanam, and it will be offered in your name and gotra at the sannidhi you pick."
          action={
            <Button to="/sevas">
              Browse the twenty sevas
            </Button>
          }
        />
      </Section>
    )
  }

  return (
    <div ref={ref}>
      <Section wide className="py-14">
        <Link
          to="/sevas"
          className="inline-flex items-center gap-2 text-[12.5px] text-ink-soft transition-colors hover:text-ink"
        >
          <ArrowLeft size={14} /> Keep browsing sevas
        </Link>

        <div className="mt-7 flex items-center gap-4">
          <OmMark size={28} className="text-gold" />
          <h1 className="font-display text-4xl">Confirm your sankalpa</h1>
        </div>
        <Divider className="mt-6 max-w-md" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-4">
            {cart.map((line) => {
              const t = templeById(line.templeId)
              return (
                <Panel key={line.id} className="reveal px-7 py-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-[17px] leading-snug">{line.name}</h3>
                      <p className="mt-1.5 text-[12.5px] text-ink-faint">
                        {t?.shortName} · {fmtDate(line.date)} · {to12h(line.time)} · {line.performedAt}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-display text-xl ember-text">{usd(line.price)}</span>
                      <button
                        onClick={() => removeFromCart(line.id)}
                        className="grid size-8 place-items-center rounded-full border border-line text-ink-faint transition-colors hover:border-kumkum/50 hover:text-kumkum"
                        aria-label="Remove"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-x-8 gap-y-1 border-t border-line pt-4 sm:grid-cols-2">
                    <KeyValue k="Sankalpa name" v={line.devotee} />
                    {line.gotra && <KeyValue k="Gotra" v={line.gotra} />}
                    {line.nakshatra && <KeyValue k="Nakshatra" v={line.nakshatra} />}
                    {line.note && <KeyValue k="Note" v={line.note} />}
                  </div>
                </Panel>
              )
            })}
          </div>

          <div className="space-y-6">
            <Panel className="reveal px-7 py-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your details</p>
              <div className="mt-5 space-y-4">
                <Field label="Full name" required>
                  <Input
                    value={contact.name}
                    onChange={(e) => {
                      setContact({ ...contact, name: e.target.value })
                      setError('')
                    }}
                  />
                </Field>
                <Field label="Email" required hint="Confirmation and receipt go here">
                  <Input
                    type="email"
                    value={contact.email}
                    onChange={(e) => {
                      setContact({ ...contact, email: e.target.value })
                      setError('')
                    }}
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    type="tel"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                </Field>
              </div>
            </Panel>

            <Panel className="reveal px-7 py-7">
              <div className="space-y-0">
                <KeyValue k="Sevas" v={cart.length} />
                <KeyValue k="Offering" v={usd(cartTotal)} />
                <KeyValue k="Processing" v="Waived" />
              </div>
              <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-ink-faint">Total</span>
                <span className="font-display text-3xl ember-text">{usd(cartTotal)}</span>
              </div>

              {error && (
                <p className="mt-5 rounded-xl border border-kumkum/40 bg-kumkum/10 px-4 py-3 text-[13px] text-kumkum">
                  {error}
                </p>
              )}

              <Button onClick={place} className="mt-6" size="lg" full>
                Confirm seva
              </Button>

              <p className="mt-5 flex items-start gap-2.5 text-[11.5px] leading-relaxed text-ink-faint">
                <ShieldCheck size={13} className="mt-0.5 shrink-0 text-neem" />
                This is a demonstration build with mock data — no payment is taken and no card details are
                collected. Live payment arrives with the backend.
              </p>
            </Panel>
          </div>
        </div>
      </Section>
    </div>
  )
}
