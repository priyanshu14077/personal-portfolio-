import type { MDXComponents } from "mdx/types"
import { Anchor } from "@/components/blog/mdx/anchor"
import { Callout } from "@/components/blog/mdx/callout"
import { CodeBlock } from "@/components/blog/mdx/code-block"
import { Figure } from "@/components/blog/mdx/figure"
import { H2, H3, H4 } from "@/components/blog/mdx/heading"
import { Takeaways, TLDR } from "@/components/blog/mdx/key-points"
import { Mermaid } from "@/components/blog/mdx/mermaid"
import { References } from "@/components/blog/mdx/references"
import { Step, Steps } from "@/components/blog/mdx/steps"
import { Tradeoffs } from "@/components/blog/mdx/tradeoffs"

/** Everything a post can use without importing it. */
export const mdxComponents: MDXComponents = {
  a: Anchor,
  h2: H2,
  h3: H3,
  h4: H4,
  pre: CodeBlock,
  Callout,
  Figure,
  Mermaid,
  Steps,
  Step,
  Tradeoffs,
  TLDR,
  Takeaways,
  References,
}
