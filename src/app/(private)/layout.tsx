"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";
import { SidebarProvider } from "../../components/ui/sidebar";
import { AppSidebar } from "../../components/app-sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken, user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      router.replace("/");
    }
    if (user?.role !== "ADMIN" && window.location.pathname.includes("/admin")) {
      router.replace("/dashboard");
    }
  }, [accessToken, router, user]);

  if (!accessToken) return null;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 p-6 w-full">{children}</main>
      </div>
      <div></div>
    </SidebarProvider>
  );
}
