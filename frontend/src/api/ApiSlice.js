import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/AuthSlice";
import { serverAPI } from "../utility/Enums";

const baseQuery = fetchBaseQuery({
    baseUrl: serverAPI,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.originalStatus === 403) {
      //send the refresh token to get new refresh token
      const refreshResult = await baseQuery("/api/auth/token", api, extraOptions);
      if (refreshResult?.data) {
        const user = api.getState().auth.user;
        //store new token
        api.dispatch(setCredentials({ ...refreshResult.data, user }));
        // retry the original query with new access token
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
      }
    }
    return result;
  };



export const apiSlice = createApi({
    reducerPath:'apiSlice',
      baseQuery:baseQueryWithReauth,
      endpoints:builder => ({})
  });
  


