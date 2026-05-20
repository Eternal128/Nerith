"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const SENTIMENT_DATA = [
  { month: "Jan", score: 68 },
  { month: "Feb", score: 71 },
  { month: "Mar", score: 69 },
  { month: "Apr", score: 74 },
  { month: "May", score: 72 },
  { month: "Jun", score: 76 },
];

const ATTRITION_DATA = [
  { name: "Low", value: 82, color: "#22c55e" },
  { name: "Medium", value: 13, color: "#eab308" },
  { name: "High", value: 5, color: "#ef4444" },
];

const REPORTS = [
  { title: "Pay Equity Report — Q2 2024", status: "Ready", price: "$299" },
  { title: "Screening Bias Audit — Engineering", status: "Critical", price: "$499" },
  { title: "Promotion Fairness Analysis", status: "Ready", price: "$349" },
];

export default function InsightsPage() {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl mb-2">HR Intelligence</h1>
      <p className="text-muted-foreground mb-8">Aggregated workforce analytics, sentiment trends, and pay-equity reports.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-serif text-lg mb-4">Sentiment Trend (6 months)</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={SENTIMENT_DATA}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="score" fill="currentColor" className="fill-accent" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="font-serif text-lg mb-4">Attrition Risk Distribution</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={ATTRITION_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, value }: { name: string; value: number }) => `${name}: ${value}%`}>
                {ATTRITION_DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <h2 className="font-serif text-xl mb-4">Available Reports</h2>
      <div className="space-y-3">
        {REPORTS.map(r => (
          <div key={r.title} className="bg-card border border-border rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{r.title}</p>
              <span className={`text-xs font-mono ${r.status === "Critical" ? "text-red-500" : "text-green-600"}`}>{r.status}</span>
            </div>
            <div className="text-right">
              <p className="font-serif text-lg">{r.price}</p>
              <button className="text-xs text-accent hover:underline">Purchase</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
