import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './collectionSlice';
import { chefsApi } from "./chefSlice";
import { followApi } from './followSlice';
import { recipesApi } from './recipeSlice';
import { bookmarkApi } from './bookmarkSlice';
import {likesApi} from './likesApi';

const store = configureStore({
  reducer: {
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
    collections: collectionReducer,
    [chefsApi.reducerPath]: chefsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(followApi.middleware, chefsApi.middleware,recipesApi.middleware,bookmarkApi.middleware,likesApi.middleware),
});

export default store;
