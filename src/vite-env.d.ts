/// <reference types="vite/client" />

declare module "*.mdx" {
  import type { MDXContent } from "mdx/types"
  const Content: MDXContent
  export default Content
}

declare module "virtual:case-studies" {
  import type { CaseStudyMeta } from "../scripts/blog-content"
  export const caseStudies: CaseStudyMeta[]
}

declare module "virtual:blog-index" {
  import type { PostMeta } from "../scripts/blog-content"
  export const posts: PostMeta[]
}
