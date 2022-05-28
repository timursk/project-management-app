import React from 'react';
import { ColumnTask, Task } from '../../types/store/storeTypes';
import TaskCard from '../task-components/TaskCard/TaskCard';
import { Droppable } from 'react-beautiful-dnd';
import { StyledStack } from './style';

type Props = {
  columnId: string;
  sortedTasks: ColumnTask[];
};

const TaskList = ({ columnId, sortedTasks }: Props) => {
  return (
    <Droppable droppableId={columnId} type="task">
      {(provided) => (
        <StyledStack {...provided.droppableProps} ref={provided.innerRef} spacing={2}>
          {sortedTasks &&
            sortedTasks.map((task, index) => <TaskCard task={task} key={task.id} index={index} />)}

          {provided.placeholder}
        </StyledStack>
      )}
    </Droppable>
  );
};

export default React.memo(TaskList);
