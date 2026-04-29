import Link from 'next/link'

const PLANS = [
  {
    name: 'Startup',
    price: '$0',
    period: '/mo',
    description: 'For teams finding product-market fit.',
    features: [
      'Up to 10 engineers',
      'Drift Feed (50 events/day)',
      'GitHub + Linear connectors',
      'Basic agent roster',
      '7-day event history',
    ],
    cta: 'Start free',
    ctaHref: '/request-access',
    accent: false,
  },
  {
    name: 'Growth',
    price: '$420',
    period: '/mo',
    description: 'For scaling engineering teams who ship fast and need to stay coherent.',
    features: [
      'Up to 50 engineers',
      'Unlimited drift events',
      'All 5 connectors (Slack, GitHub, Linear, Notion, Granola)',
      'All 8 agents + eval harness',
      '90-day event history',
      'SSO (SAML)',
      'Priority support',
    ],
    cta: 'Request access',
    ctaHref: '/request-access',
    accent: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For organizations that need compliance, custom agents, and SLAs.',
    features: [
      'Unlimited engineers',
      'Custom agent development',
      'On-prem / VPC deployment',
      'SOC2 Type II (in progress)',
      '3-year data retention',
      'Dedicated support + SLA',
      'Custom integrations',
    ],
    cta: 'Talk to us',
    ctaHref: '/request-access',
    accent: false,
  },
]

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl mb-4">Simple, transparent pricing</h1>
        <p className="text-lg text-[var(--color-muted)]">
          No per-seat pricing that punishes growth. Flat rates aligned with what you&#39;re actually getting.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-12">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`card p-6 flex flex-col ${plan.accent ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]' : ''}`}
          >
            {plan.accent && (
              <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-accent)] mb-3">Most popular</div>
            )}
            <div className="mb-4">
              <div className="font-serif text-xl mb-1">{plan.name}</div>
              <div className="flex items-baseline gap-1">
                <span className="font-serif text-3xl">{plan.price}</span>
                <span className="text-sm text-[var(--color-muted)]">{plan.period}</span>
              </div>
              <p className="text-xs text-[var(--color-muted)] mt-2">{plan.description}</p>
            </div>

            <ul className="flex-1 space-y-2 mb-6">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-xs">
                  <span className="text-[var(--color-success)] mt-0.5">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={plan.ctaHref}
              className={`btn text-center justify-center ${plan.accent ? 'btn-primary' : 'btn-secondary'}`}
            >
              {plan.cta}
            </Link>
          </div>
        ))}
      </div>

      <div className="card p-6 text-center">
        <h2 className="font-serif text-xl mb-2">Outcome-based pricing coming soon</h2>
        <p className="text-sm text-[var(--color-muted)] max-w-lg mx-auto">
          We&#39;re piloting a tier priced on engineering hours saved per month. If Nerith doesn&#39;t demonstrably improve your team&#39;s coherence, you don&#39;t pay.
        </p>
      </div>
    </div>
  )
}
