"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Upload } from "lucide-react";

interface ParsedResume {
  name: string;
  email: string;
  phone: string;
  skills: string[];
}

export default function ResumePage() {
  const [parsed, setParsed] = useState<ParsedResume | null>(null);
  const [rawText, setRawText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/resume/parse", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setParsed(data.parsed);
      setRawText(data.rawText);
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-light mb-2">My resume</h1>
        <p className="text-muted-foreground text-sm">
          This is what we use to write your cover letters.
        </p>
      </div>

      {/* Upload zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 mb-8 text-center transition-colors cursor-pointer ${
          dragOver
            ? "border-foreground bg-foreground/5"
            : "border-border hover:border-foreground/40"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <Upload size={24} className="mx-auto mb-3 text-muted-foreground" />
        <p className="text-sm font-medium mb-1">
          {uploading ? "Parsing..." : "Drop your resume here"}
        </p>
        <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT</p>
      </div>

      {parsed && (
        <Card>
          <CardHeader>
            <h2 className="font-serif text-lg">Parsed resume</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-mono uppercase text-muted-foreground mb-1">
                  Name
                </p>
                <p className="text-sm">{parsed.name || "—"}</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase text-muted-foreground mb-1">
                  Email
                </p>
                <p className="text-sm">{parsed.email || "—"}</p>
              </div>
              {parsed.skills.length > 0 && (
                <div>
                  <p className="text-xs font-mono uppercase text-muted-foreground mb-2">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {parsed.skills.map((s) => (
                      <Badge key={s} variant="outline">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {rawText && (
                <div>
                  <p className="text-xs font-mono uppercase text-muted-foreground mb-1">
                    Preview
                  </p>
                  <p className="text-xs font-mono text-muted-foreground bg-foreground/5 p-3 rounded-md">
                    {rawText}...
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
