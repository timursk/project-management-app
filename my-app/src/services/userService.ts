import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { LoginUser, SignupUser, Token } from '../types/api/authTypes';
import { UserChange, UserDelete } from '../types/api/userApiType';
import { API_URL, ENDPOINTS } from '../utils/constants';

export const userAPI = createApi({
  reducerPath: 'userAPI',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    updateUser: build.mutation<SignupUser, UserChange>({
      query: ({ login, name, userId, token, password }) => ({
        url: `${ENDPOINTS.USERS}/${userId}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { login, name, password },
      }),
    }),
    deleteUser: build.mutation<SignupUser, UserDelete>({
      query: ({ userId, token }) => ({
        url: `${ENDPOINTS.USERS}/${userId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useDeleteUserMutation } = userAPI;
