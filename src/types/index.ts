// Core graph types
export type NodeType =
  | 'Person'
  | 'Team'
  | 'Project'
  | 'Issue'
  | 'PullRequest'
  | 'Commit'
  | 'Document'
  | 'Decision'
  | 'Commitment'
  | 'Customer'
  | 'Call'
  | 'Message'
  | 'Service'
  | 'Outcome'

export type EdgeType =
  | 'OWNS'
  | 'MEMBER_OF'
  | 'IMPLEMENTS'
  | 'CONTRADICTS'
  | 'SUPERSEDES'
  | 'BLOCKS'
  | 'MENTIONS'
  | 'PROMISED_TO'
  | 'REFERENCES'
  | 'DEPLOYED_TO'
  | 'AUTHORED'
  | 'REVIEWED'
  | 'DECIDED_IN'

export interface Provenance {
  eventId: string
  sourceUrl?: string
  sourceType: 'slack' | 'github' | 'linear' | 'notion' | 'granola' | 'manual'
  capturedAt: string
}

export interface GraphNode {
  id: string
  type: NodeType
  props: Record<string, unknown>
  provenance: Provenance[]
  confidence: number
  workspaceId: string
  createdAt: string
  updatedAt: string
}

export interface GraphEdge {
  id: string
  type: EdgeType
  fromId: string
  toId: string
  props: Record<string, unknown>
  provenance: Provenance[]
  confidence: number
  validFrom: string
  validTo?: string
  workspaceId: string
}

export type DriftSeverity = 'info' | 'warn' | 'critical'
export type DriftStatus = 'open' | 'accepted' | 'dismissed' | 'snoozed'
export type ActionType = 'open_pr' | 'file_ticket' | 'update_doc' | 'dm_owner' | 'dismiss' | 'snooze'

export interface DriftAction {
  type: ActionType
  label: string
  payload: Record<string, unknown>
}

export interface DriftEvent {
  id: string
  workspaceId: string
  agentName: string
  ruleId: string
  severity: DriftSeverity
  status: DriftStatus
  headline: string
  evidence: string
  nodeIds: string[]
  actions: DriftAction[]
  confidence: number
  generatedAt: string
  acknowledgedAt?: string
  acknowledgedBy?: string
  snoozedUntil?: string
}

export interface Decision {
  id: string
  workspaceId: string
  title: string
  body: string
  decidedAt: string
  decidedInId?: string // Call/Message node ID
  status: 'active' | 'superseded' | 'contradicted'
  supersededById?: string
  contradictedByIds?: string[]
  tags: string[]
  participants: string[]
  provenance: Provenance[]
}

export interface Commitment {
  id: string
  workspaceId: string
  description: string
  madeBy: string // Person node ID
  promisedTo: string // Customer/Team node ID
  dueDate?: string
  status: 'pending' | 'fulfilled' | 'overdue' | 'cancelled'
  linkedIssueIds: string[]
  provenance: Provenance[]
}

export interface Spec {
  id: string
  workspaceId: string
  title: string
  body: string
  status: 'draft' | 'in-review' | 'approved' | 'published'
  synthesizedFrom: string[]
  linkedDecisionIds: string[]
  linkedProjectIds: string[]
  createdAt: string
  updatedAt: string
  authorId: string
}

export interface AuditEntry {
  id: string
  workspaceId: string
  actionType: ActionType
  agentName: string
  userId: string
  driftEventId: string
  payload: Record<string, unknown>
  result: Record<string, unknown>
  executedAt: string
  mock: boolean
}

export interface IntegrationStatus {
  id: string
  name: string
  type: 'slack' | 'github' | 'linear' | 'notion' | 'granola'
  mode: 'connected' | 'mock' | 'disconnected'
  lastSync?: string
  eventCount: number
  errorCount: number
}

export interface Person {
  id: string
  name: string
  email: string
  role: string
  team: string
  avatarUrl?: string
  slackHandle?: string
  githubHandle?: string
  linearHandle?: string
}

export interface Project {
  id: string
  name: string
  status: 'planning' | 'active' | 'shipped' | 'cancelled'
  description: string
  teamId: string
  ownerId: string
  startDate: string
  targetDate: string
  services: string[]
}
