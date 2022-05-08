import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from '../../services/loginService';
import User from '../../types/api/user';

type CustomError = {
  message: string;
};

export const loginUser = createAsyncThunk('user/login', async (user: User, thunkApi) => {
  try {
    const response = await loginService(user);
    return response;
  } catch (e) {
    const error = e as CustomError;
    return thunkApi.rejectWithValue(error.message);
  }
});
