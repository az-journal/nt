import { configureStore } from '@reduxjs/toolkit';
import chainIdReducer from './features/chainIdSlice';
import totalNFTInPoolReducer from './features/totalNFTInPoolSlice';

export const store = configureStore({
    reducer: {
        chainId: chainIdReducer,
        totalNFTInPool: totalNFTInPoolReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
