import { CardContent, IconButton, Tooltip, Zoom, CardActionArea } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FC, useState } from 'react';
import { StyledCard, StyledTypography, StyledBox } from './styles';

interface BoardCardProps {
  title: string;
}

const BoardCard: FC<BoardCardProps> = ({ title }) => {
  const [isHover, setIsHover] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <StyledCard raised={isHover} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CardActionArea>
        <CardContent>
          <StyledTypography variant="body2">{title}</StyledTypography>
        </CardContent>
      </CardActionArea>

      <StyledBox sx={{ opacity: `${isHover ? 1 : 0}` }}>
        <Tooltip title="Delete" placement="left" TransitionComponent={Zoom}>
          <IconButton>
            <ClearIcon />
          </IconButton>
        </Tooltip>
      </StyledBox>
    </StyledCard>
  );
};

export default BoardCard;
