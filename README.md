# Priyanshu Kumar Singh — Portfolio

Personal portfolio for Priyanshu Kumar Singh, a distributed systems and full-stack engineer building AI/LLM platforms.

The site is a scroll-driven story in five chapters (Home, About, Work, Experience, Contact), each tearing open like paper to reveal the next, followed by a 3D skyline of a year of GitHub contributions.

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

- All portfolio copy lives in `src/data/resume.ts`.
- GitHub contribution data lives in `src/data/contributions.json`. Refresh it with `npm run contributions` (requires the GitHub CLI, logged in).

## Deployment

`vercel.json` limits automatic deployments to the `master` branch; pushes to other branches do not deploy. Merge to `master` to release.

## Credits

- Scroll-tear layout: [Torn Postcard Portfolio](https://21st.dev/@kedhareswer/templates/scroll-tear-portfolio-website-template) by Kedhareswer Naidu on 21st.dev.
- Contribution skyline component from 21st.dev.
