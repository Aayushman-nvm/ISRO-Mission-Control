import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const isroVercelApi = createApi({
  reducerPath: "isroVercelApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://isro.vercel.app/api",
  }),
  endpoints: (builder) => ({
    getCommercial: builder.query({
      query: () => "/customer_satellites",
    }),
    getCenters: builder.query({
      query: () => "/centres",
    }),
  }),
});

export const { useGetCommercialQuery, useGetCentersQuery } = isroVercelApi;
export const { reducer: isroVercelReducer } = isroVercelApi;