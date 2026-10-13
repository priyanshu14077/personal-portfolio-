import type * as React from "react"
import { AlertTriangle, Info, Lightbulb, Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

type CalloutType = "note" | "tip" | "warning" | "insight"

// Each tint is an existing colour at low opacity: tape for notes, accent for tips and warnings, ink for insights.
const styles: Record<CalloutType, { box: string; label: string; icon: React.ComponentType<{ className?: string }>; name: string }> = {
  note: { box: "border-tape bg-tape/15", label: "text-ink", icon: Info, name: "Note" },
  tip: { box: "border-accent/60 bg-accent/12", label: "text-accent", icon: Lightbulb, name: "Tip" },
  warning: { box: "border-accent bg-accent/20", label: "text-accent", icon: AlertTriangle, name: "Watch out" },
  insight: { box: "border-ink/40 bg-ink/6", label: "text-ink", icon: Sparkles, name: "Insight" },
}

/** An aside in the body: `<Callout type="tip" title="...">...</Callout>`. */
export function Callout({ type = "note", title, children }: { type?: CalloutType; title?: string; children: React.ReactNode }) {
  const s = styles[type]
  const Icon = s.icon
  return (
    <aside data-callout={type} className={cn("my-7 rounded-md border-l-[3px] px-5 py-4 sm:px-6", s.box)}>
      <p className={cn("flex items-center gap-2 text-[14px] font-semibold", s.label)}>
        <Icon className="size-4" aria-hidden="true" /> {title ?? s.name}
      </p>
      <div className="callout-body mt-2 text-[16px] leading-[1.6] text-ink/90">{children}</div>
    </aside>
  )
}
