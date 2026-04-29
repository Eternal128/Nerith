export default function HowItWorksPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl mb-4">How Nerith works</h1>
        <p className="text-lg text-[var(--color-muted)]">
          The closed loop that most engineering orgs don&#39;t have — and can&#39;t build themselves.
        </p>
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="font-serif text-2xl mb-4">1. Ingest your context</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
            Nerith connects to Slack, GitHub, Linear, Notion, and call recording tools (Granola, Fathom). Every event — message sent, PR opened, issue updated, doc edited, call recorded — flows through the Cartographer agent, which normalizes it into a knowledge graph mutation.
          </p>
          <div className="card p-4 bg-[var(--color-rule)] border-none">
            <div className="text-xs font-mono text-[var(--color-muted)]">
              slack.message → cartographer → upsert_node(Message) + upsert_edge(MENTIONS, Person)<br/>
              github.pull_request → cartographer → upsert_node(PullRequest) + upsert_edge(AUTHORED, Person)<br/>
              linear.issue_updated → cartographer → upsert_node(Issue) + upsert_edge(IMPLEMENTS, Project)
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">2. Build the knowledge graph</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
            Every node carries provenance (which events created it), confidence (how certain we are), and timestamps (when it was valid). Edges are temporal — a MEMBER_OF edge can have a valid_to when someone leaves a team.
          </p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            The graph answers questions like: Which decisions govern this PR? Who was in the room when this commitment was made? Which services does this issue touch?
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">3. Agents run continuously</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-4">
            Six deterministic drift rules run on every graph update. The Decision Extractor scans every Slack thread and call transcript for commitment language. The Spec Synthesizer clusters related context and drafts PRDs. The Standup Composer reads activity feeds.
          </p>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            Every agent output is validated by the Auditor before it reaches the UI. Uncited claims are rejected. Hallucinated IDs are caught.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-2xl mb-4">4. One-click resolution</h2>
          <p className="text-sm text-[var(--color-muted)] leading-relaxed">
            Every drift event comes with proposed actions: file a ticket, open a PR, update a doc, DM an owner. The Executor records every action to an immutable audit log. In demo mode, all actions are mocked — you see exactly what would happen without touching real systems.
          </p>
        </section>
      </div>
    </div>
  )
}
