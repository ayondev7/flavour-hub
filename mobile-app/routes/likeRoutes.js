import { BASE_URL } from './index';

export const likeRoutes = {
  toggleLike: `${BASE_URL}/like/toggle-like`,
  getLikes: (recipeId, userId) => `${BASE_URL}/like/get-likes/${recipeId}/${userId}`,
};
