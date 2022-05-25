export interface BoardResult {
  id: string;
  title: string;
}

export interface CreateBoardArg {
  title: string;
  description: string;
  token: string;
}

export interface UpdateBoardArg {
  id: string;
  title: string;
  description: string;
  token: string;
}

export interface GetBoardArg {
  id: string;
  token: string;
}
