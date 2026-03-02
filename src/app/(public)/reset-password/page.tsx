import React from "react";
import ResetPassword from "../../Components/Authentication/ResetPassword";

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { token } = React.use(searchParams);
  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
}
