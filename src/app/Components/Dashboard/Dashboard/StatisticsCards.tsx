/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { File, Folder, HardDrive } from "lucide-react";

export default function StatisticsCards({ stats }: any) {
  const cards = [
    {
      title: "Files",
      value: stats?.totalFiles,
      limit: stats?.fileLimit,
      icon: File,
    },
    {
      title: "Folders",
      value: stats?.totalFolders,
      limit: stats?.folderLimit,
      icon: Folder,
    },
    {
      title: "Storage (MB)",
      value: stats?.totalStorageUsedMB,
      limit: stats?.storageLimitMB,
      icon: HardDrive,
    },
  ];

  return (
    <div className="flex justify-between gap-8 flex-wrap">
      {cards.map((card, i) => {
        const percent = Math.min((card.value / card.limit) * 100, 100);

        const Icon = card.icon;

        return (
          <Card key={i} className="hover:shadow-md transition flex-1">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-muted-foreground text-sm">{card.title}</p>
                <h3 className="text-2xl font-bold">
                  {card.value} / {card.limit}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {percent.toFixed(0)}% used
                </p>
              </div>

              <Icon size={60} className="text-gray-600" />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
