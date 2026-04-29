import { z } from 'zod'

export const SpecSynthesizerInputSchema = z.object({
  sourceIds: z.array(z.string()),
  sourceTypes: z.array(z.enum(['slack_thread', 'call_transcript', 'issue_cluster', 'doc'])),
  title: z.string().optional(),
  workspaceId: z.string(),
})

export const SpecSynthesizerOutputSchema = z.object({
  title: z.string(),
  body: z.string(),
  citations: z.array(
    z.object({ nodeId: z.string(), quote: z.string(), type: z.string() })
  ),
  linkedDecisionIds: z.array(z.string()),
  openQuestions: z.array(z.string()),
  confidence: z.number(),
})

export type SpecSynthesizerInput = z.infer<typeof SpecSynthesizerInputSchema>
export type SpecSynthesizerOutput = z.infer<typeof SpecSynthesizerOutputSchema>
