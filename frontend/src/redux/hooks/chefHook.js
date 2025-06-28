import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chefsApi = createApi({
  reducerPath: "chefsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/user`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChefs: builder.query({
      query: () => `get-all-users`, 
    }),
    toggleFollow: builder.mutation({
      query: ({ followerId, followingId }) => ({
        url: "toggle-follow",
        method: "POST",
        body: { followerId, followingId },
      }),
    }),
  }),
});

export const { useGetChefsQuery, useToggleFollowMutation } = chefsApi;
