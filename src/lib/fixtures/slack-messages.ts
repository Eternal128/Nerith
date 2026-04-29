export interface SlackMessage {
  id: string
  channel: string
  userId: string
  text: string
  timestamp: string
  threadTs?: string
  reactions?: { emoji: string; count: number }[]
}

export const SLACK_MESSAGES: SlackMessage[] = [
  // #auth-migration thread — the centerpiece of the demo
  {
    id: 'msg-001',
    channel: 'auth-migration',
    userId: 'person-006',
    text: 'Quick thread on auth provider selection. We\'ve been running the Auth0 PoC for 3 weeks. I think we\'re in good shape to proceed per ADR-007. @tanvir what\'s your current take?',
    timestamp: '2025-01-20T09:15:00Z',
    threadTs: '2025-01-20T09:15:00Z',
  },
  {
    id: 'msg-002',
    channel: 'auth-migration',
    userId: 'person-006',
    text: 'Auth0 PoC update: PKCE flow works, SSO config is solid. MFA enforcement looks doable. Main concern is the webhook latency on the management API — seeing 800ms p99.',
    timestamp: '2025-01-20T09:16:00Z',
    threadTs: '2025-01-20T09:15:00Z',
  },
  {
    id: 'msg-003',
    channel: 'auth-migration',
    userId: 'person-006',
    text: 'That\'s expected from Auth0 mgmt API — it\'s async by design. User-facing auth latency is 45ms p99 which is excellent.',
    timestamp: '2025-01-20T09:45:00Z',
    threadTs: '2025-01-20T09:15:00Z',
  },
  {
    id: 'msg-004',
    channel: 'auth-migration',
    userId: 'person-002',
    text: 'ADR-007 is locked. Auth0 it is. Let\'s not relitigate. @tanvir get the migration timeline in Linear by EOW.',
    timestamp: '2025-01-20T10:02:00Z',
    threadTs: '2025-01-20T09:15:00Z',
  },

  // March 14 — Clerk debate starts
  {
    id: 'msg-341',
    channel: 'auth-migration',
    userId: 'person-021',
    text: 'Heads up — I\'ve been looking at Clerk for our auth requirements and honestly it\'s a serious contender. The DX is significantly better than Auth0. Has anyone done a full comparison recently?',
    timestamp: '2025-03-14T11:22:00Z',
    threadTs: '2025-03-14T11:22:00Z',
  },
  {
    id: 'msg-342',
    channel: 'auth-migration',
    userId: 'person-007',
    text: 'I\'ve been using Clerk on a side project. The session management is way cleaner. And the pricing is way better at our scale — Auth0\'s MAU pricing will hit us hard when we onboard enterprise customers.',
    timestamp: '2025-03-14T11:35:00Z',
    threadTs: '2025-03-14T11:22:00Z',
  },
  {
    id: 'msg-343',
    channel: 'auth-migration',
    userId: 'person-006',
    text: 'Chloe, Mei — this is concerning. We have ADR-007 in place for a reason. Auth0 has SOC2 compliance built in. Clerk is newer, less battle-tested in enterprise. What\'s the trigger for revisiting?',
    timestamp: '2025-03-14T12:15:00Z',
    threadTs: '2025-03-14T11:22:00Z',
  },
  {
    id: 'msg-344',
    channel: 'auth-migration',
    userId: 'person-021',
    text: 'Fair point on SOC2. But Clerk also has SOC2 Type II now. Main driver is DX + cost. Auth0 is $3.5k/month at 50k MAUs. Clerk is $350/month. That\'s $37k/year difference.',
    timestamp: '2025-03-14T12:30:00Z',
    threadTs: '2025-03-14T11:22:00Z',
  },
  {
    id: 'msg-345',
    channel: 'auth-migration',
    userId: 'person-015',
    text: 'From a security standpoint I need to review Clerk\'s pen test reports and compliance docs before we can consider this. ADR-007 was based on a specific security evaluation that included Auth0. Switching requires a new security review.',
    timestamp: '2025-03-14T13:45:00Z',
    threadTs: '2025-03-14T11:22:00Z',
  },
  {
    id: 'msg-346',
    channel: 'auth-migration',
    userId: 'person-002',
    text: 'Threading myself in here. ADR-007 stands until we formally revise it. This is a big deal — security team needs to do full review, legal needs to check vendor contract implications, and we need eng sign-off from @tanvir. Do NOT start building on Clerk without that process.',
    timestamp: '2025-03-14T14:00:00Z',
    threadTs: '2025-03-14T11:22:00Z',
  },
  {
    id: 'msg-347',
    channel: 'auth-migration',
    userId: 'person-021',
    text: 'Understood. Will put together a formal proposal with Clerk\'s compliance docs. Give me a week.',
    timestamp: '2025-03-14T14:05:00Z',
    threadTs: '2025-03-14T11:22:00Z',
  },

  // General #engineering channel
  {
    id: 'msg-100',
    channel: 'engineering',
    userId: 'person-004',
    text: 'Sprint 22 retro notes are up in Notion. Key themes: auth delays blocking billing work, and test flakiness eating 15% of CI time. Let\'s prioritize the flaky test fix this sprint.',
    timestamp: '2025-02-03T09:00:00Z',
  },
  {
    id: 'msg-101',
    channel: 'engineering',
    userId: 'person-010',
    text: 'Telemetry pipeline is hitting 95th percentile at 87ms. We\'re close to the 100ms target. Main bottleneck is the deserialization step in the consumer. Working on a fix.',
    timestamp: '2025-02-03T10:30:00Z',
  },
  {
    id: 'msg-102',
    channel: 'engineering',
    userId: 'person-009',
    text: 'Billing v2 design review is Thursday at 2pm. Required: @james @lena @ben @felix. Bring your questions on the webhook event schema.',
    timestamp: '2025-02-03T11:00:00Z',
  },

  // #billing channel
  {
    id: 'msg-200',
    channel: 'billing',
    userId: 'person-009',
    text: 'Stripe webhooks are now idempotent. Deployed to staging. @james can you do end-to-end test with the checkout flow?',
    timestamp: '2025-03-01T14:00:00Z',
  },
  {
    id: 'msg-201',
    channel: 'billing',
    userId: 'person-008',
    text: 'E2E tests passing on staging. One edge case: the trial-to-paid upgrade flow is missing a confirmation email. Filing HART-289.',
    timestamp: '2025-03-01T16:00:00Z',
  },
  {
    id: 'msg-202',
    channel: 'billing',
    userId: 'person-024',
    text: 'Usage-based billing schema PR is up (#441). Would love eyes from @nina and @felix. It\'s a big one — schema changes + migration + UI hooks.',
    timestamp: '2025-03-05T10:00:00Z',
  },

  // #telemetry channel
  {
    id: 'msg-300',
    channel: 'telemetry',
    userId: 'person-010',
    text: 'Just merged the Kafka consumer rewrite. p99 is down to 62ms. We beat the target. 🎉',
    timestamp: '2025-03-10T16:00:00Z',
    reactions: [{ emoji: '🎉', count: 8 }, { emoji: '🚀', count: 5 }],
  },
  {
    id: 'msg-301',
    channel: 'telemetry',
    userId: 'person-011',
    text: 'Warning: we have no runbook for the telemetry-svc. I had to debug a production incident by reading source code. This is a SOC2 risk. Filing HART-298.',
    timestamp: '2025-03-11T09:30:00Z',
    reactions: [{ emoji: '😬', count: 3 }],
  },

  // #mobile channel
  {
    id: 'msg-400',
    channel: 'mobile',
    userId: 'person-013',
    text: 'Mobile beta spec is ready for review: https://notion.hartwell.io/mobile-beta-v1. React Native + Expo. Target: field operator workflows only in v1.',
    timestamp: '2025-03-15T10:00:00Z',
  },
  {
    id: 'msg-401',
    channel: 'mobile',
    userId: 'person-014',
    text: 'Question: do we support offline mode in mobile beta? Several enterprise customers have spotty connectivity in warehouse environments.',
    timestamp: '2025-03-15T10:30:00Z',
    threadTs: '2025-03-15T10:30:00Z',
  },
  {
    id: 'msg-402',
    channel: 'mobile',
    userId: 'person-013',
    text: 'Offline mode is v2. In scope for this sprint: push notifications for critical alerts only.',
    timestamp: '2025-03-15T11:00:00Z',
    threadTs: '2025-03-15T10:30:00Z',
  },

  // #general channel
  {
    id: 'msg-500',
    channel: 'general',
    userId: 'person-001',
    text: 'Huge day — we just closed Series A. $18M led by Benchmark. We\'re going to build this thing right. Thank you all. 🙏',
    timestamp: '2025-02-14T17:30:00Z',
    reactions: [{ emoji: '🎉', count: 40 }, { emoji: '🚀', count: 38 }, { emoji: '❤️', count: 35 }],
  },
  {
    id: 'msg-501',
    channel: 'general',
    userId: 'person-035',
    text: 'Pipeline update: 4 enterprise deals in advanced stages. Acme Logistics, Vertex Manufacturing, Cascade Warehousing, and TechForge. All have robotics fleets >200 units. Combined ARR potential: $2.4M.',
    timestamp: '2025-03-20T09:00:00Z',
  },

  // Customer promises from Tyler
  {
    id: 'msg-600',
    channel: 'gtm',
    userId: 'person-035',
    text: 'Important: committed to Acme Logistics that we\'d have SSO (SAML) working by Apr 30. They made this a contract requirement. @priya @tanvir — this is a hard deadline.',
    timestamp: '2025-03-25T14:00:00Z',
    reactions: [{ emoji: '⚠️', count: 2 }],
  },
  {
    id: 'msg-601',
    channel: 'gtm',
    userId: 'person-036',
    text: 'Vertex Manufacturing wants offline mode in mobile before they sign. Tyler said we\'d have it in Q3. @fatima — is this tracked?',
    timestamp: '2025-04-01T10:00:00Z',
  },

  // The critical Clerk PR merge announcement
  {
    id: 'msg-700',
    channel: 'auth-migration',
    userId: 'person-021',
    text: 'Shipping PR #482 — Clerk integration for the new user onboarding flow. I know we discussed this, but the onboarding team was blocked and this was the fastest path. Used a feature flag so it\'s isolated.',
    timestamp: '2025-04-02T15:30:00Z',
    reactions: [{ emoji: '😳', count: 3 }, { emoji: '❓', count: 2 }],
  },
  {
    id: 'msg-701',
    channel: 'auth-migration',
    userId: 'person-006',
    text: '@chloe this should NOT have been merged without the security review completing. Flagging to @priya now.',
    timestamp: '2025-04-02T15:45:00Z',
  },
  {
    id: 'msg-702',
    channel: 'auth-migration',
    userId: 'person-002',
    text: 'We need to have a very serious conversation about this. The process exists for a reason. Reverting this now is complex because you already deployed to staging. @yuki can you assess the security posture ASAP?',
    timestamp: '2025-04-02T16:00:00Z',
  },
]
