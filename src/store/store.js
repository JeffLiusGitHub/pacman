import { configureStore } from '@reduxjs/toolkit';
import robotReducer from './RobotSlice';
import boardReducer from './BoardSlice';
import infoReducer from './InfoSlice';
const store = configureStore({
  reducer: {
    robot: robotReducer,
    board: boardReducer,
    info: infoReducer
  }
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

export default store;
