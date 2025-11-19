import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { recipeRoutes } from '../routes/recipeRoutes';
import { useAuthStore } from '../store/authStore';

export const useRecipes = () => {
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const fetchRecipes = async () => {
    const response = await axios.get(recipeRoutes.getAllRecipes, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const fetchRecipeDetails = async (id) => {
    const response = await axios.get(recipeRoutes.getRecipe(id), {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  const searchRecipes = async (query) => {
    if (!query) return [];
    const response = await axios.get(`${recipeRoutes.search}?query=${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  };

  return {
    useGetAllRecipes: () => useQuery({
      queryKey: ['recipes'],
      queryFn: fetchRecipes,
      enabled: !!token,
    }),
    useGetRecipeDetails: (id) => useQuery({
      queryKey: ['recipe', id],
      queryFn: () => fetchRecipeDetails(id),
      enabled: !!id && !!token,
    }),
    useSearchRecipes: (query) => useQuery({
      queryKey: ['search', query],
      queryFn: () => searchRecipes(query),
      enabled: false,
    }),
  };
};
