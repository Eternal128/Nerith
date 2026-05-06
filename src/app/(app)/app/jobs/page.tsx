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

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const search = useCallback(async (q: string) => {
    setLoading(true);
    const res = await fetch(`/api/jobs/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setJobs(data.jobs ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => search(query), 300);
    return () => clearTimeout(t);
  }, [query, search]);

  useEffect(() => {
    search("");
  }, [search]);

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
                    onClick={() =>
                      router.push(
                        `/app/apply/new?company=${encodeURIComponent(job.company)}&role=${encodeURIComponent(job.title)}&jd=${encodeURIComponent(job.description)}`
                      )
                    }
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
