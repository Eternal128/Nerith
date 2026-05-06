import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { isDemoMode } from "@/lib/env";

const CreateSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  jobDescText: z.string(),
  letter: z.string(),
  jobUrl: z.string().optional(),
  status: z.string().default("drafting"),
});

const DEMO_APPLICATIONS = [
  {
    id: "demo-1",
    company: "Vercel",
    role: "Senior Software Engineer",
    status: "interview",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    letter: "Sample cover letter...",
    jobDescText: "Build the future of the web",
  },
  {
    id: "demo-2",
    company: "Linear",
    role: "Product Designer",
    status: "sent",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    letter: "Sample cover letter...",
    jobDescText: "Design tools that developers love",
  },
  {
    id: "demo-3",
    company: "Stripe",
    role: "Staff Engineer",
    status: "drafting",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    letter: "Sample cover letter...",
    jobDescText: "Infrastructure at scale",
  },
];

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
