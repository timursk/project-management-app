import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginService } from '../../services/loginService';
import { signupService } from '../../services/signupService';
import { LoginUser, SignupUser } from '../../types/api/authTypes';

type CustomError = {
  message: string;
};

export const loginUser = createAsyncThunk('user/login', async (user: LoginUser, thunkApi) => {
  try {
    const response = await loginService(user);
    window.localStorage.setItem('PMA-token', response.token);
    return response;
  } catch (e) {
    const error = e as CustomError;
    return thunkApi.rejectWithValue(error.message);
  }
});

export const signupUser = createAsyncThunk('user/signup', async (user: SignupUser, thunkApi) => {
  try {
    const response = await signupService(user);
    return response;
  } catch (e) {
    const error = e as CustomError;
    return thunkApi.rejectWithValue(error.message);
  }
});
