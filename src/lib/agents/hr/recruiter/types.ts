import { z } from "zod";

export const RecruiterInputSchema = z.object({
  requisitionId: z.string(),
  jobTitle: z.string(),
  requirements: z.array(z.string()),
  candidateResume: z.string().optional(),
  mode: z.enum(["generate-jd", "screen-resume"]),
});
export type RecruiterInput = z.infer<typeof RecruiterInputSchema>;

export const ScreeningResultSchema = z.object({
  candidateId: z.string(),
  score: z.number().min(0).max(100),
  rationale: z.string(),
  flaggedBias: z.array(z.string()),
  nodeIds: z.array(z.string()),
});

export const RecruiterOutputSchema = z.object({
  jobDescription: z.string().optional(),
  screeningResults: z.array(ScreeningResultSchema).optional(),
  nodeIds: z.array(z.string()),
});
export type RecruiterOutput = z.infer<typeof RecruiterOutputSchema>;
