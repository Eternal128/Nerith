export type NodeType =
  | "person"
  | "project"
  | "adr"
  | "event"
  | "candidate"
  | "requisition"
  | "employee"
  | "policy"
  | "course";

export interface GraphNode {
  id: string;
  type: NodeType;
  label: string;
  data: Record<string, unknown>;
  createdAt: string;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  relation: string;
}

export interface GraphStore {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

const store: GraphStore = { nodes: new Map(), edges: [] };

export function getStore(): GraphStore { return store; }
export function getNode(id: string): GraphNode | undefined { return store.nodes.get(id); }
export function addNode(node: GraphNode): void { store.nodes.set(node.id, node); }
export function addEdge(edge: GraphEdge): void { store.edges.push(edge); }
export function getAllNodes(): GraphNode[] { return Array.from(store.nodes.values()); }
export function getNodesByType(type: NodeType): GraphNode[] { return getAllNodes().filter(n => n.type === type); }
export function clearStore(): void { store.nodes.clear(); store.edges.length = 0; }
