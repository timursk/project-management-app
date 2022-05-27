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

export const reorderTasks = (
  tasks: ColumnTask[],
  sourceId: number,
  destId: number,
  isSameColumn: boolean,
  toAdd?: ColumnTask
) => {
  const tasksArr = [...tasks];
  // 1 2
  //addend 1
  //2
  if (isSameColumn) {
    const addend = sourceId < destId ? -1 : 1;

    if (sourceId < destId) {
      return tasksArr.map((task) => {
        let order = task.order;

        if (order === sourceId) {
          order = destId;
        } else if (order <= destId) {
          order = order + addend;
        }

        return {
          ...task,
          order,
        };
      });
    } else if (sourceId > destId) {
      return tasksArr.map((task) => {
        let order = task.order;

        if (order === sourceId) {
          order = destId;
        } else if (order >= destId) {
          order = order + addend;
        }

        return {
          ...task,
          order,
        };
      });
    }

    return tasksArr;
  }

  if (!isSameColumn) {
    if (!toAdd) {
      const deleteIdx = tasksArr.findIndex((task) => task.order === sourceId);
      tasksArr.splice(deleteIdx, 1);

      return tasksArr.map((task) => {
        const order = task.order > sourceId ? task.order - 1 : task.order;
        return {
          ...task,
          order,
        };
      });
    }

    if (toAdd) {
      tasksArr.push(toAdd);

      return tasksArr.map((task) => {
        let order = task.order;
        if (task.order >= toAdd.order && task !== toAdd) {
          order++;
        }

        return {
          ...task,
          order,
        };
      });
    }
  }
};
