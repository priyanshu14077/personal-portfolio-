import type * as React from "react"

/** An image or diagram with a caption. Pass `src` for an image, or children for a diagram. */
export function Figure({
  src,
  alt = "",
  caption,
  children,
}: {
  src?: string
  alt?: string
  caption?: React.ReactNode
  children?: React.ReactNode
}) {
  return (
    <figure className="my-9">
      {src ? (
        <img src={src} alt={alt} loading="lazy" className="block w-full rounded-md border border-ink/15 bg-paper-dim" />
      ) : (
        children
      )}
      {caption && <figcaption className="mt-3 text-center text-[14px] leading-[1.5] text-ink/60">{caption}</figcaption>}
    </figure>
  )
}
