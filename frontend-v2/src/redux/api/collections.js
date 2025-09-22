// Collection API endpoints
import { BASE_URL } from './config';

export const COLLECTION_ENDPOINTS = {
  CREATE: `${BASE_URL}/api/collections/create`,
  GET_ALL: `${BASE_URL}/api/collections/get-all`,
  GET_BY_USER: `${BASE_URL}/api/collections/get-collections`,
};