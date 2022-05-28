import React, { FC, useEffect, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import tasksApi from '../../services/tasksService';
import { getToken } from '../../utils/utils';
import ColumnDelete from '../ColumnDelete/ColumnDelete';
import UpdateColumn from '../ColumnUpdate/UpdateColumn';
import AddTaskForm from '../task-components/TaskCard/AddTaskForm';
import { StyledColumnCard, StyledBox, StyledTitle } from './style';
import TaskList from '../TasksList/TaskList';
import { ColumnResult } from '../../types/api/columnsApiTypes';
import { Column, ColumnTask } from '../../types/store/storeTypes';
import { Test } from '../../pages/Board/Board';

interface ColumnProps {
  boardId: string;
  column: Column;
  index: number;
  // tasks: ColumnTask[];
  tasks: Test;
}

const ColumnComponent: FC<ColumnProps> = ({ boardId, column, index, tasks }) => {
  const token = getToken();
  const { id: columnId, title } = column;
  const sortedTasks = tasks[columnId];
  // const { data: tasks } = tasksApi.useGetAllTasksQuery({ token, columnId, boardId });
  const [isEdit, setEdit] = useState(false);
  // const [sortedTasks, setSortedTasks] = useState<ColumnTask[]>();
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

          <TaskList columnId={columnId} sortedTasks={sortedTasks} />

          <AddTaskForm boardId={boardId} columnId={columnId} />
        </StyledColumnCard>
      )}
    </Draggable>
  );
};

export default React.memo(ColumnComponent);
