import { callLLM } from "../../../llm/router";
import { PulseInput, PulseOutput } from "./types";
import { SYSTEM_PROMPT } from "./prompt";

export async function runPulse(input: PulseInput): Promise<PulseOutput> {
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: JSON.stringify(input) },
  ];

  const response = await callLLM(messages);

  if (response.mock) {
    const empNodeId = input.employeeId ?? input.teamId ?? "apt-emp-001";
    return {
      sentimentScore: 72,
      attritionRisk: "low",
      burnoutSignals: [],
      nodeIds: [empNodeId],
    };
  }

  try {
    return JSON.parse(response.text) as PulseOutput;
  } catch {
    return {
      sentimentScore: 50,
      attritionRisk: "medium",
      burnoutSignals: [response.text],
      nodeIds: [input.employeeId ?? input.teamId ?? "unknown"],
    };
  }
}
