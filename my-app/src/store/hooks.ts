import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';

//common
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//selectors
export const selectUser = (state: RootState) => state.userReducer;
export const selectBoards = (state: RootState) => state.boardsApi;
export const selectColumns = (state: RootState) => state.columnsApi;
export const selectTasks = (state: RootState) => state.tasksApi;

//EXAMPLE: useAppSelector(selectUser());
