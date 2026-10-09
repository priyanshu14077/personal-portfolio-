import { FieldCard } from "@/components/portfolio/field-card"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { TornEdge } from "@/components/portfolio/torn-edge"
import { PostcardScene } from "@/components/ui/torn-postcard-portfolio"
import { impact, type Impact } from "@/data/field"

function ImpactStub({ item, index }: { item: Impact; index: number }) {
  return (
    <Reveal as="li" delay={(index % 3) * 80} className="h-full">
      <FieldCard>
        <p className="font-display text-[clamp(2.4rem,3.6vw,3rem)] leading-tight text-ink">{item.value}</p>
        <p className="mt-2 text-[16px] font-medium text-ink/85">{item.label}</p>
        <div className="mt-auto pt-6">
          <p className="border-t border-dashed border-ink/20 pt-4 text-[14px] text-ink/60">{item.context}</p>
        </div>
      </FieldCard>
    </Reveal>
  )
}

export function ImpactStrip() {
  return (
    <section id="impact" aria-labelledby="impact-title" className="paper-grain relative px-5 pt-28 pb-64 sm:px-10">
      <TornEdge position="top" color="#f2ede2" seed={11} />
      {/* The About chapter's misty ranges, rising behind the foot of the section. */}
      <PostcardScene kind="peaks" className="top-auto h-[44%] opacity-45 [mask-image:linear-gradient(180deg,transparent,#000_40%,#000_70%,transparent)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Impact"
          title={<span id="impact-title">Results I've shipped to production</span>}
          intro="Every number below came from a system I built and ran for a real team."
        />
        <ul className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {impact.map((item, i) => (
            <ImpactStub key={item.label} item={item} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
