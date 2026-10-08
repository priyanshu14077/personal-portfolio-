import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { toolbelt, type ToolGroup } from "@/data/field"

function ToolTag({ group, index }: { group: ToolGroup; index: number }) {
  return (
    <Reveal as="li" delay={index * 60}>
      <div className="relative h-full rounded-md border border-paper/15 bg-paper/[0.04] p-5 pl-7 backdrop-blur-sm">
        {/* Luggage-tag eyelet. */}
        <span aria-hidden="true" className="absolute top-5 left-2.5 size-2 rounded-full border border-tape/60" />
        <h3 className="text-[11px] font-semibold tracking-[0.24em] text-tape uppercase">{group.name}</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {group.tools.map((t) => (
            <li
              key={t}
              className="rounded-sm bg-paper/90 px-2.5 py-1 text-[13px] font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
            >
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
    <section id="toolbelt" aria-labelledby="toolbelt-title" className="relative bg-deep px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tone="dark"
          eyebrow="Toolbelt"
          title={<span id="toolbelt-title">What I bring into a customer's stack</span>}
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {toolbelt.map((g, i) => (
            <ToolTag key={g.name} group={g} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
