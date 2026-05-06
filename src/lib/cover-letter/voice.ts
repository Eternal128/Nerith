export type VoicePreset = "direct" | "warm" | "confident" | "understated";

export const VOICE_PRESETS: Record<VoicePreset, string> = {
  direct: `Write like you're sending a Slack message to someone you respect. 
Sentences are short. No fluff. Don't soften statements - say what you mean. 
Skip the pleasantries. Get to the point in the first line.`,

  warm: `Write like you're reaching out to someone you genuinely want to work with. 
Be human. Show some personality. You can smile through the prose. 
Still professional, still clear - but not cold.`,

  confident: `Write like you know your value and you're not auditioning. 
State facts. Lead with what you've done, not what you hope to do. 
No hedging. No "I believe I would" - just "I do" and "I have."`,

  understated: `Write with quiet confidence. Don't oversell. Let the facts speak. 
Avoid superlatives. One well-chosen specific detail beats three vague claims. 
The tone should feel like someone who doesn't need to convince you - just inform you.`,
};
