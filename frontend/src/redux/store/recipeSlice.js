// src/redux/store/recipesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/recipe/' }),
  endpoints: (builder) => ({
    getAllRecipes: builder.query({
      query: (userId) => ({
        url: 'getAllRecipes',
        method: 'GET',
        headers: { userId },
      }),
    }),
  }),
});

export const { useGetAllRecipesQuery } = recipesApi;
