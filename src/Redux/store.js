import { configureStore } from "@reduxjs/toolkit";
import { isroVercelApi } from "./Services/isroVercelApi";
import { isroStatsApi } from "./Services/isroStatsApi";

export const store = configureStore({
  reducer: {
    [isroVercelApi.reducerPath]: isroVercelApi.reducer,
    [isroStatsApi.reducerPath]: isroStatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(isroVercelApi.middleware)
      .concat(isroStatsApi.middleware),
});
