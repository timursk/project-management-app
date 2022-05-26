import React, { FC, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import columnsApi from '../../services/columnsService';
import tasksApi from '../../services/tasksService';
import { getToken } from '../../utils/utils';
import ColumnDelete from '../ColumnDelete/ColumnDelete';
import UpdateColumn from '../ColumnUpdate/UpdateColumn';
import AddTaskForm from '../task-components/TaskCard/AddTaskForm';
import TaskCard from '../task-components/TaskCard/TaskCard';
import { StyledColumnCard, StyledBox, StyledTitle, StyledStack } from './style';

interface ColumnProps {
  title: string;
  boardId: string;
  columnId: string;
  index: number;
}

const Column: FC<ColumnProps> = ({ title, boardId, columnId, index }) => {
  const token = getToken();
  const [isEdit, setEdit] = useState(false);
  const { data: column } = columnsApi.useGetColumnByIdQuery({ token, boardId, columnId });
  const { data: tasks } = tasksApi.useGetAllTasksQuery({ token, columnId, boardId });
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
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <StyledBox>
            {isEdit ? (
              <UpdateColumn
                boardId={boardId}
                currentId={columnId}
                column={column}
                handlerSetEdit={setEdit}
                handlerSetText={setText}
                textValue={textValue}
              />
            ) : (
              <StyledTitle
                variant="h5"
                onClick={() => {
                  setEdit(true);
                }}
              >
                {textValue}
              </StyledTitle>
            )}
            <ColumnDelete id={columnId} token={token} boardId={boardId} />
          </StyledBox>
          <StyledStack spacing={2}>
            {tasks && tasks.map((task) => <TaskCard task={task} key={task.id} />)}
          </StyledStack>
          <AddTaskForm boardId={boardId} columnId={columnId} />
        </StyledColumnCard>
      )}
    </Draggable>
  );
};

export default Column;
