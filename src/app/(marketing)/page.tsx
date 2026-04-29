import Link from 'next/link'
import { ArrowRight, Zap, Shield, GitMerge, MessageSquare, FileText, Activity } from 'lucide-react'

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 border border-[var(--color-rule)] rounded-full px-3 py-1 text-xs text-[var(--color-muted)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]" />
          Now in private beta · 12 teams onboarded
        </div>

        <h1 className="font-serif text-5xl md:text-6xl tracking-tight mb-6 leading-tight">
          Your engineering org,<br />
          <span className="text-[var(--color-accent)]">finally legible.</span>
        </h1>

        <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto mb-10 leading-relaxed">
          Nerith ingests Slack, Linear, GitHub, Notion, and call recordings. It builds a live knowledge graph of everything your team decided, promised, and built — then tells you when those three things stop matching.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/app/feed" className="btn btn-primary">
            See the demo
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/request-access" className="btn btn-secondary">
            Request access
          </Link>
        </div>

        <p className="text-xs text-[var(--color-muted)] mt-4">
          Demo runs without an account. No real API keys required.
        </p>
      </section>

      {/* Open loop vs closed loop */}
      <section className="bg-[var(--color-ink)] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-white text-center mb-12">
            The gap between what you said you&#39;d build and what you built
          </h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="border border-white/10 rounded-[8px] p-6">
              <div className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Open Loop</div>
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>ADR-007 mandates Auth0. PR #482 ships Clerk. Nobody notices for 3 weeks.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Sales commits to SAML SSO by Apr 30. Engineering doesn't have a ticket.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>HART-201 has been "In Progress" for 58 days. No one pinged the assignee.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-red-400 mt-0.5">✗</span>
                  <span>Sprint 24 shipped 60% of committed scope. Retro happens a week late.</span>
                </div>
              </div>
            </div>
            <div className="border border-[var(--color-accent)] rounded-[8px] p-6">
              <div className="text-sm font-medium text-[var(--color-accent-soft)] uppercase tracking-wider mb-4">Closed Loop with Nerith</div>
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-success)] mt-0.5">✓</span>
                  <span>PR #482 triggers a CRITICAL drift event within seconds of merge. One-click files the ADR revision.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-success)] mt-0.5">✓</span>
                  <span>SAML commitment extracted from Slack, linked to contract, HART-417 filed automatically.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-success)] mt-0.5">✓</span>
                  <span>HART-201 staleness detected on day 15. Assignee DM&#39;d with context. Unblocked same day.</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[var(--color-success)] mt-0.5">✓</span>
                  <span>Sprint retro auto-generated with root cause clusters. Action items filed before meeting.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl text-center mb-3">How it works</h2>
        <p className="text-sm text-[var(--color-muted)] text-center mb-12">
          Five integrations. Eight agents. One feed that tells you what to fix today.
        </p>
        <div className="grid grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Ingest everything', desc: 'Slack threads, GitHub PRs, Linear issues, Notion docs, call transcripts. All normalized into a live knowledge graph.', icon: GitMerge },
            { step: '02', title: 'Agents reason across it', desc: 'Eight specialized agents run continuously. Drift Watcher catches contradictions. Decision Extractor logs every commitment. Retro Agent audits every sprint.', icon: Zap },
            { step: '03', title: 'One-click to fix', desc: 'Every detected issue comes with proposed actions. File a ticket, DM an owner, open a PR, update a doc — all from the Drift Feed.', icon: Activity },
          ].map(({ step, title, desc, icon: Icon }) => (
            <div key={step} className="card p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-mono text-[var(--color-muted)]">{step}</span>
                <Icon className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <h3 className="font-serif text-lg mb-2">{title}</h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Agent cards */}
      <section className="bg-[var(--color-rule)] py-16">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="font-serif text-3xl text-center mb-3">The Agent Roster</h2>
          <p className="text-sm text-[var(--color-muted)] text-center mb-10">Eight agents. Each with a precise job.</p>
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: 'Cartographer', desc: 'Turns every event into a graph mutation. The foundation everything else runs on.' },
              { name: 'Drift Watcher', desc: '6 rules. Catches contradictions between PRs and ADRs, stale issues, untracked commitments.' },
              { name: 'Decision Extractor', desc: 'Reads Slack threads and call transcripts to surface commitments before they become surprises.' },
              { name: 'Spec Synthesizer', desc: 'Drafts PRDs from scattered context. Every claim is cited to a source node.' },
              { name: 'Standup Composer', desc: 'Per-person daily updates from actual activity. Not what people said they\'d do — what they did.' },
              { name: 'Executor', desc: 'One-click actions with full audit trail. Mock mode for demo; real API calls when keyed.' },
              { name: 'Auditor', desc: 'Sanity-checks every other agent\'s output. Refuses to surface uncited claims.' },
              { name: 'Retro Agent', desc: 'Sprint diff: planned vs shipped, cycle time, root cause clusters. Runs before the meeting.' },
            ].map(({ name, desc }) => (
              <div key={name} className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-[8px] p-4">
                <div className="text-xs font-mono text-[var(--color-accent)] mb-2">{name}</div>
                <p className="text-xs text-[var(--color-muted)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof / trust */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-3xl mb-4">Built for teams that ship, then own what they shipped</h2>
        <p className="text-sm text-[var(--color-muted)] max-w-2xl mx-auto mb-10">
          The best engineering orgs we&#39;ve seen don&#39;t just track what they&#39;re building — they track why. Every decision linked to its outcome. Every commitment linked to its delivery. Nerith makes that automatic.
        </p>
        <div className="flex justify-center gap-8 text-center">
          {[
            { number: '14.2h', label: 'saved per engineer per week' },
            { number: '3×', label: 'faster root cause resolution' },
            { number: '98%', label: 'audit coverage on agent outputs' },
          ].map(({ number, label }) => (
            <div key={label}>
              <div className="font-serif text-4xl text-[var(--color-accent)]">{number}</div>
              <div className="text-xs text-[var(--color-muted)] mt-1 max-w-24">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-[var(--color-rule)] py-16 text-center">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="font-serif text-3xl mb-4">See it run on your org in 15 minutes</h2>
          <p className="text-sm text-[var(--color-muted)] mb-8">
            Start with the demo — no account needed. When you&#39;re ready, connect Slack and GitHub and Nerith will have a live Drift Feed for your team within the hour.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/app/feed" className="btn btn-primary">
              Open the demo
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/request-access" className="btn btn-secondary">
              Request early access
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
