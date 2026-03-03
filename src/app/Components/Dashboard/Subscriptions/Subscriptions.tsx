/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SubscriptionHistory from "./SubscriptionHistory";
import SubscriptionCard from "./SubscriptionCard";

import { useGetMySubscriptionQuery } from "../../../redux/features/userSubscription/userSubscriptionApi";
import { useGetAllPackagesQuery } from "../../../redux/features/subscription/subscriptionApi";
import SubscriptionsSkeleton from "./SubscriptionsSkeleton";

export default function Subscriptions() {
  const { data: mySubData, isLoading: subLoading } =
    useGetMySubscriptionQuery();

  const { data: packagesData, isLoading: pkgLoading } =
    useGetAllPackagesQuery();
  const activePackageId = mySubData?.data?.packageId;
  const packages = packagesData?.data || [];

  if (subLoading || pkgLoading) {
    return <SubscriptionsSkeleton />;
  }

  return (
    <div className="md:p-6 space-y-5">
      <div>
        <h2 className="text-2xl font-semibold">Subscription Plans</h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Choose the plan that fits your storage needs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {packages
          .slice()
          .reverse()
          .map((pkg: any) => {
            const isActive = pkg.id === activePackageId;
            return (
              <SubscriptionCard key={pkg.id} pkg={pkg} isActive={isActive} />
            );
          })}
      </div>

      <div>
        <SubscriptionHistory />
      </div>
    </div>
  );
}
