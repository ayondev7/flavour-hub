import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const likesApi = createApi({
  reducerPath: "likesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/like`,
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
    }),
  }),
});

export const { useGetLikesQuery, useToggleLikeMutation } = likesApi;
