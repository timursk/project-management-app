import { FC, useState } from 'react';
import StyledTaskWrapper from './StyledTaskWrapper';
import { Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import UserButton from './UserButton';
import ConfirmModal from '../../modals/ConfirmModal';
import { useTranslation } from 'react-i18next';

interface TaskCardProps {
  taskId: string;
}

const TaskCard: FC<TaskCardProps> = ({ taskId }) => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isModalDeleteShown, setIsModalDeleteShown] = useState<boolean>(false);
  const toggleModalDelete = () => setIsModalDeleteShown((prevState) => !prevState);

  const task = {
    id: '40af606c-c0bb-47d1-bc20-a2857242cde3',
    title: 'Task: pet the cat',
    order: 1,
    description:
      'Domestic cat needs to be stroked gently Domestic cat needs to be stroked gently Domestic cat needs to be stroked gently Domestic cat needs to be stroked gently',
    userId: '62166f67-90a5-4f26-b5c4-2d2fa99e5465', //user123
    boardId: '9b63e927-77bc-48d1-b0e7-58ddc062fbe1',
    columnId: '63be5fa5-d490-4fe2-9caf-9becd7d79e66',
  };

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleDelete = () => {
    alert('Delete card');
    toggleModalDelete();
  };

  return (
    <>
      <StyledTaskWrapper
        raised={isHover}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <IconButton aria-label="edit" color="primary">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" color="primary" onClick={toggleModalDelete}>
          <DeleteIcon />
        </IconButton>
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
