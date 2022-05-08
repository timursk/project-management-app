import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Board from '../types/store/board';
import { API_URL, ENDPOINTS } from '../utils/constants';

type Token = string;

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getAllBoards: build.query<Board[], Token>({
      query: (jwt) => ({
        url: ENDPOINTS.BOARDS,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }),
    }),
  }),
});
