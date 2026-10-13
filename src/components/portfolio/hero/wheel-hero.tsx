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
      </header>

      {/* Bottom margin keeps the controls clear of the next section's torn edge. */}
      <div className="relative mt-8 mb-9 min-h-0 flex-1 md:mt-12">
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

    </section>
  )
}
