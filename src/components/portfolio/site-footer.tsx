import { ArrowUpRight, CalendarDays, Mail } from "lucide-react"
import { Link } from "react-router"

import { TornEdge } from "@/components/portfolio/torn-edge"
import { BOOKING_URL, resume } from "@/data/resume"

export function SiteFooter() {
  return (
    <footer className="paper-grain relative px-5 pt-28 pb-12 sm:px-10">
      <TornEdge position="top" color="#f2ede2" seed={23} />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="font-hand text-2xl text-accent">Have a problem that needs to be in production?</p>
          <h2 className="mt-2 font-display text-5xl leading-[1.1] font-normal text-ink sm:text-6xl">
            Put me in the room with it.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[17px] leading-[1.65] text-ink/75">
            Open to forward deployed, solutions and AI platform engineering roles. Based in {resume.location}, happy to
            work with teams anywhere.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-sm bg-ink px-5 py-3 text-sm font-semibold tracking-wide text-paper transition-colors hover:bg-accent"
          >
            <CalendarDays className="size-4" aria-hidden="true" /> Book a call
          </a>
          <a
            href={`mailto:${resume.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-semibold tracking-wide text-ink shadow-[inset_0_0_0_1px_rgba(38,54,79,0.3)] transition-colors hover:text-accent hover:shadow-[inset_0_0_0_1px_#b4673d]"
          >
            <Mail className="size-4" aria-hidden="true" /> {resume.email}
          </a>
          <div className="flex gap-4">
            {[
              { to: "/blog", label: "Blog" },
              { to: "/now", label: "Now" },
              { to: "/uses", label: "Uses" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm font-semibold text-ink underline-offset-4 hover:text-accent hover:underline">
                {l.label}
              </Link>
            ))}
            {resume.links.filter((l) => l.url !== BOOKING_URL).map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm font-semibold text-ink underline-offset-4 hover:text-accent hover:underline"
              >
                {l.label} <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <p className="mx-auto mt-20 max-w-6xl border-t border-dashed border-ink/20 pt-6 text-[13px] text-ink/55">
        © {new Date().getFullYear()} {resume.name}, forward deployed engineer
      </p>
    </footer>
  )
}
