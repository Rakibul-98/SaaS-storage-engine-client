"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts";
import { DashboardStatistics } from "../../../redux/features/dashboard/dashboard.types";

const FILE_TYPE_COLORS: Record<string, string> = {
  IMAGE: "#6366f1",
  VIDEO: "#8b5cf6",
  AUDIO: "#ec4899",
  PDF: "#ef4444",
  DOCUMENT: "#f59e0b",
  OTHER: "#6b7280",
};

export default function UsageCharts({ stats }: { stats?: DashboardStatistics }) {
  if (!stats) return null;

  const pieData = stats.files.byType.map((f) => ({
    name: f.type,
    value: f.count,
  }));

  const barData = [
    { name: "Files", used: stats.files.total, limit: stats.files.limit },
    { name: "Folders", used: stats.folders.total, limit: stats.folders.limit },
    { name: "Storage (MB)", used: stats.storage.usedMB, limit: stats.storage.limitMB },
  ];

  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* File Types Pie */}
      <Card className="bg-muted">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Files by Type</CardTitle>
        </CardHeader>
        <CardContent>
          {pieData.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No files yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" label={({ name }) => name}>
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={FILE_TYPE_COLORS[entry.name] || "#6b7280"} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v} files`]} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Usage Bar */}
      <Card className="bg-muted">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-semibold">Usage vs Limit</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={barData} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="used" name="Used" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="limit" name="Limit" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
