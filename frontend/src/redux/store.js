import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/ApiSlice";
import authReducer from "../features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        immutableCheck: { warnAfter: 128 },
        serializableCheck: { warnAfter: 128 },
      }).concat([
        apiSlice.middleware,
      ]),
  devTools: true
})