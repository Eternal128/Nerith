import { describe, it, expect } from "vitest";
import { RecruiterInputSchema } from "../recruiter/types";
import { InterviewerInputSchema } from "../interviewer/types";
import { OnboarderInputSchema } from "../onboarder/types";
import { CoachInputSchema } from "../coach/types";
import { PulseInputSchema } from "../pulse/types";
import { ComplianceAuditorInputSchema } from "../compliance-auditor/types";

describe("HR Agent Schema Validation", () => {
  describe("RecruiterInputSchema", () => {
    it("rejects missing required fields", () => {
      expect(() => RecruiterInputSchema.parse({})).toThrow();
    });

    it("rejects invalid mode enum", () => {
      expect(() => RecruiterInputSchema.parse({
        requisitionId: "r1",
        jobTitle: "Engineer",
        requirements: [],
        mode: "invalid-mode",
      })).toThrow();
    });

    it("accepts valid input", () => {
      expect(() => RecruiterInputSchema.parse({
        requisitionId: "r1",
        jobTitle: "Engineer",
        requirements: ["TypeScript"],
        mode: "generate-jd",
      })).not.toThrow();
    });
  });

  describe("InterviewerInputSchema", () => {
    it("rejects missing candidateId", () => {
      expect(() => InterviewerInputSchema.parse({
        requisitionId: "r1",
        transcript: "Q: ... A: ...",
      })).toThrow();
    });

    it("accepts valid input", () => {
      expect(() => InterviewerInputSchema.parse({
        candidateId: "c1",
        requisitionId: "r1",
        transcript: "Q: Tell me about yourself. A: I am an engineer.",
      })).not.toThrow();
    });
  });

  describe("OnboarderInputSchema", () => {
    it("rejects missing startDate", () => {
      expect(() => OnboarderInputSchema.parse({
        employeeId: "e1",
        role: "Engineer",
        department: "Engineering",
      })).toThrow();
    });

    it("accepts valid input", () => {
      expect(() => OnboarderInputSchema.parse({
        employeeId: "e1",
        role: "Engineer",
        department: "Engineering",
        startDate: "2024-04-01",
      })).not.toThrow();
    });
  });

  describe("CoachInputSchema", () => {
    it("rejects missing careerGoal", () => {
      expect(() => CoachInputSchema.parse({
        employeeId: "e1",
        currentSkills: ["TypeScript"],
      })).toThrow();
    });

    it("accepts valid input", () => {
      expect(() => CoachInputSchema.parse({
        employeeId: "e1",
        currentSkills: ["TypeScript"],
        careerGoal: "Staff Engineer",
      })).not.toThrow();
    });
  });

  describe("PulseInputSchema", () => {
    it("rejects missing surveyData", () => {
      expect(() => PulseInputSchema.parse({
        employeeId: "e1",
      })).toThrow();
    });

    it("accepts valid input with optional fields omitted", () => {
      expect(() => PulseInputSchema.parse({
        surveyData: [{ question: "Q?", response: "A." }],
      })).not.toThrow();
    });
  });

  describe("ComplianceAuditorInputSchema", () => {
    it("rejects wrong auditType enum", () => {
      expect(() => ComplianceAuditorInputSchema.parse({
        auditTargetId: "t1",
        auditType: "unknown-type",
        dataSnapshot: {},
      })).toThrow();
    });

    it("rejects missing dataSnapshot", () => {
      expect(() => ComplianceAuditorInputSchema.parse({
        auditTargetId: "t1",
        auditType: "screening-bias",
      })).toThrow();
    });

    it("accepts valid input", () => {
      expect(() => ComplianceAuditorInputSchema.parse({
        auditTargetId: "t1",
        auditType: "screening-bias",
        dataSnapshot: { passRate: 0.5 },
      })).not.toThrow();
    });
  });
});
