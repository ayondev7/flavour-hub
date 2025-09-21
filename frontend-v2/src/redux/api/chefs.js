// Chef/User API endpoints
export const CHEF_ENDPOINTS = {
  GET_ALL_USERS: "get-all-users",
  GET_LEADERBOARD: "get-leaderboard-rankings",
  TOGGLE_FOLLOW: "toggle-follow",
};

// Base URL for chef operations
export const CHEF_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/user`;