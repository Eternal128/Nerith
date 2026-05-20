"use client";
import { useState } from "react";
import { hrClient } from "@/lib/agents/hr/client";
import type { RecruiterOutput } from "@/lib/agents/hr/recruiter/types";

const MODULES = [
  { title: "Recruitment", description: "Bias-aware JD generation and resume screening.", icon: "👥" },
  { title: "Onboarding", description: "30/60/90-day personalized onboarding plans.", icon: "🚀" },
  { title: "Performance", description: "Continuous feedback loops and coaching paths.", icon: "📈" },
  { title: "Surveys", description: "Pulse surveys with real-time sentiment analysis.", icon: "💬" },
];

export default function SaaSPage() {
  const [result, setResult] = useState<RecruiterOutput | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runDemo() {
    setLoading(true);
    setError(null);
    try {
      const output = await hrClient.recruiter({
        requisitionId: "apt-req-001",
        jobTitle: "Senior Software Engineer",
        requirements: ["5+ years TypeScript", "System design", "Cross-functional collaboration"],
        mode: "generate-jd",
      });
      setResult(output);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="font-serif text-3xl mb-2">HR SaaS Platform</h1>
      <p className="text-muted-foreground mb-2">Self-serve AI modules. Per-seat pricing from $12/employee/month.</p>
      <span className="text-xs font-mono bg-accent text-white px-2 py-0.5 rounded mb-8 inline-block">Per-seat pricing</span>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {MODULES.map(m => (
          <div key={m.title} className="bg-card border border-border rounded-lg p-5">
            <span className="text-2xl mb-2 block">{m.icon}</span>
            <h2 className="font-serif text-lg mb-1">{m.title}</h2>
            <p className="text-sm text-muted-foreground">{m.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <h3 className="font-serif text-lg mb-1">Pricing</h3>
        <p className="text-muted-foreground text-sm mb-4">Starter · Growth · Enterprise</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[["Starter", "$12", "Up to 50 seats"], ["Growth", "$9", "51–500 seats"], ["Enterprise", "Custom", "500+ seats"]].map(([tier, price, desc]) => (
            <div key={tier} className="border border-border rounded p-4">
              <p className="font-mono text-xs text-muted-foreground mb-1">{tier}</p>
              <p className="font-serif text-2xl mb-1">{price}</p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-serif text-lg mb-2">Live Demo — Recruiter Agent</h3>
        <p className="text-sm text-muted-foreground mb-4">Generate a bias-aware job description for Senior Software Engineer.</p>
        <button
          onClick={runDemo}
          disabled={loading}
          className="px-4 py-2 bg-foreground text-background text-sm rounded hover:opacity-80 disabled:opacity-40 transition-opacity mb-4"
        >
          {loading ? "Running…" : "Run Demo"}
        </button>
        {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
        {result && (
          <div>
            <pre className="text-xs bg-foreground/5 rounded p-4 whitespace-pre-wrap mb-3">{result.jobDescription}</pre>
            <div className="flex flex-wrap gap-1">
              {result.nodeIds.map(id => (
                <span key={id} className="text-xs font-mono bg-foreground/10 text-foreground px-1.5 py-0.5 rounded">{id}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
