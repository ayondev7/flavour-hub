// Recipe API endpoints
import { BASE_URL } from './config';

export const RECIPE_ENDPOINTS = {
  GET_ALL_RECIPES: `${BASE_URL}/api/recipe/get-all-recipes`,
  GET_RELATED_RECIPES: `${BASE_URL}/api/recipe/get-related-recipes`,
  GET_MY_RECIPES: `${BASE_URL}/api/recipe/get-my-recipes`,
  GET_RECIPE: `${BASE_URL}/api/recipe/get-recipe`,
  GET_RECIPE_DETAILS: `${BASE_URL}/api/recipe/get-recipe-details`,
  DELETE_RECIPE: `${BASE_URL}/api/recipe/delete-recipe`,
  UPLOAD: `${BASE_URL}/api/recipe/upload`,
  UPDATE_RECIPE: `${BASE_URL}/api/recipe/update-recipe`,
  UPDATE_RECIPE_IMAGE: `${BASE_URL}/api/recipe/update-recipe-image`,
  UPDATE_PREP_TIME: `${BASE_URL}/api/recipe/update-prep-time`,
  UPDATE_COOK_TIME: `${BASE_URL}/api/recipe/update-cook-time`,
  UPDATE_NUTRITIONAL_VALUES: `${BASE_URL}/api/recipe/update-nutritional-values`,
  UPDATE_INGREDIENT: `${BASE_URL}/api/recipe/update-ingredient`,
  DELETE_INGREDIENT: `${BASE_URL}/api/recipe/delete-ingredient`,
  UPDATE_INSTRUCTION: `${BASE_URL}/api/recipe/update-instruction`,
  DELETE_INSTRUCTION: `${BASE_URL}/api/recipe/delete-instruction`,
};