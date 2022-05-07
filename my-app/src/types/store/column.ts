import ColumnTask from './columnTask';

interface Column {
  id: string;
  title: string;
  order: number;
  tasks: ColumnTask[];
}

export default Column;
