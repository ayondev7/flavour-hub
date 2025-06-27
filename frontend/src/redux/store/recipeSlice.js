
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipesApi = createApi({
  reducerPath: 'recipesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_BACKEND_URL}/api/recipe/` }),
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
