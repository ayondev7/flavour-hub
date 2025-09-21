
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/recipe/`,
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
  }),
});


export const { useGetAllRecipesQuery } = recipesApi;
