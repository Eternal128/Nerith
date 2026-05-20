import { callLLM } from "../../../llm/router";
import { CoachInput, CoachOutput } from "./types";
import { SYSTEM_PROMPT } from "./prompt";

export async function runCoach(input: CoachInput): Promise<CoachOutput> {
  const messages = [
    { role: "system" as const, content: SYSTEM_PROMPT },
    { role: "user" as const, content: JSON.stringify(input) },
  ];

  const response = await callLLM(messages);

  if (response.mock) {
    return {
      skillGaps: ["Executive presence", "Strategic thinking"],
      recommendedPaths: [
        {
          title: "Leadership Foundations",
          description: "Build core leadership skills through structured coaching and peer feedback.",
          durationWeeks: 8,
        },
        {
          title: "Strategic Product Thinking",
          description: "Develop systems thinking and long-horizon planning abilities.",
          durationWeeks: 6,
        },
      ],
      courseNodeIds: ["apt-course-001", "apt-course-010"],
      nodeIds: [input.employeeId, "apt-course-001", "apt-course-010"],
    };
  }

  try {
    return JSON.parse(response.text) as CoachOutput;
  } catch {
    return {
      skillGaps: [],
      recommendedPaths: [],
      courseNodeIds: [],
      nodeIds: [input.employeeId],
    };
  }
}
