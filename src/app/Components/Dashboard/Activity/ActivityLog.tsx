"use client";

import { useGetActivityLogQuery } from "../../../redux/features/files/fileApi";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, RotateCcw, Share2, Move, Edit, Download, X } from "lucide-react";
import { useState } from "react";

const ACTION_META: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  UPLOAD: { label: "Uploaded", icon: Upload, color: "bg-blue-100 text-blue-700 border-blue-200" },
  DELETE: { label: "Moved to Trash", icon: Trash2, color: "bg-red-100 text-red-700 border-red-200" },
  RESTORE: { label: "Restored", icon: RotateCcw, color: "bg-green-100 text-green-700 border-green-200" },
  PERMANENT_DELETE: { label: "Deleted", icon: X, color: "bg-red-100 text-red-700 border-red-200" },
  SHARE: { label: "Shared", icon: Share2, color: "bg-purple-100 text-purple-700 border-purple-200" },
  MOVE: { label: "Moved", icon: Move, color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  RENAME: { label: "Renamed", icon: Edit, color: "bg-gray-100 text-gray-700 border-gray-200" },
  DOWNLOAD: { label: "Downloaded", icon: Download, color: "bg-teal-100 text-teal-700 border-teal-200" },
};

export default function ActivityLog() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetActivityLogQuery({ page, limit: 5 });
  const logs = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const hasMore = page * 5 < total;

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Activity Log</h1>
        {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold">Activity Log</h1>
        <p className="text-sm text-muted-foreground">{total} total event{total !== 1 ? "s" : ""}</p>
      </div>
      {logs.length === 0 ? (
        <div className="flex flex-col items-center py-16 text-muted-foreground gap-2">
          <div className="text-5xl">📋</div>
          <p className="font-medium">No activity yet</p>
          <p className="text-sm">Your file actions will appear here</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => {
            const meta = ACTION_META[log.action] ?? { label: log.action, icon: Upload, color: "bg-gray-100 text-gray-700 border-gray-200" };
            const Icon = meta.icon;
            return (
              <Card key={log.id} className="hover:shadow-sm transition bg-transparent">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`p-2 rounded-full border ${meta.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{log.file?.name ?? "Deleted file"}</p>
                    <p className="text-xs text-muted-foreground">{new Date(log.createdAt).toLocaleString()}</p>
                  </div>
                  <Badge variant="outline" className={`text-xs shrink-0 ${meta.color}`}>{meta.label}</Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <div className="flex justify-between items-center pt-2">
        <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
        <span className="text-sm text-muted-foreground">Page {page}</span>
        <Button variant="outline" size="sm" disabled={!hasMore} onClick={() => setPage((p) => p + 1)}>Next</Button>
      </div>
    </div>
  );
}
