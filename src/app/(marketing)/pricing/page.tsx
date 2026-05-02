import Link from 'next/link'

const PLANS = [
  {
    name: 'Pilot',
    price: '$0',
    period: '/mo for 90 days',
    description: 'For teams evaluating Nerith on real data. No credit card required.',
    features: [
      'Up to 15 engineers',
      'Drift Feed (unlimited events)',
      'GitHub + Linear connectors',
      'All 8 agents',
      '30-day event history',
      'Community support',
    ],
    cta: 'Start free',
    ctaHref: '/request-access',
  },
  {
    name: 'Scale',
    price: '$490',
    period: '/mo',
    description: 'For scaling engineering teams who ship fast and need to stay coherent.',
    features: [
      'Up to 100 engineers',
      'Unlimited drift events',
      'All 5 connectors (Slack, GitHub, Linear, Notion, Granola)',
      'All 8 agents + eval harness',
      '90-day event history',
      'SSO (SAML)',
      'Priority support',
    ],
    cta: 'Request access',
    ctaHref: '/request-access',
  },
]

export default function PricingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">PRICING</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight max-w-2xl mb-6">
            Priced against engineering hours recovered.
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[var(--color-ink)]/70 max-w-xl">
            No per-seat pricing that punishes growth. Flat rates aligned with what you&apos;re actually getting.
          </p>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Plans */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mb-12">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-6 md:p-8 flex flex-col"
              >
                <div className="mb-6">
                  <div className="font-serif text-2xl mb-2">{plan.name}</div>
                  <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="font-serif text-3xl">{plan.price}</span>
                    <span className="text-sm text-[var(--color-muted)]">{plan.period}</span>
                  </div>
                  <p className="text-xs text-[var(--color-ink)]/70 leading-relaxed">{plan.description}</p>
                </div>

                <hr className="border-t border-[var(--color-rule)] mb-6" />

                <ul className="flex-1 space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs">
                      <span className="text-[var(--color-success)] mt-0.5 shrink-0">✓</span>
                      <span className="text-[var(--color-ink)]/80">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className="btn btn-secondary text-center justify-center"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Enterprise */}
          <div className="bg-[var(--color-paper)] border border-[var(--color-rule)] rounded-lg p-6 md:p-8 max-w-3xl">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="font-serif text-2xl mb-2">Enterprise</div>
                <p className="text-xs text-[var(--color-ink)]/70 max-w-md">
                  Unlimited engineers, on-prem / VPC deployment, custom agent development, SOC2 Type II, 3-year retention, dedicated SLA.
                </p>
              </div>
              <Link href="/request-access" className="btn btn-secondary shrink-0">Talk to us →</Link>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* Outcome-based */}
      <section className="py-24 md:py-32">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] mb-4">COMING SOON</p>
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-4 max-w-xl">Outcome-based pricing</h2>
          <p className="text-sm leading-relaxed text-[var(--color-ink)]/70 max-w-xl">
            We&apos;re piloting a tier priced on engineering hours saved per month. If Nerith doesn&apos;t demonstrably improve your team&apos;s coherence, you don&apos;t pay.
          </p>
        </div>
      </section>

      <hr className="border-t border-[var(--color-rule)]" />

      {/* CTA */}
      <section className="py-24 md:py-32 text-center">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-8">Start with the demo. No account needed.</h2>
          <a href="/app/feed" className="btn btn-primary">Open the demo →</a>
        </div>
      </section>
    </div>
  )
}
