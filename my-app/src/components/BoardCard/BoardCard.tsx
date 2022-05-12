import { CardContent, IconButton, Tooltip, Zoom, CardActionArea } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FC, useState } from 'react';
import { StyledCard, StyledTypography, StyledBox } from './styles';
import boardsApi from '../../services/boardsService';
import { useAppSelector } from '../../store/hooks';
import { useNavigate } from 'react-router-dom';

interface BoardCardProps {
  id: string;
  title: string;
}

const BoardCard: FC<BoardCardProps> = ({ id, title }) => {
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();

  let token = useAppSelector((state) => state.userReducer.token);
  //temporarily
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxOTNiNjY4NS00OTA0LTRlNGMtYWM5MS00MGRjNjBhN2JlZTkiLCJsb2dpbiI6InRlc3QiLCJpYXQiOjE2NTIyNjg3NzF9.z3z283PgbUDkcblzNR-SZO01qW68dRPGWQxLy-X_ydQ';
  const [deleteBoard, {}] = boardsApi.useDeleteBoardMutation();

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleDelete = (id: string) => {
    deleteBoard({ id, token });
  };

  const handleOpen = () => {
    navigate(`/board/${id}`);
  };

  return (
    <StyledCard raised={isHover} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <StyledTypography sx={{ color: 'primary.contrastText' }} variant="body2">
            {title}
          </StyledTypography>
        </CardContent>
      </CardActionArea>

      <StyledBox sx={{ opacity: `${isHover ? 1 : 0}` }}>
        <Tooltip title="Delete" placement="left" TransitionComponent={Zoom}>
          <IconButton onClick={() => handleDelete(id)}>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </StyledBox>
    </StyledCard>
  );
};

export default BoardCard;
