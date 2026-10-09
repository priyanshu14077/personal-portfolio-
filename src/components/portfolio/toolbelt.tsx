import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { TechMarqueeRows } from "@/components/portfolio/tech-marquee"
import { PostcardScene } from "@/components/ui/torn-postcard-portfolio"
import { toolbelt, type ToolGroup } from "@/data/field"

function ToolTag({ group, index }: { group: ToolGroup; index: number }) {
  return (
    <Reveal as="li" delay={index * 50}>
      <div className="relative h-full rounded-md border border-paper/15 bg-deep/70 p-7 pl-9 backdrop-blur-sm">
        {/* Luggage-tag eyelet. */}
        <span aria-hidden="true" className="absolute top-8 left-3.5 size-2 rounded-full border border-tape/60" />
        <h3 className="text-[16px] font-semibold text-tape">{group.name}</h3>
        <ul className="mt-4 flex flex-wrap gap-2.5">
          {group.tools.map((t) => (
            <li key={t} className="rounded-sm bg-paper/90 px-3 py-1.5 text-[14px] font-medium text-ink">
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  )
}

export function Toolbelt() {
  return (
    <section id="toolbelt" aria-labelledby="toolbelt-title" className="relative overflow-hidden bg-deep pt-32 pb-60">
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
