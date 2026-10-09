import type * as React from "react"

import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  intro,
  note,
  tone = "light",
  className,
}: {
  /** A short plain-language label for the section. */
  eyebrow: string
  title: React.ReactNode
  /** One or two sentences under the heading. */
  intro?: string
  /** A short handwritten aside next to the heading. */
  note?: string
  tone?: "light" | "dark"
  className?: string
}) {
  const dark = tone === "dark"
  return (
    <header className={cn("mb-16 max-w-[44rem]", className)}>
      <p className={cn("text-[15px] font-medium", dark ? "text-tape" : "text-accent")}>{eyebrow}</p>
      <h2
        className={cn(
          "mt-3 font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.15] font-normal",
          dark ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-5 max-w-[60ch] text-[17px] leading-[1.65]", dark ? "text-paper/75" : "text-ink/75")}>
          {intro}
        </p>
      )}
      {note && (
        <p className={cn("mt-5 inline-block -rotate-1 font-hand text-2xl", dark ? "text-tape" : "text-accent")}>
          {note}
        </p>
      )}
    </header>
  )
}
