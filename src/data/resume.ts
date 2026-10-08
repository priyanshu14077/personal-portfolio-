import type { TornPostcardPortfolioProps } from "@/components/ui/torn-postcard-portfolio"

export const GITHUB_USER = "priyanshu14077"

export const resume = {
  name: "Priyanshu Kumar Singh",
  role: "Forward deployed engineer · AI agents in production",
  location: "New Delhi, India",
  since: "2025",
  headline: ["I embed with your team", "and ship AI to production."],
  intro: "Forward deployed engineer. I sit with the people who have the problem, build on their real data, and deliver AI agents and backends that run on their stack.",
  note: "3 field deployments, measured in production",
  about: {
    title: "About me",
    subtitle: "A forward deployed engineer who owns the outcome, not just the ticket",
    text: "I work where the problem lives. For 1.5+ years I've embedded with product teams and their users, scoped what actually needed building, and shipped it to production on AWS and GCP. At Proploy that meant a Claude RAG agent that cut procurement research from 3 days to 15 seconds; at Dunne, a platform holding 1,000+ concurrent users at 99.9% uptime. When scope, tooling or priorities shift mid-engagement, delivery doesn't slip.",
    facts: [
      { label: "Based in", value: "New Delhi, India" },
      { label: "Role", value: "Forward deployed engineer" },
      { label: "Track record", value: "3 client deployments · led teams of 5 and 6" },
      { label: "Education", value: "B.Tech, Automation & Robotics · GGSIPU, 2026" },
    ],
    skills: ["Anthropic SDK", "RAG & agents", "FastAPI", "Next.js", "PostgreSQL", "Redis", "GCP + AWS", "Rapid prototyping"],
  },
  projects: [
    {
      name: "Proploy",
      year: "2025",
      role: "Forward deployed · team lead",
      description:
        "Led a team of five to build an AI-powered procurement platform on the native Anthropic SDK. Engineered a Claude RAG agent, real-time SSE streaming with Redis caching, and Supabase PostgreSQL search tuned to under 50ms; deployed on auto-scaling Cloud Run at 40% lower infrastructure cost.",
      tags: ["Anthropic SDK", "FastAPI", "Next.js", "Cloud Run"],
      url: "https://proploy.io",
      note: "research: 3 days → 15 seconds",
      scene: "peak",
    },
    {
      name: "Dunne",
      year: "2025",
      role: "Forward deployed · team lead",
      description:
        "Led a team of six to deliver a jewelry customization platform serving 1,000+ concurrent users at 99.9% uptime. Architected a Next.js, Nginx and AWS CloudFront delivery pipeline that cut image TTFB by 85%, from 3s+ to under 200ms.",
      tags: ["Next.js", "Nginx", "CloudFront"],
      url: "https://dunne-app.vercel.app",
      note: "image TTFB down 85%",
      scene: "sun",
    },
    {
      name: "Emtech Solutions",
      year: "2025",
      role: "Client delivery · sole engineer",
      description:
        "Owned the corporate website for an MEPF engineering firm end to end, from UI/UX design to production. A responsive Next.js site presenting 72+ projects across 12 sectors, with certifications, careers and a proposal-request form that captures inbound leads.",
      tags: ["Next.js", "UI/UX"],
      url: "https://emtec-landing-page.vercel.app",
      note: "72+ projects, 12 sectors",
      scene: "dawn",
    },
    {
      name: "Flowforge",
      year: "2025",
      role: "Prototype · AI workflows",
      description:
        "A visual, drag-and-drop AI workflow builder. Its async execution engine runs LLM, HTTP and Condition nodes in topological order, supports webhook-triggered runs, and uses Groq LPU inference for low-latency LLM steps.",
      tags: ["Node.js", "TypeScript", "Prisma", "Groq"],
      url: `https://github.com/${GITHUB_USER}/Flowforge`,
      note: "workflows as executable graphs",
      scene: "river",
    },
    {
      name: "Taxops",
      year: "2026",
      role: "Prototype · fintech copilot",
      description:
        "An AI-native tax and expense copilot for Indian solopreneurs. An async FastAPI backend with SQLAlchemy 2.0, Alembic, Redis and JWT authentication, with background CSV bank-statement imports stored in integer paise for exact financial precision.",
      tags: ["FastAPI", "SQLAlchemy", "Redis"],
      note: "precise to the paisa",
      scene: "lake",
    },
    {
      name: "CEX",
      year: "2026",
      role: "Prototype · trading systems",
      description:
        "A simulated stock exchange with virtual INR wallets and JWT-secured APIs. Supports market and limit orders, FIFO cost basis and portfolio P/L, with Alpha Vantage market data behind a 5-minute cache and a mock-data fallback.",
      tags: ["Next.js 16", "FastAPI", "Supabase"],
      url: `https://github.com/${GITHUB_USER}/CEX`,
      note: "market & limit orders, FIFO P/L",
      scene: "night",
    },
  ],
  route: [
    {
      org: "Emtech Solutions",
      year: "Apr – Jun 2025",
      title: "Full-stack engineer",
      place: "MEPF engineering",
      text: "Owned the firm's corporate website end to end, from UI/UX design to production: 72+ projects across 12 sectors and a proposal-request form for inbound leads.",
    },
    {
      org: "Dunne",
      year: "Jun 2025 – Jan 2026",
      title: "Full-stack engineer & team lead",
      place: "Jewelry customization",
      text: "Led a team of six. Served 1,000+ concurrent users at 99.9% uptime and cut image TTFB 85% with a Next.js, Nginx and CloudFront pipeline.",
    },
    {
      org: "Proploy",
      year: "Oct 2025 – now",
      title: "Full-stack engineer & team lead",
      place: "AI procurement",
      text: "Leading a team of five on agents built with the Anthropic SDK. A Claude RAG agent cut research from 3 days to 15 seconds; Cloud Run cut infra cost 40%.",
    },
  ],
  email: "kumarpriyanshu20012@gmail.com",
  links: [
    { label: "GitHub", url: `https://github.com/${GITHUB_USER}` },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/priyanshu-kumar-singh14/" },
  ],
  labels: ["Home", "About", "Work", "Experience", "Contact"],
  workTitle: "Deployments & prototypes",
  routeTitle: "Experience",
  contactTitle: "Bring me your hardest workflow",
} satisfies TornPostcardPortfolioProps
