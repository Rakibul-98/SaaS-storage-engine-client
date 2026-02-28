"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "../redux/hooks";

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
    <div className="flex min-h-screen">
      <div className="flex-1">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
