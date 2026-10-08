import { cn } from "@/lib/utils"

const POINTS = 64

/** A deterministic ragged line, so the tear looks the same on every render. */
function tearPath(seed: number, flip: boolean) {
  let s = seed
  const rand = () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
  const ys = Array.from({ length: POINTS + 1 }, (_, i) => {
    const wave = Math.sin((i / POINTS) * Math.PI * 5 + seed) * 4
    return 12 + wave + (rand() - 0.5) * 9
  })
  const line = ys.map((y, i) => `${((i / POINTS) * 100).toFixed(2)} ${y.toFixed(2)}`).join(" L")
  return flip ? `M0 0 L${line} L100 0 Z` : `M0 32 L${line} L100 32 Z`
}

/**
 * A torn-paper seam between two sections. `color` is the paper being torn;
 * `position="top"` hangs it from the top edge, `"bottom"` stands it on the bottom edge.
 */
export function TornEdge({
  color,
  position,
  seed = 7,
  className,
}: {
  color: string
  position: "top" | "bottom"
  seed?: number
  className?: string
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      className={cn(
        "pointer-events-none absolute inset-x-0 h-6 w-full sm:h-9",
        position === "top" ? "top-0 -translate-y-[calc(100%-1px)]" : "bottom-0 translate-y-[calc(100%-1px)]",
        className,
      )}
    >
      <path d={tearPath(seed, position === "bottom")} fill={color} />
    </svg>
  )
}
