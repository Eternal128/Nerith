import { isDemoMode } from "@/lib/env";

export function DemoBanner() {
  if (!isDemoMode) return null;
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-foreground text-background text-xs px-3 py-1.5 rounded-full font-mono">
      Demo Mode
    </div>
  );
}
