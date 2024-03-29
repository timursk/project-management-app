import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  deleteUser,
  initUser,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from './actionCreators';
import { SignupUser, UserInfo } from '../../types/api/authTypes';

interface User {
  name: string;
  login: string;
  isLoading: boolean;
  error: string;
  id: string;
}

const initialState: User = {
  name: '',
  login: '',
  isLoading: false,
  error: '',
  id: '',
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    saveInfo: (state: User, action: PayloadAction<Pick<User, 'name' | 'login'>>) => {
      state.login = action.payload.login;
      state.name = action.payload.name;
    },

    resetInfo: (state: User) => {
      state.login = '';
      state.name = '';
      state.error = '';
      state.id = '';
      state.isLoading = false;
    },
    resetLoading: (state: User) => {
      state.error = '';
      state.isLoading = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.error = '';
    },

    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },

    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [signupUser.fulfilled.type]: (state, action: PayloadAction<SignupUser>) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.isLoading = false;
    },

    [signupUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },

    [signupUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [initUser.fulfilled.type]: (state, action: PayloadAction<UserInfo>) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.id = action.payload.id;
      state.isLoading = false;
      state.error = '';
    },

    [initUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },

    [initUser.rejected.type]: (state) => {
      state.name = '';
      state.login = '';
      state.id = '';
      state.isLoading = false;
    },

    [logoutUser.fulfilled.type]: (state) => {
      state.name = '';
      state.login = '';
      state.error = '';
      state.isLoading = false;
    },

    [logoutUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },

    [logoutUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [deleteUser.fulfilled.type]: (state) => {
      state.name = '';
      state.login = '';
      state.error = '';
      state.isLoading = false;
    },

    [deleteUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },

    [deleteUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    [updateUser.fulfilled.type]: (state, action: PayloadAction<SignupUser>) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.error = '';
      state.isLoading = false;
    },

    [updateUser.pending.type]: (state) => {
      state.isLoading = true;
      state.error = '';
    },

    [updateUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { saveInfo, resetInfo, resetLoading } = userReducer.actions;

export default userReducer.reducer;
