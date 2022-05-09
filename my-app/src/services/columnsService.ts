import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { API_URL } from '../utils/constants';
import Column from '../types/store/column';
import Token from '../types/api/token';
import { getColumnUrl } from '../utils/utils';

type BoardId = { boardId: string };
type ColumnId = { columnId: string };

type ColumnResult = Omit<Column, 'tasks'>;

type GetAllColumnsArg = BoardId & Token;
type GetColumnByIdArg = BoardId & ColumnId & Token;

type CreateColumnArg = BoardId & Pick<Column, 'title' | 'order'> & Token;
type CreateColumnRes = BoardId & Pick<Column, 'title' | 'order'>;

type UpdateColumnArg = BoardId & ColumnId & Pick<Column, 'title' | 'order'> & Token;

const columnsApi = createApi({
  reducerPath: 'columnsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (build) => ({
    getAllColumns: build.query<ColumnResult[], GetAllColumnsArg>({
      query: ({ boardId, token }) => ({
        url: getColumnUrl(boardId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getColumnById: build.query<Column, GetColumnByIdArg>({
      query: ({ boardId, columnId, token }) => ({
        url: getColumnUrl(boardId, columnId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createColumn: build.mutation<CreateColumnRes, CreateColumnArg>({
      query: ({ title, order, boardId, token }) => ({
        url: getColumnUrl(boardId),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { title, order },
      }),
    }),

    updateColumn: build.mutation<ColumnResult, UpdateColumnArg>({
      query: ({ title, order, columnId, boardId, token }) => ({
        url: getColumnUrl(boardId, columnId),
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { title, order },
      }),
    }),

    deleteColumn: build.mutation<null, GetColumnByIdArg>({
      query: ({ columnId, boardId, token }) => ({
        url: getColumnUrl(boardId, columnId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export default columnsApi;
