/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { Loader2 } from "lucide-react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { MagicCard } from "../../../components/ui/magic-card";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
  const { theme } = useTheme();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const fillUserCredentials = () => {
    setValue("email", "demo@saas.com");
    setValue("password", "Demo@12345");
  };

  const fillAdminCredentials = () => {
    setValue("email", "admin@saas.com");
    setValue("password", "Admin@12345");
  };

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const res = await login(values).unwrap();
      if (res.success) {
        router.push("/dashboard");
        toast.success("Login Successful!");
      }
    } catch (error: any) {
      setError("root", {
        message: error?.data?.message || "Login failed",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm mx-auto border-none shadow-none p-0">
      <MagicCard
        gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        className="p-0"
      >
        <CardHeader className="border-border border-b p-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-primary ">Login</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fillAdminCredentials}
              className="flex-1"
            >
              Admin
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={fillUserCredentials}
              className="flex-1"
            >
              User
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {errors.root && (
                <p className="text-sm text-red-500">{errors.root.message}</p>
              )}
            </div>

            <Button type="submit" className="mt-4 w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="relative border-border border-t p-8 text-sm text-muted-foreground flex justify-center md:justify-start">
          <Link className="absolute top-1 right-8" href="/forgot-password">
            Forgot your Password?
          </Link>
          <p className="mt-5">
            Don’t have an account?{" "}
            <span
              className="cursor-pointer font-medium text-primary underline hover:no-underline"
              onClick={() => router.push("/registration")}
            >
              Register
            </span>
          </p>
        </CardFooter>
      </MagicCard>
    </Card>
  );
}
