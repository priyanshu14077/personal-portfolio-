# Priyanshu Kumar Singh — Portfolio

Personal portfolio for Priyanshu Kumar Singh, a forward deployed engineer who embeds with teams and ships AI agents and production backends.

The site is a scroll-driven story in five chapters (Home, About, Work, Experience, Contact), each tearing open like paper to reveal the next, followed by a "How I work" wheel (four steps and four capabilities, client-agnostic), a WebGL projects slider with screenshots of the live sites, impact metrics, case studies, the stack, and a 3D skyline of a year of GitHub contributions.

## Stack

- Vite, React 19, TypeScript
- Tailwind CSS v4, shadcn project structure (`@/components/ui`)
- Deployed on Vercel from `master`

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Content

- Scroll-chapter copy lives in `src/data/resume.ts`; the sections below it read from `src/data/field.ts`.
- The GitHub skyline loads live data from `/api/contributions`, a Vercel function in `api/contributions.ts`. It reads the public contributions page on github.com, so it needs no token; set `GITHUB_TOKEN` in Vercel to use the GraphQL API instead. Vercel's CDN caches the answer for an hour. `src/data/contributions.json` is the fallback that shows first and stays if the request fails; refresh it with `npm run contributions` (requires the GitHub CLI, logged in).

## Blog

Posts are MDX files in `content/blog/`. Copy `content/blog/_template.mdx`, fill in the frontmatter, and drop `draft: true` to publish. Reading time, the index at `/blog`, tag pages at `/blog/tags/<tag>`, series banners, related posts, `rss.xml` and `sitemap.xml` all come from the frontmatter at build time. Drafts show in `npm run dev` and are hidden in production.

Inside a post you can use `<Callout>`, `<Figure>`, `<Mermaid>`, `<Steps>`/`<Step>`, `<Tradeoffs>`, `<Takeaways>` and `<References>` without importing them; fenced code blocks take a `title="file.ts"` and `{2,5-7}` line highlights. Set `SITE_URL` at build time so the feed carries the deployed origin.

Project case studies are MDX files in `content/case-studies/`, served at `/work/<slug>`. Link one from a project with `caseStudy` in `src/data/projects.ts` or `src/data/field.ts`, and add `project: <slug>` to a post's frontmatter to cross-link them.

## Blog Studio

Posts can be drafted with [Blog Studio](../blog-studio), a separate local tool that lives next to this repository. Its settings for this site are in `blog-studio.toml` and `.blog-studio/`. With it checked out at `../blog-studio`, `npm run studio` opens it on this site.

## Deployment

`vercel.json` limits automatic deployments to the `master` branch; pushes to other branches do not deploy. Merge to `master` to release.

## Credits

- Scroll-tear layout: [Torn Postcard Portfolio](https://21st.dev/@kedhareswer/templates/scroll-tear-portfolio-website-template) by Kedhareswer Naidu on 21st.dev.
- Contribution skyline component from 21st.dev.
