import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/env";
import { DEMO_APPLICATIONS } from "@/lib/fixtures/demo";

const CreateSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  jobDescText: z.string(),
  letter: z.string(),
  jobUrl: z.string().optional(),
  status: z.string().default("drafting"),
});

export async function GET() {
  if (isDemoMode) {
    return NextResponse.json({ applications: DEMO_APPLICATIONS });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applications = await db.application.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ applications });
}

export async function POST(req: NextRequest) {
  if (isDemoMode) {
    const body = await req.json();
    return NextResponse.json({ id: "demo-" + Date.now(), ...body });
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = CreateSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const application = await db.application.create({
    data: {
      ...parsed.data,
      userId: session.user.id,
    },
  });

  return NextResponse.json(application);
}
