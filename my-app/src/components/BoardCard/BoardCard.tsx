import { CardContent, CardActionArea, Input } from '@mui/material';
import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { StyledCard, StyledEditBox, StyledTypography } from './styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BoardCardControls from '../BoardCardControls/BoardCardControls';
import { Box } from '@mui/system';
import boardsApi from '../../services/boardsService';

interface BoardCardProps {
  id: string;
  title: string;
}

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyNjg3NzF9.z3z283PgbUDkcblzNR-SZO01qW68dRPGWQxLy-X_ydQ';

const BoardCard: FC<BoardCardProps> = ({ id, title }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>('');

  const editRef = useRef<HTMLElement>(null);

  const [updateBoard, {}] = boardsApi.useUpdateBoardMutation();

  const handleClick = (e: Event) => {
    if (!editRef.current) return;
    const { target } = e;
    const { children } = editRef.current;

    if (editRef.current === target) {
      return;
    }
    for (let i = 0; i < children.length; i++) {
      if (target === children[i]) return;
    }

    setIsEdit(false);
    setEditValue('');
  };

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isEdit]);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleOpen = () => {
    navigate(`/board/${id}`);
  };

  const handleUpdate = (e: FormEvent) => {
    e.preventDefault();
    if (editValue.length > 40) {
      alert('TOO BIG');
      return;
    }
    updateBoard({ id, token, title: editValue });
    setIsEdit(false);
  };

  return (
    <StyledCard raised={isHover} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <StyledTypography sx={{ color: 'primary' }} variant="body2">
            {title}
          </StyledTypography>
        </CardContent>
      </CardActionArea>

      <BoardCardControls id={id} setIsEdit={setIsEdit} />
      {isEdit && (
        <StyledEditBox>
          <Box sx={{ height: '100%' }} component="form" onSubmit={handleUpdate}>
            <Input
              autoFocus
              ref={editRef}
              sx={{ width: '100%', padding: '20px', height: '100%' }}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder={title}
            />
          </Box>
        </StyledEditBox>
      )}
    </StyledCard>
  );
};

export default BoardCard;
