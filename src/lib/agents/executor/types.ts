import { z } from 'zod'

export const ExecutorInputSchema = z.object({
  driftEventId: z.string(),
  actionType: z.enum(['open_pr', 'file_ticket', 'update_doc', 'dm_owner', 'dismiss', 'snooze']),
  payload: z.record(z.unknown()),
  userId: z.string(),
  workspaceId: z.string(),
  approved: z.boolean().optional().default(true),
})

export const ExecutorOutputSchema = z.object({
  success: z.boolean(),
  actionType: z.string(),
  result: z.record(z.unknown()),
  auditEntry: z.object({
    id: z.string(),
    actionType: z.string(),
    agentName: z.string(),
    userId: z.string(),
    driftEventId: z.string(),
    payload: z.record(z.unknown()),
    result: z.record(z.unknown()),
    executedAt: z.string(),
    mock: z.boolean(),
  }),
  mock: z.boolean(),
})

export type ExecutorInput = z.infer<typeof ExecutorInputSchema>
export type ExecutorOutput = z.infer<typeof ExecutorOutputSchema>
