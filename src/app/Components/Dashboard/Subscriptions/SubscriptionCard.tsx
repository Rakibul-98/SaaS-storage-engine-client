/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

import { toast } from "sonner";
import { useCreateSubscriptionMutation } from "../../../redux/features/userSubscription/userSubscriptionApi";

interface SubscriptionCardProps {
  pkg: any;
  isActive: boolean;
}

export default function SubscriptionCard({
  pkg,
  isActive,
}: SubscriptionCardProps) {
  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  const handleUpgrade = async () => {
    try {
      await createSubscription({
        subscriptionPackageId: pkg.id,
      }).unwrap();

      toast.success(`Successfully upgraded to ${pkg.name}`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to upgrade subscription");
    }
  };

  return (
    <Card
      className={`h-fit relative transition-all ${
        isActive ? "border-primary shadow-lg scale-[1.02]" : "hover:shadow-md"
      }`}
    >
      {isActive && <Badge className="absolute top-3 right-3">Active</Badge>}

      <CardHeader>
        <CardTitle>{pkg.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Max Folders: {pkg.maxFolders}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Max Nesting: {pkg.maxLevels}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>File Limit: {pkg.fileLimit}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Files / Folder: {pkg.filesPerFolder}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Max File Size: {pkg.maxFileSizeMB} MB</span>
          </li>
          <li className="flex items-start gap-2">
            <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>Allowed Types: {pkg.allowedFileType?.join(", ")}</span>
          </li>
        </ul>

        <Button
          className="w-full mt-4"
          variant={isActive ? "secondary" : "default"}
          disabled={isActive || isLoading}
          onClick={handleUpgrade}
        >
          {isActive ? "Current Plan" : isLoading ? "Upgrading..." : "Upgrade"}
        </Button>
      </CardContent>
    </Card>
  );
}
