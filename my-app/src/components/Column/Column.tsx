import React, { FC, useEffect, useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { IColumn, ITask } from '../../pages/Board/Board';
import columnsApi from '../../services/columnsService';
import tasksApi from '../../services/tasksService';
import { getToken } from '../../utils/utils';
import ColumnDelete from '../ColumnDelete/ColumnDelete';
import UpdateColumn from '../ColumnUpdate/UpdateColumn';
import AddTaskForm from '../task-components/TaskCard/AddTaskForm';
import TaskCard from '../task-components/TaskCard/TaskCard';
import { StyledColumnCard, StyledBox, StyledTitle } from './style';
import TaskList from '../TasksList/TaskList';

interface ColumnProps {
  boardId: string;
  column: IColumn;
  // title: string;
  // columnId: string;
  index: number;
  allTasks: ITask[];
}

const Column: FC<ColumnProps> = ({ boardId, column, index, allTasks }) => {
  const token = getToken();
  const [isEdit, setEdit] = useState(false);

  const { id: columnId, title } = column;
  const tasksItem = allTasks.find((tasks) => tasks.columnId === column.id);

  // if (tasksItem || )

  // const { data: column } = columnsApi.useGetColumnByIdQuery({ token, boardId, columnId });
  // const { data: tasks } = tasksApi.useGetAllTasksQuery({ token, columnId, boardId });

  const [sortedTasks, setSortedTasks] = useState(tasks);
  const [textValue, setText] = useState(title);

  useEffect(() => {
    if (!tasks || tasks.length === 0) {
      return;
    }

    const newSortedTasks = [...tasks];
    newSortedTasks.sort((a, b) => a.order - b.order);
    setSortedTasks(newSortedTasks);
  }, [tasks]);

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

export default React.memo(Column);
