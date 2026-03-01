/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useGetMySubscriptionHistoryQuery } from "../../../redux/features/userSubscription/userSubscriptionApi";

export default function SubscriptionHistory() {
  const { data, isLoading } = useGetMySubscriptionHistoryQuery();

  const history = data?.data || [];

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-2xl font-semibold">Subscription History</h2>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Package</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {history.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No subscription history found
                </TableCell>
              </TableRow>
            )}

            {history.map((item: any) => {
              const start = new Date(item.startDate);
              const end = new Date(item.endDate);

              const duration =
                Math.ceil(
                  (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
                ) + " days";

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.package?.name}
                  </TableCell>

                  <TableCell>{start.toLocaleDateString()}</TableCell>

                  <TableCell>{end.toLocaleDateString()}</TableCell>

                  <TableCell>
                    {item.isActive ? (
                      <Badge variant="default">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Inactive</Badge>
                    )}
                  </TableCell>

                  <TableCell>{duration}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
