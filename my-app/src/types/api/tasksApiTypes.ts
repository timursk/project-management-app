export interface GetAllTasksArg {
  boardId: string;
  columnId: string;
  token: string;
}

export interface GetTaskByIdArg {
  boardId: string;
  columnId: string;
  taskId: string;
  token: string;
}

export interface CreateTaskArg {
  title: string;
  // order: number;
  description: string;
  userId: string;
  // uuid: string;
  boardId: string;
  columnId: string;
  token: string;
}

export interface UpdateTaskArg {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
  token: string;
}
