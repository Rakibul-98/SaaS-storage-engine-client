import { baseApi } from "../../api/baseApi";
import {
  CreateSubscriptionPayload,
  CreateSubscriptionResponse,
  MySubscriptionResponse,
  SubscriptionHistoryResponse,
} from "./userSubscription.types";

export const userSubscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation<
      CreateSubscriptionResponse,
      CreateSubscriptionPayload
    >({
      query: (data) => ({
        url: "/user-subscriptions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserSubscription"],
    }),

    getMySubscription: builder.query<MySubscriptionResponse, void>({
      query: () => ({
        url: "/user-subscriptions/me",
        method: "GET",
      }),
      providesTags: ["UserSubscription", "Subscription", "Dashboard"],
    }),

    getMySubscriptionHistory: builder.query<SubscriptionHistoryResponse, void>({
      query: () => ({
        url: "/user-subscriptions/history",
        method: "GET",
      }),
      providesTags: ["UserSubscription", "Subscription", "Dashboard"],
    }),
  }),
});

export const {
  useCreateSubscriptionMutation,
  useGetMySubscriptionQuery,
  useGetMySubscriptionHistoryQuery,
} = userSubscriptionApi;
