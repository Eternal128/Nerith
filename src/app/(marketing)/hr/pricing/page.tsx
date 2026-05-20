import Link from "next/link";

const PLANS = [
  {
    model: "HR SaaS Platform",
    badge: "Per-seat",
    tiers: [
      { name: "Starter", price: "$12/seat/mo", features: ["Up to 50 employees", "Recruitment module", "Onboarding plans", "Email support"] },
      { name: "Growth", price: "$9/seat/mo", features: ["51–500 employees", "All SaaS modules", "Pulse surveys", "Priority support"] },
      { name: "Enterprise", price: "Custom", features: ["500+ employees", "Custom integrations", "Dedicated CSM", "SLA guarantee"] },
    ],
  },
  {
    model: "AI Consulting",
    badge: "Project-based",
    tiers: [
      { name: "Screening Audit", price: "from $5,000", features: ["Bias detection report", "EEOC citation trail", "Remediation plan", "Human expert review"] },
      { name: "Pay Equity Audit", price: "from $7,500", features: ["Full pay gap analysis", "Equal Pay Act compliance", "Band recommendations", "Board-ready report"] },
      { name: "Full Compliance Review", price: "from $15,000", features: ["All audit types", "Regulatory roadmap", "Quarterly cadence", "Legal referral network"] },
    ],
  },
  {
    model: "Managed HR Services",
    badge: "Monthly retainer",
    tiers: [
      { name: "Growth", price: "$8,000/mo", features: ["Up to 100 employees", "Dedicated HRBP", "AI-augmented recruiting", "Monthly reporting"] },
      { name: "Scale", price: "$20,000/mo", features: ["101–500 employees", "2 HRBPs + AI stack", "Compliance monitoring", "Executive dashboard"] },
      { name: "Enterprise", price: "Custom", features: ["500+ employees", "Embedded HR team", "Custom SLAs", "Priority escalation"] },
    ],
  },
  {
    model: "Talent Marketplace",
    badge: "Success fee",
    tiers: [
      { name: "Individual Hire", price: "15% first-year salary", features: ["AI screening included", "Diversity slate guarantee", "90-day replacement warranty", "No upfront cost"] },
      { name: "Volume (10+)", price: "12% first-year salary", features: ["Dedicated sourcer", "Custom intake process", "Bias audit on every req", "Quarterly pipeline review"] },
    ],
  },
  {
    model: "HR Intelligence",
    badge: "Pay-per-report",
    tiers: [
      { name: "Sentiment Report", price: "$199", features: ["Monthly trend data", "Team-level breakdown", "Attrition risk scores", "Burnout signal detection"] },
      { name: "Pay Equity Report", price: "$299", features: ["Gender & race pay gaps", "Level-adjusted analysis", "Benchmark comparisons", "Remediation estimate"] },
      { name: "Full Intelligence Bundle", price: "$599/mo", features: ["All report types", "Real-time dashboard", "Custom alerts", "API access"] },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl mb-3">Pricing</h1>
        <p className="text-muted-foreground text-lg">Five models. One mission: fair, explainable people decisions.</p>
      </div>

      <div className="space-y-12">
        {PLANS.map(plan => (
          <section key={plan.model}>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-serif text-2xl">{plan.model}</h2>
              <span className="text-xs font-mono bg-foreground/10 text-foreground px-2 py-0.5 rounded">{plan.badge}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {plan.tiers.map(tier => (
                <div key={tier.name} className="bg-card border border-border rounded-xl p-6">
                  <p className="font-mono text-xs text-muted-foreground mb-2">{tier.name}</p>
                  <p className="font-serif text-2xl mb-4">{tier.price}</p>
                  <ul className="space-y-2">
                    {tier.features.map(f => (
                      <li key={f} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-accent">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/hr" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Nerith HR overview
        </Link>
      </div>
    </div>
  );
}
