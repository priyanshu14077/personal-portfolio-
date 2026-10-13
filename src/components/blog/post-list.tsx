import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { PostMetaLine } from "@/components/blog/post-meta"
import { TagList } from "@/components/blog/tag-pill"
import { CardLabel, FieldCard } from "@/components/portfolio/field-card"
import { Reveal } from "@/components/portfolio/reveal"
import type { PostMeta } from "@/lib/blog"

/** The newest post, in the featured case-study card. */
export function FeaturedPost({ post }: { post: PostMeta }) {
  return (
    <Reveal as="article">
      <FieldCard>
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-accent/12 px-3 py-1 text-[13px] font-medium text-accent">
              <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> Latest post
            </p>
            {post.series && <CardLabel>{post.series}</CardLabel>}
            <h2 className="mt-2 font-display text-[clamp(1.9rem,3vw,2.5rem)] leading-[1.15] text-ink">
              <Link to={`/blog/${post.slug}`} className="hover:text-accent">
                {post.title}
              </Link>
            </h2>
            {post.subtitle && <p className="mt-2 text-[17px] leading-[1.5] text-ink/70">{post.subtitle}</p>}
            <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.6] text-ink">{post.summary}</p>
          </div>
          <div className="flex flex-col gap-4 lg:items-end">
            <PostMetaLine post={post} />
            <TagList tags={post.tags} className="lg:justify-end" />
            <Link
              to={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-accent underline-offset-4 hover:underline"
            >
              Read the post <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </FieldCard>
    </Reveal>
  )
}

function PostRow({ post, index }: { post: PostMeta; index: number }) {
  return (
    <Reveal as="li" delay={(index % 4) * 60}>
      <article className="grid gap-x-10 gap-y-3 border-t border-dashed border-ink/20 py-7 md:grid-cols-[10rem_1fr]">
        <PostMetaLine post={post} className="flex-col items-start gap-y-1.5 md:pt-1.5" />
        <div>
          {post.series && (
            <p className="text-[14px] font-medium text-accent">
              {post.series}
              {post.seriesOrder ? ` · Part ${post.seriesOrder}` : ""}
            </p>
          )}
          <h3 className="mt-1 font-display text-[28px] leading-[1.15] text-ink">
            <Link to={`/blog/${post.slug}`} className="hover:text-accent">
              {post.title}
            </Link>
          </h3>
          <p className="mt-3 max-w-[65ch] text-[16px] leading-[1.6] text-ink/85">{post.summary}</p>
          <TagList tags={post.tags} className="mt-4" />
        </div>
      </article>
    </Reveal>
  )
}

/** Posts as a reading list rather than a grid, newest first. */
export function PostList({ posts, emptyText = "Nothing here yet." }: { posts: PostMeta[]; emptyText?: string }) {
  if (posts.length === 0) return <p className="border-t border-dashed border-ink/20 py-7 text-[16px] text-ink/60">{emptyText}</p>
  return (
    <ul className="border-b border-dashed border-ink/20">
      {posts.map((p, i) => (
        <PostRow key={p.slug} post={p} index={i} />
      ))}
    </ul>
  )
}
