// Recipe API endpoints
export const RECIPE_ENDPOINTS = {
  GET_ALL_RECIPES: "get-all-recipes",
  GET_RELATED_RECIPES: "get-related-recipes",
  GET_MY_RECIPES: "get-my-recipes",
  DELETE_RECIPE: "delete-recipe",
  UPLOAD: "upload",
};

// Base URL for recipe operations
export const RECIPE_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/recipe/`;