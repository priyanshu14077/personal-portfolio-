import * as React from "react"
import { Play } from "lucide-react"

import data from "@/data/sports.json"
import { cn } from "@/lib/utils"

type Media = { type: "photo" | "video"; id: number; src: string; thumb: string; alt: string; credit: string; creditUrl: string; url: string }
type Sport = { id: string; name: string; note: string; media: Media[] }
const gallery = data.sports as Sport[]

function Shuttlecock() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-24 w-24">
      <g transform="rotate(-28 60 60)">
        <path d="M44 22 L76 22 L68 74 L52 74 Z" fill="#f2ede2" stroke="#26364f" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M52 22 L55 74 M60 22 L60 74 M68 22 L65 74" stroke="#26364f" strokeOpacity="0.45" strokeWidth="1.6" />
        <path d="M46 38 H74 M48 54 H72" stroke="#a9c1d6" strokeWidth="2.4" />
        <ellipse cx="60" cy="84" rx="13" ry="12" fill="#b4673d" stroke="#26364f" strokeWidth="2.5" />
        <path d="M49 78 H71" stroke="#26364f" strokeWidth="2.5" />
      </g>
    </svg>
  )
}

function CricketBat() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-24 w-24">
      <g transform="rotate(35 60 60)">
        <rect x="56" y="10" width="8" height="30" rx="3" fill="#26364f" />
        <path d="M56 18 H64 M56 24 H64 M56 30 H64" stroke="#a9c1d6" strokeWidth="1.6" />
        <path d="M50 40 H70 L68 104 Q60 110 52 104 Z" fill="#e6dfcf" stroke="#26364f" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M60 46 V100" stroke="#26364f" strokeOpacity="0.25" strokeWidth="2" />
      </g>
      <circle cx="30" cy="88" r="11" fill="#b4673d" stroke="#26364f" strokeWidth="2.5" />
      <path d="M22 82 Q30 88 38 94" fill="none" stroke="#f2ede2" strokeWidth="1.8" strokeDasharray="2.5 2.5" />
    </svg>
  )
}

function Basketball() {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className="h-24 w-24">
      <circle cx="54" cy="58" r="34" fill="#b4673d" stroke="#26364f" strokeWidth="2.5" />
      <path d="M20 58 H88 M54 24 V92" stroke="#26364f" strokeWidth="2.2" />
      <path d="M30 34 Q48 58 30 82 M78 34 Q60 58 78 82" fill="none" stroke="#26364f" strokeWidth="2.2" />
      <g transform="rotate(8 92 92)">
        <rect x="78" y="78" width="30" height="24" rx="4" fill="#f2ede2" stroke="#26364f" strokeWidth="2" />
        <text x="93" y="96" textAnchor="middle" fontFamily="Newsreader, Georgia, serif" fontSize="16" fill="#26364f">77</text>
      </g>
    </svg>
  )
}

const icons: Record<string, React.ReactNode> = {
  badminton: <Shuttlecock />,
  cricket: <CricketBat />,
  basketball: <Basketball />,
}

const sports = [
  { name: "Badminton", note: "I play often, and I'm a big fan of the sport.", art: <Shuttlecock /> },
  { name: "Cricket", note: "I play often.", art: <CricketBat /> },
  { name: "Basketball", note: "I play often, and I'm a big Luka Dončić fan.", art: <Basketball /> },
]

function Stubs() {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {sports.map((s) => (
        <li key={s.name} className="relative overflow-hidden rounded-md border border-dashed border-ink/30 bg-paper p-5 shadow-[0_12px_28px_-22px_rgba(20,33,58,0.5)]">
          {/* Ticket-stub notches */}
          <span aria-hidden="true" className="absolute top-1/2 -left-3 size-6 -translate-y-1/2 rounded-full border border-dashed border-ink/30 bg-paper" />
          <span aria-hidden="true" className="absolute top-1/2 -right-3 size-6 -translate-y-1/2 rounded-full border border-dashed border-ink/30 bg-paper" />
          <div className="flex items-center gap-4 pl-2">
            {s.art}
            <div>
              <p className="font-display text-[24px] leading-tight text-ink">{s.name}</p>
              <p className="mt-1 text-[15px] leading-[1.5] text-ink/75">{s.note}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

/** A muted clip that only plays while it is on screen, and never under reduced motion. */
function Clip({ item }: { item: Media }) {
  const ref = React.useRef<HTMLVideoElement>(null)
  React.useEffect(() => {
    const v = ref.current
    if (!v) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    }, { threshold: 0.4 })
    io.observe(v)
    return () => io.disconnect()
  }, [item.src])
  return (
    <video
      key={item.src}
      ref={ref}
      src={item.src}
      poster={item.thumb}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={item.alt}
      className="absolute inset-0 size-full object-cover"
    />
  )
}

export function Sports() {
  const [sportIndex, setSportIndex] = React.useState(0)
  const [mediaIndex, setMediaIndex] = React.useState(0)
  if (gallery.length === 0) return <Stubs />

  const sport = gallery[sportIndex]
  const item = sport.media[mediaIndex] ?? sport.media[0]

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Sports">
        {gallery.map((s, i) => (
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={i === sportIndex}
            onClick={() => {
              setSportIndex(i)
              setMediaIndex(0)
            }}
            className={cn(
              "flex items-center gap-2 rounded-full border py-1 pr-4 pl-1 text-[15px] font-medium transition-colors",
              i === sportIndex ? "border-accent bg-accent/12 text-ink" : "border-ink/20 text-ink/70 hover:border-accent/40 hover:text-ink",
            )}
          >
            <span className="flex size-9 items-center justify-center overflow-hidden [&>svg]:size-9">{icons[s.id]}</span>
            {s.name}
          </button>
        ))}
      </div>
      <p className="mt-4 font-display text-[22px] leading-snug text-ink">{sport.note}</p>

      {item && (
        <figure className="mt-6">
          <div className="relative aspect-video overflow-hidden rounded-md border border-ink/15 bg-deep shadow-[0_24px_50px_-28px_rgba(20,33,58,0.7)]">
            {item.type === "video" ? (
              <Clip item={item} />
            ) : (
              <img key={item.src} src={item.src} alt={item.alt} className="absolute inset-0 size-full object-cover" />
            )}
          </div>
          <figcaption className="mt-2 text-[13px] text-ink/60">
            {item.type === "video" ? "Video" : "Photo"} by{" "}
            <a href={item.creditUrl} target="_blank" rel="noreferrer" className="text-ink/80 underline-offset-4 hover:text-accent hover:underline">
              {item.credit}
            </a>{" "}
            on{" "}
            <a href={item.url} target="_blank" rel="noreferrer" className="text-ink/80 underline-offset-4 hover:text-accent hover:underline">
              Pexels
            </a>
          </figcaption>
        </figure>
      )}

      <ul className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-8">
        {sport.media.map((m, i) => (
          <li key={`${m.type}-${m.id}`}>
            <button
              type="button"
              onClick={() => setMediaIndex(i)}
              aria-label={`${m.type === "video" ? "Video" : "Photo"} ${i + 1}: ${m.alt}`}
              aria-current={i === mediaIndex}
              className={cn(
                "relative block aspect-[4/3] w-full overflow-hidden rounded border-2 transition-[border-color,opacity]",
                i === mediaIndex ? "border-accent" : "border-transparent opacity-75 hover:opacity-100",
              )}
            >
              <img src={m.thumb} alt="" loading="lazy" className="size-full object-cover" />
              {m.type === "video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-night/30">
                  <Play className="size-5 fill-paper text-paper" aria-hidden="true" />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-5 text-[13px] text-ink/60">
        <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-accent hover:underline">
          Photos and videos from Pexels
        </a>
      </p>
    </div>
  )
}
