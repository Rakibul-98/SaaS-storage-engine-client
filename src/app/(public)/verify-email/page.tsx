/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useVerifyEmailMutation } from "../../redux/features/auth/authApi";

interface VerifyEmailPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default function VerifyEmailPage({
  searchParams,
}: VerifyEmailPageProps) {
  const router = useRouter();
  const [verifyEmail] = useVerifyEmailMutation();

  const { token } = React.use(searchParams);

  React.useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) {
        toast.error("Invalid verification link. No token provided.");
        return;
      }

      try {
        const response = await verifyEmail({ token }).unwrap();

        if (response.success) {
          toast.success(response.message || "Email verified successfully!");
          setTimeout(() => router.push("/login"), 3000);
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Verification failed.");
      }
    };

    verifyUserEmail();
  }, [token, verifyEmail, router]);
}
