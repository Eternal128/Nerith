import { runPulse } from "@/lib/agents/hr/pulse/runner";
import { runCoach } from "@/lib/agents/hr/coach/runner";
import { seedHR } from "@/lib/fixtures/hr";

seedHR();

const SAMPLE_EMPLOYEES = [
  { id: "apt-emp-001", name: "Aria Patel", role: "Software Engineer", dept: "Engineering" },
  { id: "apt-emp-031", name: "Ethan Fox", role: "Account Executive", dept: "Sales" },
  { id: "apt-emp-091", name: "Abby Allen", role: "HR Business Partner", dept: "People" },
];

export default async function ManagedPage() {
  const [pulseResult, coachResult] = await Promise.all([
    runPulse({
      employeeId: "apt-emp-001",
      surveyData: [
        { question: "How satisfied are you at work?", response: "Very satisfied — great team culture.", sentiment: 0.9 },
        { question: "Do you feel your work is meaningful?", response: "Absolutely, shipping features every sprint.", sentiment: 0.85 },
      ],
    }),
    runCoach({
      employeeId: "apt-emp-001",
      currentSkills: ["TypeScript", "React", "Node.js", "System design"],
      careerGoal: "Staff Engineer",
      performanceNotes: "Consistently delivers high-quality code. Ready for broader scope.",
    }),
  ]);

  const riskColor = (r: string) =>
    r === "high" ? "text-red-500" : r === "medium" ? "text-yellow-600" : "text-green-600";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl mb-2">Managed HR Services</h1>
      <p className="text-muted-foreground mb-8">Full-service HR operations — AI-augmented, human-reviewed. Monthly retainer.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        {SAMPLE_EMPLOYEES.map(e => (
          <div key={e.id} className="bg-card border border-border rounded-lg p-4">
            <p className="font-serif text-base mb-0.5">{e.name}</p>
            <p className="text-xs text-muted-foreground mb-1">{e.role} · {e.dept}</p>
            <span className="text-xs font-mono bg-foreground/10 text-foreground px-1.5 py-0.5 rounded">{e.id}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-serif text-lg mb-3">Pulse — apt-emp-001</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sentiment score</span>
              <span className="font-mono">{pulseResult.sentimentScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Attrition risk</span>
              <span className={`font-mono font-bold ${riskColor(pulseResult.attritionRisk)}`}>{pulseResult.attritionRisk.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Burnout signals</span>
              <span className="font-mono">{pulseResult.burnoutSignals.length === 0 ? "None" : pulseResult.burnoutSignals.join(", ")}</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-1">
            {pulseResult.nodeIds.map(id => (
              <span key={id} className="text-xs font-mono bg-foreground/10 text-foreground px-1.5 py-0.5 rounded">{id}</span>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-serif text-lg mb-3">Coach — apt-emp-001</h2>
          <p className="text-xs text-muted-foreground mb-2">Skill gaps identified:</p>
          <ul className="list-disc list-inside text-sm mb-3 space-y-1">
            {coachResult.skillGaps.map(g => <li key={g}>{g}</li>)}
          </ul>
          <p className="text-xs text-muted-foreground mb-2">Recommended paths:</p>
          <ul className="space-y-2 text-sm">
            {coachResult.recommendedPaths.map(p => (
              <li key={p.title} className="border border-border rounded p-2">
                <span className="font-medium">{p.title}</span>
                <span className="text-xs text-muted-foreground ml-2">{p.durationWeeks}w</span>
                <p className="text-xs text-muted-foreground mt-0.5">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-5">
        <h3 className="font-serif text-lg mb-2">Service tiers</h3>
        <p className="text-sm text-muted-foreground">Monthly retainer from $8,000/month for up to 100 managed employees. Includes dedicated HRBP + AI augmentation for recruiting, onboarding, coaching, and compliance.</p>
      </div>
    </div>
  );
}
