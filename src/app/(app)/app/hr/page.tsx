import Link from "next/link";
import { getNodesByType } from "@/lib/graph/store";
import { seedHR } from "@/lib/fixtures/hr";

// Seed fixture data on first render (server-side, in-memory)
seedHR();

const BUSINESS_MODELS = [
  {
    href: "/app/hr/saas",
    title: "HR SaaS Platform",
    description: "Self-serve AI-powered modules for recruitment, onboarding, performance, and surveys.",
    badge: "Per-seat pricing",
  },
  {
    href: "/app/hr/consulting",
    title: "AI Consulting",
    description: "On-demand compliance audits and bias-detection reports for your hiring pipeline.",
    badge: "Project-based",
  },
  {
    href: "/app/hr/managed",
    title: "Managed HR Services",
    description: "Full-service HR operations: from recruiting to continuous coaching, all AI-augmented.",
    badge: "Monthly retainer",
  },
  {
    href: "/app/hr/marketplace",
    title: "Talent Marketplace",
    description: "Connect employers with AI-screened candidates. Pay only for successful matches.",
    badge: "Success fee",
  },
  {
    href: "/app/hr/insights",
    title: "HR Intelligence",
    description: "Aggregated workforce analytics, sentiment trends, and pay-equity reports.",
    badge: "Pay-per-report",
  },
];

export default function HRHubPage() {
  const events = getNodesByType("event").slice(-5).reverse();

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl mb-2">Nerith HR</h1>
      <p className="text-muted-foreground mb-8">AI-Enhanced HR Services — five ways to deliver people intelligence.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {BUSINESS_MODELS.map(m => (
          <Link
            key={m.href}
            href={m.href}
            className="bg-card border border-border rounded-lg p-5 hover:border-accent transition-colors group"
          >
            <span className="text-xs font-mono text-accent mb-2 block">{m.badge}</span>
            <h2 className="font-serif text-lg mb-1 group-hover:text-accent transition-colors">{m.title}</h2>
            <p className="text-sm text-muted-foreground">{m.description}</p>
          </Link>
        ))}
      </div>

      <section>
        <h2 className="font-serif text-xl mb-4">Live Agent Activity</h2>
        {events.length === 0 ? (
          <p className="text-muted-foreground text-sm">No events yet. Agents will surface drift events here.</p>
        ) : (
          <ul className="space-y-2">
            {events.map(ev => {
              const severity = (ev.data.severity as string) ?? "info";
              const severityClass =
                severity === "critical" ? "text-red-500" :
                severity === "warn" ? "text-yellow-600" :
                "text-muted-foreground";
              return (
                <li key={ev.id} className="bg-card border border-border rounded p-3 flex items-start gap-3">
                  <span className={`text-xs font-mono font-bold uppercase mt-0.5 ${severityClass}`}>{severity}</span>
                  <div className="flex-1">
                    <p className="text-sm">{ev.label}</p>
                    <span className="text-xs font-mono bg-foreground/10 text-foreground px-1.5 py-0.5 rounded">{ev.id}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
