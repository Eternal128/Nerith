import { callLLM } from "../../../llm/router";
import { RecruiterInput, RecruiterOutput } from "./types";
import { SYSTEM_PROMPT } from "./prompt";

export async function runRecruiter(input: RecruiterInput): Promise<RecruiterOutput> {
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: JSON.stringify(input) },
  ];

  const response = await callLLM(messages);

  if (response.mock) {
    if (input.mode === "generate-jd") {
      return {
        jobDescription: `## ${input.jobTitle}\n\n**About the Role**\nWe are looking for a ${input.jobTitle} to join our growing team. You will work closely with cross-functional partners to deliver high-impact outcomes.\n\n**What You'll Do**\n${input.requirements.map(r => `- ${r}`).join("\n")}\n\n**What We're Looking For**\n- Strong communication and collaboration skills\n- Experience in a relevant field\n- A growth mindset and commitment to continuous learning\n\nWe encourage applications from candidates of all backgrounds. Salary range: $90,000–$140,000.`,
        nodeIds: [`apt-req-${input.requisitionId}`, "apt-adr-002", "apt-policy-001"],
      };
    }
    return {
      screeningResults: [
        {
          candidateId: `apt-cand-001`,
          score: 75,
          rationale: `Candidate meets ${input.requirements.length} of ${input.requirements.length} listed requirements. Strong communication skills evident throughout resume.`,
          flaggedBias: [],
          nodeIds: ["apt-cand-001", `apt-req-${input.requisitionId}`],
        },
      ],
      nodeIds: ["apt-cand-001", `apt-req-${input.requisitionId}`, "apt-adr-002"],
    };
  }

  try {
    return JSON.parse(response.text) as RecruiterOutput;
  } catch {
    return {
      jobDescription: response.text,
      nodeIds: [],
    };
  }
}
