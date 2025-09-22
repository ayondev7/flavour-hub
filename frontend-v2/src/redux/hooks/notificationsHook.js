import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NOTIFICATION_ENDPOINTS } from '../api/notifications';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: fetchBaseQuery({
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
      query: (userId) => `${NOTIFICATION_ENDPOINTS.GET_NOTIFICATIONS}/${userId}`,
    }),
  }),
});

export const { useGetNotificationsQuery } = notificationsApi;