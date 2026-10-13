import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

type Heading = { id: string; text: string; level: 2 | 3 }

/** Reads h2/h3 from the rendered article and re-reads when the lazy post body arrives. */
function useHeadings(articleRef: React.RefObject<HTMLElement | null>) {
  const [headings, setHeadings] = React.useState<Heading[]>([])
  React.useEffect(() => {
    const article = articleRef.current
    if (!article) return
    let scrolledToHash = false
    const scan = () => {
      const found = Array.from(article.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"))
        .filter((h) => !h.closest("[data-no-toc]"))
        .map((h): Heading => ({ id: h.id, text: h.textContent?.trim() ?? "", level: h.tagName === "H2" ? 2 : 3 }))
      setHeadings((prev) =>
        prev.length === found.length && prev.every((h, i) => h.id === found[i].id && h.text === found[i].text) ? prev : found,
      )
      // Deep links arrive before the body does; honour them once it has rendered.
      if (!scrolledToHash && found.length > 0 && window.location.hash) {
        scrolledToHash = true
        document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
      }
    }
    scan()
    const mo = new MutationObserver(scan)
    mo.observe(article, { childList: true, subtree: true })
    return () => mo.disconnect()
  }, [articleRef])
  return headings
}

function useActiveHeading(headings: Heading[]) {
  const [active, setActive] = React.useState<string>()
  React.useEffect(() => {
    if (headings.length === 0) return
    const els = headings.map((h) => document.getElementById(h.id)).filter((el): el is HTMLElement => el !== null)
    const visible = new Map<string, number>()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top)
          else visible.delete(e.target.id)
        }
        if (visible.size > 0) {
          setActive([...visible.entries()].sort((a, b) => a[1] - b[1])[0][0])
          return
        }
        // Nothing in the window: the active section is the last heading above it.
        const above = els.filter((el) => el.getBoundingClientRect().top < 0)
        if (above.length) setActive(above[above.length - 1].id)
      },
      { rootMargin: "-10% 0px -70% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [headings])
  return active
}

function List({ headings, active, onPick }: { headings: Heading[]; active?: string; onPick?: () => void }) {
  return (
    <ol className="space-y-2 border-l border-ink/15">
      {headings.map((h) => {
        const isActive = h.id === active
        return (
          <li key={h.id} className={h.level === 3 ? "pl-7" : "pl-4"}>
            <a
              href={`#${h.id}`}
              onClick={onPick}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-0.5 pl-3 text-[14px] leading-snug transition-colors",
                isActive ? "border-accent font-medium text-ink" : "border-transparent text-ink/60 hover:text-ink",
              )}
            >
              {h.text}
            </a>
          </li>
        )
      })}
    </ol>
  )
}

/** Sticky on desktop, a collapsible block above the article on small screens. */
export function TableOfContents({ articleRef }: { articleRef: React.RefObject<HTMLElement | null> }) {
  const headings = useHeadings(articleRef)
  const active = useActiveHeading(headings)
  const [open, setOpen] = React.useState(false)
  if (headings.length < 2) return null
  return (
    <>
      <details
        open={open}
        onToggle={(e) => setOpen(e.currentTarget.open)}
        className="group rounded-md border border-ink/15 bg-paper-dim/60 p-5 lg:hidden"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between text-[14px] font-medium text-accent [&::-webkit-details-marker]:hidden">
          On this page
          <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label="Table of contents" className="mt-4">
          <List headings={headings} active={active} onPick={() => setOpen(false)} />
        </nav>
      </details>
      <nav aria-label="Table of contents" className="hidden lg:sticky lg:top-10 lg:block">
        <p className="mb-4 text-[14px] font-medium text-accent">On this page</p>
        <List headings={headings} active={active} />
      </nav>
    </>
  )
}
