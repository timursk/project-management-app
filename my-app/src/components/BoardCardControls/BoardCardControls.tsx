import { Tooltip, Zoom, IconButton, Alert } from '@mui/material';
import React, { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import boardsApi from '../../services/boardsService';
import EditIcon from '@mui/icons-material/Edit';
import { StyledBox, StyledColumn, StyledTooltip } from './styles';
import ConfirmModal from '../Modals/ConfirmModal';
import { getToken } from '../../utils/utils';
import { ErrorObject } from '../../types/api/tasksApiTypes';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../store/reducers/actionCreators';
import { useAppDispatch } from '../../store/hooks';
import ErrorMessage from '../ErrorMessge/ErrorMessage';

type Props = {
  id: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const BoardCardControls = ({ id, setIsEdit }: Props) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const token = getToken();

  const [deleteBoard, { error }] = boardsApi.useDeleteBoardMutation();

  const handleDelete = () => {
    deleteBoard({ id, token });
  };

  const toggleLogoutModal = () => {
    setIsModalShown((prev) => !prev);
  };

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const errorMessage = (): string => {
    if (!error) return '';
    const {
      status,
      data: { message },
    } = error as ErrorObject;
    if (status === 404) {
      if (message === 'Column was not founded!') return t('errors.noColumn');
      if (message === 'Border was not founded!') return t('errors.noBorder');
      return t('errors.wrongPath');
    }
    if (status === 401) {
      dispatch(logoutUser());
      navigate('/welcome');
      return t('errors.tokenExpired');
    }
    return t('errors.unknownError');
  };

  return (
    <>
      {error && <ErrorMessage text={errorMessage()} />}
      <StyledBox>
        <StyledColumn>
          <Tooltip title={t('main.delete')} placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={toggleLogoutModal}>
              <ClearIcon />
            </IconButton>
          </Tooltip>

          <StyledTooltip title={t('main.edit')} placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={handleUpdate}>
              <EditIcon />
            </IconButton>
          </StyledTooltip>
        </StyledColumn>
      </StyledBox>

      {isModalShown && (
        <ConfirmModal
          onConfirm={handleDelete}
          onClose={toggleLogoutModal}
          actionText={t('main.deleteConfirmation')}
        />
      )}
    </>
  );
};

export default BoardCardControls;
