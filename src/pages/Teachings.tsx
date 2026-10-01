import { babaTimeline, elevenAssurances, guidingPrinciples, quotes } from '../data/satcharitra'
import { useReveal } from '../lib/utils'
import { BabaSilhouette, Divider, EmberField, Mandala, OmMark } from '../components/Sacred'
import { Button, PageHeader, Panel, Section, SectionHeading } from '../components/ui'

export default function Teachings() {
  const ref = useReveal<HTMLDivElement>()

  return (
    <div ref={ref}>
      <PageHeader
        eyebrow="His life & teaching"
        title="He asked for two coins only"
        sub="No lineage, no birthplace, no doctrine to sign. Shraddha and Saburi â€” faith and patience â€” and a fire that has not gone out since 1858."
      />

      {/* principles */}
      <Section wide className="pt-0">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guidingPrinciples.map((p) => (
            <Panel key={p.title} hover className="reveal flex flex-col px-7 py-8">
              <p className="font-deva text-2xl text-gold-light/85">{p.sanskrit}</p>
              <h3 className="mt-2 font-display text-[22px]">{p.title}</h3>
              <p className="mt-1 text-[12px] uppercase tracking-[0.18em] text-gold">{p.gloss}</p>
              <p className="mt-5 flex-1 text-[14px] leading-relaxed text-ink-soft">{p.body}</p>
            </Panel>
          ))}
        </div>
      </Section>

      {/* eleven assurances */}
      <Section wide className="relative overflow-hidden py-20">
        <Mandala className="pointer-events-none absolute -left-44 top-10 size-[520px] opacity-[0.12] animate-reverse-spin" />
        <SectionHeading
          eyebrow="From the Samadhi"
          title="The Eleven Assurances"
          sub="Spoken by Baba about what would continue after He laid the body down. They are read aloud at every Punyatithi."
        />
        <div className="relative grid gap-4 md:grid-cols-2">
          {elevenAssurances.map((a, i) => (
            <Panel key={i} className="reveal flex gap-5 px-6 py-6">
              <span className="font-display text-3xl leading-none ember-text">{i + 1}</span>
              <p className="font-quote text-[18px] italic leading-relaxed text-ink">{a}</p>
            </Panel>
          ))}
          <Panel className="reveal grid place-items-center px-6 py-10 text-center">
            <div>
              <OmMark size={28} className="mx-auto text-gold" />
              <p className="mt-4 font-deva text-[15px] text-gold-light/85">à¤¶à¥à¤°à¥€ à¤¸à¤šà¥à¤šà¤¿à¤¦à¤¾à¤¨à¤‚à¤¦ à¤¸à¤¦à¤—à¥à¤°à¥ à¤¸à¤¾à¤ˆà¤¨à¤¾à¤¥ à¤®à¤¹à¤¾à¤°à¤¾à¤œ à¤•à¥€ à¤œà¤¯</p>
            </div>
          </Panel>
        </div>
      </Section>

      {/* timeline */}
      <Section wide className="py-20">
        <SectionHeading
          eyebrow="Sixty years in one village"
          title="A life with no documents"
          sub="Baba never confirmed His birth, His parents or His faith. What is recorded is what devotees saw, and what He did every single day."
        />

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-[11px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent sm:left-1/2" />
          <div className="space-y-10">
            {babaTimeline.map((t, i) => (
              <div
                key={t.year}
                className={`reveal relative pl-10 sm:pl-0 ${
                  i % 2 === 0 ? 'sm:pr-[calc(50%+2.5rem)] sm:text-right' : 'sm:pl-[calc(50%+2.5rem)]'
                }`}
              >
                <span className="absolute left-0 top-1.5 grid size-6 place-items-center rounded-full border border-gold/50 bg-bg sm:left-1/2 sm:-translate-x-1/2">
                  <span className="size-2 rounded-full bg-ember" />
                </span>
                <p className="text-[11px] uppercase tracking-[0.28em] text-gold">{t.year}</p>
                <h3 className="mt-2 font-display text-[21px]">{t.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-soft">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* quotes wall */}
      <Section wide className="relative overflow-hidden py-20">
        <EmberField count={16} />
        <SectionHeading eyebrow="In His own words" title="Things Baba said" />
        <div className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quotes.map((q, i) => (
            <Panel key={i} hover className="reveal flex flex-col justify-between px-7 py-8">
              <p className="font-quote text-[20px] italic leading-snug text-ink">â€œ{q.text}â€</p>
              <p className="mt-5 text-[11px] uppercase tracking-[0.24em] text-gold">â€” {q.source}</p>
            </Panel>
          ))}
        </div>
      </Section>

      {/* udi */}
      <Section wide className="pb-24">
        <Panel className="reveal relative grid overflow-hidden lg:grid-cols-[1fr_0.8fr]">
          <div className="px-8 py-12 sm:px-12">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gold">The Dhuni and the Udi</p>
            <h2 className="mt-4 text-balance font-display text-3xl leading-tight sm:text-4xl">
              All this will be ash. Take a pinch and remember what is not.
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              Baba kept a fire burning in Dwarkamai for sixty years and gave its ash to everyone who came â€” for
              fever, for childlessness, for plague, for a journey. He never explained it as medicine. The Udi was
              His standing sermon: the body and everything it chases becomes this grey powder, and the one who
              hands it to you does not.
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              Every sannidhi in this network keeps a Dhuni lit from the same tradition. Chicagoâ€™s has not been
              allowed to go out since 2003. The ash is packed by hand each Thursday and given free at the counter â€”
              or posted to you if you cannot come.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/sevas">Request Udi by mail</Button>
              <Button to="/satcharitra" variant="outline">
                Chapters 33 & 34 â€” the Udi leelas
              </Button>
            </div>
          </div>

          <div className="relative grid place-items-center overflow-hidden px-8 py-12">
            <Mandala className="pointer-events-none absolute left-1/2 top-1/2 size-[440px] -translate-x-1/2 -translate-y-1/2 opacity-[0.16] animate-slow-spin" />
            <BabaSilhouette className="relative w-[min(60vw,240px)]" />
            <Divider className="relative mt-6 w-40" icon="diya" />
            <p className="relative mt-4 font-deva text-[14px] text-gold">à¤¸à¤¬à¤•à¤¾ à¤®à¤¾à¤²à¤¿à¤• à¤à¤•</p>
          </div>
        </Panel>
      </Section>
    </div>
  )
}
