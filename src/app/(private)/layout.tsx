"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { toast } from "sonner";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/");
      return;
    }

    if (pathname.includes("/admin") && user?.role !== "ADMIN") {
      router.replace("/dashboard");
      toast.error("You don't have permission to access this page");
    }
  }, [accessToken, router, user, pathname]);

  if (!accessToken) return null;

  if (pathname.includes("/admin") && user?.role !== "ADMIN") {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard";
    if (pathname.includes("/my-drive")) return "My Drive";
    if (pathname.includes("/trash")) return "Trash";
    if (pathname.includes("/subscriptions")) return "Subscriptions";
    if (pathname.includes("/manage-subscription")) return "Manage Subscription";
    if (pathname.includes("/folder/")) return "Folder";
    return "Dashboard";
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1">
          <div className="flex items-center gap-2 p-4 border-b sticky top-0 bg-background z-10">
            <SidebarTrigger />
            <h1 className="text-xl font-semibold">{getPageTitle()}</h1>
          </div>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
