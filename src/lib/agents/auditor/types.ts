import { z } from 'zod'

export const AuditorInputSchema = z.object({
  agentOutput: z.record(z.unknown()),
  agentName: z.string(),
  workspaceId: z.string(),
})

export const AuditorFindingSchema = z.object({
  type: z.enum(['citation_missing', 'hallucinated_id', 'claim_unsupported', 'low_confidence']),
  description: z.string(),
  severity: z.enum(['error', 'warn', 'info']),
  field: z.string().optional(),
})

export const AuditorOutputSchema = z.object({
  passed: z.boolean(),
  findings: z.array(AuditorFindingSchema),
  score: z.number(),
  recommendation: z.enum(['approve', 'review', 'reject']),
})

export type AuditorInput = z.infer<typeof AuditorInputSchema>
export type AuditorOutput = z.infer<typeof AuditorOutputSchema>
