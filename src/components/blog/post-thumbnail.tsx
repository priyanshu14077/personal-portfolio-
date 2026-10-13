import { Link } from "react-router"

import type { PostMeta } from "@/lib/blog"
import { cn } from "@/lib/utils"

/**
 * The post's diagram, linked to the post. The title link next to it carries the accessible name,
 * so this one is hidden from screen readers and skipped by the keyboard.
 */
export function PostThumbnail({ post, className }: { post: PostMeta; className?: string }) {
  if (!post.thumbnail) return null
  return (
    <Link
      to={`/blog/${post.slug}`}
      tabIndex={-1}
      aria-hidden="true"
      className={cn(
        "group/thumb block overflow-hidden rounded-md border border-ink/15 bg-deep shadow-[0_12px_28px_-22px_rgba(20,33,58,0.5)]",
        className,
      )}
    >
      <img
        src={post.thumbnail}
        alt=""
        loading="lazy"
        className="block aspect-[8/5] w-full object-cover transition-transform duration-500 ease-out group-hover/thumb:scale-[1.03] motion-reduce:transition-none"
      />
    </Link>
  )
}
