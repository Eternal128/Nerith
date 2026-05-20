import { addNode, addEdge, GraphNode } from "../../graph/store";
import { emitDriftEvent } from "../../graph/mutations";

const NOW = new Date().toISOString();

function emp(id: string, name: string, dept: string, role: string): GraphNode {
  return { id, type: "employee", label: name, data: { department: dept, role, hiredAt: "2022-01-15" }, createdAt: NOW };
}

function cand(id: string, name: string, reqId: string, score: number): GraphNode {
  return { id, type: "candidate", label: name, data: { requisitionId: reqId, score, appliedAt: "2024-03-01" }, createdAt: NOW };
}

function req(id: string, title: string, dept: string): GraphNode {
  return { id, type: "requisition", label: title, data: { department: dept, status: "open", headcount: 2 }, createdAt: NOW };
}

function adr(id: string, title: string, status: string, number: number): GraphNode {
  return { id, type: "adr", label: title, data: { status, number }, createdAt: NOW };
}

function policy(id: string, title: string): GraphNode {
  return { id, type: "policy", label: title, data: { version: "1.0", effective: "2024-01-01" }, createdAt: NOW };
}

function course(id: string, title: string, dept: string): GraphNode {
  return { id, type: "course", label: title, data: { department: dept, durationWeeks: 4 }, createdAt: NOW };
}

// Employee name data spread across departments
const ENG_NAMES = [
  "Aria Patel","Ben Nguyen","Chloe Kim","Dan Torres","Elena Ross","Finn Murphy",
  "Gina Lee","Hiro Tanaka","Isla Wright","Jake Brown","Kai Chen","Lily Adams",
  "Marco Rivera","Nina Scott","Owen Hall","Priya Nair","Quinn Davis","Ravi Shah",
  "Sara Johnson","Tom Clark","Uma Patel","Vince Park","Wendy Li","Xander Cruz",
  "Yuki Ito","Zara Ahmed","Aiden Moore","Beth Taylor","Carlos Diaz","Demi Wilson",
];
const SALES_NAMES = [
  "Ethan Fox","Fiona Grant","Gary Hughes","Hannah Islam","Ivan Jones","Julia Koch",
  "Kevin Long","Laura Martinez","Mike Nash","Nora Owens","Oscar Price","Paula Quinn",
  "Ray Reed","Stella Stone","Tyler Upton","Uma Vega","Victor West","Xena Young",
  "Yara Zimmerman","Zoe Abbott","Aaron Blake","Bella Cole","Chris Dean","Diana Evans",
  "Evan Fisher",
];
const CS_NAMES = [
  "Faith Garcia","Greg Hernandez","Holly Ingram","Ian Jackson","Jade King",
  "Liam Lewis","Mia Lopez","Noah Miller","Olivia Nelson","Pedro Ortiz",
  "Quinn Phillips","Rosa Roberts","Sam Sanchez","Tina Turner","Ursula Underwood",
  "Vera Vasquez","Will Walker","Xia Xu","Yasmine Yang","Zach Zhang",
];
const PEOPLE_NAMES = [
  "Abby Allen","Brad Baker","Carla Campbell","Derek Carter","Eve Chang",
  "Felix Cho","Gwen Cooper","Hank Cruz","Iris Diaz","Jack Douglas",
  "Karen Elliott","Leo Fernandez","Maya Flores","Nate Ford","Ora Freeman",
];
const FINANCE_NAMES = [
  "Paul Gibson","Quinn Gomez","Rachel Grant","Steve Gray","Tara Green",
  "Uriah Griffin","Vivian Hall","Walter Harris","Xenia Hayes","Yvonne Hill",
  "Zander Holmes","Amy Howard","Brian Hudson","Clara Hughes","Donna Hunt",
];
const PRODUCT_NAMES = [
  "Eric James","Fay Jenkins","Glen Jordan","Holly Kennedy","Ian Kim",
  "Jana Lane","Kurt Lawrence","Lena Lee","Mike Lewis","Naomi Lin",
  "Oscar Long","Paula Marks","Quinn Mason","Rick Mills","Sara Morris",
];

const DEPT_EMPLOYEES: { dept: string; names: string[]; role: string }[] = [
  { dept: "Engineering", names: ENG_NAMES, role: "Software Engineer" },
  { dept: "Sales", names: SALES_NAMES, role: "Account Executive" },
  { dept: "CustomerSuccess", names: CS_NAMES, role: "CS Manager" },
  { dept: "People", names: PEOPLE_NAMES, role: "HR Business Partner" },
  { dept: "Finance", names: FINANCE_NAMES, role: "Financial Analyst" },
  { dept: "Product", names: PRODUCT_NAMES, role: "Product Manager" },
];

export function seedHR(): void {
  // Employees (apt-emp-001..120)
  let empIdx = 1;
  for (const { dept, names, role } of DEPT_EMPLOYEES) {
    for (const name of names) {
      const id = `apt-emp-${String(empIdx).padStart(3, "0")}`;
      addNode(emp(id, name, dept, role));
      empIdx++;
    }
  }

  // HR ADRs
  addNode(adr("apt-adr-001", "ADR-HR-001: Centralize people data in Postgres", "accepted", 1));
  addNode(adr("apt-adr-002", "ADR-HR-002: Adopt bias-aware screening", "proposed", 2));
  addNode(adr("apt-adr-003", "ADR-HR-003: Use structured interview rubrics", "accepted", 3));
  addNode(adr("apt-adr-004", "ADR-HR-004: 30/60/90 onboarding template", "accepted", 4));
  addNode(adr("apt-adr-005", "ADR-HR-005: Continuous feedback over annual reviews", "proposed", 5));

  // Policies
  addNode(policy("apt-policy-001", "Equal Opportunity Employment Policy"));
  addNode(policy("apt-policy-002", "Anti-Harassment Policy"));
  addNode(policy("apt-policy-003", "Remote Work Policy"));
  addNode(policy("apt-policy-004", "Compensation & Pay Equity Policy"));
  addNode(policy("apt-policy-005", "Data Privacy & AI Use Policy"));

  // Courses
  const courseList = [
    ["Inclusive Leadership 101", "People"],
    ["Python for Data Analysis", "Engineering"],
    ["Sales Methodology Certification", "Sales"],
    ["Customer Success Fundamentals", "CustomerSuccess"],
    ["Financial Modeling Essentials", "Finance"],
    ["Product Discovery Workshop", "Product"],
    ["Unconscious Bias Awareness", "People"],
    ["Technical Interview Preparation", "Engineering"],
    ["Negotiation Skills", "Sales"],
    ["Executive Presence", "All"],
  ];
  courseList.forEach(([title, dept], i) => {
    addNode(course(`apt-course-${String(i + 1).padStart(3, "0")}`, title!, dept!));
  });

  // Requisitions
  const reqList = [
    ["Senior Software Engineer", "Engineering"],
    ["Product Manager", "Product"],
    ["Account Executive", "Sales"],
    ["Customer Success Manager", "CustomerSuccess"],
    ["Data Analyst", "Finance"],
    ["HR Business Partner", "People"],
    ["Staff Engineer", "Engineering"],
    ["VP of Sales", "Sales"],
  ];
  reqList.forEach(([title, dept], i) => {
    const id = `apt-req-${String(i + 1).padStart(3, "0")}`;
    addNode(req(id, title!, dept!));
  });

  // Candidates (apt-cand-001..240) — spread across requisitions
  const CAND_FIRST = ["Alex","Jordan","Morgan","Taylor","Casey","Riley","Quinn","Blake","Avery","Drew",
    "Sam","Robin","Jamie","Cameron","Sage","Reese","Finley","River","Skyler","Peyton"];
  const CAND_LAST = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Wilson","Moore",
    "Anderson","Thomas","Jackson","White","Harris","Martin","Thompson","Turner","Robinson","Clark"];
  for (let i = 1; i <= 240; i++) {
    const id = `apt-cand-${String(i).padStart(3, "0")}`;
    const first = CAND_FIRST[(i - 1) % CAND_FIRST.length]!;
    const last = CAND_LAST[Math.floor((i - 1) / CAND_FIRST.length) % CAND_LAST.length]!;
    const reqNum = ((i - 1) % 8) + 1;
    const reqId = `apt-req-${String(reqNum).padStart(3, "0")}`;
    const score = 50 + Math.floor(((i * 37) % 50));
    addNode(cand(id, `${first} ${last}`, reqId, score));
    addEdge({ id: `e-cand-req-${i}`, from: id, to: reqId, relation: "appliedTo" });
  }

  // Slack thread about screening bias
  addNode({
    id: "apt-slack-001",
    type: "event",
    label: "Slack: #people-ops screening model bias detected",
    data: {
      channel: "#people-ops",
      participants: ["apt-emp-001", "apt-emp-091", "apt-emp-092"],
      messageCount: 31,
      sentiment: "concerned",
      linkedAdr: "apt-adr-002",
    },
    createdAt: NOW,
  });
  addEdge({ id: "e-apt-slack-adr2", from: "apt-slack-001", to: "apt-adr-002", relation: "discusses" });

  // CRITICAL drift event
  addNode({
    id: "apt-drift-001",
    type: "event",
    label: "CRITICAL: Screening model disadvantages protected class",
    data: {
      severity: "critical",
      agentId: "compliance-auditor",
      refNodeId: "apt-adr-002",
      regulation: "EEOC §703",
      timestamp: NOW,
    },
    createdAt: NOW,
  });
  addEdge({ id: "e-apt-drift-adr2", from: "apt-drift-001", to: "apt-adr-002", relation: "flags" });
  addEdge({ id: "e-apt-drift-slack", from: "apt-drift-001", to: "apt-slack-001", relation: "followsFrom" });

  // Link ADRs to policies
  addEdge({ id: "e-adr2-policy5", from: "apt-adr-002", to: "apt-policy-005", relation: "implements" });
  addEdge({ id: "e-adr4-policy1", from: "apt-adr-004", to: "apt-policy-001", relation: "supports" });

  // Emit additional drift via mutations helper so it shows in recent events
  emitDriftEvent({
    nodeId: "apt-adr-002",
    severity: "critical",
    message: "ADR-HR-002 not yet accepted — screening bias risk unmitigated",
    agentId: "compliance-auditor",
  });
}

export function getHRNodeIds(): string[] {
  // Return deterministic IDs without importing from store (called after seedHR)
  const ids: string[] = [];
  for (let i = 1; i <= 120; i++) ids.push(`apt-emp-${String(i).padStart(3, "0")}`);
  for (let i = 1; i <= 5; i++) ids.push(`apt-adr-${String(i).padStart(3, "0")}`);
  for (let i = 1; i <= 8; i++) ids.push(`apt-req-${String(i).padStart(3, "0")}`);
  for (let i = 1; i <= 240; i++) ids.push(`apt-cand-${String(i).padStart(3, "0")}`);
  for (let i = 1; i <= 10; i++) ids.push(`apt-course-${String(i).padStart(3, "0")}`);
  for (let i = 1; i <= 5; i++) ids.push(`apt-policy-${String(i).padStart(3, "0")}`);
  ids.push("apt-slack-001", "apt-drift-001");
  return ids;
}

export function getHRFixtureSummary(): { employees: number; candidates: number; requisitions: number } {
  return { employees: 120, candidates: 240, requisitions: 8 };
}
