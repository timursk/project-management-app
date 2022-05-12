import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  ColumnResult,
  GetAllColumnsArg,
  GetColumnByIdArg,
  CreateColumnRes,
  CreateColumnArg,
  UpdateColumnArg,
} from '../types/api/columnsApiTypes';
import { Column } from '../types/store/storeTypes';
import { API_URL } from '../utils/constants';
import { getColumnUrl } from '../utils/utils';

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
