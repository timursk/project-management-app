import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState, Language } from '../initialState';
import { RootState } from '../store';

const initialAppState = initialState.app;

const appReducer = createSlice({
  name: 'appReducer',
  initialState: initialAppState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { changeLanguage } = appReducer.actions;

export const selectLanguage = (state: RootState) => state.appReducer.language;

export default appReducer.reducer;
