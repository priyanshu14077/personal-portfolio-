import { lazy, type LazyExoticComponent } from "react"
import type { MDXContent } from "mdx/types"
import { caseStudies } from "virtual:case-studies"

import type { CaseStudyMeta } from "../../scripts/blog-content"

export type { CaseStudyMeta }
export { caseStudies }

export function caseStudyBySlug(slug: string | undefined) {
  return caseStudies.find((c) => c.slug === slug)
}

// Bodies are separate chunks, loaded only when their page opens.
const modules = import.meta.glob<{ default: MDXContent }>(["/content/case-studies/*.mdx", "!**/_*.mdx"])
const cache = new Map<string, LazyExoticComponent<MDXContent>>()

export function lazyCaseStudy(study: CaseStudyMeta) {
  const key = Object.keys(modules).find((k) => study.file.endsWith(k))
  if (!key) throw new Error(`No module for ${study.file}`)
  let component = cache.get(key)
  if (!component) {
    component = lazy(modules[key])
    cache.set(key, component)
  }
  return component
}
