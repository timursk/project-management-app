import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledAddButton } from './style';
import columnsApi from '../../services/columnsService';
import { Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../store/hooks';
import ConfirmModal from '../modals/ConfirmModal';
import { getToken } from '../../utils/utils';
import { setOrder } from '../../store/reducers/columnSlice';
import { DroppableStateSnapshot } from 'react-beautiful-dnd';

interface ColumnAddProps {
  boardId: string;
  snapshot: DroppableStateSnapshot;
  refetch: () => void;
}

const ColumnAdd: FC<ColumnAddProps> = ({ boardId, snapshot, refetch }) => {
  const { t } = useTranslation();

  const token = getToken();

  const [addColumn, {}] = columnsApi.useCreateColumnMutation();
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const handleAddColumn = async () => {
    await addColumn({ token, boardId, title });
    dispatch(setOrder(+1));
    setTitle('');
    setShow(false);
    refetch();
  };

  const handleClose = () => {
    setShow(false);
    setTitle('');
  };

  const handleOpen = () => {
    setShow(true);
  };

  return (
    <Grid item sx={{ marginLeft: snapshot.isDraggingOver ? '320px' : null }}>
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
            onChange={(e) => setTitle(e.currentTarget.value)}
          ></TextField>
        </ConfirmModal>
      )}
    </Grid>
  );
};

export default ColumnAdd;
