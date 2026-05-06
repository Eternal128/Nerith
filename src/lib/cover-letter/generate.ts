import { callLLM } from "../llm/router";
import { buildSystemPrompt, buildUserPrompt } from "./prompt";
import { lintLetter } from "./linter";
import { type VoicePreset } from "./voice";

interface GenerateParams {
  resumeText: string;
  company: string;
  role: string;
  jobDescription: string;
  hiringManager?: string | null;
  voice: VoicePreset;
  voiceNotes?: string | null;
}

export async function generateCoverLetter(params: GenerateParams): Promise<string> {
  const systemPrompt = buildSystemPrompt(params.voice, params.voiceNotes);
  const userPrompt = buildUserPrompt(params);

  const response = await callLLM([
    { role: "system", content: systemPrompt },
    { role: "user", content: userPrompt },
  ]);

  const { text, mock } = response as { text: string; mock: boolean };
  const { clean, issues } = lintLetter(text);

  const bannedPhraseIssues = issues.filter((i) => i.type === "banned_phrase");
  if (bannedPhraseIssues.length > 0 && !mock) {
    const retryResponse = await callLLM([
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
      { role: "assistant", content: text },
      {
        role: "user",
        content: `Rewrite the letter. Remove these phrases: ${bannedPhraseIssues.map((i) => `"${i.text}"`).join(", ")}. Keep everything else the same.`,
      },
    ]);
    const { clean: retryClean } = lintLetter((retryResponse as { text: string }).text);
    return retryClean;
  }

  return clean;
}

export async function generateCoverLetterStream(
  params: GenerateParams
): Promise<ReadableStream<string>> {
  const systemPrompt = buildSystemPrompt(params.voice, params.voiceNotes);
  const userPrompt = buildUserPrompt(params);

  return callLLM(
    [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    true
  ) as Promise<ReadableStream<string>>;
}
