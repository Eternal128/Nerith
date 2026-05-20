import { callLLM } from "../../../llm/router";
import { emitDriftEvent } from "../../../graph/mutations";
import { ComplianceAuditorInput, ComplianceAuditorOutput } from "./types";
import { SYSTEM_PROMPT } from "./prompt";

export async function runComplianceAuditor(input: ComplianceAuditorInput): Promise<ComplianceAuditorOutput> {
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: JSON.stringify(input) },
  ];

  const response = await callLLM(messages);

  if (response.mock) {
    if (input.auditType === "screening-bias") {
      const driftEvent = emitDriftEvent({
        nodeId: input.auditTargetId,
        severity: "critical",
        message: `Screening bias detected in ${input.auditTargetId} — EEOC §703 violation risk`,
        agentId: "compliance-auditor",
      });

      const output: ComplianceAuditorOutput = {
        findings: [
          {
            id: "finding-001",
            severity: "critical",
            regulation: "EEOC §703",
            description: "Screening model shows statistically significant adverse impact against protected class (gender). Pass rate for female candidates is 28% below male candidate pass rate, exceeding the 4/5ths rule threshold.",
            nodeIds: [input.auditTargetId, "apt-adr-002", "apt-policy-001", driftEvent.id],
          },
          {
            id: "finding-002",
            severity: "warn",
            regulation: "OFCCP 41 CFR Part 60",
            description: "Affirmative action outreach records are incomplete for Q1 2024.",
            nodeIds: [input.auditTargetId, "apt-policy-001"],
          },
        ],
        requiresHumanReview: true,
        summary: "CRITICAL: Screening model disadvantages female candidates. Immediate review required before next hiring cycle.",
        nodeIds: [input.auditTargetId, "apt-adr-002", "apt-slack-001", "apt-drift-001", driftEvent.id],
      };

      return output;
    }

    if (input.auditType === "pay-equity") {
      return {
        findings: [
          {
            id: "finding-pe-001",
            severity: "warn",
            regulation: "Equal Pay Act 1963",
            description: "Mean compensation gap of 6.2% between male and female employees in Engineering at the same level.",
            nodeIds: [input.auditTargetId, "apt-policy-004"],
          },
        ],
        requiresHumanReview: true,
        summary: "Pay equity gap detected in Engineering — review compensation bands.",
        nodeIds: [input.auditTargetId, "apt-policy-004"],
      };
    }

    return {
      findings: [
        {
          id: "finding-gen-001",
          severity: "info",
          regulation: "Internal Policy",
          description: `${input.auditType} audit completed. No critical findings.`,
          nodeIds: [input.auditTargetId],
        },
      ],
      requiresHumanReview: false,
      summary: `${input.auditType} audit passed with no critical issues.`,
      nodeIds: [input.auditTargetId],
    };
  }

  try {
    const parsed = JSON.parse(response.text) as ComplianceAuditorOutput;
    const hasCritical = parsed.findings.some(f => f.severity === "critical");
    if (hasCritical) {
      emitDriftEvent({
        nodeId: input.auditTargetId,
        severity: "critical",
        message: `Critical compliance finding in ${input.auditType} audit for ${input.auditTargetId}`,
        agentId: "compliance-auditor",
      });
    }
    return parsed;
  } catch {
    return {
      findings: [],
      requiresHumanReview: true,
      summary: response.text,
      nodeIds: [input.auditTargetId],
    };
  }
}
