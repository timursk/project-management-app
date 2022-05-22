import { FC, useState } from 'react';
import StyledTaskWrapper from './StyledTaskWrapper';
import { Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import UserButton from './UserButton';
import ConfirmModal from '../../modals/ConfirmModal';
import { useTranslation } from 'react-i18next';
import { Task } from '../../../types/store/storeTypes';
import tasksApi from '../../../services/tasksService';
import { getToken } from '../../../utils/utils';
import StyledTaskCardControlsWrapper from './StyledTaskCardControlsWrapper';

interface TaskCardProps {
  task: Task;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isModalDeleteShown, setIsModalDeleteShown] = useState<boolean>(false);
  const toggleModalDelete = () => setIsModalDeleteShown((prevState) => !prevState);
  const token = getToken();

  const [deleteTask, {}] = tasksApi.useDeleteTaskMutation();

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

  if (isDeleted) return null;
  return (
    <>
      <StyledTaskWrapper
        raised={isHover}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <StyledTaskCardControlsWrapper>
          <IconButton aria-label="edit" color="primary" size="small">
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="primary" onClick={toggleModalDelete} size="small">
            <DeleteIcon />
          </IconButton>
        </StyledTaskCardControlsWrapper>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} noWrap>
          {task.title}
        </Typography>
        <Typography variant="body2" component="div" sx={{ flexGrow: 1 }} noWrap>
          {task.description}
        </Typography>
        <UserButton userId={task.userId} onSetUser={(id) => console.log(id)} />
      </StyledTaskWrapper>
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
