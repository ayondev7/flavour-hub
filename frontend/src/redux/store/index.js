import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collectionSlice';
import { chefsApi } from "./chefSlice";
import { followApi } from './followSlice'; // Import the RTK Query API slice
import { recipesApi } from './recipeSlice';
import { bookmarkApi } from './bookmarkSlice';

const store = configureStore({
  reducer: {
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
    collections: collectionReducer,
    [chefsApi.reducerPath]: chefsApi.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // Combine all middlewares in a single call
    getDefaultMiddleware().concat(followApi.middleware, chefsApi.middleware,recipesApi.middleware,bookmarkApi.middleware),
});

export default store;
