import { llm } from '@/lib/llm/router'
import type { RetroAgentInput, RetroAgentOutput } from './types'
import { ISSUES } from '@/lib/fixtures/issues'

const SYSTEM = `You are the Retro Agent for Nerith. Generate end-of-sprint retrospectives with planned vs shipped analysis, cycle time stats, and root cause clusters.

Be specific about what was missed and why. Root cause clusters should be actionable.`

export async function runRetroAgent(input: RetroAgentInput): Promise<RetroAgentOutput> {
  const sprintStart = new Date(input.sprintStartDate)
  const sprintEnd = new Date(input.sprintEndDate)

  const sprintIssues = ISSUES.filter((i) => {
    const updated = new Date(i.updatedAt)
    return updated >= sprintStart && updated <= sprintEnd
  })

  const shipped = sprintIssues.filter((i) => i.status === 'done')
  const missed = sprintIssues.filter((i) => i.status !== 'done' && i.status !== 'cancelled')

  const response = await llm({
    system: SYSTEM,
    user: `Sprint ${input.sprintNumber} retro.\nShipped: ${shipped.map((i) => i.identifier).join(', ')}\nMissed: ${missed.map((i) => i.identifier).join(', ')}`,
    temperature: 0.4,
  })

  if (response.mock) {
    return getMockRetro(input, shipped, missed)
  }

  return getMockRetro(input, shipped, missed)
}

function getMockRetro(
  input: RetroAgentInput,
  shipped: typeof ISSUES,
  missed: typeof ISSUES
): RetroAgentOutput {
  const plannedVelocity = [...shipped, ...missed].reduce((sum, i) => sum + (i.estimate ?? 3), 0)
  const shippedVelocity = shipped.reduce((sum, i) => sum + (i.estimate ?? 3), 0)

  return {
    sprintNumber: input.sprintNumber,
    sprintGoal: `Ship billing v2 beta + auth migration groundwork`,
    plannedIssues: [...shipped, ...missed].map((i) => i.identifier),
    shippedIssues: shipped.map((i) => i.identifier),
    missedIssues: missed.map((i) => i.identifier),
    velocityPlanned: plannedVelocity,
    velocityShipped: shippedVelocity,
    cycleTimeP50: 4.2,
    cycleTimeP95: 9.8,
    rootCauseClusters: [
      {
        label: 'External dependency delay',
        issueIds: missed.filter((i) => i.labels.includes('auth')).map((i) => i.id),
        description: 'Auth0 vendor contract negotiation delayed migration work by 2 weeks.',
      },
      {
        label: 'Scope creep',
        issueIds: missed.filter((i) => i.labels.includes('billing')).map((i) => i.id),
        description: 'Billing v2 usage-based schema was larger than estimated (8pt → 13pt).',
      },
    ],
    narrative: `Sprint ${input.sprintNumber} achieved ${Math.round((shippedVelocity / Math.max(plannedVelocity, 1)) * 100)}% of planned velocity. The primary blockers were the Auth0 contract delay and expanded scope on usage-based billing.`,
    actionItems: [
      { owner: 'person-001', action: 'Unblock Auth0 contract', dueDate: new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10) },
      { owner: 'person-004', action: 'Fix flaky auth tests', dueDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10) },
    ],
  }
}
