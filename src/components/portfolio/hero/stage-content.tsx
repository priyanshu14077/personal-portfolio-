import { ArrowRight, Check, Rocket } from "lucide-react"
import type * as React from "react"

import { agentFlow, consoleLines, deployLog, discoveryNotes, outcome, spec, type StageId } from "@/data/hero"

/** Children with `hero-pop` animate in sequence (`--i`) while their panel is live. */
function Pop({ i, className, children }: { i: number; className?: string; children: React.ReactNode }) {
  return (
    <div className={`hero-pop ${className ?? ""}`} style={{ "--i": i } as React.CSSProperties}>
      {children}
    </div>
  )
}

function AbsorbStage() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {discoveryNotes.map((n, i) => (
        <Pop key={n.who} i={i}>
          <div
            className="h-full rounded-[2px] bg-[#f6e9b8] px-2.5 pt-2 pb-2.5 text-ink shadow-[0_6px_14px_-8px_rgba(0,0,0,0.7)]"
            style={{ rotate: `${[-2.5, 1.8, 1.2, -1.6][i]}deg` }}
          >
            <p className="text-[9px] font-bold tracking-[0.18em] text-accent uppercase">{n.who}</p>
            <p className="mt-1 font-hand text-[17px] leading-[1.05]">{n.text}</p>
          </div>
        </Pop>
      ))}
    </div>
  )
}

function SpecStage() {
  return (
    <dl className="rounded-sm border border-paper/15 bg-paper/[0.03] font-mono text-[11.5px]">
      {spec.map((s, i) => (
        <Pop key={s.field} i={i} className="flex gap-3 border-b border-dashed border-paper/10 px-3 py-[7px] last:border-0">
          <dt className="w-16 shrink-0 text-tape/80">{s.field}</dt>
          <dd className={s.field === "Metric" ? "font-semibold text-accent" : "text-paper/90"}>{s.value}</dd>
        </Pop>
      ))}
    </dl>
  )
}

function BuildStage() {
  return (
    <div className="space-y-3">
      <Pop i={0} className="flex flex-wrap items-center gap-1">
        {agentFlow.map((node, i) => (
          <span key={node} className="flex items-center gap-1">
            <span
              className={`rounded-sm px-1.5 py-0.5 text-[10.5px] font-semibold ${
                node === "Claude" ? "bg-accent text-paper" : "bg-paper/10 text-paper/85"
              }`}
            >
              {node}
            </span>
            {i < agentFlow.length - 1 && <ArrowRight className="size-3 text-paper/40" aria-hidden="true" />}
          </span>
        ))}
      </Pop>
      <div className="rounded-sm bg-night/80 p-3 font-mono text-[11px] leading-relaxed ring-1 ring-paper/10">
        {consoleLines.map((l, i) => (
          <Pop key={l.text} i={i + 1}>
            <p
              className={
                l.kind === "prompt"
                  ? "text-paper"
                  : l.kind === "answer"
                    ? "mt-1 font-semibold text-[#9fd3a8]"
                    : "text-paper/55"
              }
            >
              <span className="text-accent">{l.kind === "prompt" ? "› " : l.kind === "answer" ? "✓ " : "· "}</span>
              {l.text}
            </p>
          </Pop>
        ))}
      </div>
    </div>
  )
}

function ShipStage() {
  return (
    <div className="space-y-3">
      <ul className="space-y-1.5">
        {deployLog.map((line, i) => (
          <Pop key={line} i={i}>
            <li className="flex gap-2 text-[12px] leading-snug text-paper/85">
              <Check className="mt-0.5 size-3.5 shrink-0 text-[#9fd3a8]" aria-hidden="true" />
              {line}
            </li>
          </Pop>
        ))}
      </ul>
      <Pop i={deployLog.length}>
        <div className="relative -rotate-2 rounded-sm border-2 border-accent px-3 py-2 text-center">
          <p className="flex items-center justify-center gap-2 font-display text-2xl leading-tight font-medium text-paper">
            {outcome.from} <ArrowRight className="size-4 text-accent" aria-hidden="true" /> {outcome.to}
          </p>
          <p className="mt-1 text-[10px] font-semibold tracking-[0.18em] text-accent uppercase">
            {outcome.label} · {outcome.extra}
          </p>
          <Rocket className="absolute -top-2.5 -right-2.5 size-5 rounded-full bg-deep p-0.5 text-accent" aria-hidden="true" />
        </div>
      </Pop>
    </div>
  )
}

export const STAGE_CONTENT: Record<StageId, () => React.JSX.Element> = {
  absorb: AbsorbStage,
  spec: SpecStage,
  build: BuildStage,
  ship: ShipStage,
}
