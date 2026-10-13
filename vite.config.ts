import path from "node:path"
import mdx from "@mdx-js/rollup"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkFrontmatter from "remark-frontmatter"
import remarkGfm from "remark-gfm"
import { defineConfig, type Plugin } from "vite"

import { codeTheme } from "./code-theme"
import { CASE_STUDY_DIR, CONTENT_DIR, loadCaseStudies, loadPosts } from "./scripts/blog-content"

const BLOG_INDEX = "virtual:blog-index"
const RESOLVED_BLOG_INDEX = "\0" + BLOG_INDEX
const CASE_STUDIES = "virtual:case-studies"
const RESOLVED_CASE_STUDIES = "\0" + CASE_STUDIES

/**
 * `virtual:blog-index` exports every post's frontmatter and reading time,
 * read from content/blog at build time, so the index page never loads post bodies.
 */
function blogIndex(): Plugin {
  return {
    name: "blog-index",
    resolveId: (id) => (id === BLOG_INDEX ? RESOLVED_BLOG_INDEX : id === CASE_STUDIES ? RESOLVED_CASE_STUDIES : undefined),
    load: (id) => {
      if (id === RESOLVED_BLOG_INDEX) return `export const posts = ${JSON.stringify(loadPosts())}`
      if (id === RESOLVED_CASE_STUDIES) return `export const caseStudies = ${JSON.stringify(loadCaseStudies())}`
    },
    configureServer(server) {
      server.watcher.add([CONTENT_DIR, CASE_STUDY_DIR])
      const refresh = (file: string) => {
        if (!file.endsWith(".mdx")) return
        for (const id of [RESOLVED_BLOG_INDEX, RESOLVED_CASE_STUDIES]) {
          const mod = server.moduleGraph.getModuleById(id)
          if (mod) server.moduleGraph.invalidateModule(mod)
        }
        // The loaders' import.meta.glob must see new or removed files too.
        for (const file of ["src/lib/blog.ts", "src/lib/case-studies.ts"]) {
          for (const m of server.moduleGraph.getModulesByFile(path.resolve(__dirname, file)) ?? []) {
            server.moduleGraph.invalidateModule(m)
          }
        }
        server.ws.send({ type: "full-reload" })
      }
      server.watcher.on("add", refresh).on("change", refresh).on("unlink", refresh)
    },
  }
}

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkFrontmatter, remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypePrettyCode, { theme: codeTheme as never, keepBackground: false, defaultLang: "text" }]],
      }),
    },
    react({ include: /\.(mdx|js|jsx|ts|tsx)$/ }),
    tailwindcss(),
    blogIndex(),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
})
