import { describe, it, expect, vi } from "vitest";
import { RecruiterOutputSchema } from "../recruiter/types";
import { InterviewerOutputSchema } from "../interviewer/types";
import { OnboarderOutputSchema } from "../onboarder/types";
import { CoachOutputSchema } from "../coach/types";
import { PulseOutputSchema } from "../pulse/types";
import { ComplianceAuditorOutputSchema } from "../compliance-auditor/types";

// Mock the LLM router to always return mock: true
vi.mock("@/lib/llm/router", () => ({
  callLLM: async () => ({ text: "", mock: true }),
}));

// Mock graph mutations to avoid side effects
vi.mock("@/lib/graph/mutations", () => ({
  emitDriftEvent: () => ({
    id: "drift-test-001",
    type: "event",
    label: "DRIFT: test",
    data: { severity: "critical", agentId: "compliance-auditor", refNodeId: "test" },
    createdAt: new Date().toISOString(),
  }),
  upsertNode: () => undefined,
  upsertEdge: () => undefined,
  batchUpsertNodes: () => undefined,
  batchUpsertEdges: () => undefined,
}));

describe("HR Agent Runners — mock paths", () => {
  describe("recruiter — generate-jd", () => {
    it("returns jobDescription and nodeIds", async () => {
      const { runRecruiter } = await import("../recruiter/runner");
      const output = await runRecruiter({
        requisitionId: "apt-req-001",
        jobTitle: "Software Engineer",
        requirements: ["TypeScript", "React"],
        mode: "generate-jd",
      });
      expect(output.jobDescription).toBeTruthy();
      expect(Array.isArray(output.nodeIds)).toBe(true);
      expect(output.nodeIds.length).toBeGreaterThan(0);
      expect(() => RecruiterOutputSchema.parse(output)).not.toThrow();
    });
  });

  describe("recruiter — screen-resume", () => {
    it("returns screeningResults with score and nodeIds", async () => {
      const { runRecruiter } = await import("../recruiter/runner");
      const output = await runRecruiter({
        requisitionId: "apt-req-001",
        jobTitle: "Software Engineer",
        requirements: ["TypeScript"],
        candidateResume: "Jane Doe, 5 years TypeScript.",
        mode: "screen-resume",
      });
      expect(Array.isArray(output.screeningResults)).toBe(true);
      expect(output.screeningResults![0]!.score).toBe(75);
      expect(output.screeningResults![0]!.flaggedBias).toEqual([]);
      expect(Array.isArray(output.nodeIds)).toBe(true);
      expect(() => RecruiterOutputSchema.parse(output)).not.toThrow();
    });
  });

  describe("interviewer", () => {
    it("returns dimensions, overallScore, recommendation and nodeIds", async () => {
      const { runInterviewer } = await import("../interviewer/runner");
      const output = await runInterviewer({
        candidateId: "apt-cand-001",
        requisitionId: "apt-req-001",
        transcript: "Q: Tell me about yourself. A: I am a software engineer.",
      });
      expect(output.overallScore).toBe(80);
      expect(output.dimensions.skills).toBe(80);
      expect(output.recommendation).toBe("advance");
      expect(Array.isArray(output.nodeIds)).toBe(true);
      expect(() => InterviewerOutputSchema.parse(output)).not.toThrow();
    });
  });

  describe("onboarder", () => {
    it("returns 6 milestones and nodeIds", async () => {
      const { runOnboarder } = await import("../onboarder/runner");
      const output = await runOnboarder({
        employeeId: "apt-emp-001",
        role: "Software Engineer",
        department: "Engineering",
        startDate: "2024-04-01",
      });
      expect(output.milestones).toHaveLength(6);
      expect(output.milestones[0]!.day).toBe(1);
      expect(output.milestones[5]!.day).toBe(90);
      expect(Array.isArray(output.nodeIds)).toBe(true);
      expect(() => OnboarderOutputSchema.parse(output)).not.toThrow();
    });
  });

  describe("coach", () => {
    it("returns skillGaps, recommendedPaths, courseNodeIds and nodeIds", async () => {
      const { runCoach } = await import("../coach/runner");
      const output = await runCoach({
        employeeId: "apt-emp-001",
        currentSkills: ["TypeScript", "React"],
        careerGoal: "Staff Engineer",
      });
      expect(output.skillGaps).toHaveLength(2);
      expect(output.recommendedPaths).toHaveLength(2);
      expect(Array.isArray(output.courseNodeIds)).toBe(true);
      expect(Array.isArray(output.nodeIds)).toBe(true);
      expect(() => CoachOutputSchema.parse(output)).not.toThrow();
    });
  });

  describe("pulse", () => {
    it("returns sentimentScore, attritionRisk and nodeIds", async () => {
      const { runPulse } = await import("../pulse/runner");
      const output = await runPulse({
        employeeId: "apt-emp-001",
        surveyData: [{ question: "Satisfied?", response: "Yes." }],
      });
      expect(output.sentimentScore).toBe(72);
      expect(output.attritionRisk).toBe("low");
      expect(Array.isArray(output.burnoutSignals)).toBe(true);
      expect(Array.isArray(output.nodeIds)).toBe(true);
      expect(() => PulseOutputSchema.parse(output)).not.toThrow();
    });
  });

  describe("compliance-auditor — screening-bias", () => {
    it("returns at least one critical finding with EEOC §703", async () => {
      const { runComplianceAuditor } = await import("../compliance-auditor/runner");
      const output = await runComplianceAuditor({
        auditTargetId: "apt-req-001",
        auditType: "screening-bias",
        dataSnapshot: { passRateMale: 0.72, passRateFemale: 0.44 },
      });
      const criticalFindings = output.findings.filter(f => f.severity === "critical");
      expect(criticalFindings.length).toBeGreaterThan(0);
      expect(criticalFindings[0]!.regulation).toBe("EEOC §703");
      expect(output.requiresHumanReview).toBe(true);
      expect(Array.isArray(output.nodeIds)).toBe(true);
      expect(() => ComplianceAuditorOutputSchema.parse(output)).not.toThrow();
    });
  });

  describe("compliance-auditor — pay-equity", () => {
    it("returns findings and nodeIds", async () => {
      const { runComplianceAuditor } = await import("../compliance-auditor/runner");
      const output = await runComplianceAuditor({
        auditTargetId: "apt-emp-001",
        auditType: "pay-equity",
        dataSnapshot: { genderPayGap: 0.062 },
      });
      expect(Array.isArray(output.findings)).toBe(true);
      expect(Array.isArray(output.nodeIds)).toBe(true);
      expect(() => ComplianceAuditorOutputSchema.parse(output)).not.toThrow();
    });
  });
});
