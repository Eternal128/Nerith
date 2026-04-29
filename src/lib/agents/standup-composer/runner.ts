import { llm } from '@/lib/llm/router'
import type { StandupComposerInput, StandupComposerOutput } from './types'
import { PEOPLE } from '@/lib/fixtures/people'
import { ISSUES } from '@/lib/fixtures/issues'
import { PULL_REQUESTS } from '@/lib/fixtures/pull-requests'

const SYSTEM = `You are the Standup Composer for Nerith. Generate concise, specific daily standups for engineers based on their actual activity (commits, PR reviews, issue updates, Slack messages).

Format:
- Yesterday: specific completed actions with references
- Today: specific planned actions with issue IDs  
- Blockers: real blockers with owner/ETA if known

Be specific and cite real artifacts. Never invent issue IDs.`

export async function runStandupComposer(
  input: StandupComposerInput
): Promise<StandupComposerOutput> {
  const person = PEOPLE.find((p) => p.id === input.personId)
  if (!person) throw new Error(`Person not found: ${input.personId}`)

  const personIssues = ISSUES.filter((i) => i.assigneeId === input.personId)
  const personPRs = PULL_REQUESTS.filter((p) => p.authorId === input.personId)

  const response = await llm({
    system: SYSTEM,
    user: `Generate standup for ${person.name} (${person.role}, ${person.team}) for ${input.date}.\n\nAssigned issues:\n${personIssues.map((i) => `- ${i.identifier}: ${i.title} [${i.status}]`).join('\n')}\n\nRecent PRs:\n${personPRs.map((p) => `- PR #${p.number}: ${p.title} [${p.status}]`).join('\n')}`,
    temperature: 0.4,
  })

  if (response.mock) {
    return getMockStandup(input, person, personIssues, personPRs)
  }

  return {
    personId: input.personId,
    personName: person.name,
    date: input.date,
    yesterday: ['Worked on assigned tasks'],
    today: personIssues.filter((i) => i.status === 'in-progress').map((i) => `Continue ${i.identifier}: ${i.title}`),
    blockers: [],
    activitySummary: response.content.slice(0, 200),
    citations: [],
  }
}

function getMockStandup(
  input: StandupComposerInput,
  person: { name: string; role: string; team: string },
  issues: typeof ISSUES,
  prs: typeof PULL_REQUESTS
): StandupComposerOutput {
  const mergedPrs = prs.filter((p) => p.status === 'merged')
  const openPrs = prs.filter((p) => p.status === 'open')
  const inProgress = issues.filter((i) => i.status === 'in-progress')
  const done = issues.filter((i) => i.status === 'done')

  return {
    personId: input.personId,
    personName: person.name,
    date: input.date,
    yesterday: [
      ...mergedPrs.slice(0, 2).map((p) => `Merged PR #${p.number}: ${p.title}`),
      ...done.slice(0, 2).map((i) => `Completed ${i.identifier}: ${i.title}`),
    ],
    today: [
      ...inProgress.slice(0, 2).map((i) => `Continue ${i.identifier}: ${i.title}`),
      ...openPrs.slice(0, 1).map((p) => `Address review on PR #${p.number}`),
    ],
    blockers: [],
    activitySummary: `${mergedPrs.length} PR(s) merged · ${inProgress.length} issue(s) in progress`,
    citations: [
      ...mergedPrs.slice(0, 2).map((p) => ({ type: 'pr', id: p.id, description: `PR #${p.number}` })),
      ...inProgress.slice(0, 2).map((i) => ({ type: 'issue', id: i.id, description: i.identifier })),
    ],
  }
}
