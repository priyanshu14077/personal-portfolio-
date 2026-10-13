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
import { CONTENT_DIR, loadPosts } from "./scripts/blog-content"

const BLOG_INDEX = "virtual:blog-index"
const RESOLVED_BLOG_INDEX = "\0" + BLOG_INDEX

/**
 * `virtual:blog-index` exports every post's frontmatter and reading time,
 * read from content/blog at build time, so the index page never loads post bodies.
 */
function blogIndex(): Plugin {
  return {
    name: "blog-index",
    resolveId: (id) => (id === BLOG_INDEX ? RESOLVED_BLOG_INDEX : undefined),
    load: (id) => (id === RESOLVED_BLOG_INDEX ? `export const posts = ${JSON.stringify(loadPosts())}` : undefined),
    configureServer(server) {
      server.watcher.add(CONTENT_DIR)
      const refresh = (file: string) => {
        if (!file.endsWith(".mdx")) return
        const mod = server.moduleGraph.getModuleById(RESOLVED_BLOG_INDEX)
        if (mod) server.moduleGraph.invalidateModule(mod)
        // The post loader's import.meta.glob must see new or removed files too.
        for (const m of server.moduleGraph.getModulesByFile(path.resolve(__dirname, "src/lib/blog.ts")) ?? []) {
          server.moduleGraph.invalidateModule(m)
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
