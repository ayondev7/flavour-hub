

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'react-toastify';

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
      async onQueryStarted({ followerId, followingId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Follow status updated successfully!");
        } catch (error) {
          toast.error("Failed to update follow status. Please try again.");
        }
      },
    }),
  }),
});

export const { useToggleFollowMutation } = followApi;
