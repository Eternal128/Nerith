import { StatusPill } from '@/components/ui'

const SPECS = [
  {
    id: 'spec-001',
    title: 'Auth Migration v2 — Clerk vs Auth0 Formal Decision',
    status: 'in-review' as const,
    updatedAt: '2025-04-03T09:00:00Z',
    authorId: 'person-029',
    projectId: 'proj-001',
    citationCount: 8,
    body: `# Auth Migration v2 — Product Requirements Document

## Overview
Following the Clerk vs Auth0 debate (March 2025), this PRD formalizes the requirements for resolving the authentication provider contradiction with ADR-007.

## Problem Statement
ADR-007 mandated Auth0 after a security review in January 2025. PR #482 (merged Apr 2) introduced Clerk for the onboarding flow without a formal decision. The codebase now has two auth providers.

## Requirements

### Functional
- Single sign-on (SSO) via SAML 2.0 and OIDC
- MFA mandatory for admin roles (Acme Logistics contract requirement — Apr 30 deadline)
- Session management with configurable timeouts
- Audit log for SOC2 compliance

### Non-Functional
- P99 latency < 200ms for token validation
- 99.9% availability

## Open Questions
1. Does Clerk's SOC2 Type II satisfy all requirements?
2. What is the migration path for existing Auth0 sessions?`,
    citations: [
      { nodeId: 'msg-341', quote: 'Clerk is a serious contender. The DX is significantly better.', type: 'slack' },
      { nodeId: 'msg-346', quote: 'ADR-007 stands until we formally revise it.', type: 'slack' },
      { nodeId: 'dec-007', quote: 'Auth0 wins on enterprise feature set and compliance posture.', type: 'decision' },
      { nodeId: 'pr-482', quote: 'feat(auth): integrate Clerk for new user onboarding flow', type: 'pr' },
    ],
  },
  {
    id: 'spec-002',
    title: 'Billing v2 — Usage-Based Pricing Architecture',
    status: 'approved' as const,
    updatedAt: '2025-04-08T09:00:00Z',
    authorId: 'person-029',
    projectId: 'proj-002',
    citationCount: 5,
    body: `# Billing v2 — Usage-Based Pricing Architecture

## Overview
Rearchitect billing-svc to support metered usage billing alongside existing seat-based plans.

## Problem Statement
Current billing is seat-based only. Customers want outcome-based pricing. New enterprise deals require flexible billing models.`,
    citations: [],
  },
  {
    id: 'spec-003',
    title: 'SOC2 Type II — Compliance Architecture',
    status: 'draft' as const,
    updatedAt: '2025-04-10T09:00:00Z',
    authorId: 'person-015',
    projectId: 'proj-005',
    citationCount: 3,
    body: `# SOC2 Type II Compliance Architecture

## Overview
Technical requirements for achieving SOC2 Type II certification by September 2025.`,
    citations: [],
  },
]

export default function SpecsPage() {
  return (
    <div className="h-full flex">
      {/* Specs list */}
      <div className="w-72 shrink-0 border-r border-[var(--color-rule)] p-4 overflow-y-auto">
        <div className="pb-3 mb-3 border-b border-[var(--color-rule)]">
          <h1 className="font-serif text-lg">Spec Synthesizer</h1>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">{SPECS.length} drafts</p>
        </div>
        <div className="space-y-2">
          {SPECS.map((spec) => (
            <div key={spec.id} className="card p-3">
              <div className="flex items-start justify-between gap-2 mb-1">
                <h3 className="text-xs font-medium leading-snug line-clamp-2">{spec.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <StatusPill status={spec.status} />
                <span className="text-[10px] text-[var(--color-muted)]">{spec.citationCount} citations</span>
              </div>
              <div className="text-[10px] text-[var(--color-muted)] mt-1">
                {new Date(spec.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spec editor — show first spec by default */}
      <div className="flex-1 flex overflow-hidden">
        {/* Markdown content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <StatusPill status={SPECS[0].status} />
              <span className="text-xs text-[var(--color-muted)] font-mono">{SPECS[0].id}</span>
            </div>
            <div className="prose prose-sm max-w-none">
              <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-[var(--color-ink)]">
                {SPECS[0].body}
              </pre>
            </div>
          </div>
        </div>

        {/* Citations panel */}
        <div className="w-64 shrink-0 border-l border-[var(--color-rule)] p-4 overflow-y-auto">
          <div className="text-[10px] font-medium uppercase tracking-wider text-[var(--color-muted)] mb-3">Citations</div>
          <div className="space-y-3">
            {SPECS[0].citations.map((c, i) => (
              <div key={i} className="card p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] font-mono text-[var(--color-accent)]">{c.nodeId}</span>
                  <span className="text-[10px] text-[var(--color-muted)]">·</span>
                  <span className="text-[10px] text-[var(--color-muted)]">{c.type}</span>
                </div>
                <p className="text-xs text-[var(--color-muted)] italic leading-relaxed">&ldquo;{c.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
