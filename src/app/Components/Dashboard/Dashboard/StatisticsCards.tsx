"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { File, Folder, HardDrive } from "lucide-react";
import { DashboardStatistics } from "../../../redux/features/dashboard/dashboard.types";

export default function StatisticsCards({ stats }: { stats?: DashboardStatistics }) {
  if (!stats) return null;

  const cards = [
    {
      title: "Files",
      value: stats.files.total,
      limit: stats.files.limit,
      percent: Math.min((stats.files.total / stats.files.limit) * 100, 100),
      sub: `${stats.files.remaining} remaining`,
      icon: File,
      color: "text-blue-500",
    },
    {
      title: "Folders",
      value: stats.folders.total,
      limit: stats.folders.limit,
      percent: Math.min((stats.folders.total / stats.folders.limit) * 100, 100),
      sub: `${stats.folders.remaining} remaining`,
      icon: Folder,
      color: "text-yellow-500",
    },
    {
      title: "Storage",
      value: `${stats.storage.usedMB} MB`,
      limit: `${stats.storage.limitMB} MB`,
      percent: stats.storage.usedPercent,
      sub: `${stats.storage.usedPercent}% used`,
      icon: HardDrive,
      color: "text-green-500",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-8 ">
      {cards.map((card, i) => {
        const Icon = card.icon;
        const isWarning = card.percent >= 80;
        return (
          <Card key={i} className="hover:shadow-md transition flex-1 bg-transparent">
            <CardContent className="p-5 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <h3 className="text-2xl font-bold">{card.value}</h3>
                  <p className="text-xs text-muted-foreground">of {card.limit}</p>
                </div>
                <Icon size={36} className={card.color} />
              </div>
              <div className="space-y-1">
                <Progress
                  value={card.percent}
                  className={`h-1.5 ${isWarning ? "[&>div]:bg-orange-500" : ""}`}
                />
                <p className={`text-xs ${isWarning ? "text-orange-500 font-medium" : "text-muted-foreground"}`}>
                  {card.sub}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
