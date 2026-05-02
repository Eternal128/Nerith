export default function ForEngLeadersPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">FOR ENGINEERING LEADERS</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight max-w-2xl mb-6">
            The tool you&apos;ve been building in your head for three years.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink)]/70 max-w-xl">
            We built it.
          </p>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* The problem */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">THE PROBLEM</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-2xl">The problem you know too well</h2>
          </div>
          <div className="max-w-2xl space-y-4">
            <p className="text-sm leading-relaxed text-[var(--color-ink)]/70">
              You lead a 40-person engineering org. You have ADRs in Notion that nobody reads. You have Slack threads that contain real decisions but aren&apos;t tracked anywhere. You have sales commitments that engineering doesn&apos;t know about until two weeks before the deadline.
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-ink)]/70">
              Every quarter you spend a week doing archaeology — reading six months of Slack, reading PRs, pulling the real story of why Q1 didn&apos;t go as planned. Nerith does that continuously, in the background, and tells you when something is about to go wrong instead of after it does.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* What changes */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">DAY ONE</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">What changes on day one</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Every decision is tracked',
                desc: "The Decision Extractor reads your Slack and call transcripts. When Priya says \"we're going with Auth0\" in a planning meeting, it gets recorded — with the call citation, the participants, and the date.",
              },
              {
                title: "Commitments don't fall through the floor",
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
              <div key={title} className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-6 md:p-8 flex gap-6">
                <div className="w-0.5 bg-[var(--color-accent)] rounded-full shrink-0" />
                <div>
                  <div className="font-serif text-lg mb-2">{title}</div>
                  <p className="text-sm leading-relaxed text-[var(--color-ink)]/70">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* What you keep */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">CONTROL</p>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight max-w-xl">What you keep</h2>
          </div>
          <p className="text-sm leading-relaxed text-[var(--color-ink)]/70 max-w-2xl">
            Nerith is built around human-in-the-loop. Every proposed action requires approval. Every agent output is audited before display. The Executor records everything to an immutable audit log. You always know what Nerith did, why it did it, and who approved it.
          </p>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">
            See it on Hartwell Robotics fixture data.
          </h2>
          <a href="/app/feed" className="btn btn-primary">Open the demo →</a>
        </div>
      </section>
    </div>
  )
}
