import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ColumnAdd from '../../components/ColumnAdd/ColumnAdd';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
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
  const { id } = useParams();
  const token = getToken();

  const { order } = useAppSelector((state) => state.columnReducer);
  const dispatch = useAppDispatch();

  const { data, isSuccess, isLoading } = columnsApi.useGetAllColumnsQuery({ token, boardId: id });

  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const [sortData, setData] = useState<ColumnResult[]>(data);
  const [idColumns, setId] = useState<string[]>([]);

  useEffect(() => {
    isSuccess && dispatch(initOrder(parseInt(data.length.toString()) + 1));

    if (data) {
      const sData = [...data];
      sData.sort((a, b) => a.order - b.order);

      setData(sData);
    }
  }, [data]);

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId, type } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    ) {
      return;
    }

    if (type === 'column') {
      const newColumns = [...sortData];

      const [removed] = newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, removed);

      updateColumn({
        boardId: id,
        columnId: draggableId,
        title: sortData[source.index].title,
        order: ++destination.index,
        token,
      });

      setData(newColumns);

      return;
    }
    console.log(result);
    if (type === 'task') {
      GetTaskService({
        token,
        boardId: id,
        columnId: source.droppableId,
        taskId: draggableId,
      }).then((task) => {
        const { userId }: DecodedToken = jwt_decode(token);

        updateTask({
          id: draggableId,
          title: task.title,
          order: ++destination.index,
          description: task.description,
          userId,
          boardId: id,
          columnId: source.droppableId,
          newColumnId: destination.droppableId,
          token,
        });
      });

      // const [removed] = sourceColumn.tasks.splice(source.index, 1);
      // destColumn.tasks.splice(destination.index, 0, removed);

      // const newColumns = [...columns];
      // newColumns[sourceIdx] = sourceColumn;
      // newColumns[destIdx] = destColumn;

      // setColumns(newColumns);

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
              {sortData &&
                sortData.map((column, index) => (
                  <Column
                    key={column.id}
                    boardId={id}
                    columnId={column.id}
                    title={column.title}
                    index={index}
                  />
                ))}
              <ColumnAdd boardId={id} order={order} />

              {provided.placeholder}
            </StyledGrid>
          )}
        </Droppable>
      </DragDropContext>
    </StyledBox>
  );
};

export default Board;
