import { BASE_URL } from './index';

export const collectionRoutes = {
  create: `${BASE_URL}/collections/create`,
  getCollections: (userId) => `${BASE_URL}/collections/get-collections/${userId}`,
};
