import { runComplianceAuditor } from "@/lib/agents/hr/compliance-auditor/runner";
import { seedHR } from "@/lib/fixtures/hr";

seedHR();

export default async function ConsultingPage() {
  const result = await runComplianceAuditor({
    auditTargetId: "apt-req-001",
    auditType: "screening-bias",
    dataSnapshot: { passRateMale: 0.72, passRateFemale: 0.44, sampleSize: 480 },
  });

  const severityColor = (s: string) =>
    s === "critical" ? "text-red-500 border-red-500/30 bg-red-500/5" :
    s === "warn" ? "text-yellow-600 border-yellow-600/30 bg-yellow-600/5" :
    "text-muted-foreground border-border bg-card";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl mb-2">AI Consulting</h1>
      <p className="text-muted-foreground mb-8">On-demand compliance audits powered by the Compliance Auditor agent.</p>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-xl">Screening Bias Audit — apt-req-001</h2>
          {result.requiresHumanReview && (
            <span className="text-xs font-mono bg-red-500/10 text-red-500 border border-red-500/20 px-2 py-1 rounded">
              ⚠ Human Review Required
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-6">{result.summary}</p>

        <h3 className="font-serif text-lg mb-3">Findings</h3>
        <div className="space-y-3">
          {result.findings.map(f => (
            <div key={f.id} className={`border rounded-lg p-4 ${severityColor(f.severity)}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono font-bold uppercase">{f.severity}</span>
                <span className="text-xs font-mono opacity-70">{f.regulation}</span>
              </div>
              <p className="text-sm mb-3">{f.description}</p>
              <div className="flex flex-wrap gap-1">
                {f.nodeIds.map(id => (
                  <span key={id} className="text-xs font-mono bg-foreground/10 text-foreground px-1.5 py-0.5 rounded">{id}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono mb-1">Audit citations</p>
          <div className="flex flex-wrap gap-1">
            {result.nodeIds.map(id => (
              <span key={id} className="text-xs font-mono bg-foreground/10 text-foreground px-1.5 py-0.5 rounded">{id}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-serif text-lg mb-2">About this service</h3>
        <p className="text-sm text-muted-foreground">Project-based compliance audits starting at $5,000. Each report includes regulatory citations, remediation guidance, and human expert sign-off.</p>
      </div>
    </div>
  );
}
