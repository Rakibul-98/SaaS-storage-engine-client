import { baseApi } from "../../api/baseApi";
import {
  CreateSubscriptionPackagePayload,
  CreateSubscriptionPackageResponse,
  GetAllPackagesResponse,
  GetSinglePackageResponse,
  UpdateSubscriptionPackagePayload,
  UpdateSubscriptionPackageResponse,
  DeleteSubscriptionPackageResponse,
} from "./subscription.types";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriptionPackage: builder.mutation<
      CreateSubscriptionPackageResponse,
      CreateSubscriptionPackagePayload
    >({
      query: (data) => ({
        url: "/subscriptions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserSubscription", "Dashboard"],
    }),

    getAllPackages: builder.query<GetAllPackagesResponse, void>({
      query: () => ({
        url: "/subscriptions",
        method: "GET",
      }),
      providesTags: ["Subscription"],
    }),

    getSinglePackage: builder.query<GetSinglePackageResponse, string>({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Subscription", id }],
    }),

    updateSubscriptionPackage: builder.mutation<
      UpdateSubscriptionPackageResponse,
      UpdateSubscriptionPackagePayload
    >({
      query: ({ id, ...data }) => ({
        url: `/subscriptions/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Subscription",
        { type: "Subscription", id },
        "Dashboard",
        "UserSubscription",
      ],
    }),

    deleteSubscriptionPackage: builder.mutation<
      DeleteSubscriptionPackageResponse,
      string
    >({
      query: (id) => ({
        url: `/subscriptions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
  useCreateSubscriptionPackageMutation,
  useGetAllPackagesQuery,
  useGetSinglePackageQuery,
  useUpdateSubscriptionPackageMutation,
  useDeleteSubscriptionPackageMutation,
} = subscriptionApi;
