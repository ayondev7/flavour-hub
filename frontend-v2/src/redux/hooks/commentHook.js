import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserIdFromToken } from '@assets/tokenUtils';
import { COMMENT_ENDPOINTS } from '../api/comments';

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (recipeId) => ({
        url: `${COMMENT_ENDPOINTS.GET_COMMENTS}/${recipeId}`,
        method: 'GET',
      }),
      providesTags: ['Comments'],
    }),
    postComment: builder.mutation({
      query: ({ userId, content, recipeId, parentCommentId }) => ({
        url: COMMENT_ENDPOINTS.POST_COMMENT,
        method: 'POST',
        body: { userId, content, recipeId, parentCommentId },
      }),
      invalidatesTags: ['Comments'],
    }),
    updateComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: COMMENT_ENDPOINTS.UPDATE_COMMENT,
        method: 'PUT',
        body: { commentId, content },
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: COMMENT_ENDPOINTS.DELETE_COMMENT,
        method: 'DELETE',
        body: { commentId },
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  usePostCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation
} = commentsApi;