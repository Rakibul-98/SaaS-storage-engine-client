import { baseApi } from "../../api/baseApi";
import {
  ForgotPasswordPayload,
  LoginPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "./auth.types";
import { setCredentials } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        success: boolean;
        message: string;
        data: {
          accessToken: string;
          refreshToken: string;
        };
      },
      LoginPayload
    >({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          const { accessToken, refreshToken } = data.data;

          dispatch(setCredentials({ accessToken, refreshToken }));
        } catch (err) {
          console.error("Login error:", err);
        }
      },
    }),

    register: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      RegisterPayload
    >({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
    }),
    verifyEmail: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      { token: string }
    >({
      query: ({ token }) => ({
        url: `/auth/verify-email?token=${token}`,
        method: "GET",
      }),
    }),
    forgotPassword: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      ForgotPasswordPayload
    >({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      ResetPasswordPayload
    >({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;
