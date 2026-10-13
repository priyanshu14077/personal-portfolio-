import type * as React from "react"

/** A numbered walkthrough: `<Steps><Step title="...">...</Step></Steps>`. */
export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="steps my-8 list-none space-y-0 border-l border-ink/15 pl-0">{children}</ol>
}

export function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <li className="step relative pb-8 pl-10 last:pb-0">
      <span
        aria-hidden="true"
        className="absolute top-0 -left-[15px] flex size-[30px] items-center justify-center rounded-full border border-ink/20 bg-paper font-display text-[15px] text-accent"
      >
        <span className="step-number" />
      </span>
      <p className="pt-0.5 text-[17px] font-semibold text-ink">{title}</p>
      <div className="step-body mt-2 text-[16px] leading-[1.6] text-ink/85">{children}</div>
    </li>
  )
}
