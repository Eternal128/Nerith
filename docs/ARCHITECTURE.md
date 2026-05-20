# Architecture — Nerith

## Overview

Nerith is an AI-Enhanced HR Services platform built on top of Next.js 15 (App Router). It uses an in-memory graph store to represent people, projects, decisions (ADRs), events, candidates, requisitions, employees, policies, and courses. AI agents reason over this graph and emit citations (node IDs) with every output.

---

## Directory Structure

```
src/
  app/
    (app)/hr/          # Protected HR app pages (Server Components)
    (marketing)/hr/    # Public marketing pages
    api/agents/run/    # POST /api/agents/run — unified agent API route
  lib/
    graph/
      store.ts         # In-memory singleton graph store (Map<id, GraphNode>)
      mutations.ts     # upsertNode, upsertEdge, emitDriftEvent
    agents/
      cartographer/    # Graph mapping agent
      auditor/         # Citation validation agent
      hr/
        recruiter/     # JD generation + resume screening
        interviewer/   # Transcript scoring
        onboarder/     # 30/60/90-day onboarding plans
        coach/         # Skill gap + learning path recommendations
        pulse/         # Sentiment + attrition risk
        compliance-auditor/  # EEOC, pay equity, bias auditing
        client.ts      # Browser-side hrClient (calls /api/agents/run)
    fixtures/
      hartwell/        # Hartwell Robotics fixture (40 employees, 7 ADRs, auth migration storyline)
      hr/              # Apex Talent fixture (120 employees, 240 candidates, bias storyline)
    llm/
      router.ts        # callLLM() — routes to Anthropic, OpenAI, or Mock
      mock.ts          # Deterministic mock responses
    env.ts             # isDemoMode flag
scripts/
  seed-hr.ts           # Seed Apex Talent fixture
  replay.ts            # Stream live events every 10s
  eval.ts              # Validate golden.json eval cases exist
```

---

## Data Flow

```
User Request
    ↓
Next.js Server Component (or API Route)
    ↓
Agent Runner (e.g. runComplianceAuditor)
    ↓
callLLM() from llm/router.ts
    ↓ (isDemoMode? → MockLLM, else → Anthropic → OpenAI → MockLLM fallback)
LLM Response { text, mock }
    ↓
Agent parses output / takes mock path
    ↓
emitDriftEvent() if critical finding
    ↓
Returns Output { ...fields, nodeIds: string[] }
    ↓
UI renders output + citation chips
```

---

## Demo Mode

`isDemoMode` is `true` when:
- `DEMO_MODE=true` env var is set, OR
- No `ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, or `AUTH_GOOGLE_ID` is configured

In demo mode:
- All agents take the mock path (`response.mock === true`)
- No external API calls are made
- The in-memory graph is the only datastore
- Fixture data provides realistic demo content

Run with zero API keys: `npm run dev` (demo mode activates automatically).

---

## Agent Convention

Every agent:
1. Lives in `src/lib/agents/<name>/` with `types.ts`, `runner.ts`, `prompt.ts`, `eval/golden.json`
2. Exports `run<Name>(input: <Name>Input): Promise<<Name>Output>`
3. Uses `callLLM` from `src/lib/llm/router.ts` — never calls Anthropic/OpenAI directly
4. Returns `nodeIds: string[]` in every output — required for citation validation
5. Checks `response.mock` to take the deterministic mock path
6. Registers in `src/app/api/agents/run/route.ts`

---

## Graph Store

The in-memory store (`src/lib/graph/store.ts`) is a singleton `Map<id, GraphNode>` + `GraphEdge[]` array. It persists for the lifetime of the Node.js process.

**Node types:** `person`, `project`, `adr`, `event`, `candidate`, `requisition`, `employee`, `policy`, `course`

**Drift events** are `GraphNode` objects with `type: "event"` and `data.severity: "critical"|"warn"|"info"`. They are emitted via `emitDriftEvent()` in `src/lib/graph/mutations.ts`.

---

## Key Fixtures

### Hartwell Robotics (`src/lib/fixtures/hartwell/`)
- 40 employees, 5 projects, 7 ADRs
- Centerpiece: ADR-007 (auth migration) → Slack debate (hw-slack-001) → PR #482 (hw-pr-482) → CRITICAL drift

### Apex Talent (`src/lib/fixtures/hr/`)
- 120 employees, 8 requisitions, 240 candidates, 5 HR ADRs, 10 courses, 5 policies
- Centerpiece: Screening bias → apt-slack-001 → apt-drift-001 (CRITICAL, EEOC §703) → ADR-HR-002 update
