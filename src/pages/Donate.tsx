import { useState } from 'react'
import { Check, Receipt, ShieldCheck } from 'lucide-react'
import { campaigns } from '../data/community'
import { temples } from '../data/temples'
import { useApp } from '../lib/store'
import { cn, fmtDate, usd, useReveal } from '../lib/utils'
import { Divider, EmberField, Mandala } from '../components/Sacred'
import { Badge, Button, Field, Input, PageHeader, Panel, Progress, Section, SectionHeading, Select, Stat } from '../components/ui'

const amounts = [21, 51, 108, 251, 501, 1101]

export default function Donate() {
  const { temple, addDonation, profile, setProfile, notify } = useApp()
  const ref = useReveal<HTMLDivElement>()

  const [campaignId, setCampaignId] = useState(campaigns[0].id)
  const [amount, setAmount] = useState(108)
  const [custom, setCustom] = useState('')
  const [frequency, setFrequency] = useState<'One-time' | 'Monthly'>('One-time')
  const [templeId, setTempleId] = useState(temple.id)
  const [name, setName] = useState(profile.name === 'Devotee' ? '' : profile.name)
  const [email, setEmail] = useState(profile.email)
  const [receipt, setReceipt] = useState<{ no: string; amount: number; title: string; date: string } | null>(null)
  const [error, setError] = useState('')

  const campaign = campaigns.find((c) => c.id === campaignId)!
  const finalAmount = custom ? Math.max(1, Math.round(Number(custom) || 0)) : amount

  const give = () => {
    if (!name.trim() || !email.trim()) {
      setError('Name and email are needed to issue your tax receipt.')
      return
    }
    if (finalAmount < 1) {
      setError('Please enter an amount.')
      return
    }
    setProfile({ ...profile, name: name.trim(), email: email.trim() })
    const rec = addDonation({
      campaignId: campaign.id,
      campaignTitle: campaign.title,
      amount: finalAmount,
      frequency,
      templeId,
    })
    setReceipt({ no: rec.receiptNo, amount: finalAmount, title: campaign.title, date: rec.date })
    notify('Thank you', `${usd(finalAmount)} to ${campaign.title}`)
  }

  if (receipt) {
    return (
      <Section className="py-24">
        <Panel className="relative overflow-hidden px-8 py-16 text-center sm:px-16">
          <EmberField count={18} />
          <Mandala className="pointer-events-none absolute left-1/2 top-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] animate-slow-spin" />
          <div className="relative z-10">
            <span className="mx-auto grid size-16 place-items-center rounded-full border border-ember/40 bg-ember/10">
              <Check size={26} className="text-ember" />
            </span>
            <p className="mt-7 font-deva text-[15px] text-gold">à¥ à¤¸à¤¾à¤ˆà¤‚ à¤°à¤¾à¤®</p>
            <h1 className="mt-3 font-display text-4xl">Received with gratitude</h1>
            <p className="mx-auto mt-5 max-w-lg text-[14.5px] leading-relaxed text-ink-soft">
              Your receipt has gone to <span className="text-gold-light">{email}</span>. A consolidated statement
              for the year is issued each January for your filing.
            </p>

            <Panel className="mx-auto mt-10 max-w-md px-7 py-7 text-left">
              <div className="flex items-center gap-3">
                <Receipt size={16} className="text-gold" />
                <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Tax receipt</p>
              </div>
              <Divider className="my-5" icon="dot" />
              <Row k="Receipt no." v={receipt.no} />
              <Row k="Fund" v={receipt.title} />
              <Row k="Amount" v={usd(receipt.amount)} />
              <Row k="Frequency" v={frequency} />
              <Row k="Sannidhi" v={temples.find((t) => t.id === templeId)?.shortName ?? ''} />
              <Row k="Date" v={fmtDate(receipt.date)} />
              <Row k="EIN" v="00-0000000" />
              <p className="mt-5 border-t border-line pt-4 text-[11px] leading-relaxed text-ink-faint">
                Sai Sannidhi Temple Network is a registered 501(c)(3) non-profit. No goods or services were
                provided in exchange for this contribution.
              </p>
            </Panel>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button to="/account">See all my giving</Button>
              <Button variant="outline" onClick={() => setReceipt(null)}>
                Give again
              </Button>
            </div>
          </div>
        </Panel>
      </Section>
    )
  }

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="Donate"
        title="Where your offering actually goes"
        sub="Six funds, each tied to something you can walk into and see â€” a kitchen, a goshala, a hall, a van that brings elders to aarti."
      />

      <Section wide className="pt-0">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* campaigns */}
          <div className="space-y-5">
            {campaigns.map((c) => {
              const active = campaignId === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setCampaignId(c.id)}
                  className={cn(
                    'reveal panel w-full px-7 py-7 text-left transition-all duration-400',
                    active
                      ? 'border-[var(--c-line-strong)] shadow-[0_28px_64px_-34px_var(--c-ember)]'
                      : 'hover:-translate-y-1',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <Badge tone={c.tag === 'Urgent' ? 'kumkum' : c.tag === 'Most supported' ? 'ember' : 'neem'}>
                      {c.tag}
                    </Badge>
                    {active && (
                      <span className="grid size-6 place-items-center rounded-full bg-ember/20 text-ember">
                        <Check size={13} />
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 text-balance font-display text-[21px] leading-snug">{c.title}</h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">{c.purpose}</p>

                  <div className="mt-6">
                    <Progress value={c.raised} max={c.goal} />
                    <div className="mt-2.5 flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-display text-lg ember-text">
                        {usd(c.raised)} <span className="text-[12px] text-ink-faint">of {usd(c.goal)}</span>
                      </span>
                      <span className="text-[11.5px] text-ink-faint">
                        {c.donors.toLocaleString()} donors Â·{' '}
                        {c.templeId === 'all'
                          ? 'network-wide'
                          : temples.find((t) => t.id === c.templeId)?.shortName}
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <Panel className="reveal px-7 py-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold">Your offering</p>
              <p className="mt-3 text-[14px] text-ink">{campaign.title}</p>

              <div className="mt-6 flex overflow-hidden rounded-full border border-line">
                {(['One-time', 'Monthly'] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={cn(
                      'flex-1 py-2.5 text-[12.5px] transition-colors',
                      frequency === f ? 'bg-ember/15 text-ember-soft' : 'text-ink-soft hover:text-ink',
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2.5">
                {amounts.map((a) => (
                  <button
                    key={a}
                    onClick={() => {
                      setAmount(a)
                      setCustom('')
                      setError('')
                    }}
                    className={cn(
                      'rounded-xl border py-3 font-display text-[17px] transition-all duration-300',
                      !custom && amount === a
                        ? 'border-transparent bg-gradient-to-br from-ember-soft to-ember text-[#1a0d04]'
                        : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
                    )}
                  >
                    ${a}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <Field label="Or another amount">
                  <Input
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value.replace(/[^\d]/g, ''))
                      setError('')
                    }}
                    inputMode="numeric"
                    placeholder="$"
                  />
                </Field>
              </div>

              <Divider className="my-6" icon="dot" />

              <div className="space-y-4">
                <Field label="Name" required>
                  <Input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      setError('')
                    }}
                  />
                </Field>
                <Field label="Email" required hint="Your tax receipt goes here">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                  />
                </Field>
                <Field label="Credit this sannidhi">
                  <Select value={templeId} onChange={(e) => setTempleId(e.target.value)}>
                    {temples.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.shortName} â€” {t.city}, {t.stateCode}
                      </option>
                    ))}
                  </Select>
                </Field>
              </div>

              {error && (
                <p className="mt-5 rounded-xl border border-kumkum/40 bg-kumkum/10 px-4 py-3 text-[13px] text-kumkum">
                  {error}
                </p>
              )}

              <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
                <span className="text-[11px] uppercase tracking-[0.22em] text-ink-faint">
                  {frequency === 'Monthly' ? 'Monthly' : 'Total'}
                </span>
                <span className="font-display text-3xl ember-text">{usd(finalAmount)}</span>
              </div>

              <Button onClick={give} size="lg" className="mt-5" full>
                Offer {usd(finalAmount)}
              </Button>

              <p className="mt-5 flex items-start gap-2.5 text-[11.5px] leading-relaxed text-ink-faint">
                <ShieldCheck size={13} className="mt-0.5 shrink-0 text-neem" />
                501(c)(3) Â· EIN 00-0000000 Â· receipt issued immediately. Mock data â€” no payment is taken in this
                build.
              </p>
            </Panel>
          </div>
        </div>
      </Section>

      <Section wide className="pb-24">
        <SectionHeading eyebrow="Accountability" title="What the network spends" />
        <Panel className="reveal px-8 py-12">
          <div className="grid gap-8 sm:grid-cols-4">
            <Stat value="86Â¢" label="Of every dollar" sub="to programmes" />
            <Stat value="9Â¢" label="Facilities" sub="upkeep & utilities" />
            <Stat value="5Â¢" label="Administration" />
            <Stat value="100%" label="Volunteer board" />
          </div>
          <Divider className="my-9" icon="om" />
          <p className="mx-auto max-w-2xl text-center text-[13.5px] leading-relaxed text-ink-soft">
            Annual audited statements and Form 990 filings are published each spring and posted at the office of
            every sannidhi. Ask any trustee for a copy â€” they are required to hand you one.
          </p>
        </Panel>
      </Section>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line py-2.5 last:border-0">
      <span className="text-[11px] uppercase tracking-[0.18em] text-ink-faint">{k}</span>
      <span className="text-right text-[13.5px] text-ink">{v}</span>
    </div>
  )
}
