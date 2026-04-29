import { describe, it, expect } from 'vitest'
import { runExecutor } from '../src/lib/agents/executor/runner'
import { runAuditor } from '../src/lib/agents/auditor/runner'
import { runStandupComposer } from '../src/lib/agents/standup-composer/runner'
import { runRetroAgent } from '../src/lib/agents/retro-agent/runner'

describe('Executor agent', () => {
  it('executes file_ticket and returns audit entry', async () => {
    const result = await runExecutor({
      driftEventId: 'drift-001',
      actionType: 'file_ticket',
      payload: { title: 'Test ticket' },
      userId: 'person-002',
      workspaceId: 'ws-hartwell-001',
      approved: true,
    })
    expect(result.success).toBe(true)
    expect(result.auditEntry.driftEventId).toBe('drift-001')
    expect(result.mock).toBe(true)
  })

  it('throws if not approved', async () => {
    await expect(runExecutor({
      driftEventId: 'drift-001',
      actionType: 'dismiss',
      payload: {},
      userId: 'person-002',
      workspaceId: 'ws-hartwell-001',
      approved: false,
    })).rejects.toThrow('not approved')
  })
})

describe('Auditor agent', () => {
  it('approves clean drift event output', async () => {
    const result = await runAuditor({
      agentOutput: { headline: 'PR #482 contradicts ADR-007', evidence: 'Clerk vs Auth0', nodeIds: [], confidence: 0.97 },
      agentName: 'drift-watcher',
      workspaceId: 'ws-hartwell-001',
    })
    expect(result.passed).toBe(true)
    expect(result.recommendation).toBe('approve')
  })

  it('rejects output with missing required fields', async () => {
    const result = await runAuditor({
      agentOutput: { confidence: 0.5 },
      agentName: 'drift-watcher',
      workspaceId: 'ws-hartwell-001',
    })
    expect(result.passed).toBe(false)
  })
})

describe('Standup Composer', () => {
  it('generates standup for Sarah Chen', async () => {
    const result = await runStandupComposer({
      personId: 'person-004',
      workspaceId: 'ws-hartwell-001',
      date: '2025-04-28',
    })
    expect(result.personName).toBe('Sarah Chen')
    expect(result.date).toBe('2025-04-28')
  })
})

describe('Retro Agent', () => {
  it('generates sprint retro with narrative', async () => {
    const result = await runRetroAgent({
      sprintNumber: 24,
      workspaceId: 'ws-hartwell-001',
      sprintStartDate: '2025-04-01',
      sprintEndDate: '2025-04-14',
    })
    expect(result.sprintNumber).toBe(24)
    expect(result.narrative).toBeTruthy()
    expect(result.actionItems.length).toBeGreaterThan(0)
  })
})
