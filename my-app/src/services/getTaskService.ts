import { API_URL, ENDPOINTS } from '../utils/constants';
import { Task } from '../types/store/storeTypes';
import { getTaskUrl } from '../utils/utils';

type TaskServiceArg = {
  token: string;
  boardId: string;
  columnId: string;
  taskId: string;
};
type GetTaskService = (arg: TaskServiceArg) => Promise<Task>;

export const GetTaskService: GetTaskService = async ({ token, boardId, columnId, taskId }) => {
  const url = API_URL + getTaskUrl(boardId, columnId, taskId);

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 404) throw new Error('User not found');
  if (response.status !== 200) throw new Error('Unknown error');
  return response.json();
};
