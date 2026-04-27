import { baseApi } from "../../api/baseApi";
import { DashboardStatisticsResponse } from "./dashboard.types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query<
      DashboardStatisticsResponse | null,
      void
    >({
      query: () => ({ url: "/dashboard/statistics", method: "GET" }),
      // Return null instead of throwing when no subscription (403)
      transformErrorResponse: (response) => {
        if (response.status === 403 || response.status === 404) {
          return null;
        }
        return response;
      },
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardStatisticsQuery } = dashboardApi;
