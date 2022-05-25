import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface ColumnState {
  order: number;
}
const initialState: ColumnState = {
  order: 0,
};

const columnReducer = createSlice({
  name: 'columnReducer',
  initialState,
  reducers: {
    initOrder(state, action: PayloadAction<number>) {
      state.order = action.payload;
    },
    setOrder(state, action: PayloadAction<number>) {
      state.order = state.order + action.payload;
    },
  },
});

export const { setOrder, initOrder } = columnReducer.actions;

export default columnReducer.reducer;
