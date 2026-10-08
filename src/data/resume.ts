import type { TornPostcardPortfolioProps } from "@/components/ui/torn-postcard-portfolio"

export const GITHUB_USER = "priyanshu14077"

export const resume = {
  name: "Priyanshu Kumar Singh",
  role: "Distributed systems & full-stack engineer",
  location: "New Delhi, India",
  since: "2025",
  headline: ["AI systems that turn days", "of work into seconds."],
  intro: "I design and ship production AI agents, real-time backends and cloud infrastructure that stay fast and reliable at scale.",
  note: "6 production builds, from agents to exchanges",
  about: {
    title: "About me",
    subtitle: "Full-stack engineer focused on distributed systems and LLM platforms",
    text: "For 1.5+ years I've built production AI and backend systems on AWS and GCP. At Proploy I engineered a Claude-based RAG agent that cut manual research from 3 days to 15 seconds; at Dunne I led delivery of a platform serving 1,000+ concurrent users at 99.9% uptime. I take features from system design to deployment, and I keep delivery on schedule when scope, tooling or priorities shift.",
    facts: [
      { label: "Based in", value: "New Delhi, India" },
      { label: "Focus", value: "Distributed systems & AI/LLM platforms" },
      { label: "Experience", value: "1.5+ years · led teams of 5 and 6" },
      { label: "Education", value: "B.Tech, Automation & Robotics · GGSIPU, 2026" },
    ],
    skills: ["Python", "TypeScript", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Anthropic SDK", "GCP + AWS"],
  },
  projects: [
    {
      name: "Proploy",
      year: "2025",
      role: "Full-stack engineer & team lead",
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
      role: "Full-stack engineer & team lead",
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
      role: "Full-stack engineer",
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
      role: "Side project",
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
      role: "Side project",
      description:
        "An AI-native tax and expense copilot for Indian solopreneurs. An async FastAPI backend with SQLAlchemy 2.0, Alembic, Redis and JWT authentication, with background CSV bank-statement imports stored in integer paise for exact financial precision.",
      tags: ["FastAPI", "SQLAlchemy", "Redis"],
      note: "precise to the paisa",
      scene: "lake",
    },
    {
      name: "CEX",
      year: "2026",
      role: "Side project",
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
      year: "2022",
      title: "B.Tech, GGSIPU",
      place: "New Delhi",
      text: "Began a degree in Automation and Robotics while building full-stack projects alongside coursework.",
    },
    {
      year: "2025",
      title: "Full-stack engineer, Emtech",
      place: "New Delhi",
      text: "Delivered a corporate website end to end, from UI/UX design through production deployment.",
    },
    {
      year: "2025",
      title: "Full-stack engineer & team lead, Dunne",
      place: "Remote",
      text: "Led a team of six. Scaled to 1,000+ concurrent users at 99.9% uptime and cut image load times by 85%.",
    },
    {
      year: "2025",
      title: "Full-stack engineer & team lead, Proploy",
      place: "Remote",
      text: "Leading a team of five on an AI procurement platform: Claude agents, real-time streaming and Cloud Run infrastructure.",
    },
    {
      year: "2026",
      title: "Graduated, B.Tech (GPA 8.0)",
      place: "New Delhi",
      text: "Continuing at Proploy and open to roles in distributed systems and AI platform engineering.",
    },
  ],
  email: "kumarpriyanshu20012@gmail.com",
  links: [
    { label: "GitHub", url: `https://github.com/${GITHUB_USER}` },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/priyanshu-kumar-singh14/" },
  ],
  labels: ["Home", "About", "Work", "Experience", "Contact"],
  workTitle: "Selected work",
  routeTitle: "Experience",
  contactTitle: "Let's build something together",
} satisfies TornPostcardPortfolioProps
