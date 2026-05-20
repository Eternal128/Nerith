import { z } from "zod";

export const PulseInputSchema = z.object({
  employeeId: z.string().optional(),
  teamId: z.string().optional(),
  surveyData: z.array(z.object({
    question: z.string(),
    response: z.string(),
    sentiment: z.number().optional(),
  })),
  chatSnippets: z.array(z.string()).optional(),
});
export type PulseInput = z.infer<typeof PulseInputSchema>;

export const PulseOutputSchema = z.object({
  sentimentScore: z.number().min(0).max(100),
  attritionRisk: z.enum(["low", "medium", "high"]),
  burnoutSignals: z.array(z.string()),
  nodeIds: z.array(z.string()),
});
export type PulseOutput = z.infer<typeof PulseOutputSchema>;
