import { z } from 'zod'

export const CartographerInputSchema = z.object({
  event: z.object({
    id: z.string(),
    source: z.enum(['slack', 'github', 'linear', 'notion', 'granola']),
    type: z.string(),
    payload: z.record(z.unknown()),
    workspaceId: z.string(),
    receivedAt: z.string(),
  }),
})

export const CartographerOutputSchema = z.object({
  mutations: z.array(
    z.discriminatedUnion('op', [
      z.object({ op: z.literal('upsert_node'), node: z.record(z.unknown()) }),
      z.object({ op: z.literal('upsert_edge'), edge: z.record(z.unknown()) }),
    ])
  ),
  summary: z.string(),
  confidence: z.number(),
})

export type CartographerInput = z.infer<typeof CartographerInputSchema>
export type CartographerOutput = z.infer<typeof CartographerOutputSchema>
