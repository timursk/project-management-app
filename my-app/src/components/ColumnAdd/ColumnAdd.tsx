import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledAddButton } from './style';
import columnsApi from '../../services/columnsService';
import { Skeleton, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ConfirmModal from '../modals/ConfirmModal';
import { getToken } from '../../utils/utils';
import { setOrder } from '../../store/reducers/columnSlice';

interface ColumnAddProps {
  boardId: string;
  order: number;
}

const ColumnAdd: FC<ColumnAddProps> = ({ boardId, order }) => {
  const { t } = useTranslation();
  const token = getToken();
  const [addColumn, { data }] = columnsApi.useCreateColumnMutation();
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleAddColumn = () => {
    addColumn({ token, boardId, title });
    dispatch(setOrder(+1));
    setTitle('');
    setShow(false);
    console.log(data);
  };

  const handleClose = () => {
    setShow(false);
    setTitle('');
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <>
      <StyledAddButton onClick={handleOpen} variant="contained">
        {t('column.button')}
      </StyledAddButton>
      {show && (
        <ConfirmModal
          onClose={handleClose}
          actionText={t('column.add')}
          onConfirm={handleAddColumn}
        >
          <TextField
            value={title}
            sx={{ margin: '0 auto' }}
            label={'Name column'}
            onChange={(eve) => setTitle(eve.currentTarget.value)}
          ></TextField>
        </ConfirmModal>
      )}
    </>
  );
};

export default ColumnAdd;
