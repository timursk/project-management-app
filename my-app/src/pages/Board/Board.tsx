import { Grid } from '@mui/material';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ColumnAdd from '../../components/ColumnAdd/ColumnAdd';
import { StyledBox, StyledGrid } from './style';
import columnsApi from '../../services/columnsService';
import { initOrder } from '../../store/reducers/columnSlice';
import { ColumnResult } from '../../types/api/columnsApiTypes';
import { getToken } from '../../utils/utils';
import { useState, useEffect } from 'react';
import ColumnComponent from '../../components/ColumnComponent/ColumnComponent';
import { Droppable } from 'react-beautiful-dnd';
import boardsApi from '../../services/boardsService';
import { Column, ColumnTask } from '../../types/store/storeTypes';
import DndWrapper from '../../components/DndWrapper/DndWrapper';

export type BoardTasks = {
  [key: string]: ColumnTask[];
};

const Board = () => {
  const { id: boardId } = useParams();
  const token = getToken();
  const navigate = useNavigate();

  const { data: board, refetch } = boardsApi.useGetBoardByIdQuery({ token, id: boardId });
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

  useEffect(() => {
    if (!token) navigate('/welcome');
  }, [token]);

  return (
    <StyledBox>
      <DndWrapper
        columnsDnd={columnsDnd}
        setColumnsDnd={setColumnsDnd}
        tasksDnd={tasksDnd}
        setTasksDnd={setTasksDnd}
        boardId={boardId}
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {(provided, snapshot) => (
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
                    refetch={refetch}
                  />
                ))}

              <ColumnAdd snapshot={snapshot} boardId={boardId} refetch={refetch} />

              {provided.placeholder}
            </StyledGrid>
          )}
        </Droppable>
      </DndWrapper>
    </StyledBox>
  );
};

export default Board;
