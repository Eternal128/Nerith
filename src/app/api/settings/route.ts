import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/env";

const UpdateSettingsSchema = z.object({
  voicePreset: z
    .enum(["direct", "warm", "confident", "understated"])
    .optional(),
  voiceNotes: z.string().max(2000).optional(),
  // Empty strings are stored as null — omitting the field leaves the DB value unchanged
  byokOpenAI: z.string().max(200).transform((v) => v || null).optional(),
  byokAnthropic: z.string().max(200).transform((v) => v || null).optional(),
});

export async function PATCH(req: NextRequest) {
  if (isDemoMode) {
    return NextResponse.json({ success: true, demo: true });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = UpdateSettingsSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await db.user.update({
    where: { id: session.user.id },
    // Only include fields that were explicitly provided in the request.
    // Zod's `.optional()` means absent keys are `undefined` and spread-filtered by JS.
    data: {
      ...parsed.data,
    },
    select: { voicePreset: true, voiceNotes: true },
  });

  return NextResponse.json({ success: true, ...updated });
}
