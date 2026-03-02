"use client";

import StatisticsCards from "./StatisticsCards";
import { useGetMySubscriptionQuery } from "../../../redux/features/userSubscription/userSubscriptionApi";
import { useGetDashboardStatisticsQuery } from "../../../redux/features/dashboard/dashboardApi";
import { Alert, AlertDescription } from "../../../../components/ui/alert";
import UsageCharts from "./UsageCharts";
import SubscriptionCard from "../Subscriptions/SubscriptionCard";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";
import DashboardSkeleton from "./DashboardSkeleton";

export default function Dashboard() {
  const { data: subData, isLoading: subLoading } = useGetMySubscriptionQuery();
  const { data: statsData, isLoading: statsLoading } =
    useGetDashboardStatisticsQuery();

  if (subLoading || statsLoading) return <DashboardSkeleton />;

  const token = localStorage.getItem("accessToken");
  const user = jwtDecode<{ name: string }>(token!);

  const stats = statsData?.data;
  const currentPackage = subData?.data?.package;

  const isOverLimit =
    (stats?.foldersRemaining ?? 0) < 0 || (stats?.filesRemaining ?? 0) < 0;
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Welcome back, {user?.name}</h2>

        <Link href="/dashboard/subscriptions">
          <Button className="cursor-pointer">
            {currentPackage ? "Upgrade Plan" : "Enroll Plan"}
          </Button>
        </Link>
      </div>

      {isOverLimit && (
        <Alert variant="destructive">
          <AlertDescription>
            You have exceeded your subscription limits. Consider upgrading your
            plan.
          </AlertDescription>
        </Alert>
      )}

      <StatisticsCards stats={stats} />

      <div className="flex gap-5">
        <UsageCharts stats={stats} />

        {currentPackage && (
          <SubscriptionCard pkg={currentPackage} isActive={true} />
        )}
      </div>
    </div>
  );
}
