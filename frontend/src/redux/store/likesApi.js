
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const likesApi = createApi({
  reducerPath: "likesApi", 
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/like` }), 
  tagTypes: ["Likes"], 
  endpoints: (builder) => ({
    getLikes: builder.query({
      query: (recipeId,userId) => `get-likes/${recipeId}/${userId}`, 
      providesTags: ["Likes"], 
    }),
    toggleLike: builder.mutation({
      query: ({ userId, recipeId }) => ({
        url: "toggle-like", 
        method: "POST",
        body: { userId, recipeId }, 
      }),
      invalidatesTags: ["Likes"], 
    }),
  }),
});


export const { useGetLikesQuery, useToggleLikeMutation } = likesApi;
