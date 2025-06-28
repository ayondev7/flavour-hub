import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    toggleBookmark: builder.mutation({
      query: ({ collectionId, recipeId }) => ({
        url: "bookmark/create",
        method: "POST",
        body: { collectionId, recipeId },
      }),
      transformResponse: (response, meta, arg) => ({
        collectionId: arg.collectionId,
        recipeId: arg.recipeId,
        message: response.message,
      }),
    }),

    deleteBookmark: builder.mutation({
      query: ({ recipeId }) => ({
        url: `bookmark/remove/${recipeId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
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
