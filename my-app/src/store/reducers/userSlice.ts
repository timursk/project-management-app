import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import SignupUser from '../../types/api/signupUser';
import Token from '../../types/api/token';
import User from '../../types/store/user';
import { loginUser, signupUser } from './actionCreators';

const initialState = {
  name: '',
  login: '',
  token: '',
  isLoading: false,
  error: '',
};

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    saveInfo: (state, action: PayloadAction<User>) => {
      state.login = action.payload.login;
      state.name = action.payload.name;
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
    },
  },
});

export const { saveInfo } = userReducer.actions;

export default userReducer.reducer;
