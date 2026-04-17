"use client";

import { ActivityLogItem } from "../../../redux/features/dashboard/dashboard.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload, Trash2, RotateCcw, Share2, Move, Edit, Download, X
} from "lucide-react";

const ACTION_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  UPLOAD: { label: "Uploaded", icon: Upload, color: "bg-blue-100 text-blue-700" },
  DELETE: { label: "Moved to Trash", icon: Trash2, color: "bg-red-100 text-red-700" },
  RESTORE: { label: "Restored", icon: RotateCcw, color: "bg-green-100 text-green-700" },
  PERMANENT_DELETE: { label: "Deleted", icon: X, color: "bg-red-100 text-red-700" },
  SHARE: { label: "Shared", icon: Share2, color: "bg-purple-100 text-purple-700" },
  MOVE: { label: "Moved", icon: Move, color: "bg-yellow-100 text-yellow-700" },
  RENAME: { label: "Renamed", icon: Edit, color: "bg-gray-100 text-gray-700" },
  DOWNLOAD: { label: "Downloaded", icon: Download, color: "bg-teal-100 text-teal-700" },
};

export default function ActivityFeed({ activities }: { activities: ActivityLogItem[] }) {
  return (
    <Card className="pb-0 bg-muted">
      <CardHeader className="pb-0! -mb-4">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 p-4 border-t">
        {activities.map((log) => {
          const meta = ACTION_META[log.action] ?? { label: log.action, icon: Upload, color: "bg-gray-100 text-gray-700" };
          const Icon = meta.icon;
          return (
            <div key={log.id} className="flex items-center gap-3 pt-1 pb-3 border-b last:border-0">
              <div className={`p-1.5 rounded-full ${meta.color}`}>
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">
                  <span className="font-medium">{log.file?.name ?? "Unknown file"}</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
              <Badge variant="secondary" className={`text-xs shrink-0 ${meta.color}`}>
                {meta.label}
              </Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
