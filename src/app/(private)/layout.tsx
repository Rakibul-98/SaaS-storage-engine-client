/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/");
      return;
    }

    try {
      const user = jwtDecode<{ name: string; role: string }>(accessToken);

      if (pathname.includes("/admin") && user?.role !== "ADMIN") {
        router.replace("/dashboard");
        toast.error("You don't have permission to access this page");
      }
    } catch (error) {
      console.error("Invalid token:", error);
      router.replace("/");
      toast.error("Session expired. Please login again.");
    }
  }, [accessToken, router, pathname]);

  if (!accessToken) return null;

  let user;
  try {
    user = jwtDecode<{ name: string; role: string }>(accessToken);
  } catch (error) {
    router.replace("/");
    return null;
  }

  if (pathname.includes("/admin") && user?.role !== "ADMIN") {
    return null;
  }

  const getPageTitle = () => {
    if (pathname === "/") return "Home";
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
