import type { TornPostcardPortfolioProps } from "@/components/ui/torn-postcard-portfolio"

export const GITHUB_USER = "priyanshu14077"

export const resume = {
  name: "Priyanshu Kumar Singh",
  role: "Distributed systems & full-stack engineer",
  location: "New Delhi, India",
  since: "2025",
  headline: ["Three days of research,", "done in fifteen seconds."],
  intro: "Production AI and backend systems on AWS and GCP: agents, streams and search that hold up under load.",
  note: "6 builds worth a slow look",
  about: {
    title: "Postcard",
    subtitle: "Distributed systems, full-stack, and agents built on the Anthropic SDK",
    text: "I've spent 1.5+ years shipping production AI and backend systems on AWS and GCP. I built a Claude agent that cut research from 3 days to 15 seconds, and scaled a platform to 1,000+ concurrent users at 99.9% uptime. I own features from design to deploy, and when scope, tooling or priorities change, the delivery date doesn't.",
    facts: [
      { label: "Based in", value: "New Delhi, India" },
      { label: "Doing", value: "Full-stack + AI/LLM platforms" },
      { label: "Experience", value: "1.5+ years, led teams of 5 and 6" },
      { label: "Studying", value: "B.Tech, Automation & Robotics, GGSIPU '26" },
    ],
    skills: ["Python", "TypeScript", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Anthropic SDK", "GCP + AWS"],
  },
  projects: [
    {
      name: "Proploy",
      year: "2025",
      role: "Full-stack engineer & team lead",
      description:
        "An AI-powered procurement platform built around agents on the native Anthropic SDK. A Claude RAG agent, SSE streaming chat with Redis caching, and Supabase search tuned to under 50ms.",
      tags: ["Anthropic SDK", "FastAPI", "Next.js", "Cloud Run"],
      url: "https://proploy.io",
      note: "3 days of research → 15 seconds",
      scene: "peak",
    },
    {
      name: "Dunne",
      year: "2025",
      role: "Full-stack engineer & team lead",
      description:
        "A jewelry customization platform serving 1,000+ concurrent users at 99.9% uptime. A Next.js, Nginx and CloudFront pipeline cut image TTFB from 3s+ to under 200ms.",
      tags: ["Next.js", "Nginx", "CloudFront"],
      url: "https://dunne-app.vercel.app",
      note: "image TTFB down 85%",
      scene: "sun",
    },
    {
      name: "Emtech Solutions",
      year: "2025",
      role: "Full-stack engineer",
      description:
        "A corporate site for an MEPF engineering firm, owned from UI/UX design to production: 72+ projects across 12 sectors, certifications, careers and a proposal-request form for inbound leads.",
      tags: ["Next.js", "UI/UX"],
      url: "https://emtec-landing-page.vercel.app",
      note: "72 projects, 12 sectors",
      scene: "dawn",
    },
    {
      name: "Flowforge",
      year: "2025",
      role: "Side project",
      description:
        "A drag-and-drop AI workflow builder. An async engine runs LLM, HTTP and Condition nodes in topological order, with webhook-triggered runs and Groq inference for low-latency LLM steps.",
      tags: ["Node.js", "TypeScript", "Prisma", "Groq"],
      url: `https://github.com/${GITHUB_USER}/Flowforge`,
      note: "workflows as graphs",
      scene: "river",
    },
    {
      name: "Taxops",
      year: "2026",
      role: "Side project",
      description:
        "An AI-native tax and expense copilot for Indian solopreneurs. Async FastAPI with SQLAlchemy 2.0, Alembic, Redis and JWT auth, plus background CSV bank-statement imports kept in integer paise.",
      tags: ["FastAPI", "SQLAlchemy", "Redis"],
      note: "every paisa accounted for",
      scene: "lake",
    },
    {
      name: "CEX",
      year: "2026",
      role: "Side project",
      description:
        "A simulated exchange with virtual INR wallets: market and limit orders, FIFO cost basis, portfolio P/L, and Alpha Vantage data behind a 5-minute cache with a mock fallback.",
      tags: ["Next.js 16", "FastAPI", "Supabase"],
      url: `https://github.com/${GITHUB_USER}/CEX`,
      note: "market + limit orders",
      scene: "night",
    },
  ],
  route: [
    {
      year: "2022",
      title: "Started B.Tech at GGSIPU",
      place: "New Delhi",
      text: "Automation and Robotics. Taught myself the web on the side and kept building.",
    },
    {
      year: "2025",
      title: "Full-stack engineer, Emtech",
      place: "New Delhi",
      text: "Owned a corporate site end to end, from the first wireframe to production.",
    },
    {
      year: "2025",
      title: "Team lead, Dunne",
      place: "Remote",
      text: "Led six engineers. 1,000+ concurrent users at 99.9% uptime, images in under 200ms.",
    },
    {
      year: "2025",
      title: "Team lead, Proploy",
      place: "Remote",
      text: "Led five engineers on an AI procurement platform. Claude agents, SSE streams, Cloud Run.",
    },
    {
      year: "2026",
      title: "Graduated, GPA 8.0",
      place: "New Delhi",
      text: "Still at Proploy, shipping agents. Open to distributed systems and AI platform roles.",
    },
  ],
  email: "kumarpriyanshu20012@gmail.com",
  links: [
    { label: "GitHub", url: `https://github.com/${GITHUB_USER}` },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/priyanshu-kumar-singh14/" },  ],
  labels: ["Cover", "About", "Work", "Route", "Write"],
  workTitle: "Work: shipped and built",
  routeTitle: "The route so far",
  contactTitle: "Write me a postcard",
} satisfies TornPostcardPortfolioProps
