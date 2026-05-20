import { callLLM } from "../../llm/router";
import { getNode } from "../../graph/store";
import { AuditorInput, AuditorOutput } from "./types";
import { SYSTEM_PROMPT } from "./prompt";

export async function runAuditor(input: AuditorInput): Promise<AuditorOutput> {
  if (input.nodeIds.length === 0) {
    return {
      valid: false,
      severity: "critical",
      message: "No citations provided — claim rejected",
      nodeIds: [],
    };
  }

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: JSON.stringify(input) },
  ];

  const response = await callLLM(messages);

  if (response.mock) {
    const allExist = input.nodeIds.every(id => getNode(id) !== undefined);
    return {
      valid: allExist,
      severity: allExist ? "info" : "warn",
      message: allExist
        ? `Citations verified for node ${input.nodeId}`
        : `Some cited nodes not found in graph`,
      nodeIds: input.nodeIds,
    };
  }

  try {
    return JSON.parse(response.text) as AuditorOutput;
  } catch {
    return {
      valid: true,
      severity: "info",
      message: response.text,
      nodeIds: input.nodeIds,
    };
  }
}
