import { CardContent, CardActionArea, Grid } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { StyledCard, StyledDimmer, StyledTypography } from './styles';
import { useNavigate } from 'react-router-dom';
import BoardCardControls from '../BoardCardControls/BoardCardControls';
import BoardEdit from '../BoardEdit/BoardEdit';

interface BoardCardProps {
  id: string;
  title: string;
}

const BoardCard: FC<BoardCardProps> = ({ id, title }) => {
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const editRef = useRef<HTMLElement>(null);

  const handleClick = (e: Event) => {
    if (!editRef.current) {
      return;
    }

    if (editRef.current === e.target) {
      setIsEdit(false);
    }
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

  return (
    <>
      {isEdit && <StyledDimmer ref={editRef} />}

      <Grid item xs={12} sm={6} md={4}>
        <StyledCard
          raised={isHover}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardActionArea onClick={handleOpen}>
            <CardContent>
              <StyledTypography variant="body2">{title}</StyledTypography>
            </CardContent>
          </CardActionArea>

          <BoardCardControls id={id} setIsEdit={setIsEdit} />

          {isEdit && <BoardEdit id={id} title={title} setIsEdit={setIsEdit} />}
        </StyledCard>
      </Grid>
    </>
  );
};

export default BoardCard;
