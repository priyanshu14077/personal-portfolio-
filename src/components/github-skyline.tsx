import ContributionSkyline from "@/components/ui/contribution-skyline"
import contributions from "@/data/contributions.json"
import { GITHUB_USER } from "@/data/resume"

// Low → high activity, drawn from the postcard palette: tape blue up to the copper accent and paper white.
const POSTCARD_PALETTE = {
  light: ["#a9c1d6", "#6f8fb3", "#b4673d", "#26364f"],
  dark: ["#2e4468", "#5b7aa0", "#b4673d", "#f2ede2"],
}

export function GithubSkyline() {
  return (
    <section
      id="commits"
      aria-labelledby="commits-title"
      className="w-full bg-[#14213a] px-5 py-32 text-[#f2ede2] sm:px-10"
    >
      <div className="mx-auto w-full max-w-[980px]">
        <p className="text-[15px] font-medium text-[#a9c1d6]">Off the clock</p>
        <h2
          id="commits-title"
          className="mt-3 mb-14 font-display text-[clamp(2.25rem,4vw,3.25rem)] leading-[1.15] font-normal"
        >
          Between deployments, I keep building
        </h2>
        <ContributionSkyline
          data={contributions.days}
          palette={POSTCARD_PALETTE}
          defaultView="3d"
          title={`${contributions.total.toLocaleString("en-IN")} contributions in the last year`}
          footer={
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="underline decoration-[#b4673d] underline-offset-4 hover:text-white"
            >
              github.com/{GITHUB_USER}
            </a>
          }
        />
      </div>
    </section>
  )
}
