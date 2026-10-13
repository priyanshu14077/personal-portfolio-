// Reads content/blog/*.mdx and turns each file's frontmatter into typed metadata.
// Shared by the Vite plugin (virtual:blog-index) and the feed script, so both see the same posts.
import { readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parse } from "yaml"

export type PostMeta = {
  title: string
  /** One-line hook under the title. */
  subtitle?: string
  slug: string
  /** ISO date, e.g. 2026-10-13. */
  date: string
  updated?: string
  tags: string[]
  series?: string
  seriesOrder?: number
  /** Used for cards, the meta description and the feed. */
  summary: string
  coverImage?: string
  /** Two to four key points shown at the top of the post. */
  tldr?: string[]
  /** Slug of a case study this post comes from, e.g. "proploy". */
  project?: string
  draft: boolean
  readingMinutes: number
  words: number
  /** Absolute path of the source file, as import.meta.glob keys it. */
  file: string
}

export const CONTENT_DIR = fileURLToPath(new URL("../content/blog", import.meta.url))
export const CASE_STUDY_DIR = fileURLToPath(new URL("../content/case-studies", import.meta.url))

export type CaseStudyMeta = {
  title: string
  subtitle?: string
  slug: string
  summary: string
  /** Short label above the title, e.g. "AI procurement". */
  category: string
  role: string
  period: string
  facts: { value: string; label: string }[]
  stack: string[]
  link?: { label: string; href: string }
  tldr?: string[]
  readingMinutes: number
  words: number
  file: string
}

const WORDS_PER_MINUTE = 220

function splitFrontmatter(source: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(source)
  if (!match) throw new Error("Post is missing a frontmatter block")
  return { frontmatter: parse(match[1]) as Record<string, unknown>, body: match[2] }
}

function readingTime(body: string) {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
  return { words, readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) }
}

function toIso(value: unknown) {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

function readPost(file: string): PostMeta {
  const { frontmatter: fm, body } = splitFrontmatter(readFileSync(file, "utf8"))
  const name = path.basename(file, ".mdx")
  for (const key of ["title", "date", "summary"]) {
    if (!fm[key]) throw new Error(`${name}.mdx: frontmatter is missing "${key}"`)
  }
  return {
    title: String(fm.title),
    subtitle: fm.subtitle ? String(fm.subtitle) : undefined,
    slug: fm.slug ? String(fm.slug) : name,
    date: toIso(fm.date),
    updated: fm.updated ? toIso(fm.updated) : undefined,
    tags: Array.isArray(fm.tags) ? fm.tags.map(String) : [],
    series: fm.series ? String(fm.series) : undefined,
    seriesOrder: typeof fm.seriesOrder === "number" ? fm.seriesOrder : undefined,
    summary: String(fm.summary),
    coverImage: fm.coverImage ? String(fm.coverImage) : undefined,
    tldr: Array.isArray(fm.tldr) ? fm.tldr.map(String) : undefined,
    project: fm.project ? String(fm.project) : undefined,
    draft: fm.draft === true,
    ...readingTime(body),
    file,
  }
}

/** Every post, newest first. Files starting with "_" (the template) are skipped. */
export function loadPosts(): PostMeta[] {
  const posts = readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => readPost(path.join(CONTENT_DIR, f)))
  const slugs = new Set<string>()
  for (const p of posts) {
    if (slugs.has(p.slug)) throw new Error(`Two posts share the slug "${p.slug}"`)
    slugs.add(p.slug)
  }
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

/** Project case studies in content/case-studies, in file order. */
export function loadCaseStudies(): CaseStudyMeta[] {
  return readdirSync(CASE_STUDY_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .sort()
    .map((f) => {
      const file = path.join(CASE_STUDY_DIR, f)
      const { frontmatter: fm, body } = splitFrontmatter(readFileSync(file, "utf8"))
      const name = path.basename(f, ".mdx")
      for (const key of ["title", "summary", "category", "role", "period"]) {
        if (!fm[key]) throw new Error(`${name}.mdx: frontmatter is missing "${key}"`)
      }
      const link = fm.link as { label?: unknown; href?: unknown } | undefined
      return {
        title: String(fm.title),
        subtitle: fm.subtitle ? String(fm.subtitle) : undefined,
        slug: fm.slug ? String(fm.slug) : name,
        summary: String(fm.summary),
        category: String(fm.category),
        role: String(fm.role),
        period: String(fm.period),
        facts: Array.isArray(fm.facts)
          ? fm.facts.map((x: { value: unknown; label: unknown }) => ({ value: String(x.value), label: String(x.label) }))
          : [],
        stack: Array.isArray(fm.stack) ? fm.stack.map(String) : [],
        link: link?.href ? { label: String(link.label ?? "Visit the site"), href: String(link.href) } : undefined,
        tldr: Array.isArray(fm.tldr) ? fm.tldr.map(String) : undefined,
        ...readingTime(body),
        file,
      }
    })
}
