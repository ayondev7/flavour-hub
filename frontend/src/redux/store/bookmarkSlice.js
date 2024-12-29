import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    toggleBookmark: builder.mutation({
      query: ({ collectionId, recipeId}) => ({
        url: "bookmark/create",
        method: "POST",
        body: { collectionId, recipeId},
      }),
      transformResponse: (response, meta, arg) => ({
        collectionId: arg.collectionId,
        recipeId: arg.recipeId,
        message: response.message,
      }),
    }),

    deleteBookmark: builder.mutation({
      query: ({ recipeId, userId }) => ({
        url: `bookmark/remove/${recipeId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          userId: userId, // Explicitly add userId
        },
      }),
      transformResponse: (response, meta, arg) => ({
        recipeId: arg.recipeId,
        message: response.message,
      }),
    }),     
  }),
});

export const { useToggleBookmarkMutation, useDeleteBookmarkMutation } = bookmarkApi;
