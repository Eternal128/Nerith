import { callLLM } from "../../../llm/router";
import { OnboarderInput, OnboarderOutput } from "./types";
import { SYSTEM_PROMPT } from "./prompt";

export async function runOnboarder(input: OnboarderInput): Promise<OnboarderOutput> {
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: JSON.stringify(input) },
  ];

  const response = await callLLM(messages);

  if (response.mock) {
    return {
      milestones: [
        { day: 1, task: "Welcome session & system access setup", owner: "People Team", resourceNodeIds: ["apt-policy-001", "apt-policy-002"] },
        { day: 7, task: `Meet ${input.department} team leads and review team charter`, owner: "Hiring Manager", resourceNodeIds: ["apt-adr-004"] },
        { day: 14, task: "Complete compliance and DEI training modules", owner: "People Team", resourceNodeIds: ["apt-course-007", "apt-policy-002"] },
        { day: 30, task: "Deliver first project milestone or OKR check-in", owner: "Hiring Manager", resourceNodeIds: ["apt-adr-004"] },
        { day: 60, task: "360-degree feedback collection from peers", owner: "People Team", resourceNodeIds: ["apt-policy-004"] },
        { day: 90, task: "Performance review and growth path discussion", owner: "Hiring Manager", resourceNodeIds: ["apt-course-001", "apt-adr-005"] },
      ],
      nodeIds: [input.employeeId, "apt-adr-004", "apt-policy-001", "apt-policy-002"],
    };
  }

  try {
    return JSON.parse(response.text) as OnboarderOutput;
  } catch {
    return {
      milestones: [],
      nodeIds: [input.employeeId],
    };
  }
}
