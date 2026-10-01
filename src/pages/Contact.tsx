import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Mail, MapPin, Navigation, Phone, Send } from 'lucide-react'
import { faqs } from '../data/community'
import { temples } from '../data/temples'
import { useApp } from '../lib/store'
import { cn, useReveal } from '../lib/utils'
import { Divider, EmberField, Mandala, OmMark } from '../components/Sacred'
import { Button, Field, Input, PageHeader, Panel, Section, SectionHeading, Select, Textarea } from '../components/ui'

const reasons = [
  'First visit â€” what should I expect?',
  'Booking a seva or pooja',
  'Annadanam sponsorship',
  'Hall or wedding booking',
  'Priest services at home',
  'Volunteering',
  'Donation or receipt question',
  'Something else',
]

export default function Contact() {
  const { temple, profile, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()
  const [open, setOpen] = useState<number | null>(0)
  const [form, setForm] = useState({
    name: profile.name === 'Devotee' ? '' : profile.name,
    email: profile.email,
    templeId: temple.id,
    reason: reasons[0],
    message: '',
  })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const send = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Name, email and your message are needed so the office can reply.')
      return
    }
    setSent(true)
    notify('Message sent', 'The temple office replies within two working days')
  }

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="Visiting & contact"
        title="Never been to a temple? Start here."
        sub="Leave your shoes at the door, sit anywhere, and eat the prasad. That is genuinely all that is expected of you."
      />

      {/* first visit guide */}
      <Section wide className="pt-0">
        <Panel className="reveal relative overflow-hidden px-8 py-12 sm:px-12">
          <EmberField count={12} />
          <Mandala className="pointer-events-none absolute -right-36 -top-36 size-[460px] opacity-[0.12] animate-slow-spin" />
          <div className="relative grid gap-10 lg:grid-cols-3">
            {[
              {
                n: '01',
                t: 'Arriving',
                b: 'Shoes come off at the rack by the door â€” there is no charge and nothing goes missing. Dress comfortably and modestly: covered shoulders and knees. There is no entry fee, ever, and no dress code beyond that.',
              },
              {
                n: '02',
                t: 'Inside',
                b: 'Walk in and sit anywhere â€” the floor at the front, or a chair at the side. You do not need to know the songs. When the tray of lamps comes round, pass your hands over the flame and touch your forehead, or simply let it pass.',
              },
              {
                n: '03',
                t: 'Leaving',
                b: 'You will be given Udi â€” grey ash â€” for your forehead, and prasad to eat. Take both. Refusing the food is the only genuinely impolite thing you can do in a Sai temple.',
              },
            ].map((s) => (
              <div key={s.n}>
                <p className="font-display text-4xl ember-text">{s.n}</p>
                <h3 className="mt-3 font-display text-[21px]">{s.t}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{s.b}</p>
              </div>
            ))}
          </div>
        </Panel>
      </Section>

      {/* faq + form */}
      <Section wide className="py-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="reveal mb-7 font-display text-2xl">Questions devotees actually ask</h2>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <Panel key={i} className="reveal overflow-hidden">
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="flex w-full items-center justify-between gap-5 px-7 py-5 text-left"
                  >
                    <span className="text-[15.5px] leading-snug text-ink">{f.q}</span>
                    <ChevronDown
                      size={16}
                      className={cn('shrink-0 text-gold transition-transform duration-400', open === i && 'rotate-180')}
                    />
                  </button>
                  {open === i && (
                    <p className="border-t border-line px-7 py-5 text-[14px] leading-relaxed text-ink-soft">
                      {f.a}
                    </p>
                  )}
                </Panel>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <Panel className="reveal px-7 py-8">
              {sent ? (
                <div className="py-10 text-center">
                  <OmMark size={28} className="mx-auto text-gold" />
                  <h3 className="mt-5 font-display text-2xl">Your message is with the office</h3>
                  <p className="mt-4 text-[13.5px] leading-relaxed text-ink-soft">
                    Someone at {temples.find((t) => t.id === form.templeId)?.shortName} will reply within two
                    working days. For anything urgent, call the temple directly.
                  </p>
                  <Button variant="ghost" size="sm" className="mt-7" onClick={() => setSent(false)}>
                    Send another
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Write to us</p>
                  <div className="mt-5 space-y-4">
                    <Field label="Name" required>
                      <Input
                        value={form.name}
                        onChange={(e) => {
                          setForm({ ...form, name: e.target.value })
                          setError('')
                        }}
                      />
                    </Field>
                    <Field label="Email" required>
                      <Input
                        type="email"
                        value={form.email}
                        onChange={(e) => {
                          setForm({ ...form, email: e.target.value })
                          setError('')
                        }}
                      />
                    </Field>
                    <Field label="Which sannidhi">
                      <Select
                        value={form.templeId}
                        onChange={(e) => setForm({ ...form, templeId: e.target.value })}
                      >
                        {temples.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.shortName} â€” {t.city}, {t.stateCode}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="What is it about">
                      <Select value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}>
                        {reasons.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </Select>
                    </Field>
                    <Field label="Message" required>
                      <Textarea
                        value={form.message}
                        onChange={(e) => {
                          setForm({ ...form, message: e.target.value })
                          setError('')
                        }}
                        className="min-h-36"
                        placeholder="Ask anything â€” there is no wrong question."
                      />
                    </Field>
                  </div>

                  {error && (
                    <p className="mt-5 rounded-xl border border-kumkum/40 bg-kumkum/10 px-4 py-3 text-[13px] text-kumkum">
                      {error}
                    </p>
                  )}

                  <Button onClick={send} className="mt-6" full>
                    <Send size={14} /> Send message
                  </Button>
                </>
              )}
            </Panel>
          </div>
        </div>
      </Section>

      {/* directory */}
      <Section wide className="pb-24">
        <SectionHeading eyebrow="Directory" title="Every sannidhi, every number" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {temples.map((t) => (
            <Panel key={t.id} hover className="reveal px-6 py-6">
              <Link to={`/temples/${t.id}`} className="font-display text-[17px] leading-snug text-ink">
                {t.name}
              </Link>
              <div className="mt-4 space-y-2 text-[12.5px] text-ink-soft">
                <p className="flex items-start gap-2">
                  <MapPin size={12} className="mt-0.5 shrink-0 text-gold" />
                  <span>
                    {t.address}, {t.city}, {t.stateCode} {t.zip}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={12} className="shrink-0 text-gold" />
                  {t.phone}
                </p>
                <p className="flex items-center gap-2">
                  <Mail size={12} className="shrink-0 text-gold" />
                  <span className="truncate">{t.email}</span>
                </p>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${t.address}, ${t.city}, ${t.stateCode} ${t.zip}`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-[12px] text-gold transition-colors hover:text-ember"
              >
                <Navigation size={11} /> Directions
              </a>
            </Panel>
          ))}
        </div>

        <Divider className="mx-auto my-12 max-w-md" icon="om" />
        <p className="reveal text-center font-deva text-[15px] text-gold">à¥ à¤¸à¤¾à¤ˆà¤‚ à¤°à¤¾à¤®</p>
      </Section>
    </div>
  )
}
