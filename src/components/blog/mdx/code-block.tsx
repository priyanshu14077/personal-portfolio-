import * as React from "react"
import { Check, Copy } from "lucide-react"

/**
 * Wraps every fenced code block: the fact tile's navy surface, a language label and a copy button.
 * Highlighting and titles come from rehype-pretty-code at build time (see vite.config.ts).
 */
export function CodeBlock({ children, ...props }: React.ComponentPropsWithoutRef<"pre"> & { "data-language"?: string }) {
  const ref = React.useRef<HTMLPreElement>(null)
  const [copied, setCopied] = React.useState(false)
  const language = props["data-language"]

  const copy = async () => {
    const text = ref.current?.textContent ?? ""
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* Clipboard blocked: the text stays selectable. */
    }
  }

  return (
    <div className="code-block group/code relative overflow-hidden rounded-sm bg-deep text-paper">
      <div className="pointer-events-none absolute top-2 right-2 flex items-center gap-2">
        {language && language !== "text" && (
          <span className="font-mono text-[11px] tracking-[0.12em] text-paper/45 uppercase">{language}</span>
        )}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="pointer-events-auto inline-flex size-7 items-center justify-center rounded-sm border border-paper/15 text-paper/60 opacity-0 transition-[opacity,color,border-color] group-hover/code:opacity-100 hover:border-paper/40 hover:text-paper focus-visible:opacity-100"
        >
          {copied ? <Check className="size-3.5 text-tape" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        </button>
      </div>
      <pre ref={ref} {...props}>
        {children}
      </pre>
    </div>
  )
}
