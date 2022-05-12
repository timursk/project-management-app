export interface ColumnResult {
  id: string;
  title: string;
  order: number;
}

export interface GetAllColumnsArg {
  boardId: string;
  token: string;
}

export interface GetColumnByIdArg {
  boardId: string;
  columnId: string;
  token: string;
}

export interface CreateColumnArg {
  boardId: string;
  title: string;
  order: number;
  token: string;
}

export interface CreateColumnRes {
  boardId: string;
  title: string;
  order: number;
}

export interface UpdateColumnArg {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  token: string;
}
