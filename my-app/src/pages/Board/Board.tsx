import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import ColumnAdd from '../../components/ColumnAdd/ColumnAdd';
import { StyledBox, StyledGrid } from './style';
import columnsApi from '../../services/columnsService';
import { initOrder } from '../../store/reducers/columnSlice';
import { ColumnResult } from '../../types/api/columnsApiTypes';
import { getToken } from '../../utils/utils';
import { useState, useEffect, useCallback } from 'react';
import ColumnComponent from '../../components/ColumnComponent/ColumnComponent';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import tasksApi from '../../services/tasksService';
import boardsApi from '../../services/boardsService';
import { Column, ColumnTask } from '../../types/store/storeTypes';

export type TasksDnd = {
  columnId: string;
  tasks: ColumnTask[];
};

export type BoardTasks = {
  [key: string]: ColumnTask[];
};

const Board = () => {
  const { id: boardId } = useParams();
  const token = getToken();

  const { data: board } = boardsApi.useGetBoardByIdQuery({ token, id: boardId });
  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const [columnsDnd, setColumnsDnd] = useState<Column[]>(null);
  const [tasksDnd, setTasksDnd] = useState<BoardTasks>(null);

  useEffect(() => {
    if (!board || !board?.columns || !board.columns.length) {
      return;
    }

    const newColumns = [...board.columns];
    newColumns.sort((a, b) => a.order - b.order);

    const newTasks: BoardTasks = {};
    newColumns.forEach(({ id, tasks }) => {
      const tasksArr = [...tasks];
      tasksArr.sort((a, b) => a.order - b.order);
      newTasks[id] = tasksArr;
    });

    setColumnsDnd(newColumns);
    setTasksDnd(newTasks);
  }, [board]);

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
    [boardId, columnsDnd, tasksDnd, token, updateColumn, updateTask]
  );

  return (
    <StyledBox>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided) => (
            <StyledGrid
              container
              marginTop={3}
              flexWrap="nowrap"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columnsDnd &&
                columnsDnd.map((column, index) => (
                  <ColumnComponent
                    key={column.id}
                    boardId={boardId}
                    column={column}
                    index={index}
                    tasks={tasksDnd}
                  />
                ))}

              <ColumnAdd boardId={boardId} />

              {provided.placeholder}
            </StyledGrid>
          )}
        </Droppable>
      </DragDropContext>
    </StyledBox>
  );
};

export default Board;
