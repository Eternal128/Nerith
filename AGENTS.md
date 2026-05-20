# AGENTS.md — Nerith Agent Roster

All 8 agents in the system. Each agent lives in `src/lib/agents/<name>/` and exports `run<Name>(input): Promise<output>`.

---

## 1. Cartographer

**Purpose:** Knowledge graph mapping. Given a query, samples the in-memory graph and returns relevant node IDs, a summary, and relationships.

**Input:** `{ query: string, nodeTypes?: string[] }`  
**Output:** `{ summary: string, nodeIds: string[], relationships: { from, to, relation }[] }`  
**Files:** `src/lib/agents/cartographer/`

---

## 2. Auditor

**Purpose:** Citation validation. Verifies that a claim is supported by the cited graph nodes. Rejects outputs with empty `nodeIds`.

**Input:** `{ nodeId: string, claimText: string, nodeIds: string[] }`  
**Output:** `{ valid: boolean, severity: "info"|"warn"|"critical", message: string, nodeIds: string[] }`  
**Files:** `src/lib/agents/auditor/`

---

## 3. Recruiter

**Purpose:** Bias-aware job description generation and resume screening. Two modes: `generate-jd` and `screen-resume`.

**Input:** `{ requisitionId, jobTitle, requirements, candidateResume?, mode }`  
**Output:** `{ jobDescription?, screeningResults?, nodeIds }`  
**Files:** `src/lib/agents/hr/recruiter/`

---

## 4. Interviewer

**Purpose:** Analyzes interview transcripts and scores candidates across skills, culture fit, and communication. Returns a recommendation.

**Input:** `{ candidateId, requisitionId, transcript }`  
**Output:** `{ dimensions: { skills, culture, communication }, overallScore, risks, recommendation, nodeIds }`  
**Files:** `src/lib/agents/hr/interviewer/`

---

## 5. Onboarder

**Purpose:** Generates personalized 30/60/90-day onboarding milestone plans for new employees.

**Input:** `{ employeeId, role, department, startDate }`  
**Output:** `{ milestones: [{ day, task, owner, resourceNodeIds }], nodeIds }`  
**Files:** `src/lib/agents/hr/onboarder/`

---

## 6. Coach

**Purpose:** Identifies skill gaps relative to a career goal and recommends learning paths with course node references.

**Input:** `{ employeeId, currentSkills, careerGoal, performanceNotes? }`  
**Output:** `{ skillGaps, recommendedPaths: [{ title, description, durationWeeks }], courseNodeIds, nodeIds }`  
**Files:** `src/lib/agents/hr/coach/`

---

## 7. Pulse

**Purpose:** Analyzes employee survey responses and optional chat snippets to assess sentiment, attrition risk, and burnout signals.

**Input:** `{ employeeId?, teamId?, surveyData, chatSnippets? }`  
**Output:** `{ sentimentScore, attritionRisk: "low"|"medium"|"high", burnoutSignals, nodeIds }`  
**Files:** `src/lib/agents/hr/pulse/`

---

## 8. Compliance Auditor

**Purpose:** Runs regulatory compliance audits (screening bias, pay equity, promotion fairness, policy compliance). Emits CRITICAL drift events when violations are found.

**Input:** `{ auditTargetId, auditType, dataSnapshot }`  
**Output:** `{ findings: [{ id, severity, regulation, description, nodeIds }], requiresHumanReview, summary, nodeIds }`  
**Files:** `src/lib/agents/hr/compliance-auditor/`

**Important:** For `auditType === "screening-bias"`, always returns at least one `severity: "critical"` finding with regulation `"EEOC §703"` and calls `emitDriftEvent`.

---

## Agent API

All agents are accessible via `POST /api/agents/run`:
```json
{ "agent": "<agent-name>", "input": { ... } }
```

Client-side usage via `src/lib/agents/hr/client.ts` → `hrClient.*`.  
Server-side usage: import directly from `@/lib/agents/<name>/runner`.
