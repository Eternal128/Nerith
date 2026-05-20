import { runRecruiter } from "@/lib/agents/hr/recruiter/runner";
import { getNodesByType } from "@/lib/graph/store";
import { seedHR } from "@/lib/fixtures/hr";

seedHR();

const OPEN_REQS = [
  { id: "apt-req-001", title: "Senior Software Engineer", dept: "Engineering" },
  { id: "apt-req-002", title: "Product Manager", dept: "Product" },
  { id: "apt-req-003", title: "Account Executive", dept: "Sales" },
];

export default async function MarketplacePage() {
  const screenResult = await runRecruiter({
    requisitionId: "apt-req-001",
    jobTitle: "Senior Software Engineer",
    requirements: ["TypeScript", "System design", "Collaboration"],
    candidateResume: "Jordan Smith. 7 years TypeScript, led 4 system redesigns at Stripe and Shopify. Strong communicator.",
    mode: "screen-resume",
  });

  const candidates = getNodesByType("candidate").slice(0, 6);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl mb-2">Talent Marketplace</h1>
      <p className="text-muted-foreground mb-8">Employer open reqs, AI-screened candidates, success-fee pricing.</p>

      <h2 className="font-serif text-xl mb-4">Open Requisitions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {OPEN_REQS.map(r => (
          <div key={r.id} className="bg-card border border-border rounded-lg p-4">
            <p className="font-mono text-xs text-muted-foreground mb-1">{r.id}</p>
            <p className="font-serif text-base mb-0.5">{r.title}</p>
            <p className="text-xs text-muted-foreground">{r.dept}</p>
          </div>
        ))}
      </div>

      <h2 className="font-serif text-xl mb-4">AI Match Screening — apt-req-001</h2>
      {screenResult.screeningResults && screenResult.screeningResults.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-5 mb-8">
          {screenResult.screeningResults.map(sr => (
            <div key={sr.candidateId}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-sm">{sr.candidateId}</span>
                <span className="text-2xl font-serif">{sr.score}<span className="text-sm text-muted-foreground">/100</span></span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{sr.rationale}</p>
              {sr.flaggedBias.length > 0 && (
                <p className="text-xs text-yellow-600 mb-2">⚠ Bias flags: {sr.flaggedBias.join(", ")}</p>
              )}
              <div className="flex flex-wrap gap-1">
                {sr.nodeIds.map(id => (
                  <span key={id} className="text-xs font-mono bg-foreground/10 text-foreground px-1.5 py-0.5 rounded">{id}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-serif text-xl mb-4">Candidate Pool</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {candidates.map(c => (
          <div key={c.id} className="bg-card border border-border rounded p-3">
            <p className="text-sm font-medium">{c.label}</p>
            <p className="text-xs text-muted-foreground">Score: {String(c.data.score ?? "—")}</p>
            <span className="text-xs font-mono bg-foreground/10 text-foreground px-1.5 py-0.5 rounded">{c.id}</span>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-serif text-lg mb-2">Pricing</h3>
        <p className="text-sm text-muted-foreground">15% of first-year salary for successful placements. No subscription required.</p>
      </div>
    </div>
  );
}
