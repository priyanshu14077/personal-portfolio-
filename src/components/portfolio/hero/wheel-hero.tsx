import { ArrowDown, Mail } from "lucide-react"

import { DeploymentCover, PrototypeCover, StageCover } from "@/components/portfolio/hero/wheel-covers"
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel"
import { deployments } from "@/data/field"
import { prototypes, stageDetails, stages } from "@/data/hero"
import { resume } from "@/data/resume"

const items: WorksWheelItem[] = [
  ...stages.map((s) => ({
    title: s.title,
    kicker: `Step ${s.step} · ${s.verb}`,
    cover: <StageCover stage={s} />,
    ...stageDetails[s.id],
  })),
  ...deployments.map((d, i) => ({
    title: d.client,
    kicker: `Deployment · ${d.sector} · ${d.period}`,
    cover: <DeploymentCover item={d} index={i} />,
    summary: d.problem,
    points: [...d.shipped, d.outcome.map((o) => `${o.value} ${o.label}`).join(" · ")],
    link: d.url ? { label: "Visit live", href: d.url } : undefined,
  })),
  ...prototypes.map((p) => ({
    title: p.name,
    kicker: p.kicker,
    cover: <PrototypeCover item={p} />,
    summary: p.summary,
    points: p.points,
    link: p.link,
  })),
]

export function WheelHero() {
  return (
    <section
      id="field-work"
      aria-labelledby="field-work-title"
      className="relative flex h-svh min-h-[560px] w-full flex-col overflow-hidden bg-[linear-gradient(180deg,#24375a_0%,#1a2a47_38%,#14213a_70%,#0c1528_100%)]"
    >
      {/* Faint ruled lines, like the page of a field notebook. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(180deg,transparent_0,transparent_39px,rgba(242,237,226,0.035)_39px,rgba(242,237,226,0.035)_40px)]"
      />
      {/* On phones the intro sits above the wheel; from md up it floats over the corner. */}
      <div className="pointer-events-none relative z-[160] max-w-[min(100vw,330px)] px-5 pt-6 pb-2 md:absolute md:top-0 md:left-0 md:p-8">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-tape uppercase">Field work</p>
        <h2 id="field-work-title" className="mt-3 font-display text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.12] text-paper">
          From a business problem <em className="text-accent">to AI in production.</em>
        </h2>
        <p className="mt-3 hidden text-[13.5px] leading-relaxed text-paper/65 md:block">
          Turn the wheel: the four steps of how I work, three client deployments and three prototypes. Hover or
          click any card for the story.
        </p>
        <div className="pointer-events-auto mt-4 hidden gap-2 md:flex">
          <a
            href={`mailto:${resume.email}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-accent hover:text-paper"
          >
            <Mail className="size-3.5" aria-hidden="true" /> Email me
          </a>
          <a
            href="#impact"
            className="inline-flex items-center gap-1.5 rounded-full border border-paper/30 px-3.5 py-1.5 text-[13px] font-semibold text-paper transition-colors hover:border-accent hover:text-accent"
          >
            Skip ahead <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Bottom margin keeps the controls clear of the next section's torn edge. */}
      <div className="relative mb-9 min-h-0 flex-1">
        <WorksWheel
          items={items}
          label="Forward deployed"
          action="Details"
          wheelUnits={320}
          className="absolute inset-0 bg-transparent"
        />
      </div>

      <p className="pointer-events-none absolute right-8 bottom-6 z-[160] hidden text-right font-hand text-xl text-tape md:block">
        scroll or drag to turn the wheel
      </p>
    </section>
  )
}
