import { z } from 'zod'

export const ProvenanceSchema = z.object({
  eventId: z.string(),
  sourceUrl: z.string().optional(),
  sourceType: z.enum(['slack', 'github', 'linear', 'notion', 'granola', 'manual']),
  capturedAt: z.string(),
})

export const GraphNodeSchema = z.object({
  id: z.string(),
  type: z.enum([
    'Person', 'Team', 'Project', 'Issue', 'PullRequest', 'Commit',
    'Document', 'Decision', 'Commitment', 'Customer', 'Call', 'Message',
    'Service', 'Outcome',
  ]),
  props: z.record(z.unknown()),
  provenance: z.array(ProvenanceSchema),
  confidence: z.number().min(0).max(1),
  workspaceId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const GraphEdgeSchema = z.object({
  id: z.string(),
  type: z.enum([
    'OWNS', 'MEMBER_OF', 'IMPLEMENTS', 'CONTRADICTS', 'SUPERSEDES',
    'BLOCKS', 'MENTIONS', 'PROMISED_TO', 'REFERENCES', 'DEPLOYED_TO',
    'AUTHORED', 'REVIEWED', 'DECIDED_IN',
  ]),
  fromId: z.string(),
  toId: z.string(),
  props: z.record(z.unknown()),
  provenance: z.array(ProvenanceSchema),
  confidence: z.number().min(0).max(1),
  validFrom: z.string(),
  validTo: z.string().optional(),
  workspaceId: z.string(),
})

export type GraphNodeInput = z.infer<typeof GraphNodeSchema>
export type GraphEdgeInput = z.infer<typeof GraphEdgeSchema>
