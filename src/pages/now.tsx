import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router"

import { BlogPage } from "@/components/blog/blog-page"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { now, NOW_UPDATED } from "@/data/personal"
import { formatDate } from "@/lib/blog"
import { useDocumentMeta } from "@/lib/use-document-meta"

export default function NowPage() {
  useDocumentMeta("Now", "What I'm building, learning, writing and listening to this month.")
  return (
    <BlogPage
      masthead={
        <SectionHeading
          tone="dark"
          eyebrow="Now"
          title="What I'm up to this month"
          intro="A snapshot, not a résumé. If it's been a while since the date below, things have probably moved on."
          note={`updated ${formatDate(NOW_UPDATED)}`}
          className="mb-0"
        />
      }
    >
      <ul className="max-w-4xl border-b border-dashed border-ink/20">
        {now.map((item, i) => (
          <Reveal as="li" key={item.label} delay={i * 60}>
            <div className="grid gap-x-10 gap-y-2 border-t border-dashed border-ink/20 py-7 md:grid-cols-[10rem_1fr]">
              <p className="text-[14px] font-medium text-accent md:pt-1.5">{item.label}</p>
              <div>
                <p className="max-w-[60ch] font-display text-[clamp(1.35rem,2.2vw,1.65rem)] leading-[1.35] text-ink">{item.text}</p>
                {item.link && (
                  <Link
                    to={item.link.href}
                    className="mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-accent underline-offset-4 hover:underline"
                  >
                    {item.link.label} <ArrowUpRight className="size-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </ul>
      <p className="mt-8 text-[14px] text-ink/60">
        Inspired by the{" "}
        <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">
          /now page movement
        </a>
        .
      </p>
    </BlogPage>
  )
}
