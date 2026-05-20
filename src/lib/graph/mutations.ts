import { addNode, addEdge, GraphNode, GraphEdge } from "./store";

export function upsertNode(node: GraphNode): void { addNode(node); }
export function upsertEdge(edge: GraphEdge): void { addEdge(edge); }
export function batchUpsertNodes(nodes: GraphNode[]): void { nodes.forEach(addNode); }
export function batchUpsertEdges(edges: GraphEdge[]): void { edges.forEach(addEdge); }

export function emitDriftEvent(params: {
  nodeId: string;
  severity: "info" | "warn" | "critical";
  message: string;
  agentId: string;
}): GraphNode {
  const event: GraphNode = {
    id: `drift-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    type: "event",
    label: `DRIFT: ${params.message}`,
    data: {
      severity: params.severity,
      agentId: params.agentId,
      refNodeId: params.nodeId,
      timestamp: new Date().toISOString(),
    },
    createdAt: new Date().toISOString(),
  };
  addNode(event);
  addEdge({ id: `e-${event.id}`, from: event.id, to: params.nodeId, relation: "references" });
  return event;
}
