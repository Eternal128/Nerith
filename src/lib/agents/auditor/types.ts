import { z } from "zod";

export const AuditorInputSchema = z.object({
  nodeId: z.string(),
  claimText: z.string(),
  nodeIds: z.array(z.string()),
});
export type AuditorInput = z.infer<typeof AuditorInputSchema>;

export const AuditorOutputSchema = z.object({
  valid: z.boolean(),
  severity: z.enum(["info", "warn", "critical"]),
  message: z.string(),
  nodeIds: z.array(z.string()),
});
export type AuditorOutput = z.infer<typeof AuditorOutputSchema>;
