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
  byokOpenAI: z.string().max(200).optional(),
  byokAnthropic: z.string().max(200).optional(),
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
    data: {
      ...(parsed.data.voicePreset !== undefined && {
        voicePreset: parsed.data.voicePreset,
      }),
      ...(parsed.data.voiceNotes !== undefined && {
        voiceNotes: parsed.data.voiceNotes,
      }),
      ...(parsed.data.byokOpenAI !== undefined && {
        byokOpenAI: parsed.data.byokOpenAI || null,
      }),
      ...(parsed.data.byokAnthropic !== undefined && {
        byokAnthropic: parsed.data.byokAnthropic || null,
      }),
    },
    select: { voicePreset: true, voiceNotes: true },
  });

  return NextResponse.json({ success: true, ...updated });
}
