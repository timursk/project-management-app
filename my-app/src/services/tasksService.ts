import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import {
  GetAllTasksArg,
  GetTaskByIdArg,
  CreateTaskArg,
  UpdateTaskArg,
} from '../types/api/tasksApiTypes';
import { Task } from '../types/store/storeTypes';
import { API_URL } from '../utils/constants';
import { getTaskUrl } from '../utils/utils';

const tasksApi = createApi({
  reducerPath: 'tasksApi',

  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

  tagTypes: ['TaskList'],
  endpoints: (build) => ({
    getAllTasks: build.query<Task[], GetAllTasksArg>({
      query: ({ boardId, columnId, token }) => ({
        url: getTaskUrl(boardId, columnId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['TaskList'],
    }),

    getTaskById: build.query<Task, GetTaskByIdArg>({
      query: ({ boardId, columnId, taskId, token }) => ({
        url: getTaskUrl(boardId, columnId, taskId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ['TaskList'],
    }),

    createTask: build.mutation<Task, CreateTaskArg>({
      query: ({ boardId, columnId, token, ...rest }) => ({
        url: getTaskUrl(boardId, columnId),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { ...rest },
      }),

      invalidatesTags: ['TaskList'],
    }),

    updateTask: build.mutation<Task, UpdateTaskArg>({
      query: ({ boardId, columnId, id, token, ...rest }) => ({
        url: getTaskUrl(boardId, columnId, id),
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { ...rest, boardId, columnId },
      }),
      invalidatesTags: ['TaskList'],
    }),

    deleteTask: build.mutation<null, GetTaskByIdArg>({
      query: ({ boardId, columnId, taskId, token }) => ({
        url: getTaskUrl(boardId, columnId, taskId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ['TaskList'],
    }),
  }),
});

export default tasksApi;
