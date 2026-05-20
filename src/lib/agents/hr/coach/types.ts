import { z } from "zod";

export const CoachInputSchema = z.object({
  employeeId: z.string(),
  currentSkills: z.array(z.string()),
  careerGoal: z.string(),
  performanceNotes: z.string().optional(),
});
export type CoachInput = z.infer<typeof CoachInputSchema>;

export const CoachOutputSchema = z.object({
  skillGaps: z.array(z.string()),
  recommendedPaths: z.array(z.object({
    title: z.string(),
    description: z.string(),
    durationWeeks: z.number(),
  })),
  courseNodeIds: z.array(z.string()),
  nodeIds: z.array(z.string()),
});
export type CoachOutput = z.infer<typeof CoachOutputSchema>;
