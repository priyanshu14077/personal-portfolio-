import { CardTitle, FieldCard } from "@/components/portfolio/field-card"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { TechMarqueeRows } from "@/components/portfolio/tech-marquee"
import { PostcardScene } from "@/components/ui/torn-postcard-portfolio"
import { toolbelt, type ToolGroup } from "@/data/field"

function ToolTag({ group, index }: { group: ToolGroup; index: number }) {
  return (
    <Reveal as="li" delay={(index % 3) * 80} className="h-full">
      <FieldCard tone="dark">
        <CardTitle tone="dark">{group.name}</CardTitle>
        <ul className="mt-5 flex flex-wrap gap-2">
          {group.tools.map((t) => (
            <li key={t} className="rounded-full border border-paper/20 px-3 py-1 text-[14px] text-paper/85">
              {t}
            </li>
          ))}
        </ul>
      </FieldCard>
    </Reveal>
  )
}

export function Toolbelt() {
  return (
    <section id="toolbelt" aria-labelledby="toolbelt-title" className="relative overflow-hidden bg-deep pt-32 pb-44">
      {/* The Work chapter's snowy pines at night, along the foot of the section. */}
      <PostcardScene kind="pines" className="top-auto h-[55%] [mask-image:linear-gradient(180deg,transparent,#000_45%)]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-10">
        <SectionHeading
          tone="dark"
          eyebrow="Stack"
          title={<span id="toolbelt-title">What I bring into a team's stack</span>}
          intro="Tools I've shipped to production, grouped by where they sit in a system."
        />
      </div>
      <div className="relative mb-16">
        <TechMarqueeRows />
      </div>
      <div className="relative mx-auto max-w-6xl px-5 sm:px-10">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {toolbelt.map((g, i) => (
            <ToolTag key={g.name} group={g} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
