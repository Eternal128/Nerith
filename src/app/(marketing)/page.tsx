import Link from 'next/link'
import { GitBranch, Workflow, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-32 md:py-48">
        <div className="max-w-5xl mx-auto px-6 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-[var(--color-muted)] mb-10">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
            Now in private beta · 12 teams onboarded
          </div>

          <h1 className="font-serif text-5xl md:text-7xl tracking-[-0.02em] leading-[1.05] mb-8 max-w-4xl mx-auto">
            Your engineering org,<br />
            finally legible.
          </h1>

          <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink)]/80 max-w-2xl mx-auto mb-10">
            Nerith ingests Slack, Linear, GitHub, Notion, and call recordings. It builds a live knowledge graph of everything your team decided, promised, and built — then tells you when those three things stop matching.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/app/feed" className="btn btn-primary">
              See the demo →
            </Link>
            <Link href="/request-access" className="btn btn-secondary">
              Request access
            </Link>
          </div>

          <p className="text-xs text-[var(--color-muted)] mt-4">
            Demo runs without an account · No real API keys required
          </p>
        </div>
      </section>

      {/* Proof strip */}
      <hr className="border-t border-[var(--color-rule)]" />
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            33 drift events surfaced · 8 agents running · 6 months of fixture data · ⌘K for everything
          </p>
        </div>
      </section>
      <hr className="border-t border-[var(--color-rule)]" />

      {/* The Gap */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">THE PROBLEM</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-2xl">
              The gap between what you said you&apos;d build and what you built
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="border-l-2 border-[var(--color-danger)]/40 pl-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-danger)]/60 mb-6">WITHOUT NERITH</p>
              <ul className="space-y-5">
                {[
                  'ADR-007 mandates Auth0. PR #482 ships Clerk. Nobody notices for 3 weeks.',
                  "Sales commits to SAML SSO by Apr 30. Engineering doesn't have a ticket.",
                  'HART-201 has been "In Progress" for 58 days. No one pinged the assignee.',
                  'Sprint 24 shipped 60% of committed scope. Retro happens a week late.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="text-[var(--color-danger)] mt-0.5 shrink-0">×</span>
                    <span className="text-[var(--color-ink)]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-l-2 border-[var(--color-success)]/40 pl-6">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-success)]/60 mb-6">WITH NERITH</p>
              <ul className="space-y-5">
                {[
                  'PR #482 triggers a CRITICAL drift event within seconds of merge. One-click files the ADR revision.',
                  "SAML commitment extracted from Slack, linked to contract, HART-417 filed automatically.",
                  "HART-201 staleness detected on day 15. Assignee DM'd with context. Unblocked same day.",
                  'Sprint retro auto-generated with root cause clusters. Action items filed before meeting.',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="text-[var(--color-success)] mt-0.5 shrink-0">✓</span>
                    <span className="text-[var(--color-ink)]/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* How it works */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">THE LOOP</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Five integrations. Eight agents. One feed.</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                num: '01',
                icon: GitBranch,
                title: 'Ingest',
                desc: 'Slack, GitHub, Linear, Notion, calls. Webhooks + nightly backfill. Mock fixtures for demo.',
              },
              {
                num: '02',
                icon: Workflow,
                title: 'Reason',
                desc: 'Eight agents run continuously over a typed temporal graph. Every claim cites the source node.',
              },
              {
                num: '03',
                icon: Zap,
                title: 'Act',
                desc: 'One-click fixes from the Drift Feed: file the ticket, open the PR, update the doc, DM the owner.',
              },
            ].map(({ num, icon: Icon, title, desc }) => (
              <div key={num} className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-mono text-xs text-[var(--color-muted)]">{num}</span>
                  <Icon size={18} className="text-[var(--color-accent)]" />
                </div>
                <h3 className="font-serif text-xl mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink)]/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Agent Roster */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">THE ROSTER</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Eight agents. Each with a precise job.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', name: 'Cartographer', desc: 'Turns every event into a graph mutation. The foundation everything else runs on.', path: 'cartographer' },
              { num: '02', name: 'Drift Watcher', desc: '6 rules. Catches contradictions between PRs and ADRs, stale issues, untracked commitments.', path: 'drift-watcher' },
              { num: '03', name: 'Decision Extractor', desc: 'Reads Slack threads and call transcripts to surface commitments before they become surprises.', path: 'decision-extractor' },
              { num: '04', name: 'Spec Synthesizer', desc: 'Drafts PRDs from scattered context. Every claim is cited to a source node.', path: 'spec-synthesizer' },
              { num: '05', name: 'Standup Composer', desc: "Per-person daily updates from actual activity — not what people said they'd do.", path: 'standup-composer' },
              { num: '06', name: 'Executor', desc: 'One-click actions with full audit trail. Mock mode for demo; real API calls when keyed.', path: 'executor' },
              { num: '07', name: 'Auditor', desc: "Sanity-checks every other agent's output. Refuses to surface uncited claims.", path: 'auditor' },
              { num: '08', name: 'Retro Agent', desc: 'Sprint diff: planned vs shipped, cycle time, root cause clusters. Runs before the meeting.', path: 'retro-agent' },
            ].map(({ num, name, desc, path }) => (
              <div key={num} className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-6 hover:border-[var(--color-ink)]/20 transition-colors">
                <div className="font-mono text-xs text-[var(--color-muted)] mb-3">{num} / 08</div>
                <div className="font-serif text-lg mb-2">{name}</div>
                <p className="text-xs leading-relaxed text-[var(--color-ink)]/70 mb-4">{desc}</p>
                <div className="font-mono text-[10px] text-[var(--color-muted)]">→ src/lib/agents/{path}/</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Drift event preview */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">WHAT IT FEELS LIKE</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">A real drift event from the demo data</h2>
          </div>
          <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-6 md:p-8 max-w-3xl">
            <div className="flex items-start justify-between mb-4">
              <span className="pill pill-danger">CRITICAL</span>
              <span className="font-mono text-xs text-[var(--color-muted)]">rule-pr-contradicts-adr</span>
            </div>
            <h3 className="font-serif text-xl mb-4">
              PR #482 implements auth via Clerk; ADR-007 specifies Auth0
            </h3>
            <div className="mb-6">
              <div className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider mb-3">Evidence</div>
              <div className="space-y-2">
                {[
                  { ref: 'PR-482', label: 'feat: migrate auth to Clerk SDK', type: 'pull_request' },
                  { ref: 'ADR-007', label: 'Auth0 is the mandated identity provider', type: 'adr' },
                  { ref: 'auth-svc', label: 'Authentication service node', type: 'service' },
                ].map(({ ref, label, type }) => (
                  <div key={ref} className="flex items-center gap-3 text-xs py-1.5">
                    <span className="font-mono text-[var(--color-accent)] shrink-0">{ref}</span>
                    <span className="text-[var(--color-muted)]">·</span>
                    <span className="text-[var(--color-ink)]/70 flex-1">{label}</span>
                    <span className="pill pill-neutral">{type}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-rule)]">
              <span className="btn btn-primary text-xs">File ADR revision →</span>
              <span className="btn btn-secondary text-xs">View in graph</span>
              <span className="btn btn-ghost text-xs">Dismiss</span>
            </div>
          </div>
          <p className="text-xs text-[var(--color-muted)] mt-4">
            This event fires on the seeded data. See it live in the demo.
          </p>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Trust */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">EARNING TRUST</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-2xl">
              We don&apos;t ship anything an engineer can&apos;t audit.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Citations everywhere',
                desc: "Every agent output carries node IDs pointing to the exact graph nodes that support the claim. The Auditor rejects any output that can't be traced back to a source event.",
              },
              {
                title: 'Human-in-the-loop by default',
                desc: 'The Executor requires explicit approval for every action. No agent autonomously files tickets, opens PRs, or DMs teammates without a human clicking approve.',
              },
              {
                title: 'Immutable audit log',
                desc: 'Every action — approved or rejected — is written to an append-only audit trail with agent name, input, output, and approving user.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-6 md:p-8">
                <h3 className="font-serif text-xl mb-3">{title}</h3>
                <p className="text-sm leading-relaxed text-[var(--color-ink)]/70">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Pricing teaser */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">PRICING</p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-6">
            Priced against engineering hours recovered.
          </h2>
          <p className="text-base text-[var(--color-ink)]/70 max-w-xl mb-8">
            Flat rates by team size. No per-seat pricing that punishes growth. Pilot tier free for the first 90 days.
          </p>
          <Link href="/pricing" className="btn btn-secondary">View pricing →</Link>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Footer CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8 max-w-lg mx-auto">
            See the loop close<br />in 60 seconds.
          </h2>
          <Link href="/app/feed" className="btn btn-primary">
            Open the demo →
          </Link>
        </div>
      </section>
    </div>
  )
}
