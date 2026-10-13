The post body is MDX. You can use these components without importing them. Use only these:

<Callout type="note|tip|warning|insight" title="Optional title">Markdown text.</Callout>
<Figure caption="Caption sentence.">
  <Mermaid label="Accessible description" chart={`
flowchart LR
  A["Client"] --> B["API"]
`} />
</Figure>
<Steps>
  <Step title="Short title">What happens.</Step>
</Steps>
<Tradeoffs title="Option A vs option B" pros={["Reason for"]} cons={["Reason against"]} />
<Takeaways>
- Point to remember.
</Takeaways>
<References>
- [Title](https://example.com), one line on why it is worth reading.
</References>

Also available: GitHub-flavoured Markdown tables, footnotes ([^1]), and fenced code blocks with a title and highlighted lines, for example ```ts title="cache.ts" {3}.

Mermaid rules: use flowchart LR, flowchart TB or sequenceDiagram. Put every node label in quotes inside brackets, like A["Label"]. Use <br/> for line breaks inside labels. Keep diagrams to about 10 nodes. Escape backticks: never use a backtick inside a chart.

Structure rules:
- Do not write frontmatter, a title, or a TL;DR. The site renders those from the outline.
- Start with the first "## " section. Use ## and ### headings only.
- End with <Takeaways>, then <References>.
- In References, include only sources from the author's notes, or official documentation and well-known papers whose exact URL you are certain of. If unsure, leave a source out. A short list is fine.
- Prefer one or two diagrams that show the real mechanism over many decorative ones.
