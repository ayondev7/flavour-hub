
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { COLLECTION_BASE_URL, COLLECTION_ENDPOINTS } from "../api/collections";

export const collectionsApi = createApi({
  reducerPath: "collectionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COLLECTION_BASE_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Collections"],
  endpoints: (builder) => ({
    createCollection: builder.mutation({
      query: (title) => ({
        url: COLLECTION_ENDPOINTS.CREATE,
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Collections"],
    }),
    getCollections: builder.query({
      query: () => COLLECTION_ENDPOINTS.GET_ALL,
      providesTags: ["Collections"],
    }),
    getCollectionsByUser: builder.query({
      query: (userId) => `${COLLECTION_ENDPOINTS.GET_BY_USER}/${userId}`,
      providesTags: ["Collections"],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
  useGetCollectionsByUserQuery,
} = collectionsApi;
