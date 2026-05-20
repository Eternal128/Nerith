import { z } from "zod";

export const ComplianceAuditorInputSchema = z.object({
  auditTargetId: z.string(),
  auditType: z.enum(["screening-bias", "pay-equity", "promotion-fairness", "policy-compliance"]),
  dataSnapshot: z.record(z.unknown()),
});
export type ComplianceAuditorInput = z.infer<typeof ComplianceAuditorInputSchema>;

export const FindingSchema = z.object({
  id: z.string(),
  severity: z.enum(["info", "warn", "critical"]),
  regulation: z.string(),
  description: z.string(),
  nodeIds: z.array(z.string()),
});

export const ComplianceAuditorOutputSchema = z.object({
  findings: z.array(FindingSchema),
  requiresHumanReview: z.boolean(),
  summary: z.string(),
  nodeIds: z.array(z.string()),
});
export type ComplianceAuditorOutput = z.infer<typeof ComplianceAuditorOutputSchema>;
