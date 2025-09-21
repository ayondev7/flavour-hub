import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/comment`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (userId) => `get-notifications/${userId}`,
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApi;