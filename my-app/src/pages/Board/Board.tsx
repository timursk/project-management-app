import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ColumnAdd from '../../components/ColumnAdd/ColumnAdd';
import { StyledBox, StyledGrid } from './style';
import columnsApi from '../../services/columnsService';
import { initOrder } from '../../store/reducers/columnSlice';
import { getToken, reorderTasks } from '../../utils/utils';
import { ColumnResult } from '../../types/api/columnsApiTypes';
import ColumnComponent from '../../components/ColumnComponent/ColumnComponent';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import tasksApi from '../../services/tasksService';
import { GetTaskService } from '../../services/getTaskService';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../types/api/authTypes';
import boardsApi from '../../services/boardsService';
import { Column } from '../../types/store/storeTypes';

const Board = () => {
  const { id: boardId } = useParams();
  const token = getToken();

  // const {
  //   data: allColumns,
  //   isSuccess,
  //   isLoading,
  // } = columnsApi.useGetAllColumnsQuery({ token, boardId });
  const { data: board } = boardsApi.useGetBoardByIdQuery({ token, id: boardId });

  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const [columns, setColumns] = useState<Column[]>([]);

  useEffect(() => {
    if (!board || board.columns.length === 0) {
      return;
    }

    const sortedColumns = [...board.columns];
    sortedColumns.sort((a, b) => a.order - b.order);
    setColumns(sortedColumns);
  }, [board]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    if (type === 'column') {
      const newColumns = [...columns];

      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);

      updateColumn({
        boardId,
        columnId: draggableId,
        title: columns[source.index].title,
        order: ++destination.index,
        token,
      });

      setColumns(newColumns);
      return;
    }

    if (type === 'task') {
      const { userId }: DecodedToken = jwt_decode(token);
      const order = destination.index + 1;

      GetTaskService({
        token,
        boardId,
        columnId: source.droppableId,
        taskId: draggableId,
      }).then(({ title, description }) => {
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
      });

      const newColumns = [...columns];

      const sourceIdx = newColumns.findIndex((column) => column.id === source.droppableId);
      const destIdx = newColumns.findIndex((column) => column.id === destination.droppableId);

      const sourceTaskIdx = newColumns[sourceIdx].tasks.findIndex(
        (task) => task.order === source.index + 1
      );
      const destTaskIdx = newColumns[sourceIdx].tasks.findIndex(
        (task) => task.order === destination.index + 1
      );

      console.log(source.index, destination.index);
      console.log(source.droppableId === destination.droppableId);
      const toAddTask = newColumns[sourceIdx].tasks[sourceTaskIdx];
      const sourceColumn = { ...newColumns[sourceIdx] };
      const destColumn = { ...newColumns[destIdx] };

      sourceColumn.tasks = reorderTasks(
        sourceColumn.tasks,
        source.index + 1,
        destination.index + 1,
        source.droppableId === destination.droppableId
      );
      destColumn.tasks = reorderTasks(
        destColumn.tasks,
        source.index + 1,
        destination.index + 1,
        source.droppableId === destination.droppableId,
        toAddTask
      );

      newColumns[sourceIdx] = sourceColumn;
      newColumns[destIdx] = destColumn;

      console.log('result', newColumns);
      setColumns(newColumns);
      // newColumns[sourceIdx].tasks[sourceTaskIdx].order =
      // const [removed] = newColumns.splice(source.index, 1);
      // newColumns.splice(destination.index, 0, removed);

      return;
    }
  };

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
              {columns &&
                columns.map((column, index) => (
                  <ColumnComponent
                    key={column.id}
                    boardId={boardId}
                    column={column}
                    index={index}
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
