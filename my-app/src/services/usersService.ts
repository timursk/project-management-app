import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Token, UserInfo } from '../types/api/authTypes';
import { API_URL, ENDPOINTS } from '../utils/constants';

interface GetUserByIdArg extends Token {
  userId: string;
}

const usersApi = createApi({
  reducerPath: 'usersApi',

  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

  endpoints: (build) => ({
    getAllUsers: build.query<UserInfo[], Token>({
      query: ({ token }) => ({
        url: `${API_URL}${ENDPOINTS.USERS}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getUserById: build.query<UserInfo, GetUserByIdArg>({
      query: ({ userId, token }) => ({
        url: `${API_URL}${ENDPOINTS.USERS}/${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export default usersApi;
