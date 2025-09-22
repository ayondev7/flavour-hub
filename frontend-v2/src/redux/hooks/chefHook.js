import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { CHEF_ENDPOINTS } from "../api/chefs";

export const chefsApi = createApi({
  reducerPath: "chefsApi",
  baseQuery: fetchBaseQuery({
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
      query: () => CHEF_ENDPOINTS.GET_ALL_USERS,
      providesTags: ['Chefs'],
    }),
    getLeaderboard: builder.query({
      query: (userId) => CHEF_ENDPOINTS.GET_LEADERBOARD,
      providesTags: ['Leaderboard'],
    }),
    toggleFollow: builder.mutation({
      query: ({ followerId, followingId }) => ({
        url: CHEF_ENDPOINTS.TOGGLE_FOLLOW,
        method: "POST",
        body: { followerId, followingId },
      }),
      invalidatesTags: ['Chefs'],
    }),
  }),
});

export const { useGetChefsQuery, useGetLeaderboardQuery, useToggleFollowMutation } = chefsApi;
