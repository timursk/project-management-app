import React, { FC, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmModal from '../modals/ConfirmModal';
import columnsApi from '../../services/columnsService';
import { useTranslation } from 'react-i18next';
import { IconButton } from '@mui/material';

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
      <IconButton aria-label="delete" color="primary" onClick={() => setShow(true)}>
        <DeleteIcon />
      </IconButton>

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
