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
import ActivityFeed from "./ActivityFeed";
import { AlertTriangle } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";

export default function Dashboard() {
  const { data: subData, isLoading: subLoading } = useGetMySubscriptionQuery();
  const { data: statsData, isLoading: statsLoading } =
    useGetDashboardStatisticsQuery();

  if (subLoading || statsLoading) return <DashboardSkeleton />;

  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const user = token ? jwtDecode<{ name: string }>(token) : { name: "User" };

  const stats = statsData?.data;
  const currentPackage = subData?.data?.package;

  const isOverLimit =
    (stats?.files.remaining ?? 1) < 0 || (stats?.folders.remaining ?? 1) < 0;
  const isStorageWarning = (stats?.storage.usedPercent ?? 0) >= 80;

  return (
    <div className="p-6 space-y-8 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-5 justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome back, <span className="whitespace-nowrap text-primary">{user?.name}</span>
          </h2>
          {currentPackage && (
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="default">{currentPackage.name} Plan</Badge>
              {stats?.subscription.isActive && (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Active</Badge>
              )}
            </div>
          )}
        </div>

        <Link href="/dashboard/subscriptions">
          <Button className="cursor-pointer w-full">
            {currentPackage ? "Upgrade Plan" : "Enroll a Plan"}
          </Button>
        </Link>
      </div>
      {isOverLimit && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You have exceeded your subscription limits. Upgrade your plan to continue uploading.
          </AlertDescription>
        </Alert>
      )}
      {!isOverLimit && isStorageWarning && (
        <Alert className="border-orange-300 bg-orange-50 text-orange-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            You are using {stats?.storage.usedPercent}% of your storage quota. Consider upgrading soon.
          </AlertDescription>
        </Alert>
      )}

      <StatisticsCards stats={stats} />

      <div className="flex flex-col lg:flex-row gap-8">
        <UsageCharts stats={stats} />

        {currentPackage && (
          <SubscriptionCard pkg={currentPackage} isActive={true} />
        )}
      </div>

      {stats?.recentActivity && stats.recentActivity.length > 0 && (
        <ActivityFeed activities={stats.recentActivity} />
      )}
    </div>
  );
}
