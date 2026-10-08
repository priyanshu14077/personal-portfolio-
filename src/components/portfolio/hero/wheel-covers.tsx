import type * as React from "react"

import { STAGE_CONTENT } from "@/components/portfolio/hero/stage-content"
import type { Deployment } from "@/data/field"
import type { Prototype, Stage } from "@/data/hero"

/** A walkthrough step: the same panel the old hero animated, as a card face. */
export function StageCover({ stage }: { stage: Stage }) {
  const Content = STAGE_CONTENT[stage.id]
  return (
    <div className="flex size-full flex-col bg-[linear-gradient(160deg,#24375a_0%,#14213a_70%)] p-[5%] text-left">
      <div className="flex items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-paper">
          {stage.step}
        </span>
        <div>
          <p className="text-[9.5px] font-semibold tracking-[0.24em] text-tape uppercase">{stage.verb}</p>
          <p className="font-display text-[22px] leading-none text-paper">{stage.title}</p>
        </div>
      </div>
      <div className="mt-4 min-h-0 flex-1 overflow-hidden">
        <Content />
      </div>
    </div>
  )
}

/** A client deployment: paper card with the headline results. */
export function DeploymentCover({ item, index }: { item: Deployment; index: number }) {
  return (
    <div className="paper-grain flex size-full flex-col justify-between p-[6%] text-left text-ink">
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] font-semibold tracking-[0.22em] text-accent uppercase">
          Deployment {String(index + 1).padStart(2, "0")} · {item.sector}
        </p>
        <p className="text-[10px] text-ink/55">{item.period}</p>
      </div>
      <div>
        <p className="font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[0.95]">{item.client}</p>
        <p className="mt-1 text-[12px] text-ink/65">{item.role}</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {item.outcome.map((o) => (
          <div key={o.label} className="rounded-sm bg-deep px-2.5 py-2 text-paper">
            <p className="font-display text-[22px] leading-none">{o.value}</p>
            <p className="mt-1 text-[10px] leading-tight text-paper/70">{o.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/** A prototype: blueprint-style card. */
export function PrototypeCover({ item }: { item: Prototype }) {
  return (
    <div
      className="flex size-full flex-col justify-between bg-night p-[6%] text-left"
      style={{
        backgroundImage:
          "linear-gradient(rgba(169,193,214,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(169,193,214,0.08) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      } as React.CSSProperties}
    >
      <p className="font-mono text-[11px] text-tape">› {item.kicker.toLowerCase()}</p>
      <p className="font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[0.95] text-paper">{item.name}</p>
      <p className="max-w-[90%] text-[12.5px] leading-snug text-paper/70">{item.summary}</p>
      <ul className="flex flex-wrap gap-1.5">
        {item.tags.map((t) => (
          <li key={t} className="rounded-sm border border-tape/30 px-2 py-0.5 font-mono text-[10.5px] text-tape">
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
