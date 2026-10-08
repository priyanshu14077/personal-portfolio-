import { ArrowUpRight, CheckCircle2, Target } from "lucide-react"

import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
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

function OutcomeBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-sm bg-deep px-3 py-2 text-paper">
      <p className="font-display text-2xl leading-tight font-medium">{value}</p>
      <p className="mt-1 text-[11px] leading-tight text-paper/70">{label}</p>
    </div>
  )
}

function DeploymentCard({ item, index }: { item: Deployment; index: number }) {
  return (
    <Reveal as="article" delay={index * 90} className="relative">
      <Tape className="-top-3 left-8 -rotate-3" />
      <div className="relative h-full rounded-sm border border-ink/15 bg-paper p-6 shadow-[0_14px_30px_-18px_rgba(20,33,58,0.55)] sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[11px] font-semibold tracking-[0.22em] text-accent uppercase">
            Deployment {String(index + 1).padStart(2, "0")} · {item.sector}
          </p>
          <p className="text-xs text-ink/55">{item.period}</p>
        </div>
        <h3 className="mt-3 font-display text-4xl font-medium text-ink">{item.client}</h3>
        <p className="text-sm text-ink/70">{item.role}</p>

        <div className="mt-6 flex gap-3">
          <Target className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-[15px] leading-relaxed text-ink">
            <span className="font-semibold">The problem. </span>
            {item.problem}
          </p>
        </div>

        <p className="mt-5 text-[11px] font-semibold tracking-[0.2em] text-ink/60 uppercase">What I shipped</p>
        <ul className="mt-2 space-y-1.5">
          {item.shipped.map((s) => (
            <li key={s} className="flex gap-2.5 text-[15px] text-ink/85">
              <CheckCircle2 className="mt-1 size-3.5 shrink-0 text-ink/50" aria-hidden="true" />
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {item.outcome.map((o) => (
            <OutcomeBadge key={o.label} {...o} />
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-ink/20 pt-4">
          <ul className="flex flex-wrap gap-1.5">
            {item.stack.map((t) => (
              <li key={t} className="rounded-full border border-ink/20 px-2.5 py-0.5 text-xs text-ink/75">
                {t}
              </li>
            ))}
          </ul>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-sm font-semibold text-accent underline-offset-4 hover:underline"
            >
              View live <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export function FieldDeployments() {
  return (
    <section id="deployments" aria-labelledby="deployments-title" className="paper-grain relative px-4 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Field deployments"
          title={<span id="deployments-title">Embedded with the team, accountable for the outcome</span>}
          note="problem → shipped → measured"
        />
        <div className="grid gap-10 lg:grid-cols-2">
          {deployments.map((d, i) => (
            <DeploymentCard key={d.client} item={d} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
