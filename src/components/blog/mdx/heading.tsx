import type * as React from "react"
import { Link as LinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function withAnchor(Tag: "h2" | "h3" | "h4") {
  return function Heading({ id, className, children, ...props }: React.ComponentPropsWithoutRef<typeof Tag>) {
    // remark-gfm hides its "Footnotes" heading; here it reads as a normal small heading instead.
    const footnotes = id === "footnote-label"
    return (
      <Tag id={id} className={cn("group/heading", !footnotes && className)} {...props}>
        {children}
        {id && (
          <a
            href={`#${id}`}
            aria-label="Link to this section"
            className="ml-2 inline-block align-middle text-accent opacity-0 transition-opacity group-hover/heading:opacity-100 focus-visible:opacity-100"
          >
            <LinkIcon className="size-[0.6em]" aria-hidden="true" />
          </a>
        )}
      </Tag>
    )
  }
}

export const H2 = withAnchor("h2")
export const H3 = withAnchor("h3")
export const H4 = withAnchor("h4")
