import { addNode, addEdge, GraphNode } from "../../graph/store";
import { emitDriftEvent } from "../../graph/mutations";

const NOW = new Date().toISOString();

function node(id: string, type: GraphNode["type"], label: string, data: Record<string, unknown> = {}): GraphNode {
  return { id, type, label, data, createdAt: NOW };
}

const EMP_NAMES = [
  "Alice Chen", "Bob Martinez", "Carol White", "David Kim", "Eva Patel",
  "Frank Lee", "Grace Thompson", "Henry Davis", "Iris Johnson", "Jack Wilson",
  "Karen Brown", "Leo Garcia", "Maya Rodriguez", "Nathan Taylor", "Olivia Anderson",
  "Paul Jackson", "Quinn Harris", "Rachel Clark", "Sam Lewis", "Tina Walker",
  "Uma Robinson", "Victor Hall", "Wendy Allen", "Xavier Young", "Yara King",
  "Zoe Wright", "Aaron Scott", "Beth Green", "Carl Baker", "Diana Adams",
  "Eric Nelson", "Faye Carter", "George Mitchell", "Helen Perez", "Ivan Roberts",
  "Julia Turner", "Kevin Phillips", "Laura Campbell", "Mike Parker", "Nina Evans",
];

export function seedHartwell(): void {
  // 40 employees
  for (let i = 1; i <= 40; i++) {
    const id = `hw-emp-${String(i).padStart(3, "0")}`;
    const name = EMP_NAMES[i - 1] ?? `Employee ${i}`;
    addNode(node(id, "employee", name, { department: i <= 15 ? "Engineering" : i <= 25 ? "Product" : "Operations" }));
  }

  // 5 projects
  const projects = ["AuthCore", "DataPipeline", "FrontendRewrite", "APIGateway", "MobileApp"];
  for (let i = 1; i <= 5; i++) {
    const id = `hw-proj-${String(i).padStart(3, "0")}`;
    addNode(node(id, "project", projects[i - 1]!, { status: "active" }));
  }

  // 7 ADRs
  const adrs = [
    { title: "ADR-001: Use PostgreSQL as primary datastore", status: "accepted" },
    { title: "ADR-002: Adopt TypeScript strict mode", status: "accepted" },
    { title: "ADR-003: REST-first API design", status: "accepted" },
    { title: "ADR-004: React 18 with server components", status: "accepted" },
    { title: "ADR-005: Feature flag system via LaunchDarkly", status: "deprecated" },
    { title: "ADR-006: JWT-based session management", status: "superseded" },
    { title: "ADR-007: Migrate Auth to Supabase", status: "proposed" },
  ];
  for (let i = 1; i <= 7; i++) {
    const id = `hw-adr-${String(i).padStart(3, "0")}`;
    const adr = adrs[i - 1]!;
    addNode(node(id, "adr", adr.title, { status: adr.status, number: i }));
  }

  // Slack debate node referencing ADR-007
  addNode(node("hw-slack-001", "event", "Slack: #engineering-arch debate on Supabase migration", {
    channel: "#engineering-arch",
    participants: ["hw-emp-001", "hw-emp-003", "hw-emp-007"],
    messageCount: 47,
    sentiment: "mixed",
    linkedAdr: "hw-adr-007",
  }));
  addEdge({ id: "e-slack-adr7", from: "hw-slack-001", to: "hw-adr-007", relation: "discusses" });

  // PR #482
  addNode(node("hw-pr-482", "event", "PR #482: Implement Supabase auth client", {
    prNumber: 482,
    author: "hw-emp-002",
    status: "open",
    reviewers: ["hw-emp-001", "hw-emp-005"],
    linkedAdr: "hw-adr-007",
    linesChanged: 1243,
  }));
  addEdge({ id: "e-pr-adr7", from: "hw-pr-482", to: "hw-adr-007", relation: "implements" });
  addEdge({ id: "e-pr-slack", from: "hw-pr-482", to: "hw-slack-001", relation: "followsFrom" });

  // CRITICAL drift event linked to PR #482
  const drift = emitDriftEvent({
    nodeId: "hw-pr-482",
    severity: "critical",
    message: "PR #482 merges auth implementation before ADR-007 is accepted — decision not ratified",
    agentId: "auditor",
  });

  // Edges linking employees to projects
  addEdge({ id: "e-emp1-proj1", from: "hw-emp-001", to: "hw-proj-001", relation: "leads" });
  addEdge({ id: "e-emp2-proj1", from: "hw-emp-002", to: "hw-proj-001", relation: "contributes" });
  addEdge({ id: "e-adr7-proj1", from: "hw-adr-007", to: "hw-proj-001", relation: "affects" });
  addEdge({ id: "e-drift-adr7", from: drift.id, to: "hw-adr-007", relation: "flags" });
}
