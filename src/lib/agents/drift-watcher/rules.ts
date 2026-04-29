import type { DriftRuleResult } from './types'
import { ISSUES } from '@/lib/fixtures/issues'
import { PULL_REQUESTS } from '@/lib/fixtures/pull-requests'
import { DECISIONS } from '@/lib/fixtures/decisions'
import { DRIFT_EVENTS } from '@/lib/fixtures/drift-events'

export type DriftRule = {
  id: string
  name: string
  run: (workspaceId: string, windowDays: number) => DriftRuleResult[]
}

// Rule 1: Linear issue In Progress with no commit reference in N days
const ruleIssueNoCommits: DriftRule = {
  id: 'rule-issue-no-commits',
  name: 'Issue In Progress with no commits',
  run: (_workspaceId, _windowDays) => {
    const results: DriftRuleResult[] = []

    for (const issue of ISSUES) {
      if (issue.status !== 'in-progress') continue
      if (issue.linkedPrIds.length > 0) continue

      const lastUpdated = new Date(issue.updatedAt)
      const daysStale = Math.floor((Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24))

      if (daysStale < 5) continue // Grace period

      results.push({
        ruleId: 'rule-issue-no-commits',
        fired: true,
        severity: daysStale > 30 ? 'warn' : 'info',
        headline: `${issue.identifier} (${issue.title}) In Progress for ${daysStale} days with no linked commits.`,
        evidence: `Issue ${issue.identifier} has been In Progress since ${issue.updatedAt.slice(0, 10)}. No linked PRs found. Assignee: ${issue.assigneeId ?? 'unassigned'}.`,
        nodeIds: [issue.id, issue.projectId, ...(issue.assigneeId ? [issue.assigneeId] : [])],
        confidence: 0.88,
        proposedActions: [
          { type: 'dm_owner', label: 'DM assignee', payload: { userId: issue.assigneeId } },
          { type: 'dismiss', label: 'Dismiss', payload: {} },
        ],
      })
    }

    return results
  },
}

// Rule 2: PR merged with no linked Linear issue
const rulePrNoIssue: DriftRule = {
  id: 'rule-pr-no-issue',
  name: 'PR merged with no linked issue',
  run: () => {
    const results: DriftRuleResult[] = []

    for (const pr of PULL_REQUESTS) {
      if (pr.status !== 'merged') continue
      if (pr.linkedIssueIds.length > 0) continue

      results.push({
        ruleId: 'rule-pr-no-issue',
        fired: true,
        severity: 'warn',
        headline: `PR #${pr.number} merged with no linked Linear issue.`,
        evidence: `PR #${pr.number} ("${pr.title}") merged ${pr.mergedAt?.slice(0, 10) ?? 'recently'}. Author: ${pr.authorId}. No Linear issue linked.`,
        nodeIds: [pr.id, pr.authorId, ...(pr.projectId ? [pr.projectId] : [])],
        confidence: 0.99,
        proposedActions: [
          { type: 'file_ticket', label: 'Backfill ticket', payload: { title: `Backfill: ${pr.title}` } },
          { type: 'dm_owner', label: 'DM author', payload: { userId: pr.authorId } },
          { type: 'dismiss', label: 'Dismiss', payload: {} },
        ],
      })
    }

    return results
  },
}

// Rule 3: PR implementation contradicts a pinned ADR
const rulePrContraddictsAdr: DriftRule = {
  id: 'rule-pr-contradicts-adr',
  name: 'PR contradicts pinned ADR',
  run: () => {
    const results: DriftRuleResult[] = []

    // Check PR #482 against ADR-007 (the headline demo case)
    const pr482 = PULL_REQUESTS.find((p) => p.number === 482)
    const adr007 = DECISIONS.find((d) => d.id === 'dec-007')

    if (pr482 && adr007 && pr482.status === 'merged') {
      // PR #482 touches Clerk files; ADR-007 mandates Auth0
      const hasClerkFiles = pr482.files.some(
        (f) => f.toLowerCase().includes('clerk')
      )
      const adrMandatesAuth0 = adr007.body.toLowerCase().includes('auth0')

      if (hasClerkFiles && adrMandatesAuth0) {
        results.push({
          ruleId: 'rule-pr-contradicts-adr',
          fired: true,
          severity: 'critical',
          headline: `PR #${pr482.number} ships Clerk integration; ADR-007 mandates Auth0.`,
          evidence: `PR #${pr482.number} ("${pr482.title}") touches ${pr482.files.filter((f) => f.toLowerCase().includes('clerk')).join(', ')}. ADR-007 (Jan 10) explicitly mandates Auth0 for all auth flows after a security review. No ADR revision was filed.`,
          nodeIds: [pr482.id, adr007.id, pr482.authorId],
          confidence: 0.97,
          proposedActions: [
            { type: 'open_pr', label: 'Open ADR revision PR', payload: { title: 'ADR-007 revision: Auth0 vs Clerk' } },
            { type: 'file_ticket', label: 'File security review ticket', payload: { priority: 'urgent' } },
            { type: 'dm_owner', label: 'DM PR author', payload: { userId: pr482.authorId } },
            { type: 'dismiss', label: 'Dismiss', payload: {} },
          ],
        })
      }
    }

    return results
  },
}

// Rule 4: Customer commitment with no roadmap/issue
const ruleCommitmentNoIssue: DriftRule = {
  id: 'rule-commitment-no-issue',
  name: 'Customer commitment with no tracking issue',
  run: () => {
    // Return pre-computed results from fixture drift events for this rule
    return DRIFT_EVENTS
      .filter((e) => e.ruleId === 'rule-commitment-no-issue' && e.status === 'open')
      .map((e) => ({
        ruleId: e.ruleId,
        fired: true,
        severity: e.severity,
        headline: e.headline,
        evidence: e.evidence,
        nodeIds: e.nodeIds,
        confidence: e.confidence,
        proposedActions: e.actions,
      }))
  },
}

// Rule 5: Spec/PRD updated but no downstream tickets re-scoped
const ruleSpecUpdatedNoTicketResync: DriftRule = {
  id: 'rule-spec-updated-no-ticket-resync',
  name: 'Spec updated without ticket re-scoping',
  run: () => {
    return DRIFT_EVENTS
      .filter((e) => e.ruleId === 'rule-spec-updated-no-ticket-resync' && e.status === 'open')
      .map((e) => ({
        ruleId: e.ruleId,
        fired: true,
        severity: e.severity,
        headline: e.headline,
        evidence: e.evidence,
        nodeIds: e.nodeIds,
        confidence: e.confidence,
        proposedActions: e.actions,
      }))
  },
}

// Rule 6: Service touched by N PRs in M days with no runbook update
const ruleServiceNoRunbook: DriftRule = {
  id: 'rule-service-no-runbook',
  name: 'Service modified without runbook update',
  run: () => {
    return DRIFT_EVENTS
      .filter((e) => e.ruleId === 'rule-service-no-runbook' && e.status === 'open')
      .map((e) => ({
        ruleId: e.ruleId,
        fired: true,
        severity: e.severity,
        headline: e.headline,
        evidence: e.evidence,
        nodeIds: e.nodeIds,
        confidence: e.confidence,
        proposedActions: e.actions,
      }))
  },
}

export const DRIFT_RULES: DriftRule[] = [
  ruleIssueNoCommits,
  rulePrNoIssue,
  rulePrContraddictsAdr,
  ruleCommitmentNoIssue,
  ruleSpecUpdatedNoTicketResync,
  ruleServiceNoRunbook,
]
