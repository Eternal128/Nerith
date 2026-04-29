// In-memory graph store for demo mode
// In production this would be Supabase/Postgres

import type { GraphNode, GraphEdge } from '@/types'

export class GraphStore {
  private nodes: Map<string, GraphNode> = new Map()
  private edges: Map<string, GraphEdge> = new Map()

  upsertNode(node: GraphNode): GraphNode {
    const existing = this.nodes.get(node.id)
    if (existing) {
      const updated = { ...existing, ...node, updatedAt: new Date().toISOString() }
      this.nodes.set(node.id, updated)
      return updated
    }
    this.nodes.set(node.id, node)
    return node
  }

  upsertEdge(edge: GraphEdge): GraphEdge {
    this.edges.set(edge.id, edge)
    return edge
  }

  getNode(id: string): GraphNode | undefined {
    return this.nodes.get(id)
  }

  getEdge(id: string): GraphEdge | undefined {
    return this.edges.get(id)
  }

  getNodesByType(type: GraphNode['type'], workspaceId: string): GraphNode[] {
    return Array.from(this.nodes.values()).filter(
      (n) => n.type === type && n.workspaceId === workspaceId
    )
  }

  getEdgesByType(type: GraphEdge['type'], workspaceId: string): GraphEdge[] {
    return Array.from(this.edges.values()).filter(
      (e) => e.type === type && e.workspaceId === workspaceId
    )
  }

  getNeighbors(nodeId: string, workspaceId: string): { node: GraphNode; edge: GraphEdge }[] {
    const results: { node: GraphNode; edge: GraphEdge }[] = []
    for (const edge of Array.from(this.edges.values())) {
      if (edge.workspaceId !== workspaceId) continue
      if (edge.fromId === nodeId) {
        const node = this.nodes.get(edge.toId)
        if (node) results.push({ node, edge })
      } else if (edge.toId === nodeId) {
        const node = this.nodes.get(edge.fromId)
        if (node) results.push({ node, edge })
      }
    }
    return results
  }

  getAllNodes(workspaceId: string): GraphNode[] {
    return Array.from(this.nodes.values()).filter((n) => n.workspaceId === workspaceId)
  }

  getAllEdges(workspaceId: string): GraphEdge[] {
    return Array.from(this.edges.values()).filter((e) => e.workspaceId === workspaceId)
  }

  search(query: string, workspaceId: string): GraphNode[] {
    const q = query.toLowerCase()
    return Array.from(this.nodes.values()).filter((n) => {
      if (n.workspaceId !== workspaceId) return false
      const props = JSON.stringify(n.props).toLowerCase()
      return props.includes(q) || n.type.toLowerCase().includes(q)
    })
  }

  loadMany(nodes: GraphNode[], edges: GraphEdge[]) {
    for (const n of nodes) this.nodes.set(n.id, n)
    for (const e of edges) this.edges.set(e.id, e)
  }

  size() {
    return { nodes: this.nodes.size, edges: this.edges.size }
  }
}

// Singleton for in-memory demo
let _store: GraphStore | null = null
export function getGraphStore(): GraphStore {
  if (!_store) _store = new GraphStore()
  return _store
}
