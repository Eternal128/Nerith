import { NextRequest, NextResponse } from "next/server";
import jobs from "@/lib/fixtures/jobs.json";

interface RemotiveJob {
  id: number;
  title: string;
  company_name: string;
  candidate_required_location: string;
  salary: string;
  job_type: string;
  publication_date: string;
  company_logo_url: string;
  tags: string[];
  description: string;
  url: string;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() ?? "";
  const location = searchParams.get("location")?.toLowerCase() ?? "";

  let results = jobs as typeof jobs;

  if (query) {
    results = results.filter(
      (j) =>
        j.title.toLowerCase().includes(query) ||
        j.company.toLowerCase().includes(query) ||
        j.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  if (location) {
    results = results.filter((j) =>
      j.location.toLowerCase().includes(location)
    );
  }

  // Try Remotive API (no key required) with a 5-second timeout
  try {
    if (query) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        const remotiveRes = await fetch(
          `https://remotive.com/api/remote-jobs?search=${encodeURIComponent(query)}&limit=10`,
          { next: { revalidate: 300 }, signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (remotiveRes.ok) {
          const data = (await remotiveRes.json()) as { jobs?: RemotiveJob[] };
          const remotiveJobs = (data.jobs ?? []).slice(0, 10).map((j) => ({
            id: `remotive-${j.id}`,
            title: j.title,
            company: j.company_name,
            location: j.candidate_required_location || "Remote",
            salary: j.salary || "Not disclosed",
            type: j.job_type || "Full-time",
            posted: j.publication_date,
            logo: j.company_logo_url,
            tags: j.tags?.slice(0, 5) ?? [],
            description:
              j.description?.replace(/<[^>]*>/g, "").slice(0, 200) + "...",
            url: j.url,
          }));
          results = [...remotiveJobs, ...results];
        }
      } finally {
        clearTimeout(timeoutId);
      }
    }
  } catch (err) {
    // Remotive is optional — fall back to fixtures silently for the user
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "Remotive API unavailable, using fixture jobs:",
        err instanceof Error ? err.message : String(err)
      );
    }
  }

  return NextResponse.json({ jobs: results.slice(0, 30) });
}
