export default function SecurityPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <h1 className="font-serif text-4xl mb-4">Security & Trust</h1>
        <p className="text-lg text-[var(--color-muted)]">
          Nerith processes your company&#39;s most sensitive context. We take that seriously.
        </p>
      </div>

      <div className="space-y-8">
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
            body: 'All third-party vendors undergo security review before integration. Clerk (auth), Supabase (database), and Vercel (hosting) all hold SOC2 Type II.',
          },
          {
            title: 'Data retention',
            body: 'Growth plan: 90-day retention by default, configurable up to 1 year. Enterprise: custom retention. Right to deletion honored within 30 days.',
          },
        ].map(({ title, body }) => (
          <div key={title}>
            <h2 className="font-serif text-xl mb-2">{title}</h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">{body}</p>
            <hr className="rule mt-6" />
          </div>
        ))}
      </div>
    </div>
  )
}
