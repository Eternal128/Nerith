import { z } from "zod";

export const OnboarderInputSchema = z.object({
  employeeId: z.string(),
  role: z.string(),
  department: z.string(),
  startDate: z.string(),
});
export type OnboarderInput = z.infer<typeof OnboarderInputSchema>;

export const MilestoneSchema = z.object({
  day: z.number(),
  task: z.string(),
  owner: z.string(),
  resourceNodeIds: z.array(z.string()),
});

export const OnboarderOutputSchema = z.object({
  milestones: z.array(MilestoneSchema),
  nodeIds: z.array(z.string()),
});
export type OnboarderOutput = z.infer<typeof OnboarderOutputSchema>;
