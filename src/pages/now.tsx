import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { Link, useLocation } from "react-router"

import { BlogPage } from "@/components/blog/blog-page"
import { Radio } from "@/components/now/radio"
import { Sports } from "@/components/now/sports"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { now, NOW_UPDATED, type NowItem } from "@/data/personal"
import { formatDate } from "@/lib/blog"
import { useDocumentMeta } from "@/lib/use-document-meta"

const linkClass = "mt-3 inline-flex items-center gap-1 text-[14px] font-semibold text-accent underline-offset-4 hover:underline"

function ItemLink({ link }: { link: NonNullable<NowItem["link"]> }) {
  const label = (
    <>
      {link.label} <ArrowUpRight className="size-4" aria-hidden="true" />
    </>
  )
  if (link.href.startsWith("#")) return <a href={link.href} className={linkClass}>{label}</a>
  if (link.href.startsWith("/")) return <Link to={link.href} className={linkClass}>{label}</Link>
  return <a href={link.href} target="_blank" rel="noreferrer" className={linkClass}>{label}</a>
}

function Section({ id, title, intro, children }: { id: string; title: string; intro: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-20 scroll-mt-10">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink/15 pb-4">
        <h2 id={`${id}-title`} className="font-display text-[26px] leading-tight text-ink">
          {title}
        </h2>
        <p className="text-[15px] text-ink/65">{intro}</p>
      </div>
      {children}
    </section>
  )
}

export default function NowPage() {
  useDocumentMeta("Now", "What I'm building, learning, writing and listening to this month.")
  const { hash } = useLocation()

  // Arriving from another page at /now#radio: scroll once the section exists.
  React.useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash])

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
                {item.link && <ItemLink link={item.link} />}
              </div>
            </div>
          </Reveal>
        ))}
      </ul>

      <Section id="radio" title="On the radio" intro="My YouTube Music playlists, one station each. Nothing plays until you press play.">
        <Radio />
      </Section>

      <Section id="sports" title="Off the court" intro="What I play, and who I watch.">
        <Sports />
      </Section>

      <p className="mt-12 text-[14px] text-ink/60">
        Inspired by the{" "}
        <a href="https://nownownow.com/about" target="_blank" rel="noreferrer" className="text-accent underline-offset-4 hover:underline">
          /now page movement
        </a>
        .
      </p>
    </BlogPage>
  )
}
