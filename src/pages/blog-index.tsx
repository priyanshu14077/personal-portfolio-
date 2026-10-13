import { ArrowUpRight, Rss } from "lucide-react"
import { Link } from "react-router"

import { BlogPage } from "@/components/blog/blog-page"
import { FeaturedPost, PostList } from "@/components/blog/post-list"
import { TagPill } from "@/components/blog/tag-pill"
import { CardLabel, CardTitle, FieldCard } from "@/components/portfolio/field-card"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { BLOG_INTRO, BLOG_TITLE, posts, series, tags } from "@/lib/blog"
import { useDocumentMeta } from "@/lib/use-document-meta"

/** "All" plus every tag with its count. Filters are URLs, so they can be shared. */
export function TagFilterRow({ active }: { active?: string }) {
  if (tags.length === 0) return null
  return (
    <nav aria-label="Filter by tag" className="flex flex-wrap items-center gap-1.5">
      <Link
        to="/blog"
        aria-current={active ? undefined : "page"}
        className={
          active
            ? "rounded-full border border-ink/20 px-2.5 py-0.5 text-[13px] text-ink/70 transition-colors hover:border-accent/40 hover:text-ink"
            : "rounded-full border border-accent bg-accent/12 px-2.5 py-0.5 text-[13px] text-ink"
        }
      >
        All
      </Link>
      {tags.map((t) => (
        <TagPill key={t.tag} tag={t.tag} count={t.count} active={t.tag === active} />
      ))}
    </nav>
  )
}

function SeriesSection() {
  const multi = series.filter((s) => s.parts.length > 1)
  if (multi.length === 0) return null
  return (
    <section aria-labelledby="series-title" className="mt-20">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink/15 pb-4">
        <h2 id="series-title" className="font-display text-[26px] leading-tight text-ink">
          Series
        </h2>
      </div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {multi.map((s, i) => (
          <Reveal as="li" key={s.name} delay={i * 80} className="h-full">
            <FieldCard>
              <CardLabel>{s.parts.length} parts</CardLabel>
              <CardTitle>{s.name}</CardTitle>
              <ol className="mt-4 space-y-1.5">
                {s.parts.map((p, n) => (
                  <li key={p.slug} className="flex gap-2.5 text-[15px] leading-[1.5]">
                    <span className="w-5 shrink-0 text-ink/50 tabular-nums">{n + 1}.</span>
                    <Link to={`/blog/${p.slug}`} className="text-ink/80 underline-offset-4 hover:text-accent hover:underline">
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ol>
            </FieldCard>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default function BlogIndexPage() {
  useDocumentMeta("Blog", BLOG_INTRO)
  const [latest, ...rest] = posts
  return (
    <BlogPage
      masthead={
        <SectionHeading
          tone="dark"
          eyebrow="Blog"
          title={BLOG_TITLE}
          intro={BLOG_INTRO}
          className="mb-0"
        />
      }
    >
      {latest ? (
        <>
          <FeaturedPost post={latest} />
          <div className="mt-16 mb-8 flex flex-wrap items-center justify-between gap-4">
            <TagFilterRow />
            <a
              href="/rss.xml"
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-ink underline-offset-4 hover:text-accent hover:underline"
            >
              <Rss className="size-3.5" aria-hidden="true" /> RSS <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </a>
          </div>
          {rest.length > 0 && <PostList posts={rest} />}
          <SeriesSection />
        </>
      ) : (
        <p className="text-[17px] text-ink/70">The first post is on its way.</p>
      )}
    </BlogPage>
  )
}
