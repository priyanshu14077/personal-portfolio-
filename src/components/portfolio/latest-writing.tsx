import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { PostMetaLine } from "@/components/blog/post-meta"
import { PostThumbnail } from "@/components/blog/post-thumbnail"
import { CardLabel, CardTitle, FieldCard } from "@/components/portfolio/field-card"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { posts } from "@/lib/blog"

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
        />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={i * 80} className="h-full">
              <FieldCard tone="dark">
                <PostThumbnail post={p} className="mb-5 border-paper/15" />
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
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          {[
            { to: "/blog", label: "All posts" },
            { to: "/now", label: "What I'm up to now" },
            { to: "/now#radio", label: "Tune in to my radio" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="inline-flex items-center gap-1 text-[15px] font-semibold text-paper underline-offset-4 hover:text-accent hover:underline"
            >
              {l.label} <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
