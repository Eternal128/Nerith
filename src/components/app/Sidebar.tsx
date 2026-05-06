"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  PlusCircle,
  Kanban,
  Briefcase,
  Settings,
  LayoutDashboard,
} from "lucide-react";

const nav = [
  { href: "/app", label: "Dashboard", icon: LayoutDashboard },
  { href: "/app/apply/new", label: "New Letter", icon: PlusCircle },
  { href: "/app/applications", label: "Applications", icon: Kanban },
  { href: "/app/jobs", label: "Browse Jobs", icon: Briefcase },
  { href: "/app/resume", label: "My Resume", icon: FileText },
  { href: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 min-h-screen border-r border-border flex flex-col py-8 px-4 gap-1 shrink-0">
      <Link href="/app" className="mb-8 px-3">
        <span className="font-serif italic text-xl text-foreground">Coverly</span>
      </Link>
      {nav.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
            pathname === href
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
          )}
        >
          <Icon size={16} />
          {label}
        </Link>
      ))}
    </aside>
  );
}
