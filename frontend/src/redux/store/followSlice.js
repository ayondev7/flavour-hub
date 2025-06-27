
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/` }),
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
