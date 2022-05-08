import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { boardsApi } from '../services/boardsService';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
  userReducer,
  [boardsApi.reducerPath]: boardsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(boardsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
