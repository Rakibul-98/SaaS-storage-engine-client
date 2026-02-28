import { baseApi } from "../../api/baseApi";
import { LoginPayload, RegisterPayload } from "./auth.types";
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

          document.cookie = `accessToken=${accessToken}; path=/`;
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
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
