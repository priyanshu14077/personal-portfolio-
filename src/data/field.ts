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
    role: "Full-stack engineer and team lead, team of 5",
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
    role: "Full-stack engineer and team lead, team of 6",
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
    url: "https://dunne.co.in",
  },
  {
    client: "Emtech Solutions",
    sector: "MEPF engineering",
    period: "Apr 2025 – Jun 2025",
    role: "Full-stack engineer, sole owner",
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
