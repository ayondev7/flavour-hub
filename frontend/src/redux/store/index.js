import { collectionsApi } from "../hooks/collectionHook";
import { configureStore } from "@reduxjs/toolkit";
import { chefsApi } from "../hooks/chefHook";
import { followApi } from "./followSlice";
import { recipesApi } from "../hooks/recipeHook";
import { bookmarkApi } from "../hooks/bookmarkHook";
import { likesApi } from "../hooks/likesHook";

const store = configureStore({
  reducer: {
    [bookmarkApi.reducerPath]: bookmarkApi.reducer,
    [collectionsApi.reducerPath]: collectionsApi.reducer,
    [chefsApi.reducerPath]: chefsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    [followApi.reducerPath]: followApi.reducer,
    [recipesApi.reducerPath]: recipesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      followApi.middleware,
      chefsApi.middleware,
      recipesApi.middleware,
      bookmarkApi.middleware,
      likesApi.middleware,
      collectionsApi.middleware
    ),
});

export default store;
