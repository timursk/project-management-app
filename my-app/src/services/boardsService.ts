import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { Token } from '../types/api/authTypes';
import {
  GetBoardArg,
  BoardResult,
  CreateBoardArg,
  UpdateBoardArg,
} from '../types/api/boardsApiTypes';
import { Board } from '../types/store/storeTypes';
import { API_URL, ENDPOINTS } from '../utils/constants';

const boardsApi = createApi({
  reducerPath: 'boardsApi',

  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

  tagTypes: ['Board'],

  endpoints: (build) => ({
    getAllBoards: build.query<Board[], Token>({
      query: ({ token }) => ({
        url: ENDPOINTS.BOARDS,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: () => ['Board'],
    }),

    getBoardById: build.query<Board, GetBoardArg>({
      query: ({ id, token }) => ({
        url: `${ENDPOINTS.BOARDS}/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createBoard: build.mutation<BoardResult, CreateBoardArg>({
      query: ({ title, token }) => ({
        url: ENDPOINTS.BOARDS,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { title },
      }),
      invalidatesTags: ['Board'],
    }),

    updateBoard: build.mutation<BoardResult, UpdateBoardArg>({
      query: ({ id, title, token }) => ({
        url: `${ENDPOINTS.BOARDS}/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { title },
      }),
      invalidatesTags: ['Board'],
    }),

    deleteBoard: build.mutation<null, GetBoardArg>({
      query: ({ id, token }) => ({
        url: `${ENDPOINTS.BOARDS}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['Board'],
    }),
  }),
});

export default boardsApi;
