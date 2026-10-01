import { EmberField, Mandala, OmMark } from '../components/Sacred'
import { Button, Panel, Section } from '../components/ui'

export default function NotFound() {
  return (
    <Section className="py-24">
      <Panel className="relative overflow-hidden px-8 py-20 text-center sm:px-16">
        <EmberField count={16} />
        <Mandala className="pointer-events-none absolute left-1/2 top-1/2 size-[480px] -translate-x-1/2 -translate-y-1/2 opacity-[0.12] animate-slow-spin" />
        <div className="relative z-10">
          <OmMark size={34} className="mx-auto text-gold" />
          <p className="mt-7 font-display text-6xl ember-text">404</p>
          <h1 className="mt-4 text-balance font-display text-3xl">This path does not lead to the sanctum</h1>
          <p className="mx-auto mt-5 max-w-md font-quote text-[18px] italic leading-relaxed text-ink-soft">
            “Unless there is some relationship or connection, nobody goes anywhere.” Try one of these instead.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button to="/">Return home</Button>
            <Button to="/aarti" variant="outline">
              Aarti timings
            </Button>
            <Button to="/temples" variant="ghost">
              Find a sannidhi
            </Button>
          </div>
        </div>
      </Panel>
    </Section>
  )
}
