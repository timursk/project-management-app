import React, { FC, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmModal from '../modals/ConfirmModal';
import columnsApi from '../../services/columnsService';
import { useTranslation } from 'react-i18next';
import { StyledDelButton } from './style';

interface ColumnDeleteProps {
  id: string;
  token: string;
  boardId: string;
}

const ColumnDelete: FC<ColumnDeleteProps> = ({ id, token, boardId }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [deleteColumn, {}] = columnsApi.useDeleteColumnMutation();

  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = () => {
    deleteColumn({ boardId, columnId: id, token });

    setShow(false);
  };

  return (
    <>
      <StyledDelButton
        variant="outlined"
        onClick={() => {
          setShow(true);
        }}
        startIcon={<DeleteIcon />}
      ></StyledDelButton>

      {show ? (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={handleClose}
          actionText={t('column.delete')}
        />
      ) : null}
    </>
  );
};

export default ColumnDelete;
