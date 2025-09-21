
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserIdFromToken } from '@assets/tokenUtils';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/recipe/`,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Recipes'],
  endpoints: (builder) => ({
    getAllRecipes: builder.query({
      query: () => ({
        url: 'get-all-recipes',
        method: 'GET',
      }),
      providesTags: ['Recipes'],
    }),
    getRelatedRecipes: builder.query({
      query: ({ cuisineType, userId }) => ({
        url: `getRelatedRecipes/${cuisineType}`,
        method: 'GET',
        headers: {
          userId: userId,
        },
      }),
      providesTags: ['Recipes'],
    }),
  }),
});


export const { useGetAllRecipesQuery, useGetRelatedRecipesQuery } = recipesApi;
