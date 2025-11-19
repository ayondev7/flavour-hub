import { BASE_URL } from './index';

export const recipeRoutes = {
  createRecipe: `${BASE_URL}/recipe/upload`,
  updateRecipeImage: (recipeId) => `${BASE_URL}/recipe/update-recipe-image/${recipeId}`,
  getAllRecipes: `${BASE_URL}/recipe/get-all-recipes`,
  getRecipe: (recipeId) => `${BASE_URL}/recipe/get-recipe/${recipeId}`,
  getRelatedRecipes: (cuisineType) => `${BASE_URL}/recipe/get-related-recipes/${cuisineType}`,
  searchRecipes: `${BASE_URL}/recipe/search`,
  getMyRecipes: `${BASE_URL}/recipe/get-my-recipes`,
  updateRecipe: (id) => `${BASE_URL}/recipe/update-recipe/${id}`,
  deleteRecipe: (id) => `${BASE_URL}/recipe/delete-recipe/${id}`,
  postRating: `${BASE_URL}/recipe/post-rating`,
  updateIngredient: (recipeId) => `${BASE_URL}/recipe/update-ingredient/${recipeId}`,
  deleteIngredient: (recipeId, ingredientId) => `${BASE_URL}/recipe/delete-ingredient/${recipeId}/${ingredientId}`,
  updateInstruction: (recipeId) => `${BASE_URL}/recipe/update-instruction/${recipeId}`,
  deleteInstruction: (recipeId, instructionId) => `${BASE_URL}/recipe/delete-instruction/${recipeId}/${instructionId}`,
  updateNutritionalValues: (recipeId) => `${BASE_URL}/recipe/update-nutritional-values/${recipeId}`,
  updatePrepTime: (recipeId) => `${BASE_URL}/recipe/update-prep-time/${recipeId}`,
  updateCookTime: (recipeId) => `${BASE_URL}/recipe/update-cook-time/${recipeId}`,
  getRecipeDetails: (recipeId) => `${BASE_URL}/recipe/get-recipe-details/${recipeId}`,
};
