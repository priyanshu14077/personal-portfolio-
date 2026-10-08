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

/** What each walkthrough card says when hovered or opened. */
export const stageDetails: Record<StageId, { summary: string; points: string[] }> = {
  absorb: {
    summary:
      "Before any code, I sit with the people who own the problem and learn the workflow as they live it: where the time goes, what can't break, and who signs off.",
    points: [
      "Shadow the team and map the workflow end to end",
      "Collect constraints: compliance, data access, existing stack",
      "Find the one bottleneck worth automating first",
    ],
  },
  spec: {
    summary:
      "Business pain becomes something an engineer can build and a stakeholder can sign: users, data, guardrails, and a single metric that defines done.",
    points: [
      "Write the job-to-be-done in the team's own words",
      "Agree the success metric before building",
      "Set guardrails up front, e.g. every answer cites its source",
    ],
  },
  build: {
    summary:
      "I build the AI on the team's own data. At Proploy that was a Claude-based RAG agent on the native Anthropic SDK, grounded in vendor records.",
    points: [
      "Retrieval over the team's data, tuned for speed",
      "Claude for reasoning, with citations back to sources",
      "Prototype in days so feedback is about the real thing",
    ],
  },
  ship: {
    summary:
      "Then I own it in production: streaming, caching, auto-scaling and measurement against the metric we agreed.",
    points: [
      "Containerised FastAPI on GCP Cloud Run with auto-scaling",
      "SSE streaming to Next.js with Redis caching",
      "Proploy result: research from 3 days to 15 seconds, infra cost −40%",
    ],
  },
}

export type Prototype = {
  name: string
  kicker: string
  summary: string
  points: string[]
  tags: string[]
  link?: { label: string; href: string }
}

export const prototypes: Prototype[] = [
  {
    name: "Flowforge",
    kicker: "Prototype · AI workflows",
    summary: "A visual, drag-and-drop AI workflow builder: automation as a graph you can see and run.",
    points: [
      "Async engine runs LLM, HTTP and Condition nodes in topological order",
      "Webhook-triggered runs",
      "Groq LPU inference for low-latency LLM steps",
    ],
    tags: ["Node.js", "TypeScript", "Prisma", "Groq"],
    link: { label: "View on GitHub", href: "https://github.com/priyanshu14077/Flowforge" },
  },
  {
    name: "Taxops",
    kicker: "Prototype · fintech copilot",
    summary: "An AI-native tax and expense copilot for Indian solopreneurs.",
    points: [
      "Async FastAPI with SQLAlchemy 2.0, Alembic, Redis and JWT auth",
      "Background CSV bank-statement imports",
      "Amounts stored in integer paise for exact precision",
    ],
    tags: ["FastAPI", "SQLAlchemy", "Redis"],
  },
  {
    name: "CEX",
    kicker: "Prototype · trading systems",
    summary: "A simulated stock exchange with virtual INR wallets and JWT-secured APIs.",
    points: [
      "Market and limit orders, FIFO cost basis, portfolio P/L",
      "Alpha Vantage data behind a 5-minute cache with mock fallback",
      "Next.js 16, FastAPI and Supabase PostgreSQL",
    ],
    tags: ["Next.js 16", "FastAPI", "Supabase"],
    link: { label: "View on GitHub", href: "https://github.com/priyanshu14077/CEX" },
  },
]
