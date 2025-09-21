
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserIdFromToken } from '@assets/tokenUtils';
import { RECIPE_BASE_URL, RECIPE_ENDPOINTS } from '../api/recipes';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: RECIPE_BASE_URL,
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
        url: `${RECIPE_ENDPOINTS.GET_ALL_RECIPES}?userId=${getUserIdFromToken()}`,
        method: 'GET',
      }),
      providesTags: ['Recipes'],
    }),
    getRelatedRecipes: builder.query({
      query: ({ cuisineType, userId }) => ({
        url: `${RECIPE_ENDPOINTS.GET_RELATED_RECIPES}/${cuisineType}?userId=${userId}`,
        method: 'GET',
      }),
      providesTags: ['Recipes'],
    }),
    getMyRecipes: builder.query({
      query: (userId) => `${RECIPE_ENDPOINTS.GET_MY_RECIPES}/${userId}`,
      providesTags: ['Recipes'],
    }),
    deleteRecipe: builder.mutation({
      query: (recipeId) => ({
        url: `${RECIPE_ENDPOINTS.DELETE_RECIPE}/${recipeId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipes'],
    }),
    createRecipe: builder.mutation({
      query: (formData) => ({
        url: RECIPE_ENDPOINTS.UPLOAD,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Recipes'],
    }),
  }),
});


export const { useGetAllRecipesQuery, useGetRelatedRecipesQuery, useGetMyRecipesQuery, useDeleteRecipeMutation, useCreateRecipeMutation } = recipesApi;
