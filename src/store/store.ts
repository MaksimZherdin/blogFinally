import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";

import articleCreateSlicer from "./slices/articleCreateSlicer";
import articleSlicer from "./slices/articleSlicer";
import articlePageSlicer from "./slices/articlePageSlicer";
import paginationSlicer from "./slices/paginationSlicer";
import userSlicer from "./slices/userSlicer";

const rootReducer = combineReducers({
  articleSlicer,
  articlePageSlicer,
  articleCreateSlicer,
  paginationSlicer,
  userSlicer,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export const storeSetup = () =>
  configureStore({
    reducer: rootReducer,
    middleware: () => customizedMiddleware,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof storeSetup>;
export type AppDispatch = AppStore["dispatch"];
