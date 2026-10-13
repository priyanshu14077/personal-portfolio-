import { Link } from "react-router"

import { tagLabel } from "@/lib/blog"
import { cn } from "@/lib/utils"

/** The stack pill from the case-study cards, as a link to the tag's page. */
export function TagPill({
  tag,
  tone = "light",
  active = false,
  count,
}: {
  tag: string
  tone?: "light" | "dark"
  active?: boolean
  count?: number
}) {
  const dark = tone === "dark"
  return (
    <Link
      to={`/blog/tags/${tag}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[13px] transition-colors",
        dark
          ? "border-paper/20 text-paper/85 hover:border-accent/50 hover:text-paper"
          : "border-ink/20 text-ink/70 hover:border-accent/40 hover:text-ink",
        active && (dark ? "border-accent bg-accent/12 text-paper" : "border-accent bg-accent/12 text-ink"),
      )}
    >
      {tagLabel(tag)}
      {count !== undefined && <span className={dark ? "text-paper/50" : "text-ink/45"}>{count}</span>}
    </Link>
  )
}

export function TagList({ tags, tone, className }: { tags: string[]; tone?: "light" | "dark"; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((t) => (
        <li key={t}>
          <TagPill tag={t} tone={tone} />
        </li>
      ))}
    </ul>
  )
}
