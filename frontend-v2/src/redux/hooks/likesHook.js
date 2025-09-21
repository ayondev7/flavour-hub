import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

export const likesApi = createApi({
  reducerPath: "likesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/like`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Likes"],
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: (recipeId) => `get-likes/${recipeId}`, 
      providesTags: ["Likes"],
    }),
    toggleLike: builder.mutation({
      query: ({ recipeId }) => ({
        url: "toggle-like",
        method: "POST",
        body: { recipeId },
      }),
      invalidatesTags: ["Likes"],
      async onQueryStarted({ recipeId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Like status updated successfully!");
        } catch (error) {
          toast.error("Failed to update like status. Please try again.");
        }
      },
    }),
  }),
});

export const { useGetLikesQuery, useToggleLikeMutation } = likesApi;
