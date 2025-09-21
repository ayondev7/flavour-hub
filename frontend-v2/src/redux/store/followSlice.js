
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/` }),
  tagTypes: ['Chefs'],
  endpoints: (builder) => ({
    toggleFollow: builder.mutation({
      query: ({ followerId, followingId }) => ({
        url: 'followers/follow',
        method: 'POST',
        body: { followerId, followingId },
      }),
      transformResponse: (response, meta, arg) => ({
        followingId: arg.followingId,
        message: response.message,
      }),
      invalidatesTags: ['Chefs', 'Recipes'],
    }),
  }),
});

export const { useToggleFollowMutation } = followApi;
