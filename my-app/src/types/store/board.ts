import Column from './column';

interface Board {
  id: string;
  title: string;
  columns: Column[];
}

export default Board;
