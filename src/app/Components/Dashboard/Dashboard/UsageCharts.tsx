/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  stats: any;
}

export default function UsageCharts({ stats }: Props) {
  if (!stats) return null;

  const {
    totalFiles = 0,
    totalFolders = 0,
    fileLimit = 0,
    folderLimit = 0,
  } = stats;

  const barData = [
    {
      name: "Files",
      Used: totalFiles,
      Limit: fileLimit,
    },
    {
      name: "Folders",
      Used: totalFolders,
      Limit: folderLimit,
    },
  ];

  return (
    <div className="flex-1">
      <Card>
        <CardHeader>
          <CardTitle>Files & Folders Usage</CardTitle>
        </CardHeader>

        <CardContent className="h-57 ps-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Used" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
