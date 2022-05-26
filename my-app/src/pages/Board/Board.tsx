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
import { Task } from '../../types/store/storeTypes';
import { GetTasksService } from '../../services/getTasksService';

export interface IColumn extends ColumnResult {
  tasks: Task[];
}

const Board = () => {
  const { id: boardId } = useParams();
  const token = getToken();

  // const { order } = useAppSelector((state) => state.columnReducer);
  // const dispatch = useAppDispatch();
  const {
    data: allColumns,
    isSuccess,
    isLoading,
  } = columnsApi.useGetAllColumnsQuery({ token, boardId });

  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const [columns, setColumns] = useState<IColumn[]>([]);
  // const [idColumns, setId] = useState<string[]>([]);
  useEffect(() => {
    // isSuccess && dispatch(initOrder(parseInt(data.length.toString()) + 1));
    const getAllTasks = (columns: ColumnResult[]) => {
      const requestsList: Promise<Task[]>[] = [];

      columns.forEach((column) => {
        const columnId = column.id;
        requestsList.push(GetTasksService({ boardId, columnId, token }));
      });

      return requestsList;
    };

    if (!allColumns || allColumns.length === 0) {
      return;
    }

    const sortedColumns = [...allColumns];
    sortedColumns.sort((a, b) => a.order - b.order);
    const tasksPromiseList = getAllTasks(sortedColumns);

    Promise.allSettled(tasksPromiseList).then((tasksList) => {
      const newColumns: IColumn[] = [];

      tasksList.forEach((result, idx) => {
        if (result.status === 'rejected') {
          return;
        }

        const column = {
          ...sortedColumns[idx],
          tasks: result.value,
        };

        newColumns.push(column);
      });

      setColumns(newColumns);
    });
  }, [allColumns, boardId, token]);

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
    console.log(result);
    if (type === 'task') {
      GetTaskService({
        token,
        boardId,
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
          boardId,
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
              {columns &&
                columns.map((column, index) => (
                  <Column
                    key={column.id}
                    boardId={boardId}
                    column={column}
                    index={index}
                    // columnId={column.id}
                    // title={column.title}
                  />
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
