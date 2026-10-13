import { Clock3 } from "lucide-react"

import { formatDate, type PostMeta } from "@/lib/blog"
import { cn } from "@/lib/utils"

/** Date, updated date and reading time in the small meta style used under card titles. */
export function PostMetaLine({ post, tone = "light", className }: { post: PostMeta; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark"
  return (
    <p className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px]", dark ? "text-paper/60" : "text-ink/60", className)}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      {post.updated && (
        <span>
          · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
        </span>
      )}
      <span className="inline-flex items-center gap-1">
        <Clock3 className="size-3.5" aria-hidden="true" /> {post.readingMinutes} min read
      </span>
    </p>
  )
}
