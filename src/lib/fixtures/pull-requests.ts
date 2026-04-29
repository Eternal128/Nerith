export interface PullRequest {
  id: string
  number: number
  title: string
  authorId: string
  status: 'open' | 'merged' | 'closed'
  linkedIssueIds: string[]
  files: string[]
  createdAt: string
  mergedAt?: string
  closedAt?: string
  description?: string
  reviewerIds?: string[]
  projectId?: string
}

export const PULL_REQUESTS: PullRequest[] = [
  {
    id: 'pr-441',
    number: 441,
    title: 'feat(billing): usage-based billing schema + migration',
    authorId: 'person-024',
    status: 'merged',
    linkedIssueIds: ['issue-089'],
    files: [
      'billing-svc/src/schema/usage.ts',
      'billing-svc/src/schema/migrations/0012_usage_billing.sql',
      'billing-svc/src/stripe/webhooks.ts',
      'web/src/components/billing/UsageChart.tsx',
      'web/src/app/billing/page.tsx',
      'api-gateway/src/routes/billing.ts',
    ],
    createdAt: '2025-03-05T10:00:00Z',
    mergedAt: '2025-03-10T14:00:00Z',
    reviewerIds: ['person-009', 'person-030'],
    projectId: 'proj-002',
  },
  {
    id: 'pr-456',
    number: 456,
    title: 'feat(telemetry): rewrite Kafka consumer with parallel processing',
    authorId: 'person-010',
    status: 'merged',
    linkedIssueIds: ['issue-102'],
    files: [
      'telemetry-svc/src/consumers/kafka.ts',
      'telemetry-svc/src/consumers/parallel.ts',
      'telemetry-svc/src/serializers/proto.ts',
      'data-pipeline/src/transforms/telemetry.ts',
    ],
    createdAt: '2025-03-07T09:00:00Z',
    mergedAt: '2025-03-10T15:00:00Z',
    reviewerIds: ['person-011', 'person-004'],
    projectId: 'proj-003',
    description: 'Rewrites the Kafka consumer to use parallel processing. p99 drops from 87ms to 62ms.',
  },
  {
    id: 'pr-461',
    number: 461,
    title: 'fix(auth): add PKCE flow to OAuth2 implementation',
    authorId: 'person-004',
    status: 'merged',
    linkedIssueIds: ['issue-112'],
    files: [
      'auth-svc/src/oauth/pkce.ts',
      'auth-svc/src/oauth/tokens.ts',
      'auth-svc/src/middleware/auth.ts',
      'web/src/lib/auth/pkce.ts',
    ],
    createdAt: '2025-03-15T11:00:00Z',
    mergedAt: '2025-03-18T16:00:00Z',
    reviewerIds: ['person-006', 'person-015'],
    projectId: 'proj-001',
  },
  {
    id: 'pr-471',
    number: 471,
    title: 'feat(billing): Stripe webhook idempotency',
    authorId: 'person-009',
    status: 'merged',
    linkedIssueIds: ['issue-089'],
    files: [
      'billing-svc/src/stripe/webhooks.ts',
      'billing-svc/src/stripe/idempotency.ts',
      'billing-svc/tests/webhooks.test.ts',
    ],
    createdAt: '2025-02-28T10:00:00Z',
    mergedAt: '2025-03-02T14:00:00Z',
    reviewerIds: ['person-008', 'person-024'],
    projectId: 'proj-002',
  },
  {
    id: 'pr-478',
    number: 478,
    title: 'feat(auth): OAuth2 PKCE flow for auth-svc',
    authorId: 'person-004',
    status: 'merged',
    linkedIssueIds: ['issue-112'],
    files: [
      'auth-svc/src/oauth/pkce.ts',
      'auth-svc/src/tokens/refresh.ts',
      'auth-svc/tests/pkce.test.ts',
    ],
    createdAt: '2025-04-01T09:00:00Z',
    mergedAt: '2025-04-02T11:00:00Z',
    reviewerIds: ['person-006', 'person-015'],
    projectId: 'proj-001',
  },
  {
    id: 'pr-481',
    number: 481,
    title: 'fix(billing): missing confirmation email on trial upgrade',
    authorId: 'person-008',
    status: 'merged',
    linkedIssueIds: ['issue-135'],
    files: [
      'billing-svc/src/emails/upgrade-confirmation.ts',
      'billing-svc/src/stripe/events/customer-updated.ts',
    ],
    createdAt: '2025-03-25T14:00:00Z',
    mergedAt: '2025-04-01T10:00:00Z',
    reviewerIds: ['person-009'],
    projectId: 'proj-002',
  },
  // THE HEADLINE PR — Clerk without ADR approval
  {
    id: 'pr-482',
    number: 482,
    title: 'feat(auth): integrate Clerk for new user onboarding flow',
    authorId: 'person-021',
    status: 'merged',
    linkedIssueIds: [], // No linked issue — drift signal
    files: [
      'web/src/lib/auth/clerk.ts',
      'web/src/app/onboarding/page.tsx',
      'web/src/middleware.ts',
      'auth-svc/src/providers/clerk-webhook.ts',
      'web/src/components/auth/ClerkProvider.tsx',
      'api-gateway/src/middleware/clerk-verify.ts',
    ],
    createdAt: '2025-04-02T14:00:00Z',
    mergedAt: '2025-04-02T15:20:00Z',
    reviewerIds: ['person-007'], // Only one reviewer, no security review
    projectId: 'proj-001',
    description: 'Adds Clerk as auth provider for onboarding. Feature-flagged. Faster DX than Auth0 for new user flows.',
  },
  {
    id: 'pr-483',
    number: 483,
    title: 'feat(mobile): push notifications for critical alerts',
    authorId: 'person-013',
    status: 'open',
    linkedIssueIds: ['issue-156'],
    files: [
      'mobile-app/src/notifications/push.ts',
      'mobile-app/src/screens/Alerts.tsx',
      'api-gateway/src/routes/notifications.ts',
    ],
    createdAt: '2025-04-10T10:00:00Z',
    reviewerIds: ['person-020'],
    projectId: 'proj-004',
  },
  {
    id: 'pr-484',
    number: 484,
    title: 'feat(infra): add SOC2 audit logging to all services',
    authorId: 'person-016',
    status: 'open',
    linkedIssueIds: ['issue-178'],
    files: [
      'infra/audit/logger.ts',
      'auth-svc/src/middleware/audit.ts',
      'billing-svc/src/middleware/audit.ts',
      'api-gateway/src/middleware/audit.ts',
    ],
    createdAt: '2025-04-12T09:00:00Z',
    reviewerIds: ['person-015', 'person-002'],
    projectId: 'proj-005',
  },
  // PR with no linked issue — another drift signal
  {
    id: 'pr-487',
    number: 487,
    title: 'chore(telemetry): bump Kafka client to 3.6.0',
    authorId: 'person-022',
    status: 'merged',
    linkedIssueIds: [], // No linked issue
    files: [
      'telemetry-svc/package.json',
      'data-pipeline/package.json',
    ],
    createdAt: '2025-04-15T10:00:00Z',
    mergedAt: '2025-04-16T11:00:00Z',
    reviewerIds: ['person-010'],
    projectId: 'proj-003',
  },
]
