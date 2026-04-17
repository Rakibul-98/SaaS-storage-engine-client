/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { Button } from "../../../components/ui/button";

interface ResetPasswordPageProps {
  token?: string;
}

export default function ResetPassword({ token }: ResetPasswordPageProps) {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const validatePassword = (password: string) => {
    const minLength = 6;
    return password.length >= minLength;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link. Please request a new one.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!validatePassword(newPassword)) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await resetPassword({
        token,
        newPassword,
      }).unwrap();

      if (response.success) {
        setIsSuccess(true);
        toast.success(response.message || "Password reset successful!");

        setTimeout(() => {
          router.push("/login");
        }, 3000);
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to reset password. Please try again.",
      );
    }
  };

  if (isSuccess) {
    return (
      <div className="border max-w-md w-full space-y-8 px-8 py-10 rounded-xl shadow-lg text-center bg-white">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Password Reset Successful!
        </h2>
        <p className="text-gray-600">
          Your password has been successfully reset. You will be redirected to
          the login page.
        </p>
        <div className="animate-pulse text-blue-600">Redirecting...</div>
      </div>
    );
  }

  return (
    <div className="border max-w-sm mx-auto w-full space-y-8 px-8 py-10 rounded-xl shadow-lg bg-white">
      <div>
        <h2 className="text-center text-3xl font-extrabold ">
          Reset your password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Please enter your new password below.
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="appearance-none relative block w-full pr-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md sm:text-sm"
                placeholder="Enter new password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {newPassword && !validatePassword(newPassword) && (
              <p className="mt-1 text-xs text-red-600">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none relative block w-full pr-10 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md  sm:text-sm"
                placeholder="Confirm new password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="mt-1 text-xs text-red-600">
                Passwords do not match
              </p>
            )}
          </div>
        </div>

        <div>
          <Button
            type="submit"
            disabled={isLoading}
            className="group relative w-full"
          >
            {isLoading ? <>Resetting...</> : "Reset Password"}
          </Button>
        </div>

        <div className="text-center">
          <Link href="/login" className="text-sm ">
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}
