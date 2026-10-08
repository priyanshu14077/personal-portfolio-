import { GithubSkyline } from "@/components/github-skyline"
import { DeploymentPlaybook } from "@/components/portfolio/deployment-playbook"
import { FieldDeployments } from "@/components/portfolio/field-deployments"
import { WheelHero } from "@/components/portfolio/hero/wheel-hero"
import { ImpactStrip } from "@/components/portfolio/impact-strip"
import { SiteFooter } from "@/components/portfolio/site-footer"
import { TechMarquee } from "@/components/portfolio/tech-marquee"
import { Toolbelt } from "@/components/portfolio/toolbelt"
import TornPostcardPortfolio from "@/components/ui/torn-postcard-portfolio"
import { resume } from "@/data/resume"

export default function App() {
  return (
    <main className="w-full overflow-x-clip">
      <TornPostcardPortfolio {...resume} />
      <WheelHero />
      <ImpactStrip />
      <TechMarquee />
      <DeploymentPlaybook />
      <FieldDeployments />
      <Toolbelt />
      <GithubSkyline />
      <SiteFooter />
    </main>
  )
}
