import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Token from '../types/api/token';
import Task from '../types/store/task';
import { API_URL } from '../utils/constants';
import { getTaskUrl } from '../utils/utils';

type BoardId = { boardId: string };
type ColumnId = { columnId: string };
type TaskId = { taskId: string };

type GetAllTasksArg = BoardId & ColumnId & Token;
type GetTaskByIdArg = BoardId & ColumnId & TaskId & Token;

type CreateTaskArg = Omit<Task, 'id'> & Token;
type UpdateTaskArg = Task & Token;

const tasksApi = createApi({
  reducerPath: 'tasksApi',

  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),

  endpoints: (build) => ({
    getAllTasks: build.query<Task[], GetAllTasksArg>({
      query: ({ boardId, columnId, token }) => ({
        url: getTaskUrl(boardId, columnId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    getTaskById: build.query<Task, GetTaskByIdArg>({
      query: ({ boardId, columnId, taskId, token }) => ({
        url: getTaskUrl(boardId, columnId, taskId),
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),

    createTask: build.query<Task, CreateTaskArg>({
      query: ({ boardId, columnId, token, ...rest }) => ({
        url: getTaskUrl(boardId, columnId),
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { ...rest },
      }),
    }),

    updateTask: build.query<Task, UpdateTaskArg>({
      query: ({ boardId, columnId, id, token, ...rest }) => ({
        url: getTaskUrl(boardId, columnId, id),
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: { ...rest, boardId, columnId },
      }),
    }),

    deleteTask: build.query<null, GetTaskByIdArg>({
      query: ({ boardId, columnId, taskId, token }) => ({
        url: getTaskUrl(boardId, columnId, taskId),
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export default tasksApi;
