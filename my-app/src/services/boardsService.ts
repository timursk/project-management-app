import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Token from '../types/api/token';
import Board from '../types/store/board';
import { API_URL, ENDPOINTS } from '../utils/constants';

type BoardResult = Pick<Board, 'title' | 'id'>;

type CreateBoardArg = Pick<Board, 'title'> & Token;
type UpdateBoardArg = Pick<Board, 'title' | 'id'> & Token;
type GetBoardArg = Pick<Board, 'id'> & Token;

const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getAllBoards: build.query<Board[], Token>({
      query: ({ token }) => ({
        url: ENDPOINTS.BOARDS,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
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
    }),

    updateBoard: build.mutation<BoardResult, UpdateBoardArg>({
      query: ({ id, title, token }) => ({
        url: `${ENDPOINTS.BOARDS}/${id}`,
        method: 'UPDATE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { title },
      }),
    }),

    deleteBoard: build.mutation<null, GetBoardArg>({
      query: ({ id, token }) => ({
        url: `${ENDPOINTS.BOARDS}/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export default boardsApi;
