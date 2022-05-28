import { Board, ColumnTask } from '../types/store/storeTypes';
import { ENDPOINTS } from './constants';

export const getColumnUrl = (boardId: string, columnId?: string) =>
  `${ENDPOINTS.BOARDS}/${boardId}${ENDPOINTS.COLUMNS}${columnId ? `/${columnId}` : ''}`;

export const getTaskUrl = (boardId: string, columnId: string, taskId?: string) =>
  `${ENDPOINTS.BOARDS}/${boardId}${ENDPOINTS.COLUMNS}/${columnId}${ENDPOINTS.TASKS}${
    taskId ? `/${taskId}` : ''
  }`;

export const getToken = () => {
  const token = window.localStorage.getItem('token');
  return token;
};

export const setToken = (token: string) => {
  window.localStorage.setItem('token', token);
};

export const removeToken = () => {
  window.localStorage.removeItem('token');
};

export const sleep = async (ms: number) => {
  await new Promise((r) => setTimeout(r, ms));
};

export const filterByTitle = (data: Board[], value: string) => {
  const result = data.filter(({ title }) => {
    return title.toLowerCase().includes(value.toLowerCase());
  });

  return result;
};
