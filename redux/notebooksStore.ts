import { configureStore } from "@reduxjs/toolkit";
import notebooksReducer, { notebooksAdapter } from "./notebooksSlice";
import sectionsReducer, { sectionsAdapter } from "./sectionsSlice";

export const store = configureStore({
  reducer: {
    notebooks: notebooksReducer,
    sections: sectionsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const notebooksSelectors = notebooksAdapter.getSelectors<RootState>(
  (state) => state.notebooks
);
export const sectionsSelectors = sectionsAdapter.getSelectors<RootState>(
  (state) => state.sections
);
