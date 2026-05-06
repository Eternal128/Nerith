"use client";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

const COLUMNS = [
  { id: "drafting", label: "Drafting" },
  { id: "sent", label: "Sent" },
  { id: "replied", label: "Replied" },
  { id: "interview", label: "Interview" },
  { id: "offer", label: "Offer" },
  { id: "rejected", label: "Rejected" },
];

interface Application {
  id: string;
  company: string;
  role: string;
  status: string;
  createdAt: string;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    fetch("/api/applications")
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load applications (${r.status})`);
        return r.json();
      })
      .then((d) => {
        setApplications(d.applications ?? []);
        setLoading(false);
      })
      .catch((err: unknown) => {
        setFetchError(err instanceof Error ? err.message : "Failed to load applications");
        setLoading(false);
      });
  }, []);

  const handleDragStart = (id: string) => setDragging(id);

  const handleDrop = (status: string) => {
    if (!dragging) return;
    setApplications((prev) =>
      prev.map((a) => (a.id === dragging ? { ...a, status } : a))
    );
    setDragging(null);
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-light mb-2">Applications</h1>
        <p className="text-muted-foreground text-sm">
          Track where every application stands.
        </p>
      </div>

      {fetchError && (
        <p className="text-sm text-red-500 mb-6" role="alert">
          {fetchError}
        </p>
      )}

      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMNS.map((col) => (
          <div
            key={col.id}
            className="min-w-[220px] w-[220px] shrink-0"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col.id)}
          >
            <div className="flex items-center gap-2 mb-3">
              <h2 className="text-sm font-medium">{col.label}</h2>
              <span className="text-xs text-muted-foreground font-mono">
                {applications.filter((a) => a.status === col.id).length}
              </span>
            </div>
            <div className="space-y-2 min-h-[100px]">
              {loading ? (
                col.id === "drafting" ? (
                  <>
                    <Skeleton className="h-20 rounded-lg" />
                    <Skeleton className="h-20 rounded-lg" />
                  </>
                ) : col.id === "sent" ? (
                  <Skeleton className="h-20 rounded-lg" />
                ) : null
              ) : (
                applications
                  .filter((a) => a.status === col.id)
                  .map((app) => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={() => handleDragStart(app.id)}
                      className="bg-card border border-border rounded-lg p-4 cursor-grab active:cursor-grabbing hover:border-foreground/30 transition-colors"
                    >
                      <p className="text-sm font-medium mb-0.5">
                        {app.company}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {app.role}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
