import * as React from "react"
import { MDXProvider } from "@mdx-js/react"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Link, useParams } from "react-router"

import { BlogPage } from "@/components/blog/blog-page"
import { mdxComponents } from "@/components/blog/mdx"
import { KeyPoints } from "@/components/blog/mdx/key-points"
import { RelatedPosts } from "@/components/blog/post-nav"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { postsForProject } from "@/lib/blog"
import { caseStudyBySlug, lazyCaseStudy, type CaseStudyMeta } from "@/lib/case-studies"
import { useDocumentMeta } from "@/lib/use-document-meta"
import NotFoundPage from "@/pages/not-found"

function CaseStudy({ study }: { study: CaseStudyMeta }) {
  useDocumentMeta(`${study.title} case study`, study.summary)
  const articleRef = React.useRef<HTMLElement>(null)
  const Body = lazyCaseStudy(study)
  const writing = postsForProject(study.slug)

  return (
    <BlogPage
      masthead={
        <div>
          <Link
            to="/#deployments"
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-paper/75 underline-offset-4 hover:text-paper hover:underline"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" /> All work
          </Link>
          <div className="mt-8 max-w-[44rem]">
            <p className="text-[15px] font-medium text-tape">Case study · {study.category}</p>
            <h1 className="mt-3 font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.15] font-normal text-paper">
              {study.title}
            </h1>
            {study.subtitle && <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.65] text-paper/75">{study.subtitle}</p>}
            <p className="mt-6 text-[14px] text-paper/60">
              {study.role} · {study.period} · {study.readingMinutes} min read
            </p>
          </div>
          {study.facts.length > 0 && (
            <dl className="mt-10 grid max-w-[44rem] grid-cols-3 gap-2">
              {study.facts.map((f) => (
                <div key={f.label} className="rounded-sm border border-paper/15 bg-deep/75 px-3 py-3 text-paper backdrop-blur-sm">
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display text-[clamp(1.4rem,2.4vw,1.75rem)] leading-tight">{f.value}</dd>
                  <dd className="mt-1 text-[12px] leading-snug text-paper/70">{f.label}</dd>
                </div>
              ))}
            </dl>
          )}
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ul className="flex flex-wrap gap-1.5">
              {study.stack.map((t) => (
                <li key={t} className="rounded-full border border-paper/20 px-2.5 py-0.5 text-[13px] text-paper/85">
                  {t}
                </li>
              ))}
            </ul>
            {study.link && (
              <a
                href={study.link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[14px] font-semibold text-paper underline-offset-4 hover:text-accent hover:underline"
              >
                {study.link.label} <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      }
    >
      <ReadingProgress />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          {study.tldr && study.tldr.length > 0 && <KeyPoints variant="tldr" items={study.tldr} className="mt-0 max-w-[68ch]" />}
          <article ref={articleRef} className="prose">
            <React.Suspense fallback={<p className="text-[16px] text-ink/50">Loading the case study…</p>}>
              <MDXProvider components={mdxComponents}>
                <Body />
              </MDXProvider>
            </React.Suspense>
          </article>
        </div>
        <aside className="order-first min-w-0 lg:order-none">
          <TableOfContents articleRef={articleRef} />
        </aside>
      </div>
      {writing.length > 0 && (
        <div className="mt-20">
          <RelatedPosts posts={writing} title="Writing from this project" />
        </div>
      )}
    </BlogPage>
  )
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const study = caseStudyBySlug(slug)
  if (!study) return <NotFoundPage />
  return <CaseStudy key={study.slug} study={study} />
}
