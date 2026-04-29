import type { LLMRequest, LLMResponse } from './router'

// Deterministic mock based on input hash
function simpleHash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

const MOCK_DECISIONS = [
  `## Decision

**Title:** Migrate authentication to Auth0

**Body:** After evaluating multiple authentication providers, the team has decided to standardize on Auth0 for all authentication flows. This decision was driven by Auth0's enterprise SSO support, compliance certifications, and existing team expertise.

**Citations:**
- ADR-007 (Decision node: dec-007)
- Call transcript: planning-2024-01-15 (Call node: call-001)
- Slack thread: #auth-migration (Message node: msg-342)

**Confidence:** 0.92`,

  `## Decision

**Title:** Adopt event-driven architecture for telemetry pipeline

**Body:** The team has decided to rebuild the telemetry pipeline using an event-driven architecture with Apache Kafka as the message broker. This addresses the scaling issues observed in Q1 and reduces coupling between services.

**Citations:**
- ADR-003 (Decision node: dec-003)
- Issue: HART-089 (Issue node: issue-089)

**Confidence:** 0.88`,

  `## Decision

**Title:** Defer mobile v2 to Q3

**Body:** Due to resource constraints and the ongoing SOC2 compliance work, the mobile v2 feature set will be deferred to Q3. The existing mobile app will receive critical bug fixes only.

**Citations:**
- Slack message: #product-planning (Message node: msg-156)
- Issue: HART-201 (Issue node: issue-201)

**Confidence:** 0.85`,
]

const MOCK_SPECS = [
  `# Auth Migration v2 — Product Requirements Document

## Overview
Following the Clerk vs Auth0 debate that surfaced in March 2025, this PRD formalizes the requirements for the auth migration.

## Problem Statement
ADR-007 mandated Auth0 as the authentication provider. However, PR #482 shipped Clerk integration without updating the ADR or notifying the security team.

## Requirements

### Functional
- Single sign-on (SSO) via SAML 2.0 and OIDC
- Multi-factor authentication (MFA) mandatory for admin roles
- Session management with configurable timeouts
- Audit log of all auth events

### Non-Functional
- P99 latency < 200ms for token validation
- 99.9% availability
- SOC2 Type II compliant

## Open Questions
1. Do we retroactively validate Clerk's security posture?
2. Who owns the Auth0/Clerk migration decision?

## Citations
- ADR-007 (Decision node: dec-007)
- PR #482 (PullRequest node: pr-482)
- Slack: #auth-migration thread Mar 14 (Message nodes: msg-341, msg-342, msg-343)`,
]

const MOCK_STANDUPS = [
  `## Daily Standup — Sarah Chen

**Yesterday:**
- Merged PR #478: Add OAuth2 PKCE flow to auth-svc
- Reviewed PR #481 (billing webhook handler)
- Attended planning sync for Billing v2

**Today:**
- Fix flaky test in auth-svc suite (HART-312)
- Start HART-315: Implement refresh token rotation

**Blockers:**
- Waiting on security team sign-off for HART-308 (MFA enforcement)

*Generated from: 2 commits · 1 PR merged · 3 Linear issues updated*`,
]

const MOCK_RETROS = [
  `## Sprint 24 Retrospective — Hartwell Robotics Engineering

**Sprint goal:** Ship Billing v2 beta + auth migration groundwork

**Planned vs Shipped:**
- ✅ Billing webhook handler (HART-289)
- ✅ Auth PKCE flow (HART-301)
- ❌ Auth0 migration (HART-298) — blocked on vendor contract
- ⚠️ Telemetry dashboard (HART-305) — partial, 60% complete

**Cycle Time:** Median 4.2 days (target: 3.5 days)

**Root Cause Clusters:**
1. Auth0 contract delay (2 issues blocked)
2. Test flakiness causing re-runs (est. 6 hours wasted)

**Action Items:**
- @marcus: Unblock Auth0 contract by EOW
- @priya: Fix flaky auth tests before next sprint`,
]

const MOCK_RESPONSES = [
  ...MOCK_DECISIONS,
  ...MOCK_SPECS,
  ...MOCK_STANDUPS,
  ...MOCK_RETROS,
]

export function mockLlm(req: LLMRequest): LLMResponse {
  const key = req.system.slice(0, 50) + req.user.slice(0, 50)
  const idx = simpleHash(key) % MOCK_RESPONSES.length
  return {
    content: MOCK_RESPONSES[idx],
    model: 'mock-llm-v1',
    tokensUsed: 0,
    mock: true,
  }
}
