
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collectionsApi = createApi({
  reducerPath: "collectionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/collections`,
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
        url: "create",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Collections"],
    }),
    getCollections: builder.query({
      query: () => "get-all", 
      providesTags: ["Collections"],
    }),
  }),
});

export const {
  useCreateCollectionMutation,
  useGetCollectionsQuery,
} = collectionsApi;
