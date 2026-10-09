// Content for the sections below the scroll chapters. Every figure here is from the resume.

export type Impact = { value: string; label: string; context: string }

export const impact: Impact[] = [
  { value: "3d → 15s", label: "Research turnaround", context: "Claude RAG agent at Proploy" },
  { value: "1,000+", label: "Concurrent users", context: "Customization platform at Dunne" },
  { value: "99.9%", label: "Uptime", context: "Same platform, in production" },
  { value: "−85%", label: "Image load time", context: "From 3s+ to under 200ms at Dunne" },
  { value: "−40%", label: "Infrastructure cost", context: "Auto-scaling Cloud Run at Proploy" },
  { value: "<50ms", label: "Search latency", context: "Tuned Supabase Postgres at Proploy" },
]

export type CaseStudy = {
  name: string
  kind: "client" | "independent"
  /** What kind of system it is. */
  category: string
  /** Dates for client work; independent builds are marked as such. */
  period: string
  role: string
  /** One sentence: the problem the work answers. */
  problem: string
  /** Exactly three points, so every card carries the same weight. */
  built: [string, string, string]
  /** Exactly three facts, numbers where the work has them. */
  facts: [Fact, Fact, Fact]
  stack: string[]
  link?: { label: string; href: string }
  /** Featured builds span the full row and show real screenshots. */
  featured?: boolean
  screenshots?: { src: string; alt: string }[]
}

export type Fact = { value: string; label: string }

const GH = "https://github.com/priyanshu14077"

export const caseStudies: CaseStudy[] = [
  {
    name: "Proploy",
    kind: "client",
    category: "AI procurement",
    period: "Oct 2025 – present",
    role: "Full-stack engineer and team lead, team of 5",
    problem: "Procurement research was manual: about three days of digging for every request.",
    built: [
      "Claude-based RAG agent on the native Anthropic SDK",
      "Real-time SSE streaming chat with Redis caching",
      "Supabase Postgres tuned with RLS and GIN indexes, on auto-scaling Cloud Run",
    ],
    facts: [
      { value: "15s", label: "research, down from 3 days" },
      { value: "<50ms", label: "search latency" },
      { value: "−40%", label: "infrastructure cost" },
    ],
    stack: ["Anthropic SDK", "FastAPI", "Next.js", "Cloud Run"],
    link: { label: "Visit proploy.io", href: "https://proploy.io" },
  },
  {
    name: "Dunne",
    kind: "client",
    category: "Jewellery e-commerce",
    period: "Jun 2025 – Jan 2026",
    role: "Full-stack engineer and team lead, team of 6",
    problem: "A customisation store had to hold up under heavy traffic while product images took 3s+ to load.",
    built: [
      "Led a team of six from build to launch",
      "The jewellery customisation platform, end to end",
      "A Next.js, Nginx and AWS CloudFront image pipeline",
    ],
    facts: [
      { value: "1,000+", label: "concurrent users" },
      { value: "99.9%", label: "uptime" },
      { value: "<200ms", label: "image load, from 3s+" },
    ],
    stack: ["Next.js", "Nginx", "AWS CloudFront", "S3"],
    link: { label: "Visit dunne.co.in", href: "https://dunne.co.in" },
  },
  {
    name: "Emtech Solutions",
    kind: "client",
    category: "MEPF engineering",
    period: "Apr 2025 – Jun 2025",
    role: "Full-stack engineer, sole owner",
    problem: "An engineering firm needed to show its portfolio and turn visitors into business leads.",
    built: [
      "UI/UX design through to production deployment",
      "A responsive Next.js site with certifications and careers pages",
      "A proposal-request form that captures inbound leads",
    ],
    facts: [
      { value: "72+", label: "projects showcased" },
      { value: "12", label: "sectors covered" },
      { value: "1", label: "engineer, design to deploy" },
    ],
    stack: ["Next.js", "Tailwind CSS", "UI/UX design"],
    link: { label: "Visit the site", href: "https://emtec-landing-page.vercel.app" },
  },
  {
    name: "Tether",
    kind: "independent",
    category: "Partner outreach automation",
    period: "Independent build",
    role: "Solo build, live on Vercel",
    problem:
      "Every SaaS product has a ring of small implementation agencies, but finding a founder at each one you can actually email is slow, manual work.",
    built: [
      "Reads official SaaS partner directories into one store, counting a firm listed by five vendors once",
      "Keeps firms under 100 people and ships only addresses the firm printed or that match its own domain format",
      "A capped intro, day-3 and day-10 sequence from your own Resend domain that stops the moment someone replies",
    ],
    facts: [
      { value: "23", label: "partner directories read" },
      { value: "14,008", label: "partner firms found" },
      { value: "4,897", label: "addresses that pass every check" },
    ],
    stack: ["Python", "Resend", "React Flow"],
    link: { label: "Visit the live site", href: "https://site-two-pi-85.vercel.app/" },
    featured: true,
    screenshots: [
      { src: "/projects/tether-app.jpg", alt: "Tether's pipeline view: a HubSpot partner directory linked to five agencies and their founders" },
      { src: "/projects/tether-how.jpg", alt: "Tether's how-it-works steps beside a terminal dry run of the send command" },
    ],
  },
  {
    name: "Bidwright",
    kind: "independent",
    category: "AI document extraction",
    period: "Independent build",
    role: "Solo build, design to deploy",
    problem: "Pricing a bid means reading every document in an RFP pack by hand and catching where they disagree.",
    built: [
      "Extraction that cites every value to a line on a page",
      "Flags where documents in the same pack disagree",
      "Per-workspace isolation with Postgres row-level security and four roles",
    ],
    facts: [
      { value: "Cited", label: "every extracted value" },
      { value: "RLS", label: "isolation per workspace" },
      { value: "4", label: "invite-only roles" },
    ],
    stack: ["Python", "FastAPI", "React", "PostgreSQL"],
    link: { label: "View on GitHub", href: `${GH}/Bidwright` },
  },
  {
    name: "Riverline voice agent",
    kind: "independent",
    category: "Real-time voice AI",
    period: "Independent build",
    role: "Solo build",
    problem: "Collection calls need an agent that can listen, talk and be interrupted, in Hindi or English.",
    built: [
      "A streaming speech-to-text, LLM and text-to-speech pipeline over WebSockets",
      "An XState machine runs the conversation, not the prompt",
      "A pub/sub event bus with no direct coupling between services",
    ],
    facts: [
      { value: "<800ms", label: "latency target" },
      { value: "2", label: "languages: Hindi, English" },
      { value: "Live", label: "barge-in mid-sentence" },
    ],
    stack: ["TypeScript", "Node.js", "Python", "XState"],
    link: { label: "View on GitHub", href: `${GH}/voice-agent-orchestrator` },
  },
  {
    name: "Flowforge",
    kind: "independent",
    category: "AI workflow automation",
    period: "Independent build",
    role: "Solo build",
    problem: "Teams want to chain LLM calls and APIs into automations without writing glue code each time.",
    built: [
      "A drag-and-drop canvas for building workflows",
      "An async engine that runs nodes in topological order",
      "Webhook-triggered runs with Groq for fast LLM steps",
    ],
    facts: [
      { value: "3", label: "node types: LLM, HTTP, condition" },
      { value: "Async", label: "webhook-triggered runs" },
      { value: "Groq", label: "fast LLM steps" },
    ],
    stack: ["Node.js", "TypeScript", "Prisma", "Neon Postgres"],
    link: { label: "View on GitHub", href: `${GH}/Flowforge` },
  },
  {
    name: "Solana prediction market",
    kind: "independent",
    category: "On-chain systems",
    period: "Independent build",
    role: "Solo build",
    problem: "A parimutuel prediction market, written so the whole program can be read end to end.",
    built: [
      "An Anchor program with one file per instruction",
      "Payout maths kept separate and unit-tested",
      "TypeScript integration tests against a local validator",
    ],
    facts: [
      { value: "Rust", label: "Anchor program" },
      { value: "Binary", label: "parimutuel markets" },
      { value: "Tested", label: "maths and integration" },
    ],
    stack: ["Rust", "Anchor", "Solana", "TypeScript"],
    link: { label: "View on GitHub", href: `${GH}/anchor` },
  },
  {
    name: "Taxops",
    kind: "independent",
    category: "Fintech copilot",
    period: "Independent build",
    role: "Solo build",
    problem: "Indian solopreneurs track tax and expenses across bank statements by hand.",
    built: [
      "An async FastAPI backend with SQLAlchemy 2.0 and Alembic",
      "Bank-statement CSV imports processed in the background",
      "JWT authentication and Redis caching",
    ],
    facts: [
      { value: "Paise", label: "integer money maths" },
      { value: "Async", label: "background imports" },
      { value: "JWT", label: "authenticated API" },
    ],
    stack: ["Python", "FastAPI", "SQLAlchemy", "Redis"],
  },
  {
    name: "CEX",
    kind: "independent",
    category: "Trading systems",
    period: "Independent build",
    role: "Solo build",
    problem: "A safe place to practise trading: a simulated exchange with virtual rupee wallets.",
    built: [
      "Market and limit orders with wallet transaction tracking",
      "FIFO cost basis and portfolio P/L",
      "Alpha Vantage data behind a 5-minute cache with a mock fallback",
    ],
    facts: [
      { value: "2", label: "order types" },
      { value: "FIFO", label: "cost basis and P/L" },
      { value: "10", label: "US stocks supported" },
    ],
    stack: ["Next.js 16", "FastAPI", "Supabase"],
    link: { label: "View on GitHub", href: `${GH}/CEX` },
  },
]

export type ToolGroup = { name: string; tools: string[] }

export const toolbelt: ToolGroup[] = [
  {
    name: "AI / LLM",
    tools: ["Anthropic SDK (Claude)", "Agentic workflows", "RAG pipelines", "LangChain", "LangGraph", "Amazon Bedrock", "Qdrant", "Groq"],
  },
  {
    name: "Backend & distributed",
    tools: ["FastAPI", "Node.js", "NestJS", "Event-driven (Pub/Sub)", "SSE streaming", "Redis caching", "JWT auth"],
  },
  {
    name: "Cloud & DevOps",
    tools: ["GCP Cloud Run", "GCP Pub/Sub", "AWS EC2, S3 and Lambda", "CloudFront", "Docker", "Kubernetes", "Nginx", "CI/CD"],
  },
  {
    name: "Data",
    tools: ["PostgreSQL", "Supabase", "Redis", "MongoDB", "Prisma", "SQLAlchemy"],
  },
  {
    name: "Frontend",
    tools: ["React", "Next.js", "React Native", "Tailwind CSS"],
  },
  {
    name: "Languages",
    tools: ["Python", "TypeScript", "JavaScript", "Go", "SQL"],
  },
]
