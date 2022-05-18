import { CardContent, CardActionArea, Grid } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { StyledCard, StyledDimmer, StyledTypography } from './styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BoardCardControls from '../BoardCardControls/BoardCardControls';
import BoardEdit from '../BoardEdit/BoardEdit';

interface BoardCardProps {
  id: string;
  title: string;
  description: string;
}

const BoardCard: FC<BoardCardProps> = ({ id, title, description }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const editRef = useRef<HTMLElement>(null);

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
      <Grid item xs={12} sm={6} md={4}>
        <StyledCard
          raised={isHover}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CardActionArea onClick={handleOpen}>
            <CardContent>
              <StyledTypography sx={{ color: 'primary' }} variant="body2">
                {title}
              </StyledTypography>
            </CardContent>
          </CardActionArea>

          <BoardCardControls id={id} setIsEdit={setIsEdit} />

          {isEdit && (
            <BoardEdit
              id={id}
              title={title}
              setIsEdit={setIsEdit}
              description={description}
              type="update"
            />
          )}
        </StyledCard>
      </Grid>
    </>
  );
};

export default BoardCard;
