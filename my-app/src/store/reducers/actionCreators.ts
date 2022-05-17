import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUserService } from '../../services/deleteUserService';
import { getUserService } from '../../services/getUserService';
import { loginService } from '../../services/loginService';
import { signupService } from '../../services/signupService';
import { updateUserService } from '../../services/updateUserService';
import { LoginUser, SignupUser, UpdateUser } from '../../types/api/authTypes';

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

export const initUser = createAsyncThunk('user/init', async (_, thunkApi) => {
  try {
    const token: string = window.localStorage.getItem('PMA-token');
    if (token) {
      const response = await getUserService(token);
      return { ...response, token };
    }
    return { name: '', login: '', id: '', token: '' };
  } catch (e) {
    const error = e as CustomError;
    return thunkApi.rejectWithValue(error.message);
  }
});

export const logoutUser = createAsyncThunk('user/logout', async (_, thunkApi) => {
  try {
    // TODO add logout request?
    window.localStorage.removeItem('PMA-token');
    return {};
  } catch (e) {
    const error = e as CustomError;
    return thunkApi.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk('user/update', async (user: UpdateUser, thunkApi) => {
  try {
    const response = await updateUserService(user);
    return response;
  } catch (e) {
    const error = e as CustomError;
    return thunkApi.rejectWithValue(error.message);
  }
});

export const deleteUser = createAsyncThunk('user/delete', async (token: string, thunkApi) => {
  try {
    const response = await deleteUserService(token);
    return response;
  } catch (e) {
    const error = e as CustomError;
    return thunkApi.rejectWithValue(error.message);
  }
});
