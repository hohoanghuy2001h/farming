import { configureStore } from '@reduxjs/toolkit';
import fieldReducer from './fieldReducer';
import userReducer from './userReducer';
import feedReducer from './feedReducer'
import controllerReducer from './controllerReducer'
export const store = configureStore({
  reducer: {
    field: fieldReducer,
    user: userReducer,
    feed: feedReducer,
    controller: controllerReducer,
  },
  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch