import React from 'react';
import { ColumnTask } from '../../types/store/storeTypes';
import { Droppable } from 'react-beautiful-dnd';
import { StyledStack } from './style';
import TaskCard from '../TaskComponents/TaskCard';

type Props = {
  boardId: string;
  columnId: string;
  sortedTasks: ColumnTask[];
  refetch: () => void;
};

const TaskList = ({ boardId, columnId, sortedTasks, refetch }: Props) => {
  return (
    <Droppable droppableId={columnId} type="task">
      {(provided) => (
        <StyledStack {...provided.droppableProps} ref={provided.innerRef}>
          {sortedTasks &&
            sortedTasks.map((task, index) => (
              <TaskCard
                task={task}
                key={task.id}
                index={index}
                boardId={boardId}
                columnId={columnId}
                refetch={refetch}
              />
            ))}

          {provided.placeholder}
        </StyledStack>
      )}
    </Droppable>
  );
};

export default React.memo(TaskList);
