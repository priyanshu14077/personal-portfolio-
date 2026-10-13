import { BlogPage } from "@/components/blog/blog-page"
import { Reveal } from "@/components/portfolio/reveal"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { uses } from "@/data/personal"
import { useDocumentMeta } from "@/lib/use-document-meta"

export default function UsesPage() {
  useDocumentMeta("Uses", "The tools I build with, and how I work with AI day to day.")
  return (
    <BlogPage
      masthead={
        <SectionHeading
          tone="dark"
          eyebrow="Uses"
          title="What I build with"
          intro="The tools on my machine, and the way I work with AI, which matters more than any of them."
          className="mb-0"
        />
      }
    >
      <div className="max-w-4xl space-y-16">
        {uses.map((group) => (
          <section key={group.title} aria-labelledby={`uses-${group.title}`}>
            <div className="mb-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-ink/15 pb-4">
              <h2 id={`uses-${group.title}`} className="font-display text-[26px] leading-tight text-ink">
                {group.title}
              </h2>
              {group.intro && <p className="text-[15px] text-ink/65">{group.intro}</p>}
            </div>
            <ul>
              {group.tools.map((tool, i) => (
                <Reveal as="li" key={tool.name} delay={i * 50}>
                  <div className="grid gap-x-10 gap-y-1.5 border-b border-dashed border-ink/20 py-5 md:grid-cols-[14rem_1fr]">
                    <p className="text-[16px] font-semibold text-ink">{tool.name}</p>
                    <p className="max-w-[62ch] text-[16px] leading-[1.6] text-ink/80">{tool.why}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </BlogPage>
  )
}
