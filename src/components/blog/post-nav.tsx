import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link } from "react-router"

import { PostMetaLine } from "@/components/blog/post-meta"
import { CardLabel, CardTitle, FieldCard } from "@/components/portfolio/field-card"
import { Reveal } from "@/components/portfolio/reveal"
import type { PostMeta } from "@/lib/blog"
import { cn } from "@/lib/utils"

function Neighbour({ post, direction }: { post?: PostMeta; direction: "older" | "newer" }) {
  const newer = direction === "newer"
  if (!post) return <div className="hidden sm:block" />
  return (
    <Link
      to={`/blog/${post.slug}`}
      rel={newer ? "next" : "prev"}
      className={cn("group flex flex-col gap-1 py-5", newer && "sm:items-end sm:text-right")}
    >
      <span className="inline-flex items-center gap-1 text-[13px] text-ink/55">
        {!newer && <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />}
        {newer ? "Newer" : "Older"}
        {newer && <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />}
      </span>
      <span className="font-display text-[21px] leading-tight text-ink group-hover:text-accent">{post.title}</span>
    </Link>
  )
}

export function PostNav({ older, newer }: { older?: PostMeta; newer?: PostMeta }) {
  if (!older && !newer) return null
  return (
    <nav aria-label="Older and newer posts" className="grid gap-x-10 border-y border-dashed border-ink/20 sm:grid-cols-2">
      <Neighbour post={older} direction="older" />
      <Neighbour post={newer} direction="newer" />
    </nav>
  )
}

export function RelatedPosts({ posts, title = "Related posts" }: { posts: PostMeta[]; title?: string }) {
  if (posts.length === 0) return null
  return (
    <section aria-labelledby="related-title">
      <h2 id="related-title" className="font-display text-[26px] leading-tight text-ink">
        {title}
      </h2>
      <ul className="mt-6 grid gap-6 md:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 80} className="h-full">
            <FieldCard>
              <CardLabel>{p.series ?? "Post"}</CardLabel>
              <CardTitle>
                <Link to={`/blog/${p.slug}`} className="hover:text-accent">
                  {p.title}
                </Link>
              </CardTitle>
              <p className="mt-3 text-[15px] leading-[1.5] text-ink/75">{p.summary}</p>
              <div className="mt-auto pt-5">
                <PostMetaLine post={p} className="border-t border-dashed border-ink/20 pt-4 text-[13px]" />
              </div>
            </FieldCard>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
