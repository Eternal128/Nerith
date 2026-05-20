import { callLLM } from "../../llm/router";
import { getAllNodes } from "../../graph/store";
import { CartographerInput, CartographerOutput } from "./types";
import { SYSTEM_PROMPT } from "./prompt";

export async function runCartographer(input: CartographerInput): Promise<CartographerOutput> {
  const nodes = getAllNodes().slice(0, 20);
  const nodeIds = nodes.map(n => n.id);

  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: JSON.stringify(input) },
  ];

  const response = await callLLM(messages);

  if (response.mock) {
    return {
      summary: `Graph mapping for: ${input.query}. Found ${nodeIds.length} relevant nodes.`,
      nodeIds: nodeIds.slice(0, 5),
      relationships: [],
    };
  }

  try {
    return JSON.parse(response.text) as CartographerOutput;
  } catch {
    return {
      summary: response.text,
      nodeIds: nodeIds.slice(0, 5),
      relationships: [],
    };
  }
}
