import { z } from "zod";

export const InterviewerInputSchema = z.object({
  candidateId: z.string(),
  requisitionId: z.string(),
  transcript: z.string(),
});
export type InterviewerInput = z.infer<typeof InterviewerInputSchema>;

export const InterviewerOutputSchema = z.object({
  dimensions: z.object({
    skills: z.number().min(0).max(100),
    culture: z.number().min(0).max(100),
    communication: z.number().min(0).max(100),
  }),
  overallScore: z.number().min(0).max(100),
  risks: z.array(z.string()),
  recommendation: z.enum(["advance", "hold", "reject"]),
  nodeIds: z.array(z.string()),
});
export type InterviewerOutput = z.infer<typeof InterviewerOutputSchema>;
