import type { LuminaSlide } from "@/components/ui/lumina-interactive-list"

// Live projects use screenshots of the real sites, framed. Prototypes without a
// public deploy use an illustration of what they do, captioned as such.
export const projects: LuminaSlide[] = [
  {
    title: "Proploy",
    meta: "Full-stack engineer and team lead, 2025 to now",
    description:
      "An AI software and expert marketplace. I led a team of five and built its agents on the native Anthropic SDK, including a RAG agent that cut research from three days to fifteen seconds.",
    media: "/projects/proploy.jpg",
    tags: ["Anthropic SDK", "FastAPI", "Next.js", "Cloud Run"],
    link: { label: "Visit proploy.io", href: "https://proploy.io" },
  },
  {
    title: "Dunne",
    meta: "Full-stack engineer and team lead, 2025",
    description:
      "A jewellery customisation store. I led a team of six to a platform serving 1,000+ concurrent shoppers at 99.9% uptime, with images loading 85% faster through CloudFront.",
    media: "/projects/dunne.jpg",
    tags: ["Next.js", "Nginx", "AWS CloudFront"],
    link: { label: "Visit dunne.co.in", href: "https://dunne.co.in" },
  },
  {
    title: "Emtech Solutions",
    meta: "Full-stack engineer, 2025",
    description:
      "The corporate site for an MEPF engineering firm, which I owned from design to deployment: 72+ projects across 12 sectors and a proposal form that brings in leads.",
    media: "/projects/emtech.jpg",
    tags: ["Next.js", "UI/UX design"],
    link: { label: "Visit the site", href: "https://emtec-landing-page.vercel.app" },
  },
  {
    title: "Tether",
    meta: "Independent build, live",
    description:
      "Finds the agencies that implement a SaaS product in its official partner directory, verifies which founders can be emailed, and runs a short, capped sequence to them.",
    media: "/projects/tether.jpg",
    tags: ["Python", "Resend", "React Flow"],
    link: { label: "Visit the live site", href: "https://site-two-pi-85.vercel.app/" },
  },
  {
    title: "Bidwright",
    meta: "Independent build",
    description:
      "RFP intake for architecture practices. It reads a pack of documents, cites every extracted value to a line on a page, and flags where the documents disagree.",
    media: "/projects/bidwright.jpg",
    tags: ["Python", "FastAPI", "React", "PostgreSQL"],
    link: { label: "View on GitHub", href: "https://github.com/priyanshu14077/Bidwright" },
    caption: "Illustration",
  },
  {
    title: "Riverline voice agent",
    meta: "Independent build",
    description:
      "A real-time voice agent for collection calls, in Hindi and English. Speech streams through STT, an LLM and TTS while a state machine, not the prompt, steers the call.",
    media: "/projects/riverline.jpg",
    tags: ["TypeScript", "Node.js", "Python", "XState"],
    link: { label: "View on GitHub", href: "https://github.com/priyanshu14077/voice-agent-orchestrator" },
    caption: "Illustration",
  },
  {
    title: "Flowforge",
    meta: "Independent build",
    description:
      "A drag-and-drop builder for AI workflows. An async engine runs LLM, HTTP and condition nodes in order, triggered by webhooks, with Groq for fast LLM steps.",
    media: "/projects/flowforge.jpg",
    tags: ["Node.js", "TypeScript", "Prisma", "Groq"],
    link: { label: "View on GitHub", href: "https://github.com/priyanshu14077/Flowforge" },
    caption: "Illustration",
  },
  {
    title: "Taxops",
    meta: "Independent build",
    description:
      "A tax and expense copilot for Indian solopreneurs. Bank statements import in the background, and every amount is stored in whole paise so totals never drift.",
    media: "/projects/taxops.jpg",
    tags: ["FastAPI", "SQLAlchemy", "Redis"],
    caption: "Illustration",
  },
  {
    title: "CEX",
    meta: "Independent build",
    description:
      "A simulated stock exchange with virtual rupee wallets: market and limit orders, FIFO cost basis and live P/L, on cached market data for ten US stocks.",
    media: "/projects/cex.jpg",
    tags: ["Next.js 16", "FastAPI", "Supabase"],
    link: { label: "View on GitHub", href: "https://github.com/priyanshu14077/CEX" },
    caption: "Illustration",
  },
]
