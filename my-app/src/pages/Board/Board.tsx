import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import ColumnAdd from '../../components/ColumnAdd/ColumnAdd';
import { StyledBox, StyledGrid } from './style';
import columnsApi from '../../services/columnsService';
import { initOrder } from '../../store/reducers/columnSlice';
import { getToken, reorderTasks } from '../../utils/utils';
import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';
import { ColumnResult } from '../../types/api/columnsApiTypes';
import ColumnComponent from '../../components/ColumnComponent/ColumnComponent';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import tasksApi from '../../services/tasksService';
import { GetTaskService } from '../../services/getTaskService';
import jwt_decode from 'jwt-decode';
import { DecodedToken } from '../../types/api/authTypes';
import boardsApi from '../../services/boardsService';
import { Column, ColumnTask } from '../../types/store/storeTypes';

type BoardProps = {
  columns: Column[];
  setColumns: Dispatch<SetStateAction<Column[]>>;
};

export type TasksDnd = {
  columnId: string;
  tasks: ColumnTask[];
};

export type Test = {
  [key: string]: ColumnTask[];
};

// const Board = ({ columns, setColumns }: BoardProps) => {
const Board = () => {
  const { id: boardId } = useParams();
  const token = getToken();

  const { data: board } = boardsApi.useGetBoardByIdQuery({ token, id: boardId });

  const [updateColumn, {}] = columnsApi.useUpdateColumnMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const [columnsDnd, setColumnsDnd] = useState<Column[]>(null);
  // const [tasksDnd, setTasksDnd] = useState<TasksDnd[]>(null);
  const [tasksDnd, setTasksDnd] = useState<Test>(null);
  console.log('R', tasksDnd);

  useEffect(() => {
    if (!board || !board?.columns || board.columns.length === 0) {
      return;
    }

    const newColumns = [...board.columns];
    newColumns.sort((a, b) => a.order - b.order);

    const newTasks: Test = {};
    board.columns.forEach(({ id, tasks }) => {
      const tasksArr = [...tasks];
      tasksArr.sort((a, b) => a.order - b.order);
      newTasks[id] = tasksArr;
    });

    setColumnsDnd(newColumns);
    setTasksDnd(newTasks);
  }, [board]);
  // useEffect(() => {
  //   if (!columns) {
  //     return;
  //   }

  //   const newTasks: Test = {};
  //   columns.forEach(({ id, tasks }) => {
  //     const tasksArr = [...tasks];
  //     tasksArr.sort((a, b) => a.order - b.order);
  //     newTasks[id] = tasksArr;
  //   });

  //   setColumnsDnd(columns);
  //   setTasksDnd(newTasks);
  // }, [columns]);

  // useEffect(() => {
  //   if (!tasksDnd || !Object.keys(tasksDnd).length) {
  //     return;
  //   }
  //   console.log('tasks', tasksDnd);
  //   // const test = 'dcac084e-84c4-481e-a8d6-9a3066f5c5e5';
  //   // const newTasksDnd = { ...tasksDnd };
  //   // console.log('old', newTasksDnd);

  //   // const copy = tasksDnd[test].slice();
  //   // copy.sort((a, b) => a.order - b.order);
  //   // copy.splice(1, 1);
  //   // newTasksDnd[test] = copy;
  //   // console.log('new', newTasksDnd);
  // }, [tasksDnd]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { destination, source, draggableId, type } = result;

      if (
        !destination ||
        (destination.droppableId === source.droppableId && destination.index === source.index)
      ) {
        return;
      }

      if (type === 'column') {
        const newColumns = [...columnsDnd];

        const [removed] = newColumns.splice(source.index, 1);
        newColumns.splice(destination.index, 0, removed);

        updateColumn({
          boardId,
          columnId: draggableId,
          // title: columns[source.index].title,
          title: columnsDnd[source.index].title,
          order: ++destination.index,
          token,
        });

        setColumnsDnd(newColumns);
        return;
      }

      if (type === 'task') {
        //   const { userId }: DecodedToken = jwt_decode(token);
        //   const order = destination.index + 1;

        const newTasksDnd = { ...tasksDnd };
        const sourceList = tasksDnd[source.droppableId].slice();
        const destList = tasksDnd[destination.droppableId].slice();
        const taskToUpd = newTasksDnd[source.droppableId].find((task) => task.id === draggableId);

        if (source.droppableId === destination.droppableId) {
          const [removed] = sourceList.splice(source.index, 1);
          sourceList.splice(destination.index, 0, removed);

          newTasksDnd[source.droppableId] = sourceList;
        } else {
          const [removed] = sourceList.splice(source.index, 1);
          destList.splice(destination.index, 0, removed);

          newTasksDnd[source.droppableId] = sourceList;
          newTasksDnd[destination.droppableId] = destList;
        }

        setTasksDnd(newTasksDnd);

        updateTask({
          id: draggableId,
          title: taskToUpd.title,
          order: destination.index + 1,
          description: taskToUpd.description,
          userId: taskToUpd.userId,
          boardId,
          columnId: source.droppableId,
          newColumnId: destination.droppableId,
          token,
        });
        // console.log('first', tasksDnd[source.droppableId][source.index]);
        // console.log('second', tasksDnd[destination.droppableId][destination.index]);
        // GetTaskService({
        //   token,
        //   boardId,
        //   columnId: source.droppableId,
        //   taskId: draggableId,
        // }).then(({ title, description }) => {
        //   updateTask({
        //     id: draggableId,
        //     title,
        //     order,
        //     description,
        //     userId,
        //     boardId,
        //     columnId: source.droppableId,
        //     newColumnId: destination.droppableId,
        //     token,
        //   });
        // });

        // const newColumns = [...columns];

        // const sourceIdx = newColumns.findIndex((column) => column.id === source.droppableId);
        // const destIdx = newColumns.findIndex((column) => column.id === destination.droppableId);

        // const sourceTaskIdx = newColumns[sourceIdx].tasks.findIndex(
        //   (task) => task.order === source.index + 1
        // );
        // const destTaskIdx = newColumns[sourceIdx].tasks.findIndex(
        //   (task) => task.order === destination.index + 1
        // );

        // console.log(source.index, destination.index);
        // console.log(source.droppableId === destination.droppableId);
        // const toAddTask = newColumns[sourceIdx].tasks[sourceTaskIdx];
        // const sourceColumn = { ...newColumns[sourceIdx] };
        // const destColumn = { ...newColumns[destIdx] };

        // sourceColumn.tasks = reorderTasks(
        //   sourceColumn.tasks,
        //   source.index + 1,
        //   destination.index + 1,
        //   source.droppableId === destination.droppableId
        // );
        // destColumn.tasks = reorderTasks(
        //   destColumn.tasks,
        //   source.index + 1,
        //   destination.index + 1,
        //   source.droppableId === destination.droppableId,
        //   toAddTask
        // );

        // newColumns[sourceIdx] = sourceColumn;
        // newColumns[destIdx] = destColumn;

        // console.log('result', newColumns);
        // setColumns(newColumns);
        // // newColumns[sourceIdx].tasks[sourceTaskIdx].order =
        // // const [removed] = newColumns.splice(source.index, 1);
        // // newColumns.splice(destination.index, 0, removed);

        // return;
      }
    },
    // [boardId, columns, columnsDnd, tasksDnd, token, updateColumn]
    // [boardId, columnsDnd, tasksDnd, token, updateColumn]
    [boardId, columnsDnd, tasksDnd, token, updateColumn, updateTask]
  );

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
              {columnsDnd &&
                columnsDnd.map((column, index) => (
                  <ColumnComponent
                    key={column.id}
                    boardId={boardId}
                    column={column}
                    index={index}
                    // tasks={tasksDnd[column.id]}
                    tasks={tasksDnd}
                  />
                ))}

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
