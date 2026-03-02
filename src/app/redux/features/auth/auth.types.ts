export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    isVerified: boolean;
  };
}

export interface DecodedUser {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  iat: number;
  exp: number;
}

export interface AuthState {
  user: DecodedUser | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}
