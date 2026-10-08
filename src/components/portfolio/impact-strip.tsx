import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { TornEdge } from "@/components/portfolio/torn-edge"
import { impact, type Impact } from "@/data/field"

function ImpactStub({ item, index }: { item: Impact; index: number }) {
  return (
    <Reveal as="li" delay={index * 70}>
      <div
        className="group relative h-full rounded-sm border border-ink/15 bg-paper px-5 pt-5 pb-4 shadow-[0_1px_0_rgba(38,54,79,0.08),0_8px_20px_-12px_rgba(38,54,79,0.35)] transition-transform duration-300 hover:-translate-y-1"
        style={{ rotate: `${index % 2 ? 0.6 : -0.6}deg` }}
      >
        {/* Perforated tear-off line, like a ticket stub. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-3 bottom-12 border-t border-dashed border-ink/25"
        />
        <p className="font-display text-4xl leading-none font-semibold text-ink sm:text-5xl">{item.value}</p>
        <p className="mt-2 text-sm font-medium text-ink/80">{item.label}</p>
        <p className="mt-6 text-[11px] tracking-[0.14em] text-ink/55 uppercase">{item.context}</p>
      </div>
    </Reveal>
  )
}

export function ImpactStrip() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="paper-grain relative px-4 pt-20 pb-24 sm:px-8">
      <TornEdge position="top" color="#f2ede2" seed={11} />
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Impact in the field"
          title={<span id="impact-title">Results I've shipped to production, in numbers</span>}
          note="measured, not estimated"
        />
        <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
          {impact.map((item, i) => (
            <ImpactStub key={item.label} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
