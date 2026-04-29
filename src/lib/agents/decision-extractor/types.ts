import { z } from 'zod'

export const DecisionExtractorInputSchema = z.object({
  source: z.object({
    id: z.string(),
    type: z.enum(['slack_thread', 'call_transcript', 'doc_edit', 'pr_description']),
    content: z.string(),
    authorId: z.string().optional(),
    workspaceId: z.string(),
    timestamp: z.string(),
  }),
})

export const ExtractedDecisionSchema = z.object({
  title: z.string(),
  body: z.string(),
  decidedAt: z.string(),
  participants: z.array(z.string()),
  tags: z.array(z.string()),
  confidence: z.number(),
  citations: z.array(z.string()),
  isCommitment: z.boolean(),
  commitmentTarget: z.string().optional(),
  commitmentDueDate: z.string().optional(),
})

export const DecisionExtractorOutputSchema = z.object({
  decisions: z.array(ExtractedDecisionSchema),
  commitments: z.array(ExtractedDecisionSchema),
  summary: z.string(),
})

export type DecisionExtractorInput = z.infer<typeof DecisionExtractorInputSchema>
export type DecisionExtractorOutput = z.infer<typeof DecisionExtractorOutputSchema>
export type ExtractedDecision = z.infer<typeof ExtractedDecisionSchema>
