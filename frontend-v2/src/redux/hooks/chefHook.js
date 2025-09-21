import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const chefsApi = createApi({
  reducerPath: "chefsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/user`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Chefs'],
  endpoints: (builder) => ({
    getChefs: builder.query({
      query: () => `get-all-users`, 
      providesTags: ['Chefs'],
    }),
    getLeaderboard: builder.query({
      query: (userId) => `get-leaderboard-rankings/${userId}`,
      providesTags: ['Leaderboard'],
    }),
    toggleFollow: builder.mutation({
      query: ({ followerId, followingId }) => ({
        url: "toggle-follow",
        method: "POST",
        body: { followerId, followingId },
      }),
      invalidatesTags: ['Chefs'],
    }),
  }),
});

export const { useGetChefsQuery, useGetLeaderboardQuery, useToggleFollowMutation } = chefsApi;
