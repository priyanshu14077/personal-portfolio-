import { Link, NavLink } from "react-router"

import { resume } from "@/data/resume"
import { cn } from "@/lib/utils"

const links = [
  { to: "/", label: "Home" },
  { to: "/blog", label: "Blog" },
  { to: "/now", label: "Now" },
  { to: "/uses", label: "Uses" },
]

/** The scroll chapters' nav bar, for pages outside the postcard: brand on the left, uppercase links on the right. */
export function BlogNav() {
  return (
    <nav aria-label="Site" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 text-paper sm:px-10">
      <Link to="/" className="text-[12px] font-bold tracking-[0.22em] whitespace-nowrap uppercase">
        {resume.name}
      </Link>
      <div className="flex gap-6">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) =>
              cn(
                "relative text-[11px] tracking-[0.2em] uppercase transition-opacity after:absolute after:inset-x-0 after:-bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-500",
                isActive ? "opacity-100 after:scale-x-100" : "opacity-70 hover:opacity-100",
              )
            }
          >
            {l.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
