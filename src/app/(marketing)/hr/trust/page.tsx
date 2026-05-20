const SECTIONS = [
  {
    title: "Explainability",
    icon: "🔍",
    content: "Every agent output includes nodeIds — citations pointing to the exact graph nodes used to reach a conclusion. No black boxes. Every recommendation is traceable to source data.",
    points: [
      "All findings cite specific data nodes",
      "Decision trails are stored in the graph and never deleted",
      "Humans can inspect any output at any time",
    ],
  },
  {
    title: "Bias Auditing",
    icon: "⚖️",
    content: "Our Compliance Auditor agent continuously monitors for EEOC §703 adverse impact, pay gaps, and promotion inequities. When bias is detected, a CRITICAL drift event is raised and human review is required.",
    points: [
      "4/5ths rule monitoring on all screening pipelines",
      "Automatic EEOC §703 and OFCCP checks",
      "Zero-tolerance policy for deploying biased models",
    ],
  },
  {
    title: "Human-in-the-Loop",
    icon: "🧑",
    content: "AI agents never make final HR decisions. Every critical finding requires human review before action. Our platform enforces a mandatory approval gate for all terminations, compensation changes, and hiring decisions.",
    points: [
      "Critical findings block automated actions",
      "All approvals are logged with reviewer identity",
      "Escalation paths are defined per policy",
    ],
  },
  {
    title: "Data Handling",
    icon: "🔒",
    content: "Employee data is processed in-region and never used to train third-party models. Data minimization principles apply — we collect only what is needed to deliver the service.",
    points: [
      "GDPR and CCPA compliant",
      "Data retention policies enforced per client SLA",
      "No cross-client data sharing",
      "SOC 2 Type II audit in progress",
    ],
  },
];

export default function TrustPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <span className="text-xs font-mono text-accent mb-3 block">TRUST & ETHICS</span>
        <h1 className="font-serif text-4xl mb-4">Built for responsible HR</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          AI in HR carries significant risk. We take that seriously — with technical safeguards, regulatory compliance, and a commitment to human oversight at every step.
        </p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map(s => (
          <div key={s.title} className="bg-card border border-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{s.icon}</span>
              <h2 className="font-serif text-2xl">{s.title}</h2>
            </div>
            <p className="text-muted-foreground mb-4">{s.content}</p>
            <ul className="space-y-2">
              {s.points.map(p => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <span className="text-accent mt-0.5">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-card border border-border rounded-xl p-8 text-center">
        <h3 className="font-serif text-xl mb-2">Questions about our practices?</h3>
        <p className="text-muted-foreground text-sm mb-4">Contact our Trust & Safety team at trust@nerith.ai</p>
        <span className="text-xs font-mono bg-foreground/10 text-foreground px-2 py-0.5 rounded">trust@nerith.ai</span>
      </div>
    </div>
  );
}
