import { Check, Pause, Play } from "lucide-react"
import * as React from "react"

import { STAGE_CONTENT } from "@/components/portfolio/hero/stage-content"
import { useStepper } from "@/components/portfolio/hero/use-stepper"
import { stages, type Stage } from "@/data/hero"
import { cn } from "@/lib/utils"

const STEP_MS = 5200

type PanelState = "done" | "live" | "next"

function StageStamp({ stage, state }: { stage: Stage; state: PanelState }) {
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-dashed text-[11px] font-bold transition-colors duration-500",
        state === "live" && "border-accent bg-accent text-paper",
        state === "done" && "border-accent/70 text-accent",
        state === "next" && "border-paper/25 text-paper/45",
      )}
    >
      {state === "done" ? <Check className="size-4" aria-hidden="true" /> : stage.step}
    </span>
  )
}

function StagePanel({
  stage,
  state,
  current,
  run,
  animate,
  onSelect,
}: {
  stage: Stage
  state: PanelState
  /** The selected stage; the only one shown on small screens. */
  current: boolean
  run: number
  animate: boolean
  onSelect: () => void
}) {
  const Content = STAGE_CONTENT[stage.id]
  return (
    <article
      aria-labelledby={`stage-${stage.id}`}
      data-state={state}
      className={cn(
        "relative flex flex-col rounded-md border p-4 transition-[opacity,border-color,background-color,translate] duration-500",
        state === "live"
          ? "border-accent/70 bg-navy/70 shadow-[0_24px_50px_-28px_rgba(180,103,61,0.65)] lg:-translate-y-1.5"
          : "border-paper/10 bg-navy/30",
        state === "next" && "opacity-50",
        !current && "max-lg:hidden",
      )}
    >
      <button type="button" onClick={onSelect} className="flex items-start gap-3 text-left">
        <StageStamp stage={stage} state={state} />
        <span>
          <span className="block text-[10px] font-semibold tracking-[0.24em] text-tape uppercase">{stage.verb}</span>
          <span id={`stage-${stage.id}`} className="block font-display text-[22px] leading-tight font-medium text-paper">
            {stage.title}
          </span>
        </span>
      </button>
      <p className="mt-2 min-h-[2.6em] text-[12.5px] leading-snug text-paper/65">{stage.caption}</p>
      {/* Remounting on each run replays the live panel's entrance animation. */}
      <div key={state === "live" ? run : "static"} className={cn("mt-4 flex-1", state === "live" && animate && "is-live")}>
        <Content />
      </div>
    </article>
  )
}

export function DeploymentPipeline() {
  const ref = React.useRef<HTMLDivElement>(null)
  const { active, run, playing, reduced, paused, setPaused, setHeld, select } = useStepper(stages.length, STEP_MS, ref)

  return (
    <div
      ref={ref}
      role="group"
      aria-label="How a forward deployed engineer takes a business problem to production"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <div className="mb-4 flex items-center gap-3">
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-paper/10" aria-hidden="true">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-accent"
            style={{
              width: `${((playing ? active + 1 : active + 0.5) / stages.length) * 100}%`,
              transition: playing ? `width ${STEP_MS}ms linear` : "width 300ms ease",
            }}
          />
        </div>
        <div className="flex gap-1 lg:hidden">
          {stages.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show step ${s.step}: ${s.title}`}
              aria-pressed={i === active}
              className={cn("size-2.5 rounded-full", i === active ? "bg-accent" : "bg-paper/25")}
            />
          ))}
        </div>
        {!reduced && (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the walkthrough" : "Pause the walkthrough"}
            className="flex size-7 items-center justify-center rounded-full border border-paper/20 text-paper/70 hover:border-accent hover:text-accent"
          >
            {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          </button>
        )}
      </div>
      <div className="grid gap-4 lg:grid-cols-4">
        {stages.map((s, i) => (
          <StagePanel
            key={s.id}
            stage={s}
            state={reduced ? "done" : i === active ? "live" : i < active ? "done" : "next"}
            current={i === active}
            run={run}
            animate={!reduced}
            onSelect={() => select(i)}
          />
        ))}
      </div>
    </div>
  )
}
