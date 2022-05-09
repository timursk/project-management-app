import { ENDPOINTS } from './constants';

export const getColumnUrl = (boardId: string, columnId?: string) =>
  `${ENDPOINTS.BOARDS}/${boardId}${ENDPOINTS.COLUMNS}${columnId ? `/${columnId}` : ''}`;
