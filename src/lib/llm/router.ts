import { isDemoMode } from "../env";

export type LLMMessage = { role: "system" | "user" | "assistant"; content: string };

export interface LLMResponse {
  text: string;
  mock: boolean;
}

export async function callLLM(messages: LLMMessage[], stream?: false): Promise<LLMResponse>;
export async function callLLM(messages: LLMMessage[], stream: true): Promise<ReadableStream<string>>;
export async function callLLM(
  messages: LLMMessage[],
  stream = false
): Promise<LLMResponse | ReadableStream<string>> {
  if (isDemoMode) {
    const { getMockResponse } = await import("./mock");
    if (stream) {
      return getMockStream(messages);
    }
    return { text: getMockResponse(messages), mock: true };
  }

  if (process.env.ANTHROPIC_API_KEY) {
    const { generateText, streamText } = await import("ai");
    const { anthropic } = await import("@ai-sdk/anthropic");
    const model = anthropic("claude-3-5-sonnet-20241022");

    if (stream) {
      const result = streamText({
        model,
        messages: messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      });
      return result.textStream;
    }

    const { text } = await generateText({
      model,
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });
    return { text, mock: false };
  }

  if (process.env.OPENAI_API_KEY) {
    const { generateText, streamText } = await import("ai");
    const { openai } = await import("@ai-sdk/openai");
    const model = openai("gpt-4o");

    if (stream) {
      const result = streamText({
        model,
        messages: messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      });
      return result.textStream;
    }

    const { text } = await generateText({
      model,
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });
    return { text, mock: false };
  }

  // Fallback to mock
  const { getMockResponse } = await import("./mock");
  if (stream) return getMockStream(messages);
  return { text: getMockResponse(messages), mock: true };
}

function getMockStream(messages: LLMMessage[]): ReadableStream<string> {
  // We must use dynamic import asynchronously - read text synchronously via a captured promise
  const textPromise = import("./mock").then((m) => m.getMockResponse(messages));

  return new ReadableStream({
    async start(controller) {
      const text = await textPromise;
      const words = text.split(" ");
      for (const word of words) {
        controller.enqueue(word + " ");
        await new Promise((r) => setTimeout(r, 30));
      }
      controller.close();
    },
  });
}
