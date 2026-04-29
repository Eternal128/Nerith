export interface Issue {
  id: string
  identifier: string
  title: string
  status: 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done' | 'cancelled'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  assigneeId?: string
  projectId: string
  linkedPrIds: string[]
  createdAt: string
  updatedAt: string
  completedAt?: string
  labels: string[]
  estimate?: number
  description?: string
}

export const ISSUES: Issue[] = [
  // Auth Migration
  { id: 'issue-001', identifier: 'HART-001', title: 'Auth0 PoC implementation', status: 'done', priority: 'high', assigneeId: 'person-006', projectId: 'proj-001', linkedPrIds: [], createdAt: '2025-01-15T09:00:00Z', updatedAt: '2025-02-01T14:00:00Z', completedAt: '2025-02-01T14:00:00Z', labels: ['auth', 'poc'], estimate: 5 },
  { id: 'issue-002', identifier: 'HART-002', title: 'Auth0 SSO configuration', status: 'done', priority: 'high', assigneeId: 'person-006', projectId: 'proj-001', linkedPrIds: [], createdAt: '2025-01-20T09:00:00Z', updatedAt: '2025-02-15T14:00:00Z', completedAt: '2025-02-15T14:00:00Z', labels: ['auth', 'sso'], estimate: 3 },
  { id: 'issue-089', identifier: 'HART-089', title: 'Implement usage-based billing schema', status: 'done', priority: 'high', assigneeId: 'person-024', projectId: 'proj-002', linkedPrIds: ['pr-441'], createdAt: '2025-02-10T09:00:00Z', updatedAt: '2025-03-10T14:00:00Z', completedAt: '2025-03-10T14:00:00Z', labels: ['billing', 'schema'], estimate: 8 },
  { id: 'issue-102', identifier: 'HART-102', title: 'Reduce telemetry p99 latency below 100ms', status: 'done', priority: 'urgent', assigneeId: 'person-010', projectId: 'proj-003', linkedPrIds: ['pr-456'], createdAt: '2025-02-20T09:00:00Z', updatedAt: '2025-03-10T16:00:00Z', completedAt: '2025-03-10T16:00:00Z', labels: ['telemetry', 'performance'], estimate: 13 },
  { id: 'issue-112', identifier: 'HART-112', title: 'Implement PKCE flow for OAuth2', status: 'done', priority: 'high', assigneeId: 'person-004', projectId: 'proj-001', linkedPrIds: ['pr-461', 'pr-478'], createdAt: '2025-03-01T09:00:00Z', updatedAt: '2025-04-02T11:00:00Z', completedAt: '2025-04-02T11:00:00Z', labels: ['auth', 'security'], estimate: 5 },
  { id: 'issue-135', identifier: 'HART-135', title: 'Missing confirmation email on trial upgrade', status: 'done', priority: 'medium', assigneeId: 'person-008', projectId: 'proj-002', linkedPrIds: ['pr-481'], createdAt: '2025-03-01T16:00:00Z', updatedAt: '2025-04-01T10:00:00Z', completedAt: '2025-04-01T10:00:00Z', labels: ['billing', 'email', 'bug'], estimate: 2 },
  { id: 'issue-156', identifier: 'HART-156', title: 'Push notifications for critical robot alerts', status: 'in-review', priority: 'high', assigneeId: 'person-013', projectId: 'proj-004', linkedPrIds: ['pr-483'], createdAt: '2025-03-20T09:00:00Z', updatedAt: '2025-04-10T10:00:00Z', labels: ['mobile', 'notifications'], estimate: 5 },
  { id: 'issue-178', identifier: 'HART-178', title: 'SOC2 audit logging for all services', status: 'in-review', priority: 'urgent', assigneeId: 'person-016', projectId: 'proj-005', linkedPrIds: ['pr-484'], createdAt: '2025-04-01T09:00:00Z', updatedAt: '2025-04-12T09:00:00Z', labels: ['security', 'soc2', 'audit'], estimate: 8 },
  // Issues with no PRs (potential drift: in-progress but no commit ref)
  { id: 'issue-201', identifier: 'HART-201', title: 'Auth0 production migration — phase 1', status: 'in-progress', priority: 'urgent', assigneeId: 'person-006', projectId: 'proj-001', linkedPrIds: [], createdAt: '2025-03-01T09:00:00Z', updatedAt: '2025-04-20T10:00:00Z', labels: ['auth', 'migration'], estimate: 21, description: 'Migrate 25% of user sessions to Auth0. Feature flag controlled.' },
  { id: 'issue-215', identifier: 'HART-215', title: 'Billing v2 self-serve upgrade flow', status: 'in-progress', priority: 'high', assigneeId: 'person-019', projectId: 'proj-002', linkedPrIds: [], createdAt: '2025-03-15T09:00:00Z', updatedAt: '2025-04-22T10:00:00Z', labels: ['billing', 'ux'], estimate: 8 },
  { id: 'issue-222', identifier: 'HART-222', title: 'Mobile: offline mode architecture', status: 'in-progress', priority: 'medium', assigneeId: 'person-013', projectId: 'proj-004', linkedPrIds: [], createdAt: '2025-04-01T09:00:00Z', updatedAt: '2025-04-25T10:00:00Z', labels: ['mobile', 'offline'], estimate: 13 },
  { id: 'issue-231', identifier: 'HART-231', title: 'Write runbook for telemetry-svc', status: 'todo', priority: 'high', assigneeId: 'person-011', projectId: 'proj-003', linkedPrIds: [], createdAt: '2025-03-11T09:30:00Z', updatedAt: '2025-04-28T10:00:00Z', labels: ['telemetry', 'docs', 'soc2'], estimate: 3 },
  { id: 'issue-245', identifier: 'HART-245', title: 'SOC2: vendor security review for Clerk', status: 'todo', priority: 'urgent', assigneeId: 'person-015', projectId: 'proj-005', linkedPrIds: [], createdAt: '2025-04-03T09:00:00Z', updatedAt: '2025-04-28T10:00:00Z', labels: ['security', 'soc2', 'clerk'], estimate: 5 },
  { id: 'issue-251', identifier: 'HART-251', title: 'Pricing experiment: instrumentation hooks', status: 'in-progress', priority: 'high', assigneeId: 'person-024', projectId: 'proj-006', linkedPrIds: [], createdAt: '2025-04-10T09:00:00Z', updatedAt: '2025-04-27T10:00:00Z', labels: ['billing', 'experiment'], estimate: 5 },
  { id: 'issue-263', identifier: 'HART-263', title: 'ADR-007 update: Auth0 vs Clerk decision', status: 'todo', priority: 'urgent', assigneeId: 'person-002', projectId: 'proj-001', linkedPrIds: [], createdAt: '2025-04-03T10:00:00Z', updatedAt: '2025-04-28T10:00:00Z', labels: ['auth', 'adr', 'decision'], estimate: 3 },
]
