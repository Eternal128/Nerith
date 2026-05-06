"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Skeleton } from "@/components/ui/Skeleton";

const schema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  jobDescription: z.string().min(10, "Please paste the job description"),
  hiringManager: z.string().optional(),
  voice: z.enum(["direct", "warm", "confident", "understated"]),
});

type FormData = z.infer<typeof schema>;

const VOICE_LABELS: Record<string, string> = {
  direct: "Direct — short, no fluff",
  warm: "Warm — personable, human",
  confident: "Confident — assertive, facts-first",
  understated: "Understated — quiet confidence",
};

export default function NewApplicationPage() {
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { voice: "direct" },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError("");
    setLetter("");

    try {
      const res = await fetch("/api/letter/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Generation failed");
      setLetter(json.letter);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(letter);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-light mb-2">New application</h1>
        <p className="text-muted-foreground text-sm">
          Fill in the details and we&apos;ll write the letter.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Company"
            placeholder="Vercel"
            error={errors.company?.message}
            {...register("company")}
          />
          <Input
            label="Role"
            placeholder="Senior Software Engineer"
            error={errors.role?.message}
            {...register("role")}
          />
          <Input
            label="Hiring manager (optional)"
            placeholder="Sarah Chen"
            {...register("hiringManager")}
          />
          <Textarea
            label="Job description"
            placeholder="Paste the full job description here..."
            rows={8}
            error={errors.jobDescription?.message}
            {...register("jobDescription")}
          />

          <div className="space-y-1.5">
            <label className="text-sm font-medium">Writing voice</label>
            <div className="grid grid-cols-2 gap-2">
              {(["direct", "warm", "confident", "understated"] as const).map(
                (v) => (
                  <label
                    key={v}
                    className={`flex items-center gap-2 p-3 rounded-md border cursor-pointer text-xs transition-colors ${
                      watch("voice") === v
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/40"
                    }`}
                  >
                    <input
                      type="radio"
                      value={v}
                      {...register("voice")}
                      className="sr-only"
                    />
                    {VOICE_LABELS[v]}
                  </label>
                )
              )}
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Writing..." : "Generate cover letter"}
          </Button>

          {error && <p className="text-sm text-red-500">{error}</p>}
        </form>

        {/* Preview */}
        <div className="border border-border rounded-xl p-8 min-h-[500px] relative">
          {loading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="h-4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
            </div>
          ) : letter ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Cover letter
                </p>
                <Button variant="secondary" size="sm" onClick={copyToClipboard}>
                  Copy
                </Button>
              </div>
              <div className="font-serif text-sm leading-relaxed whitespace-pre-wrap">
                {letter}
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-sm text-center max-w-xs">
                Fill in the form and click generate to see your cover letter
                here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
