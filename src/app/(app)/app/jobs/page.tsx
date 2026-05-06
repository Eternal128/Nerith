"use client";
import { useState, useEffect, useCallback } from "react";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import { useRouter } from "next/navigation";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  logo: string;
  tags: string[];
  description: string;
  url: string;
}

// Key used to pass job data to the apply page via sessionStorage to avoid
// URL length limits (job descriptions can be thousands of characters).
const JOB_PREFILL_KEY = "coverly:job-prefill";

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await fetch(`/api/jobs/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) throw new Error(`Search failed (${res.status})`);
      const data = await res.json();
      setJobs(data.jobs ?? []);
    } catch (err) {
      setFetchError(err instanceof Error ? err.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 300);
    return () => clearTimeout(t);
  }, [query, search]);

  useEffect(() => {
    search("");
  }, [search]);

  const handleApply = (job: Job) => {
    // Store the full job data in sessionStorage to avoid URL length limits
    try {
      sessionStorage.setItem(
        JOB_PREFILL_KEY,
        JSON.stringify({ company: job.company, role: job.title, description: job.description })
      );
    } catch {
      // sessionStorage unavailable — fall back to URL params with truncated description
    }
    router.push(
      `/app/apply/new?company=${encodeURIComponent(job.company)}&role=${encodeURIComponent(job.title)}`
    );
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-light mb-2">Browse jobs</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Find a role, generate a letter.
        </p>
        <Input
          placeholder="Search jobs, companies, technologies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-xl"
        />
      </div>

      {fetchError && (
        <p className="text-sm text-red-500 mb-4" role="alert">
          {fetchError}
        </p>
      )}

      <div className="space-y-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="border border-border rounded-xl p-5 hover:border-foreground/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-medium text-sm">{job.title}</p>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {job.company} · {job.location}
                    {job.salary && job.salary !== "Not disclosed"
                      ? ` · ${job.salary}`
                      : ""}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="default" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => handleApply(job)}
                    className="text-xs bg-foreground text-background px-3 py-1.5 rounded-md hover:opacity-80 transition-opacity font-medium whitespace-nowrap"
                  >
                    Write letter
                  </button>
                  <p className="text-xs text-muted-foreground font-mono">
                    {new Date(job.posted).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
