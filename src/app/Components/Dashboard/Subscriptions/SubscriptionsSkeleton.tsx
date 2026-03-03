"use client";

import { Skeleton } from "@/components/ui/skeleton";
import SubscriptionHistorySkeleton from "./SubscriptionHistorySkeleton";

export default function SubscriptionsSkeleton() {
  return (
    <div className="p-6 space-y-5 overflow-hidden">
      {/* Header section */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Subscription cards grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="border rounded-lg p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-24" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <SubscriptionHistorySkeleton />
      </div>
    </div>
  );
}
