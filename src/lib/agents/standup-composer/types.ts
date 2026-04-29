import { z } from 'zod'

export const StandupComposerInputSchema = z.object({
  personId: z.string(),
  workspaceId: z.string(),
  date: z.string(),
  lookbackHours: z.number().optional().default(24),
})

export const StandupComposerOutputSchema = z.object({
  personId: z.string(),
  personName: z.string(),
  date: z.string(),
  yesterday: z.array(z.string()),
  today: z.array(z.string()),
  blockers: z.array(z.string()),
  activitySummary: z.string(),
  citations: z.array(z.object({ type: z.string(), id: z.string(), description: z.string() })),
})

export type StandupComposerInput = z.infer<typeof StandupComposerInputSchema>
export type StandupComposerOutput = z.infer<typeof StandupComposerOutputSchema>
