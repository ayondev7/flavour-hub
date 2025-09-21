// Like API endpoints
export const LIKE_ENDPOINTS = {
  GET_LIKES: "get-likes",
  TOGGLE_LIKE: "toggle-like",
};

// Base URL for like operations
export const LIKE_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/like`;