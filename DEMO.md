# Nerith Demo Script — 5 Minutes for a YC Partner

**Audience**: YC partner, design partner, or early investor  
**Format**: Screen-share + narration  
**Duration**: ~5 minutes  
**Pre-req**: Node 20+, no API keys needed

---

## Pre-Flight (do this before the call)

```bash
# Terminal 1 — main app
npm install
npm run seed
npm run dev
# → http://localhost:3000

# Terminal 2 — live event ticker (keep this running during the demo)
npm run replay
```

The app runs entirely in demo mode: mock LLM, in-memory graph, Hartwell Robotics fixture data. No API keys needed. The replay stream sends a new Slack or GitHub event every 10 seconds, making the feed feel live during the demo.

**Reset to a clean state at any time:**
```bash
npm run db:reset && npm run seed
```

---

## The Setup (30 seconds, say this before sharing your screen)

> "Hartwell Robotics is a fictional 40-person Series A company. They've been building robotic picking systems for logistics warehouses. They have a real engineering problem: in January they made an architectural decision to use Auth0 for authentication. By April, an engineer had already shipped Clerk instead — without updating the decision, without a security review, without anyone noticing. I'm going to show you what Nerith does with that."

---

## 10-Step Walkthrough

### Step 1 — The Drift Feed

**Navigate to**: `http://localhost:3000/app` (or click **Feed** in the sidebar)

> "This is the Drift Feed. Every card you see was generated from real Slack threads, Linear issues, and GitHub pull requests in the Hartwell Robotics fixture — six months of engineering history. The replay stream in Terminal 2 is adding new events live right now."

Point out the severity pills: **CRITICAL** (red), **WARN** (amber), **INFO** (neutral). Point out that every card has evidence links — hover a card to see the source node IDs.

> "Notice that Nerith never shows a claim without a citation. That card cites PR #482, ADR-007, and the Slack thread from March 14. If we deleted those nodes from the graph, the card would disappear entirely."

---

### Step 2 — The Hero Moment: Auth Migration

**Click the CRITICAL card**: *"PR #482 ships Clerk integration; ADR-007 mandates Auth0."*

> "This is the headline. On January 10th, Priya — the CTO — locked ADR-007: Auth0 is the company's auth provider, chosen after a full security review. Then on March 14th, Chloe opens a Slack thread asking about Clerk. The thread gets heated. On April 2nd, PR #482 merges — Clerk is now live in production for the onboarding flow. No ADR revision was filed. No security review happened. ADR-007 was never updated."

Point to the **Evidence** section in the drawer:
> "Nerith found this by cross-referencing the PR file list against the ADR body. It saw `clerk.ts`, `ClerkProvider.tsx`, `clerk-webhook.ts` in the diff, and Auth0 in ADR-007. Confidence: 97%."

Point to the **Proposed Actions** section:
> "There are three proposed actions. The one I want to show you is 'Open ADR revision PR.' Watch."

---

### Step 3 — One-Click Executor

**Click "Open ADR revision PR"** on the CRITICAL card.

> "Nerith just drafted a pull request with the ADR revision pre-filled — title, body, the contradicting evidence, the Slack thread permalink, the PR diff link. In production this would open a real GitHub PR. In the demo it writes to the audit log."

**Navigate to** the Audit Log (bottom of the Settings page or via the breadcrumb).
> "Every action Nerith takes goes into the audit log with full provenance. Who triggered it, what the agent decided, what it did. You can replay any action or roll it back."

---

### Step 4 — Decisions Ledger

**Click "Decisions"** in the sidebar.

> "The Decisions ledger is the company's memory. Every ADR, every commitment, every architectural choice that Nerith has extracted from calls, threads, and docs lives here. ADR-007 is pinned at the top — it's marked CONTRADICTED."

Click on ADR-007.
> "Nerith knows this decision has five graph edges: the Slack thread from January 20th where Priya locked it, the Linear issue tracking the Auth0 migration, and now PR #482 which contradicts it. The Retro Agent will include this in the sprint 24 retrospective as an unresolved drift."

---

### Step 5 — Knowledge Graph

**Click "Graph"** in the sidebar.

> "This is the knowledge graph — the engine behind everything you've seen. Nodes are people, projects, decisions, PRs, issues, Slack messages. Edges are typed: 'authored-by', 'contradicts', 'implements', 'committed-to'. Right now there are about 200 nodes from the Hartwell fixture."

Drag a node. Zoom in on the **PR #482 → CONTRADICTS → ADR-007** edge.
> "That red edge is why the CRITICAL drift event exists. The Drift Watcher runs every 15 minutes, walks the graph, and fires rules against typed edge patterns like this."

---

### Step 6 — Specs

**Click "Specs"** in the sidebar.

> "The Spec Synthesizer drafted this PRD for Billing v2 by reading the Slack thread about Stripe, the Linear issue cluster, and the ADR-004 decision on Stripe payments. Every claim in this spec is cited to a graph node. If you hover a citation you see the exact quote it came from."

> "When a PM approves this spec, it becomes the ground truth that Drift Watcher measures reality against. If the implementation diverges from the spec, that's a new drift event."

---

### Step 7 — Standups

**Click "Standups"** in the sidebar.

> "Nerith generated standups for all 27 engineers on the Hartwell team this morning. Tanvir's standup says 'Blocked on HART-263: Auth0/Clerk resolution pending security review' — that's the issue Nerith filed yesterday. The standup knows about the blocker because the drift event created the ticket, and the ticket is in the graph."

---

### Step 8 — Retros

**Click "Retros"** in the sidebar.

> "Sprint 24 retro. Nerith compared the sprint plan against what actually shipped. Velocity delta: 0.71 — the team shipped 71% of what was planned. The top blocker was the auth migration ambiguity. The retro doc has 12 citations: 5 merged PRs, 3 Linear issues, 4 Slack threads. No one had to write this."

---

### Step 9 — Integrations

**Click "Integrations"** in the sidebar.

> "In production you connect your Slack workspace, GitHub org, Linear workspace, and optionally Notion and Fathom. Webhooks are configured per-integration. Nerith does a 90-day backfill on first connect to bootstrap the graph. After that, every event flows in real-time."

---

### Step 10 — Settings & Agent Controls

**Click "Settings"** in the sidebar.

> "You control which agents are enabled, how often Drift Watcher runs, which rules are active, and which Slack channel receives alerts. You can also run any agent manually from here. The eval scores for each agent — precision, recall against the golden set — are visible so you know how trustworthy each one is."

---

## Suggested Talking Points by Surface

| Surface | Key line |
|---|---|
| Feed | "This is the only dashboard where every card is an action, not a metric." |
| Graph | "This is the moat. Six months of Hartwell's decisions are here. A competitor can't replicate it with a check." |
| Decisions | "The only place where ADRs, customer commitments, and architectural choices are tracked in the same ledger." |
| Specs | "A spec that was drafted by an agent from 14 Slack messages and 3 call transcripts, with every claim cited." |
| Standups | "Standups that know about drift — because the blocker was filed by an agent, not reported manually." |
| Retros | "A retro with citations. Every insight links back to the PR, the issue, or the thread that caused it." |
| Integrations | "90-day backfill on first connect. The graph is useful within hours, not months." |
| Settings | "Every agent is auditable. You can see the eval score, the last run, and every action in the audit log." |

---

## "What to Say If They Ask…"

**Q: How is this different from Glean?**
> Glean is a search bar. It retrieves. Nerith detects and acts. Glean can't tell you that PR #482 contradicts ADR-007 because it doesn't know what an ADR is or that a PR can contradict it. Nerith has a typed graph with semantic relationships. The drift rules are written against those relationships, not keyword matches.

**Q: Won't Linear or GitHub just build this?**
> Linear can only see Linear. GitHub can only see GitHub. Neither can see the customer call where your CTO promised SSO by Q2, and neither can cross-reference that against your roadmap and your open issues. The whole product is the *intersection* of sources. Single-source tools can't build this without becoming a platform themselves, which is a different product and a different company.

**Q: What's the moat?**
> The graph. Every customer's graph is different, compounds over time, and can't be ported. At month six, Nerith knows six months of that company's decisions, commitments, and drift history. Switching means starting over. The second moat is outcome pricing — we charge against cycle time reduction, so our incentives are perfectly aligned with the customer's.

**Q: How do you price it?**
> Flat tier as an anchor ($2k–$5k/month for up to 50 engineers). Outcome tier as upside: a percentage of engineering hours recovered, measured by sprint cycle time before and after. Design partners start on the flat tier.

**Q: What about hallucinations?**
> Every agent output is gated by the Auditor before it reaches a human. If a claim isn't cited to a graph node, it's rejected. The UI will not render an uncited claim. In practice, Drift Watcher rules are deterministic — they're code, not prompts. The LLM is only used for extraction (Decision Extractor, Spec Synthesizer) where a citation is mandatory. The golden eval set catches regressions on every deploy.

---

## Reset Instructions

To re-run the demo from scratch:
```bash
npm run db:reset && npm run seed
```

Then restart both terminals (`npm run dev` and `npm run replay`). All drift events, decisions, and audit log entries are restored to the fixture state.
