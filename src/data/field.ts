// Content for the sections below the scroll chapters. Every figure here is from the resume.

export type Impact = { value: string; label: string; context: string }

export const impact: Impact[] = [
  { value: "3d → 15s", label: "Research turnaround", context: "Claude RAG agent · Proploy" },
  { value: "1,000+", label: "Concurrent users", context: "Production platform · Dunne" },
  { value: "99.9%", label: "Uptime", context: "Production platform · Dunne" },
  { value: "−85%", label: "Image load time", context: "3s+ to under 200ms · Dunne" },
  { value: "−40%", label: "Infrastructure cost", context: "Auto-scaling Cloud Run · Proploy" },
  { value: "<50ms", label: "Search latency", context: "Tuned Supabase Postgres · Proploy" },
]

export type PlaybookStep = {
  step: string
  title: string
  text: string
  /** Where this step showed up in real work. */
  example: string
}

export const playbook: PlaybookStep[] = [
  {
    step: "01",
    title: "Embed",
    text: "Start with the people who have the problem. Map the workflow, the data and the constraints before writing any code.",
    example: "Proploy: procurement research that took analysts three days per request.",
  },
  {
    step: "02",
    title: "Prototype",
    text: "Put a working version in front of users fast, built on their real data, so feedback is about the product and not a mock-up.",
    example: "Flowforge: LLM, HTTP and Condition nodes running as a live graph.",
  },
  {
    step: "03",
    title: "Deploy",
    text: "Ship to production on the team's own stack: auth, streaming, caching, auto-scaling, and the delivery path to users.",
    example: "Dunne: a Next.js, Nginx and CloudFront pipeline serving 1,000+ users.",
  },
  {
    step: "04",
    title: "Measure & hand over",
    text: "Prove the result in numbers, then leave the team a system they can run, extend and trust without me.",
    example: "Proploy: research from 3 days to 15 seconds, infra cost down 40%.",
  },
]

export type Deployment = {
  client: string
  sector: string
  period: string
  role: string
  problem: string
  shipped: string[]
  outcome: { value: string; label: string }[]
  stack: string[]
  url?: string
}

export const deployments: Deployment[] = [
  {
    client: "Proploy",
    sector: "AI procurement",
    period: "Oct 2025 – present",
    role: "Full-stack engineer & team lead · team of 5",
    problem: "Procurement research was manual: about three days of digging for every request.",
    shipped: [
      "Claude-based RAG agent on the native Anthropic SDK",
      "Real-time SSE streaming chat (FastAPI + Next.js) with Redis caching",
      "Supabase PostgreSQL tuned with RLS and GIN indexes",
      "Auto-scaling deployment on GCP Cloud Run",
    ],
    outcome: [
      { value: "15s", label: "research, down from 3 days" },
      { value: "<50ms", label: "search" },
      { value: "−40%", label: "infra cost" },
    ],
    stack: ["Anthropic SDK", "FastAPI", "Next.js", "Redis", "Supabase", "Cloud Run"],
    url: "https://proploy.io",
  },
  {
    client: "Dunne",
    sector: "Jewelry e-commerce",
    period: "Jun 2025 – Jan 2026",
    role: "Full-stack engineer & team lead · team of 6",
    problem: "A customization platform had to hold up under heavy traffic, and product images took 3s+ to load.",
    shipped: [
      "Jewelry customization platform, delivered end to end",
      "Next.js, Nginx and AWS CloudFront image delivery pipeline",
    ],
    outcome: [
      { value: "1,000+", label: "concurrent users" },
      { value: "99.9%", label: "uptime" },
      { value: "<200ms", label: "image TTFB" },
    ],
    stack: ["Next.js", "Nginx", "AWS CloudFront", "S3"],
    url: "https://dunne-app.vercel.app",
  },
  {
    client: "Emtech Solutions",
    sector: "MEPF engineering",
    period: "Apr 2025 – Jun 2025",
    role: "Full-stack engineer · sole owner",
    problem: "An engineering firm needed to present its portfolio and turn visitors into business leads.",
    shipped: [
      "UI/UX design through to production deployment",
      "Responsive Next.js site with certifications and careers pages",
      "Proposal-request form that captures inbound leads",
    ],
    outcome: [
      { value: "72+", label: "projects showcased" },
      { value: "12", label: "sectors" },
    ],
    stack: ["Next.js", "Tailwind CSS", "UI/UX"],
    url: "https://emtec-landing-page.vercel.app",
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
    tools: ["GCP Cloud Run", "GCP Pub/Sub", "AWS EC2 · S3 · Lambda", "CloudFront", "Docker", "Kubernetes", "Nginx", "CI/CD"],
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
