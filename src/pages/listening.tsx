import { ArrowLeft } from "lucide-react"
import { Link } from "react-router"

import { BlogPage } from "@/components/blog/blog-page"
import { Radio } from "@/components/now/radio"
import { SectionHeading } from "@/components/portfolio/section-heading"
import { useDocumentMeta } from "@/lib/use-document-meta"

export default function ListeningPage() {
  useDocumentMeta("Radio", "Six stations from my own playlists: jazz, hip hop, '70s and '80s rock and more.")
  return (
    <BlogPage
      masthead={
        <div>
          <Link to="/now" className="inline-flex items-center gap-1 text-[14px] font-semibold text-paper/75 underline-offset-4 hover:text-paper hover:underline">
            <ArrowLeft className="size-3.5" aria-hidden="true" /> Now
          </Link>
          <SectionHeading
            tone="dark"
            eyebrow="Listening"
            title="Off the clock, on the radio"
            intro="Six stations, each one of my YouTube Music playlists. Jazz, hip hop, a lot of Led Zeppelin, and whatever I play late at night. Tune in."
            note="music plays only when you press play"
            className="mt-8 mb-0"
          />
        </div>
      }
    >
      <Radio />
      <p className="mt-6 max-w-[70ch] text-[14px] leading-[1.6] text-ink/60">
        Music streams from YouTube through its embedded player, and nothing loads until you press play. Tracks whose owners don&apos;t allow
        embedding are left out.
      </p>
    </BlogPage>
  )
}
