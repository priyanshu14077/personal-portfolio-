import type * as React from "react"

import { BlogNav } from "@/components/blog/blog-nav"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { TornEdge } from "@/components/portfolio/torn-edge"
import { PostcardScene } from "@/components/ui/torn-postcard-portfolio"

/**
 * Every blog page opens like the site does: a night-sky masthead, a torn seam, then paper.
 * `masthead` is the dark part (intro or post title); children sit on the paper.
 */
export function BlogPage({ masthead, children }: { masthead: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-clip">
      <header className="relative overflow-hidden bg-night">
        <PostcardScene kind="night" />
        <div className="relative">
          <BlogNav />
          <div className="mx-auto max-w-6xl px-5 pt-16 pb-24 sm:px-10 md:pt-20 md:pb-28">{masthead}</div>
        </div>
      </header>
      <main className="paper-grain relative px-5 pt-16 pb-12 sm:px-10">
        <TornEdge position="top" color="#f2ede2" seed={17} />
        <div className="relative mx-auto max-w-6xl">{children}</div>
      </main>
      <SiteFooter />
    </div>
  )
}
