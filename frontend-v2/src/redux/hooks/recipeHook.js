
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getUserIdFromToken } from '@assets/tokenUtils';
import { RECIPE_ENDPOINTS } from '../api/recipes';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({
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
      query: (cuisineType) => ({
        url: `${RECIPE_ENDPOINTS.GET_RELATED_RECIPES}/${cuisineType}`,
        method: 'GET',
      }),
      providesTags: ['Recipes'],
    }),
    getRecipe: builder.query({
      query: (recipeId) => ({
        url: `${RECIPE_ENDPOINTS.GET_RECIPE}/${recipeId}`,
        method: 'GET',
      }),
      providesTags: ['Recipes'],
    }),
    getRecipeDetails: builder.query({
      query: (recipeId) => ({
        url: `${RECIPE_ENDPOINTS.GET_RECIPE_DETAILS}/${recipeId}`,
        method: 'GET',
      }),
      providesTags: ['Recipes'],
    }),
    getMyRecipes: builder.query({
      query: () => `${RECIPE_ENDPOINTS.GET_MY_RECIPES}`,
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
    updateRecipe: builder.mutation({
      query: ({ recipeId, body }) => ({
        url: `${RECIPE_ENDPOINTS.UPDATE_RECIPE}/${recipeId}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Recipes'],
    }),
    updateRecipeImage: builder.mutation({
      query: ({ recipeId, formData }) => ({
        url: `${RECIPE_ENDPOINTS.UPDATE_RECIPE_IMAGE}/${recipeId}`,
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Recipes'],
    }),
    updatePrepTime: builder.mutation({
      query: ({ recipeId, prepTime }) => ({
        url: `${RECIPE_ENDPOINTS.UPDATE_PREP_TIME}/${recipeId}`,
        method: 'PUT',
        body: { prepTime },
      }),
      invalidatesTags: ['Recipes'],
    }),
    updateCookTime: builder.mutation({
      query: ({ recipeId, cookTime }) => ({
        url: `${RECIPE_ENDPOINTS.UPDATE_COOK_TIME}/${recipeId}`,
        method: 'PUT',
        body: { cookTime },
      }),
      invalidatesTags: ['Recipes'],
    }),
    updateNutritionalValues: builder.mutation({
      query: ({ recipeId, nutritionalValues }) => ({
        url: `${RECIPE_ENDPOINTS.UPDATE_NUTRITIONAL_VALUES}/${recipeId}`,
        method: 'PUT',
        body: { nutritionalValues },
      }),
      invalidatesTags: ['Recipes'],
    }),
    updateIngredient: builder.mutation({
      query: ({ recipeId, value, ingredientId }) => ({
        url: `${RECIPE_ENDPOINTS.UPDATE_INGREDIENT}/${recipeId}`,
        method: 'PUT',
        body: { value, ingredientId },
      }),
      invalidatesTags: ['Recipes'],
    }),
    deleteIngredient: builder.mutation({
      query: ({ recipeId, ingredientId }) => ({
        url: `${RECIPE_ENDPOINTS.DELETE_INGREDIENT}/${recipeId}/${ingredientId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipes'],
    }),
    updateInstruction: builder.mutation({
      query: ({ recipeId, value, instructionId }) => ({
        url: `${RECIPE_ENDPOINTS.UPDATE_INSTRUCTION}/${recipeId}`,
        method: 'PUT',
        body: { value, instructionId },
      }),
      invalidatesTags: ['Recipes'],
    }),
    deleteInstruction: builder.mutation({
      query: ({ recipeId, instructionId }) => ({
        url: `${RECIPE_ENDPOINTS.DELETE_INSTRUCTION}/${recipeId}/${instructionId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Recipes'],
    }),
  }),
});


export const {
  useGetAllRecipesQuery,
  useGetRelatedRecipesQuery,
  useGetRecipeQuery,
  useGetRecipeDetailsQuery,
  useGetMyRecipesQuery,
  useDeleteRecipeMutation,
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
  useUpdateRecipeImageMutation,
  useUpdatePrepTimeMutation,
  useUpdateCookTimeMutation,
  useUpdateNutritionalValuesMutation,
  useUpdateIngredientMutation,
  useDeleteIngredientMutation,
  useUpdateInstructionMutation,
  useDeleteInstructionMutation,
} = recipesApi;
