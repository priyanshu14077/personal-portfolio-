// The "How I work" wheel. Deliberately client-agnostic: it explains the method and
// the technical depth behind it, not any one project. Projects live in the case studies.

export type WheelCardKind = "step" | "capability"

export type WheelCard = {
  id: string
  kind: WheelCardKind
  title: string
  /** One line on the card face. */
  tagline: string
  /** The detail panel. */
  summary: string
  points: string[]
}

export const steps: WheelCard[] = [
  {
    id: "discover",
    kind: "step",
    title: "Discover",
    tagline: "Learn the work before writing the code.",
    summary:
      "I sit with the people who own the problem and learn the workflow as they live it: where the hours go, what can't break, and who has to sign off.",
    points: [
      "Shadow the team and map the workflow end to end",
      "Collect constraints: data access, compliance, the existing stack",
      "Pick the one bottleneck worth automating first",
    ],
  },
  {
    id: "scope",
    kind: "step",
    title: "Scope",
    tagline: "Turn the pain into a spec everyone signs.",
    summary:
      "The problem becomes something an engineer can build and a stakeholder can approve: users, data, guardrails and one metric that defines done.",
    points: [
      "Write the job to be done in the team's own words",
      "Agree the success metric before building anything",
      "Set guardrails up front, such as citing every source",
    ],
  },
  {
    id: "build",
    kind: "step",
    title: "Build",
    tagline: "A working AI system on the team's real data.",
    summary:
      "I prototype in days, not weeks, on the team's own data, so feedback is about the real thing rather than a mock-up.",
    points: [
      "Retrieval over the team's documents and records",
      "An LLM for reasoning, with answers traced back to sources",
      "Weekly demos to the people who will use it",
    ],
  },
  {
    id: "ship",
    kind: "step",
    title: "Ship",
    tagline: "Own it in production, then measure it.",
    summary:
      "Production is part of the job: streaming, caching, auto-scaling, and a dashboard that shows whether the metric moved.",
    points: [
      "Containerised services on auto-scaling cloud infrastructure",
      "Monitoring, cost tracking and on-call ownership",
      "A hand-over the team can run without me",
    ],
  },
]

export const capabilities: WheelCard[] = [
  {
    id: "rag",
    kind: "capability",
    title: "Retrieval & RAG",
    tagline: "Grounded answers from a team's own knowledge.",
    summary:
      "Most business AI is a retrieval problem. I build pipelines that find the right context fast and make every answer traceable.",
    points: [
      "Chunking and indexing tuned to the documents",
      "Hybrid search: Postgres full-text with GIN indexes, plus vectors in Qdrant",
      "Citations back to the source, so answers can be checked",
    ],
  },
  {
    id: "agents",
    kind: "capability",
    title: "Agents & tool use",
    tagline: "LLMs that plan, call tools and check their work.",
    summary:
      "When one prompt isn't enough, I build agents that break the task down, call real systems, and stop when the job is done.",
    points: [
      "Native Anthropic SDK tool use, LangChain and LangGraph",
      "Clear tool contracts and guardrails around side effects",
      "Human review where a wrong action would be costly",
    ],
  },
  {
    id: "realtime",
    kind: "capability",
    title: "Real-time UX",
    tagline: "Answers that stream in, not spin.",
    summary:
      "People trust an AI tool they can watch working. I stream responses token by token and cache what doesn't need recomputing.",
    points: [
      "Server-sent events from FastAPI to React and Next.js",
      "Redis caching for repeated queries and sessions",
      "Interfaces that show progress, sources and errors plainly",
    ],
  },
  {
    id: "scale",
    kind: "capability",
    title: "Production & scale",
    tagline: "Systems that hold up when real users arrive.",
    summary:
      "I design for the traffic and the bill: event-driven services, auto-scaling, and delivery paths that keep latency low.",
    points: [
      "Docker on GCP Cloud Run and AWS, scaling to zero when idle",
      "Event-driven work with Pub/Sub and background jobs",
      "CDN and caching layers for fast delivery worldwide",
    ],
  },
]

/** What each card face shows, kept short so the wheel stays readable. */
export const faces: Record<string, string[]> = {
  discover: ["“This report takes two days every week.”", "“Every answer needs a source.”", "“It has to fit the tools we use.”"],
  scope: ["Users", "Data", "Guardrails", "Success metric"],
  build: ["Question", "Retrieve", "LLM", "Answer + sources"],
  ship: ["Containerise", "Deploy", "Auto-scale", "Measure"],
  rag: ["Docs", "Chunk", "Index", "Retrieve", "Cite"],
  agents: ["Plan", "Call tool", "Observe", "Answer"],
  realtime: ["Request", "Stream", "Cache"],
  scale: ["Container", "Cloud Run", "Pub/Sub", "CDN"],
}
