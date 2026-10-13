import * as React from "react"
import { ChevronLeft, ChevronRight, Pause, Play, SkipBack, SkipForward, Volume2 } from "lucide-react"

import radio from "@/data/radio.json"
import { cn } from "@/lib/utils"

type Track = { id: string; title: string; artist: string }
type Station = { id: string; freq: number; name: string; genre: string; playlist: string; tracks: Track[] }

const stations = radio.stations as Station[]
const MIN = 87.5
const MAX = 108.5

// The slice of the YouTube IFrame Player API this component uses.
type YTPlayer = {
  loadVideoById: (id: string) => void
  playVideo: () => void
  pauseVideo: () => void
  setVolume: (v: number) => void
  destroy: () => void
}
type YTNamespace = {
  Player: new (
    el: HTMLElement,
    opts: {
      host?: string
      videoId: string
      width?: string
      height?: string
      playerVars?: Record<string, string | number>
      events?: {
        onReady?: (e: { target: YTPlayer }) => void
        onStateChange?: (e: { data: number }) => void
        onError?: (e: { data: number }) => void
      }
    },
  ) => YTPlayer
}
declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

let apiPromise: Promise<YTNamespace> | undefined
/** Loads YouTube's player API once, on the first press of play, never before. */
function loadYouTube(): Promise<YTNamespace> {
  apiPromise ??= new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT)
    window.onYouTubeIframeAPIReady = () => resolve(window.YT as YTNamespace)
    const s = document.createElement("script")
    s.src = "https://www.youtube.com/iframe_api"
    document.head.append(s)
  })
  return apiPromise
}

const pct = (freq: number) => ((freq - MIN) / (MAX - MIN)) * 100
const randomIndex = (n: number) => Math.floor(Math.random() * n)

/** The tuning window: a printed MHz scale, the six stations, and a copper needle. */
function Dial({ active, tuning, onTune }: { active: Station; tuning: boolean; onTune: (s: Station) => void }) {
  const ticks = []
  for (let f = 88; f <= 108; f += 0.5) ticks.push(f)
  return (
    <div className="relative h-28 overflow-hidden rounded-md border border-ink/20 bg-paper-dim shadow-[inset_0_2px_10px_rgba(20,33,58,0.25)] sm:h-32">
      <div className="absolute inset-y-0 inset-x-5 sm:inset-x-6">
      <div className={cn("absolute inset-0 transition-opacity duration-300", tuning ? "opacity-60" : "opacity-100")}>
        {ticks.map((f) => (
          <span
            key={f}
            aria-hidden="true"
            className={cn("absolute top-0 w-px bg-ink/40", Number.isInteger(f) && f % 2 === 0 ? "h-5" : "h-2.5")}
            style={{ left: `${pct(f)}%` }}
          />
        ))}
        {[88, 92, 96, 100, 104, 108].map((f) => (
          <span key={f} aria-hidden="true" className="absolute top-6 -translate-x-1/2 font-mono text-[11px] text-ink/55" style={{ left: `${pct(f)}%` }}>
            {f}
          </span>
        ))}
        {stations.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onTune(s)}
            aria-label={`Tune to ${s.freq} FM, ${s.genre}`}
            className="absolute bottom-3 flex -translate-x-1/2 flex-col items-center gap-1 rounded px-1 focus-visible:outline-2 focus-visible:outline-accent"
            style={{ left: `${pct(s.freq)}%` }}
          >
            <span className={cn("size-2 rounded-full transition-colors", s.id === active.id ? "bg-accent" : "bg-ink/35")} />
            <span className={cn("hidden whitespace-nowrap text-[11px] font-medium sm:block", s.id === active.id ? "text-ink" : "text-ink/55")}>
              {s.genre}
            </span>
          </button>
        ))}
      </div>
      {/* The needle sweeps between stations; motion-reduce makes it jump. */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 w-[3px] -translate-x-1/2 bg-accent shadow-[0_0_10px_rgba(180,103,61,0.6)] transition-[left] duration-700 ease-[cubic-bezier(0.3,0.7,0.2,1)] motion-reduce:transition-none"
        style={{ left: `${pct(active.freq)}%` }}
      />
      </div>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),transparent_40%)]" />
    </div>
  )
}

export function Radio() {
  const [station, setStation] = React.useState<Station>(stations[2] ?? stations[0])
  const [index, setIndex] = React.useState(0)
  const [started, setStarted] = React.useState(false)
  const [playing, setPlaying] = React.useState(false)
  const [tuning, setTuning] = React.useState(false)
  const [volume, setVolume] = React.useState(70)
  const mount = React.useRef<HTMLDivElement>(null)
  const player = React.useRef<YTPlayer | null>(null)
  const queue = React.useRef({ station, index })
  queue.current = { station, index }

  const track = station.tracks[index]

  const play = React.useCallback((s: Station, i: number) => {
    setStation(s)
    setIndex(i)
    player.current?.loadVideoById(s.tracks[i].id)
  }, [])

  const step = React.useCallback(
    (delta: number) => {
      const { station: s, index: i } = queue.current
      play(s, (i + delta + s.tracks.length) % s.tracks.length)
    },
    [play],
  )

  const tune = React.useCallback(
    (s: Station) => {
      if (s.id === queue.current.station.id) return
      setTuning(true)
      window.setTimeout(() => setTuning(false), 450)
      // Like real radio, you join a station mid-broadcast.
      const i = randomIndex(s.tracks.length)
      if (player.current) play(s, i)
      else {
        setStation(s)
        setIndex(i)
      }
    },
    [play],
  )

  const tuneBy = (delta: number) => {
    const at = stations.findIndex((s) => s.id === station.id)
    tune(stations[(at + delta + stations.length) % stations.length])
  }

  async function start() {
    setStarted(true)
    const YT = await loadYouTube()
    if (!mount.current || player.current) return
    const { station: s, index: i } = queue.current
    player.current = new YT.Player(mount.current, {
      host: "https://www.youtube-nocookie.com",
      videoId: s.tracks[i].id,
      width: "100%",
      height: "100%",
      playerVars: { autoplay: 1, playsinline: 1, rel: 0 },
      events: {
        onReady: (e) => {
          e.target.setVolume(volume)
          e.target.playVideo()
        },
        onStateChange: (e) => {
          if (e.data === 1) setPlaying(true)
          if (e.data === 2) setPlaying(false)
          if (e.data === 0) step(1) // ended: next track on this station
        },
        onError: () => step(1), // a track that won't play is skipped, like dead air
      },
    })
  }

  React.useEffect(() => () => player.current?.destroy(), [])

  function toggle() {
    if (!player.current) return void start()
    if (playing) player.current.pauseVideo()
    else player.current.playVideo()
  }

  return (
    <section aria-label="Radio" className="rounded-xl border border-paper/10 bg-deep p-4 text-paper shadow-[0_40px_80px_-40px_rgba(12,21,40,0.85)] sm:p-7">
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[12px] font-semibold tracking-[0.2em] text-paper/70 uppercase">
          <span
            aria-hidden="true"
            className={cn("size-2.5 rounded-full", playing ? "animate-pulse bg-accent shadow-[0_0_10px_#b4673d] motion-reduce:animate-none" : "bg-paper/25")}
          />
          {playing ? "On air" : "Off air"}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => tuneBy(-1)} aria-label="Tune down" className="rounded-full border border-paper/20 p-1.5 text-paper/80 hover:border-accent hover:text-paper">
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <span className="font-mono text-[12px] tracking-wider text-paper/60">TUNE</span>
          <button type="button" onClick={() => tuneBy(1)} aria-label="Tune up" className="rounded-full border border-paper/20 p-1.5 text-paper/80 hover:border-accent hover:text-paper">
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Dial active={station} tuning={tuning} onTune={tune} />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        {/* The player stays visible, at 16:9 and well above YouTube's 200×200 minimum. */}
        <div className="relative aspect-video min-h-[200px] overflow-hidden rounded-md border border-paper/15 bg-night">
          <div className="absolute inset-0 [&>iframe]:block [&>iframe]:size-full">
            {/* YouTube swaps this div for its iframe; the wrapper keeps it filling the frame. */}
            <div ref={mount} />
          </div>
          {!started && (
            <button type="button" onClick={start} className="group absolute inset-0 flex items-center justify-center" aria-label={`Play ${station.freq} FM`}>
              <img src={`https://i.ytimg.com/vi/${track.id}/hqdefault.jpg`} alt="" className="absolute inset-0 size-full object-cover opacity-45" />
              <span className="relative flex items-center gap-3 rounded-full bg-paper px-6 py-3 text-[15px] font-semibold text-ink shadow-lg transition-colors group-hover:bg-accent group-hover:text-paper">
                <Play className="size-5" aria-hidden="true" /> Tune in
              </span>
            </button>
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <p className="font-display text-[clamp(3rem,7vw,4.5rem)] leading-none text-paper tabular-nums">
            {station.freq.toFixed(1)}
            <span className="ml-2 font-sans text-[16px] font-semibold tracking-[0.2em] text-tape">FM</span>
          </p>
          <p className="mt-2 text-[15px] font-medium text-tape">{station.genre}</p>
          <p className="text-[14px] text-paper/60">“{station.name}”, from my playlists</p>

          <div className="mt-6 border-t border-dashed border-paper/20 pt-4" aria-live="polite">
            <p className="text-[12px] font-semibold tracking-[0.18em] text-paper/50 uppercase">Now playing</p>
            <p className="mt-1 truncate font-display text-[22px] leading-tight text-paper">{track.title}</p>
            <p className="truncate text-[14px] text-paper/70">{track.artist}</p>
            <p className="mt-1 font-mono text-[12px] text-paper/45">
              {index + 1} / {station.tracks.length}
            </p>
          </div>

          <div className="mt-auto flex items-center gap-3 pt-6">
            <button type="button" onClick={() => step(-1)} disabled={!started} aria-label="Previous track" className="rounded-full p-2 text-paper/80 hover:text-paper disabled:opacity-40">
              <SkipBack className="size-5" aria-hidden="true" />
            </button>
            <button type="button" onClick={toggle} aria-label={playing ? "Pause" : "Play"} className="flex size-14 items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-accent hover:text-paper">
              {playing ? <Pause className="size-6" aria-hidden="true" /> : <Play className="size-6" aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => step(1)} disabled={!started} aria-label="Next track" className="rounded-full p-2 text-paper/80 hover:text-paper disabled:opacity-40">
              <SkipForward className="size-5" aria-hidden="true" />
            </button>
            <label className="ml-auto flex items-center gap-2 text-paper/70">
              <Volume2 className="size-4" aria-hidden="true" />
              <span className="sr-only">Volume</span>
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={(e) => {
                  const v = Number(e.target.value)
                  setVolume(v)
                  player.current?.setVolume(v)
                }}
                className="w-24 accent-[#b4673d]"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6" role="group" aria-label="Station presets">
        {stations.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => tune(s)}
            aria-pressed={s.id === station.id}
            className={cn(
              "rounded-md border px-3 py-2.5 text-left transition-colors",
              s.id === station.id ? "border-accent bg-accent/15" : "border-paper/15 hover:border-paper/40",
            )}
          >
            <span className="block font-mono text-[13px] text-tape">{s.freq.toFixed(1)}</span>
            <span className="block truncate text-[14px] font-medium text-paper">{s.genre}</span>
            <span className="block text-[12px] text-paper/50">{s.tracks.length} tracks</span>
          </button>
        ))}
      </div>
    </section>
  )
}
