import Board from './board';
import Column from './column';
import Task from './task';
import User from './user';

interface InitialState {
  user: User;
  boards: Board[];
  columns: Column[];
  tasks: Task[];
}

export default InitialState;
