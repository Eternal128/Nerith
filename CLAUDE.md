<!-- BEGIN:nerith-agent-rules -->

# Nerith — Rules for AI Coding Agents

This is **not** the Next.js you know from tutorials. Read this file before touching any code.

## Framework & Tooling

- **Next.js 15 App Router** — all pages are in `src/app/(app)/` (protected) or `src/app/(marketing)/` (public). There is no `pages/` directory. Do not use `getServerSideProps` or `getStaticProps`.
- **Tailwind v4** — uses `@theme inline` syntax, **not** a `tailwind.config.js` file. All design tokens are declared in `src/app/globals.css`. Do not create a v3-style config. Do not add arbitrary color values inline; use CSS custom properties from globals.
- **TypeScript strict mode** — `"strict": true` in `tsconfig.json`. **No `any` in public APIs, agent types, or Zod schemas.** Use `unknown` and narrow it.
- **Zod for all IO** — every agent has an `InputSchema` and `OutputSchema` (`src/lib/agents/<name>/types.ts`). API routes validate request bodies with Zod. No raw casting.

## Before Assuming API Shapes

Check the [Next.js 15 App Router docs](https://nextjs.org/docs/app) before assuming how APIs work. Specifically:
- Route handlers use `NextRequest` / `NextResponse` (not `req`/`res`)
- `cookies()` and `headers()` from `next/headers` are async in Next.js 15
- Server components are async by default; do not add `'use client'` unless you need browser APIs or React state

## Demo Mode Gate

**`isDemoMode`** (`src/lib/env.ts`) controls:
- Auth bypass (no Supabase session required)
- Mock LLM (no API calls, deterministic responses from `src/lib/llm/mock.ts`)
- In-memory graph store (no Supabase writes)
- Mock Executor (actions are logged but not sent to external APIs)

Check `isDemoMode` before writing code that touches external services. The demo must work with `DEMO_MODE=true` and zero API keys.

## LLM Router

`src/lib/llm/router.ts` — priority: `isDemoMode` → Anthropic → OpenAI → MockLLM. Never call OpenAI or Anthropic directly in agent code. Always go through `llm()` from the router.

## Citations Are Mandatory

Every agent output that reaches a human must carry `nodeIds: string[]` pointing to graph nodes in `src/lib/graph/store.ts`. The Auditor (`src/lib/agents/auditor/runner.ts`) will reject outputs with missing citations. The UI will not render drift events with zero `nodeIds`. If you add a new agent output field that makes a claim, it must cite a node.

## Agent Conventions

- Code lives in `src/lib/agents/<agent-name>/` — `types.ts`, `runner.ts`, (optionally) `prompt.ts`, `eval/golden.json`
- Export `run<AgentName>(input: <AgentName>Input): Promise<<AgentName>Output>`
- Always include a mock path when `response.mock` is true (see `src/lib/agents/cartographer/runner.ts` for the pattern)
- Register new agents in `src/app/api/agents/run/route.ts`

## Key References

- **Agent roster** → `AGENTS.md` — purpose, inputs, outputs, and file locations for all 8 agents
- **System architecture** → `docs/ARCHITECTURE.md` — data flow, directory structure, demo mode
- **Demo flow** → `DEMO.md` — the 10-step demo walkthrough; read this before changing any UI surface that appears in the demo
- **Fixture data** → `src/lib/fixtures/` — Hartwell Robotics fixture (40 people, 5 projects, 7 ADRs, ~500 graph nodes). The auth migration storyline (ADR-007 → Slack debate → PR #482 → CRITICAL drift) is the centerpiece of the demo. Do not break it.
- **Graph store** → `src/lib/graph/store.ts` + `src/lib/graph/mutations.ts`
- **Eval harness** → `npm run eval` — run after any prompt or agent logic change

## Commands

```bash
npm run dev          # start Next.js dev server (http://localhost:3000)
npm run seed         # seed Hartwell Robotics fixture data into in-memory graph
npm run replay       # stream live events every 10s (run in a second terminal)
npm run eval         # run all agent golden-set evaluations
npm run db:reset     # reset in-memory graph and re-seed
npm run test         # Vitest unit tests
npm run build        # production build (must pass before merge)
npm run lint         # ESLint
```

<!-- END:nerith-agent-rules -->
