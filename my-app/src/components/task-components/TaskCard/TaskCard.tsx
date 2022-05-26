import { FC, useEffect, useState } from 'react';
import StyledTaskWrapper from './StyledTaskWrapper';
import { IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShowIcon from '@mui/icons-material/Visibility';
import HideIcon from '@mui/icons-material/VisibilityOff';

import UserButton from './UserButton';
import ConfirmModal from '../../modals/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { Task } from '../../../types/store/storeTypes';
import tasksApi from '../../../services/tasksService';
import { getToken } from '../../../utils/utils';
import StyledTaskCardControlsWrapper from './StyledTaskCardControlsWrapper';
import EditTaskForm from './EditTaskForm';
import { Draggable } from 'react-beautiful-dnd';

interface TaskCardProps {
  task: Task;
  index: number;
}

const TaskCard: FC<TaskCardProps> = ({ task, index }) => {
  const { t } = useTranslation();

  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const toggleCollapsed = () => setIsCollapsed((prevState) => !prevState);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isModalDeleteShown, setIsModalDeleteShown] = useState<boolean>(false);
  const toggleModalDelete = () => setIsModalDeleteShown((prevState) => !prevState);
  const token = getToken();

  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const toggleModal = () => setIsModalShown((prevState) => !prevState);

  const [deleteTask, {}] = tasksApi.useDeleteTaskMutation();
  const [updateTask, {}] = tasksApi.useUpdateTaskMutation();

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleDelete = () => {
    deleteTask({ boardId: task.boardId, columnId: task.columnId, taskId: task.id, token });
    toggleModalDelete();
  };

  const handleChangeUser = (userId: string) => {
    const { title, description, order, id, boardId, columnId } = task;
    updateTask({ title, description, order, id, userId, token, boardId, columnId });
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
            raised={isHover}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
              {isModalShown && <EditTaskForm task={task} onClose={toggleModal} />}
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
            <Typography variant="body2" component="div" sx={{ flexGrow: 1 }} noWrap={isCollapsed}>
              {task.description}
            </Typography>
            <UserButton userId={task.userId} onSetUser={handleChangeUser} />
          </StyledTaskWrapper>
        )}
      </Draggable>

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

export default TaskCard;
