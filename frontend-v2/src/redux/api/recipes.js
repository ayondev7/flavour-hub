// Recipe API endpoints
import { BASE_URL } from './config';

export const RECIPE_ENDPOINTS = {
  GET_ALL_RECIPES: `${BASE_URL}/api/recipe/get-all-recipes`,
  GET_RELATED_RECIPES: `${BASE_URL}/api/recipe/get-related-recipes`,
  GET_MY_RECIPES: `${BASE_URL}/api/recipe/get-my-recipes`,
  DELETE_RECIPE: `${BASE_URL}/api/recipe/delete-recipe`,
  UPLOAD: `${BASE_URL}/api/recipe/upload`,
};