// The hero's worked example. It is modelled on the Proploy deployment; the figures
// (3 days → 15 seconds, sub-50ms search, −40% infra) are from the resume, while the
// notes, spec and console lines illustrate the process rather than quote anyone.

export type StageId = "absorb" | "spec" | "build" | "ship"

export type Stage = {
  id: StageId
  step: string
  verb: string
  title: string
  caption: string
}

export const stages: Stage[] = [
  {
    id: "absorb",
    step: "01",
    verb: "Absorb",
    title: "Absorb the business",
    caption: "Sit with the team, learn the workflow, write down what actually hurts.",
  },
  {
    id: "spec",
    step: "02",
    verb: "Translate",
    title: "Turn pain into a spec",
    caption: "Users, data, guardrails and one success metric everyone agrees on.",
  },
  {
    id: "build",
    step: "03",
    verb: "Build",
    title: "Build the AI solution",
    caption: "A Claude RAG agent on the Anthropic SDK, grounded in the team's own data.",
  },
  {
    id: "ship",
    step: "04",
    verb: "Ship",
    title: "Ship to production",
    caption: "Streamed, cached and auto-scaled, then measured against the metric.",
  },
]

export const discoveryNotes = [
  { who: "Procurement", text: "Vendor research takes ~3 days per request" },
  { who: "Compliance", text: "Every answer needs a source we can check" },
  { who: "Operations", text: "It has to fit the buying workflow we have" },
  { who: "Analysts", text: "Search has to feel instant" },
]

export const spec = [
  { field: "Users", value: "Procurement analysts" },
  { field: "Job", value: "Research & shortlist vendors" },
  { field: "Data", value: "Vendor and catalog records" },
  { field: "Guardrail", value: "Cite every source" },
  { field: "Metric", value: "Research in seconds, not days" },
]

export const agentFlow = ["Query", "Retrieve", "Claude", "Answer + sources"]

export const consoleLines = [
  { kind: "prompt", text: "Shortlist ISO-certified suppliers for industrial sensors" },
  { kind: "step", text: "retrieve · Postgres full-text (GIN) over vendor data" },
  { kind: "step", text: "claude · rank and draft with citations" },
  { kind: "answer", text: "3 vendors ranked · sources [1] [2] [3]" },
] as const

export const deployLog = [
  "FastAPI agent service containerised with Docker",
  "Deployed to GCP Cloud Run with auto-scaling",
  "SSE streaming to Next.js, Redis cache in front",
  "Search tuned to under 50ms",
]

export const outcome = {
  from: "3 days",
  to: "15 seconds",
  label: "per research request",
  extra: "infra cost −40%",
}
