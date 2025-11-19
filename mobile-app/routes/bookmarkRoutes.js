import { BASE_URL } from './index';

export const bookmarkRoutes = {
  create: `${BASE_URL}/bookmark/create`,
  remove: (recipeId) => `${BASE_URL}/bookmark/remove/${recipeId}`,
  getBookmarks: (collectionId) => `${BASE_URL}/bookmark/get-bookmarks/${collectionId}`,
};
