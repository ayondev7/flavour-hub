import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BOOKMARK_ENDPOINTS } from "../api/bookmarks";

export const bookmarkApi = createApi({
  reducerPath: "bookmarkApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Bookmarks"],
  endpoints: (builder) => ({
    toggleBookmark: builder.mutation({
      query: ({ collectionId, recipeId }) => ({
        url: BOOKMARK_ENDPOINTS.CREATE,
        method: "POST",
        body: { collectionId, recipeId },
      }),
      transformResponse: (response, meta, arg) => ({
        collectionId: arg.collectionId,
        recipeId: arg.recipeId,
        message: response.message,
      }),
      invalidatesTags: ["Bookmarks"],
    }),

    deleteBookmark: builder.mutation({
      query: ({ recipeId }) => ({
        url: `${BOOKMARK_ENDPOINTS.REMOVE}/${recipeId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response, meta, arg) => ({
        recipeId: arg.recipeId,
        message: response.message,
      }),
      invalidatesTags: ["Bookmarks"],
    }),

    getBookmarks: builder.query({
      query: (collectionId) => `${BOOKMARK_ENDPOINTS.GET_BOOKMARKS}/${collectionId}`,
      providesTags: ["Bookmarks"],
    }),
  }),
});

export const { useToggleBookmarkMutation, useDeleteBookmarkMutation, useGetBookmarksQuery } = bookmarkApi;
