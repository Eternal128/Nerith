import { z } from "zod";

export const CartographerInputSchema = z.object({
  query: z.string(),
  nodeTypes: z.array(z.string()).optional(),
});
export type CartographerInput = z.infer<typeof CartographerInputSchema>;

export const CartographerOutputSchema = z.object({
  summary: z.string(),
  nodeIds: z.array(z.string()),
  relationships: z.array(z.object({ from: z.string(), to: z.string(), relation: z.string() })),
});
export type CartographerOutput = z.infer<typeof CartographerOutputSchema>;
