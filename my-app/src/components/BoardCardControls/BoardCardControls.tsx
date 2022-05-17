import { Tooltip, Zoom, IconButton } from '@mui/material';
import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import ClearIcon from '@mui/icons-material/Clear';
import boardsApi from '../../services/boardsService';
import { useAppSelector } from '../../store/hooks';
import EditIcon from '@mui/icons-material/Edit';
import { StyledBox, StyledColumn } from './styles';

type Props = {
  id: string;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
};

const BoardCardControls = ({ id, setIsEdit }: Props) => {
  const { t } = useTranslation();

  let token = useAppSelector((state) => state.userReducer.token);
  //temporarily
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyNjg3NzF9.z3z283PgbUDkcblzNR-SZO01qW68dRPGWQxLy-X_ydQ';
  const [deleteBoard, {}] = boardsApi.useDeleteBoardMutation();

  const handleDelete = (id: string) => {
    deleteBoard({ id, token });
  };

  const handleUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  return (
    <>
      <StyledBox>
        <StyledColumn>
          <Tooltip title={t('main.delete')} placement="top" TransitionComponent={Zoom}>
            <IconButton onClick={() => handleDelete(id)}>
              <ClearIcon />
            </IconButton>
          </Tooltip>

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
