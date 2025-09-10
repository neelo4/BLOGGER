Blog Writer (React + TypeScript)

Why this project
- Built to mirror a Lead Frontend role: clean architecture, testing, TypeScript-first, and collaboration patterns.
- Demonstrates micro-frontend friendly structure, API boundaries, and DX/CI practices.

Highlights
- React 18 + TypeScript with Suspense and hooks.
- Atomic design: atoms → molecules → organisms → pages.
- Local-first posts persisted in `localStorage` (no backend required).
- Markdown editing with live preview (react-markdown + GFM).
- Unit tests (Vitest + Testing Library) and E2E scaffold (Playwright).
- Linting (ESLint) + formatting (Prettier) and EditorConfig.

Project structure (excerpt)
- `src/components/` – reusable atoms/molecules/organisms.
- `src/features/` – vertical feature slices (blog, shared fx/accounts from earlier demo not used).
- `src/shared/` – cross-cutting libs (query client, router, mocks, graphql client).
- `src/pages/` – route-level pages wired with the router.

Getting started
1) Install dependencies:
   npm install
2) Run the app:
   npm run dev
3) Run unit tests:
   npm test
4) Run E2E tests (optional):
   npx playwright install --with-deps
   npm run e2e

Production build
- Build: npm run build
- Preview: npm run preview

Deploying to Vercel
1) Push the repo to GitHub (or import directly on Vercel).
2) Create a new Vercel project and select this repo.
3) Build command: `npm run build`, Output directory: `dist`.
4) The included `vercel.json` handles SPA rewrites so deep links work.

Notes on design choices
- Type-safe API layer validates responses with Zod to catch backend drift early.
- TanStack Query provides caching, retry, and SSR/Suspense readiness.
- MSW mirrors a microservices edge by mocking REST and GraphQL without a backend.
- Atomic components remain unopinionated and reusable across features.
- Tests showcase both unit and integration boundaries. Playwright smoke spec included.

What to mention on the resume
- “Built a React + TypeScript banking dashboard using atomic design, TanStack Query, Zod-validated API boundaries, and MSW to simulate microservices (REST + GraphQL). Added unit and E2E tests, ESLint/Prettier, and CI-ready configuration.”
