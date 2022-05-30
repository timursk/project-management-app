import React, { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { getToken } from '../../utils/utils';
import ColumnDelete from '../ColumnDelete/ColumnDelete';
import UpdateColumn from '../ColumnUpdate/UpdateColumn';
import AddTaskForm from '../TaskComponents/AddTaskForm';
import { StyledColumnCard, StyledBox, StyledTitle } from './style';
import TaskList from '../TasksList/TaskList';
import { Column } from '../../types/store/storeTypes';
import { BoardTasks } from '../../pages/Board/Board';

interface ColumnProps {
  boardId: string;
  column: Column;
  index: number;
  tasks: BoardTasks;
  refetch: () => void;
}

const ColumnComponent: FC<ColumnProps> = ({ boardId, column, index, tasks, refetch }) => {
  const token = getToken();
  const { id: columnId, title } = column;
  const sortedTasks = tasks[columnId];

  const [isEdit, setEdit] = useState(false);
  const [textValue, setText] = useState(title);

  return (
    <Draggable draggableId={columnId} index={index}>
      {(provided) => (
        <StyledColumnCard
          id={columnId}
          item
          onClick={(e) => {
            e.currentTarget === e.target && setEdit(false);
          }}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <StyledBox {...provided.dragHandleProps}>
            {isEdit ? (
              <UpdateColumn
                boardId={boardId}
                currentId={columnId}
                column={column}
                handlerSetEdit={setEdit}
                handlerSetText={setText}
                textValue={textValue}
                refetch={refetch}
              />
            ) : (
              <StyledTitle
                variant="h6"
                onClick={() => {
                  setEdit(true);
                }}
              >
                {textValue}
              </StyledTitle>
            )}
            <ColumnDelete id={columnId} token={token} boardId={boardId} refetch={refetch} />
          </StyledBox>

          <TaskList
            boardId={boardId}
            columnId={columnId}
            sortedTasks={sortedTasks}
            refetch={refetch}
          />

          <AddTaskForm boardId={boardId} columnId={columnId} refetch={refetch} />
        </StyledColumnCard>
      )}
    </Draggable>
  );
};

export default React.memo(ColumnComponent);
