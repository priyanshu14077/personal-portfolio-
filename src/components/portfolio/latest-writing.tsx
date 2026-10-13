import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { PostMetaLine } from "@/components/blog/post-meta"
import { CardLabel, CardTitle, FieldCard } from "@/components/portfolio/field-card"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { BLOG_INTRO, posts } from "@/lib/blog"

/** The three newest posts, on the home page before the footer. */
export function LatestWriting() {
  const latest = posts.slice(0, 3)
  if (latest.length === 0) return null
  return (
    <section id="writing" aria-labelledby="writing-title" className="relative bg-night px-5 pt-32 pb-44 sm:px-10">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          tone="dark"
          eyebrow="Writing"
          title={<span id="writing-title">Notes from the field</span>}
          intro={BLOG_INTRO}
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80} className="h-full">
              <FieldCard tone="dark">
                <CardLabel tone="dark">{p.series ?? "Post"}</CardLabel>
                <CardTitle tone="dark">
                  <Link to={`/blog/${p.slug}`} className="hover:text-accent">
                    {p.title}
                  </Link>
                </CardTitle>
                <p className="mt-3 text-[15px] leading-[1.5] text-paper/75">{p.summary}</p>
                <div className="mt-auto pt-5">
                  <PostMetaLine post={p} tone="dark" className="border-t border-dashed border-paper/20 pt-4 text-[13px]" />
                </div>
              </FieldCard>
            </Reveal>
          ))}
        </ul>
        <Link
          to="/blog"
          className="mt-10 inline-flex items-center gap-1 text-[15px] font-semibold text-paper underline-offset-4 hover:text-accent hover:underline"
        >
          All posts <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
