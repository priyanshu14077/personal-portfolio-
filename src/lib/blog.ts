import { lazy, type LazyExoticComponent } from "react"
import type { MDXContent } from "mdx/types"
import { posts as allPosts } from "virtual:blog-index"

import type { PostMeta } from "../../scripts/blog-content"

export type { PostMeta }

/** Published posts, newest first. Drafts stay visible in development only. */
export const posts: PostMeta[] = allPosts.filter((p) => !p.draft || import.meta.env.DEV)

export const BLOG_TITLE = "Field notes"
export const BLOG_INTRO =
  "Notes from building systems for real teams: system design, the engineering behind AI products, and what I learnt shipping them."

export function postBySlug(slug: string | undefined) {
  return posts.find((p) => p.slug === slug)
}

/** Every tag with its post count, most used first. */
export const tags: { tag: string; count: number }[] = Array.from(
  posts.flatMap((p) => p.tags).reduce((m, t) => m.set(t, (m.get(t) ?? 0) + 1), new Map<string, number>()),
  ([tag, count]) => ({ tag, count }),
).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))

/** Posts written from a project's case study, newest first. */
export function postsForProject(slug: string) {
  return posts.filter((p) => p.project === slug)
}

export function postsByTag(tag: string) {
  return posts.filter((p) => p.tags.includes(tag))
}

export type Series = { name: string; parts: PostMeta[] }

/** Multi-part series, each with its parts in order. */
export const series: Series[] = [...new Set(posts.flatMap((p) => (p.series ? [p.series] : [])))].map((name) => ({
  name,
  parts: posts.filter((p) => p.series === name).sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0)),
}))

export function seriesOf(post: PostMeta) {
  return post.series ? series.find((s) => s.name === post.series) : undefined
}

/** Older and newer post by date. */
export function neighbours(post: PostMeta) {
  const i = posts.indexOf(post)
  return { newer: posts[i - 1], older: posts[i + 1] }
}

/** Posts sharing the most tags with this one. */
export function relatedTo(post: PostMeta, limit = 3) {
  return posts
    .filter((p) => p !== post)
    .map((p) => ({ p, shared: p.tags.filter((t) => post.tags.includes(t)).length }))
    .filter((r) => r.shared > 0)
    .sort((a, b) => b.shared - a.shared || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((r) => r.p)
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

/** Humanises a tag slug: "system-design" → "System design". */
export function tagLabel(tag: string) {
  const words = tag.replace(/-/g, " ")
  return words === "ai" ? "AI" : words.charAt(0).toUpperCase() + words.slice(1)
}

// Post bodies are separate chunks, loaded only when their page opens.
const modules = import.meta.glob<{ default: MDXContent }>(["/content/blog/*.mdx", "!**/_*.mdx"])
const cache = new Map<string, LazyExoticComponent<MDXContent>>()

export function lazyPost(post: PostMeta) {
  const key = Object.keys(modules).find((k) => post.file.endsWith(k))
  if (!key) throw new Error(`No module for ${post.file}`)
  let component = cache.get(key)
  if (!component) {
    component = lazy(modules[key])
    cache.set(key, component)
  }
  return component
}
