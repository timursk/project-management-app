import { Tooltip, Zoom, IconButton } from '@mui/material';
import React, { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import boardsApi from '../../services/boardsService';
import EditIcon from '@mui/icons-material/Edit';
import { StyledBox, StyledColumn } from './styles';
import ConfirmModal from '../modals/ConfirmModal';
import { getToken } from '../../utils/utils';

type Props = {
  id: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const BoardCardControls = ({ id, setIsEdit }: Props) => {
  const { t } = useTranslation();

  const [show, setShow] = useState(false);

  const token = getToken();

  const [deleteBoard, {}] = boardsApi.useDeleteBoardMutation();

  const handleDelete = (id: string) => {
    deleteBoard({ id, token });
  };

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsEdit(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <StyledBox>
        <StyledColumn>
          <Tooltip title={t('main.delete')} placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={(e) => setShow(true)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>
          {show && (
            <ConfirmModal
              onClose={handleClose}
              actionText={t('main.delete')}
              onConfirm={() => handleDelete(id)}
            ></ConfirmModal>
          )}
          <Tooltip
            sx={{ marginTop: '-10px' }}
            title={t('main.edit')}
            placement="top"
            TransitionComponent={Zoom}
          >
            <IconButton onClick={handleUpdate}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </StyledColumn>
      </StyledBox>
    </>
  );
};

export default BoardCardControls;
