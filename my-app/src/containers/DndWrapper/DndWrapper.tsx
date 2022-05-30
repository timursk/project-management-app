import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import columnsApi from '../../services/columnsService';
import tasksApi from '../../services/tasksService';
import { Column } from '../../types/store/storeTypes';
import { getToken } from '../../utils/utils';
import { BoardTasks } from '../../pages/Board/Board';

type Props = {
  columnsDnd: Column[];
  setColumnsDnd: Dispatch<SetStateAction<Column[]>>;
  tasksDnd: BoardTasks;
  setTasksDnd: Dispatch<SetStateAction<BoardTasks>>;
  boardId: string;
  children?: React.ReactNode;
};

const DndWrapper: FC<Props> = ({
  columnsDnd,
  setColumnsDnd,
  tasksDnd,
  setTasksDnd,
  boardId,
  children,
}) => {
  const token = getToken();
  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const onDragEnd = useCallback(
    ({ destination, source, draggableId, type }: DropResult) => {
      if (
        !destination ||
        (destination.droppableId === source.droppableId && destination.index === source.index)
      ) {
        return;
      }

      const order = destination.index + 1;

      if (type === 'column') {
        const newColumns = [...columnsDnd];
        const { title } = newColumns[source.index];

        const [removed] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, removed);

        updateColumn({
          boardId,
          columnId: draggableId,
          title,
          order,
          token,
        });

        setColumnsDnd(newColumns);
        return;
      }

      if (type === 'task') {
        const newTasksDnd = { ...tasksDnd };
        const sourceList = newTasksDnd[source.droppableId].slice();
        const destList = newTasksDnd[destination.droppableId].slice();
        const { title, description, userId } = sourceList.find((task) => task.id === draggableId);
        const [removed] = sourceList.splice(source.index, 1);

        if (source.droppableId === destination.droppableId) {
          sourceList.splice(destination.index, 0, removed);

          newTasksDnd[source.droppableId] = sourceList;
        } else {
          destList.splice(destination.index, 0, removed);

          newTasksDnd[source.droppableId] = sourceList;
          newTasksDnd[destination.droppableId] = destList;
        }

        setTasksDnd(newTasksDnd);

        updateTask({
          id: draggableId,
          title,
          order,
          description,
          userId,
          boardId,
          columnId: source.droppableId,
          newColumnId: destination.droppableId,
          token,
        });
        return;
      }
    },
    [boardId, columnsDnd, setColumnsDnd, setTasksDnd, tasksDnd, token, updateColumn, updateTask]
  );

  return <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>;
};

export default DndWrapper;
