import { ArrowUpRight, CheckCircle2 } from "lucide-react"

import { CardLabel, CardTitle, FieldCard } from "@/components/portfolio/field-card"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { PostcardScene } from "@/components/ui/torn-postcard-portfolio"
import { caseStudies, type CaseStudy } from "@/data/field"

function CaseStudyBody({ item }: { item: CaseStudy }) {
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <CardLabel>{item.category}</CardLabel>
        <p className="shrink-0 text-[13px] text-ink/55">{item.period}</p>
      </div>
      <CardTitle>{item.name}</CardTitle>
      <p className="mt-1 text-[14px] text-ink/60">{item.role}</p>

      <p className="mt-5 text-[16px] leading-[1.6] text-ink">{item.problem}</p>

      <h4 className="mt-6 text-[14px] font-semibold text-ink/75">What I built</h4>
      <ul className="mt-2.5 space-y-2">
        {item.built.map((b) => (
          <li key={b} className="flex gap-2.5 text-[15px] leading-[1.5] text-ink/85">
            <CheckCircle2 className="mt-[3px] size-4 shrink-0 text-ink/40" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      <dl className="mt-6 grid grid-cols-3 gap-2">
        {item.facts.map((f) => (
          <div key={f.label} className="rounded-sm bg-deep px-3 py-3 text-paper">
            <dt className="sr-only">{f.label}</dt>
            <dd className="truncate font-display text-[21px] leading-tight">{f.value}</dd>
            <dd className="mt-1 text-[12px] leading-snug text-paper/70">{f.label}</dd>
          </div>
        ))}
      </dl>

      {/* Pinned to the bottom so every card in a row ends on the same line. */}
      <div className="mt-auto pt-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-ink/20 pt-5">
          <ul className="flex flex-wrap gap-1.5">
            {item.stack.map((t) => (
              <li key={t} className="rounded-full border border-ink/20 px-2.5 py-0.5 text-[13px] text-ink/70">
                {t}
              </li>
            ))}
          </ul>
          {item.link ? (
            <a
              href={item.link.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[14px] font-semibold text-accent underline-offset-4 hover:underline"
            >
              {item.link.label} <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          ) : (
            <span className="text-[13px] text-ink/50">Code on request</span>
          )}
        </div>
      </div>
    </>
  )
}

/** Real screenshots of a live build: the main view, with a second one pinned over its corner. */
function Screenshots({ shots, href }: { shots: NonNullable<CaseStudy["screenshots"]>; href?: string }) {
  const [main, second] = shots
  return (
    <div className="relative sm:pb-10 lg:pb-16">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="block overflow-hidden rounded-md border border-ink/15 bg-deep shadow-[0_24px_50px_-28px_rgba(20,33,58,0.7)] transition-transform duration-500 group-hover/card:-rotate-1 motion-reduce:transition-none"
      >
        <span className="flex h-7 items-center gap-1.5 bg-paper-dim px-3" aria-hidden="true">
          <i className="size-2 rounded-full bg-ink/20" />
          <i className="size-2 rounded-full bg-ink/20" />
          <i className="size-2 rounded-full bg-ink/20" />
        </span>
        <img src={main.src} alt={main.alt} loading="lazy" className="block w-full" />
      </a>
      {second ? (
        <img
          src={second.src}
          alt={second.alt}
          loading="lazy"
          className="absolute right-[-4%] bottom-0 w-[52%] rotate-2 rounded-md border border-ink/15 shadow-[0_20px_40px_-20px_rgba(20,33,58,0.8)] transition-transform duration-500 group-hover/card:rotate-0 motion-reduce:transition-none max-sm:hidden"
        />
      ) : null}
    </div>
  )
}

function CaseStudyCard({ item, index }: { item: CaseStudy; index: number }) {
  if (item.featured && item.screenshots?.length) {
    return (
      <Reveal as="article" className="md:col-span-2 lg:col-span-3">
        <FieldCard>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div className="flex h-full flex-col">
              <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-accent/12 px-3 py-1 text-[13px] font-medium text-accent">
                <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" /> Latest build
              </p>
              <CaseStudyBody item={item} />
            </div>
            <Screenshots shots={item.screenshots} href={item.link?.href} />
          </div>
        </FieldCard>
      </Reveal>
    )
  }
  return (
    <Reveal as="article" delay={(index % 3) * 80} className="h-full">
      <FieldCard>
        <CaseStudyBody item={item} />
      </FieldCard>
    </Reveal>
  )
}

function Group({ title, intro, items }: { title: string; intro: string; items: CaseStudy[] }) {
  return (
    <div className="mt-16 first:mt-0">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink/15 pb-4">
        <h3 className="font-display text-[26px] leading-tight text-ink">{title}</h3>
        <p className="text-[15px] text-ink/65">{intro}</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((d, i) => (
          <CaseStudyCard key={d.name} item={d} index={i} />
        ))}
      </div>
    </div>
  )
}

export function FieldDeployments() {
  const client = caseStudies.filter((c) => c.kind === "client")
  const independent = caseStudies.filter((c) => c.kind === "independent")
  return (
    <section id="deployments" aria-labelledby="deployments-title" className="relative px-5 py-32 sm:px-10">
      {/* The Experience chapter's route-map paper. */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
        <PostcardScene kind="map" />
      </div>
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Case studies"
          title={<span id="deployments-title">Embedded with the team, accountable for the outcome</span>}
          intro="The problem each system answers, what I built, and what it delivered."
        />
        <Group title="Client deployments" intro="Shipped to production for real teams." items={client} />
        <Group title="Independent builds" intro="Systems I designed and built on my own." items={independent} />
      </div>
    </section>
  )
}
