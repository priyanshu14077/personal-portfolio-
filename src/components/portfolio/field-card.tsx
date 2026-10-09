import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The one card used across the page, so every section moves the same way:
 * on hover it lifts, its border warms, and a copper line draws across the top.
 */
export function FieldCard({
  tone = "light",
  className,
  children,
}: {
  tone?: "light" | "dark"
  className?: string
  children: React.ReactNode
}) {
  const dark = tone === "dark"
  return (
    <div
      className={cn(
        "group/card relative flex h-full flex-col overflow-hidden rounded-md border p-7 transition-[translate,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8",
        dark
          ? "border-paper/15 bg-deep/75 backdrop-blur-sm hover:border-accent/50 hover:shadow-[0_22px_44px_-24px_rgba(0,0,0,0.8)]"
          : "border-ink/15 bg-paper shadow-[0_12px_28px_-22px_rgba(20,33,58,0.5)] hover:border-accent/40 hover:shadow-[0_24px_44px_-24px_rgba(20,33,58,0.55)]",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover/card:scale-x-100 motion-reduce:transition-none"
      />
      {children}
    </div>
  )
}

/** Small label above a card title: the same size and weight everywhere. */
export function CardLabel({ tone = "light", children }: { tone?: "light" | "dark"; children: React.ReactNode }) {
  return <p className={cn("text-[14px] font-medium", tone === "dark" ? "text-tape" : "text-accent")}>{children}</p>
}

/** Card title: the same face and size everywhere. */
export function CardTitle({
  tone = "light",
  as: Tag = "h3",
  children,
}: {
  tone?: "light" | "dark"
  as?: "h3" | "p"
  children: React.ReactNode
}) {
  return (
    <Tag className={cn("mt-2 font-display text-[28px] leading-[1.15]", tone === "dark" ? "text-paper" : "text-ink")}>
      {children}
    </Tag>
  )
}
