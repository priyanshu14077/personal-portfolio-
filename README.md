# Priyanshu Kumar Singh — Portfolio

Personal portfolio for Priyanshu Kumar Singh, a forward deployed engineer who embeds with teams and ships AI agents and production backends.

The site is a scroll-driven story in five chapters (Home, About, Work, Experience, Contact), each tearing open like paper to reveal the next, followed by a "How I work" wheel (four steps and four capabilities, client-agnostic), impact metrics, case studies, the stack, and a 3D skyline of a year of GitHub contributions.

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
- GitHub contribution data lives in `src/data/contributions.json`. Refresh it with `npm run contributions` (requires the GitHub CLI, logged in).

## Deployment

`vercel.json` limits automatic deployments to the `master` branch; pushes to other branches do not deploy. Merge to `master` to release.

## Credits

- Scroll-tear layout: [Torn Postcard Portfolio](https://21st.dev/@kedhareswer/templates/scroll-tear-portfolio-website-template) by Kedhareswer Naidu on 21st.dev.
- Contribution skyline component from 21st.dev.
