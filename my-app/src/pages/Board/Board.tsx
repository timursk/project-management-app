import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ColumnAdd from '../../components/ColumnAdd/ColumnAdd';
import { StyledBox, StyledGrid } from './style';
import columnsApi from '../../services/columnsService';
import { getToken } from '../../utils/utils';
import { initOrder } from '../../store/reducers/columnSlice';
import { ColumnResult } from '../../types/api/columnsApiTypes';
import Column from '../../components/Column/Column';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import tasksApi from '../../services/tasksService';
import { GetTaskService } from '../../services/getTaskService';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../types/api/authTypes';

const Board = () => {
  const { id: boardId } = useParams();
  const token = getToken();

  const {
    data: allColumns,
    isSuccess,
    isLoading,
  } = columnsApi.useGetAllColumnsQuery({ token, boardId });

  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const [columns, setColumns] = useState<ColumnResult[]>([]);

  useEffect(() => {
    if (!allColumns || allColumns.length === 0) {
      return;
    }

    const sortedColumns = [...allColumns];
    sortedColumns.sort((a, b) => a.order - b.order);

    setColumns(sortedColumns);
  }, [allColumns]);

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
                  <Column key={column.id} boardId={boardId} column={column} index={index} />
                ))}
              {/* <ColumnAdd boardId={id} order={order} /> */}
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
