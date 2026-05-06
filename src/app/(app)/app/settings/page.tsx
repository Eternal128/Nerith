"use client";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

type VoiceOption = "direct" | "warm" | "confident" | "understated";

const VOICE_OPTIONS: { value: VoiceOption; label: string; description: string }[] = [
  { value: "direct", label: "Direct", description: "Short, no-fluff sentences" },
  { value: "warm", label: "Warm", description: "Personable and human" },
  { value: "confident", label: "Confident", description: "Assertive, facts-first" },
  { value: "understated", label: "Understated", description: "Quiet confidence" },
];

export default function SettingsPage() {
  const [voice, setVoice] = useState<VoiceOption>("direct");
  const [voiceNotes, setVoiceNotes] = useState("");
  const [byokOpenAI, setByokOpenAI] = useState("");
  const [byokAnthropic, setByokAnthropic] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");

    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          voicePreset: voice,
          voiceNotes,
          byokOpenAI,
          byokAnthropic,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(
          typeof data.error === "string" ? data.error : "Failed to save settings"
        );
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-light mb-2">Settings</h1>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h2 className="font-serif text-lg">Writing voice</h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {VOICE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setVoice(opt.value)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    voice === opt.value
                      ? "border-foreground bg-foreground/5"
                      : "border-border hover:border-foreground/30"
                  }`}
                >
                  <p className="text-sm font-medium">{opt.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {opt.description}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-serif text-lg">Voice notes</h2>
            <p className="text-sm text-muted-foreground">
              Tell us how you naturally write. The more specific, the better.
            </p>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={`Examples:\n"I write like I talk. Short sentences. Plain words."\n"I'm direct but not cold."\n"I reference specific details, never generalities."`}
              rows={5}
              value={voiceNotes}
              onChange={(e) => setVoiceNotes(e.target.value)}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-serif text-lg">API keys (BYOK)</h2>
            <p className="text-sm text-muted-foreground">
              Use your own API keys for unlimited generation.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Anthropic API key"
              placeholder="sk-ant-..."
              type="password"
              value={byokAnthropic}
              onChange={(e) => setByokAnthropic(e.target.value)}
            />
            <Input
              label="OpenAI API key"
              placeholder="sk-..."
              type="password"
              value={byokOpenAI}
              onChange={(e) => setByokOpenAI(e.target.value)}
            />
          </CardContent>
        </Card>

        {saveError && (
          <p className="text-sm text-red-500" role="alert">
            {saveError}
          </p>
        )}

        <Button size="lg" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : saved ? "Saved!" : "Save settings"}
        </Button>
      </div>
    </div>
  );
}
