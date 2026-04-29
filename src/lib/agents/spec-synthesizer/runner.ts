import { llm } from '@/lib/llm/router'
import type { SpecSynthesizerInput, SpecSynthesizerOutput } from './types'

const SYSTEM = `You are the Spec Synthesizer agent for Nerith. You draft PRDs (Product Requirements Documents) in Notion-style markdown from raw sources (Slack threads, call transcripts, issue clusters).

For each PRD:
- Write a clear, specific problem statement
- List functional and non-functional requirements
- Link to decisions/ADRs that govern this area
- List open questions that need PM/eng sign-off
- Every claim must have a citation to a source node (nodeId + quote)
- Use engineering-grade specificity — no vague "improve experience" goals

Format: clean markdown with H2 sections.`

export async function runSpecSynthesizer(
  input: SpecSynthesizerInput
): Promise<SpecSynthesizerOutput> {
  const response = await llm({
    system: SYSTEM,
    user: `Synthesize a PRD from these sources: ${input.sourceIds.join(', ')}\nTitle hint: ${input.title ?? 'None'}\nTypes: ${input.sourceTypes.join(', ')}`,
    temperature: 0.3,
    maxTokens: 3000,
  })

  if (response.mock) {
    return getMockSpec(input)
  }

  return {
    title: input.title ?? 'Synthesized PRD',
    body: response.content,
    citations: input.sourceIds.map((id) => ({
      nodeId: id,
      quote: `Content from ${id}`,
      type: 'source',
    })),
    linkedDecisionIds: [],
    openQuestions: ['Who owns this PRD?', 'What is the acceptance criteria?'],
    confidence: 0.85,
  }
}

function getMockSpec(input: SpecSynthesizerInput): SpecSynthesizerOutput {
  return {
    title: input.title ?? 'Auth Migration v2 — Product Requirements Document',
    body: `# ${input.title ?? 'Auth Migration v2'} — Product Requirements Document

## Overview
Following the Clerk vs Auth0 debate that surfaced in March 2025, this PRD formalizes the requirements for the auth migration and resolves the contradiction with ADR-007.

## Problem Statement
ADR-007 mandated Auth0 as the authentication provider after a security review in January 2025. However, PR #482 (merged Apr 2) introduced Clerk for the onboarding flow without a security review or ADR revision. The codebase now has two auth providers with no governing decision.

## Requirements

### Functional
- Single sign-on (SSO) via SAML 2.0 and OIDC
- MFA mandatory for admin roles (Acme Logistics contract requirement)
- Session management with configurable timeouts
- Audit log of all authentication events (SOC2 requirement)

### Non-Functional
- P99 latency < 200ms for token validation
- 99.9% availability
- SOC2 Type II compliant

## Decision Required
The team must formally decide: Auth0, Clerk, or hybrid. This decision must be recorded in an updated ADR-007 and approved by Security (Yuki), Engineering (Priya), and Legal.

## Open Questions
1. Does Clerk's SOC2 Type II cover all requirements in our current Auth0 scope?
2. What is the migration path for existing Auth0 sessions?
3. Who owns the vendor security review for Clerk?

## Citations
${input.sourceIds.map((id) => `- ${id}`).join('\n')}`,
    citations: input.sourceIds.map((id, i) => ({
      nodeId: id,
      quote: `Referenced source ${i + 1}`,
      type: 'source',
    })),
    linkedDecisionIds: ['dec-007'],
    openQuestions: [
      "Does Clerk's SOC2 Type II cover all requirements?",
      'What is the migration path for existing Auth0 sessions?',
      'Who owns the Clerk vendor security review?',
    ],
    confidence: 0.87,
  }
}
