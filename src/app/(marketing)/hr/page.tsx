import Link from "next/link";

const MODELS = [
  {
    title: "HR SaaS Platform",
    tagline: "Self-serve AI for every people team.",
    description: "Modular AI tools for recruitment, onboarding, performance coaching, and pulse surveys. Deploy in days, not months.",
    badge: "Per-seat",
  },
  {
    title: "AI Consulting",
    tagline: "On-demand compliance audits.",
    description: "Expert-led audits powered by AI. Screening bias detection, pay equity analysis, and EEOC compliance — all with full citation trails.",
    badge: "Project-based",
  },
  {
    title: "Managed HR Services",
    tagline: "Outsource the whole people stack.",
    description: "From sourcing to coaching, a dedicated HRBP team augmented by AI. Every decision is explainable and auditable.",
    badge: "Retainer",
  },
  {
    title: "Talent Marketplace",
    tagline: "Match faster. Hire fairer.",
    description: "An AI-screened talent pool connecting vetted candidates with employers. Pay only when you make a successful hire.",
    badge: "Success fee",
  },
  {
    title: "HR Intelligence",
    tagline: "Data you can act on.",
    description: "Aggregated workforce analytics, sentiment trend reports, and pay-equity insights. Subscribe or buy individual reports.",
    badge: "Pay-per-report",
  },
];

export default function HRMarketingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <span className="text-xs font-mono text-accent mb-4 block">NERITH HR</span>
        <h1 className="font-serif text-5xl mb-4">AI-Enhanced HR Services</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Five ways to deploy people intelligence — from self-serve SaaS to fully managed HR operations.
          Every decision is cited, auditable, and explainable.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/app/hr" className="px-6 py-3 bg-foreground text-background rounded text-sm font-medium hover:opacity-80 transition-opacity">
            Open Dashboard
          </Link>
          <Link href="/hr/pricing" className="px-6 py-3 border border-border rounded text-sm hover:border-foreground transition-colors">
            View Pricing
          </Link>
        </div>
      </div>

      <div className="space-y-6">
        {MODELS.map((m, i) => (
          <div key={m.title} className="bg-card border border-border rounded-xl p-8 flex items-start gap-8">
            <div className="text-3xl font-serif text-muted-foreground w-8 shrink-0">{String(i + 1).padStart(2, "0")}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-serif text-2xl">{m.title}</h2>
                <span className="text-xs font-mono bg-foreground/10 text-foreground px-2 py-0.5 rounded">{m.badge}</span>
              </div>
              <p className="text-accent font-medium text-sm mb-2">{m.tagline}</p>
              <p className="text-muted-foreground">{m.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/hr/trust" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          How we handle ethics, bias, and data privacy →
        </Link>
      </div>
    </div>
  );
}
