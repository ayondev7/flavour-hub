// Bookmark API endpoints
import { BASE_URL } from './config';

export const BOOKMARK_ENDPOINTS = {
  CREATE: `${BASE_URL}/api/bookmark/create`,
  REMOVE: `${BASE_URL}/api/bookmark/remove`,
  GET_BOOKMARKS: `${BASE_URL}/api/bookmark/get-bookmarks`,
};