import type * as React from "react"

/**
 * A product video with a caption, framed like the case-study screenshots.
 * Plays only when asked, with controls; `preload="metadata"` keeps the page light.
 */
export function Video({ src, poster, caption, label }: { src: string; poster?: string; caption?: React.ReactNode; label?: string }) {
  return (
    <figure className="my-9">
      <div className="overflow-hidden rounded-md border border-ink/15 bg-deep shadow-[0_24px_50px_-28px_rgba(20,33,58,0.7)]">
        <span className="flex h-7 items-center gap-1.5 bg-paper-dim px-3" aria-hidden="true">
          <i className="size-2 rounded-full bg-ink/20" />
          <i className="size-2 rounded-full bg-ink/20" />
          <i className="size-2 rounded-full bg-ink/20" />
        </span>
        <video
          src={src}
          poster={poster}
          controls
          playsInline
          preload="metadata"
          aria-label={label ?? (typeof caption === "string" ? caption : "Product video")}
          className="block aspect-video w-full bg-deep"
        />
      </div>
      {caption && <figcaption className="mt-3 text-center text-[14px] leading-[1.5] text-ink/60">{caption}</figcaption>}
    </figure>
  )
}
