/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { useGetMySubscriptionHistoryQuery } from "../../../redux/features/userSubscription/userSubscriptionApi";
import SubscriptionHistorySkeleton from "./SubscriptionHistorySkeleton";
import ResponsiveTable from "../../../../components/responsive-table";

export default function SubscriptionHistory() {
  const { data, isLoading } = useGetMySubscriptionHistoryQuery();

  const history = data?.data || [];

  const columns = [
    {
      header: "Package",
      accessor: (item: any) => item.package?.name,
      cellClassName: "font-medium",
      mobile: { label: "Package", format: (item: any) => item.package?.name },
    },
    {
      header: "Start Date",
      accessor: (item: any) => new Date(item.startDate).toLocaleDateString(),
      mobile: {
        label: "Start Date",
        format: (item: any) => new Date(item.startDate).toLocaleDateString(),
      },
    },
    {
      header: "End Date",
      accessor: (item: any) => new Date(item.endDate).toLocaleDateString(),
      mobile: {
        label: "End Date",
        format: (item: any) => new Date(item.endDate).toLocaleDateString(),
      },
    },
    {
      header: "Status",
      accessor: (item: any) =>
        item.isActive ? (
          <Badge variant="default">Active</Badge>
        ) : (
          <Badge variant="secondary">Inactive</Badge>
        ),
      mobile: {
        label: "Status",
        format: (item: any) =>
          item.isActive ? (
            <Badge variant="default" className="mt-1">
              Active
            </Badge>
          ) : (
            <Badge variant="secondary" className="mt-1">
              Inactive
            </Badge>
          ),
      },
    },
    {
      header: "Duration",
      accessor: (item: any) => {
        const start = new Date(item.startDate);
        const end = new Date(item.endDate);
        const days = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
        );
        return `${days} days`;
      },
      mobile: {
        label: "Duration",
        format: (item: any) => {
          const start = new Date(item.startDate);
          const end = new Date(item.endDate);
          const days = Math.ceil(
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
          );
          return `${days} days`;
        },
      },
    },
  ];

  if (isLoading) {
    return <SubscriptionHistorySkeleton />;
  }

  return (
    <div className="mt-10 space-y-4 md:space-y-6">
      <h2 className="text-xl md:text-2xl font-semibold">
        Subscription History
      </h2>

      <ResponsiveTable
        data={history}
        columns={columns}
        keyExtractor={(item: any) => item.id}
        emptyMessage="No subscription history found"
      />
    </div>
  );
}
