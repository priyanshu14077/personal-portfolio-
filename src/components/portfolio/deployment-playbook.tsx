import { Compass, FlaskConical, Gauge, Rocket, type LucideIcon } from "lucide-react"

import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { playbook, type PlaybookStep } from "@/data/field"

const ICONS: LucideIcon[] = [Compass, FlaskConical, Rocket, Gauge]

function StepStamp({ step, Icon }: { step: string; Icon: LucideIcon }) {
  return (
    <div className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-accent/70 bg-deep text-accent">
      <Icon className="size-6" aria-hidden="true" />
      <span className="absolute -top-2 -right-2 rounded-sm bg-accent px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-paper">
        {step}
      </span>
    </div>
  )
}

function StepCard({ item, index }: { item: PlaybookStep; index: number }) {
  return (
    <Reveal as="li" delay={index * 110} className="relative flex gap-5 lg:flex-col lg:gap-6">
      <StepStamp step={item.step} Icon={ICONS[index % ICONS.length]} />
      <div>
        <h3 className="font-display text-3xl font-medium text-paper">{item.title}</h3>
        <p className="mt-2 text-[15px] leading-relaxed text-paper/75">{item.text}</p>
        <p className="mt-4 border-l-2 border-tape/40 pl-3 font-hand text-xl leading-snug text-tape">{item.example}</p>
      </div>
    </Reveal>
  )
}

export function DeploymentPlaybook() {
  return (
    <section
      id="playbook"
      aria-labelledby="playbook-title"
      className="relative bg-gradient-to-b from-navy to-deep px-4 py-24 sm:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          tone="dark"
          eyebrow="How I work"
          title={<span id="playbook-title">The forward deployed playbook</span>}
          note="from someone's problem to a running system"
        />
        <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
          {/* The route line joining the stamps. */}
          <span
            aria-hidden="true"
            className="absolute top-8 bottom-8 left-8 border-l-2 border-dashed border-paper/15 lg:top-8 lg:right-8 lg:bottom-auto lg:left-8 lg:border-t-2 lg:border-l-0"
          />
          {playbook.map((item, i) => (
            <StepCard key={item.step} item={item} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
