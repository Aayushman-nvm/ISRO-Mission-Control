import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const isroStatsApi = createApi({
  reducerPath: "isroStatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://services.isrostats.in/api",
  }),
  endpoints: (builder) => ({
    getLaunches: builder.query({
      query: () => "/launches",
    }),
    getSpacecrafts: builder.query({
      query: () => "/spacecrafts",
    }),
  }),
});

export const { useGetLaunchesQuery, useGetSpacecraftsQuery } = isroStatsApi;
export const { reducer: isroStatsReducer } = isroStatsApi;