import { callLLM } from "../../../llm/router";
import { InterviewerInput, InterviewerOutput } from "./types";
import { SYSTEM_PROMPT } from "./prompt";

export async function runInterviewer(input: InterviewerInput): Promise<InterviewerOutput> {
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: JSON.stringify(input) },
  ];

  const response = await callLLM(messages);

  if (response.mock) {
    return {
      dimensions: { skills: 80, culture: 80, communication: 80 },
      overallScore: 80,
      risks: [],
      recommendation: "advance",
      nodeIds: [input.candidateId, input.requisitionId],
    };
  }

  try {
    return JSON.parse(response.text) as InterviewerOutput;
  } catch {
    return {
      dimensions: { skills: 70, culture: 70, communication: 70 },
      overallScore: 70,
      risks: [response.text],
      recommendation: "hold",
      nodeIds: [input.candidateId, input.requisitionId],
    };
  }
}
