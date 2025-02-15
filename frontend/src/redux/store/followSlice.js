// src/store/followApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://recipe-finder-backend-pt7i.onrender.com/api/' }),
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
    }),
  }),
});

export const { useToggleFollowMutation } = followApi;
