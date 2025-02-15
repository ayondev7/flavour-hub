// src/redux/store/recipesApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://recipe-finder-backend-pt7i.onrender.com/api/recipe/' }),
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
