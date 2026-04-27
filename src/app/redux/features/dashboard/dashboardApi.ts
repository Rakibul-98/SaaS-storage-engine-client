import { baseApi } from "../../api/baseApi";
import { DashboardStatisticsResponse } from "./dashboard.types";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query<DashboardStatisticsResponse, void>({
      query: () => ({ url: "/dashboard/statistics", method: "GET" }),
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardStatisticsQuery } = dashboardApi;
