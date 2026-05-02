# · Nerith

**The closed-loop operating system for engineering orgs.**

Nerith ingests Slack, Linear, GitHub, Notion, and call recordings, builds a live knowledge graph of what your team decided, promised, and built — and runs eight agents that flag drift the moment those three diverge.

> Status: pre-alpha v0. Demo runs entirely on fixture data. No real API keys required.

---

## 60-second demo

```bash
git clone https://github.com/Eternal128/Nerith
cd Nerith
npm install
npm run seed     # loads Hartwell Robotics fixtures (40 people, 5 projects, 33 drift events)
npm run dev      # http://localhost:3000
```

Then in a second terminal (optional — for the live event ticker):

```bash
npm run replay   # streams new fixture events every ~10s
```

Open http://localhost:3000 → click **Sign in to demo** → land on the Drift Feed.

The entire demo runs with `DEMO_MODE=true` (the default). No Supabase connection, no LLM API keys, no external services.

---

## What to look at first

1. **Drift Feed** (`/app/feed`) — primary surface. Click the top CRITICAL event ("PR #482 implements auth via Clerk; ADR-007 specifies Auth0") to open the drawer and see evidence, source citations, and one-click actions.
2. **Graph Explorer** (`/app/graph`) — the same drift, visualized. Look for the red dashed CONTRADICTS edge between `PR-482` and `ADR-007`.
3. **Decisions Ledger** (`/app/decisions`) — every ADR and commitment, with supersedes/contradicts edges inline.
4. **Spec Synthesizer** (`/app/specs`) — drafts PRDs from scattered context with inline citations to graph nodes.
5. **Standups** (`/app/standups`) / **Retros** (`/app/retros`) — auto-generated from real activity, citation-backed.
6. **Settings → Eval scoreboard** (`/app/settings`) — precision/recall per agent against golden sets.

⌘K opens the command palette from anywhere in the app.

---

## Architecture in one diagram

```
Integration event → Webhook → Cartographer → Graph mutations
                                                    ↓
                                          Drift Watcher rules
                                                    ↓
                                          Auditor validation
                                                    ↓
                                            Drift Feed UI
                                                    ↓
                                    Human approval → Executor → Audit Log
```

Full architecture doc: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)

---

## Project structure

```
src/
├── app/
│   ├── (marketing)/        # Public site — homepage, pricing, how-it-works, etc.
│   ├── (app)/app/          # Protected surfaces — feed, graph, decisions, specs, etc.
│   ├── api/                # API routes (agents/run, execute, graph/query, webhooks/*)
│   └── login/              # Login page
├── components/
│   ├── app/                # AppShell, CommandPalette
│   ├── feed/               # DriftCard, DriftDrawer
│   └── ui/                 # Pill, shared primitives
├── lib/
│   ├── agents/             # 8 agents — each has types.ts, runner.ts, eval/golden.json
│   │   ├── cartographer/
│   │   ├── drift-watcher/  # src/lib/agents/drift-watcher/runner.ts
│   │   ├── decision-extractor/
│   │   ├── spec-synthesizer/
│   │   ├── standup-composer/
│   │   ├── executor/
│   │   ├── auditor/
│   │   └── retro-agent/
│   ├── fixtures/           # Hartwell Robotics seed data (40 people, 5 projects, 7 ADRs)
│   ├── graph/              # store.ts, mutations.ts, schema
│   ├── llm/                # router.ts (Anthropic → OpenAI → MockLLM), mock.ts
│   └── env.ts              # isDemoMode flag
└── types/
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start Next.js dev server on http://localhost:3000 |
| `npm run build` | Production build (must pass before merge) |
| `npm run seed` | Load Hartwell Robotics fixture data into the in-memory graph |
| `npm run replay` | Stream live fixture events every ~10s (run in a second terminal) |
| `npm run eval` | Run all agent golden-set evaluations (precision/recall per agent) |
| `npm run test` | Vitest unit tests |
| `npm run lint` | ESLint |
| `npm run db:reset` | Reset in-memory graph and re-seed |

---

## Environment

`.env.example` is the source of truth. Demo mode runs without any env vars set:

```bash
cp .env.example .env.local
# Optionally add OPENAI_API_KEY or ANTHROPIC_API_KEY for real LLM calls
```

The LLM router (`src/lib/llm/router.ts`) prefers Anthropic, falls back to OpenAI, falls back again to a deterministic mock. MockLLM is always used when `DEMO_MODE=true`.

---

## Going beyond the demo

**Connecting real Slack/Linear/GitHub** — webhook handlers live in `src/app/api/webhooks/`. Each source has a route handler that calls `runCartographer`. Point your integration's webhook URL at the appropriate handler and set the required env vars.

**Adding a new drift rule** — edit `src/lib/agents/drift-watcher/rules.ts` following the `{ id, name, run }` pattern, add it to `DRIFT_RULES`, then add a golden test case to `src/lib/agents/drift-watcher/eval/golden.json`. Update `tests/drift-rules.test.ts` accordingly.

**Adding a new agent** — follow the checklist in [`AGENTS.md`](./AGENTS.md): create `src/lib/agents/<name>/` with `types.ts`, `runner.ts`, `eval/golden.json`, register in `src/app/api/agents/run/route.ts`.

---

## Tech stack

- **Next.js 15** App Router, **React 19**, **TypeScript** strict mode
- **Tailwind v4** (`@theme inline` syntax, no `tailwind.config.js`)
- **Supabase** — Postgres + Auth + Realtime + RLS (bypassed in demo mode)
- **Zod** — all IO contracts validated
- **Framer Motion** — cursor animation, transitions
- **Recharts** — eval scoreboards and retro charts
- **Vitest** — unit tests
- **LiteLLM-style router** — Anthropic → OpenAI → MockLLM

---

## Docs

| File | What's in it |
|---|---|
| [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) | Data flow, directory structure, demo mode |
| [`AGENTS.md`](./AGENTS.md) | All 8 agents: purpose, inputs, outputs, file locations |
| [`DEMO.md`](./DEMO.md) | 5-minute demo script for partner calls |
| [`PITCH.md`](./PITCH.md) | YC-style memo |
| [`CLAUDE.md`](./CLAUDE.md) | Rules for AI coding agents working in this repo |
| [`docs/adr/0007-auth0-provider.md`](./docs/adr/0007-auth0-provider.md) | ADR-007 — the Auth0 mandate that PR #482 contradicts (centerpiece of the demo) |

---

## License

MIT.
