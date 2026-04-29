import { z } from 'zod'

export const DriftRuleResultSchema = z.object({
  ruleId: z.string(),
  fired: z.boolean(),
  severity: z.enum(['info', 'warn', 'critical']),
  headline: z.string(),
  evidence: z.string(),
  nodeIds: z.array(z.string()),
  confidence: z.number(),
  proposedActions: z.array(
    z.object({
      type: z.enum(['open_pr', 'file_ticket', 'update_doc', 'dm_owner', 'dismiss', 'snooze']),
      label: z.string(),
      payload: z.record(z.unknown()),
    })
  ),
})

export const DriftWatcherInputSchema = z.object({
  workspaceId: z.string(),
  windowDays: z.number().optional().default(30),
})

export const DriftWatcherOutputSchema = z.object({
  results: z.array(DriftRuleResultSchema),
  rulesRun: z.number(),
  rulesFired: z.number(),
  timestamp: z.string(),
})

export type DriftRuleResult = z.infer<typeof DriftRuleResultSchema>
export type DriftWatcherInput = z.infer<typeof DriftWatcherInputSchema>
export type DriftWatcherOutput = z.infer<typeof DriftWatcherOutputSchema>
