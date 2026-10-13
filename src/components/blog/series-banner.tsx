import { Link } from "react-router"

import type { PostMeta, Series } from "@/lib/blog"
import { cn } from "@/lib/utils"

/** "Part 2 of 5 in System Design 101", with the other parts linked. */
export function SeriesBanner({ series, current }: { series: Series; current: PostMeta }) {
  const index = series.parts.indexOf(current)
  return (
    <aside aria-label={`Series: ${series.name}`} className="rounded-md border border-tape/60 bg-tape/15 p-5 sm:p-6">
      <p className="text-[14px] font-medium text-ink">
        Part {index + 1} of {series.parts.length} in <span className="font-display text-[18px]">{series.name}</span>
      </p>
      <ol className="mt-3 space-y-1.5">
        {series.parts.map((p, i) => (
          <li key={p.slug} className="flex gap-2.5 text-[15px] leading-[1.5]">
            <span className="w-5 shrink-0 text-ink/50 tabular-nums">{i + 1}.</span>
            {p === current ? (
              <span className="font-medium text-ink" aria-current="page">
                {p.title}
              </span>
            ) : (
              <Link to={`/blog/${p.slug}`} className={cn("text-ink/75 underline-offset-4 hover:text-accent hover:underline")}>
                {p.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </aside>
  )
}
