import { BASE_URL } from './index';

export const commentRoutes = {
  postComment: `${BASE_URL}/comment/post-comment`,
  getComments: (recipeId) => `${BASE_URL}/comment/get-comments/${recipeId}`,
  updateComment: `${BASE_URL}/comment/update-comments`,
  deleteComment: `${BASE_URL}/comment/delete-comments`,
  getNotifications: (userId) => `${BASE_URL}/comment/get-notifications/${userId}`,
};
