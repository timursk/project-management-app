import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Token from '../../types/api/token';
import User from '../../types/store/user';
import { initialState } from '../initialState';
import { RootState } from '../store';
import { loginUser } from './actionCreators';

const initialAppState = initialState.user;

const userReducer = createSlice({
  name: 'userReducer',
  initialState: initialAppState,
  reducers: {
    saveInfo: (state, action: PayloadAction<User>) => {
      state.login = action.payload.login;
      state.name = action.payload.name;
    },
  },
  extraReducers: {
    [loginUser.fulfilled.type]: (state, action: PayloadAction<Token>) => {
      state.name = action.payload.token;
    },
    [loginUser.pending.type]: (state) => {
      state.name = 'LOADING';
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

//actions
export const { saveInfo } = userReducer.actions;
//selectors
export const selectName = (state: RootState) => state.userReducer.name;
export const selectLogin = (state: RootState) => state.userReducer.login;

export default userReducer.reducer;
