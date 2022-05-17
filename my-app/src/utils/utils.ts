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
