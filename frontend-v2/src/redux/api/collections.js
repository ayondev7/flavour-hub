// Collection API endpoints
export const COLLECTION_ENDPOINTS = {
  CREATE: "create",
  GET_ALL: "get-all",
  GET_BY_USER: "get-collections",
};

// Base URL for collection operations
export const COLLECTION_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/api/collections`;