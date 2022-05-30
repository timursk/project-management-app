import { FC, useEffect, useState } from 'react';
import { Card, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowIcon from '@mui/icons-material/Visibility';
import HideIcon from '@mui/icons-material/VisibilityOff';

import UserButton from './UserButton';
import ConfirmModal from '../Modals/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { ColumnTask } from '../../types/store/storeTypes';
import tasksApi from '../../services/tasksService';
import { getToken } from '../../utils/utils';
import EditTaskForm from './EditTaskForm';
import { Draggable } from 'react-beautiful-dnd';
import React from 'react';
import { StyledTaskCardControlsWrapper, StyledTaskWrapper } from './styles';

interface TaskCardProps {
  boardId: string;
  columnId: string;
  task: ColumnTask;
  index: number;
  refetch: () => void;
}

const OverflowText = {
  textOverflow: 'ellipsis',
  overflow: 'hidden',
};

const TaskCard: FC<TaskCardProps> = ({ task, index, boardId, columnId, refetch }) => {
  const { t } = useTranslation();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const toggleCollapsed = () => setIsCollapsed((prevState) => !prevState);

  const [isModalDeleteShown, setIsModalDeleteShown] = useState<boolean>(false);
  const toggleModalDelete = () => setIsModalDeleteShown((prevState) => !prevState);
  const token = getToken();

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const toggleModal = () => setIsModalShown((prevState) => !prevState);

  const [deleteTask, {}] = tasksApi.useDeleteTaskMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const handleDelete = async () => {
    await deleteTask({ boardId, columnId, taskId: task.id, token });
    refetch();
    toggleModalDelete();
  };

  const handleChangeUser = async (userId: string) => {
    const { title, description, order, id } = task;
    await updateTask({ title, description, order, id, userId, token, boardId, columnId });
    refetch();
  };

  const handleEsc = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isModalShown) toggleModal();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <StyledTaskWrapper
            style={{ overflow: 'hidden' }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <StyledTaskCardControlsWrapper>
              <IconButton aria-label="edit" color="primary" size="small" onClick={toggleCollapsed}>
                {isCollapsed ? <ShowIcon /> : <HideIcon />}
              </IconButton>
              <IconButton aria-label="edit" color="primary" size="small" onClick={toggleModal}>
                <EditIcon />
              </IconButton>

              <IconButton
                aria-label="delete"
                color="primary"
                onClick={toggleModalDelete}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </StyledTaskCardControlsWrapper>

            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} noWrap={isCollapsed}>
              {task.title}
            </Typography>

            <Typography
              style={OverflowText}
              variant="body2"
              component="div"
              sx={{ flexGrow: 1 }}
              noWrap={isCollapsed}
            >
              {task.description}
            </Typography>

            <UserButton userId={task.userId} onSetUser={handleChangeUser} />
          </StyledTaskWrapper>
        )}
      </Draggable>

      {isModalShown && (
        <EditTaskForm
          task={task}
          onClose={toggleModal}
          boardId={boardId}
          columnId={columnId}
          refetch={refetch}
        />
      )}

      {isModalDeleteShown && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={toggleModalDelete}
          actionText={t('task.deleteTask', { title: task.title })}
        />
      )}
    </>
  );
};

export default React.memo(TaskCard);
