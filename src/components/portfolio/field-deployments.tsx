import { ArrowUpRight, CheckCircle2 } from "lucide-react"

import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { PostcardScene } from "@/components/ui/torn-postcard-portfolio"
import { deployments, type Deployment } from "@/data/field"

function Tape({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-6 w-24 bg-tape/70 shadow-sm ${className ?? ""}`}
      style={{ clipPath: "polygon(3% 0, 97% 6%, 100% 94%, 0 100%)" }}
    />
  )
}

function DeploymentCard({ item, index }: { item: Deployment; index: number }) {
  return (
    <Reveal as="article" delay={index * 80} className="relative">
      <Tape className="-top-3 left-10 -rotate-3" />
      <div className="relative flex h-full flex-col rounded-sm border border-ink/15 bg-paper p-8 shadow-[0_16px_34px_-20px_rgba(20,33,58,0.55)] sm:p-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <p className="text-[15px] font-medium text-accent">{item.sector}</p>
          <p className="text-[14px] text-ink/55">{item.period}</p>
        </div>
        <h3 className="mt-3 font-display text-[40px] leading-[1.1] text-ink">{item.client}</h3>
        <p className="mt-1 text-[15px] text-ink/65">{item.role}</p>

        <p className="mt-7 max-w-[56ch] text-[17px] leading-[1.65] text-ink">{item.problem}</p>

        <h4 className="mt-8 text-[15px] font-semibold text-ink/80">What I shipped</h4>
        <ul className="mt-3 space-y-2.5">
          {item.shipped.map((s) => (
            <li key={s} className="flex gap-3 text-[16px] leading-[1.55] text-ink/85">
              <CheckCircle2 className="mt-1 size-4 shrink-0 text-ink/45" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>

        <dl className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {item.outcome.map((o) => (
            <div key={o.label} className="rounded-sm bg-deep px-4 py-3.5 text-paper">
              <dt className="sr-only">{o.label}</dt>
              <dd className="font-display text-[26px] leading-tight">{o.value}</dd>
              <dd className="mt-1 text-[13px] leading-snug text-paper/70">{o.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-auto pt-9">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-ink/20 pt-6">
          <ul className="flex flex-wrap gap-2">
            {item.stack.map((t) => (
              <li key={t} className="rounded-full border border-ink/20 px-3 py-1 text-[13px] text-ink/75">
                {t}
              </li>
            ))}
          </ul>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-accent underline-offset-4 hover:underline"
            >
              Visit the live site <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
        </div>
      </div>
    </Reveal>
  )
}

export function FieldDeployments() {
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
          intro="Three client deployments: the problem I walked into, what I shipped, and what changed."
        />
        <div className="grid gap-12 lg:grid-cols-2">
          {deployments.map((d, i) => (
            <DeploymentCard key={d.client} item={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
