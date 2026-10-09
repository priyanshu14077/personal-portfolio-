import { ArrowRight } from "lucide-react"

import { faces, steps, type WheelCard } from "@/data/hero"
import { cn } from "@/lib/utils"

/** A row of stages joined by arrows: the card's one diagram. */
function Flow({ nodes, light }: { nodes: string[]; light: boolean }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2.5">
      {nodes.map((node, i) => (
        <li key={node} className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-sm px-2.5 py-1 text-[13.5px] font-medium",
              light ? "border border-ink/25 text-ink" : "bg-paper/10 text-paper/90",
              i === nodes.length - 1 && (light ? "border-accent bg-accent text-paper" : "bg-accent text-paper"),
            )}
          >
            {node}
          </span>
          {i < nodes.length - 1 && (
            <ArrowRight className={cn("size-3.5", light ? "text-ink/40" : "text-paper/40")} aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  )
}

function Notes({ quotes }: { quotes: string[] }) {
  return (
    <ul className="grid grid-cols-3 gap-2.5">
      {quotes.map((q, i) => (
        <li
          key={q}
          className="rounded-[2px] bg-[#f6e9b8] px-2.5 py-2 font-hand text-[16px] leading-[1.15] text-ink shadow-[0_6px_14px_-8px_rgba(0,0,0,0.7)]"
          style={{ rotate: `${[-2, 1.5, -1][i]}deg` }}
        >
          {q}
        </li>
      ))}
    </ul>
  )
}

export function WheelCardCover({ card }: { card: WheelCard }) {
  const light = card.kind === "capability"
  const stepNo = steps.findIndex((s) => s.id === card.id) + 1
  return (
    <div
      className={cn(
        "flex size-full flex-col justify-between px-[7%] py-[6.5%] text-left",
        light ? "paper-grain text-ink" : "bg-[linear-gradient(160deg,#24375a_0%,#14213a_80%)] text-paper",
      )}
    >
      <div>
        <p className={cn("text-[14px] font-medium", light ? "text-accent" : "text-tape")}>
          {light ? "Capability" : `Step ${stepNo} of ${steps.length}`}
        </p>
        <p className="mt-1.5 font-display text-[clamp(1.75rem,2.8vw,2.4rem)] leading-[1.1]">{card.title}</p>
        <p className={cn("mt-2 max-w-[36ch] text-[15px] leading-[1.5]", light ? "text-ink/70" : "text-paper/70")}>
          {card.tagline}
        </p>
      </div>
      {card.id === "discover" ? <Notes quotes={faces.discover} /> : <Flow nodes={faces[card.id]} light={light} />}
    </div>
  )
}
