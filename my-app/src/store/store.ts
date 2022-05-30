import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardsApi from '../services/boardsService';
import columnsApi from '../services/columnsService';
import tasksApi from '../services/tasksService';
import usersApi from '../services/usersService';
import userReducer from './reducers/userSlice';
import columnReducer from './reducers/columnSlice';

const rootReducer = combineReducers({
  userReducer,
  columnReducer,
  [boardsApi.reducerPath]: boardsApi.reducer,
  [columnsApi.reducerPath]: columnsApi.reducer,
  [tasksApi.reducerPath]: tasksApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(boardsApi.middleware)
      .concat(columnsApi.middleware)
      .concat(tasksApi.middleware)
      .concat(usersApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
