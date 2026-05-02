# Nerith — Agent Roster

Nerith is the **closed-loop operating system for engineering orgs**: it ingests Slack + Linear + GitHub + Notion, builds a live graph of intent→spec→work→outcome, and runs eight autonomous agents that detect drift between what the company said it would build and what it's actually building — then act.

---

## Repo Conventions

| Convention | Rule |
|---|---|
| Framework | Next.js 15 App Router — pages live in `src/app/(app)/` and `src/app/(marketing)/` |
| TypeScript | Strict mode; **no `any` in public APIs or agent types** |
| Validation | **Zod on all IO contracts** — every agent has `InputSchema` and `OutputSchema` |
| LLM | Mock LLM is the **default**; real LLM only when `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` is set |
| Demo gate | `isDemoMode` (from `src/lib/env.ts`) bypasses auth, forces mock LLM, uses in-memory graph |
| Citations | **Every agent output must carry `nodeIds` / `sourceUrls`** — the Auditor rejects uncited claims; the UI refuses to render them |
| Evals | Every agent has `eval/golden.json`; run `npm run eval` before merging prompt changes |

---

## LLM Router

File: `src/lib/llm/router.ts`

Priority order at runtime:

```
1. DEMO_MODE=true  → MockLLM (always, no API call)
2. ANTHROPIC_API_KEY set → claude-3-5-sonnet-20241022
3. OPENAI_API_KEY set    → gpt-4o
4. neither set           → MockLLM (fallback)
```

MockLLM (`src/lib/llm/mock.ts`) returns deterministic, fixture-seeded responses — so `npm run dev` works with zero API keys and the demo is fully reproducible.

---

## Citations: End-to-End

1. **Agent output** — every result carries `nodeIds: string[]` (graph node IDs from the knowledge graph) and/or `sourceUrls: string[]` (Linear issue URLs, GitHub PR URLs, Slack message permalinks).
2. **Auditor** — before any agent output reaches a human, `runAuditor` checks that every `nodeId` resolves in the graph store (`src/lib/graph/store.ts`). Missing citation → `citation_missing` finding → recommendation `review` or `reject`.
3. **UI** — `DriftCard` and `DriftDrawer` in `src/components/feed/` will not render a drift event that has zero `nodeIds`. The `[evidence]` block is always shown alongside the source links.

---

## The 8 Agents

### 1. Cartographer

**Purpose**: Maintains the knowledge graph. Every event (GitHub PR, Linear issue update, Slack message, Notion doc edit) flows through the Cartographer, which upserts typed nodes and edges with provenance metadata.

**Fires when**: Any integration event arrives at the webhook receiver (`src/app/api/webhooks/`).

**Inputs**:
```ts
{ event: IntegrationEvent, workspaceId: string }
```

**Outputs**:
```ts
{ mutations: GraphMutation[], summary: string, confidence: number }
```

**Code**: `src/lib/agents/cartographer/`
- `types.ts` — `CartographerInput`, `CartographerOutput`, `GraphMutation`
- `runner.ts` — calls `llm()`, applies mutations to graph store
- `prompt.ts` — system prompt + user prompt builder
- `eval/golden.json`

**Golden set**: `src/lib/agents/cartographer/eval/golden.json`

**Adding a test case**:
1. Add a new object to the `cases` array in `golden.json`.
2. Supply an `input` (a raw `IntegrationEvent`) and `expected` (the `mutations` array you expect).
3. Run `npm run eval` — the harness calls `runCartographer` and diffs the output.

---

### 2. Drift Watcher

**Purpose**: Compares "should be" (ADRs, specs, commitments) against "is" (commits, merged PRs, issue status). Emits `DriftEvent` records for the feed when a rule fires.

**Fires when**: Cron job (configurable, default every 15 min) or on-event trigger after a PR merges or issue status changes.

**Inputs**:
```ts
{ workspaceId: string, windowDays: number }
```

**Outputs**:
```ts
{ results: DriftRuleResult[], rulesRun: number, rulesFired: number, timestamp: string }
```

**Code**: `src/lib/agents/drift-watcher/`
- `types.ts` — `DriftWatcherInput`, `DriftWatcherOutput`, `DriftRuleResult`
- `runner.ts` — iterates `DRIFT_RULES`, collects fired results
- `rules.ts` — the 6 drift rules (see below)
- `eval/golden.json`

#### The 6 Drift Rules

| # | Rule ID | Fires when |
|---|---|---|
| 1 | `rule-issue-no-commits` | A Linear issue has been `In Progress` for >5 days with no linked PR or commit |
| 2 | `rule-pr-no-issue` | A PR is merged with no linked Linear issue |
| 3 | `rule-pr-contradicts-adr` | A merged PR touches files that contradict a pinned ADR (e.g., PR #482 ships Clerk while ADR-007 mandates Auth0) |
| 4 | `rule-commitment-no-issue` | A customer commitment (extracted from call transcripts or Slack) has no tracking Linear issue |
| 5 | `rule-spec-updated-no-ticket-resync` | A PRD/spec doc was updated but the downstream Linear tickets were not re-scoped |
| 6 | `rule-service-no-runbook` | A service received ≥3 merged PRs in 14 days with no corresponding runbook update |

**Adding a new rule**:
1. Add a new `DriftRule` object to `src/lib/agents/drift-watcher/rules.ts` following the `{ id, name, run }` pattern.
2. Add it to the `DRIFT_RULES` array at the bottom of that file.
3. Add a golden case to `eval/golden.json`.

**Adding a test case**:
1. Add to `src/lib/agents/drift-watcher/eval/golden.json`.
2. Specify `input.windowDays` and `expected.containsRule` + `expected.severity`.
3. Run `npm run eval`.

---

### 3. Decision Extractor

**Purpose**: Finds decisions and commitments buried in prose — Slack threads, call transcripts, Notion doc edits — and surfaces them as typed `Decision` or `Commitment` nodes in the graph.

**Fires when**: A new Fathom/Granola call transcript arrives, a long Slack thread (>20 messages) is processed, or a user triggers manual extraction from the Decisions page.

**Inputs**:
```ts
{ text: string, sourceType: 'call' | 'slack' | 'doc', sourceId: string, workspaceId: string }
```

**Outputs**:
```ts
{
  decisions: Array<{
    title: string, body: string, decidedBy: string, decidedAt: string,
    participants: string[], type: 'Decision' | 'Commitment', confidence: number,
    citations: Array<{ quote: string, nodeId: string }>
  }>,
  processed: boolean
}
```

**Code**: `src/lib/agents/decision-extractor/`
- `types.ts`, `runner.ts`, `eval/golden.json`

**Adding a test case**: Add to `eval/golden.json` with a raw `text` input and an `expected.decisions` array containing at least `title` and `type`.

---

### 4. Spec Synthesizer

**Purpose**: Drafts PRDs (Product Requirements Documents) in Notion-style markdown from accumulated context: Slack threads, call transcripts, and Linear issue clusters.

**Fires when**: User clicks "Synthesize spec" on the Specs page, or Drift Watcher fires `rule-commitment-no-issue` and auto-drafts a spec from the commitment evidence.

**Inputs**:
```ts
{ sources: string[], projectId: string, workspaceId: string, title?: string }
```

**Outputs**:
```ts
{
  title: string, body: string,
  citations: Array<{ nodeId: string, quote: string }>,
  openQuestions: string[],
  confidence: number
}
```

**Code**: `src/lib/agents/spec-synthesizer/`
- `types.ts`, `runner.ts`, `eval/golden.json`

**Adding a test case**: Add a `sources` array (node IDs from fixture data) and `expected.body` keyword checks to `eval/golden.json`.

---

### 5. Standup Composer

**Purpose**: Generates per-person daily standups from the previous 24 hours of git activity, Linear issue updates, and Slack messages. Posts to Slack DM or channel.

**Fires when**: Daily cron (configurable, default 9:00 AM in workspace timezone) or user triggers from the Standups page.

**Inputs**:
```ts
{ personId: string, workspaceId: string, date: string, lookbackHours: number }
```

**Outputs**:
```ts
{
  personId: string, personName: string, date: string,
  yesterday: string[], today: string[], blockers: string[],
  activitySummary: string,
  citations: Array<{ type: string, id: string, description: string }>
}
```

**Code**: `src/lib/agents/standup-composer/`
- `types.ts`, `runner.ts`, `eval/golden.json`

**Adding a test case**: Add `{ personId: "person-006", date: "2025-04-10" }` as input and assert `expected.yesterday` is non-empty.

---

### 6. Executor

**Purpose**: Executes approved actions. One-click actions like "Open ADR revision PR," "File missing ticket," "DM owner," and "Update runbook" all route through the Executor, which logs every action to the audit trail.

**Fires when**: User clicks an action button on a drift event card (after review). All executions require `approved: true`.

**Inputs**:
```ts
{
  driftEventId: string,
  actionType: 'open_pr' | 'file_ticket' | 'update_doc' | 'dm_owner' | 'dismiss' | 'snooze',
  payload: Record<string, unknown>,
  userId: string, workspaceId: string, approved: boolean
}
```

**Outputs**:
```ts
{
  success: boolean, actionType: string,
  result: Record<string, unknown>,
  auditEntry: { id, actionType, agentName, userId, driftEventId, payload, result, executedAt, mock },
  mock: boolean
}
```

In `isDemoMode`, the Executor returns a mock receipt and does not touch any external API.

**Code**: `src/lib/agents/executor/`
- `types.ts`, `runner.ts`, `eval/golden.json`

**Adding a test case**: Add a case with `actionType: "file_ticket"` and assert `expected.success: true` and `expected.auditEntry.actionType: "file_ticket"`.

---

### 7. Auditor

**Purpose**: Sanity-checks every other agent's output before it reaches a human. Validates citations, confidence scores, and required fields. Issues `approve`, `review`, or `reject` recommendations.

**Fires when**: Before any agent output is written to the Drift Feed, Decisions ledger, or Specs page.

**Inputs**:
```ts
{ agentName: string, agentOutput: Record<string, unknown> }
```

**Outputs**:
```ts
{
  passed: boolean,
  findings: Array<{ type: 'citation_missing' | 'low_confidence' | 'claim_unsupported', description: string, severity: 'error' | 'warn', field?: string }>,
  score: number,   // 0–1
  recommendation: 'approve' | 'review' | 'reject'
}
```

**Audit logic**:
- `citation_missing`: a `nodeId` in the output doesn't resolve in the graph store → `warn`
- `low_confidence`: agent confidence < 0.5 → `warn`
- `claim_unsupported`: required field (`headline`, `evidence`, `nodeIds`) missing from drift-watcher output → `error`
- Score = `max(0, 1 - errors×0.3 - warns×0.1)`
- Recommendation: `reject` if any errors; `review` if >2 warns; `approve` otherwise

**Code**: `src/lib/agents/auditor/`
- `types.ts`, `runner.ts`, `eval/golden.json`

**Adding a test case**: Supply an `agentOutput` with a missing `nodeIds` field and assert `expected.passed: false` and `expected.recommendation: "reject"`.

---

### 8. Retro Agent

**Purpose**: At the end of a sprint, generates a retrospective: what shipped vs. what was planned, where time went, why velocity deviated, and citations to the evidence.

**Fires when**: End-of-sprint trigger (cron or user-initiated from the Retros page).

**Inputs**:
```ts
{ sprintNumber: number, workspaceId: string, sprintStartDate: string, sprintEndDate: string }
```

**Outputs**:
```ts
{
  sprintNumber: number,
  summary: string,
  shipped: string[],
  missed: string[],
  velocityDelta: number,   // actual story points / planned story points
  topBlockers: string[],
  insights: string[],
  citations: Array<{ nodeId: string, description: string }>
}
```

**Code**: `src/lib/agents/retro-agent/`
- `types.ts`, `runner.ts`, `eval/golden.json`

**Adding a test case**: Add `{ sprintNumber: 24, sprintStartDate: "2025-04-01", sprintEndDate: "2025-04-14" }` and assert `expected.shipped` is non-empty and `expected.citations` length > 0.

---

## How to Add a New Agent

Checklist:

1. **Create folder** `src/lib/agents/<agent-name>/`
2. **Add `types.ts`** — export `<Name>InputSchema`, `<Name>OutputSchema` (Zod), `<Name>Input`, `<Name>Output` (inferred types). No `any`.
3. **Add `runner.ts`** — export `async function run<Name>(input: <Name>Input): Promise<<Name>Output>`. Call `llm()` from `src/lib/llm/router.ts`. Return a mock path if `response.mock`.
4. **Add `prompt.ts`** (if LLM-powered) — `SYSTEM` constant + prompt builder function.
5. **Add `eval/golden.json`** — at least 2 cases with `{ id, description, input, expected }`.
6. **Register in orchestrator** — add a `case` to `src/app/api/agents/run/route.ts` and import your runner.
7. **Add to Settings page** — add an entry to the agent toggle list in `src/app/(app)/app/settings/page.tsx`.
8. **Add an eval import** to `scripts/eval.ts` so `npm run eval` picks it up.
