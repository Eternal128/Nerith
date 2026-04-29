export default function ForEngLeadersPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl mb-4">For engineering leaders</h1>
        <p className="text-lg text-[var(--color-muted)]">
          The tool you&#39;ve been building in your head for three years. We built it.
        </p>
      </div>

      <div className="space-y-10">
        <section>
          <h2 className="font-serif text-2xl mb-3">The problem you know too well</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-3">
            You lead a 40-person engineering org. You have ADRs in Notion that nobody reads. You have Slack threads that contain real decisions but aren&#39;t tracked anywhere. You have sales commitments that engineering doesn&#39;t know about until two weeks before the deadline.
          </p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            Every quarter you spend a week doing archaeology — reading six months of Slack, reading PRs, pulling the real story of why Q1 didn&#39;t go as planned. Nerith does that continuously, in the background, and tells you when something is about to go wrong instead of after it does.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-3">What changes on day one</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Every decision is tracked',
                desc: 'The Decision Extractor reads your Slack and call transcripts. When Priya says "we\'re going with Auth0" in a planning meeting, it gets recorded — with the call citation, the participants, and the date.',
              },
              {
                title: 'Commitments don\'t fall through the floor',
                desc: 'When Tyler tells a customer "we\'ll have SAML by April 30," Nerith extracts that commitment, links it to the Acme Logistics account, and flags it if engineering hasn\'t filed a ticket.',
              },
              {
                title: 'Drift is caught at merge time',
                desc: 'When a PR contradicts an ADR, you know immediately — not when the security team does the next quarterly review. The Drift Watcher fires within seconds of the merge.',
              },
              {
                title: 'Your retros write themselves',
                desc: 'The Retro Agent generates planned vs shipped diffs with root cause clusters before your retro meeting. Your team spends the meeting deciding what to do about it, not figuring out what happened.',
              },
            ].map(({ title, desc }) => (
              <div key={title} className="card p-4 flex gap-4">
                <div className="w-1 bg-[var(--color-accent)] rounded-full shrink-0" />
                <div>
                  <div className="text-sm font-medium mb-1">{title}</div>
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-3">What you keep</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            Nerith is built around human-in-the-loop. Every proposed action requires approval. Every agent output is audited before display. The Executor records everything to an immutable audit log. You always know what Nerith did, why it did it, and who approved it.
          </p>
        </section>
      </div>
    </div>
  )
}
