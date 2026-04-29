# ADR-007: Auth0 as Authentication Provider

**Status**: Active (CONTRADICTED by PR #482 — resolution pending)
**Date**: 2025-01-10
**Participants**: Priya Nair, Tanvir Rahman, Yuki Tanaka, Jordan Kim

## Decision

We will use Auth0 as our authentication and identity provider for all Hartwell Robotics services.

## Context

After evaluating Firebase Auth, AWS Cognito, Clerk, and Auth0, the security team conducted a full evaluation against enterprise requirements (SAML SSO, MFA, SOC2 compliance, audit logging).

## Rationale

- Auth0 holds SOC2 Type II
- SAML 2.0 and OIDC support for enterprise customers
- Mandatory MFA enforcement for admin roles
- Management API for user lifecycle

## Consequences

- Higher cost than alternatives at scale (~$3.5k/month at 50k MAUs)
- More complex setup than Clerk or Firebase

## Current Status

PR #482 (merged Apr 2, 2025) introduced Clerk for the onboarding flow without a formal ADR revision. This constitutes a contradiction. HART-263 tracks the resolution.
