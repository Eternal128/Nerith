# Nerith — Company Intelligence for Engineering Orgs

## One-liner

Nerith is the closed-loop operating system for engineering orgs: it ingests Slack, Linear, GitHub, and Notion, builds a live graph of what your team decided vs. what it's actually building, and runs agents that detect the gap and close it.

---

## The Problem

Engineering orgs run on open loops. A decision gets made in a Slack thread on Tuesday. Someone writes a spec in Notion on Thursday. Tickets get filed in Linear on Friday. By the time code ships three weeks later, the spec is stale, the thread is buried, and the decision has been quietly reversed by two PRs that nobody connected to the original intent.

The result is invisible: a billing engineer spends two weeks implementing Auth0's management API because ADR-007 says Auth0. Meanwhile, another engineer has already shipped Clerk for the onboarding flow because the DX is better, and nobody told the billing team. Both are acting in good faith. Nobody's talking.

This happens everywhere:
- Sprint planning that takes four hours because nobody actually knows what shipped last sprint.
- A customer call where the CEO promises SSO by Q2. The promise lives in a Fathom transcript nobody reads. No Linear issue is ever created. Q2 comes and goes.
- A runbook that hasn't been touched since 2023 covering a service that received seven PRs last month.
- A PRD that was updated twice after the tickets were filed. The tickets still reflect the original scope.

The frustrating part: every artifact is already digital. The Slack thread exists. The PR exists. The ADR exists. The call transcript exists. There is no information problem. There is a connection problem.

---

## The Insight

The closed loop requires two things: a "should be" signal and an "is" signal. For manufacturing, those signals are hard to compute — you need sensors, cameras, physics models. For engineering work, they're already in your tools.

"Should be" = ADRs, PRDs, roadmap commitments, customer promises.  
"Is" = merged PRs, git commits, Linear issue status, deploy logs.

The delta between them is literally computable. You don't need a PhD. You need a typed graph and a set of rules. The reason nobody has built this is that stitching together Slack + Linear + GitHub + Notion + call transcripts into a coherent data model is painful integration work, and nobody has done it as a product.

LLMs make the extraction step cheap enough to run on every event: pull the decision out of the Slack thread, extract the commitment from the call transcript, understand what the PR file list means in the context of the ADR. That extraction work, which would have cost $200k in NLP engineering two years ago, now costs fractions of a cent.

---

## What Nerith Is

Nerith is three things:

**1. A knowledge graph.** People, projects, decisions, commitments, artifacts, and outcomes — typed, timestamped, and connected. Every edge carries provenance: where did we learn this, when, how confident are we? The graph is the moat. It compounds per customer.

**2. Eight specialized agents.** Not a generalist chatbot. Eight agents with narrow contracts, typed inputs and outputs, and eval harnesses. Each one does one job and does it verifiably.

**3. A Drift Feed.** A single chronological feed of gap events — "this PR contradicts that decision," "this customer commitment has no ticket," "this service was modified six times and the runbook was never updated." Every card has evidence. Every card has a proposed action. One click to execute.

Nerith is not a search bar. You don't query it. It watches. When something drifts, it tells you. When you say go, it acts.

---

## Why Now

Three things converged:

**LLMs are cheap enough to run on every event.** Extracting a decision from a Slack thread or a customer commitment from a call transcript costs less than a cent. Running it on every event is now economically trivial. Twelve months ago it was not.

**Linear and GitHub APIs are mature and webhook-native.** Getting structured data out of both is a weekend of integration work, not a month. The data is accessible in a way it wasn't three years ago.

**Engineering leaders are feeling acute pain.** The post-2022 environment thinned teams and raised expectations simultaneously. Every VP Eng we've talked to can name three instances in the last quarter where their team built the wrong thing, or built the right thing twice, or missed a commitment they didn't know they'd made. The pain is specific and current.

---

## The Wedge

Engineering orgs at Series A/B companies, 30–200 people. This is the right wedge because:
- The artifacts are already structured (commits, PRs, issues, threads)
- The "should be" signal is explicit (ADRs, PRDs, roadmap)
- The buyer (VP Eng) has budget and pain
- The result is measurable (cycle time, sprint velocity, on-time delivery)

After we own engineering, the same graph extends to product (PRD ↔ shipped feature ↔ usage) and GTM (deal notes ↔ promised roadmap ↔ delivery). Engineering is the wedge; company intelligence is the platform.

---

## The 8 Agents

| Agent | Job |
|---|---|
| **Cartographer** | Maintains the knowledge graph; upserts nodes and edges from every integration event |
| **Drift Watcher** | Runs 6 rules to detect gaps between intent and reality; feeds the Drift Feed |
| **Decision Extractor** | Finds decisions and commitments buried in Slack threads, call transcripts, and docs |
| **Spec Synthesizer** | Drafts PRDs from accumulated context; every claim cited to a graph node |
| **Standup Composer** | Generates per-engineer daily standups from git, Linear, and Slack activity |
| **Executor** | Takes approved one-click actions: open PR, file ticket, update doc, DM owner |
| **Auditor** | Gates every agent output before it reaches a human; rejects uncited claims |
| **Retro Agent** | Produces sprint retrospectives with citations; shipped vs. planned with reasons why |

---

## The Moat

**The graph compounds.** After six months, Nerith knows six months of that company's decisions, commitments, drift events, and resolutions. Switching to a competitor means starting over. The value is in the history, not the software.

**Outcome pricing aligns incentives.** We charge against engineering hours recovered, not seats. Microsoft can't do this — they sell seats. We can measure the before/after because we're in the data. A customer who cuts their sprint planning time from four hours to one and ships 1.4x more per quarter generates clear, attributable ROI. We take a piece of that.

**Engineering-native UX.** PR-shaped diffs, inline citations, Slack-first delivery, keyboard-first UI. Not a SharePoint skin. Not a dashboard with 47 widgets. The product looks like something an engineer would build for themselves.

**Speed of iteration vs. horizontal incumbents.** Glean can't ship a Linear-specific drift rule in a week. We can. The rule we ship this week becomes data in next month's customer graphs, which becomes signal for better rules the month after.

---

## Competition

**Glean** — intranet search for IT departments. Glean retrieves; Nerith acts. Glean's buyer is the IT manager; ours is the VP Eng. Glean doesn't have a typed graph, doesn't know what an ADR is, and can't run a drift rule against a PR diff. Different product, different buyer, different motion.

**Microsoft Copilot** — horizontal, seat-priced, lives inside Office. Great at writing emails in Outlook. Not instrumented to detect that your auth migration contradicts your ADR. Microsoft's incentive is to maximize Copilot seats, not to cut your engineering cycle time.

**Linear / GitHub Copilot Workspace** — single-source. Linear can see Linear. GitHub can see GitHub. Neither can see the Fathom call where your CEO promised SSO to Acme Corp. Neither can cross-reference a merged PR against a decision made in a Slack thread six weeks earlier. The intersection is the product.

Nerith is the intersection of all sources, and it acts.

---

## Business Model

**Flat tier**: $2,000–$5,000/month for up to 50 engineers. Anchors the conversation. Covers infrastructure and a reasonable margin.

**Outcome tier**: A percentage of engineering hours recovered, measured by sprint cycle time (Linear ticket → merged PR) before and after Nerith. Design partners start on the flat tier and graduate to outcome pricing after 60 days of baseline data.

Outcome pricing is only possible because we're in the data. We see the before. We see the after. We can calculate the delta.

---

## Traction Plan

**Days 1–30**: One design partner committed before any product built. A VP Eng at a 40-person Series A company who can name three specific instances of drift in the last quarter. Validate the graph schema and the first two drift rules against their real data.

**Days 31–60**: Drift Watcher v1 in production with the design partner. Two active rules (issue no commits, PR contradicts ADR). Slack bot posts weekly digest. Decision Extractor running on meeting transcripts.

**Days 61–90**: Executor in production. One-click actions working. Design partner #2 committed (paid). Eval harness in CI with precision ≥ 0.85 on both deployed rules.

**Before seed close**: 3 paying pilots ($2k+/mo each), a 60-second video of a real drift event being detected and resolved end-to-end, and a graph with 90+ days of replay-ability per customer.

---

## Team

> Founders: …

---

## Ask

> Raising $…
