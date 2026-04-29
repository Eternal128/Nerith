import type { GraphNode, GraphEdge, NodeType, EdgeType, Provenance } from '@/types'
import { getGraphStore } from './store'

interface CreateNodeInput {
  id?: string
  type: NodeType
  props: Record<string, unknown>
  workspaceId: string
  provenance?: Provenance[]
  confidence?: number
}

interface CreateEdgeInput {
  id?: string
  type: EdgeType
  fromId: string
  toId: string
  props?: Record<string, unknown>
  workspaceId: string
  provenance?: Provenance[]
  confidence?: number
  validFrom?: string
  validTo?: string
}

export function createNode(input: CreateNodeInput): GraphNode {
  const now = new Date().toISOString()
  const node: GraphNode = {
    id: input.id ?? crypto.randomUUID(),
    type: input.type,
    props: input.props,
    provenance: input.provenance ?? [],
    confidence: input.confidence ?? 1.0,
    workspaceId: input.workspaceId,
    createdAt: now,
    updatedAt: now,
  }
  return getGraphStore().upsertNode(node)
}

export function createEdge(input: CreateEdgeInput): GraphEdge {
  const edge: GraphEdge = {
    id: input.id ?? crypto.randomUUID(),
    type: input.type,
    fromId: input.fromId,
    toId: input.toId,
    props: input.props ?? {},
    provenance: input.provenance ?? [],
    confidence: input.confidence ?? 1.0,
    validFrom: input.validFrom ?? new Date().toISOString(),
    validTo: input.validTo,
    workspaceId: input.workspaceId,
  }
  return getGraphStore().upsertEdge(edge)
}

export function getSubgraph(nodeIds: string[], workspaceId: string) {
  const store = getGraphStore()
  const nodes = nodeIds.map((id) => store.getNode(id)).filter(Boolean) as GraphNode[]
  const nodeIdSet = new Set(nodeIds)
  const edges = store
    .getAllEdges(workspaceId)
    .filter((e) => nodeIdSet.has(e.fromId) && nodeIdSet.has(e.toId))
  return { nodes, edges }
}
