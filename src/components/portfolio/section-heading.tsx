import type * as React from "react"

import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  note,
  tone = "light",
  className,
}: {
  eyebrow: string
  title: React.ReactNode
  /** A short handwritten aside next to the heading. */
  note?: string
  tone?: "light" | "dark"
  className?: string
}) {
  const dark = tone === "dark"
  return (
    <header className={cn("mb-12 max-w-3xl", className)}>
      <p
        className={cn(
          "mb-3 text-[11px] font-semibold tracking-[0.3em] uppercase",
          dark ? "text-tape" : "text-accent",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "font-display text-4xl leading-[1.12] font-normal sm:text-5xl",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {note && (
        <p
          className={cn(
            "mt-4 inline-block -rotate-1 font-hand text-2xl",
            dark ? "text-tape" : "text-accent",
          )}
        >
          {note}
        </p>
      )}
    </header>
  )
}
