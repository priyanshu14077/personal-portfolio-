import * as React from "react"
import { MDXProvider } from "@mdx-js/react"
import { ArrowLeft } from "lucide-react"
import { Link, useParams } from "react-router"

import { BlogPage } from "@/components/blog/blog-page"
import { mdxComponents } from "@/components/blog/mdx"
import { KeyPoints } from "@/components/blog/mdx/key-points"
import { PostMetaLine } from "@/components/blog/post-meta"
import { PostNav, RelatedPosts } from "@/components/blog/post-nav"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { SeriesBanner } from "@/components/blog/series-banner"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { TagList } from "@/components/blog/tag-pill"
import { lazyPost, neighbours, postBySlug, relatedTo, seriesOf, type PostMeta } from "@/lib/blog"
import { caseStudyBySlug } from "@/lib/case-studies"
import { useDocumentMeta } from "@/lib/use-document-meta"
import NotFoundPage from "@/pages/not-found"

function Post({ post }: { post: PostMeta }) {
  useDocumentMeta(post.title, post.summary)
  const articleRef = React.useRef<HTMLElement>(null)
  const Body = lazyPost(post)
  const series = seriesOf(post)
  const multiPart = series && series.parts.length > 1
  const project = caseStudyBySlug(post.project)
  const { older, newer } = neighbours(post)
  const related = relatedTo(post)

  return (
    <BlogPage
      masthead={
        <div className="max-w-[44rem]">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-[14px] font-semibold text-paper/75 underline-offset-4 hover:text-paper hover:underline"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" /> All posts
          </Link>
          {series && (
            <p className="mt-8 text-[15px] font-medium text-tape">
              {series.name}
              {multiPart ? ` · Part ${series.parts.indexOf(post) + 1}` : ""}
            </p>
          )}
          <h1 className={`${series ? "mt-3" : "mt-8"} font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.15] font-normal text-paper`}>
            {post.title}
          </h1>
          {post.subtitle && <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.65] text-paper/75">{post.subtitle}</p>}
          <PostMetaLine post={post} tone="dark" className="mt-6" />
          <TagList tags={post.tags} tone="dark" className="mt-4" />
        </div>
      }
    >
      <ReadingProgress />
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="min-w-0">
          {multiPart && (
            <div className="max-w-[68ch]">
              <SeriesBanner series={series} current={post} />
            </div>
          )}
          {post.coverImage && (
            <img src={post.coverImage} alt="" className="mt-8 block w-full max-w-[68ch] rounded-md border border-ink/15 bg-paper-dim" />
          )}
          {project && (
            <p className="mb-8 max-w-[68ch] rounded-md border border-ink/15 bg-paper-dim/60 px-5 py-4 text-[15px] leading-[1.55] text-ink/80">
              From my work on {project.title}.{" "}
              <Link to={`/work/${project.slug}`} className="font-semibold text-accent underline-offset-4 hover:underline">
                Read the full case study
              </Link>
            </p>
          )}
          {post.tldr && post.tldr.length > 0 && <KeyPoints variant="tldr" items={post.tldr} className="max-w-[68ch]" />}
          <article ref={articleRef} className="prose">
            <React.Suspense fallback={<p className="text-[16px] text-ink/50">Loading the post…</p>}>
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
      <div className="mt-20 space-y-16">
        <PostNav older={older} newer={newer} />
        <RelatedPosts posts={related} />
      </div>
    </BlogPage>
  )
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const post = postBySlug(slug)
  if (!post) return <NotFoundPage />
  return <Post key={post.slug} post={post} />
}
