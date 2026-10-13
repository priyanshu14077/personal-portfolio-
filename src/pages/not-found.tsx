import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

import { BlogPage } from "@/components/blog/blog-page"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { useDocumentMeta } from "@/lib/use-document-meta"

export default function NotFoundPage() {
  useDocumentMeta("Page not found")
  return (
    <BlogPage
      masthead={
        <SectionHeading
          tone="dark"
          eyebrow="404"
          title="That page isn't here"
          intro="The link may be old, or the post may have moved."
          className="mb-0"
        />
      }
    >
      <div className="flex flex-wrap gap-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-accent"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Back home
        </Link>
        <Link
          to="/blog"
          className="inline-flex items-center gap-1 self-center text-sm font-semibold text-ink underline-offset-4 hover:text-accent hover:underline"
        >
          All posts
        </Link>
      </div>
    </BlogPage>
  )
}
