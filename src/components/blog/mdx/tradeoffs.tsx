import { Minus, Plus } from "lucide-react"

/** Pros and cons side by side: `<Tradeoffs title="..." pros={[...]} cons={[...]} />`. */
export function Tradeoffs({ title, pros, cons }: { title?: string; pros: string[]; cons: string[] }) {
  return (
    <div className="my-8 rounded-md border border-ink/15 bg-paper p-5 shadow-[0_12px_28px_-22px_rgba(20,33,58,0.5)] sm:p-6">
      {title && <p className="mb-4 font-display text-[21px] leading-tight text-ink">{title}</p>}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-[13px] font-semibold tracking-[0.12em] text-accent uppercase">For</p>
          <ul className="mt-3 space-y-2">
            {pros.map((p) => (
              <li key={p} className="flex gap-2.5 text-[15px] leading-[1.5] text-ink/85">
                <Plus className="mt-[3px] size-4 shrink-0 text-accent" aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t border-dashed border-ink/20 pt-5 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
          <p className="text-[13px] font-semibold tracking-[0.12em] text-ink/60 uppercase">Against</p>
          <ul className="mt-3 space-y-2">
            {cons.map((c) => (
              <li key={c} className="flex gap-2.5 text-[15px] leading-[1.5] text-ink/85">
                <Minus className="mt-[3px] size-4 shrink-0 text-ink/40" aria-hidden="true" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
