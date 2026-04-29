import { v4 as uuidv4 } from 'uuid'
import { isDemoMode } from '@/lib/env'
import type { ExecutorInput, ExecutorOutput } from './types'

const MOCK_RESULTS: Record<string, Record<string, unknown>> = {
  file_ticket: {
    ticketId: 'HART-417',
    url: 'https://linear.app/hartwellrobotics/issue/HART-417',
    title: 'Created from Nerith executor (mock)',
    status: 'created',
  },
  open_pr: {
    prNumber: 490,
    url: 'https://github.com/hartwell/monorepo/pull/490',
    title: 'ADR revision (mock)',
    status: 'opened',
  },
  update_doc: {
    docId: 'notion-doc-mock-001',
    url: 'https://notion.so/hartwell/mock-doc',
    status: 'updated',
  },
  dm_owner: {
    messageId: 'slack-msg-mock-001',
    status: 'sent',
  },
  dismiss: { status: 'dismissed' },
  snooze: { status: 'snoozed', until: new Date(Date.now() + 86400000).toISOString() },
}

export async function runExecutor(input: ExecutorInput): Promise<ExecutorOutput> {
  if (!input.approved) {
    throw new Error('Action not approved — cannot execute')
  }

  const isMock = isDemoMode

  // In mock mode, return fake results
  const result: Record<string, unknown> = isMock
    ? { ...MOCK_RESULTS[input.actionType], mock: true }
    : await executeReal(input)

  const auditEntry = {
    id: uuidv4(),
    actionType: input.actionType,
    agentName: 'executor',
    userId: input.userId,
    driftEventId: input.driftEventId,
    payload: input.payload,
    result,
    executedAt: new Date().toISOString(),
    mock: isMock,
  }

  // Store in audit log (in-memory for demo)
  auditLog.push(auditEntry)

  return {
    success: true,
    actionType: input.actionType,
    result,
    auditEntry,
    mock: isMock,
  }
}

async function executeReal(input: ExecutorInput): Promise<Record<string, unknown>> {
  // Real execution would call Linear/GitHub/Slack APIs
  // Stubbed until real API keys are present
  console.warn(`[executor] Real execution not yet wired for ${input.actionType}`)
  return { status: 'not_implemented', message: 'Real execution requires API keys' }
}

// In-memory audit log for demo
const auditLog: ExecutorOutput['auditEntry'][] = []

export function getAuditLog(): ExecutorOutput['auditEntry'][] {
  return [...auditLog]
}
