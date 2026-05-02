export default function HowItWorksPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">HOW IT WORKS</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight max-w-2xl mb-6">
            The closed loop most engineering orgs don&apos;t have
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink)]/70 max-w-2xl">
            And can&apos;t build themselves — because the integration work alone takes 6 months.
          </p>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Steps */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="space-y-20">
            {[
              {
                num: '01',
                title: 'Ingest your context',
                body: 'Nerith connects to Slack, GitHub, Linear, Notion, and call recording tools (Granola, Fathom). Every event — message sent, PR opened, issue updated, doc edited, call recorded — flows through the Cartographer agent, which normalizes it into a knowledge graph mutation.',
                code: 'slack.message → cartographer → upsert_node(Message) + upsert_edge(MENTIONS, Person)\ngithub.pull_request → cartographer → upsert_node(PullRequest) + upsert_edge(AUTHORED, Person)\nlinear.issue_updated → cartographer → upsert_node(Issue) + upsert_edge(IMPLEMENTS, Project)',
              },
              {
                num: '02',
                title: 'Build the knowledge graph',
                body: 'Every node carries provenance (which events created it), confidence (how certain we are), and timestamps (when it was valid). Edges are temporal — a MEMBER_OF edge can have a valid_to when someone leaves a team. The graph answers: Which decisions govern this PR? Who was in the room when this commitment was made? Which services does this issue touch?',
                code: null,
              },
              {
                num: '03',
                title: 'Agents run continuously',
                body: 'Six deterministic drift rules run on every graph update. The Decision Extractor scans every Slack thread and call transcript for commitment language. The Spec Synthesizer clusters related context and drafts PRDs. Every agent output is validated by the Auditor before it reaches the UI. Uncited claims are rejected.',
                code: null,
              },
              {
                num: '04',
                title: 'One-click resolution',
                body: 'Every drift event comes with proposed actions: file a ticket, open a PR, update a doc, DM an owner. The Executor records every action to an immutable audit log. In demo mode, all actions are mocked — you see exactly what would happen without touching real systems.',
                code: null,
              },
            ].map(({ num, title, body, code }) => (
              <div key={num} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12">
                <div className="font-mono text-xs text-[var(--color-muted)] pt-1">{num}</div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl mb-4">{title}</h2>
                  <p className="text-sm leading-relaxed text-[var(--color-ink)]/70 max-w-2xl">{body}</p>
                  {code && (
                    <div className="mt-6 bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-4">
                      <pre className="font-mono text-xs text-[var(--color-muted)] whitespace-pre-wrap leading-relaxed">{code}</pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
            See it running on fixture data.
          </h2>
          <a href="/app/feed" className="btn btn-primary">Open the demo →</a>
        </div>
      </section>
    </div>
  )
}
