export default function SecurityPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">SECURITY &amp; TRUST</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight max-w-2xl mb-6">
            Nerith processes your most sensitive context.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink)]/70 max-w-xl">
            We take that seriously.
          </p>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Security items */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="max-w-3xl space-y-12">
            {[
              {
                title: 'SOC2 Type II (in progress)',
                body: 'We are pursuing SOC2 Type II certification. Our controls audit began in January 2025. Expected report: Q4 2025. Interim compliance documentation available on request.',
              },
              {
                title: 'Data isolation',
                body: 'Every workspace is isolated at the database row level via workspace_id RLS policies. No cross-workspace data leakage is architecturally possible.',
              },
              {
                title: 'Encryption',
                body: 'All data is encrypted at rest (AES-256) and in transit (TLS 1.3). LLM calls use ephemeral context — no workspace data is retained by LLM providers.',
              },
              {
                title: 'Access controls',
                body: 'Role-based access control with workspace admin, member, and viewer roles. All agent actions are recorded to an immutable audit log.',
              },
              {
                title: 'Vendor security',
                body: 'All third-party vendors undergo security review before integration. Supabase (database) and Vercel (hosting) hold SOC2 Type II.',
              },
              {
                title: 'Data retention',
                body: 'Growth plan: 90-day retention by default, configurable up to 1 year. Enterprise: custom retention. Right to deletion honored within 30 days.',
              },
            ].map(({ title, body }) => (
              <div key={title}>
                <h2 className="font-serif text-2xl mb-3">{title}</h2>
                <p className="text-sm leading-relaxed text-[var(--color-ink)]/70">{body}</p>
                <hr className="border-t border-[var(--color-rule)] mt-10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4">Questions about our security posture?</h2>
          <p className="text-sm text-[var(--color-ink)]/70 mb-8">We review every inquiry personally.</p>
          <a href="/request-access" className="btn btn-secondary">Contact us →</a>
        </div>
      </section>
    </div>
  )
}
