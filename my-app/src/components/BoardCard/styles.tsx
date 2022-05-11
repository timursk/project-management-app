import styled from '@emotion/styled';
import { Card, Typography, Box } from '@mui/material';

export const StyledCard = styled(Card)`
  position: relative;
  min-width: 140px;
  max-width: 400px;
  min-height: 80px;
`;

export const StyledTypography = styled(Typography)`
  height: 80px;
  color: text.secondary;
`;

export const StyledBox = styled(Box)`
  position: absolute;
  top: 5px;
  right: 5px;
  transition: 0.2s;
`;
