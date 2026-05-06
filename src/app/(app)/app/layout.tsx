import { Sidebar } from "@/components/app/Sidebar";
import { DemoBanner } from "@/components/app/DemoBanner";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
      <DemoBanner />
    </div>
  );
}
