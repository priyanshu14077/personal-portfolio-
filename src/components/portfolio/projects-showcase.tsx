import { LuminaInteractiveList } from "@/components/ui/lumina-interactive-list"
import { projects } from "@/data/projects"

export function ProjectsShowcase() {
  return (
    <div id="projects" className="relative">
      <h2 className="sr-only">Projects</h2>
      <p className="pointer-events-none absolute top-10 left-5 z-10 text-[15px] font-medium text-tape sm:left-10 lg:left-[max(2.5rem,calc((100vw-72rem)/2+2.5rem))]">
        Projects
      </p>
      <LuminaInteractiveList slides={projects} label="Projects" />
    </div>
  )
}
