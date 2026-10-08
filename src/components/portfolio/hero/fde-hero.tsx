import { ArrowDown, ArrowUpRight, Mail } from "lucide-react"

import { DeploymentPipeline } from "@/components/portfolio/hero/deployment-pipeline"
import { resume } from "@/data/resume"

function TopoLines() {
  // Faint contour lines: the "field" the engineer is deployed into.
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none" viewBox="0 0 1200 800">
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M-50 ${120 + i * 80} C 250 ${60 + i * 80}, 450 ${200 + i * 80}, 700 ${110 + i * 80} S 1100 ${40 + i * 80}, 1250 ${140 + i * 80}`}
          fill="none"
          stroke="#f2ede2"
          strokeWidth="1.2"
        />
      ))}
    </svg>
  )
}

function HeroCopy() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-end">
      <div>
        <p className="text-[11px] font-semibold tracking-[0.3em] text-tape uppercase">
          {resume.name} · Forward deployed engineer
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,4.4vw,4rem)] leading-[1] text-balance font-medium text-paper">
          I learn how your business runs.
          <span className="block text-accent">Then I ship the AI that speeds it up.</span>
        </h1>
      </div>
      <div>
        <p className="text-[15px] leading-relaxed text-paper/75">
          Forward deployed engineering means embedding with the team that has the problem, turning their workflow into
          a spec, building the AI solution on their data, and owning it all the way to production.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="#deployments"
            className="inline-flex items-center gap-2 rounded-sm bg-paper px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-accent hover:text-paper"
          >
            See it in practice <ArrowDown className="size-4" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${resume.email}`}
            className="inline-flex items-center gap-2 rounded-sm border border-paper/30 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:border-accent hover:text-accent"
          >
            <Mail className="size-4" aria-hidden="true" /> Email me
          </a>
        </div>
      </div>
    </div>
  )
}

function ProofLine() {
  return (
    <p className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-paper/55">
      <span className="font-semibold tracking-[0.2em] uppercase">Shipped at</span>
      {[
        { name: "Proploy", url: "https://proploy.io" },
        { name: "Dunne", url: "https://dunne-app.vercel.app" },
        { name: "Emtech Solutions", url: "https://emtec-landing-page.vercel.app" },
      ].map((c) => (
        <a key={c.name} href={c.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-paper/80 hover:text-accent">
          {c.name} <ArrowUpRight className="size-3" aria-hidden="true" />
        </a>
      ))}
      <span className="font-hand text-base text-tape">walkthrough modelled on the Proploy deployment</span>
    </p>
  )
}

export function FdeHero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[radial-gradient(120%_80%_at_70%_0%,#24375a_0%,#14213a_55%,#0c1528_100%)] px-4 py-16 sm:px-8"
    >
      <TopoLines />
      <div className="relative mx-auto w-full max-w-6xl">
        <HeroCopy />
        <div className="mt-10">
          <DeploymentPipeline />
        </div>
        <ProofLine />
      </div>
    </section>
  )
}
