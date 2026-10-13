import type * as React from "react"

/** Further reading at the end of a post: a markdown list of links as children. */
export function References({ title = "Further reading", children }: { title?: string; children: React.ReactNode }) {
  return (
    <section data-no-toc aria-label={title} className="references mt-12 border-t border-dashed border-ink/20 pt-6">
      <p className="text-[14px] font-medium text-accent">{title}</p>
      <div className="references-body mt-3 text-[15px] leading-[1.6] text-ink/80">{children}</div>
    </section>
  )
}
