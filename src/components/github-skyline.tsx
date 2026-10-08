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
      className="w-full bg-[#14213a] px-4 py-20 text-[#f2ede2] sm:px-8"
    >
      <div className="mx-auto w-full max-w-[980px]">
        <p className="mb-3 text-[11px] font-medium tracking-[0.3em] text-[#a9c1d6] uppercase">
          Field log · after the postcards
        </p>
        <h2
          id="commits-title"
          className="mb-10 text-4xl leading-tight sm:text-5xl"
          style={{ fontFamily: '"Cormorant Garamond", Georgia, serif' }}
        >
          A year of commits, as a skyline
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
