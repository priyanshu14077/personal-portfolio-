import { lazy, Suspense } from "react"

import { GithubSkyline } from "@/components/github-skyline"
import { FieldDeployments } from "@/components/portfolio/field-deployments"
import { WheelHero } from "@/components/portfolio/hero/wheel-hero"
import { ImpactStrip } from "@/components/portfolio/impact-strip"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { Toolbelt } from "@/components/portfolio/toolbelt"
import TornPostcardPortfolio from "@/components/ui/torn-postcard-portfolio"
import { resume } from "@/data/resume"

// three.js and GSAP only load when the projects slider is needed.
const ProjectsShowcase = lazy(() =>
  import("@/components/portfolio/projects-showcase").then((m) => ({ default: m.ProjectsShowcase })),
)

export default function App() {
  return (
    <main className="w-full overflow-x-clip">
      <TornPostcardPortfolio {...resume} />
      <WheelHero />
      <Suspense fallback={<div className="h-svh min-h-[640px] bg-night" />}>
        <ProjectsShowcase />
      </Suspense>
      <ImpactStrip />
      <FieldDeployments />
      <Toolbelt />
      <GithubSkyline />
      <SiteFooter />
    </main>
  )
}
