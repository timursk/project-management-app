import { userAPI } from './../../services/userService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SignupUser, Token, UserInfo } from '../../types/api/authTypes';
import { initUser, loginUser, logoutUser, signupUser } from './actionCreators';

interface User {
  name: string;
  login: string;
  token: string;
  isLoading: boolean;
  error: string;
  userId?: string;
}

const initialState: User = {
  name: '',
  login: '',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOWRmZmVkZi1jMjY2LTRiMGItODA3Yi05ZGM0MTEzZGJiYTkiLCJsb2dpbiI6ImRtaXRyaXkiLCJpYXQiOjE2NTI2MDk3NjR9.TIYdZxYQDZxb1-CbdHmqz6JsgofRRyNrrzD5UU5c-ys',
  isLoading: false,
  error: '',
  userId: '',
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
      state.token = '';
      state.isLoading = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled.type]: (state, action: PayloadAction<Token>) => {
      state.token = action.payload.token;
      state.isLoading = false;
      state.error = '';
    },

    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
    },

    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [signupUser.fulfilled.type]: (state, action: PayloadAction<SignupUser>) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
    },

    [signupUser.pending.type]: (state) => {
      state.isLoading = true;
    },

    [signupUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [initUser.fulfilled.type]: (state, action: PayloadAction<UserInfo>) => {
      state.name = action.payload.name;
      state.login = action.payload.login;
      state.token = action.payload.token;
    },

    [initUser.pending.type]: (state) => {
      state.isLoading = true;
    },

    [initUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    [logoutUser.fulfilled.type]: (state) => {
      state.name = '';
      state.login = '';
      state.token = '';
    },

    [logoutUser.pending.type]: (state) => {
      state.isLoading = true;
    },

    [logoutUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { saveInfo, resetInfo } = userReducer.actions;

export default userReducer.reducer;
