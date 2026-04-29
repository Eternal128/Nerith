import { z } from 'zod'

export const RetroAgentInputSchema = z.object({
  sprintNumber: z.number(),
  workspaceId: z.string(),
  teamId: z.string().optional(),
  sprintStartDate: z.string(),
  sprintEndDate: z.string(),
})

export const RetroAgentOutputSchema = z.object({
  sprintNumber: z.number(),
  sprintGoal: z.string(),
  plannedIssues: z.array(z.string()),
  shippedIssues: z.array(z.string()),
  missedIssues: z.array(z.string()),
  velocityPlanned: z.number(),
  velocityShipped: z.number(),
  cycleTimeP50: z.number(),
  cycleTimeP95: z.number(),
  rootCauseClusters: z.array(
    z.object({
      label: z.string(),
      issueIds: z.array(z.string()),
      description: z.string(),
    })
  ),
  narrative: z.string(),
  actionItems: z.array(
    z.object({
      owner: z.string(),
      action: z.string(),
      dueDate: z.string().optional(),
    })
  ),
})

export type RetroAgentInput = z.infer<typeof RetroAgentInputSchema>
export type RetroAgentOutput = z.infer<typeof RetroAgentOutputSchema>
