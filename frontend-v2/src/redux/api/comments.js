// Comment API endpoints
import { BASE_URL } from './config';

export const COMMENT_ENDPOINTS = {
  GET_COMMENTS: `${BASE_URL}/api/comment/get-comments`,
  POST_COMMENT: `${BASE_URL}/api/comment/post-comment`,
  UPDATE_COMMENT: `${BASE_URL}/api/comment/update-comment`,
  DELETE_COMMENT: `${BASE_URL}/api/comment/delete-comment`,
};