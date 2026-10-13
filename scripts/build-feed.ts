// Writes rss.xml and sitemap.xml into dist/ after `vite build`, from the same post metadata the site uses.
import { writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

import { loadCaseStudies, loadPosts } from "./blog-content.ts"

const SITE = process.env.SITE_URL ?? "https://priyanshukumarsingh.vercel.app"
const OUT = fileURLToPath(new URL("../dist", import.meta.url))

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const posts = loadPosts().filter((p) => !p.draft)
const tags = [...new Set(posts.flatMap((p) => p.tags))].sort()

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Priyanshu Kumar Singh · Blog</title>
    <link>${SITE}/blog</link>
    <description>Notes on system design, software engineering and AI from a forward deployed engineer.</description>
    <language>en</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${posts
  .map(
    (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`,
  )
  .join("\n")}
  </channel>
</rss>
`

const urls = [
  { loc: `${SITE}/`, lastmod: posts[0]?.date },
  { loc: `${SITE}/blog`, lastmod: posts[0]?.date },
  ...loadCaseStudies().map((c) => ({ loc: `${SITE}/work/${c.slug}`, lastmod: undefined })),
  ...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}`, lastmod: p.updated ?? p.date })),
  ...tags.map((t) => ({ loc: `${SITE}/blog/tags/${t}`, lastmod: posts.find((p) => p.tags.includes(t))?.date })),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}</url>`).join("\n")}
</urlset>
`

writeFileSync(path.join(OUT, "rss.xml"), rss)
writeFileSync(path.join(OUT, "sitemap.xml"), sitemap)
console.log(`feed: ${posts.length} posts → dist/rss.xml, dist/sitemap.xml`)
