import type * as React from "react"

import { aiAndBackend, cloudDataAndFrontend, type Tech } from "@/data/stack"

/** Brand colours too dark to read on navy fall back to paper on hover. */
function hoverColor(hex: string) {
  const n = parseInt(hex, 16)
  const lum = (0.2126 * (n >> 16) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255)) / 255
  return lum < 0.35 ? "#f2ede2" : `#${hex}`
}

function TechChip({ tech }: { tech: Tech }) {
  const { icon } = tech
  return (
    <li
      className="flex shrink-0 items-center gap-3 rounded-full border border-paper/15 bg-paper/[0.04] py-3 pr-6 pl-4 text-paper/70 transition-colors hover:border-paper/40 hover:text-[var(--brand)]"
      style={{ "--brand": icon ? hoverColor(icon.hex) : "#b4673d" } as React.CSSProperties}
    >
      {icon ? (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6 fill-current">
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="flex size-6 items-center justify-center rounded-sm border border-current text-[9px] font-bold tracking-tight"
        >
          {tech.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 3)}
        </span>
      )}
      <span className="text-[15px] font-medium whitespace-nowrap text-paper/85">{tech.name}</span>
    </li>
  )
}

function MarqueeRow({ items, reverse, label }: { items: Tech[]; reverse?: boolean; label: string }) {
  return (
    <div className="marquee" aria-label={label} role="region">
      <div className="marquee-track" data-reverse={reverse ? "" : undefined}>
        {/* The second copy makes the loop seamless; screen readers get the list once. */}
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-5 pr-5" aria-hidden={copy === 1 || undefined}>
            {items.map((t) => (
              <TechChip key={t.name} tech={t} />
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

export function TechMarqueeRows() {
  return (
    <div className="flex flex-col gap-5">
      <MarqueeRow items={aiAndBackend} label="AI and backend tools" />
      <MarqueeRow items={cloudDataAndFrontend} label="Cloud, data and frontend tools" reverse />
    </div>
  )
}
