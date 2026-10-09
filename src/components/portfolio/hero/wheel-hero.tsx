import { ArrowDown } from "lucide-react"

import { WheelCardCover } from "@/components/portfolio/hero/wheel-covers"
import { PostcardScene } from "@/components/ui/torn-postcard-portfolio"
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel"
import { capabilities, steps } from "@/data/hero"

const items: WorksWheelItem[] = [...steps, ...capabilities].map((card) => ({
  title: card.title,
  kicker: card.kind === "step" ? `Step ${steps.indexOf(card) + 1} of ${steps.length}` : "Capability",
  cover: <WheelCardCover card={card} />,
  summary: card.summary,
  points: card.points,
}))

export function WheelHero() {
  return (
    <section
      id="field-work"
      aria-labelledby="field-work-title"
      className="relative flex h-svh min-h-[640px] w-full flex-col overflow-hidden bg-night"
    >
      {/* The Contact chapter's moonlit night carries on behind the wheel. */}
      <PostcardScene kind="night" snow />

      <header className="relative z-[160] mx-auto w-full max-w-6xl px-5 pt-10 sm:px-10 md:pt-14">
        <p className="text-[15px] font-medium text-tape">How I work</p>
        <h2 id="field-work-title" className="mt-3 font-display text-[clamp(2rem,3.6vw,3rem)] leading-[1.15] text-paper">
          From a business problem to AI in production
        </h2>
        <p className="mt-4 hidden max-w-[62ch] text-[16px] leading-[1.65] text-paper/75 md:block">
          Four steps I follow with every team, and four capabilities I bring to it. Turn the wheel, then hover or click
          a card.{" "}
          <a
            href="#impact"
            className="inline-flex items-center gap-1 font-semibold text-paper underline-offset-4 hover:text-accent hover:underline"
          >
            Skip to results <ArrowDown className="size-3.5" aria-hidden="true" />
          </a>
        </p>
      </header>

      {/* Bottom margin keeps the controls clear of the next section's torn edge. */}
      <div className="relative mb-9 min-h-0 flex-1">
        <WorksWheel
          items={items}
          label="How I work"
          action=""
          showTitle={false}
          detailSide="left"
          wheelUnits={320}
          cardHeight={0.46}
          className="absolute inset-0 bg-transparent"
        />
      </div>

      <p className="pointer-events-none absolute right-10 bottom-12 z-[160] hidden font-hand text-xl text-tape md:block">
        scroll or drag to turn
      </p>
    </section>
  )
}
