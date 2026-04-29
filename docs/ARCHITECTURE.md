# Nerith Architecture

## Overview

Nerith is a Next.js 15 App Router monolith with a clear separation between:
- **Ingestion layer**: webhook receivers + mock drivers
- **Graph layer**: in-memory store (demo) / Supabase Postgres (production)
- **Agent layer**: eight specialized agents with mock LLM fallback
- **UI layer**: App Router pages with server + client components

## Tech Stack

| Concern | Technology |
|---------|-----------|
| Framework | Next.js 15 App Router |
| Language | TypeScript strict |
| Styling | Tailwind v4 |
| Database | Supabase (Postgres + RLS + Realtime) |
| LLM | OpenAI / Anthropic via thin router; Mock LLM default |
| Validation | Zod on all IO contracts |
| Animation | Framer Motion |
| Charts | Recharts |
| Testing | Vitest |

## Directory Structure

```
src/
├── app/
│   ├── (marketing)/   # Public site
│   ├── (app)/app/     # Protected surfaces
│   ├── api/           # API routes + webhooks
│   └── login/
├── components/
│   ├── app/           # AppShell, CommandPalette
│   ├── feed/          # DriftCard, DriftDrawer
│   └── ui/            # Pill, Card, Button
├── lib/
│   ├── agents/        # 8 agents with types/runner/eval
│   ├── fixtures/      # Hartwell Robotics seed data
│   ├── graph/         # store, mutations, schema
│   └── llm/           # router + mock LLM
└── types/
```

## Demo Mode

When `DEMO_MODE=true`: auth bypassed, mock LLM, mock executor, in-memory graph store.

## Data Flow

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
