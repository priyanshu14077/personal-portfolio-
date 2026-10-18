// The /now and /uses pages. Edit these lists; the pages render whatever is here.

export const NOW_UPDATED = "2026-10-13"

export type NowItem = { label: string; text: string; link?: { label: string; href: string } }

export const LEETCODE_75 = "https://leetcode.com/studyplan/leetcode-75/"

export const now: NowItem[] = [
  {
    label: "Building",
    text: "Blog Studio, a local AI campaign manager that takes my posts from idea to commit. I'm adding GitHub sign-in to it.",
  },
  {
    label: "Learning",
    text: "How LLM systems are built, meaning agent loops, retrieval and evals, and the system design around them: latency, cost, caching and failure handling.",
  },
  {
    label: "Writing",
    text: "System Design 101, a series that started with the URL shortener.",
    link: { label: "Read it", href: "/blog/designing-a-url-shortener" },
  },
  {
    label: "Working",
    text: "Building agents on the Anthropic SDK at Proploy, one of three engineers. Open to forward deployed roles.",
    link: { label: "The Proploy case study", href: "/work/proploy" },
  },
  {
    label: "Listening to",
    text: "Jazz, hip hop, and a lot of Led Zeppelin and '70s and '80s rock.",
    link: { label: "Tune in to my radio", href: "#radio" },
  },
  {
    label: "Practising",
    text: "Data structures and algorithms, working through the LeetCode 75 study plan.",
    link: { label: "LeetCode 75", href: LEETCODE_75 },
  },
  {
    label: "Playing",
    text: "Badminton, cricket and basketball. I follow badminton closely, and I'm a big Luka Dončić fan.",
    link: { label: "Off the court", href: "#sports" },
  },
]

export type Tool = { name: string; why: string }
export type ToolGroup = { title: string; intro?: string; tools: Tool[] }

export const uses: ToolGroup[] = [
  {
    title: "How I work with AI",
    tools: [
      { name: "Claude Code", why: "Where most of my building happens. I plan the change with it, let it write the code, and review every diff before it lands." },
      { name: "Verify in a real browser", why: "Every UI change gets checked in a headless browser with Playwright, with screenshots, before I call it done." },
      { name: "Blog Studio", why: "My own tool for writing here: idea, outline, draft, a confidentiality check, then a commit. Built with Claude." },
      { name: "Hyperframes", why: "For short launch videos of what I build, written as HTML and rendered to MP4." },
    ],
  },
  {
    title: "Editor and terminal",
    tools: [
      { name: "VS Code", why: "With Claude Code inside it, so the agent and I share one view of the project." },
      { name: "Homebrew", why: "For system tools on an Apple silicon Mac." },
      { name: "uv", why: "Python environments and dependencies, fast enough that I never think about them." },
      { name: "GitHub CLI", why: "Pull requests and reviews without leaving the terminal." },
    ],
  },
  {
    title: "What I reach for when building",
    tools: [
      { name: "FastAPI", why: "For backends and agent services. Typed, async, and quick to stand up." },
      { name: "Next.js, or Vite with React", why: "Next.js for products, Vite when the site is mostly static, like this one." },
      { name: "Postgres with pgvector", why: "One database for app data, full-text search and embeddings, until there's a reason to split." },
      { name: "The Anthropic SDK", why: "Directly, without an agent framework, so I own the loop, the streaming and the failure handling." },
      { name: "Cloud Run and Vercel", why: "Cloud Run for services that stream or scale, Vercel for front ends." },
    ],
  },
]
