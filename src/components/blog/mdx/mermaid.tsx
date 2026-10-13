import * as React from "react"

// Mermaid's "base" theme, coloured from the palette in src/index.css. Loaded only when a diagram renders.
const themeVariables = {
  fontFamily: '"Geist", ui-sans-serif, system-ui, sans-serif',
  fontSize: "18px",
  background: "#f2ede2",
  primaryColor: "#e6dfcf",
  primaryTextColor: "#26364f",
  primaryBorderColor: "#26364f",
  secondaryColor: "#a9c1d6",
  secondaryTextColor: "#26364f",
  secondaryBorderColor: "#26364f",
  tertiaryColor: "#f2ede2",
  tertiaryTextColor: "#26364f",
  tertiaryBorderColor: "#26364f",
  lineColor: "#26364f",
  textColor: "#26364f",
  mainBkg: "#e6dfcf",
  nodeBorder: "#26364f",
  clusterBkg: "#f2ede2",
  clusterBorder: "#a9c1d6",
  edgeLabelBackground: "#f2ede2",
  noteBkgColor: "#e6dfcf",
  noteTextColor: "#26364f",
  noteBorderColor: "#b4673d",
  actorBkg: "#e6dfcf",
  actorBorder: "#26364f",
  actorTextColor: "#26364f",
  actorLineColor: "#26364f",
  signalColor: "#26364f",
  signalTextColor: "#26364f",
  labelBoxBkgColor: "#e6dfcf",
  labelBoxBorderColor: "#26364f",
  labelTextColor: "#26364f",
  loopTextColor: "#26364f",
  activationBkgColor: "#a9c1d6",
  activationBorderColor: "#26364f",
  sequenceNumberColor: "#f2ede2",
}

let ready: Promise<typeof import("mermaid").default> | undefined

function loadMermaid() {
  ready ??= import("mermaid").then(({ default: mermaid }) => {
    mermaid.initialize({ startOnLoad: false, theme: "base", themeVariables, securityLevel: "strict" })
    return mermaid
  })
  return ready
}

/** A Mermaid diagram: `<Mermaid chart={\`graph LR ...\`} />`. */
export function Mermaid({ chart, label }: { chart: string; label?: string }) {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const [svg, setSvg] = React.useState<string>()
  const [error, setError] = React.useState<string>()

  React.useEffect(() => {
    let cancelled = false
    loadMermaid()
      .then((mermaid) => mermaid.render(`mermaid-${id}`, chart.trim()))
      .then(({ svg }) => {
        if (!cancelled) setSvg(svg)
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e))
      })
    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (error) {
    return (
      <pre className="my-7 overflow-x-auto rounded-sm border border-accent bg-accent/12 p-4 text-[13px] text-ink">
        Diagram failed to render: {error}
      </pre>
    )
  }
  return (
    <div
      role="img"
      aria-label={label ?? "Diagram"}
      className="mermaid my-7 flex min-h-24 justify-center overflow-x-auto rounded-md border border-ink/15 bg-paper-dim/50 p-4"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    >
      {svg ? undefined : <span className="self-center text-[14px] text-ink/50">Drawing diagram…</span>}
    </div>
  )
}
