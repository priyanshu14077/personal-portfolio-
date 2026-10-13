import type * as React from "react"
import { Link } from "react-router"

/** Internal links stay client-side; everything else opens in a new tab. */
export function Anchor({ href = "", children, ...props }: React.ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link to={href} {...props}>
        {children}
      </Link>
    )
  }
  const external = /^https?:/.test(href)
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props}>
      {children}
    </a>
  )
}
