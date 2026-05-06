import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-light mb-2">Good morning.</h1>
        <p className="text-muted-foreground">Here&apos;s where your job search stands.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {[
          { label: "Letters written", value: "3", trend: "+2 this week" },
          { label: "Applications sent", value: "2", trend: "1 interview" },
          { label: "Response rate", value: "50%", trend: "Above average" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl font-mono font-light mb-1">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="font-serif text-lg">Quick actions</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link
                href="/app/apply/new"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-foreground/5 transition-colors group"
              >
                <span className="text-sm">Write a new cover letter</span>
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <Link
                href="/app/jobs"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-foreground/5 transition-colors group"
              >
                <span className="text-sm">Browse open roles</span>
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <Link
                href="/app/resume"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-foreground/5 transition-colors group"
              >
                <span className="text-sm">Update my resume</span>
                <span className="text-muted-foreground group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="font-serif text-lg">Recent applications</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                {
                  company: "Vercel",
                  role: "Sr. Software Engineer",
                  status: "interview",
                },
                {
                  company: "Linear",
                  role: "Product Designer",
                  status: "sent",
                },
                {
                  company: "Stripe",
                  role: "Staff Engineer",
                  status: "drafting",
                },
              ].map((app) => (
                <div key={app.company} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{app.company}</p>
                    <p className="text-xs text-muted-foreground">{app.role}</p>
                  </div>
                  <Badge
                    variant={app.status === "interview" ? "accent" : "outline"}
                  >
                    {app.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
