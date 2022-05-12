import { CardContent, CardActionArea } from '@mui/material';
import { FC, useState } from 'react';
import { StyledCard, StyledTypography, StyledBox } from './styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BoardCardControls from '../BoardCardControls/BoardCardControls';

interface BoardCardProps {
  id: string;
  title: string;
}

const BoardCard: FC<BoardCardProps> = ({ id, title }) => {
  const { t } = useTranslation();
  const [isHover, setIsHover] = useState<boolean>(false);
  const navigate = useNavigate();

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
    <StyledCard raised={isHover} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CardActionArea onClick={handleOpen}>
        <CardContent>
          <StyledTypography sx={{ color: 'primary' }} variant="body2">
            {title}
          </StyledTypography>
        </CardContent>
      </CardActionArea>

      <StyledBox sx={{ opacity: `${isHover ? 1 : 1}` }}>
        <BoardCardControls id={id} />
      </StyledBox>
    </StyledCard>
  );
};

export default BoardCard;
