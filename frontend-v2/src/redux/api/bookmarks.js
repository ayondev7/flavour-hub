// Bookmark API endpoints
export const BOOKMARK_ENDPOINTS = {
  CREATE: "bookmark/create",
  REMOVE: "bookmark/remove",
  GET_BOOKMARKS: "bookmark/get-bookmarks",
};

// Base URL for bookmark operations
export const BOOKMARK_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/`;