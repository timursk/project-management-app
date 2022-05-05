import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Language from '../../types/store/language';
import { initialState } from '../initialState';
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

//actions
export const { changeLanguage } = appReducer.actions;
//selectors
export const selectLanguage = (state: RootState) => state.appReducer.language;

export default appReducer.reducer;
