import { useParams } from "react-router"

import { BlogPage } from "@/components/blog/blog-page"
import { PostList } from "@/components/blog/post-list"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { postsByTag, tagLabel } from "@/lib/blog"
import { useDocumentMeta } from "@/lib/use-document-meta"
import { TagFilterRow } from "@/pages/blog-index"

export default function BlogTagPage() {
  const { tag = "" } = useParams()
  const list = postsByTag(tag)
  const label = tagLabel(tag)
  useDocumentMeta(`${label} posts`, `Posts tagged ${label}.`)
  return (
    <BlogPage
      masthead={
        <SectionHeading
          tone="dark"
          eyebrow="Blog · tag"
          title={label}
          className="mb-0"
        />
      }
    >
      <div className="mb-8">
        <TagFilterRow active={tag} />
      </div>
      <PostList posts={list} emptyText={`Nothing is tagged ${label} yet.`} />
    </BlogPage>
  )
}
