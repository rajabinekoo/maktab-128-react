import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, type Reducer } from "@reduxjs/toolkit";

import { counterReducer } from "./slices/counterSlice";
import { contactsReducer } from "./slices/contactSlice";

const persistConfig = { key: "contacts-slice", storage };

export const reduxStore = configureStore({
  reducer: {
    counter: counterReducer,
    contacts: persistReducer(
      persistConfig,
      contactsReducer
    ) as unknown as Reducer<IContactSliceState>,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const reduxPersistor = persistStore(reduxStore);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
