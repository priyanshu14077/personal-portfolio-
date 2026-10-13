import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The TL;DR box at the top and the key takeaways box at the end share one shape:
 * the fact tile's navy surface with a copper label. Pass `items` or markdown list children.
 */
export function KeyPoints({
  variant,
  items,
  children,
  className,
}: {
  variant: "tldr" | "takeaways"
  items?: string[]
  children?: React.ReactNode
  className?: string
}) {
  const takeaways = variant === "takeaways"
  const label = takeaways ? "Key takeaways" : "TL;DR"
  const Label = takeaways ? "h2" : "p"
  return (
    <aside
      data-no-toc={takeaways ? undefined : ""}
      aria-label={label}
      className={cn("key-points my-8 rounded-md bg-deep px-6 py-5 text-paper sm:px-7 sm:py-6", className)}
    >
      <Label id={takeaways ? "key-takeaways" : undefined} className="mt-0 scroll-mt-10 font-display text-[21px] leading-tight text-tape">
        {label}
      </Label>
      {items ? (
        <ul className="mt-3 space-y-2">
          {items.map((it) => (
            <li key={it} className="flex gap-2.5 text-[16px] leading-[1.55] text-paper/90">
              <span className="mt-[11px] size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" /> {it}
            </li>
          ))}
        </ul>
      ) : (
        <div className="key-points-body mt-3 text-[16px] leading-[1.55] text-paper/90">{children}</div>
      )}
    </aside>
  )
}

export function TLDR(props: { items?: string[]; children?: React.ReactNode }) {
  return <KeyPoints variant="tldr" {...props} />
}

export function Takeaways(props: { items?: string[]; children?: React.ReactNode }) {
  return <KeyPoints variant="takeaways" {...props} />
}
