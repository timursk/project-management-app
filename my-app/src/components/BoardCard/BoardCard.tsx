import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Zoom,
  CardActionArea,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { FC, useState } from 'react';
import { Box, typography } from '@mui/system';
import styled from '@emotion/styled';

interface BoardCardProps {
  title: string;
}

const StyledCard = styled(Card)`
  position: relative;
  min-width: 140px;
  max-width: 400px;
  min-height: 80px;
`;

const StyledTypography = styled(Typography)`
  height: 80px;
  color: text.secondary;
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 5px;
  right: 5px;
  transition: 0.2s;
`;

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
