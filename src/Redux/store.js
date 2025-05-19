import { configureStore } from "@reduxjs/toolkit";
import { isroVercelReducer } from "./Services/isroVercelApi";
import { isroStatsReducer } from "./Services/isroStatsApi";

export const store = configureStore({
  reducer: {
    isroVercel: isroVercelReducer,
    isroStats: isroStatsReducer,
  },
});
