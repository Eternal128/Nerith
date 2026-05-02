import { DECISIONS } from '@/lib/fixtures/decisions'
import { StatusPill } from '@/components/ui'
import { AlertTriangle } from 'lucide-react'

export default function DecisionsPage() {
  const sorted = [...DECISIONS].sort(
    (a, b) => new Date(b.decidedAt).getTime() - new Date(a.decidedAt).getTime()
  )

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[var(--color-rule)]">
        <h1 className="font-serif text-2xl mb-1">Decisions Ledger</h1>
        <p className="text-sm text-[var(--color-muted)]">
          {DECISIONS.length} decisions · 1 contradiction detected · Hartwell Robotics workspace
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[22px] top-0 bottom-0 w-px bg-[var(--color-rule)]" />

        <div className="space-y-4">
          {sorted.map((decision) => {
            const isContradicted = decision.id === 'dec-007'
            return (
              <div key={decision.id} className="flex gap-5">
                {/* Timeline dot */}
                <div className="shrink-0 w-11 flex justify-center pt-1">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      isContradicted
                        ? 'bg-[var(--color-danger)] border-[var(--color-danger)]'
                        : 'bg-[var(--color-paper)] border-[var(--color-accent)]'
                    }`}
                  />
                </div>

                {/* Card */}
                <div className={`flex-1 card p-4 mb-2 ${isContradicted ? 'border-[var(--color-danger)]' : ''}`}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-serif text-base">{decision.title}</h3>
                    <div className="flex items-center gap-2 shrink-0">
                      {isContradicted && (
                        <span className="flex items-center gap-1 text-[10px] text-[var(--color-danger)] font-medium">
                          <AlertTriangle className="w-3 h-3" />
                          CONTRADICTED
                        </span>
                      )}
                      <StatusPill status={decision.status} />
                    </div>
                  </div>

                  <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-3 line-clamp-3">
                    {decision.body}
                  </p>

                  {isContradicted && (
                    <div className="bg-red-50 border border-red-200 rounded p-2 mb-3 text-xs text-[var(--color-danger)]">
                      <strong>Contradiction:</strong> PR #482 ships Clerk integration. This ADR mandates Auth0. See Drift Feed for proposed resolution.
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-[10px] text-[var(--color-muted)]">
                    <span className="font-mono">{decision.id}</span>
                    <span>·</span>
                    <span>{new Date(decision.decidedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <span>·</span>
                    <span>{decision.participants.length} participants</span>
                    {decision.tags.map((tag) => (
                      <span key={tag} className="font-mono text-[var(--color-accent)]">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
