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
      aria-label="Introduction"
      className="relative flex h-svh min-h-[560px] w-full flex-col overflow-hidden bg-[radial-gradient(110%_80%_at_50%_45%,#24375a_0%,#14213a_55%,#0c1528_100%)]"
    >
      {/* On phones the intro sits above the wheel; from md up it floats over the corner. */}
      <div className="pointer-events-none relative z-[160] max-w-[min(100vw,330px)] px-5 pt-6 pb-2 md:absolute md:top-0 md:left-0 md:p-8">
        <p className="text-[11px] font-semibold tracking-[0.28em] text-tape uppercase">{resume.name}</p>
        <h1 className="mt-3 font-display text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.02] text-paper">
          I learn how your business runs, <em className="text-accent">then ship the AI that speeds it up.</em>
        </h1>
        <p className="mt-3 hidden text-[13.5px] leading-relaxed text-paper/65 md:block">
          Forward deployed engineer. Turn the wheel: four steps of how I work, three client deployments, three
          prototypes.
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

      <div className="relative min-h-0 flex-1">
        <WorksWheel
          items={items}
          label="Forward deployed"
          action="Details"
          wheelUnits={320}
          className="absolute inset-0 bg-transparent"
        />
      </div>

      <p className="pointer-events-none absolute right-8 bottom-6 z-[160] hidden text-right font-hand text-xl text-tape md:block">
        scroll or drag to turn · hover or click a card for the story
      </p>
    </section>
  )
}
