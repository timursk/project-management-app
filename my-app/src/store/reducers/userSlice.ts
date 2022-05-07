import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../types/store/user';
import { initialState } from '../initialState';
import { RootState } from '../store';

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
});

//actions
export const { saveInfo } = userReducer.actions;
//selectors
export const selectName = (state: RootState) => state.userReducer.name;
export const selectLogin = (state: RootState) => state.userReducer.login;

export default userReducer.reducer;
